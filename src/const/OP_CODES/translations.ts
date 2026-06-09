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
import { OP_DUPEs } from "./DUP.es";
import { OP_ZERONOTEQUALEs } from "./0NOTEQUAL.es";
import { OP_ONEADDEs } from "./1ADD.es";
import { OP_ONESUBEs } from "./1SUB.es";
import { OP_2DIVEs } from "./2DIV.es";
import { OP_2DROPEs } from "./2DROP.es";
import { OP_2MULEs } from "./2MUL.es";
import { OP_2SWAPEs } from "./2SWAP.es";
import { OP_ABSEs } from "./ABS.es";
import { OP_ADDEs } from "./ADD.es";
import { OP_BOOLANDEs } from "./BOOLAND.es";
import { OP_BOOLOREs } from "./BOOLOR.es";
import { OP_CHECKMULTISIGEs } from "./CHECKMULTISIG.es";
import { OP_CHECKSIGEs } from "./CHECKSIG.es";
import { OP_CHECKLOCKTIMEVERIFYEs } from "./CHECK_LOCK_TIME.es";
import { OP_CHECK_SEQUENCE_VERIFYEs } from "./CHECK_SEQUENCE_VERIFY.es";
import { OP_CHECKSIGADDEs } from "./CHECK_SIG_ADD.es";
import { OP_DEPTHEs } from "./DEPTH.es";
import { OP_DROPEs } from "./DROP.es";
import { OP_EQUALEs } from "./EQUAL.es";
import { OP_EQUALVERIFYEs } from "./EQUALVERIFY.es";
import { OP_FROMALTSTACKEs } from "./FROMALTSTACK.es";
import { OP_GREATERTHANEs } from "./GREATERTHAN.es";
import { OP_GREATERTHANOREQUALEs } from "./GREATERTHANOREQUAL.es";
import { OP_HASH160Es } from "./HASH160.es";
import { OP_HASH256Es } from "./HASH256.es";
import { OP_INVERTEs } from "./INVERT.es";
import { OP_LESSTHANEs } from "./LESSTHAN.es";
import { OP_LESSTHANOREQUALEs } from "./LESSTHANOREQUAL.es";
import { OP_LSHIFTEs } from "./LSHIFT.es";
import { OP_MAXEs } from "./MAX.es";
import { OP_MINEs } from "./MIN.es";
import { OP_NEGATEEs } from "./NEGATE.es";
import { OP_NIPEs } from "./NIP.es";
import { OP_NOTEs } from "./NOT.es";
import { OP_NUMEQUALEs } from "./NUMEQUAL.es";
import { OP_NUMEQUALVERIFYEs } from "./NUMEQUALVERIFY.es";
import { OP_NUMNOTEQUALEs } from "./NUMNOTEQUAL.es";
import { OP_ANDEs } from "./OP_AND.es";
import { OP_DIVEs } from "./OP_DIV.es";
import { OP_MODEs } from "./OP_MOD.es";
import { OP_MULEs } from "./OP_MUL.es";
import { OP_OREs } from "./OP_OR.es";
import { OP_PICKEs } from "./OP_PICK.es";
import { OP_ROLLEs } from "./OP_ROLL.es";
import { OP_ROTEs } from "./OP_ROT.es";
import { OP_TUCKEs } from "./OP_TUCK.es";
import { OP_XOREs } from "./OP_XOR.es";
import { OP_OVEREs } from "./OVER.es";
import { OP_PUSHDATAEs } from "./PUSH_DATA.es";
import { OP_RETURNEs } from "./RETURN.es";
import { OP_RIPEMD160Es } from "./RIPEMD160.es";
import { OP_RSHIFTEs } from "./RSHIFT.es";
import { OP_SHA1Es } from "./SHA1.es";
import { OP_SHA256Es } from "./SHA256.es";
import { OP_SIZEEs } from "./SIZE.es";
import { OP_SUBEs } from "./SUB.es";
import { OP_SWAPEs } from "./SWAP.es";
import { OP_TOALTSTACKEs } from "./TO_ALTSTACK.es";
import { OP_WITHINEs } from "./WHITHIN.es";

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

  OP_DUP: OP_DUPEs,
  OP_ZERONOTEQUAL: OP_ZERONOTEQUALEs,
  OP_1ADD: OP_ONEADDEs,
  OP_1SUB: OP_ONESUBEs,
  OP_2DIV: OP_2DIVEs,
  OP_2DROP: OP_2DROPEs,
  OP_2MUL: OP_2MULEs,
  OP_2SWAP: OP_2SWAPEs,
  OP_ABS: OP_ABSEs,
  OP_ADD: OP_ADDEs,
  OP_BOOLAND: OP_BOOLANDEs,
  OP_BOOLOR: OP_BOOLOREs,
  OP_CHECKMULTISIG: OP_CHECKMULTISIGEs,
  OP_CHECKSIG: OP_CHECKSIGEs,
  OP_CHECKLOCKTIMEVERIFY: OP_CHECKLOCKTIMEVERIFYEs,
  OP_CHECKSEQUENCEVERIFY: OP_CHECK_SEQUENCE_VERIFYEs,
  OP_CHECK_SIG_ADD: OP_CHECKSIGADDEs,
  OP_DEPTH: OP_DEPTHEs,
  OP_DROP: OP_DROPEs,
  OP_EQUAL: OP_EQUALEs,
  OP_EQUALVERIFY: OP_EQUALVERIFYEs,
  OP_FROMALTSTACK: OP_FROMALTSTACKEs,
  OP_GREATERTHAN: OP_GREATERTHANEs,
  OP_GREATERTHANOREQUAL: OP_GREATERTHANOREQUALEs,
  OP_HASH160: OP_HASH160Es,
  OP_HASH256: OP_HASH256Es,
  OP_INVERT: OP_INVERTEs,
  OP_LESSTHAN: OP_LESSTHANEs,
  OP_LESSTHANOREQUAL: OP_LESSTHANOREQUALEs,
  OP_LSHIFT: OP_LSHIFTEs,
  OP_MAX: OP_MAXEs,
  OP_MIN: OP_MINEs,
  OP_NEGATE: OP_NEGATEEs,
  OP_NIP: OP_NIPEs,
  OP_NOT: OP_NOTEs,
  OP_NUMEQUAL: OP_NUMEQUALEs,
  OP_NUMEQUALVERIFY: OP_NUMEQUALVERIFYEs,
  OP_NUMNOTEQUAL: OP_NUMNOTEQUALEs,
  OP_AND: OP_ANDEs,
  OP_DIV: OP_DIVEs,
  OP_MOD: OP_MODEs,
  OP_MUL: OP_MULEs,
  OP_OR: OP_OREs,
  OP_PICK: OP_PICKEs,
  OP_ROLL: OP_ROLLEs,
  OP_ROT: OP_ROTEs,
  OP_TUCK: OP_TUCKEs,
  OP_XOR: OP_XOREs,
  OP_OVER: OP_OVEREs,
  OP_PUSHDATA: OP_PUSHDATAEs,
  OP_RETURN: OP_RETURNEs,
  OP_RIPEMD_160: OP_RIPEMD160Es,
  OP_RSHIFT: OP_RSHIFTEs,
  OP_SHA1: OP_SHA1Es,
  OP_SHA256: OP_SHA256Es,
  OP_SIZE: OP_SIZEEs,
  OP_SUB: OP_SUBEs,
  OP_SWAP: OP_SWAPEs,
  OP_TOALTSTACK: OP_TOALTSTACKEs,
  OP_WITHIN: OP_WITHINEs,
};

const opCodesByLocale: Record<string, LocaleOpCodeRegistry> = { fr, es };

export function getLocalizedOpCode(
  english: OP_CODE_PAGE_PROPS,
  locale: string | undefined
): OP_CODE_PAGE_PROPS {
  if (!locale || locale === "en") return english;
  return opCodesByLocale[locale]?.[english.name] ?? english;
}
