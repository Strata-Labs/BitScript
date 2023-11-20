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
import {PushedDataTitle, PushedDataDescription} from "./overlayValues";

// VarInt
// Core function for fetching & verifying VarInts
// Used in fields such as: input count, output count, scriptSigSize, pubkeyScriptSize, witnessElementSize
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

export function scriptSizeLEToBEDec(scriptSizeLE: string): { scriptSizeBE: string; scriptSizeDec: number} {
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

// Hex <-> JSON (WIP)
//   function hexToJSON(hex: string): TxData {
//     // Implement the logic to convert hex to JSON
//     return {} as TxData;
//   }

//   function jsonToHex(json: TxData): string {
//     // Implement the logic to convert JSON to hex
//     return "";
//   }

// Endian-ness
// Little-Endian To Big-Endian
// Available byte lengths: 8, 16, 64
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

// Script Categorization
// The following definitions & functions are used for categorizing script/unlock & pubkey/lock scripts into known scripts
// Known Scripts List
export enum KnownScript {
  NONE = "NONE",
  P2PKH = "P2PKH",
  P2SH = "P2SH",
  P2WPKH = "P2WPKH",
  P2WSH = "P2WSH",
  P2SHP2WPKH = "P2SH-P2WPKH",
  P2SHP2WSH = "P2SH-P2WSH",
  P2TR = "P2TR",
  P2PK = "P2PK",
}

// Parse input sigscript/unlockscript for known script
export function parseInputForKnownScript(scriptSig: string): KnownScript {
  // Check for P2PKH input (typically <signature> <pubKey>)
  // This is a rudimentary check for two pushes (assuming standard scripts). This will not catch non-standard scripts.
  if (
    scriptSig.match(
      /^(?:[0-9a-fA-F]{2}){1,3}[\dA-Fa-f]{140,146}(?:[0-9a-fA-F]{2}){1,3}[\dA-Fa-f]{64,66}$/
    )
  ) {
    return KnownScript.P2PKH;
  }
  // Check for P2PK input (typically just <signature>)
  // This just checks for one push of data
  else if (scriptSig.match(/^(?:[0-9a-fA-F]{2}){1,3}[\dA-Fa-f]{140,146}$/)) {
    return KnownScript.P2PK;
  } else {
    return KnownScript.NONE;
  }
}

// Parse output pubkey/lockscript for known script
export function parseOutputForKnownScript(pubKeyScript: string): KnownScript {
  if (pubKeyScript.slice(0, 4) === "0014") {
      return KnownScript.P2WPKH;
  } else if (pubKeyScript.slice(0, 4) === "0020") {
      return KnownScript.P2WSH;
  } else if (pubKeyScript.slice(0, 2) === "a9") {
      return KnownScript.P2SH;
  } else if (pubKeyScript.slice(0, 2) === "76") {
      return KnownScript.P2PKH;
  } else if (pubKeyScript.slice(0,4) === "5120") {
      return KnownScript.P2TR;
  } else {
      return KnownScript.NONE;
  }
}
// Parse witness for known script
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

// Pushed Data Categorization
export function parseInputSigScriptPushedData(script: string): {pushedDataTitle: string, pushedDataDescription: string} {
  // Check for Public Key
  if((script.length<68 && script.length>62) && (script.slice(0,2) === "02") || (script.slice(0,2) === "03")) {
    return {pushedDataTitle: PushedDataTitle.PUBLICKEY, pushedDataDescription: PushedDataDescription.PUBLICKEY};
  } else if ((script.length < 145 && script.length > 138) && script.slice(0,2) === "30") {
    return {pushedDataTitle: PushedDataTitle.SIGNATUREECDSA, pushedDataDescription: PushedDataDescription.SIGNATUREECDSA};
  }
  return {pushedDataTitle: "Unknown Data", pushedDataDescription: "We're not entirely sure what this data might represent..."};
}

export function parseOutputPubKeyScriptPushedData(script: string, firstOP?: number): {pushedDataTitle: string, pushedDataDescription: string} {
  // Check for Hashed Public Key
  if(script.length === 40) {
    if (firstOP === 169) {
      return {pushedDataTitle: PushedDataTitle.HASHEDSCRIPT, pushedDataDescription: PushedDataDescription.HASHEDSCRIPT};
    } else {
     return {pushedDataTitle: PushedDataTitle.HASHEDPUBLICKEY, pushedDataDescription: PushedDataDescription.HASHEDPUBLICKEY}; 
    }
  } else if(script.length === 64) {
    if(firstOP === 0) {
      return {pushedDataTitle: PushedDataTitle.HASHEDSCRIPT, pushedDataDescription: PushedDataDescription.HASHEDSCRIPT};
    } else {
     return {pushedDataTitle: PushedDataTitle.TAPROOTOUTPUT, pushedDataDescription: PushedDataDescription.TAPROOTOUTPUT}; 
    }
  }
  return {pushedDataTitle: "Unknown Data", pushedDataDescription: "We're not entirely sure what this data might represent..."};
}

export function parseWitnessElementPushedData(script: string): {pushedDataTitle: string, pushedDataDescription: string} {
  // Check for Hashed Public Key
  console.log("parseWitnesselementPushedData fired with script: " + script)
  console.log("parseWitnesselementPushedData fired with script length: " + script.length)
  if((script.length < 145 && script.length > 138) && script.slice(0,2) === "30") {
    return {pushedDataTitle: PushedDataTitle.SIGNATUREECDSA, pushedDataDescription: PushedDataDescription.SIGNATUREECDSA};
  } else if ((script.length<68 && script.length>62) && (script.slice(0,2) === "02") || (script.slice(0,2) === "03")) {
    return {pushedDataTitle: PushedDataTitle.PUBLICKEY, pushedDataDescription: PushedDataDescription.PUBLICKEY};
  } else if (script.length > 200 && script.slice(0,2) === "52") {
    return {pushedDataTitle: PushedDataTitle.WITNESSREDEEMSCRIPT, pushedDataDescription: PushedDataDescription.REDEEMSCRIPT};
  } else if (script.length === 128) {
    return {pushedDataTitle: PushedDataTitle.SIGNATURESCHNORR, pushedDataDescription: PushedDataDescription.SIGNATURESCHNORR};
  }
  return {pushedDataTitle: "Unknown Data", pushedDataDescription: "We're not entirely sure what this data might represent..."};
}