import { PaymentZod, UserHistoryZod, UserZod } from "@server/zod";
import { atom } from "jotai";
import { z } from "zod";

export type Payment = z.infer<typeof PaymentZod>;
export type User = z.infer<typeof UserZod>;
export type UserHistory = z.infer<typeof UserHistoryZod>;

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

export const showLoginModalAtom = atom(false);

export const isClickedModularPopUpOpen = atom(false);

export const TxTextSectionHoverScriptAtom = atom<number[]>([]);
export const TxTextSectionClickScript = atom<number[]>([]);

export const hoveredImageMember = atom("");
export const userSignedIn = atom(false);

export const userHistoryAtom = atom<UserHistory[]>([]);

export const corePaymentAton = atom<Payment | null>(null);
export const coreUserAton = atom<User | null>(null);
export const coreUserTokenAtom = atom<string | null>(null);

export const userTokenAtom = atom(
  (get) => get(coreUserTokenAtom),
  (get, set, update: string | null) => {
    localStorage.setItem("token", update || "");
    set(coreUserTokenAtom, update);
  }
);

userTokenAtom.onMount = (setAtom) => {
  const token = localStorage.getItem("token");
  if (token) {
    setAtom(token);
  }
};

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

export const userAtom = atom(
  (get) => get(coreUserAton),
  (get, set, update: User | null) => {
    localStorage.setItem("user", JSON.stringify(update));
    set(coreUserAton, update);
  }
);

userAtom.onMount = (setAtom) => {
  const user = localStorage.getItem("user");
  if (user) {
    setAtom(JSON.parse(user));
  }
};

export const resetPassword = atom(false);
export const resetEmail = atom(false);
export const hashingAlgorithm = atom("HASH256");
