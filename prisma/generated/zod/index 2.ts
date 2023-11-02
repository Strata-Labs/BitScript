import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export type JsonValueType = z.infer<typeof JsonValue>;

export const NullableJsonValue = z
  .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

export type InputJsonValueType = z.infer<typeof InputJsonValue>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','createdAt','hashedPassword']);

export const IPAddressScalarFieldEnumSchema = z.enum(['id','address','createdAt','userId']);

export const PaymentScalarFieldEnumSchema = z.enum(['id','createdAt','status','amount','paymentOption','paymentLength','paymentProcessor','paymentProcessorId','validUntil','startedAt','paymentDate','hasAccess','userId','paymentProcessorMetadata']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((v) => transformJsonNull(v));

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]);

export const PaymentProcessorSchema = z.enum(['STRIPE','OPEN_NODE']);

export type PaymentProcessorType = `${z.infer<typeof PaymentProcessorSchema>}`

export const PaymentLengthSchema = z.enum(['ONE_MONTH','ONE_YEAR','LIFETIME']);

export type PaymentLengthType = `${z.infer<typeof PaymentLengthSchema>}`

export const PaymentOptionSchema = z.enum(['USD','BTC','LIGHTNING']);

export type PaymentOptionType = `${z.infer<typeof PaymentOptionSchema>}`

export const PaymentStatusSchema = z.enum(['CREATED','PROCESSING','PAID','UNPAID','REFUNDED','FAILED']);

export type PaymentStatusType = `${z.infer<typeof PaymentStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  email: z.string(),
  createdAt: z.coerce.date().nullable(),
  hashedPassword: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// IP ADDRESS SCHEMA
/////////////////////////////////////////

export const IPAddressSchema = z.object({
  id: z.number().int(),
  address: z.string(),
  createdAt: z.coerce.date().nullable(),
  userId: z.number().int(),
})

export type IPAddress = z.infer<typeof IPAddressSchema>

/////////////////////////////////////////
// PAYMENT SCHEMA
/////////////////////////////////////////

export const PaymentSchema = z.object({
  status: PaymentStatusSchema,
  paymentOption: PaymentOptionSchema,
  paymentLength: PaymentLengthSchema,
  paymentProcessor: PaymentProcessorSchema,
  id: z.number().int(),
  createdAt: z.coerce.date(),
  amount: z.number().int(),
  paymentProcessorId: z.string(),
  validUntil: z.coerce.date().nullable(),
  startedAt: z.coerce.date().nullable(),
  paymentDate: z.coerce.date().nullable(),
  hasAccess: z.boolean().nullable(),
  userId: z.number().int().nullable(),
  paymentProcessorMetadata: NullableJsonValue.optional(),
})

export type Payment = z.infer<typeof PaymentSchema>
