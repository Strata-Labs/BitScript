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
import { OP_EQUAL } from "@/const/OP_CODES/EQUAL";
import { OP_EQUALVERIFY } from "@/const/OP_CODES/EQUALVERIFY";
import { OP_RETURN } from "@/const/OP_CODES/RETURN";

import { OP_RIPEMD160 } from "@/const/OP_CODES/RIPEMD160";
import { OP_SHA256 } from "@/const/OP_CODES/SHA256";
import { OP_HASH256 } from "@/const/OP_CODES/HASH256";
import { OP_WITHIN } from "@/const/OP_CODES/WHITHIN";
import { OP_SHA1 } from "@/const/OP_CODES/SHA1";

export const OP_CODES: OP_CODE_PAGE_PROPS[] = [
  OP_ADD,
  OP_CHECKLOCKTIMEVERIFY,
  OP_CHECK_SEQUENCE_VERIFY,
  OP_MULTI_CHECKSIG,
  OP_CHECKSIG,
  OP_DEPTH,
  OP_DROP,
  OP_DUP,
  OP_EQUAL,
  OP_EQUALVERIFY,
  OP_HASH160,
  OP_HASH256,
  OP_RETURN,
  OP_RIPEMD160,
  OP_SHA1,
  OP_SHA256,
  OP_WITHIN,
];
