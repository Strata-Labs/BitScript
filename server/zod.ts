import { z } from "zod";

import {
  PaymentLength,
  PaymentOption,
  PaymentProcessor,
  UserType,
  AccountTier,
} from "@prisma/client";

// UserHistory Model
export const UserHistoryZod = z.object({
  id: z.number().int().nonnegative(),
  createdAt: z.date(),
  userId: z.number().int().nonnegative().nullable(),
  metadata: z.lazy(() => UserHistoryMetaDataZod).nullable(),
});

// UserLesson Model
export const UserLessonZod = z.object({
  id: z.number().int().nonnegative(),
  userId: z.number().int().nonnegative(),
  completed: z.boolean(),
  createdAt: z.date(),
  lessonId: z.number().int().nonnegative(),
});

export const UserHistoryMetaDataZod = z.object({
  action: z.string(),
  entry: z.string(),
  uri: z.string().nullable(),
});
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
  accountTier: z.enum(["BEGINNER_BOB", "ADVANCED_ALICE"]),
});

// User Model
export const UserZod = z.object({
  id: z.number().int().nonnegative(),
  email: z.string().email(),
  createdAt: z.date().nullable(),
  //ips: z.array(z.lazy(() => IPAddressZod)).nullable(), // For recursive references
  //payment: z.array(z.lazy(() => PaymentZod)).nullable(),
  sessionToken: z.string().nullable().optional(),
});

// IPAddress Model
export const IPAddressZod = z.object({
  id: z.number().int().nonnegative().nullable(),
  address: z.string(),
  createdAt: z.date().nullable(),
  userId: z.number().int().nonnegative(),
  user: UserZod.nullable(),
  queryCount: z.number(),
  cooldownEnd: z.date().optional(),
});

// Queries Model
export const QueriesZod = z.object({
  id: z.number().int(),
  createdAt: z.date().nullable(),
  userId: z.number().int(),
  userType: z.nativeEnum(UserType).default(UserType.BEGINNER),
  queryCount: z.number().int().default(10),
  cooldownEnd: z.date().nullable(),
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
export const AccountTierZod = z.nativeEnum(AccountTier);

export type User = z.infer<typeof UserZod>;
