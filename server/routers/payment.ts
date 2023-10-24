import { z } from "zod";
import { procedure, router } from "../trpc";
import { PaymentStatus, PrismaClient } from "@prisma/client";
import fetch from "node-fetch";
import { PaymentLength, PaymentOption, PaymentProcessor } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  PaymentLengthZod,
  PaymentOptionZod,
  PaymentZod,
  UserZod,
} from "./_app";

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

      const paymentRes = {
        id: payment.id,
        createdAt: payment.createdAt,
        status: payment.status,
        amount: payment.amount,
        paymentOption: payment.paymentOption,
        paymentLength: payment.paymentLength,
        paymentProcessor: payment.paymentProcessor,
        paymentProcessorId: payment.paymentProcessorId,
        validUntil: payment.validUntil,
        startedAt: payment.startedAt,
        paymentDate: payment.paymentDate,
        hasAccess: payment.hasAccess,
        userId: payment.userId,
        User: null,
        paymentProcessorMetadata: payment.paymentProcessorMetadata,
      };

      // ensure to check the payment status latest
      console.log("payment.statu", payment.status);
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
          console.log("cleanRes", cleanRes);
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
            console.log("set to paid");
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

            const paymentRes = {
              id: updatedPayment.id,
              createdAt: updatedPayment.createdAt,
              status: updatedPayment.status,
              amount: updatedPayment.amount,
              paymentOption: updatedPayment.paymentOption,
              paymentLength: updatedPayment.paymentLength,
              paymentProcessor: updatedPayment.paymentProcessor,
              paymentProcessorId: updatedPayment.paymentProcessorId,
              validUntil: updatedPayment.validUntil,
              startedAt: updatedPayment.startedAt,
              paymentDate: updatedPayment.paymentDate,
              hasAccess: updatedPayment.hasAccess,
              userId: updatedPayment.userId,
              User: null,
              paymentProcessorMetadata: updatedPayment.paymentProcessorMetadata,
            };

            return paymentRes;
          } else if (cleanRes.data.status === "unpaid") {
            // handle failed or still pending status
            return paymentRes;
          }
        } else {
          return paymentRes;
        }
      } else {
        // since the payment is in a static state unless the some direct action is taken, we can just return the payment
        return paymentRes;
      }
      throw new Error("Something went wrong");
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
          success_url: "https://bitscript-git-stage-setteam.vercel.app/profile",
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
      console.log();
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

      const paymentRes = {
        id: payment.id,
        createdAt: payment.createdAt,
        status: payment.status,
        amount: payment.amount,
        paymentOption: payment.paymentOption,
        paymentLength: payment.paymentLength,
        paymentProcessor: payment.paymentProcessor,
        paymentProcessorId: payment.paymentProcessorId,
        validUntil: payment.validUntil,
        startedAt: payment.startedAt,
        paymentDate: payment.paymentDate,
        hasAccess: payment.hasAccess,
        userId: payment.userId,
        User: null,
        paymentProcessorMetadata: payment.paymentProcessorMetadata,
      };

      return paymentRes;
    } catch (err) {
      console.log("err", err);
      // throw a trpc error
      throw new Error("Something went wrong");
    }
  });
