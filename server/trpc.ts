import { initTRPC } from "@trpc/server";
import { Context } from "./context";
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
      const now = new Date();
      if (now < validUntil) {
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
