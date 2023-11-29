import axios from "axios";
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
  verifyVarInt,
  leToBe4,
  leToBe8,
  leToBe16,
  leToBe64,
  parseInputForKnownScript,
  parseOutputForKnownScript,
  parseWitnessForKnownScript,
  parseInputSigScriptPushedData,
  parseOutputPubKeyScriptPushedData,
  parseWitnessElementPushedData,
  scriptSizeLEToBEDec
} from "./helpers";
import {
  TxInput,
  TxOutput,
  TxWitness,
  TxWitnessElement,
  TxData,
  MinTxData,
  TxType,
  HexResponse,
  TransactionItem,
  VersionItem,
  CountItem,
  BaseTransactionItem,
  JSONResponse,
  TransactionFeResponse,
} from "./model";
import {
  versionDescription,
  VersionTitle,
  VersionValueType,
  VersionBigEndian,
  CountDescription,
  CountTitle,
  VOUTDescription,
  SegWitVersionTitle,
  SegWitVersionDescription,
  KnownScript,
} from "./overlayValues";
import { TxTextSectionType } from "../comp/Transactions/Helper";
import { OP_Code, getOpcodeByHex, makePushOPBiggerThan4b } from "../corelibrary/op_code";

// User arrives & has three options: paste TXID, paste raw hex or load example
// Paste TXID -> FetchTXID() -> ParseRawHex()
// Paste raw hex & load example -> ParseRawHex()

// ParseRawHex() -> Error | {HexResponse | JSONResponse}
// The response of parseRawHex should include *everything* needed client-side

// interface MarkerFlagItem extends BaseTransactionItem {
//   bigEndian: string;
// }

// User arrives & has three options: paste TXID, paste raw hex or load example
// Paste TXID -> FetchTXID() -> ParseRawHex()
// Paste raw hex & load example -> ParseRawHex()

const commonPushOPMax = 76;

async function fetchTXID(txid: string): Promise<string> {
  // Try mainnet, then testnet
  try {
    const response = await axios.get(
      `https://mempool.space/api/tx/${txid}/hex`
    );
    return response.data;
  } catch (error1) {
    console.error("Error fetching from mempool.space:", error1);

    try {
      const response = await axios.get(
        `https://mempool.space/testnet/api/tx/${txid}/hex`
      );
      return response.data;
    } catch (error2) {
      console.error("Error fetching from mempool.space:", error2);
    }

    throw error1;
  }
}

// ParseRawHex() -> Error | {HexResponse | JSONResponse}
// The response of parseRawHex should include *everything* needed client-side

// interface MarkerFlagItem extends BaseTransactionItem {
//   bigEndian: string;
// }

// Missing functions
// getTotalBitcoin()
function parseRawHex(rawHex: string): TransactionFeResponse {
  // Hex Response Items
  let offset = 0;
  let txType;
  let numInputs;
  let numOutputs;
  let totalBitcoin = 0;
  let knownScripts: KnownScript[] = [];
  let parsedRawHex: TransactionItem[] = [];

  // JSON Response Items
  let versionJSON = "";
  let locktimeJSON = "";
  const inputs: TxInput[] = [];
  const outputs: TxOutput[] = [];
  const witnesses: TxWitness[] = [];

  let testVersion;
  // Check if rawHex is at least 256 characters
  if (rawHex.length < 256) {
    throw errInvalidInput;
  }
  // Fetch, check & store Version
  const versionLE = rawHex.slice(0, 8);
  const versionBE = leToBe8(versionLE);
  versionJSON = versionBE;
  if (versionLE !== "01000000" && versionLE !== "02000000") {
    if (versionLE.slice(0, 2) === "00") {
      throw errInvalidVersionEndian;
    }
    if (parseInt(versionLE) >= 3) {
      throw errNonstandardVersion;
    }
  } else if (versionLE === "01000000") {
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
  offset += 8;
  // Check if legacy or segwit
  if (rawHex.slice(8, 12) === "0001") {
    txType = TxType.SEGWIT;
    parsedRawHex.push({
      rawHex: rawHex.slice(8, 10),
      item: {
        title: "Marker",
        value: "00",
        type: TxTextSectionType.marker,
        description:
          "This is a zero byte figure that indicates that this transaction is a segregated witness (SegWit) transaction that contains a witness section.",
      },
    });
    parsedRawHex.push({
      rawHex: rawHex.slice(10, 12),

      item: {
        title: "Flag",
        type: TxTextSectionType.flag,
        value: "01",
        description:
          "The Flag, stored as 1-byte | 2-hex value, is an additional indicator meant for SegWit functionality. Currently only the value 0x01 is standard & relayed; however, this field could be used to flag for different SegWit alternatives.",
      },
    });
    offset += 4;
  } else {
    txType = TxType.LEGACY;
  }
  // Inputs
  // Input Count - extract using VarInt
  const inputCountVarInt = verifyVarInt(rawHex.slice(offset, offset + 18));
  const inputCountVarIntSize = inputCountVarInt.length;
  const inputCount = parseInt(inputCountVarInt, 16);
  numInputs = inputCount;
  parsedRawHex.push({
    rawHex: rawHex.slice(offset, offset + inputCountVarIntSize),
    item: {
      title: CountTitle.INPUT,
      value: inputCount + "",
      type: TxTextSectionType.inputCount,
      description: CountDescription.INPUT,
      asset: "imageURL",
    },
  });
  offset += inputCountVarIntSize;
  // Loop
  // Loop through transaction inputCountVarInt amount of times to extract inputs
  for (let i = 0; i < inputCount; i++) {
    // TXID
    // Parse next 64 characters for TXID, raw hex value for this is in LE
    // Usually shown in block explorers as BE for readable TXID
    const txidLE = rawHex.slice(0 + offset, 64 + offset);
    const txidBE = leToBe64(txidLE);
    parsedRawHex.push({
      rawHex: txidLE,
      item: {
        title: "TXID (input " + i + ")",
        value: txidLE,
        type: TxTextSectionType.inputTxId,
        description:
          "This is the transaction ID of the transaction that contains the output that is being redeemed by this input. This is a 32-byte | 64-hex value. \n This means you cannot copy/paste it as is - you first need to convert it from Little Endian to Big Endian. Click the link indicator above to open this transaction in a different tab.",
        bigEndian: txidBE,
        previousTransactionURL:
          "https://bitscript-git-stage-setteam.vercel.app/transactions?transaction=" +
          txidBE,
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
    let scriptSigSizeBE;
    let scriptSigSizeDec = 0;
    const scriptSigSizeSize = scriptSigSizeLE.length;
    const scriptSizeHelperRes = scriptSizeLEToBEDec(scriptSigSizeLE);
    scriptSigSizeBE = scriptSizeHelperRes.scriptSizeBE;
    scriptSigSizeDec = scriptSizeHelperRes.scriptSizeDec;
    let scriptSig = "";
    let isSegWitLocal = false;
    if (
      inputCount === 1 &&
      txidLE ===
        "0000000000000000000000000000000000000000000000000000000000000000" &&
      voutLE === "ffffffff"
    ) {
      // Coinbase transaction
      parsedRawHex.push({
        rawHex: rawHex.slice(offset, scriptSigSizeSize + offset),
        item: {
          title: "Coinbase Data Size",
          type: TxTextSectionType.inputScriptSigSize,
          value:
            scriptSigSizeLE +
            " hex | " +
            scriptSigSizeDec +
            " bytes" +
            " | " +
            scriptSigSizeDec * 2 +
            " chars",
          description:
            "In every Coinbase transaction a miner has the option to inscribe some data into the Coinbase transaction. Whenever we push data, we'll need a VarInt that precedes it.",
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
        item: {
          title: "Coinbase Data",
          type: TxTextSectionType.inputScriptSig,
          value: scriptSig,
          description:
            "The Coinbase data inscribed by the miner that produced this block. Try converting the raw hex to string/ascii in our data formatter to see if it's a legible message.",
        },
      });
      offset += scriptSigSizeDec * 2;
    } else {
      // Normal transaction
      parsedRawHex.push({
        rawHex: rawHex.slice(offset, scriptSigSizeSize + offset),
        item: {
          title: "SigScriptSize (input " + i + ")",
          type: TxTextSectionType.inputScriptSigSize,
          value:
            scriptSigSizeLE +
            " hex | " +
            scriptSigSizeDec +
            " bytes" +
            " | " +
            scriptSigSizeDec * 2 +
            " chars",
          description:
            "The SigScriptSize is the size of the unlocking script (sigScript) in bytes. This is a variable integer, meaning that the size of the integer itself can vary.",
          bigEndian: scriptSigSizeBE,
          decimal: scriptSigSizeDec,
          asset: "imageURL",
        },
      });
      offset += scriptSigSizeSize;
      // SigScript
      // Parse up to next scriptSigSizeDec*2 characters for sigScript
      // Check if legacy | segwit
      if (scriptSigSizeLE === "00") {
        // Moved to witness section
        isSegWitLocal = true;
      } else {
        // ScriptSig included in input
        const scriptSig = rawHex.slice(offset, scriptSigSizeDec * 2 + offset);
        const isKnownScript = parseInputForKnownScript(scriptSig);
        let scriptSigCoverage = 0;
        const firstOP = getOpcodeByHex(
          scriptSig.slice(scriptSigCoverage, scriptSigCoverage + 2)
        )!;
        // Start script parse
        // Very first character is the entire script
        parsedRawHex.push({
          rawHex: rawHex.slice(offset, offset + 1),
          item: {
            title: "SigScript (input " + i + ")",
            value: scriptSig,
            type: TxTextSectionType.inputScriptSig,
            description:
              "The ScriptSig, also known as the UnlockScript, is what’s used to cryptographically verify that we own the UTXO fetched; by proving ownership, we’re now allowed to spend the BTC  stored in the input. Commonly, but not always, the SigScript/UnlockScript is one of the handful of standard scripts.\n It appears that this particular SigScript is part of a " +
                isKnownScript ===
              KnownScript.NONE
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
            description:
              "Before pushing data to the stack it’s required that explicitly defined its length; this is done using a one or more data push ops. Much like VarInt, there are specific rules tha must be adhered to: \n This length is recorded in hex & must be converted to decimal to correctly count upcoming chars.",
            knownScript: isKnownScript,
          },
        });
        offset += 1;
        while (scriptSigCoverage < scriptSigSizeDec * 2) {
          // Check if opCode is a data push or normal op
          // Data push, need to capture op + following data
          let op = getOpcodeByHex(
            scriptSig.slice(scriptSigCoverage, scriptSigCoverage + 2)
          )!;
          if (scriptSigCoverage < 2) {
            // first loop, use firstOP
            if (firstOP.number < commonPushOPMax && firstOP.number > 0) {
              const parsedData = parseInputSigScriptPushedData(
                scriptSig.slice(
                  scriptSigCoverage + 2,
                  scriptSigCoverage + 2 + firstOP.number * 2
                )
              );
              // first op is a data push op, following data
              parsedRawHex.push({
                rawHex: scriptSig.slice(
                  scriptSigCoverage + 2,
                  scriptSigCoverage + 2 + firstOP.number * 2
                ),
                item: {
                  title: parsedData.pushedDataTitle,
                  value: scriptSig.slice(
                    scriptSigCoverage + 2,
                    scriptSigCoverage + 2 + firstOP.number * 2
                  ),
                  type: TxTextSectionType.pushedData,
                  description: parsedData.pushedDataDescription,
                  asset: "imageURL",
                },
              });
              scriptSigCoverage += 2 + firstOP.number * 2;
            } else {
              // first op is a common op, already included
              scriptSigCoverage += 2;
            }
          } else {
            // next n loops
            if (op.number < commonPushOPMax) {
              // Data Push OP -> Push Data OP & Data Item
              // Data OP
              parsedRawHex.push({
                rawHex: scriptSig.slice(
                  scriptSigCoverage,
                  scriptSigCoverage + 2
                ),
                item: {
                  title: "Upcoming Data Size (" + op.name + ")",
                  value:
                    scriptSig.slice(scriptSigCoverage, scriptSigCoverage + 2) +
                    " hex | " +
                    op.number +
                    " bytes" +
                    " | " +
                    op.number * 2 +
                    " chars",
                  type: TxTextSectionType.opCode,
                  description:
                    "Before pushing data to the stack it’s required that explicitly defined its length; this is done using a one or more data push ops. Much like VarInt, there are specific rules tha must be adhered to: \n This length is recorded in hex & must be converted to decimal to correctly count upcoming chars.",
                  asset: "imageURL",
                },
              });
              // Data Item
              const parsedData = parseInputSigScriptPushedData(
                scriptSig.slice(
                  scriptSigCoverage + 2,
                  scriptSigCoverage + 2 + op.number * 2
                )
              );
              parsedRawHex.push({
                rawHex: scriptSig.slice(
                  scriptSigCoverage + 2,
                  scriptSigCoverage + 2 + op.number * 2
                ),
                item: {
                  title: parsedData.pushedDataTitle,
                  value: scriptSig.slice(
                    scriptSigCoverage + 2,
                    scriptSigCoverage + 2 + op.number * 2
                  ),
                  type: TxTextSectionType.pushedData,
                  description: parsedData.pushedDataDescription,
                  asset: "imageURL",
                },
              });
              scriptSigCoverage += 2 + op.number * 2;
            } else if (op.number === 76) {
              
              // OP_PUSHDATA1, this means we need to push 3 items:
              // OP_PUSHDATA1 (0x4c)
              // Next byte is the length of the data to be pushed
              // Pushed Data

              // OP_PUSHDATA1
              parsedRawHex.push({
                rawHex: scriptSig.slice(
                  scriptSigCoverage,
                  scriptSigCoverage + 2
                ),
                item: {
                  title: "Push Data 1-Byte",
                  value:
                    scriptSig.slice(scriptSigCoverage, scriptSigCoverage + 2) +
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
                scriptSig.slice(scriptSigCoverage+2, scriptSigCoverage + 4)
              )!;
              parsedRawHex.push({
                rawHex: scriptSig.slice(
                  scriptSigCoverage + 2,
                  scriptSigCoverage + 4
                ),
                item: {
                  title: "Upcoming Data Size (" + op.name + ")",
                  value:
                    scriptSig.slice(scriptSigCoverage+2, scriptSigCoverage + 4) +
                    " hex | " +
                    op.number +
                    " bytes" +
                    " | " +
                    op.number * 2 +
                    " chars",
                  type: TxTextSectionType.opCode,
                  description:
                    "Before pushing data to the stack it’s required that explicitly defined its length; this is done using a one or more data push ops. Much like VarInt, there are specific rules tha must be adhered to: \n This length is recorded in hex & must be converted to decimal to correctly count upcoming chars.",
                  asset: "imageURL",
                },
              });
               // Data Item
               const parsedData = parseInputSigScriptPushedData(
                scriptSig.slice(
                  scriptSigCoverage + 4,
                  scriptSigCoverage + 4 + op.number * 2
                )
              );
              parsedRawHex.push({
                rawHex: scriptSig.slice(
                  scriptSigCoverage + 4,
                  scriptSigCoverage + 4 + op.number * 2
                ),
                item: {
                  title: parsedData.pushedDataTitle,
                  value: scriptSig.slice(
                    scriptSigCoverage + 4,
                    scriptSigCoverage + 4 + op.number * 2
                  ),
                  type: TxTextSectionType.pushedData,
                  description: parsedData.pushedDataDescription,
                  asset: "imageURL",
                },
              });
              scriptSigCoverage += 4 + op.number * 2;

            } else {
              // Common OP -> Push Common OP
              // Common OP
              parsedRawHex.push({
                rawHex: scriptSig.slice(
                  scriptSigCoverage,
                  scriptSigCoverage + 2
                ),
                item: {
                  title: op?.name,
                  value:
                    scriptSig.slice(scriptSigCoverage, scriptSigCoverage + 2) +
                    " hex | " +
                    op.number +
                    " opcode",
                  type: TxTextSectionType.opCode,
                  description: op.description,
                  asset: "imageURL",
                },
              });
            }
          }
        }
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
        description:
          "A timelock for a specific input. Used very rarely with  op_checksequenceverify, most commonly left unaltered / set to mine immediately. \n The sequence is stored as an 4-byte | 16-char in Little Endian format & the value itself tells us whether the timelock is block-height, time based or set to mine immediately (ffffffff):",
      },
    });
    offset += 8;

    inputs.push({
      txid: txidLE,
      vout: voutBE,
      sigScriptSize: scriptSigSizeLE,
      sigScript: scriptSig,
      sequence: sequenceLE,
      isSegWit: isSegWitLocal,
    });
  }

  // Outputs
  // Extract output count using VarInt
  const outputCountVarInt = verifyVarInt(rawHex.slice(offset, offset + 18));
  const outputCountVarIntSize = outputCountVarInt.length;
  const outputCount = parseInt(outputCountVarInt, 16);
  numOutputs = outputCount;
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

  // Create empty array of Outputs
  // Loop through transaction outputCount amount of times to extract outputs
  for (let i = 0; i < outputCount; i++) {
    // Extract amount of sats being transferred
    const amountLE = rawHex.slice(offset, 16 + offset);
    const amountBE = leToBe16(amountLE);
    const amountDec = parseInt(amountBE, 16);
    parsedRawHex.push({
      rawHex: amountLE,
      item: {
        title: "Amount (output " + i + ")",
        value: amountLE,
        type: TxTextSectionType.outputAmount,
        description:
          "The amount of Bitcoin, described in integer Satoshis (1/100,000,000 of a Bitcoin) that is being sent in this output. /n This amount value is stored as an 8-byte | 16-char in Little Endian format. ",
        bigEndian: amountBE,
        decimal: amountDec,
      },
    });
    totalBitcoin += amountDec;
    offset += 16;
    // PubKeyScriptSize
    // Parse up to next 18 characters for pubKeySize
    const scriptPubKeySizeLE = verifyVarInt(rawHex.slice(offset, 18 + offset));
    let scriptPubKeySizeBE;
    let scriptPubKeySizeDec = 0;
    const scriptPubKeySizeSize = scriptPubKeySizeLE.length;
    const scriptSizeHelperRes = scriptSizeLEToBEDec(scriptPubKeySizeLE);
    scriptPubKeySizeBE = scriptSizeHelperRes.scriptSizeBE;
    scriptPubKeySizeDec = scriptSizeHelperRes.scriptSizeDec;

    parsedRawHex.push({
      rawHex: rawHex.slice(offset, offset + scriptPubKeySizeSize),
      item: {
        title: "PubKeySize (output " + i + ")",
        type: TxTextSectionType.outputPubKeySize,
        value:
          scriptPubKeySizeLE +
          " hex | " +
          scriptPubKeySizeDec +
          " bytes" +
          " | " +
          scriptPubKeySizeDec * 2 +
          " chars",
        description:
          "The ScriptPubKeySize field dictates the length of the upcoming ScriptPubKey / LockScript. Like most items of varying size, The ScriptPubKeySize is formatted according to Bitcoin VarInt rules: \n This length is recorded in hex & must be converted to decimal to correctly count upcoming chars.",
        bigEndian: scriptPubKeySizeBE,
        decimal: scriptPubKeySizeDec,
        asset: "imageURL",
      },
    });
    offset += scriptPubKeySizeSize;

    // PubKeyScript included in output
    const pubKeyScript = rawHex.slice(offset, scriptPubKeySizeDec * 2 + offset);
    const isKnownScript = parseOutputForKnownScript(pubKeyScript);
    let pubKeyScriptCoverage = 0;
    const firstOP = getOpcodeByHex(
      pubKeyScript.slice(pubKeyScriptCoverage, pubKeyScriptCoverage + 2)
    )!;

    // Start of script parse
    // Very first character is the entire script
    parsedRawHex.push({
      rawHex: rawHex.slice(offset, offset + 1),
      item: {
        title: "ScriptPubKey (output " + i + ")",
        value: pubKeyScript,
        type: TxTextSectionType.outputPubKeyScript,
        description:
          "The ScriptPubKey, also known as the LockScript, is what’s used to cryptographically assign ownership for a defined amount of Bitcoin.  Commonly, but not always, the SigScript/UnlockScript is one of the handful of standard scripts. \n It appears that this particular SigScript is part of a " +
            isKnownScript ===
          KnownScript.NONE
            ? ""
            : KnownScript + "  transaction",
        knownScript: isKnownScript,
      },
    });
    offset += 1;
    // Second character is the first byte
    // TODO - below for completing segwit version of a public key
    if (
      pubKeyScript.slice(pubKeyScriptCoverage, pubKeyScriptCoverage + 2) ===
      "00"
    ) {
      //console.log("found 0x00, segwit version 1")
      parsedRawHex.push({
        rawHex: rawHex.slice(offset, offset + 1),
        item: {
          title: SegWitVersionTitle.SEGWIT,
          value:
            pubKeyScript.slice(pubKeyScriptCoverage, pubKeyScriptCoverage + 2) +
            " hex | " +
            firstOP.number +
            " opcode",
          type: TxTextSectionType.segwitVersion,
          description: SegWitVersionDescription.SEGWIT,
          knownScript: isKnownScript,
        },
      });
    } else if (
      pubKeyScript.slice(pubKeyScriptCoverage, pubKeyScriptCoverage + 2) ===
      "51"
    ) {
      parsedRawHex.push({
        rawHex: rawHex.slice(offset, offset + 1),
        item: {
          title: SegWitVersionTitle.TAPROOT,
          value:
            pubKeyScript.slice(pubKeyScriptCoverage, pubKeyScriptCoverage + 2) +
            " hex | " +
            firstOP.number +
            " opcode",
          type: TxTextSectionType.segwitVersion,
          description: SegWitVersionDescription.TAPROOT,
          knownScript: isKnownScript,
        },
      });
      //console.log("passes taproot")
    } else {
      parsedRawHex.push({
        rawHex: rawHex.slice(offset, offset + 1),
        item: {
          title: firstOP.name,
          value:
            pubKeyScript.slice(pubKeyScriptCoverage, pubKeyScriptCoverage + 2) +
            " hex | " +
            firstOP.number +
            " opcode",
          type: TxTextSectionType.opCode,
          description: firstOP.description,
          knownScript: isKnownScript,
        },
      });
    }
    offset += 1;
    //console.log("passed until right before for loop")
    // While loop that continues until all pubKeyScript has been parsed
    while (pubKeyScriptCoverage < scriptPubKeySizeDec * 2) {
      let op = getOpcodeByHex(
        pubKeyScript.slice(pubKeyScriptCoverage, pubKeyScriptCoverage + 2)
      )!;
      if (pubKeyScriptCoverage < 2) {
        // first loop through, use firstOP
        // Need to check if first byte is
        if (firstOP.number < commonPushOPMax) {
          // first op is a data op & already pushed, only need to parse pushed data
          const parsedData = parseOutputPubKeyScriptPushedData(
            pubKeyScript.slice(
              pubKeyScriptCoverage + 2,
              pubKeyScriptCoverage + 2 + firstOP.number * 2
            ),
            firstOP.number
          );
          if (
            pubKeyScript.slice(
              pubKeyScriptCoverage,
              pubKeyScriptCoverage + 2
            ) != "00" &&
            pubKeyScript.slice(
              pubKeyScriptCoverage,
              pubKeyScriptCoverage + 2
            ) != "51"
          ) {
            // first op is a data push op, following data
            parsedRawHex.push({
              rawHex: pubKeyScript.slice(
                pubKeyScriptCoverage + 2,
                pubKeyScriptCoverage + 2 + firstOP.number * 2
              ),
              item: {
                title: parsedData.pushedDataTitle,
                value: pubKeyScript.slice(
                  pubKeyScriptCoverage + 2,
                  pubKeyScriptCoverage + 2 + firstOP.number * 2
                ),
                type: TxTextSectionType.pushedData,
                description: parsedData.pushedDataDescription,
                asset: "imageURL",
              },
            });
          }
          pubKeyScriptCoverage += 2 + firstOP.number * 2;
        } else {
          // first op is a common op, already pushed
          pubKeyScriptCoverage += 2;
        }
      } else {
        // next n loops
        if (op.number < 88) {
          // op is a data op, need to push both data op & data
          const dataLengthDec = op.number;
          const dataLengthChars = dataLengthDec * 2;
          // push data op
          parsedRawHex.push({
            rawHex: pubKeyScript.slice(
              pubKeyScriptCoverage,
              pubKeyScriptCoverage + 2
            ),
            item: {
              title: "Upcoming Data Size (" + op.name + ")",
              value:
                pubKeyScript.slice(
                  pubKeyScriptCoverage,
                  pubKeyScriptCoverage + 2
                ) +
                " hex | " +
                op.number +
                " bytes" +
                " | " +
                op.number * 2 +
                " chars",
              type: TxTextSectionType.opCode,
              description:
                "Before pushing data to the stack it’s required that explicitly defined its length; this is done using a one or more data push ops. Much like VarInt, there are specific rules tha must be adhered to: \n This length is recorded in hex & must be converted to decimal to correctly count upcoming chars.",
              asset: "imageURL",
            },
          });
          // push data
          const parsedData = parseOutputPubKeyScriptPushedData(
            pubKeyScript.slice(
              pubKeyScriptCoverage + 2,
              pubKeyScriptCoverage + 2 + op.number * 2
            ),
            firstOP.number
          );
          parsedRawHex.push({
            rawHex: pubKeyScript.slice(
              pubKeyScriptCoverage + 2,
              pubKeyScriptCoverage + 2 + op.number * 2
            ),
            item: {
              title: parsedData.pushedDataTitle,
              value: pubKeyScript.slice(
                pubKeyScriptCoverage + 2,
                pubKeyScriptCoverage + 2 + op.number * 2
              ),
              type: TxTextSectionType.pushedData,
              description: parsedData.pushedDataDescription,
              asset: "imageURL",
            },
          });
          pubKeyScriptCoverage += 2 + op.number * 2;
        } else {
          // op is a common op
          parsedRawHex.push({
            rawHex: pubKeyScript.slice(
              pubKeyScriptCoverage,
              pubKeyScriptCoverage + 2
            ),
            item: {
              title: op.name,
              value:
                pubKeyScript.slice(offset, offset + 2) +
                " hex | " +
                op.number +
                " opcode",
              type: TxTextSectionType.opCode,
              description: op.description,
              knownScript: isKnownScript,
            },
          });
          pubKeyScriptCoverage += 2;
        }
      }
    }

    offset += scriptPubKeySizeDec * 2 - 2;
    knownScripts.push(isKnownScript);

    outputs.push({
      amount: amountDec,
      pubKeySize: scriptPubKeySizeLE,
      pubKeyScript: pubKeyScript,
      knownScript: isKnownScript,
    });
  }

  //console.log("should include all raw hex up to public key: " + rawHex);
  // Witness
  // If isSegWit, extract witness data
  if (txType === TxType.SEGWIT) {
    for (let i = 0; i < inputCount; i++) {
      // Extract witness script element count using VarInt
      const witnessNumOfElementsLE = verifyVarInt(rawHex.slice(0 + offset, 18 + offset));
      let witnessNumOfElementsBE = "";
      let witnessNumOfElementsCount = 0;
      const witnessNumOfElementsCountSize = witnessNumOfElementsLE.length;
      const witnessNumSizeHelperRes = scriptSizeLEToBEDec(witnessNumOfElementsLE);
      witnessNumOfElementsBE = witnessNumSizeHelperRes.scriptSizeBE;
      witnessNumOfElementsCount = witnessNumSizeHelperRes.scriptSizeDec;

      let itemsPushedToParsedRawHexSinceStartOfWitness = 0;
      let offsetAtStart = offset;
      let offsetSinceStartOfWitness = 0;
      parsedRawHex.push({
        rawHex: rawHex.slice(
          offset + 1,
          witnessNumOfElementsCountSize + offset
        ),
        item: {
          title: "Witness Element Count (witness " + i + ")",
          value: witnessNumOfElementsLE,
          description:
            "Every Witness consists of an element count & an array of tuples that include the size(varint) of the upcoming element & the actual value / element (data or op_code) itself. \n This witness element count tells us how many items are in the upcoming witness script.",
          asset: "imageURL",
          type: TxTextSectionType.witnessSize,
        },
      });
      itemsPushedToParsedRawHexSinceStartOfWitness += 1;
      offsetSinceStartOfWitness += witnessNumOfElementsCountSize;
      offset += witnessNumOfElementsCountSize;
      const witnessElements: TxWitnessElement[] = [];
      for (let j = 0; j < witnessNumOfElementsCount; j++) {
        // Element Size
        const elementSizeLE = verifyVarInt(rawHex.slice(0 + offset, 18 + offset));
        let elementSizeBE;
        let elementSizeDec = 0;
        const elementSizeSize = elementSizeLE.length;
        const elementSizeHelperRes = scriptSizeLEToBEDec(elementSizeLE);
        elementSizeBE = elementSizeHelperRes.scriptSizeBE;
        elementSizeDec = elementSizeHelperRes.scriptSizeDec;

        parsedRawHex.push({
          rawHex: rawHex.slice(offset, elementSizeSize + offset),
          item: {
            title:
              "Witness Element Size (witness " +
              i +
              ", element " +
              j +
              " size)",
            value:
              elementSizeBE +
              " hex | " +
              elementSizeDec +
              " bytes" +
              " | " +
              elementSizeDec * 2 +
              " chars",
            description:
              "Before every item in the Witness script, we first need to record the size of the upcoming item. As usual, this means using the standard VarInt rules: \n This witness element count tells us how many items are in the upcoming witness script.",
            type: TxTextSectionType.witnessElementSize,
          },
        });
        itemsPushedToParsedRawHexSinceStartOfWitness += 1;
        offset += elementSizeSize;
        offsetSinceStartOfWitness += elementSizeSize;
        // Element Value
        const elementValue = rawHex.slice(offset, elementSizeDec * 2 + offset);
        // P sure the below should be ran once per witness script not once per element in witness script
        const isKnownScript = parseWitnessForKnownScript(
          inputs[i],
          witnessNumOfElementsCount,
          witnessElements
        );
        const pushedData = parseWitnessElementPushedData(
          rawHex.slice(offset, elementSizeDec * 2 + offset)
        );
        knownScripts.push(isKnownScript);
        //console.log("elementValue: " + elementValue)
        if (elementValue != "") {
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
          itemsPushedToParsedRawHexSinceStartOfWitness += 1;
        }
        offset += elementSizeDec * 2;
        offsetSinceStartOfWitness += elementSizeDec * 2;
        //console.log("witness element: " + elementValue)
        witnessElements.push({
          elementSize: witnessNumOfElementsBE,
          elementValue: elementValue,
        });
      }
      witnesses.push({
        witnessNumElements: witnessNumOfElementsCount,
        witnessElements: witnessElements,
        knownScript: parseWitnessForKnownScript(
          inputs[i],
          witnessNumOfElementsCount,
          witnessElements
        ),
      });
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
            description:
              "Each Witness represents a tuple of element sizes & element items (either pushed data or op_code); in aggregate, these tuples make up what can be considered the Witness Script. This is what unlocks the Input with the same index. \n Commonly, but not always, the Witness Script is one of the handful of standard scripts. \n It appears that this particular Witness Script is part of a: " +
              parseWitnessForKnownScript(
                inputs[i],
                witnessNumOfElementsCount,
                witnessElements
              ) +
              " script.",
            knownScript: parseWitnessForKnownScript(
              inputs[i],
              witnessNumOfElementsCount,
              witnessElements
            ),
          },
        }
      );
    }
    //console.log(JSON.stringify(witnesses));
  }
  // Locktime
  const locktimeLE = rawHex.slice(offset, offset + 8);
  locktimeJSON = locktimeLE;
  const locktimeBE = leToBe8(locktimeLE);
  const locktimeDec = parseInt(locktimeBE, 16);
  parsedRawHex.push({
    rawHex: rawHex.slice(offset, offset + 8),
    item: {
      title: "Locktime",
      type: TxTextSectionType.lockTimeValue,
      value: locktimeLE + " hex | " + locktimeDec + " dec",
      description:
        "Locktime sets the earliest time an entire transaction can be mined in to a block; it’s the last field in any type of transaction. The sequence is stored as an 4-byte | 16-char in Little Endian format & the value itself tells us whether the timelock is block-height, time based or set to mine immediately (00000000):",
    },
  });
  offset += 8;

  // console.log("hexResponse rawHex: " + rawHex);
  // console.log("hexResponse txType: " + txType);
  // console.log("hexResponse numInputs: " + numInputs);
  // console.log("hexResponse numOutputs: " + numOutputs);
  // console.log("hexResponse totalBitcoin: " + totalBitcoin);
  // console.log("hexResponse knownScripts: " + knownScripts);
  // console.log("hexResponse parsedRawHex: " + parsedRawHex);

  console.log("jsonResponse totalBitcoin: " + totalBitcoin);
  console.log("jsonResponse version: " + versionJSON);
  console.log("jsonResponse locktime: " + locktimeJSON);
  console.log("jsonResponse num inputs: " + numInputs);
  console.log("jsonResponse num outputs: " + numOutputs);
  console.log("jsonResponse inputs: " + JSON.stringify(inputs));
  console.log("jsonResponse outputs: " + JSON.stringify(outputs));
  console.log("jsonResponse witnesses: " + JSON.stringify(witnesses));
  // for(let i = 0; i < parsedRawHex.length; i++) {
  //   console.log(parsedRawHex[i]);
  // }
  createSignatureMessage(0, versionJSON, inputs, outputs, locktimeJSON, "01");

  return {
    hexResponse: {
      rawHex: rawHex,
      txType: txType,
      numInputs: numInputs,
      numOutputs: numOutputs,
      totalBitcoin: totalBitcoin,
      knownScripts: knownScripts,
      parsedRawHex: parsedRawHex,
    },
    jsonResponse: {
      totalBitcoin: totalBitcoin,
      version: versionJSON,
      locktime: locktimeJSON,
      numInputs: numInputs,
      numOutputs: numOutputs,
      inputs: inputs,
      outputs: outputs,
      witnesses: witnesses,
    },
  };
}

// Create hashed message h(m) = z
// Only SIGHASH_ALL is supported for now
function createSignatureMessage(inputIndex: number, version: string, inputs: TxInput[], outputs: TxOutput[], locktime: string, sighashFlag: string) : string {
  let prehashedMessage = "";
  prehashedMessage += version;
  for(let i = 0; i < inputs.length; i++) {
    console.log("input in createSignatureMessage: " + inputs[i]);
    if(i == inputIndex) {
      prehashedMessage += inputs[i].txid;
      prehashedMessage += inputs[i].vout;
      prehashedMessage += inputs[i].sequence;
    } else {
      prehashedMessage += inputs[i].txid;
      prehashedMessage += inputs[i].vout;
      prehashedMessage += "00";
      prehashedMessage += inputs[i].sequence;
    }
  }
  console.log("prehashedMessage: " + prehashedMessage);
  //const hashedMessage = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(prehashedMessage));
  return "hi;"
}

// Fetch pubkeyscriptsize & pubkeyscript for input being verified
function fetchSignedOutputItems(txidBE: string, vout: number) : {pubKeyScriptSize: string, pubKeyScript: string} {

  return {pubKeyScriptSize: "00", pubKeyScript: "00"};
}


const TEST_DESERIALIZE = async (
  userInput: string
): Promise<TransactionFeResponse> => {
  try {

    // Assert that it's at least likely to be one a txid or hex
    //const userInput ="f8622f0427425f769069e36f7fdfbde2a9d51ad44b6eef51435f24236de05239";

    if (userInput.length != 64 && userInput.length < 256) {
      throw errInvalidInput;
    }
    //let rawTransaction;
    let parseResponse;
    // User submitted a TXID -> fetch -> store
    if (userInput.length == 64) {
      // Fetch hex of transaction
      const fetched = await fetchTXID(userInput);
      const parseResponse = parseRawHex(fetched);
      return parseResponse;
    } else {
      // Parse/Validate hex of transaction
      const parseResponse = parseRawHex(userInput);
      return parseResponse;
    }
    throw errInvalidInput;
  } catch (error: any) {
    console.error(`Error: Something Went Wrong`);
    throw new Error(error);
  }
};

export default TEST_DESERIALIZE;
