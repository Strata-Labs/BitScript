import { z } from "zod";
import {
  createClientBasedPayment,
  getBaseUrl,
  procedure,
  router,
} from "../trpc";
import { AccountTier, PaymentStatus, PrismaClient } from "@prisma/client";
import fetch from "node-fetch";
import { PaymentLength, PaymentOption, PaymentProcessor } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  AccountTierZod,
  PaymentLengthZod,
  PaymentOptionZod,
  PaymentZod,
} from "@server/zod";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const TEST_PRODUCTS = {
  AA: {
    ONE_DAY: "price_1OIMB3L0miwPwF3TXzycMG9W",
    ONE_MONTH: "price_1OIMB3L0miwPwF3TXzycMG9W",
    ONE_YEAR: "price_1OIMB3L0miwPwF3TXzycMG9W",
    LIFETIME: "price_1OIcgbL0miwPwF3TLA9eBHx1",
  },
  BB: {
    ONE_DAY: "price_1OIMNjL0miwPwF3T7SN07dHE",
    ONE_MONTH: "price_1OIMNjL0miwPwF3T7SN07dHE",
    ONE_YEAR: "price_1OIMNjL0miwPwF3T7SN07dHE",
    LIFETIME: "price_1OIchpL0miwPwF3TCNvu6rAF",
  },
};

export const TEST_PRODUCTS_OPEN_NODE = {
  AA: {
    ONE_DAY: 5,
    ONE_MONTH: 5,
    ONE_YEAR: 5,
    LIFETIME: 10,
  },
  BB: {
    ONE_DAY: 3,
    ONE_MONTH: 3,
    ONE_YEAR: 3,
    LIFETIME: 6,
  },
};

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
      const payment = await opts.ctx.prisma.payment.findUnique({
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

            const updatedPayment = await opts.ctx.prisma.payment.update({
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

          console.log("session", session);
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
              const updatedPayment = await opts.ctx.prisma.payment.update({
                where: {
                  id: payment.id,
                },
                data: {
                  status: PaymentStatus.PAID,
                  paymentProcessorMetadata: session,
                  validUntil: validUntil,
                  paymentDate: new Date(),
                  hasAccess: true,
                  stripeSubscriptionId: session.subscription.id,
                },
              });

              const paymentRes = createClientBasedPayment(updatedPayment);

              return paymentRes;
            }
          } else if (session.status === "expired") {
            const updatedPayment = await opts.ctx.prisma.payment.update({
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
      paymentOption: PaymentOptionZod,
      length: PaymentLengthZod,
      tier: AccountTierZod,
    })
  )
  .output(PaymentZod)
  .mutation(async (opts) => {
    try {
      //opts.ctx.

      let product = 5;

      const tier = opts.input.tier as AccountTier;

      if (tier === AccountTier.BEGINNER_BOB) {
        if (opts.input.length === "LIFETIME") {
          product = TEST_PRODUCTS_OPEN_NODE.BB.LIFETIME;
        } else if (opts.input.length === "ONE_YEAR") {
          product = TEST_PRODUCTS_OPEN_NODE.BB.ONE_YEAR;
        } else if (opts.input.length === "ONE_MONTH") {
          product = TEST_PRODUCTS_OPEN_NODE.BB.ONE_MONTH;
        } else {
          product = TEST_PRODUCTS_OPEN_NODE.BB.ONE_MONTH;
        }
      } else if (tier === AccountTier.ADVANCED_ALICE) {
        console.log("advanced alice");
        if (opts.input.length === "LIFETIME") {
          product = TEST_PRODUCTS_OPEN_NODE.AA.LIFETIME;
        } else if (opts.input.length === "ONE_YEAR") {
          product = TEST_PRODUCTS_OPEN_NODE.AA.ONE_YEAR;
        } else if (opts.input.length === "ONE_MONTH") {
          product = TEST_PRODUCTS_OPEN_NODE.AA.ONE_MONTH;
        } else {
          product = TEST_PRODUCTS_OPEN_NODE.AA.ONE_MONTH;
        }
      }

      // create openode charge
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: process.env.OPEN_NODE_API_KEY || "",
        },
        body: JSON.stringify({
          amount: product,
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

      // check the status first transaction with a btc address
      // check the memepool of all transactions from a btc address

      // save charge info to db (prisma)

      const payment = await opts.ctx.prisma.payment.create({
        data: {
          amount: product,
          paymentOption: opts.input.paymentOption,
          accountTier: opts.input.tier as AccountTier,
          paymentLength: opts.input.length as PaymentLength,
          paymentProcessorId: cleanRes.data.id,
          paymentProcessor: "OPEN_NODE",
          paymentProcessorMetadata: cleanRes.data,
          hostedCheckoutUrl: cleanRes.data.hosted_checkout_url,
          status: PaymentStatus.PROCESSING,
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
      tier: AccountTierZod,
    })
  )
  .output(PaymentZod)
  .mutation(async (opts) => {
    console.log("opts", opts.input);
    try {
      // figure out what product

      // default should be cheapest
      let product;

      let mode = "subscription";

      const tier = opts.input.tier as AccountTier;
      console.log("opts.inputs.length", opts.input.length);

      console.log("tier", tier);
      console.log(tier === AccountTier.ADVANCED_ALICE);

      let amount = 10000;
      if (tier === AccountTier.BEGINNER_BOB) {
        if (opts.input.length === "LIFETIME") {
          product = TEST_PRODUCTS.BB.LIFETIME;

          mode = "payment";
        } else if (opts.input.length === "ONE_YEAR") {
          product = TEST_PRODUCTS.BB.ONE_YEAR;
        } else if (opts.input.length === "ONE_MONTH") {
          product = TEST_PRODUCTS.BB.ONE_MONTH;
        } else {
          product = TEST_PRODUCTS.BB.ONE_MONTH;
        }
      } else if (tier === AccountTier.ADVANCED_ALICE) {
        console.log("advanced alice");
        if (opts.input.length === "LIFETIME") {
          product = TEST_PRODUCTS.AA.LIFETIME;

          mode = "payment";
        } else if (opts.input.length === "ONE_YEAR") {
          product = TEST_PRODUCTS.AA.ONE_YEAR;
        } else if (opts.input.length === "ONE_MONTH") {
          product = TEST_PRODUCTS.AA.ONE_MONTH;
        } else {
          product = TEST_PRODUCTS.AA.ONE_MONTH;
        }
      }

      console.log("product", product);
      // check if their are any previous payments for this user that may have a stripe custoemr id

      let stripeCustomerId = null;

      if (opts.ctx.user) {
        const lastPayment = await opts.ctx.prisma.payment.findFirst({
          where: {
            userId: opts.ctx.user.id,
            stripeCustomerId: {
              not: null,
            },
            status: "PAID",
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        if (lastPayment) {
          stripeCustomerId = lastPayment.stripeCustomerId;
        }
      }

      if (stripeCustomerId === null) {
        const createStripeCustomer = await stripe.customers.create({
          description: "BitScript Stripe Customer",
        });

        stripeCustomerId = createStripeCustomer.id;
      }

      console.log("mode", mode);

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: product,
            quantity: 1,
          },
        ],
        customer: stripeCustomerId,
        mode: mode,
        success_url: `${getBaseUrl()}/profile?success=true`,
        cancel_url: `${getBaseUrl()}/profile/?canceled=true`,
        automatic_tax: { enabled: true },
        customer_update: {
          address: "auto",
        },
      });

      console.log("session", session);
      const payment = await opts.ctx.prisma.payment.create({
        data: {
          amount: amount,
          status: "PROCESSING",
          paymentOption: "USD",
          accountTier: opts.input.tier as AccountTier,
          paymentLength: opts.input.length as PaymentLength,
          paymentProcessorId: session.id,
          paymentProcessor: "STRIPE",
          paymentProcessorMetadata: session,
          hostedCheckoutUrl: session.url,
          stripeCustomerId: stripeCustomerId,
          userId: opts.ctx.user?.id || null,
          stripePaymentIntentId: session.payment_intent,
        },
      });

      const paymentRes = createClientBasedPayment(payment);

      console.log("paymentRes", paymentRes);
      return paymentRes;
    } catch (err: any) {
      throw new Error(err);
    }
  });

export const createStripeCustomerPortal = procedure
  .output(z.string())
  .mutation(async (opts) => {
    try {
      // ensure their a user tied to ctx
      if (opts.ctx.user) {
        // fetch the latest payment for this user
        const payment = await opts.ctx.prisma.payment.findFirst({
          where: {
            userId: opts.ctx.user.id,
            stripeCustomerId: {
              not: null,
            },
            status: "PAID",
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        // if the user is able to see the customer portal than they should have at least paid with stripe once before
        // other wise its' their first stripe payment & they should use the checkout session
        if (!payment) {
          throw new Error("No Stripe Customer ID found tied to user");
        }

        const stripeCustomerId = payment.stripeCustomerId;
        //fetch the customer portal

        const session = await stripe.billingPortal.sessions.create({
          customer: stripeCustomerId,
          return_url: `${getBaseUrl()}/settings`,
        });

        if (!session) {
          throw new Error("No customer portal session found");
        }

        return session.url;
      } else {
        throw new Error("No user found");
      }
    } catch (err: any) {
      throw new Error(err);
    }
  });
