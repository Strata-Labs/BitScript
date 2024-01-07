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
import { TransactionItem, TxInput, TxWitnessElement } from "./model";
import {
  PushedDataTitle,
  PushedDataDescription,
  KnownScript,
  pushOPDescription,
} from "./overlayValues";
import {
  getOpcodeByHex,
  OP_Code,
  makePushOPBiggerThan4b,
} from "../corelibrary/op_code";
import { TxTextSectionType } from "../comp/Transactions/Helper";
import { ScriptData } from "@/corelibrary/scriptdata";

////////////////////
// Dynamic Length //
////////////////////
// VarInt: core function for fetching & verifying VarInts, used in fields such as: input count, output count, scriptSize, pubkeyScriptSize, witnessElementSize
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

///////////////////
// Script Parser //
///////////////////

//////////////////////////
// Script Categorization //
//////////////////////////
// The following definitions & functions are used for categorizing scripts from input/output hex strings or witness hex tuples

// Parse input|output script for known script
export function parseScriptForKnownScript(
  script: string,
  input: boolean
): KnownScript {
  if (input) {
    if (
      script.match(
        /^(?:[0-9a-fA-F]{2}){1,3}[\dA-Fa-f]{140,146}(?:[0-9a-fA-F]{2}){1,3}[\dA-Fa-f]{64,66}$/
      )
    ) {
      return KnownScript.P2PKH;
    } else if (script.match(/^(?:[0-9a-fA-F]{2}){1,3}[\dA-Fa-f]{140,146}$/)) {
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

export function parseScript(
  script: string,
  firstOPNumber: number,
  scriptSizeEnd: number
): TransactionItem[] {
  let scriptItems: TransactionItem[] = [];
  let scriptSizeStart = 0;
  //console.log("parseScript script: " + script);
  //console.log("parseScript firstOPNumber: " + firstOPNumber);
  //console.log("parseScript scriptSizeEnd: " + scriptSizeEnd);
  while (scriptSizeStart < scriptSizeEnd) {
    let op = getOpcodeByHex(
      script.slice(scriptSizeStart, scriptSizeStart + 2)
    )!;
    //console.log("scriptSizeStart: " + scriptSizeStart);
    if (scriptSizeStart < 2) {
      // First byte/loop
      // Check for regular push op-s
      if (firstOPNumber < 79 && firstOPNumber > 0) {
        const parsedData = parseInputSigScriptPushedData(
          script.slice(
            scriptSizeStart + 2,
            scriptSizeStart + 2 + firstOPNumber * 2
          )
        );
        // console.log("parsedData source: " + script.slice(
        //   scriptSizeStart + 2,
        //   scriptSizeStart + 2 + firstOPNumber * 2
        // ))
        // console.log(parsedData.pushedDataTitle);
        // first op is a data push op, following data
        scriptItems.push({
          rawHex: script.slice(
            scriptSizeStart + 2,
            scriptSizeStart + 2 + firstOPNumber * 2
          ),
          item: {
            title: parsedData.pushedDataTitle,
            value: script.slice(
              scriptSizeStart + 2,
              scriptSizeStart + 2 + firstOPNumber * 2
            ),
            type: TxTextSectionType.pushedData,
            description: parsedData.pushedDataDescription,
            asset: "imageURL",
          },
        });
        scriptSizeStart += 2 + firstOPNumber * 2;
      } else {
        scriptSizeStart += 2;
      }
    } else {
      // Next n loops
      if (op.number < 76) {
        // Data Push OP -> Push Data OP & Data Item
        // Data OP
        scriptItems.push({
          rawHex: script.slice(scriptSizeStart, scriptSizeStart + 2),
          item: {
            title: "Upcoming Data Size (" + op.name + ")",
            value:
              script.slice(scriptSizeStart, scriptSizeStart + 2) +
              " hex | " +
              op.number +
              " bytes" +
              " | " +
              op.number * 2 +
              " chars",
            type: TxTextSectionType.opCode,
            description: pushOPDescription,
            asset: "imageURL",
          },
        });
        // Data Item
        const parsedData = parseInputSigScriptPushedData(
          script.slice(scriptSizeStart + 2, scriptSizeStart + 2 + op.number * 2)
        );
        // if passedData === "MIME" we need to include the rest of the ordinal/inscription data which should include:
        // 1. An op_false (0x00)
        // 2. A push op from 1-75 bytes or 0x4c, 0x4d, or 0x4e
        // 3. The inscription data itself
        if (parsedData.pushedDataTitle.slice(0,4) === "MIME") {
          // Push MIME type
          scriptItems.push({
            rawHex: script.slice(
              scriptSizeStart + 2,
              scriptSizeStart + 2 + op.number * 2
            ),
            item: {
              title: parsedData.pushedDataTitle,
              value: script.slice(
                scriptSizeStart + 2,
                scriptSizeStart + 2 + op.number * 2
              ),
              type: TxTextSectionType.pushedData,
              description: parsedData.pushedDataDescription,
              asset: "imageURL",
            },
          });
          scriptSizeStart += 2 + op.number * 2;
          // Push Zero OP
          scriptItems.push({
            rawHex: script.slice(
              scriptSizeStart,
              scriptSizeStart + 2
            ),
            item: {
              title: "Zero OP",
              value: script.slice(
                scriptSizeStart + 2,
                scriptSizeStart + 4
              ) + " hex | 1 byte | 2 chars",
              type: TxTextSectionType.pushedData,
              description: "This is a zero OP (0x00) which is used a few times in an inscription reveal to indicate that the following data is a data push op.",
              asset: "imageURL",
            },
          });
          scriptSizeStart += 2
          // Push Data OP For Inscription
          let opPushInscription = getOpcodeByHex(
            script.slice(scriptSizeStart, scriptSizeStart + 2)
          )!;
          if (opPushInscription.number < 76) {
            scriptItems.push({
              rawHex: script.slice(scriptSizeStart, scriptSizeStart + 2),
              item: {
                title: "Upcoming Data Size (" + opPushInscription.name + ")",
                value:
                  script.slice(scriptSizeStart, scriptSizeStart + 2) +
                  " hex | " +
                  opPushInscription.number +
                  " bytes" +
                  " | " +
                  opPushInscription.number * 2 +
                  " chars",
                type: TxTextSectionType.opCode,
                description: pushOPDescription,
                asset: "imageURL",
              },
            });
            scriptSizeStart += 2
            // Push Inscription Data
            let str = '';
            console.log("the length of inscription is currently: " + opPushInscription.number * 2);
            console.log("inscription raw is: " + script.slice(
              scriptSizeStart,
              scriptSizeStart + opPushInscription.number * 2
            ));
            for (let i = 0; i < script.slice(
              scriptSizeStart,
              scriptSizeStart + opPushInscription.number * 2
            ).length; i += 2) {
              const code = parseInt(script.slice(
                scriptSizeStart,
                scriptSizeStart + opPushInscription.number * 2
              ).substr(i, 2), 16);
              str += String.fromCharCode(code);
            }
            console.log("inscription string is: " + str);
            scriptItems.push({
              rawHex: script.slice(
                scriptSizeStart,
                scriptSizeStart + opPushInscription.number * 2
              ),
              item: {
                title: "Inscription Data",
                value: str,
                type: TxTextSectionType.pushedData,
                description: PushedDataDescription.ORDINALDESCRIPTION,
                asset: "imageURL",
              },
            });
            scriptSizeStart += opPushInscription.number * 2;
          } else if (opPushInscription.number === 76) {
            // OP_PUSHDATA1 (0x4c)
            // Example: 4c20c6e9bb25aa3e05a43d21aed6962a68ced3f725be31a920470ef12171e3fa
            scriptItems.push({
              rawHex: script.slice(scriptSizeStart, scriptSizeStart + 2),
              item: {
                title: "PUSHDATA1 OP",
                value: script.slice(scriptSizeStart, scriptSizeStart + 2),
                type: TxTextSectionType.opCode,
                description: "This is a PUSHDATA1 OP (0x4c) which indicates that the next byte is the length of the data to be pushed.",
                asset: "imageURL",
              }
            });
            scriptSizeStart += 2;
            let inscriptionLength = parseInt(script.slice(scriptSizeStart, scriptSizeStart + 2), 16);
            scriptItems.push({
              rawHex: script.slice(scriptSizeStart, scriptSizeStart + 2),
              item: {
                title: "Upcoming Inscription Data Length",
                value: script.slice(scriptSizeStart, scriptSizeStart + 2) + " hex | " + inscriptionLength + " bytes" + " | " + inscriptionLength * 2 + " chars",
                type: TxTextSectionType.pushedData,
                description: "Just like a regular data push op, this is the length of the inscription data to be pushed (in hex).",
                asset: "imageURL",
              }
            });
            scriptSizeStart += 2;
            // Pushed Inscription Data
            let str = '';
            console.log("the length of inscription is currently: " + inscriptionLength * 2);
            console.log("inscription raw is: " + script.slice(
              scriptSizeStart, scriptSizeStart + inscriptionLength * 2));
            for (let i = 0; i < script.slice(
              scriptSizeStart, scriptSizeStart + inscriptionLength * 2).length; i += 2) {
              const code = parseInt(script.slice(
                scriptSizeStart, scriptSizeStart + inscriptionLength * 2).substr(i, 2), 16);
              str += String.fromCharCode(code);
            }
            console.log("inscription string is: " + str);
            scriptItems.push({
              rawHex: script.slice(scriptSizeStart, scriptSizeStart + inscriptionLength * 2),
              item: {
                title: "Inscription Data",
                value: str,
                type: TxTextSectionType.pushedData,
                description: PushedDataDescription.ORDINALDESCRIPTION,
                asset: "imageURL",
              }
            });
            scriptSizeStart += inscriptionLength * 2;
          } else if (opPushInscription.number === 77) {
            // OP_PUSHDATA2 (0x4d)
            // Example: 605ac6e9bb25aa3e05a43d21aed6962a68ced3f725be31a920470ef12171e3fa
            scriptItems.push({
              rawHex: script.slice(scriptSizeStart, scriptSizeStart + 2),
              item: {
                title: "PUSHDATA2 OP",
                value: script.slice(scriptSizeStart, scriptSizeStart + 2),
                type: TxTextSectionType.opCode,
                description: "This is a PUSHDATA2 OP (0x4d) which indicates that the next 2 bytes are the length of the data to be pushed.",
                asset: "imageURL",
              }
            });
            scriptSizeStart += 2;
            // Next 2 bytes are the length of the data to be pushed
            let inscriptionLength = parseInt(script.slice(scriptSizeStart, scriptSizeStart + 4), 16);
            scriptItems.push({
              rawHex: script.slice(scriptSizeStart, scriptSizeStart + 4),
              item: {
                title: "Upcoming Inscription Data Length",
                value: script.slice(scriptSizeStart, scriptSizeStart + 4) + " hex | " + inscriptionLength + " bytes" + " | " + inscriptionLength * 2 + " chars",
                type: TxTextSectionType.pushedData,
                description: "Just like a regular data push op, this is the length of the inscription data to be pushed (in hex).",
                asset: "imageURL",
              }
            });
            scriptSizeStart += 4;
            // Pushed Inscription Data
            let str = '';
            console.log("the length of inscription is currently: " + inscriptionLength * 2);
            console.log("inscription raw is: " + script.slice(
              scriptSizeStart, scriptSizeStart + inscriptionLength * 2));
            for (let i = 0; i < script.slice(
              scriptSizeStart, scriptSizeStart + inscriptionLength * 2).length; i += 2) {
              const code = parseInt(script.slice(
                scriptSizeStart, scriptSizeStart + inscriptionLength * 2).substr(i, 2), 16);
              str += String.fromCharCode(code);
            }
            console.log("inscription string is: " + str);
            scriptItems.push({
              rawHex: script.slice(scriptSizeStart, scriptSizeStart + inscriptionLength * 2),
              item: {
                title: "Inscription Data",
                value: str,
                type: TxTextSectionType.pushedData,
                description: PushedDataDescription.ORDINALDESCRIPTION,
                asset: "imageURL",
              }
            });
            scriptSizeStart += inscriptionLength * 2;
          } else if (opPushInscription.number === 78) {
            // OP_PUSHDATA4 (0x4e)
            // Example: 605ac6e9bb25aa3e05a43d21aed6962a68ced3f725be31a920470ef12171e3fa
            scriptItems.push({
              rawHex: script.slice(scriptSizeStart, scriptSizeStart + 2),
              item: {
                title: "PUSHDATA4 OP",
                value: script.slice(scriptSizeStart, scriptSizeStart + 2),
                type: TxTextSectionType.opCode,
                description: "This is a PUSHDATA4 OP (0x4e) which indicates that the next 4 bytes are the length of the data to be pushed.",
                asset: "imageURL",
              }
            });
            scriptSizeStart += 2;
            // Next 4 bytes are the length of the data to be pushed
            let inscriptionLength = parseInt(script.slice(scriptSizeStart, scriptSizeStart + 8), 16);
            scriptItems.push({
              rawHex: script.slice(scriptSizeStart, scriptSizeStart + 8),
              item: {
                title: "Upcoming Inscription Data Length",
                value: script.slice(scriptSizeStart, scriptSizeStart + 8) + " hex | " + inscriptionLength + " bytes" + " | " + inscriptionLength * 2 + " chars",
                type: TxTextSectionType.pushedData,
                description: "Just like a regular data push op, this is the length of the inscription data to be pushed (in hex).",
                asset: "imageURL",
              }
            });
            scriptSizeStart += 8;
            // Pushed Inscription Data
            let str = '';
            console.log("the length of inscription is currently: " + inscriptionLength * 2);
            console.log("inscription raw is: " + script.slice(
              scriptSizeStart, scriptSizeStart + inscriptionLength * 2));
            for (let i = 0; i < script.slice(
              scriptSizeStart, scriptSizeStart + inscriptionLength * 2).length; i += 2) {
              const code = parseInt(script.slice(
                scriptSizeStart, scriptSizeStart + inscriptionLength * 2).substr(i, 2), 16);
              str += String.fromCharCode(code);
            }
            console.log("inscription string is: " + str);
            scriptItems.push({
              rawHex: script.slice(scriptSizeStart, scriptSizeStart + inscriptionLength * 2),
              item: {
                title: "Inscription Data",
                value: str,
                type: TxTextSectionType.pushedData,
                description: PushedDataDescription.ORDINALDESCRIPTION,
                asset: "imageURL",
              }
            });
            scriptSizeStart += inscriptionLength * 2;
          }
        } else {
          scriptItems.push({
            rawHex: script.slice(
              scriptSizeStart + 2,
              scriptSizeStart + 2 + op.number * 2
            ),
            item: {
              title: parsedData.pushedDataTitle,
              value: script.slice(
                scriptSizeStart + 2,
                scriptSizeStart + 2 + op.number * 2
              ),
              type: TxTextSectionType.pushedData,
              description: parsedData.pushedDataDescription,
              asset: "imageURL",
            },
          });
          scriptSizeStart += 2 + op.number * 2;
        }
      } else if (op.number === 76) {
        // OP_PUSHDATA1, this means we need to push 3 items:
        // OP_PUSHDATA1 (0x4c)
        // Next byte is the length of the data to be pushed
        // Pushed Data

        // OP_PUSHDATA1
        scriptItems.push({
          rawHex: script.slice(scriptSizeStart, scriptSizeStart + 2),
          item: {
            title: "Push Data 1-Byte",
            value:
              script.slice(scriptSizeStart, scriptSizeStart + 2) +
              " hex | " +
              op.number +
              " bytes",
            type: TxTextSectionType.opCode,
            description:
              "Push Data 1-Byte is a specific push data op. 0x01 (1) - 0x04b (75) are all used to push a single byte, then 0x4c, 0x4d, & 0x4e are used as special push data ops that flag multiple bytes are required to represent the length. \n Here we have 0x4c, which means the next byte is the length of the data to be pushed.",
            asset: "imageURL",
          },
        });
        // Next byte is the length of the data to be pushed
        op = makePushOPBiggerThan4b(
          script.slice(scriptSizeStart + 2, scriptSizeStart + 4)
        )!;
        scriptItems.push({
          rawHex: script.slice(scriptSizeStart + 2, scriptSizeStart + 4),
          item: {
            title: "Upcoming Data Size (" + op.name + ")",
            value:
              script.slice(scriptSizeStart + 2, scriptSizeStart + 4) +
              " hex | " +
              op.number +
              " bytes" +
              " | " +
              op.number * 2 +
              " chars",
            type: TxTextSectionType.opCode,
            description: pushOPDescription,
            asset: "imageURL",
          },
        });
        // Data Item
        const parsedData = parseInputSigScriptPushedData(
          script.slice(scriptSizeStart + 4, scriptSizeStart + 4 + op.number * 2)
        );
        scriptItems.push({
          rawHex: script.slice(
            scriptSizeStart + 4,
            scriptSizeStart + 4 + op.number * 2
          ),
          item: {
            title: parsedData.pushedDataTitle,
            value: script.slice(
              scriptSizeStart + 4,
              scriptSizeStart + 4 + op.number * 2
            ),
            type: TxTextSectionType.pushedData,
            description: parsedData.pushedDataDescription,
            asset: "imageURL",
          },
        });
        scriptSizeStart += 4 + op.number * 2;
      } 
      // else if (op.number === 77) {
      //   // OP_PUSHDATA2, this means we need to push 3 items:
      //   // OP_PUSHDATA2 (0x4d)
      //   // Next two byte is the length of the data to be pushed
      //   // Pushed Data

      //   // OP_PUSHDATA2
      //   scriptItems.push({
      //     rawHex: script.slice(scriptSizeStart, scriptSizeStart + 2),
      //     item: {
      //       title: "Push Data 2-Bytes",
      //       value:
      //         script.slice(scriptSizeStart, scriptSizeStart + 2) +
      //         " hex | " +
      //         op.number +
      //         " bytes",
      //       type: TxTextSectionType.opCode,
      //       description:
      //         "Push Data 2-Bytes is a specific push data op. 0x01 (1) - 0x04b (75) are all used to push a single byte, then 0x4c, 0x4d, & 0x4e are used as special push data ops that flag multiple bytes are required to represent the length. \n Here we have 0x4d, which means the next byte is the length of the data to be pushed.",
      //       asset: "imageURL",
      //     },
      //   });
      //   // Next byte is the length of the data to be pushed
      //   op = makePushOPBiggerThan4b(
      //     script.slice(scriptSizeStart + 2, scriptSizeStart + 4)
      //   )!;
      //   scriptItems.push({
      //     rawHex: script.slice(scriptSizeStart + 2, scriptSizeStart + 4),
      //     item: {
      //       title: "Upcoming Data Size (" + op.name + ")",
      //       value:
      //         script.slice(scriptSizeStart + 2, scriptSizeStart + 4) +
      //         " hex | " +
      //         op.number +
      //         " bytes" +
      //         " | " +
      //         op.number * 2 +
      //         " chars",
      //       type: TxTextSectionType.opCode,
      //       description: pushOPDescription,
      //       asset: "imageURL",
      //     },
      //   });
      //   // Data Item
      //   const parsedData = parseInputSigScriptPushedData(
      //     script.slice(scriptSizeStart + 4, scriptSizeStart + 4 + op.number * 2)
      //   );
      //   scriptItems.push({
      //     rawHex: script.slice(
      //       scriptSizeStart + 4,
      //       scriptSizeStart + 4 + op.number * 2
      //     ),
      //     item: {
      //       title: parsedData.pushedDataTitle,
      //       value: script.slice(
      //         scriptSizeStart + 4,
      //         scriptSizeStart + 4 + op.number * 2
      //       ),
      //       type: TxTextSectionType.pushedData,
      //       description: parsedData.pushedDataDescription,
      //       asset: "imageURL",
      //     },
      //   });
      //   scriptSizeStart += 4 + op.number * 2;
      // } 
      else {
        // Common OP -> Push Common OP
        // Common OP
        scriptItems.push({
          rawHex: script.slice(scriptSizeStart, scriptSizeStart + 2),
          item: {
            title: op?.name,
            value:
              script.slice(scriptSizeStart, scriptSizeStart + 2) +
              " hex | " +
              op.number +
              " opcode",
            type: TxTextSectionType.opCode,
            description: op.description,
            asset: "imageURL",
          },
        });
        scriptSizeStart += 2;
      }
    }
  }

  //console.log("parsedRawHex script items from new parseScript: ", scriptItems);
  return scriptItems;
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
    script.length < 68 && script.length > 62
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
    parseECDSASignature(script);
    return {
      pushedDataTitle: PushedDataTitle.SIGNATUREECDSA,
      pushedDataDescription: PushedDataDescription.SIGNATUREECDSA,
    };
  } else if (script === "6f7264") {
    return {
      pushedDataTitle: PushedDataTitle.ORDINALTAG,
      pushedDataDescription: PushedDataDescription.ORDINALTAG,
    };
  } else if (isHexMimeTypeInArray(script)) {
    let str = '';
    for (let i = 0; i < script.length; i += 2) {
      const code = parseInt(script.substr(i, 2), 16);
      str += String.fromCharCode(code);
    }
    return {
      pushedDataTitle: "MIME Type: " + str,
      pushedDataDescription: "A MIME type value is a standardized identifier used to specify the nature and format of a document, file, or set of data on the Internet. Based on the given hexadecimal array, you can pass down a MIME type by converting its string representation (e.g., 'text', 'image') to its corresponding hexadecimal value (e.g., '74657874' for 'text', '696d616765' for 'image').",
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
  console.log("parseWitnessElementPushData ran, script is: " + script);
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
    script.length < 68 && script.length > 62
  ) {
    return {
      pushedDataTitle: PushedDataTitle.PUBLICKEY,
      pushedDataDescription: PushedDataDescription.PUBLICKEY,
    };
  } else if (script.length === 128) {
    return {
      pushedDataTitle: PushedDataTitle.SIGNATURESCHNORR,
      pushedDataDescription: PushedDataDescription.SIGNATURESCHNORR,
    };
  } else if (script.length > 200) {
    let redeemScriptFirstItems: TransactionItem[] = [];
    // Need to parseScript, which means I need to prepare inputs first:
    // 1. Get the first OP
    const firstOP = getOpcodeByHex(script.slice(0, 2))!;
    // 2. Get the script size
    const scriptSize = script.length;
    let parseScriptResponse = parseScript(script, firstOP.number, scriptSize);
    // still need to manually add the first OP into array following the same pattern we use for the first OP outside of parseScript:
    // 3.A First character of first byte tells us the *type* of redeem script
    redeemScriptFirstItems.push({
      rawHex: script.slice(0, 1),
      item: {
        title: "Redeem Script: Multi-sig",
        value: script.slice(0, 4) + "..." + script.slice(-4), 
        description: "This is a redeem script",
        type: TxTextSectionType.witnessScript
      }
    });
    // 3.B Second character of first byte tells us actual first OP
    redeemScriptFirstItems.push({
      rawHex: script.slice(1, 2),
      item: {
        title: firstOP.name,
        value: script.slice(0,2) + " hex | " + firstOP.number + " bytes",
        type: TxTextSectionType.opCode,
        description: firstOP.description,
        asset: "imageURL",
      }
    });
    let finalRedeemScriptArr = redeemScriptFirstItems.concat(parseScriptResponse);
    console.log(finalRedeemScriptArr);
    // TODO: accomodate for scriptpath
    // add necessary ops to lib
    return {
      pushedDataTitle: PushedDataTitle.WITNESSREDEEMSCRIPT,
      pushedDataDescription: PushedDataDescription.REDEEMSCRIPT,
    };
  }
  return {
    pushedDataTitle: "Unknown Data",
    pushedDataDescription:
      "We're not entirely sure what this data might represent...",
  };
}

////////////////
// Signatures //
////////////////
export function parseECDSASignature(script: string) {
  //console.log("ecdsaParse fired: " + script);
  // Check for correct ECDSA 1st-byte
  if (script.slice(0, 2) != "30") {
    throw new Error("Not an ECDSA signature");
  }
  //console.log("line 263");
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

// TODO
// Refactor all parseScriptForPushedData functions into one function
// Extract out while/script parser from index.ts


// Currently missing OP_1 (0x51) - OP_16 (0x60)

const mimeTypesHex: string[] = [
  '74657874', // "text"
  '696d616765', // "image"
  '617564696f', // "audio"
  '766964656f', // "video"
  '6170706c69636174696f6e', // "application"
  '6d756c746970617274', // "multipart"
  '6d657373616765', // "message"
  '666f6e74', // "font"
  '6d6f64656c' // "model"
];

function isHexMimeTypeInArray(hexString: string): boolean {
  return mimeTypesHex.some(hexType => hexString.startsWith(hexType));
}