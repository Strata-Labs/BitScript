import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";

import { OP_ADD } from "@/const/OP_CODES/ADD";
import OP_MULTI_CHECKSIG from "@/const/OP_CODES/CHECKMULTISIG";
import { OP_CHECKSIG } from "@/const/OP_CODES/CHECKSIG";
import OP_CHECKLOCKTIMEVERIFY from "@/const/OP_CODES/CHECK_LOCK_TIME";
import OP_CHECK_SEQUENCE_VERIFY from "@/const/OP_CODES/CHECK_SEQUENCE_VERIFY";
import { OP_DEPTH } from "@/const/OP_CODES/DEPTH";
import OP_DROP from "@/const/OP_CODES/DROP";
import { OP_DUP } from "@/const/OP_CODES/DUP";
import { OP_HASH160 } from "@/const/OP_CODES/HASH160";
import { OP_EQUALVERIFY } from "@/const/OP_CODES/OP_EQUALVERIFY";

import { OP_RIPEMD160 } from "@/const/OP_CODES/OP_RIPEMD160";
import { OP_SHA256 } from "@/const/OP_CODES/OP_SHA256";

export const OP_CODES: OP_CODE_PAGE_PROPS[] = [
  OP_ADD,
  OP_CHECKSIG,
  // OP_DEPTH,
  OP_DUP,
  OP_EQUALVERIFY,
  OP_HASH160,
  OP_DROP,
  OP_MULTI_CHECKSIG,
  OP_CHECKLOCKTIMEVERIFY,
  OP_CHECK_SEQUENCE_VERIFY,
  OP_RIPEMD160,
  // OP_SHA256,
];
