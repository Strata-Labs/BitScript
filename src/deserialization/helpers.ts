import { 
    errInvalidInput, 
    errStringLengthInLE8, errStringLengthInLE16, errStringLengthInLE64, 
    errIncompleteVarIntFC, errIncompleteVarIntFD, errIncompleteVarIntFE, errIncompleteVarIntFF, 
    errInvalidVersionEndian, errNonstandardVersion
  } from "./errors";


// VarInt
// Core function for fetching & verifying VarInts
// Used in fields such as: input count, output count, scriptSigSize, pubkeyScriptSize, witnessElementSize
export type VarInt = string;
export function verifyVarInt(varint: string): VarInt {
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