import { z } from "zod";

import { PaymentLength, PaymentOption, PaymentProcessor } from "@prisma/client";

// Payment Model
export const PaymentZod = z.object({
  id: z.number().int().nonnegative(),
  createdAt: z.date(),
  status: z.enum([
    "CREATED",
    "PROCESSING",
    "PAID",
    "UNPAID",
    "REFUNDED",
    "FAILED",
  ]),
  amount: z.number().int().nonnegative(),
  paymentOption: z.enum(["USD", "BTC", "LIGHTNING"]),
  paymentLength: z.enum(["ONE_MONTH", "ONE_YEAR", "LIFETIME"]),
  paymentProcessor: z.enum(["STRIPE", "OPEN_NODE"]),
  paymentProcessorId: z.string(),
  validUntil: z.date().nullable(),
  startedAt: z.date().nullable(),
  paymentDate: z.date().nullable(),
  hasAccess: z.boolean().nullable(),
  userId: z.number().int().nonnegative().nullable(),
  hostedCheckoutUrl: z.string().nullable(),
  paymentProcessorMetadata: z.any().nullable(), // `z.any()` is for JSON type, but be cautious as it doesn't validate the content
});

// User Model
export const UserZod: any = z.object({
  id: z.number().int().nonnegative(),
  email: z.string().email(),
  createdAt: z.date().nullable(),
  hashedPassword: z.string(),
  ips: z.array(z.lazy(() => IPAddressZod)).nullable(), // For recursive references
  Payment: z.array(z.lazy(() => PaymentZod)).nullable(),
});

// IPAddress Model
export const IPAddressZod: any = z.object({
  id: z.number().int().nonnegative().nullable(),
  address: z.string(),
  createdAt: z.date().nullable(),
  userId: z.number().int().nonnegative(),
  user: UserZod.nullable(),
});

export enum PaymentStatus {
  CREATED = "CREATED",
  PROCESSING = "PROCESSING",
  PAID = "PAID",
  UNPAID = "UNPAID",
  REFUNDED = "REFUNDED",
  FAILED = "FAILED",
}

export const PaymentLengthZod = z.nativeEnum(PaymentLength);
export const PaymentOptionZod = z.nativeEnum(PaymentOption);
export const PaymentStatusZod = z.nativeEnum(PaymentStatus);
