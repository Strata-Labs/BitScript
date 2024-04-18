import { TransactionFeResponse } from "@/deserialization/model";
import { atom } from "jotai";
import { type HashingAlgorithm } from "./ReplitComponents/HashingAlgorithm";

export const TxTextSectionHoverScriptAtom = atom<number[]>([]);
export const TxTextSectionClickScript = atom<number[]>([]);

export const modularPopUp = atom(false);

export const isClickedModularPopUpOpen = atom(false);
export const txDataAtom = atom<TransactionFeResponse | null>(null);
export const hashingAlgorithm = atom<HashingAlgorithm>({
  Name: "HASH256",
  Desc: "Bitcoin-specific algorithm that hashes SHA256 x2",
  Returns: "32-bytes | 64-chars",
  Op: "OP_HASH256",
  Script: "P2WSH",
  BigDesc:
    "is one of two of Bitcoin-specific hashing algorithms (the other is HASH160). This hash takes in one input & hashes it with SHA256 not once but twice. HASH256 is seen throughout many, many parts of Bitcoin development including but not limited to: block hashes, transaction hashes",
  Link: "/OPS/OP_HASH256",
  LinkScript: "/scripts/P2WSH",
});

export const showHashingAlgorithm = atom(false);
