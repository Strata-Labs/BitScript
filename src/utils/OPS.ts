import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OP_Dup";

import { OP_ADD } from "@/const/OP_CODES/ADD";
import { OP_CHECKSIG } from "@/const/OP_CODES/CHECKSIG";
import { OP_DEPTH } from "@/const/OP_CODES/DEPTH";
import { OP_DUP } from "@/const/OP_CODES/DUP";
import { OP_HASH_160 } from "@/const/OP_CODES/HASH_160";
import { OP_EQUALVERIFY } from "@/const/OP_CODES/OP_EQUALVERIFY";
import { OP_RIPEMD160 } from "@/const/OP_CODES/OP_RIPEMD160";
import { OP_SHA256 } from "@/const/OP_CODES/OP_SHA256";

export const OP_CODES: OP_CODE_PAGE_PROPS[] = [
  // OP_ADD,
  // OP_CHECKSIG,
  OP_DEPTH,
  OP_DUP,
  // OP_EQUALVERIFY,
  // OP_HASH_160,
  // OP_RIPEMD160,
  // OP_SHA256,
];
