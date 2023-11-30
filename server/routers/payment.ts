import { z } from "zod";
import { getBaseUrl, procedure, router } from "../trpc";
import { PaymentStatus, PrismaClient } from "@prisma/client";
import fetch from "node-fetch";
import { PaymentLength, PaymentOption, PaymentProcessor } from "@prisma/client";
import bcrypt from "bcrypt";
import { PaymentLengthZod, PaymentOptionZod, PaymentZod } from "@server/zod";
import { createClientBasedPayment } from "./user";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const prisma = new PrismaClient();

export const fetchChargeInfo = procedure
  .input(
    z.object({
      paymentId: z.number(),
    })
  )
  .output(PaymentZod)
  .mutation(async (opts) => {
    try {
      // get the payment from db
      const payment = await prisma.payment.findUnique({
        where: {
          id: opts.input.paymentId,
        },
      });

      if (!payment) {
        throw new Error("Payment not found");
      }

      const paymentRes = createClientBasedPayment(payment);

      // ensure to check the payment status latest

      if (payment.status === "CREATED" || payment.status === "PROCESSING") {
        if (payment?.paymentProcessor === PaymentProcessor.OPEN_NODE) {
          const options = {
            method: "GET",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
              Authorization: process.env.OPEN_NODE_API_KEY || "",
            },
          };
          const openNodeFetchRes = await fetch(
            "https://api.opennode.com/v2/charge/659954d8-7b8e-4b6e-9e70-bb8de6f85c93",
            options
          );
          const cleanRes: any = await openNodeFetchRes.json();

          //return paymentRes;

          let validUntil = null;

          if (payment.paymentLength !== PaymentLength.LIFETIME) {
            if (payment.paymentLength === PaymentLength.ONE_MONTH) {
              // get the time difference between now and the 1 month
              const now = new Date();
              const oneMonth = new Date(payment.createdAt);
              oneMonth.setMonth(oneMonth.getMonth() + 1);

              validUntil = new Date(oneMonth);
            } else {
              // get the time difference between now and the 1 year
              const now = new Date();
              const oneYear = new Date(payment.createdAt);
              oneYear.setFullYear(oneYear.getFullYear() + 1);

              validUntil = new Date(oneYear);
            }
          }

          if (cleanRes.data.status === "paid") {
            // handle paid status
            // update the payment status in db

            // need to get the date until this is valid

            const updatedPayment = await prisma.payment.update({
              where: {
                id: payment.id,
              },
              data: {
                status: PaymentStatus.PAID,
                paymentProcessorMetadata: cleanRes.data,
                validUntil: validUntil,
                paymentDate: new Date(),
                hasAccess: true,
              },
            });

            const paymentRes = createClientBasedPayment(updatedPayment);

            return paymentRes;
          } else if (cleanRes.data.status === "unpaid") {
            // handle failed or still pending status
            return paymentRes;
          }
        } else if (payment.paymentProcessor === "STRIPE") {
          // check the latest statute of the stripe invoice
          const session = await stripe.checkout.sessions.retrieve(
            payment.paymentProcessorId
          );

          if (payment.status === "CREATED" || payment.status === "PROCESSING") {
            let validUntil = null;

            if (payment.paymentLength !== PaymentLength.LIFETIME) {
              if (payment.paymentLength === PaymentLength.ONE_MONTH) {
                // get the time difference between now and the 1 month
                const now = new Date();
                const oneMonth = new Date(payment.createdAt);
                oneMonth.setMonth(oneMonth.getMonth() + 1);

                validUntil = new Date(oneMonth);
              } else {
                // get the time difference between now and the 1 year
                const now = new Date();
                const oneYear = new Date(payment.createdAt);
                oneYear.setFullYear(oneYear.getFullYear() + 1);

                validUntil = new Date(oneYear);
              }
            }

            if (session.status === "complete") {
              console.log("set to paid");
              const updatedPayment = await prisma.payment.update({
                where: {
                  id: payment.id,
                },
                data: {
                  status: PaymentStatus.PAID,
                  paymentProcessorMetadata: session,
                  validUntil: validUntil,
                  paymentDate: new Date(),
                  hasAccess: true,
                },
              });

              const paymentRes = createClientBasedPayment(updatedPayment);

              return paymentRes;
            }
          } else if (session.status === "expired") {
            const updatedPayment = await prisma.payment.update({
              where: {
                id: payment.id,
              },
              data: {
                status: PaymentStatus.FAILED,
                paymentProcessorMetadata: session,
              },
            });

            const paymentRes = createClientBasedPayment(updatedPayment);

            return paymentRes;
          }
        }

        return paymentRes;
      } else {
        // since the payment is in a static state unless the some direct action is taken, we can just return the payment
        return paymentRes;
      }
    } catch (err: any) {
      console.log("err", err);
      // throw a trpc error
      throw new Error(err);
    }
  });

export const createCharge = procedure
  .input(
    z.object({
      amount: z.number(),
      paymentOption: PaymentOptionZod,
      length: PaymentLengthZod,
    })
  )
  .output(PaymentZod)
  .mutation(async (opts) => {
    try {
      //opts.ctx.

      // create openode charge
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: process.env.OPEN_NODE_API_KEY || "",
        },
        body: JSON.stringify({
          amount: 2,
          currency: "USD",
          description: "TESTING",
          auto_settle: false,
          success_url: `${getBaseUrl()}/profile`,
        }),
      };
      const openNodeRes = await fetch(
        "https://api.opennode.com/v1/charges",
        options
      );
      const cleanRes: any = await openNodeRes.json();
      console.log("cleanRes", cleanRes);

      // check the status first transaction with a btc address
      // check the memepool of all transactions from a btc address

      // save charge info to db (prisma)

      const payment = await prisma.payment.create({
        data: {
          amount: opts.input.amount,
          paymentOption: opts.input.paymentOption,
          paymentLength: opts.input.length as PaymentLength,
          paymentProcessorId: cleanRes.data.id,
          paymentProcessor: "OPEN_NODE",
          paymentProcessorMetadata: cleanRes.data,
        },
      });

      const paymentRes = createClientBasedPayment(payment);

      return paymentRes;
    } catch (err: any) {
      console.log("err", err);
      // throw a trpc error
      throw new Error(err);
    }
  });

export const createStripeCharge = procedure
  .input(
    z.object({
      length: PaymentLengthZod,
    })
  )
  .output(PaymentZod)
  .mutation(async (opts) => {
    try {
      const TEST_PRODUCTS = {
        ONE_MONTH: "price_1O4nKlL0miwPwF3TVUYd9Lzj",
        ONE_YEAR: "price_1O4nKVL0miwPwF3Taj65Zpna",
        LIFETIME: "price_1O4nJwL0miwPwF3TnwTzKQdt",
      };
      // figure out what product

      // default should be cheapest
      let product = TEST_PRODUCTS.ONE_MONTH;
      let mode = "subscription";

      let amount = 2;
      if (opts.input.length === "LIFETIME") {
        product = TEST_PRODUCTS.LIFETIME;

        mode = "payment";
      } else if (opts.input.length === "ONE_YEAR") {
        product = TEST_PRODUCTS.ONE_YEAR;
      }

      const createStripeCustomer = await stripe.customers.create({
        description: "BitScript Stripe Customer",
      });

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: product,
            quantity: 1,
          },
        ],
        mode: mode,
        success_url: `${getBaseUrl()}/profile?success=true`,
        cancel_url: `${getBaseUrl()}/profile/?canceled=true`,
        automatic_tax: { enabled: true },
      });

      console.log("session", session);
      const payment = await prisma.payment.create({
        data: {
          amount: amount,
          paymentOption: "USD",
          paymentLength: opts.input.length as PaymentLength,
          paymentProcessorId: session.id,
          paymentProcessor: "STRIPE",
          paymentProcessorMetadata: session,
          hostedCheckoutUrl: session.url,
        },
      });

      const paymentRes = createClientBasedPayment(payment);

      return paymentRes;
    } catch (err: any) {
      throw new Error(err);
    }
  });
