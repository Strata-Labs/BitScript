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
import {
  TransactionItem,
  TxInput,
  TxOutput,
  TxType,
  TxWitness,
  TxWitnessElement,
} from "./model";
import {
  PushedDataTitle,
  PushedDataDescription,
  KnownScript,
  pushOPDescription,
  CountDescription,
  CountTitle,
  TXIDDescription,
  VOUTDescription,
  previousTransactionURL,
  coinbaseDescription,
  coinbaseDataTitle,
  coinbaseDataDescription,
  ScriptSizeDescription,
  ScriptDescriptions,
  sequenceDescription,
  amountDescription,
  SegWitVersionFlag,
  coinbaseTitle,
  VersionBigEndian,
  versionDescription,
  VersionValueType,
  VersionTitle,
  flagDescription,
  flagValue,
  flagTitle,
  markerDescription,
  markerValue,
  markerTitle,
  SegWitVersionDescription,
  SegWitVersionTitle,
} from "./overlayValues";
import {
  getOpcodeByHex,
  OP_Code,
  makePushOPBiggerThan4b,
} from "../corelibrary/op_code";
import { TxTextSectionType } from "../comp/Transactions/Helper";
import { ScriptData } from "@/corelibrary/scriptdata";
import {
  coinbaseTXID,
  coinbaseVOUT,
  commonPushOPMax,
  markerFlag,
  versionOne,
  versionTwo,
  zeroByte,
} from "./consts";

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
    } else if (script.match(/^5120[A-Fa-f0-9]{40}$/)) {
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
        if (parsedData.pushedDataTitle.slice(0, 4) === "MIME") {
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
            rawHex: script.slice(scriptSizeStart, scriptSizeStart + 2),
            item: {
              title: "Zero OP",
              value:
                script.slice(scriptSizeStart + 2, scriptSizeStart + 4) +
                " hex | 1 byte | 2 chars",
              type: TxTextSectionType.pushedData,
              description:
                "This is a zero OP (0x00) which is used a few times in an inscription reveal to indicate that the following data is a data push op.",
              asset: "imageURL",
            },
          });
          scriptSizeStart += 2;
          // Push Data OP For Inscription
          let opPushInscription = getOpcodeByHex(
            script.slice(scriptSizeStart, scriptSizeStart + 2)
          )!;
          if (opPushInscription.number < 76) {
            // Simple Push Data OP
            // Example:
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
            scriptSizeStart += 2;
            // Push Inscription Data
            let str = "";
            console.log(
              "the length of inscription is currently: " +
                opPushInscription.number * 2
            );
            console.log(
              "inscription raw is: " +
                script.slice(
                  scriptSizeStart,
                  scriptSizeStart + opPushInscription.number * 2
                )
            );
            for (
              let i = 0;
              i <
              script.slice(
                scriptSizeStart,
                scriptSizeStart + opPushInscription.number * 2
              ).length;
              i += 2
            ) {
              const code = parseInt(
                script
                  .slice(
                    scriptSizeStart,
                    scriptSizeStart + opPushInscription.number * 2
                  )
                  .substr(i, 2),
                16
              );
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
            // Example: 0eeabe70997e1e9079df2d0600fe8839b900078225a9b2109b8a4f14fd36ff1d
            scriptItems.push({
              rawHex: script.slice(scriptSizeStart, scriptSizeStart + 2),
              item: {
                title: "PUSHDATA1 OP",
                value: script.slice(scriptSizeStart, scriptSizeStart + 2),
                type: TxTextSectionType.opCode,
                description:
                  "This is a PUSHDATA1 OP (0x4c) which indicates that the next byte is the length of the data to be pushed.",
                asset: "imageURL",
              },
            });
            scriptSizeStart += 2;
            let inscriptionLength = parseInt(
              script.slice(scriptSizeStart, scriptSizeStart + 2),
              16
            );
            scriptItems.push({
              rawHex: script.slice(scriptSizeStart, scriptSizeStart + 2),
              item: {
                title: "Upcoming Inscription Data Length",
                value:
                  script.slice(scriptSizeStart, scriptSizeStart + 2) +
                  " hex | " +
                  inscriptionLength +
                  " bytes" +
                  " | " +
                  inscriptionLength * 2 +
                  " chars",
                type: TxTextSectionType.pushedData,
                description:
                  "Just like a regular data push op, this is the length of the inscription data to be pushed (in hex).",
                asset: "imageURL",
              },
            });
            scriptSizeStart += 2;
            // Pushed Inscription Data
            let str = "";
            console.log(
              "the length of inscription is currently: " + inscriptionLength * 2
            );
            console.log(
              "inscription raw is: " +
                script.slice(
                  scriptSizeStart,
                  scriptSizeStart + inscriptionLength * 2
                )
            );
            for (
              let i = 0;
              i <
              script.slice(
                scriptSizeStart,
                scriptSizeStart + inscriptionLength * 2
              ).length;
              i += 2
            ) {
              const code = parseInt(
                script
                  .slice(
                    scriptSizeStart,
                    scriptSizeStart + inscriptionLength * 2
                  )
                  .substr(i, 2),
                16
              );
              str += String.fromCharCode(code);
            }
            console.log("inscription string is: " + str);
            scriptItems.push({
              rawHex: script.slice(
                scriptSizeStart,
                scriptSizeStart + inscriptionLength * 2
              ),
              item: {
                title: "Inscription Data",
                value: str,
                type: TxTextSectionType.pushedData,
                description: PushedDataDescription.ORDINALDESCRIPTION,
                asset: "imageURL",
              },
            });
            scriptSizeStart += inscriptionLength * 2;
          } else if (opPushInscription.number === 77) {
            // OP_PUSHDATA2 (0x4d)
            // Example: 605ac6e9bb25aa3e05a43d21aed6962a68ced3f725be31a920470ef12171e3fa
            // Example: 0389f7821de4dbc54ef14da16e81f396e60f4c2922f3b28d91a4491b0d26e425
            scriptItems.push({
              rawHex: script.slice(scriptSizeStart, scriptSizeStart + 2),
              item: {
                title: "PUSHDATA2 OP",
                value: script.slice(scriptSizeStart, scriptSizeStart + 2),
                type: TxTextSectionType.opCode,
                description:
                  "This is a PUSHDATA2 OP (0x4d) which indicates that the next 2 bytes are the length of the data to be pushed.",
                asset: "imageURL",
              },
            });
            scriptSizeStart += 2;
            // Next 2 bytes are the length of the data to be pushed
            let inscriptionLength = parseInt(
              script.slice(scriptSizeStart, scriptSizeStart + 4),
              16
            );
            scriptItems.push({
              rawHex: script.slice(scriptSizeStart, scriptSizeStart + 4),
              item: {
                title: "Upcoming Inscription Data Length",
                value:
                  script.slice(scriptSizeStart, scriptSizeStart + 4) +
                  " hex | " +
                  inscriptionLength +
                  " bytes" +
                  " | " +
                  inscriptionLength * 2 +
                  " chars",
                type: TxTextSectionType.pushedData,
                description:
                  "Just like a regular data push op, this is the length of the inscription data to be pushed (in hex).",
                asset: "imageURL",
              },
            });
            scriptSizeStart += 4;
            // Pushed Inscription Data
            let str = "";
            console.log(
              "the length of inscription is currently: " + inscriptionLength * 2
            );
            console.log(
              "inscription raw is: " +
                script.slice(
                  scriptSizeStart,
                  scriptSizeStart + inscriptionLength * 2
                )
            );
            for (
              let i = 0;
              i <
              script.slice(
                scriptSizeStart,
                scriptSizeStart + inscriptionLength * 2
              ).length;
              i += 2
            ) {
              const code = parseInt(
                script
                  .slice(
                    scriptSizeStart,
                    scriptSizeStart + inscriptionLength * 2
                  )
                  .substr(i, 2),
                16
              );
              str += String.fromCharCode(code);
            }
            console.log("inscription string is: " + str);
            scriptItems.push({
              rawHex: script.slice(
                scriptSizeStart,
                scriptSizeStart + inscriptionLength * 2
              ),
              item: {
                title: "Inscription Data",
                value: str,
                type: TxTextSectionType.pushedData,
                description: PushedDataDescription.ORDINALDESCRIPTION,
                asset: "imageURL",
              },
            });
            scriptSizeStart += inscriptionLength * 2;
          } else if (opPushInscription.number === 78) {
            // OP_PUSHDATA4 (0x4e)
            scriptItems.push({
              rawHex: script.slice(scriptSizeStart, scriptSizeStart + 2),
              item: {
                title: "PUSHDATA4 OP",
                value: script.slice(scriptSizeStart, scriptSizeStart + 2),
                type: TxTextSectionType.opCode,
                description:
                  "This is a PUSHDATA4 OP (0x4e) which indicates that the next 4 bytes are the length of the data to be pushed.",
                asset: "imageURL",
              },
            });
            scriptSizeStart += 2;
            // Next 4 bytes are the length of the data to be pushed
            let inscriptionLength = parseInt(
              script.slice(scriptSizeStart, scriptSizeStart + 8),
              16
            );
            scriptItems.push({
              rawHex: script.slice(scriptSizeStart, scriptSizeStart + 8),
              item: {
                title: "Upcoming Inscription Data Length",
                value:
                  script.slice(scriptSizeStart, scriptSizeStart + 8) +
                  " hex | " +
                  inscriptionLength +
                  " bytes" +
                  " | " +
                  inscriptionLength * 2 +
                  " chars",
                type: TxTextSectionType.pushedData,
                description:
                  "Just like a regular data push op, this is the length of the inscription data to be pushed (in hex).",
                asset: "imageURL",
              },
            });
            scriptSizeStart += 8;
            // Pushed Inscription Data
            let str = "";
            console.log(
              "the length of inscription is currently: " + inscriptionLength * 2
            );
            console.log(
              "inscription raw is: " +
                script.slice(
                  scriptSizeStart,
                  scriptSizeStart + inscriptionLength * 2
                )
            );
            for (
              let i = 0;
              i <
              script.slice(
                scriptSizeStart,
                scriptSizeStart + inscriptionLength * 2
              ).length;
              i += 2
            ) {
              const code = parseInt(
                script
                  .slice(
                    scriptSizeStart,
                    scriptSizeStart + inscriptionLength * 2
                  )
                  .substr(i, 2),
                16
              );
              str += String.fromCharCode(code);
            }
            console.log("inscription string is: " + str);
            scriptItems.push({
              rawHex: script.slice(
                scriptSizeStart,
                scriptSizeStart + inscriptionLength * 2
              ),
              item: {
                title: "Inscription Data",
                value: str,
                type: TxTextSectionType.pushedData,
                description: PushedDataDescription.ORDINALDESCRIPTION,
                asset: "imageURL",
              },
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
              script.slice(scriptSizeStart, scriptSizeStart + 4) +
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
  if (script.length < 68 && script.length > 62) {
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
    let str = "";
    for (let i = 0; i < script.length; i += 2) {
      const code = parseInt(script.substr(i, 2), 16);
      str += String.fromCharCode(code);
    }
    return {
      pushedDataTitle: "MIME Type: " + str,
      pushedDataDescription:
        "A MIME type value is a standardized identifier used to specify the nature and format of a document, file, or set of data on the Internet. Based on the given hexadecimal array, you can pass down a MIME type by converting its string representation (e.g., 'text', 'image') to its corresponding hexadecimal value (e.g., '74657874' for 'text', '696d616765' for 'image').",
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
  } else if (script.length < 68 && script.length > 62) {
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

export function parseWitnessScriptPushedData(
  script: string
): TransactionItem[] {
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
      title: "Redeem Script",
      value: script.slice(0, 4) + "..." + script.slice(-4),
      description: "This is a redeem script",
      type: TxTextSectionType.witnessScript,
    },
  });
  // 3.B Second character of first byte tells us actual first OP
  redeemScriptFirstItems.push({
    rawHex: script.slice(1, 2),
    item: {
      title: firstOP.name,
      value: script.slice(0, 2) + " hex | " + firstOP.number + " bytes",
      type: TxTextSectionType.opCode,
      description: firstOP.description,
      asset: "imageURL",
    },
  });
  let finalRedeemScriptArr = redeemScriptFirstItems.concat(parseScriptResponse);
  console.log(finalRedeemScriptArr);
  return finalRedeemScriptArr;
  // TODO: accomodate for scriptpath
  // add necessary ops to lib
}

export function parseInputs(
  rawHex: string,
  offset: number
): {
  parsedRawHex: TransactionItem[];
  inputs: TxInput[];
  knownScripts: KnownScript[];
  newOffset: number;
  inputCount: number;
  inputCountLE: string;
} {
  let parsedRawHex: TransactionItem[] = [];
  const inputs: TxInput[] = [];
  const knownScripts: KnownScript[] = [];

  // Inputs
  // Input Count - extract using VarInt
  const inputCountVarInt = verifyVarInt(rawHex.slice(offset, offset + 18));
  const inputCountVarIntSize = inputCountVarInt.length;
  const inputCount = parseInt(inputCountVarInt, 16);
  const inputCountLE = rawHex.slice(offset, offset + inputCountVarIntSize);
  parsedRawHex.push({
    rawHex: rawHex.slice(offset, offset + inputCountVarIntSize),
    item: {
      title: CountTitle.INPUT,
      value: inputCount.toString(),
      type: TxTextSectionType.inputCount,
      description: CountDescription.INPUT,
      asset: "imageURL",
    },
  });
  offset += inputCountVarIntSize;
  // Loop
  for (let i = 0; i < inputCount; i++) {
    // TXID
    // Parse next 64 characters for TXID, raw hex value for this is in LE
    const txidLE = rawHex.slice(0 + offset, 64 + offset);
    const txidBE = leToBe64(txidLE);
    parsedRawHex.push({
      rawHex: txidLE,
      item: {
        title: "TXID (input " + i + ")",
        value: txidLE,
        type: TxTextSectionType.inputTxId,
        description: TXIDDescription,
        bigEndian: txidBE,
        previousTransactionURL: previousTransactionURL + txidBE,
      },
    });
    offset += 64;

    // VOUT
    // Parse next 8 characters for vout, raw hex value for this is in LE
    // Usually shown in block explorers as BE or DEC for readable vout
    const voutLE = rawHex.slice(0 + offset, 8 + offset);
    const voutBE = leToBe8(voutLE);
    parsedRawHex.push({
      rawHex: voutLE,
      item: {
        title: "VOUT (input " + i + ")",
        value: voutLE,
        type: TxTextSectionType.inputVout,
        description: VOUTDescription,
        bigEndian: voutBE,
        decimal: parseInt(voutBE, 16),
      },
    });
    offset += 8;

    // SigScriptSize
    // Parse up to next 10 characters for sigScriptSize
    const scriptSigSizeLE = verifyVarInt(rawHex.slice(offset, 18 + offset));
    const scriptSigSizeSize = scriptSigSizeLE.length;
    const scriptSizeHelperRes = scriptSizeLEToBEDec(scriptSigSizeLE);
    let scriptSigSizeBE = scriptSizeHelperRes.scriptSizeBE;
    let scriptSigSizeDec = scriptSizeHelperRes.scriptSizeDec;
    let scriptSig = "";
    let isSegWitLocal = false;

    if (
      inputCount === 1 &&
      txidLE === coinbaseTXID &&
      voutLE === coinbaseVOUT
    ) {
      // Coinbase transaction
      parsedRawHex.push({
        rawHex: rawHex.slice(offset, scriptSigSizeSize + offset),
        item: {
          title: coinbaseTitle,
          type: TxTextSectionType.inputScriptSigSize,
          value:
            scriptSigSizeLE +
            " hex | " +
            scriptSigSizeDec +
            " bytes" +
            " | " +
            scriptSigSizeDec * 2 +
            " chars",
          description: coinbaseDescription,
          bigEndian: scriptSigSizeBE,
          decimal: scriptSigSizeDec,
          asset: "imageURL",
        },
      });
      offset += scriptSigSizeSize;

      // Coinbase data
      scriptSig = rawHex.slice(offset, scriptSigSizeDec * 2 + offset);
      parsedRawHex.push({
        rawHex: rawHex.slice(offset, scriptSigSizeSize + offset),
        // rawHex: rawHex.slice(offset, scriptSigSizeDec * 2 + offset),
        item: {
          title: coinbaseDataTitle,
          type: TxTextSectionType.inputScriptSig,
          value: scriptSig,
          description: coinbaseDataDescription,
        },
      });
      offset += scriptSigSizeDec * 2;
    } else {
      // Normal transaction
      parsedRawHex.push({
        rawHex: rawHex.slice(offset, scriptSigSizeSize + offset),
        item: {
          title: "ScriptSigSize (input " + i + ")",
          type: TxTextSectionType.inputScriptSigSize,
          value:
            scriptSigSizeLE +
            " hex | " +
            scriptSigSizeDec +
            " bytes" +
            " | " +
            scriptSigSizeDec * 2 +
            " chars",
          description: ScriptSizeDescription.SCRIPTSIG,
          bigEndian: scriptSigSizeBE,
          decimal: scriptSigSizeDec,
          asset: "imageURL",
        },
      });
      offset += scriptSigSizeSize;
      // SigScript
      // Parse up to next scriptSigSizeDec*2 characters for sigScript
      // Check if legacy | segwit
      if (scriptSigSizeLE === zeroByte) {
        // Moved to witness section
        isSegWitLocal = true;
      } else {
        // ScriptSig included in input
        const scriptSig = rawHex.slice(offset, scriptSigSizeDec * 2 + offset);
        const isKnownScript = parseScriptForKnownScript(scriptSig, true);
        let scriptCoverage = 0;
        const firstOP = getOpcodeByHex(
          scriptSig.slice(scriptCoverage, scriptCoverage + 2)
        )!;

        // Start script parse
        // Very first character is the entire script
        parsedRawHex.push({
          rawHex: rawHex.slice(offset, offset + 1),
          item: {
            title: "ScriptSig (input " + i + ")",
            value: scriptSig,
            type: TxTextSectionType.inputScriptSig,
            description:
              ScriptDescriptions.SCRIPTSIG + isKnownScript === KnownScript.NONE
                ? ""
                : KnownScript + " transaction.",
            knownScript: isKnownScript,
          },
        });
        offset += 1;

        // Second character is the first byte
        parsedRawHex.push({
          rawHex: rawHex.slice(offset, offset + 1),
          item: {
            title: "Upcoming Data Size (" + firstOP.name + ")",
            value:
              rawHex.slice(offset - 1, offset + 1) +
              " hex | " +
              firstOP.number +
              " bytes" +
              " | " +
              firstOP.number * 2 +
              " chars",
            type: TxTextSectionType.opCode,
            description: pushOPDescription,
            knownScript: isKnownScript,
          },
        });
        offset += 1;

        const parsedScript = parseScript(
          scriptSig,
          firstOP.number,
          scriptSigSizeDec * 2
        );
        parsedRawHex = parsedRawHex.concat(parsedScript);
        offset += scriptSigSizeDec * 2 - 2;
        knownScripts.push(isKnownScript);
      }
    }

    // Sequence
    // Parse next 8 characters for sequence, raw hex value for this is in LE
    const sequenceLE = rawHex.slice(offset, 8 + offset);
    const sequenceBE = leToBe8(sequenceLE);
    parsedRawHex.push({
      rawHex: sequenceLE,
      item: {
        title: "Sequence (input " + i + ")",
        value: sequenceLE,
        type: TxTextSectionType.inputSequence,
        description: sequenceDescription,
      },
    });
    offset += 8;

    //console.log("input voutLE: ", voutLE);
    inputs.push({
      txid: txidLE,
      vout: voutLE,
      sigScriptSize: scriptSigSizeLE,
      sigScript: scriptSig,
      sequence: sequenceLE,
      isSegWit: isSegWitLocal,
    });
  }

  return {
    parsedRawHex,
    inputs,
    knownScripts,
    newOffset: offset,
    inputCount,
    inputCountLE,
  };
}

// this parses the transaction to get the version
export function parseVersion(
  rawHex: string,
  offset: number
): {
  parsedRawHex: TransactionItem[];
  versionJSON: string;
  versionLE: string;
  newOffset: number;
} {
  let parsedRawHex: TransactionItem[] = [];

  // Fetch, check & store Version
  // adds 8 to the offset to move to the section of the transaction that contains the version
  const versionLE = rawHex.slice(offset, offset + 8);
  const versionBE = leToBe8(versionLE);

  if (versionLE !== versionOne && versionLE !== versionTwo) {
    if (versionLE.slice(0, 2) === zeroByte) {
      throw errInvalidVersionEndian;
    }
    if (parseInt(versionLE) >= 3) {
      throw errNonstandardVersion;
    }
  } else if (versionLE === versionOne) {
    parsedRawHex.push({
      rawHex: versionLE,
      item: {
        title: VersionTitle.V1,
        value: VersionValueType.V1,
        description: versionDescription,
        bigEndian: VersionBigEndian.V1,
        type: TxTextSectionType.version,
      },
    });
  } else {
    parsedRawHex.push({
      rawHex: versionLE,
      item: {
        title: VersionTitle.V2,
        value: VersionValueType.V2,
        description: versionDescription,
        bigEndian: VersionBigEndian.V2,
        type: TxTextSectionType.version,
      },
    });
  }

  return {
    parsedRawHex,
    versionJSON: versionBE,
    versionLE: versionLE,
    newOffset: offset + 8,
  };
}

// parses a transaction for the marker and flag and helps determine if it's a segwit transaction
export function parseMarkerAndFlag(
  rawHex: string,
  offset: number
): {
  parsedRawHex: TransactionItem[];
  txType: TxType;
  newOffset: number;
} {
  let parsedRawHex: TransactionItem[] = [];
  let txType: TxType;

  // Check if legacy or segwit
  // initial offset is 8, so it would be between 8 - 12 we are slicing
  if (rawHex.slice(offset, offset + 4) === markerFlag) {
    txType = TxType.SEGWIT;

    // Parse marker (first 2 characters of the marker+flag)
    parsedRawHex.push({
      rawHex: rawHex.slice(offset, offset + 2),
      item: {
        title: markerTitle,
        value: markerValue,
        type: TxTextSectionType.marker,
        description: markerDescription,
      },
    });

    // Parse flag (next 2 characters)
    parsedRawHex.push({
      rawHex: rawHex.slice(offset + 2, offset + 4),
      item: {
        title: flagTitle,
        type: TxTextSectionType.flag,
        value: flagValue,
        description: flagDescription,
      },
    });

    offset += 4;
  } else {
    txType = TxType.LEGACY;
  }

  return {
    parsedRawHex,
    txType,
    newOffset: offset,
  };
}

export function parseOutputs(
  rawHex: string,
  offset: number
): {
  parsedRawHex: TransactionItem[];
  outputs: TxOutput[];
  knownScripts: KnownScript[];
  totalBitcoin: number;
  numOutputs: number;
  outputCountLE: string;
  newOffset: number;
} {
  let parsedRawHex: TransactionItem[] = [];
  const outputs: TxOutput[] = [];
  const knownScripts: KnownScript[] = [];
  let totalBitcoin = 0;

  // Extract output count using VarInt
  const outputCountVarInt = verifyVarInt(rawHex.slice(offset, offset + 18));
  const outputCountVarIntSize = outputCountVarInt.length;
  const outputCount = parseInt(outputCountVarInt, 16);
  const outputCountLE = rawHex.slice(offset, offset + outputCountVarIntSize);

  // Add output count to parsed data
  parsedRawHex.push({
    rawHex: rawHex.slice(offset, offset + outputCountVarIntSize),
    item: {
      title: CountTitle.OUTPUT,
      value: outputCount + "",
      description: CountDescription.OUTPUT,
      asset: "imageURL",
      type: TxTextSectionType.outputCount,
    },
  });
  offset += outputCountVarIntSize;

  // Parse each output
  for (let i = 0; i < outputCount; i++) {
    // Parse amount
    const amountLE = rawHex.slice(offset, 16 + offset);
    const amountBE = leToBe16(amountLE);
    const amountDec = parseInt(amountBE, 16);
    parsedRawHex.push({
      rawHex: amountLE,
      item: {
        title: "Amount (output " + i + ")",
        value: amountLE,
        type: TxTextSectionType.outputAmount,
        description: amountDescription,
        bigEndian: amountBE,
        decimal: amountDec,
      },
    });
    totalBitcoin += amountDec;
    offset += 16;

    // Parse script pubkey size
    const scriptPubKeySizeLE = verifyVarInt(rawHex.slice(offset, 18 + offset));
    const scriptPubKeySizeSize = scriptPubKeySizeLE.length;
    const scriptSizeHelperRes = scriptSizeLEToBEDec(scriptPubKeySizeLE);
    const scriptPubKeySizeBE = scriptSizeHelperRes.scriptSizeBE;
    const scriptPubKeySizeDec = scriptSizeHelperRes.scriptSizeDec;

    parsedRawHex.push({
      rawHex: rawHex.slice(offset, offset + scriptPubKeySizeSize),
      item: {
        title: "PubKeySize (output " + i + ")",
        type: TxTextSectionType.outputPubKeySize,
        value: `${scriptPubKeySizeLE} hex | ${scriptPubKeySizeDec} bytes | ${
          scriptPubKeySizeDec * 2
        } chars`,
        description: ScriptSizeDescription.SCRIPTPUBKEY,
        bigEndian: scriptPubKeySizeBE,
        decimal: scriptPubKeySizeDec,
        asset: "imageURL",
      },
    });
    offset += scriptPubKeySizeSize;

    // Parse script pubkey
    const pubKeyScript = rawHex.slice(offset, scriptPubKeySizeDec * 2 + offset);
    const isKnownScript = parseScriptForKnownScript(pubKeyScript, false);
    let scriptCoverage = 0;
    const firstOP = getOpcodeByHex(
      pubKeyScript.slice(scriptCoverage, scriptCoverage + 2)
    )!;

    // Parse script and add to parsed data
    parsedRawHex.push({
      rawHex: rawHex.slice(offset, offset + 1),
      item: {
        title: "ScriptPubKey (output " + i + ")",
        value: pubKeyScript,
        type: TxTextSectionType.outputPubKeyScript,
        description:
          ScriptDescriptions.SCRIPTPUBKEY +
          (isKnownScript === KnownScript.NONE
            ? ""
            : KnownScript + "  transaction"),
        knownScript: isKnownScript,
      },
    });
    offset += 1;

    // Parse script type
    if (pubKeyScript.slice(scriptCoverage, scriptCoverage + 2) === zeroByte) {
      parsedRawHex.push({
        rawHex: rawHex.slice(offset, offset + 1),
        item: {
          title: SegWitVersionTitle.SEGWIT,
          value: `${pubKeyScript.slice(
            scriptCoverage,
            scriptCoverage + 2
          )} hex | ${firstOP.number} opcode`,
          type: TxTextSectionType.segwitVersion,
          description: SegWitVersionDescription.SEGWIT,
          knownScript: isKnownScript,
        },
      });
    } else if (
      pubKeyScript.slice(scriptCoverage, scriptCoverage + 2) ===
      SegWitVersionFlag.TAPROOT
    ) {
      parsedRawHex.push({
        rawHex: rawHex.slice(offset, offset + 1),
        item: {
          title: SegWitVersionTitle.TAPROOT,
          value: `${pubKeyScript.slice(
            scriptCoverage,
            scriptCoverage + 2
          )} hex | ${firstOP.number} opcode`,
          type: TxTextSectionType.segwitVersion,
          description: SegWitVersionDescription.TAPROOT,
          knownScript: isKnownScript,
        },
      });
    } else {
      parsedRawHex.push({
        rawHex: rawHex.slice(offset, offset + 1),
        item: {
          title: firstOP.name,
          value: `${pubKeyScript.slice(
            scriptCoverage,
            scriptCoverage + 2
          )} hex | ${firstOP.number} opcode`,
          type: TxTextSectionType.opCode,
          description: firstOP.description,
          knownScript: isKnownScript,
        },
      });
    }
    offset += 1;

    // Parse remaining script
    while (scriptCoverage < scriptPubKeySizeDec * 2) {
      const op = getOpcodeByHex(
        pubKeyScript.slice(scriptCoverage, scriptCoverage + 2)
      )!;

      if (scriptCoverage < 2) {
        if (firstOP.number < commonPushOPMax) {
          const parsedData = parseOutputPubKeyScriptPushedData(
            pubKeyScript.slice(
              scriptCoverage + 2,
              scriptCoverage + 2 + firstOP.number * 2
            ),
            firstOP.number
          );
          if (
            pubKeyScript.slice(scriptCoverage, scriptCoverage + 2) !==
              zeroByte &&
            pubKeyScript.slice(scriptCoverage, scriptCoverage + 2) !== "51"
          ) {
            parsedRawHex.push({
              rawHex: pubKeyScript.slice(
                scriptCoverage + 2,
                scriptCoverage + 2 + firstOP.number * 2
              ),
              item: {
                title: parsedData.pushedDataTitle,
                value: pubKeyScript.slice(
                  scriptCoverage + 2,
                  scriptCoverage + 2 + firstOP.number * 2
                ),
                type: TxTextSectionType.pushedData,
                description: parsedData.pushedDataDescription,
                asset: "imageURL",
              },
            });
          }
          scriptCoverage += 2 + firstOP.number * 2;
        } else {
          scriptCoverage += 2;
        }
      } else {
        if (op.number < 88) {
          parsedRawHex.push({
            rawHex: pubKeyScript.slice(scriptCoverage, scriptCoverage + 2),
            item: {
              title: "Upcoming Data Size (" + op.name + ")",
              value: `${pubKeyScript.slice(
                scriptCoverage,
                scriptCoverage + 2
              )} hex | ${op.number} bytes | ${op.number * 2} chars`,
              type: TxTextSectionType.opCode,
              description: pushOPDescription,
              asset: "imageURL",
            },
          });

          const parsedData = parseOutputPubKeyScriptPushedData(
            pubKeyScript.slice(
              scriptCoverage + 2,
              scriptCoverage + 2 + op.number * 2
            ),
            firstOP.number
          );
          parsedRawHex.push({
            rawHex: pubKeyScript.slice(
              scriptCoverage + 2,
              scriptCoverage + 2 + op.number * 2
            ),
            item: {
              title: parsedData.pushedDataTitle,
              value: pubKeyScript.slice(
                scriptCoverage + 2,
                scriptCoverage + 2 + op.number * 2
              ),
              type: TxTextSectionType.pushedData,
              description: parsedData.pushedDataDescription,
              asset: "imageURL",
            },
          });
          scriptCoverage += 2 + op.number * 2;
        } else {
          parsedRawHex.push({
            rawHex: pubKeyScript.slice(scriptCoverage, scriptCoverage + 2),
            item: {
              title: op.name,
              value: `${pubKeyScript.slice(offset, offset + 2)} hex | ${
                op.number
              } opcode`,
              type: TxTextSectionType.opCode,
              description: op.description,
              knownScript: isKnownScript,
            },
          });
          scriptCoverage += 2;
        }
      }
    }

    offset += scriptPubKeySizeDec * 2 - 2;
    knownScripts.push(isKnownScript);

    outputs.push({
      amount: amountDec,
      amountLE: amountLE,
      pubKeySize: scriptPubKeySizeLE,
      pubKeyScript: pubKeyScript,
      knownScript: isKnownScript,
    });
  }

  return {
    parsedRawHex,
    outputs,
    knownScripts,
    totalBitcoin,
    numOutputs: outputCount,
    outputCountLE,
    newOffset: offset,
  };
}

export function parseWitnesses(
  rawHex: string,
  offset: number,
  numInputs: number,
  inputs: TxInput[]
): {
  parsedRawHex: TransactionItem[];
  witnesses: TxWitness[];
  knownScripts: KnownScript[];
  newOffset: number;
} {
  const parsedRawHex: TransactionItem[] = [];
  const witnesses: TxWitness[] = [];
  const knownScripts: KnownScript[] = [];

  for (let i = 0; i < numInputs; i++) {
    // Extract witness script element count
    const witnessNumOfElementsLE = verifyVarInt(
      rawHex.slice(offset, offset + 18)
    );
    const witnessNumOfElementsCountSize = witnessNumOfElementsLE.length;
    const witnessNumSizeHelperRes = scriptSizeLEToBEDec(witnessNumOfElementsLE);
    const witnessNumOfElementsBE = witnessNumSizeHelperRes.scriptSizeBE;
    const witnessNumOfElementsCount = witnessNumSizeHelperRes.scriptSizeDec;

    let itemsPushedToParsedRawHexSinceStartOfWitness = 0;
    const offsetAtStart = offset;
    let offsetSinceStartOfWitness = 0;

    // Add witness element count to parsed data
    parsedRawHex.push({
      rawHex: rawHex.slice(offset + 1, witnessNumOfElementsCountSize + offset),
      item: {
        title: "Witness Element Count (witness " + i + ")",
        value: witnessNumOfElementsLE,
        description:
          "Every Witness consists of an element count & an array of tuples that include the size(varint) of the upcoming element & the actual value / element (data or op_code) itself. \n This witness element count tells us how many items are in the upcoming witness script.",
        asset: "imageURL",
        type: TxTextSectionType.witnessSize,
      },
    });
    itemsPushedToParsedRawHexSinceStartOfWitness++;
    offsetSinceStartOfWitness += witnessNumOfElementsCountSize;
    offset += witnessNumOfElementsCountSize;

    // Parse witness elements
    const witnessElements: TxWitnessElement[] = [];
    for (let j = 0; j < witnessNumOfElementsCount; j++) {
      // Parse element size
      const elementSizeLE = verifyVarInt(rawHex.slice(offset, offset + 18));
      const elementSizeSize = elementSizeLE.length;
      const elementSizeHelperRes = scriptSizeLEToBEDec(elementSizeLE);
      const elementSizeBE = elementSizeHelperRes.scriptSizeBE;
      const elementSizeDec = elementSizeHelperRes.scriptSizeDec;

      parsedRawHex.push({
        rawHex: rawHex.slice(offset, elementSizeSize + offset),
        item: {
          title: `Witness Element Size (witness ${i}, element ${j} size)`,
          value: `${elementSizeBE} hex | ${elementSizeDec} bytes | ${
            elementSizeDec * 2
          } chars`,
          description:
            "Before every item in the Witness script, we first need to record the size of the upcoming item. As usual, this means using the standard VarInt rules: \n This witness element count tells us how many items are in the upcoming witness script.",
          type: TxTextSectionType.witnessElementSize,
        },
      });
      itemsPushedToParsedRawHexSinceStartOfWitness++;
      offset += elementSizeSize;
      offsetSinceStartOfWitness += elementSizeSize;

      // Parse element value
      const elementValue = rawHex.slice(offset, elementSizeDec * 2 + offset);
      const isKnownScript = parseWitnessForKnownScript(
        inputs[i],
        witnessNumOfElementsCount,
        witnessElements
      );
      const pushedData = parseWitnessElementPushedData(
        rawHex.slice(offset, elementSizeDec * 2 + offset)
      );
      knownScripts.push(isKnownScript);

      // Handle witness redeem script
      if (
        pushedData.pushedDataTitle === PushedDataTitle.WITNESSREDEEMSCRIPT &&
        pushedData.pushedDataDescription === PushedDataDescription.REDEEMSCRIPT
      ) {
        const redeemScriptRes = parseWitnessScriptPushedData(
          rawHex.slice(offset, elementSizeDec * 2 + offset)
        );
        parsedRawHex.push(...redeemScriptRes);
        itemsPushedToParsedRawHexSinceStartOfWitness++;
      } else if (elementValue !== "") {
        parsedRawHex.push({
          rawHex: elementValue,
          item: {
            title: pushedData.pushedDataTitle,
            value: elementValue,
            type: TxTextSectionType.pushedData,
            description: pushedData.pushedDataDescription,
            knownScript: isKnownScript,
          },
        });
        itemsPushedToParsedRawHexSinceStartOfWitness++;
      }

      offset += elementSizeDec * 2;
      offsetSinceStartOfWitness += elementSizeDec * 2;
      witnessElements.push({
        elementSize: witnessNumOfElementsBE,
        elementValue: elementValue,
      });
    }

    // Add complete witness to array
    witnesses.push({
      witnessNumElements: witnessNumOfElementsCount,
      witnessElements: witnessElements,
      knownScript: parseWitnessForKnownScript(
        inputs[i],
        witnessNumOfElementsCount,
        witnessElements
      ),
    });

    // Add complete witness script to parsed data
    const witnessScript = rawHex.slice(
      offsetAtStart,
      offsetAtStart + offsetSinceStartOfWitness
    );
    parsedRawHex.splice(
      parsedRawHex.length - itemsPushedToParsedRawHexSinceStartOfWitness,
      0,
      {
        rawHex: rawHex.slice(offset, offset + 1),
        item: {
          title: "Witness Script (witness " + i + ")",
          value:
            witnessScript.slice(0, 8) +
            "..." +
            witnessScript.slice(witnessScript.length - 8),
          type: TxTextSectionType.witnessScript,
          description: `Each Witness represents a tuple of element sizes & element items (either pushed data or op_code); in aggregate, these tuples make up what can be considered the Witness Script. This is what unlocks the Input with the same index. \n Commonly, but not always, the Witness Script is one of the handful of standard scripts. \n It appears that this particular Witness Script is part of a: ${parseWitnessForKnownScript(
            inputs[i],
            witnessNumOfElementsCount,
            witnessElements
          )} script.`,
          knownScript: parseWitnessForKnownScript(
            inputs[i],
            witnessNumOfElementsCount,
            witnessElements
          ),
        },
      }
    );
  }

  return {
    parsedRawHex,
    witnesses,
    knownScripts,
    newOffset: offset,
  };
}

export function parseLocktime(
  rawHex: string,
  offset: number
): {
  parsedRawHex: TransactionItem[];
  locktimeJSON: string;
  newOffset: number;
} {
  const locktimeLE = rawHex.slice(offset, offset + 8);
  const locktimeBE = leToBe8(locktimeLE);
  const locktimeDec = parseInt(locktimeBE, 16);

  const parsedRawHex: TransactionItem[] = [
    {
      rawHex: rawHex.slice(offset, offset + 8),
      item: {
        title: "Locktime",
        type: TxTextSectionType.lockTimeValue,
        value: `${locktimeLE} hex | ${locktimeDec} dec`,
        description:
          "Locktime sets the earliest time an entire transaction can be mined in to a block; it's the last field in any type of transaction. The sequence is stored as an 4-byte | 16-char in Little Endian format & the value itself tells us whether the timelock is block-height, time based or set to mine immediately (00000000):",
      },
    },
  ];

  return {
    parsedRawHex,
    locktimeJSON: locktimeLE,
    newOffset: offset + 8,
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
  "74657874", // "text"
  "696d616765", // "image"
  "617564696f", // "audio"
  "766964656f", // "video"
  "6170706c69636174696f6e", // "application"
  "6d756c746970617274", // "multipart"
  "6d657373616765", // "message"
  "666f6e74", // "font"
  "6d6f64656c", // "model"
];

function isHexMimeTypeInArray(hexString: string): boolean {
  return mimeTypesHex.some((hexType) => hexString.startsWith(hexType));
}

