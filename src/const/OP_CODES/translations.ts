import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";

// Per-locale opcode translations, keyed by the English opcode's `name`
// (e.g. "OP_DUP", "OP_HASH160"). To add a new translation:
//   1. Create a sibling file like `DUP.fr.ts` that exports the translated
//      OP_CODE_PAGE_PROPS (the simplest pattern is to spread the English
//      opcode and override fields; see DUP.fr.ts).
//   2. Import it below and register it under its locale by `name`.
// Missing translations fall back to English automatically.
//
// Keep `name`, `opCode`, `hex`, `linkPath`, `tileImage`, `generalType`,
// `inputNum`, `returnNum`, and `visualProps.stackSteps`/`failureSteps`
// identical to the English version so URLs, assets, and the animation logic
// stay stable across locales.

import { OP_DUPFr } from "./DUP.fr";
import { OP_ZERONOTEQUALFr } from "./0NOTEQUAL.fr";
import { OP_ONEADDFr } from "./1ADD.fr";
import { OP_ONESUBFr } from "./1SUB.fr";
import { OP_2DIVFr } from "./2DIV.fr";
import { OP_2DROPFr } from "./2DROP.fr";
import { OP_2MULFr } from "./2MUL.fr";
import { OP_2SWAPFr } from "./2SWAP.fr";
import { OP_ABSFr } from "./ABS.fr";
import { OP_ADDFr } from "./ADD.fr";
import { OP_BOOLANDFr } from "./BOOLAND.fr";
import { OP_BOOLORFr } from "./BOOLOR.fr";
import { OP_CHECKMULTISIGFr } from "./CHECKMULTISIG.fr";
import { OP_CHECKSIGFr } from "./CHECKSIG.fr";
import { OP_CHECKLOCKTIMEVERIFYFr } from "./CHECK_LOCK_TIME.fr";
import { OP_CHECK_SEQUENCE_VERIFYFr } from "./CHECK_SEQUENCE_VERIFY.fr";
import { OP_CHECKSIGADDFr } from "./CHECK_SIG_ADD.fr";
import { OP_DEPTHFr } from "./DEPTH.fr";
import { OP_DROPFr } from "./DROP.fr";
import { OP_EQUALFr } from "./EQUAL.fr";
import { OP_EQUALVERIFYFr } from "./EQUALVERIFY.fr";
import { OP_FROMALTSTACKFr } from "./FROMALTSTACK.fr";
import { OP_GREATERTHANFr } from "./GREATERTHAN.fr";
import { OP_GREATERTHANOREQUALFr } from "./GREATERTHANOREQUAL.fr";
import { OP_HASH160Fr } from "./HASH160.fr";
import { OP_HASH256Fr } from "./HASH256.fr";
import { OP_INVERTFr } from "./INVERT.fr";
import { OP_LESSTHANFr } from "./LESSTHAN.fr";
import { OP_LESSTHANOREQUALFr } from "./LESSTHANOREQUAL.fr";
import { OP_LSHIFTFr } from "./LSHIFT.fr";
import { OP_MAXFr } from "./MAX.fr";
import { OP_MINFr } from "./MIN.fr";
import { OP_NEGATEFr } from "./NEGATE.fr";
import { OP_NIPFr } from "./NIP.fr";
import { OP_NOTFr } from "./NOT.fr";
import { OP_NUMEQUALFr } from "./NUMEQUAL.fr";
import { OP_NUMEQUALVERIFYFr } from "./NUMEQUALVERIFY.fr";
import { OP_NUMNOTEQUALFr } from "./NUMNOTEQUAL.fr";
import { OP_ANDFr } from "./OP_AND.fr";
import { OP_DIVFr } from "./OP_DIV.fr";
import { OP_MODFr } from "./OP_MOD.fr";
import { OP_MULFr } from "./OP_MUL.fr";
import { OP_ORFr } from "./OP_OR.fr";
import { OP_PICKFr } from "./OP_PICK.fr";
import { OP_ROLLFr } from "./OP_ROLL.fr";
import { OP_ROTFr } from "./OP_ROT.fr";
import { OP_TUCKFr } from "./OP_TUCK.fr";
import { OP_XORFr } from "./OP_XOR.fr";
import { OP_OVERFr } from "./OVER.fr";
import { OP_PUSHDATAFr } from "./PUSH_DATA.fr";
import { OP_RETURNFr } from "./RETURN.fr";
import { OP_RIPEMD160Fr } from "./RIPEMD160.fr";
import { OP_RSHIFTFr } from "./RSHIFT.fr";
import { OP_SHA1Fr } from "./SHA1.fr";
import { OP_SHA256Fr } from "./SHA256.fr";
import { OP_SIZEFr } from "./SIZE.fr";
import { OP_SUBFr } from "./SUB.fr";
import { OP_SWAPFr } from "./SWAP.fr";
import { OP_TOALTSTACKFr } from "./TO_ALTSTACK.fr";
import { OP_WITHINFr } from "./WHITHIN.fr";

type LocaleOpCodeRegistry = Record<string, OP_CODE_PAGE_PROPS>;

const fr: LocaleOpCodeRegistry = {
  OP_DUP: OP_DUPFr,
  OP_ZERONOTEQUAL: OP_ZERONOTEQUALFr,
  OP_1ADD: OP_ONEADDFr,
  OP_1SUB: OP_ONESUBFr,
  OP_2DIV: OP_2DIVFr,
  OP_2DROP: OP_2DROPFr,
  OP_2MUL: OP_2MULFr,
  OP_2SWAP: OP_2SWAPFr,
  OP_ABS: OP_ABSFr,
  OP_ADD: OP_ADDFr,
  OP_BOOLAND: OP_BOOLANDFr,
  OP_BOOLOR: OP_BOOLORFr,
  OP_CHECKMULTISIG: OP_CHECKMULTISIGFr,
  OP_CHECKSIG: OP_CHECKSIGFr,
  OP_CHECKLOCKTIMEVERIFY: OP_CHECKLOCKTIMEVERIFYFr,
  OP_CHECKSEQUENCEVERIFY: OP_CHECK_SEQUENCE_VERIFYFr,
  OP_CHECK_SIG_ADD: OP_CHECKSIGADDFr,
  OP_DEPTH: OP_DEPTHFr,
  OP_DROP: OP_DROPFr,
  OP_EQUAL: OP_EQUALFr,
  OP_EQUALVERIFY: OP_EQUALVERIFYFr,
  OP_FROMALTSTACK: OP_FROMALTSTACKFr,
  OP_GREATERTHAN: OP_GREATERTHANFr,
  OP_GREATERTHANOREQUAL: OP_GREATERTHANOREQUALFr,
  OP_HASH160: OP_HASH160Fr,
  OP_HASH256: OP_HASH256Fr,
  OP_INVERT: OP_INVERTFr,
  OP_LESSTHAN: OP_LESSTHANFr,
  OP_LESSTHANOREQUAL: OP_LESSTHANOREQUALFr,
  OP_LSHIFT: OP_LSHIFTFr,
  OP_MAX: OP_MAXFr,
  OP_MIN: OP_MINFr,
  OP_NEGATE: OP_NEGATEFr,
  OP_NIP: OP_NIPFr,
  OP_NOT: OP_NOTFr,
  OP_NUMEQUAL: OP_NUMEQUALFr,
  OP_NUMEQUALVERIFY: OP_NUMEQUALVERIFYFr,
  OP_NUMNOTEQUAL: OP_NUMNOTEQUALFr,
  OP_AND: OP_ANDFr,
  OP_DIV: OP_DIVFr,
  OP_MOD: OP_MODFr,
  OP_MUL: OP_MULFr,
  OP_OR: OP_ORFr,
  OP_PICK: OP_PICKFr,
  OP_ROLL: OP_ROLLFr,
  OP_ROT: OP_ROTFr,
  OP_TUCK: OP_TUCKFr,
  OP_XOR: OP_XORFr,
  OP_OVER: OP_OVERFr,
  OP_PUSHDATA: OP_PUSHDATAFr,
  OP_RETURN: OP_RETURNFr,
  OP_RIPEMD_160: OP_RIPEMD160Fr,
  OP_RSHIFT: OP_RSHIFTFr,
  OP_SHA1: OP_SHA1Fr,
  OP_SHA256: OP_SHA256Fr,
  OP_SIZE: OP_SIZEFr,
  OP_SUB: OP_SUBFr,
  OP_SWAP: OP_SWAPFr,
  OP_TOALTSTACK: OP_TOALTSTACKFr,
  OP_WITHIN: OP_WITHINFr,
};

const es: LocaleOpCodeRegistry = {
  // coworker: add Spanish opcode entries here, e.g.
  // OP_DUP: OP_DUPEs,
};

const opCodesByLocale: Record<string, LocaleOpCodeRegistry> = { fr, es };

export function getLocalizedOpCode(
  english: OP_CODE_PAGE_PROPS,
  locale: string | undefined
): OP_CODE_PAGE_PROPS {
  if (!locale || locale === "en") return english;
  return opCodesByLocale[locale]?.[english.name] ?? english;
}
