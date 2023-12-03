import {
  errInvalidInput,
  errStringLengthInLE8,
  errStringLengthInLE16,
  errStringLengthInLE64,
  errIncompleteVarIntFC,
  errIncompleteVarIntFD,
  errIncompleteVarIntFE,
  errIncompleteVarIntFF,
  errInvalidVersionEndian,
  errNonstandardVersion,
} from "./errors";
import { TxInput, TxWitnessElement } from "./model";
import {
  PushedDataTitle,
  PushedDataDescription,
  KnownScript,
} from "./overlayValues";

////////////////////
// Dynamic Length //
////////////////////
// VarInt: core function for fetching & verifying VarInts, used in fields such as: input count, output count, scriptSigSize, pubkeyScriptSize, witnessElementSize
export function verifyVarInt(varint: string): string {
  const firstTwoChars = varint.substring(0, 2);

  if (firstTwoChars === "fd") {
    if (varint.length < 6) {
      throw errIncompleteVarIntFD;
    }
    return varint.substring(0, 6);
  }

  if (firstTwoChars === "fe") {
    if (varint.length < 10) {
      throw errIncompleteVarIntFE;
    }
    return varint.substring(0, 10);
  }

  if (firstTwoChars === "ff") {
    if (varint.length < 18) {
      throw errIncompleteVarIntFF;
    }
    return varint.substring(0, 18);
  }

  if (parseInt(firstTwoChars, 16) >= parseInt("fd", 16)) {
    throw errIncompleteVarIntFC;
  }

  return varint.substring(0, 2);
}

// scriptSizeLEToBEDec: core function for converting script size from little-endian to big-endian & decimal
export function scriptSizeLEToBEDec(scriptSizeLE: string): {
  scriptSizeBE: string;
  scriptSizeDec: number;
} {
  let scriptSizeBE = "";
  let scriptSizeDec = 0;
  const scriptSizeSize = scriptSizeLE.length;
  if (scriptSizeSize === 2) {
    scriptSizeBE = scriptSizeLE;
    scriptSizeDec = parseInt(scriptSizeBE, 16);
  } else if (scriptSizeSize === 6) {
    scriptSizeBE = leToBe4(scriptSizeLE.slice(2, 6));
    scriptSizeDec = parseInt(scriptSizeBE, 16);
  } else if (scriptSizeSize === 10) {
    scriptSizeBE = leToBe8(scriptSizeLE.slice(2, 10));
    scriptSizeDec = parseInt(scriptSizeBE, 16);
  } else if (scriptSizeSize === 18) {
    scriptSizeBE = leToBe16(scriptSizeLE.slice(2, 18));
    scriptSizeDec = parseInt(scriptSizeBE, 16);
  }
  return { scriptSizeBE, scriptSizeDec };
}


/////////////////
// Endian-ness //
/////////////////
// Little-Endian To Big-Endian
// Available lengths in chars (not bytes): 8, 16, 64
export function leToBe4(le: string): string {
  if (le.length !== 4) {
    throw errInvalidInput;
  }

  let be = "";
  for (let i = 0; i < 4; i += 2) {
    let chunk = le.slice(i, i + 2);
    be = chunk + be;
  }
  return be;
}
export function leToBe8(le: string): string {
  if (le.length !== 8) {
    throw errStringLengthInLE8;
  }

  let be = "";
  for (let i = 0; i < 8; i += 2) {
    let chunk = le.slice(i, i + 2);
    be = chunk + be;
  }
  return be;
}
export function leToBe16(le: string): string {
  if (le.length !== 16) {
    throw errStringLengthInLE16;
  }

  let be = "";
  for (let i = 0; i < 16; i += 2) {
    let chunk = le.slice(i, i + 2);
    be = chunk + be;
  }
  return be;
}
export function leToBe64(le: string): string {
  if (le.length !== 64) {
    throw errStringLengthInLE64;
  }

  let be = "";
  for (let i = 0; i < 64; i += 2) {
    let chunk = le.slice(i, i + 2);
    be = chunk + be;
  }
  return be;
}


//////////////////////////
// Scrip Categorization //
//////////////////////////
// The following definitions & functions are used for categorizing scripts from input/output hex strings or witness hex tuples

// Parse input|output script for known script
export function parseScriptForKnownScript(script: string, input: boolean): KnownScript {
  if (input) {
    if (script.match(/^(?:[0-9a-fA-F]{2}){1,3}[\dA-Fa-f]{140,146}(?:[0-9a-fA-F]{2}){1,3}[\dA-Fa-f]{64,66}$/)) {
      return KnownScript.P2PKH;
    }
    else if (script.match(/^(?:[0-9a-fA-F]{2}){1,3}[\dA-Fa-f]{140,146}$/)) {
      return KnownScript.P2PK;
    } else if (script.match(/^160014[A-Fa-f0-9]{40}$/)) {
      return KnownScript.P2SHP2WPKH;
    } else if (script.match(/^220020[A-Fa-f0-9]{64}$/)) {
      return KnownScript.P2SHP2WSH;
    } else {
      return KnownScript.NONE;
    }
  } else {
    if (script.match(/^0014[A-Fa-f0-9]{40}$/)) {
      return KnownScript.P2WPKH;
    } else if (script.match(/^0020[A-Fa-f0-9]{64}$/)) {
      return KnownScript.P2WSH;
    } else if (script.match(/^a9[A-Fa-f0-9]{40}$/)) {
      return KnownScript.P2SH;
    } else if (script.match(/^76[A-Fa-f0-9]{40,66}$/)) {
      return KnownScript.P2PKH;
    } else if (/^5120[A-Fa-f0-9]{40}$/) {
      return KnownScript.P2TR;
    } else {
      return KnownScript.NONE;
    }
  }
}

// Parse *witness* for known script
export function parseWitnessForKnownScript(
  input: TxInput,
  numElements: number,
  elements: TxWitnessElement[]
): KnownScript {
  if (numElements === 2 && input.sigScriptSize === "00") {
    return KnownScript.P2WPKH;
  } else if (numElements === 2 && input.sigScriptSize === "17") {
    return KnownScript.P2SHP2WPKH;
  } else if (input.sigScriptSize !== "00" && numElements > 2) {
    return KnownScript.P2SHP2WSH;
  } else if (numElements === 1 && input.sigScriptSize === "00") {
    return KnownScript.P2TR;
  } else {
    return KnownScript.NONE;
  }
}


////////////////////////////////
// Pushed Data Categorization //
////////////////////////////////
// The following definitions & functions are used for categorizing scripts form inputs, outputs & witnesses into known scripts

// Parse input script for pushed data
export function parseInputSigScriptPushedData(script: string): {
  pushedDataTitle: string;
  pushedDataDescription: string;
} {
  // Check for Public Key
  if (
    (script.length < 68 && script.length > 62 && script.slice(0, 2) === "02") ||
    script.slice(0, 2) === "03"
  ) {
    return {
      pushedDataTitle: PushedDataTitle.PUBLICKEY,
      pushedDataDescription: PushedDataDescription.PUBLICKEY,
    };
  } else if (
    script.length < 145 &&
    script.length > 138 &&
    script.slice(0, 2) === "30"
  ) {
    console.log("ecdsa should've ran");
    ecdsaParse(script);
    return {
      pushedDataTitle: PushedDataTitle.SIGNATUREECDSA,
      pushedDataDescription: PushedDataDescription.SIGNATUREECDSA,
    };
  }
  return {
    pushedDataTitle: "Unknown Data",
    pushedDataDescription:
      "We're not entirely sure what this data might represent...",
  };
}

export function parseOutputPubKeyScriptPushedData(
  script: string,
  firstOP?: number
): { pushedDataTitle: string; pushedDataDescription: string } {
  // Check for Hashed Public Key
  if (script.length === 40) {
    if (firstOP === 169) {
      return {
        pushedDataTitle: PushedDataTitle.HASHEDSCRIPT,
        pushedDataDescription: PushedDataDescription.HASHEDSCRIPT,
      };
    } else {
      return {
        pushedDataTitle: PushedDataTitle.HASHEDPUBLICKEY,
        pushedDataDescription: PushedDataDescription.HASHEDPUBLICKEY,
      };
    }
  } else if (script.length === 64) {
    if (firstOP === 0) {
      return {
        pushedDataTitle: PushedDataTitle.HASHEDSCRIPT,
        pushedDataDescription: PushedDataDescription.HASHEDSCRIPT,
      };
    } else {
      return {
        pushedDataTitle: PushedDataTitle.TAPROOTOUTPUT,
        pushedDataDescription: PushedDataDescription.TAPROOTOUTPUT,
      };
    }
  }
  return {
    pushedDataTitle: "Unknown Data",
    pushedDataDescription:
      "We're not entirely sure what this data might represent...",
  };
}

export function parseWitnessElementPushedData(script: string): {
  pushedDataTitle: string;
  pushedDataDescription: string;
} {
  // Check for Hashed Public Key
  //console.log("parseWitnesselementPushedData fired with script: " + script)
  //console.log("parseWitnesselementPushedData fired with script length: " + script.length)
  if (
    script.length < 145 &&
    script.length > 138 &&
    script.slice(0, 2) === "30"
  ) {
    return {
      pushedDataTitle: PushedDataTitle.SIGNATUREECDSA,
      pushedDataDescription: PushedDataDescription.SIGNATUREECDSA,
    };
  } else if (
    (script.length < 68 && script.length > 62 && script.slice(0, 2) === "02") ||
    script.slice(0, 2) === "03"
  ) {
    return {
      pushedDataTitle: PushedDataTitle.PUBLICKEY,
      pushedDataDescription: PushedDataDescription.PUBLICKEY,
    };
  } else if (script.length > 200 && script.slice(0, 2) === "52") {
    return {
      pushedDataTitle: PushedDataTitle.WITNESSREDEEMSCRIPT,
      pushedDataDescription: PushedDataDescription.REDEEMSCRIPT,
    };
  } else if (script.length === 128) {
    return {
      pushedDataTitle: PushedDataTitle.SIGNATURESCHNORR,
      pushedDataDescription: PushedDataDescription.SIGNATURESCHNORR,
    };
  }
  return {
    pushedDataTitle: "Unknown Data",
    pushedDataDescription:
      "We're not entirely sure what this data might represent...",
  };
}

export function ecdsaParse(script: string) {
  console.log("ecdsaParse fired: " + script);
  // Check for correct ECDSA 1st-byte
  if (script.slice(0, 2) != "30") {
    throw new Error("Not an ECDSA signature");
  }
  console.log("line 263");
  const sequenceLength = parseInt(script.slice(2, 4), 16);
  const rLength = parseInt(script.slice(6, 8), 16);
  const r = script.slice(8, 8 + rLength * 2);
  const sLength = parseInt(
    script.slice(10 + rLength * 2, 10 + rLength * 2 + 2),
    16
  );
  const s = script.slice(
    10 + rLength * 2 + 2,
    10 + rLength * 2 + 2 + sLength * 2
  );
  const sighash = script.slice(
    10 + rLength * 2 + 2 + sLength * 2,
    10 + rLength * 2 + 2 + sLength * 2 + 2
  );
  console.log("sequenceLength: " + sequenceLength);
  console.log("rLength: " + rLength);
  console.log("r: " + r);
  console.log("sLength: " + sLength);
  console.log("s: " + s);
  console.log("sighash: " + sighash);
}

// Refactor all parseScriptForKnownScript functions into one function
// Refactor all parseScriptForPushedData functions into one function
// Extract out while/script parser from index.ts