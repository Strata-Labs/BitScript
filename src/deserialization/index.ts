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
  VarInt,
  verifyVarInt,
  leToBe4,
  leToBe8,
  leToBe16,
  leToBe64,
  KnownScript,
  parseInputForKnownScript,
  parseOutputForKnownScript,
  parseWitnessForKnownScript,
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
} from "./overlayValues";
import { TxTextSectionType } from "../comp/Transactions/Helper";

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

async function fetchTXID(txid: string): Promise<string> {
  // Actual API call here
  const response = await axios.get(`https://mempool.space/api/tx/${txid}/hex`);
  return response.data;
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
  const inputCountVarInt = verifyVarInt(rawHex.slice(12, 12 + 18));
  const inputCountVarIntSize = inputCountVarInt.length;
  const inputCount = parseInt(inputCountVarInt, 16);
  numInputs = inputCount;
  parsedRawHex.push({
    rawHex: rawHex.slice(12, 12 + inputCountVarIntSize),
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
        title: "TXID (input " + (i + 1) + ")",
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
        title: "VOUT (input " + (i + 1) + ")",
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
    if (scriptSigSizeSize === 2) {
      scriptSigSizeBE = scriptSigSizeLE;
      scriptSigSizeDec = parseInt(scriptSigSizeBE, 16);
    } else if (scriptSigSizeSize === 6) {
      scriptSigSizeBE = leToBe4(scriptSigSizeLE.slice(2, 6));
      scriptSigSizeDec = parseInt(scriptSigSizeBE, 16);
    } else if (scriptSigSizeSize === 10) {
      scriptSigSizeBE = leToBe8(scriptSigSizeLE.slice(2, 10));
      scriptSigSizeDec = parseInt(scriptSigSizeBE, 16);
    } else if (scriptSigSizeSize === 18) {
      scriptSigSizeBE = leToBe16(scriptSigSizeLE.slice(2, 18));
      scriptSigSizeDec = parseInt(scriptSigSizeBE, 16);
    }
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
    let scriptSig = "";
    let isSegWitLocal = false;
    // Check if legacy | segwit
    if (scriptSigSizeLE === "00") {
      // Moved to witness section
      isSegWitLocal = true;
    } else {
      scriptSig = rawHex.slice(offset, scriptSigSizeDec * 2 + offset);
      const isKnownScript = parseInputForKnownScript(scriptSig);
      knownScripts.push(isKnownScript);
      parsedRawHex.push({
        rawHex: scriptSig,
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
      offset += scriptSigSizeDec * 2;
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
      txid: txidBE,
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
    if (scriptPubKeySizeSize === 2) {
      scriptPubKeySizeBE = scriptPubKeySizeLE;
      scriptPubKeySizeDec = parseInt(scriptPubKeySizeBE, 16);
    } else if (scriptPubKeySizeSize === 6) {
      scriptPubKeySizeBE = leToBe4(scriptPubKeySizeLE.slice(2, 6));
      scriptPubKeySizeDec = parseInt(scriptPubKeySizeBE, 16);
    } else if (scriptPubKeySizeSize === 10) {
      scriptPubKeySizeBE = leToBe8(scriptPubKeySizeLE.slice(2, 10));
      scriptPubKeySizeDec = parseInt(scriptPubKeySizeBE, 16);
    } else if (scriptPubKeySizeSize === 18) {
      scriptPubKeySizeBE = leToBe16(scriptPubKeySizeLE.slice(2, 18));
      scriptPubKeySizeDec = parseInt(scriptPubKeySizeBE, 16);
    }
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
    // PubKeyScript
    // Parse up to next scriptPubKeySizeDec*2 characters for pubKeyScript
    const pubKeyScript = rawHex.slice(offset, scriptPubKeySizeDec * 2 + offset);
    const isKnownScript = parseInputForKnownScript(pubKeyScript);
    knownScripts.push(isKnownScript);
    parsedRawHex.push({
      rawHex: pubKeyScript,
      item: {
        title: "PubKeyScript (output " + i + ")",
        value: pubKeyScript,
        description:
          "The ScriptPubKey, also known as the LockScript, is what’s used to cryptographically assign ownership for a defined amount of Bitcoin.  Commonly, but not always, the SigScript/UnlockScript is one of the handful of standard scripts. \n It appears that this particular SigScript is part of a " +
            isKnownScript ===
          KnownScript.NONE
            ? ""
            : KnownScript + "  transaction",
        KnownScript: isKnownScript,
        type: TxTextSectionType.outputPubKeyScript,
      },
    });
    offset += scriptPubKeySizeDec * 2;
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
      const witnessNumOfElementsLE = verifyVarInt(
        rawHex.slice(0 + offset, 18 + offset)
      );
      let witnessNumOfElementsBE = "";
      const witnessNumOfElementsCountSize = witnessNumOfElementsLE.length;
      let witnessNumOfElementsCount = 0;
      //const witnessNumOfElementsDec = parseInt(witnessNumOfElementsVarInt, 16);
      if (witnessNumOfElementsCountSize === 2) {
        witnessNumOfElementsBE = witnessNumOfElementsLE;
        witnessNumOfElementsCount = parseInt(witnessNumOfElementsBE, 16);
      } else if (witnessNumOfElementsCountSize === 6) {
        witnessNumOfElementsBE = leToBe4(witnessNumOfElementsLE.slice(2, 6));
        witnessNumOfElementsCount = parseInt(witnessNumOfElementsBE, 16);
      } else if (witnessNumOfElementsCountSize === 10) {
        witnessNumOfElementsBE = leToBe8(witnessNumOfElementsLE.slice(2, 10));
        witnessNumOfElementsCount = parseInt(witnessNumOfElementsBE, 16);
      } else if (witnessNumOfElementsCountSize === 18) {
        witnessNumOfElementsBE = leToBe16(witnessNumOfElementsLE.slice(2, 18));
        witnessNumOfElementsCount = parseInt(witnessNumOfElementsBE, 16);
      }
      parsedRawHex.push({
        rawHex: rawHex.slice(offset, witnessNumOfElementsCountSize + offset),
        item: {
          title: "Witness Element Count (witness " + i + ")",
          value: witnessNumOfElementsLE,
          description:
            "Every Witness consists of an element count & an array of tuples that include the size(varint) of the upcoming element & the actual value / element (data or op_code) itself. \n This witness element count tells us how many items are in the upcoming witness script.",
          asset: "imageURL",
          type: TxTextSectionType.witnessSize,
        },
      });
      offset += witnessNumOfElementsCountSize;
      const witnessElements: TxWitnessElement[] = [];
      for (let j = 0; j < witnessNumOfElementsCount; j++) {
        // Element Size
        const elementSizeLE = verifyVarInt(
          rawHex.slice(0 + offset, 18 + offset)
        );
        let elementSizeBE;
        const elementSizeSize = elementSizeLE.length;
        let elementSizeDec = 0;
        if (elementSizeSize === 2) {
          elementSizeBE = elementSizeLE;
          elementSizeDec = parseInt(elementSizeBE, 16);
        } else if (elementSizeSize === 6) {
          elementSizeBE = leToBe4(elementSizeLE.slice(2, 6));
          elementSizeDec = parseInt(elementSizeBE, 16);
        } else if (elementSizeSize === 10) {
          elementSizeBE = leToBe8(witnessNumOfElementsLE.slice(2, 10));
          elementSizeDec = parseInt(elementSizeBE, 16);
        } else if (elementSizeSize === 18) {
          elementSizeBE = leToBe16(elementSizeLE.slice(2, 18));
          elementSizeDec = parseInt(elementSizeBE, 16);
        }
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
        offset += elementSizeSize;
        //console.log("witness elements sizes: " + elementSizeLE)
        //console.log("witness elements size dec: " + elementSizeDec)
        // Element Value
        const elementValue = rawHex.slice(offset, elementSizeDec * 2 + offset);
        const isKnownScript = parseWitnessForKnownScript(
          inputs[i],
          witnessNumOfElementsCount,
          witnessElements
        );
        knownScripts.push(isKnownScript);
        parsedRawHex.push({
          rawHex: rawHex.slice(offset, elementSizeDec * 2 + offset),
          item: {
            title:
              "Witness Element Value (witness " +
              i +
              ", element " +
              j +
              " value)",
            value: elementValue,
            type: TxTextSectionType.witnessElementValue,
            description:
              "The ScriptPubKey, also known as the LockScript, is what’s used to cryptographically assign ownership for a defined amount of Bitcoin.  Commonly, but not always, the SigScript/UnlockScript is one of the handful of standard scripts. \n It appears that this particular WitnessScript is part of a " +
                isKnownScript ===
              KnownScript.NONE
                ? ""
                : KnownScript + "  transaction",
            KnownScript: isKnownScript,
          },
        });
        offset += elementSizeDec * 2;
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

  // console.log("jsonResponse totalBitcoin: " + totalBitcoin);
  // console.log("jsonResponse version: " + versionJSON);
  // console.log("jsonResponse locktime: " + locktimeJSON);
  // console.log("jsonResponse num inputs: " + numInputs);
  // console.log("jsonResponse num outputs: " + numOutputs);
  // console.log("jsonResponse inputs: " + inputs);
  // console.log("jsonResponse outputs: " + outputs);
  // console.log("jsonResponse witnesses: " + witnesses);
  // for(let i = 0; i < parsedRawHex.length; i++) {
  //   console.log(parsedRawHex[i]);
  // }

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

const TEST_DESERIALIZE = async (
  userInput: string
): Promise<TransactionFeResponse> => {
  try {
    // SegWit/NotTapRoot -> 1 input | 5 outputs | 1 witness
    // f8622f0427425f769069e36f7fdfbde2a9d51ad44b6eef51435f24236de05239
    // SegWit -> 3 inputs | 2 outputs | 1 witness
    // b55b1886d1cecf733a12bcdcc8ef413f158d84eb4f75052abde2469fa3a004cd
    // de0465c042cc00b46983c13e884f9a54e06d6f5ef3baf4c73238ed0ed70905ab
    // SegWit/Taproot ->
    // f73ce97a5b8b1a2c23d97b3e6aaf3d0af52bf94c28162f1a2f5d6bfb3c019a42
    // e0b46bf5838ed82946aa2d55986791885f26c890a1e9f341f584a3f1b4cb01da

    // Assert that it's at least likely to be one a txid or hex
    // High-level error check for string length
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
    console.log("final parsed response: " + parseResponse);
  } catch (error: any) {
    console.error(`Error: Something Went Wrong`);
    throw new Error(error);
  }
};

export default TEST_DESERIALIZE;
