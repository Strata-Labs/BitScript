import { initTRPC } from "@trpc/server";
import { Context } from "./context";
import { PaymentZod } from "./zod";
import { z } from "zod";
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
  console.log("check - createClientBasedPayment");
  console.log(payment);
  const paymentLength = payment.paymentLength;
  const startedAt = payment.startedAt;

  let hasAccess = false;
  if (paymentLength === "LIFETIME") {
    hasAccess = true;
  } else if (paymentLength === "ONE_MONTH") {
    // ensure startedAt was less than a month ago
    // check if startedAt date was less than a month ago
    if (startedAt) {
      const now = new Date();
      const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
      if (startedAt < monthAgo) {
        hasAccess = true;
      }
    }
  } else if (paymentLength === "ONE_YEAR") {
    // same as above but with a year
    if (startedAt) {
      const now = new Date();
      const yearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
      if (startedAt < yearAgo) {
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

    paymentProcessorMetadata: payment.paymentProcessorMetadata,
  };

  const paymentZod = PaymentZod.parse(paymentTing);
  console.log("paymentZod", paymentZod);

  return paymentTing;
};
