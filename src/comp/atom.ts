import { atom } from "jotai";
import { z } from "zod";

// User Model
const UserZod: any = z.object({
  id: z.number().int().nonnegative(),
  email: z.string().email(),
  createdAt: z.date().nullable(),
  hashedPassword: z.string(),
  ips: z.array(z.lazy(() => IPAddressZod)).nullable(), // For recursive references
  Payment: z.array(z.lazy(() => PaymentZod)).nullable(),
});

// IPAddress Model
const IPAddressZod: any = z.object({
  id: z.number().int().nonnegative().nullable(),
  address: z.string(),
  createdAt: z.date().nullable(),
  userId: z.number().int().nonnegative(),
  user: UserZod.nullable(),
});

// Payment Model
const PaymentZod = z.object({
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
  User: UserZod.nullable(),
  paymentProcessorMetadata: z.any().nullable(), // `z.any()` is for JSON type, but be cautious as it doesn't validate the content
});

export type Payment = z.infer<typeof PaymentZod>;

export const menuOpen = atom(false);
export const menuSelected = atom("home");
export const popUpOpen = atom(false);
export const activeViewMenu = atom(1);
export const activeSearchView = atom(false);
export const searchQuery = atom("");
export const isSearchOpen = atom(false);
export const OpOrScript = atom(true);
export const ColorOpCode = atom(true);
export const ColorScript = atom(false);
export const popUpExampleOpen = atom(false);
export const modularPopUp = atom(false);
export const isRawHex = atom(false);
export const isRawHexAndState = atom("3");
export const isTxId = atom(false);
export const isTxIdAndState = atom("3");
export const isVersion = atom("1");

export const isClickedModularPopUpOpen = atom(false);

export const TxTextSectionHoverScriptAtom = atom<number[]>([]);
export const TxTextSectionClickScript = atom<number[]>([]);

export const hoveredImageMember = atom("");
export const userSignedIn = atom(false);

export const corePaymentAton = atom<Payment | null>(null);

export const paymentAtom = atom(
  (get) => get(corePaymentAton),
  (get, set, update: Payment | null) => {
    localStorage.setItem("payment", JSON.stringify(update));
    set(corePaymentAton, update);
  }
);

paymentAtom.onMount = (setAtom) => {
  const payment = localStorage.getItem("payment");
  if (payment) {
    setAtom(JSON.parse(payment));
  }
};

export const resetPassword = atom(false);
export const resetEmail = atom(false);
export const hashingAlgorithm = atom("HASH256");
