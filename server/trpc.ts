import { initTRPC } from "@trpc/server";
import { Context, ENV_TYPE } from "./context";
import { PaymentZod } from "./zod";
import { z } from "zod";
import { Payment } from "@prisma/client";
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create();
// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;

export function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return "";

  if (process.env.VERCEL_ENV) {
    let env = ENV_TYPE.DEV;
    if (process.env.VERCEL_ENV === "production") env = ENV_TYPE.PROD;
    if (env === ENV_TYPE.PROD) return "https://www.bitscript.app";
    if (env === ENV_TYPE.DEV)
      return "https://bitscript-git-stage-setteam.vercel.app/";
  }

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

// idea is to parse the payment obj returned by prisma and clean it up to ensure the client always gets the right data
// 1) is `hasAccess` correct since this is based on the payment type & payment length
// 2) ensure data wrapping is correct on dates, remove the relationship from the user model if returned
export const createClientBasedPayment = (
  payment: any
): z.infer<typeof PaymentZod> => {
  //const payment = _payment.scalars;

  const paymentLength = payment.paymentLength;
  const startedAt = payment.startedAt;
  const validUntil = payment.validUntil;

  let hasAccess = false;
  if (paymentLength === "LIFETIME") {
    hasAccess = true;
  } else {
    // check that their is a validUntil date
    if (validUntil) {
      const validUntilDate = new Date(validUntil);
      const now = new Date();
      console.log("validUntilDate", validUntilDate);
      console.log("now", now);
      // check that the validUntil date is in the future

      // if (now.getTime() < validUntilDate.getTime()) {
      //   hasAccess = true;
      // }

      if (now.getTime() > validUntilDate.getTime()) {
        console.log("Date1 has passed Date2");
      } else {
        console.log("Date1 has not passed Date2");
        hasAccess = true;
      }
    }
  }

  const paymentTing = {
    id: payment.id,
    createdAt: payment.createdAt,
    status: payment.status,
    amount: payment.amount,
    accountTier: payment.accountTier,
    paymentOption: payment.paymentOption,
    paymentLength: payment.paymentLength,
    paymentProcessor: payment.paymentProcessor,
    paymentProcessorId: payment.paymentProcessorId,
    validUntil: payment.validUntil,
    startedAt: payment.startedAt,
    paymentDate: payment.paymentDate,
    hasAccess: hasAccess,
    userId: payment.userId,
    hostedCheckoutUrl: payment.hostedCheckoutUrl,
    stripeCustomerId: payment.stripeCustomerId,
    stripeSubscriptionId: payment.stripeSubscriptionId,
    stripePaymentIntentId: payment.stripePaymentIntentId,
    paymentProcessorMetadata: payment.paymentProcessorMetadata,
    User: null,
  };

  const paymentZod = PaymentZod.parse(paymentTing);

  return paymentTing;
};
