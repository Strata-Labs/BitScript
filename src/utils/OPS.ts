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
import { OP_ONEADD } from "@/const/OP_CODES/1ADD";
import { OP_MAX } from "@/const/OP_CODES/MAX";
import { OP_MIN } from "@/const/OP_CODES/MIN";
import { OP_NIP } from "@/const/OP_CODES/NIP";
import { OP_OVER } from "@/const/OP_CODES/OVER";
import { OP_SIZE } from "@/const/OP_CODES/SIZE";
import { OP_SWAP } from "@/const/OP_CODES/SWAP";
import { OP_ZERONOTEQUAL } from "@/const/OP_CODES/0NOTEQUAL";
import { OP_ONESUB } from "@/const/OP_CODES/1SUB";
import { OP_ABS } from "@/const/OP_CODES/ABS";
import { OP_BOOLAND } from "@/const/OP_CODES/BOOLAND";
import { OP_BOOLOR } from "@/const/OP_CODES/BOOLOR";
import { OP_GREATERTHAN } from "@/const/OP_CODES/GREATERTHAN";
import { OP_GREATERTHANOREQUAL } from "@/const/OP_CODES/GREATERTHANOREQUAL";
import { OP_LESSTHAN } from "@/const/OP_CODES/LESSTHAN";
import { OP_LESSTHANOREQUAL } from "@/const/OP_CODES/LESSTHANOREQUAL";
import { OP_NEGATE } from "@/const/OP_CODES/NEGATE";
import { OP_NOT } from "@/const/OP_CODES/NOT";
import { OP_NUMEQUAL } from "@/const/OP_CODES/NUMEQUAL";
import { OP_NUMEQUALVERIFY } from "@/const/OP_CODES/NUMEQUALVERIFY";
import { OP_NUMNOTEQUAL } from "@/const/OP_CODES/NUMNOTEQUAL";
import { OP_SUB } from "@/const/OP_CODES/SUB";
import { OP_PUSHDATA } from "@/const/OP_CODES/PUSH_DATA";
import { OP_CHECKSIGADD } from "@/const/OP_CODES/CHECK_SIG_ADD";
import { OP_2SWAP } from "@/const/OP_CODES/2SWAP";
import { OP_TOALTSTACK } from "@/const/OP_CODES/TO_ALTSTACK";
import { OP_FROMALTSTACK } from "@/const/OP_CODES/FROMALTSTACK";
import OP_2DROP from "@/const/OP_CODES/2DROP";
import { OP_ROT } from "@/const/OP_CODES/OP_ROT";
import { OP_TUCK } from "@/const/OP_CODES/OP_TUCK";
import { OP_ROLL } from "@/const/OP_CODES/OP_ROLL";

export const OP_CODES: OP_CODE_PAGE_PROPS[] = [
  OP_ZERONOTEQUAL,
  OP_ONEADD,
  OP_ONESUB,
  OP_ABS,
  OP_ADD,
  OP_BOOLAND,
  OP_BOOLOR,
  OP_CHECKLOCKTIMEVERIFY,
  OP_CHECK_SEQUENCE_VERIFY,
  OP_MULTI_CHECKSIG,
  OP_CHECKSIG,
  OP_DEPTH,
  OP_DROP,
  OP_DUP,
  OP_EQUAL,
  OP_EQUALVERIFY,
  OP_GREATERTHAN,
  OP_GREATERTHANOREQUAL,
  OP_HASH160,
  OP_HASH256,
  OP_LESSTHAN,
  OP_LESSTHANOREQUAL,
  OP_MAX,
  OP_MIN,
  OP_NEGATE,
  OP_NIP,
  OP_NOT,
  OP_NUMEQUAL,
  OP_NUMEQUALVERIFY,
  OP_NUMNOTEQUAL,
  OP_OVER,
  OP_PUSHDATA,
  OP_RETURN,
  OP_RIPEMD160,
  OP_SHA1,
  OP_SHA256,
  OP_SIZE,
  OP_SUB,
  OP_SWAP,
  OP_WITHIN,
  OP_CHECKSIGADD, 
  OP_2SWAP, 
  OP_TOALTSTACK, 
  OP_FROMALTSTACK, 
  OP_2DROP, 
  OP_ROT, 
  OP_TUCK, 
  OP_ROLL
];
