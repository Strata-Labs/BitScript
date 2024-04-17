import { TransactionFeResponse } from "@/deserialization/model";
import { atom } from "jotai";

export const TxTextSectionHoverScriptAtom = atom<number[]>([]);
export const TxTextSectionClickScript = atom<number[]>([]);

export const modularPopUp = atom(false);

export const isClickedModularPopUpOpen = atom(false);
export const txDataAtom = atom<TransactionFeResponse | null>(null);
