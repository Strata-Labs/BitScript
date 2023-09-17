import axios from "axios";
import { 
  errInvalidInput, 
  errStringLengthInLE8, errStringLengthInLE16, errStringLengthInLE64, 
  errIncompleteVarIntFC, errIncompleteVarIntFD, errIncompleteVarIntFE, errIncompleteVarIntFF, 
  errInvalidVersionEndian, errNonstandardVersion
} from "./errors";
import { 
  VarInt,
  verifyVarInt,
  leToBe4, leToBe8, leToBe16, leToBe64,
  KnownScript, 
  parseInputForKnownScript, parseOutputForKnownScript, parseWitnessForKnownScript
} from "./helpers";
import { 
  TxInput, TxOutput, 
  TxWitness, TxWitnessElement,
  TxData, MinTxData, 
  TxType,
  HexResponse, TransactionItem,
  VersionItem, CountItem,
  BaseTransactionItem,
  JSONResponse
} from "./model";
import {
  versionDescription, VersionTitle, VersionValueType, VersionBigEndian,
  CountDescription, CountTitle
} from "./overlayValues";

// User arrives & has three options: paste TXID, paste raw hex or load example
// Paste TXID -> FetchTXID() -> ParseRawHex()
// Paste raw hex & load example -> ParseRawHex()

// ParseRawHex() -> Error | {HexResponse | JSONResponse}
// The response of parseRawHex should include *everything* needed client-side

// interface MarkerFlagItem extends BaseTransactionItem {
//   bigEndian: string;
// }


// Missing functions
// getTotalBitcoin()
function parseRawHex(rawHex: string): {hexResponse: HexResponse, jsonResponse: JSONResponse} {


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
    if (version.slice(0, 2) === "00") {
      throw errInvalidVersionEndian;
    }
    if (parseInt(version) >= 3) {
      throw errNonstandardVersion;
    }
  } else if (versionLE === "01000000") {
    parsedRawHex.push({
      rawHex: versionLE,
      item: {
        title: VersionTitle.V1,
        value: VersionValueType.V1,
        description: versionDescription,
        bigEndian: VersionBigEndian.V1
      }
    });
  } else {
    parsedRawHex.push({
      rawHex: versionLE,
      item: {
        title: VersionTitle.V2,
        value: VersionValueType.V2,
        description: versionDescription,
        bigEndian: VersionBigEndian.V2
      }
    });
  }
  offset += 8;

  // Check if legacy or segwit
  if (rawHex.slice(8,12) === "0001") {
    txType = TxType.SEGWIT;
    parsedRawHex.push({
      rawHex: rawHex.slice(8,12),
      item: {
        title: "Marker",
        value: "00",
        description: "This is a zero byte figure that indicates that this transaction is a segregated witness (SegWit) transaction that contains a witness section.",
      }
    });
    parsedRawHex.push({
      rawHex: rawHex.slice(12,16),
      item: {
        title: "Flag",
        value: "01",
        description: "The Flag, stored as 1-byte | 2-hex value, is an additional indicator meant for SegWit functionality. Currently only the value 0x01 is standard & relayed; however, this field could be used to flag for different SegWit alternatives.",
      }
    });
    offset += 4;
  } else {
    txType = TxType.LEGACY;
  }

  // Inputs
  // Input Count - extract using VarInt
  const inputCountVarInt = verifyVarInt(rawHex.slice(12, 12+18));
  const inputCountVarIntSize = inputCountVarInt.length;
  const inputCount = parseInt(inputCountVarInt, 16);
  numInputs = inputCount;
  parsedRawHex.push({
    rawHex: rawHex.slice(12, 12+inputCountVarIntSize),
    item: {
      title: CountTitle.INPUT,
      value: inputCount,
      description: CountDescription.INPUT,
      asset: "imageURL"
    }
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
        description: "This is the transaction ID of the transaction that contains the output that is being redeemed by this input. This is a 32-byte | 64-hex value. \n This means you cannot copy/paste it as is - you first need to convert it from Little Endian to Big Endian. Click the link indicator above to open this transaction in a different tab.",
        bigEndian: txidBE,
        previousTransactionURL: "https://bitscript-git-stage-setteam.vercel.app/transactions?transaction=" + txidBE
      }
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
        description: "The VOUT of an input specifies the index of the UTXO unlocked; recall that the field before this is a TXID that points to a mined transaction which may contain multiple inputs. /n The TXID is stored as an 4-byte | 16-char in Little Endian format.",
        bigEndian: voutBE,
        decimal: parseInt(voutBE, 16),
      }
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
      scriptSigSizeBE = leToBe4(scriptSigSizeLE.slice(2,6));
      scriptSigSizeDec = parseInt(scriptSigSizeBE, 16);
    } else if (scriptSigSizeSize === 10) {
      scriptSigSizeBE = leToBe8(scriptSigSizeLE.slice(2,10));
      scriptSigSizeDec = parseInt(scriptSigSizeBE, 16);
    } else if (scriptSigSizeSize === 18) {
      scriptSigSizeBE = leToBe16(scriptSigSizeLE.slice(2,18));
      scriptSigSizeDec = parseInt(scriptSigSizeBE, 16);
    }
    parsedRawHex.push({
      rawHex: rawHex.slice(offset, scriptSigSizeSize + offset),
      item: {
        title: "SigScriptSize (input " + i + ")",
        value: scriptSigSizeLE + " hex | " + scriptSigSizeDec + " bytes" + " | " + scriptSigSizeDec*2 + " chars",
        description: "The SigScriptSize is the size of the unlocking script (sigScript) in bytes. This is a variable integer, meaning that the size of the integer itself can vary. \n The SigScriptSize is stored as a variable integer, which means that the size of the integer itself can vary. \n The SigScriptSize is stored as a variable integer, which means that the size of the integer itself can vary. \n The SigScriptSize is stored as a variable integer, which means that the size of the integer itself can vary. \n The SigScriptSize is stored as a variable integer, which means that the size of the integer itself can vary. \n The SigScriptSize is stored as a variable integer, which means that the size of the integer itself can vary. \n The SigScriptSize is stored as a variable integer, which means that the size of the integer itself can vary. \n The SigScriptSize is stored as a variable integer, which means that the size of the integer itself can vary.",
        bigEndian: scriptSigSizeBE,
        decimal: scriptSigSizeDec,
        asset: "imageURL"
      }
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
          description: "The ScriptSig, also known as the UnlockScript, is what’s used to cryptographically verify that we own the UTXO fetched; by proving ownership, we’re now allowed to spend the BTC  stored in the input. Commonly, but not always, the SigScript/UnlockScript is one of the handful of standard scripts.\n It appears that this particular SigScript is part of a "+ isKnownScript === KnownScript.NONE ? "" : KnownScript + " transaction.",
          knownScript: isKnownScript,
        }
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
        description: "A timelock for a specific input. Used very rarely with  op_checksequenceverify, most commonly left unaltered / set to mine immediately. \n The sequence is stored as an 4-byte | 16-char in Little Endian format & the value itself tells us whether the timelock is block-height, time based or set to mine immediately (ffffffff):"
      }
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
  const outputCountVarInt = verifyVarInt(rawHex.slice(offset, offset+18));
  const outputCountVarIntSize = outputCountVarInt.length;
  const outputCount = parseInt(outputCountVarInt, 16);
  numOutputs = outputCount;
  parsedRawHex.push({
    rawHex: rawHex.slice(12, 12+outputCountVarIntSize),
    item: {
      title: CountTitle.OUTPUT,
      value: outputCount,
      description: CountDescription.OUTPUT,
      asset: "imageURL"
    }
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
        description: "The amount of Bitcoin, described in integer Satoshis (1/100,000,000 of a Bitcoin) that is being sent in this output. /n This amount value is stored as an 8-byte | 16-char in Little Endian format. ",
        bigEndian: amountBE,
        decimal: amountDec,
      }
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
      scriptPubKeySizeBE = leToBe4(scriptPubKeySizeLE.slice(2,6));
      scriptPubKeySizeDec = parseInt(scriptPubKeySizeBE, 16);
    } else if (scriptPubKeySizeSize === 10) {
      scriptPubKeySizeBE = leToBe8(scriptPubKeySizeLE.slice(2,10));
      scriptPubKeySizeDec = parseInt(scriptPubKeySizeBE, 16);
    } else if (scriptPubKeySizeSize === 18) {
      scriptPubKeySizeBE = leToBe16(scriptPubKeySizeLE.slice(2,18));
      scriptPubKeySizeDec = parseInt(scriptPubKeySizeBE, 16);
    }
    parsedRawHex.push({
      rawHex: rawHex.slice(offset, offset+scriptPubKeySizeSize),
      item: {
        title: "PubKeySize (output " + i + ")",
        value: scriptPubKeySizeLE + " hex | " + scriptPubKeySizeDec + " bytes" + " | " + scriptPubKeySizeDec*2 + " chars",
        description: "The ScriptPubKeySize field dictates the length of the upcoming ScriptPubKey / LockScript. Like most items of varying size, The ScriptPubKeySize is formatted according to Bitcoin VarInt rules: \n This length is recorded in hex & must be converted to decimal to correctly count upcoming chars.",
        bigEndian: scriptPubKeySizeBE,
        decimal: scriptPubKeySizeDec,
        asset: "imageURL"
      }
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
        description: "The ScriptPubKey, also known as the LockScript, is what’s used to cryptographically assign ownership for a defined amount of Bitcoin.  Commonly, but not always, the SigScript/UnlockScript is one of the handful of standard scripts. \n It appears that this particular SigScript is part of a "+ isKnownScript === KnownScript.NONE ? "" : KnownScript + "  transaction",
        KnownScript: isKnownScript,
      }
    });
    offset += scriptPubKeySizeDec * 2;
    outputs.push({
      amount: amountDec,
      pubKeySize: scriptPubKeySizeLE,
      pubKeyScript: pubKeyScript,
      knownScript: isKnownScript,
    });
  }

  // Witness
  // If isSegWit, extract witness data
  if (txType === TxType.SEGWIT) {
    for (let i = 0; i < inputCount; i++) {
      // Extract witness script element count using VarInt
      const witnessNumOfElementsLE = verifyVarInt(rawHex.slice(0 + offset, 18 + offset));
      let witnessNumOfElementsBE = "";
      const witnessNumOfElementsCountSize = witnessNumOfElementsLE.length;
      let witnessNumOfElementsCount = 0;
      //const witnessNumOfElementsDec = parseInt(witnessNumOfElementsVarInt, 16);
      if (witnessNumOfElementsCountSize === 2) {
        witnessNumOfElementsBE = witnessNumOfElementsLE;
        witnessNumOfElementsCount = parseInt(witnessNumOfElementsBE, 16);
      } else if (witnessNumOfElementsCountSize === 6) {
        witnessNumOfElementsBE = leToBe4(witnessNumOfElementsLE.slice(2,6));
        witnessNumOfElementsCount = parseInt(witnessNumOfElementsBE, 16);
      } else if (witnessNumOfElementsCountSize === 10) {
        witnessNumOfElementsBE = leToBe8(witnessNumOfElementsLE.slice(2,10));
        witnessNumOfElementsCount = parseInt(witnessNumOfElementsBE, 16);
      } else if (witnessNumOfElementsCountSize === 18) {
        witnessNumOfElementsBE = leToBe16(witnessNumOfElementsLE.slice(2,18));
        witnessNumOfElementsCount = parseInt(witnessNumOfElementsBE, 16);
      }
      parsedRawHex.push({
        rawHex: rawHex.slice(offset, witnessNumOfElementsCountSize + offset),
        item: {
          title: "Witness Element Count (witness " + i + ")",
          value: witnessNumOfElementsLE,
          description: "Every Witness consists of an element count & an array of tuples that include the size(varint) of the upcoming element & the actual value / element (data or op_code) itself. \n This witness element count tells us how many items are in the upcoming witness script.",
          asset: "imageURL",
        }
      });
      offset += witnessNumOfElementsCountSize;
      const witnessElements: TxWitnessElement[] = [];
      for (let j = 0; j < witnessNumOfElementsCount; j++) {
        // Element Size
        const elementSizeLE = verifyVarInt(rawHex.slice(0 + offset, 18 + offset));
        let elementSizeBE;
        const elementSizeSize = elementSizeLE.length;
        let elementSizeDec = 0;
        if (elementSizeSize === 2) {
          elementSizeBE = witnessNumOfElementsLE;
          elementSizeDec = parseInt(elementSizeBE, 16);
        } else if (elementSizeSize === 6) {
          elementSizeBE = leToBe4(witnessNumOfElementsLE.slice(2,6));
          elementSizeDec = parseInt(elementSizeBE, 16);
        } else if (elementSizeSize === 10) {
          elementSizeBE = leToBe8(witnessNumOfElementsLE.slice(2,10));
          elementSizeDec = parseInt(elementSizeBE, 16);
        } else if (elementSizeSize === 18) {
          elementSizeBE = leToBe16(witnessNumOfElementsLE.slice(2,18));
          elementSizeDec = parseInt(elementSizeBE, 16);
        }
        parsedRawHex.push({
          rawHex: rawHex.slice(offset, elementSizeSize + offset),
          item: {
            title: "Witness Element Size (witness " + i + ", element " + j + " size)",
            value: elementSizeBE + " hex | " + elementSizeDec + " bytes" + " | " + elementSizeDec*2 + " chars",
            description: "Before every item in the Witness script, we first need to record the size of the upcoming item. As usual, this means using the standard VarInt rules: \n This witness element count tells us how many items are in the upcoming witness script.",
          }
        });
        offset += elementSizeSize;
        // Element Value
        const elementValue = rawHex.slice(0 + offset, elementSizeDec * 2 + offset);
        const isKnownScript = parseWitnessForKnownScript(inputs[i], witnessNumOfElementsCount, witnessElements);
        knownScripts.push(isKnownScript);
        parsedRawHex.push({
          rawHex: rawHex.slice(offset, elementSizeDec * 2 + offset),
          item: {
            title: "Witness Element Value (witness " + i + ", element " + j + " value)",
            value: elementValue,
            description: "The ScriptPubKey, also known as the LockScript, is what’s used to cryptographically assign ownership for a defined amount of Bitcoin.  Commonly, but not always, the SigScript/UnlockScript is one of the handful of standard scripts. \n It appears that this particular WitnessScript is part of a "+ isKnownScript === KnownScript.NONE ? "" : KnownScript + "  transaction",
            KnownScript: isKnownScript,
          }
        });
        offset += elementSizeDec * 2;
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

    console.log(JSON.stringify(witnesses));
  }

  // Locktime
  const locktimeLE = rawHex.slice(offset, offset + 8);
  locktimeJSON = locktimeLE;
  const locktimeBE = leToBe4(locktimeLE);
  const locktimeDec = parseInt(locktimeBE, 16);
  parsedRawHex.push({
    rawHex: rawHex.slice(offset, offset + 8),
    item: {
      title: "Locktime",
      value: locktimeLE + " hex | " + locktimeDec + " dec",
      description: "Locktime sets the earliest time an entire transaction can be mined in to a block; it’s the last field in any type of transaction. The sequence is stored as an 4-byte | 16-char in Little Endian format & the value itself tells us whether the timelock is block-height, time based or set to mine immediately (00000000):",
    }
  });

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
      witnesses: witnesses
    },
  }
}

//   txID: string;
//   rawHex: string;
//   txType: TxType;
//   numInputs: number;
//   numOutputs: number;
//   totalBitcoin: number;
//   knownScripts: KnownScript[];
//   parsedRawHex: TransactionItem[]; 














async function fetchTXID(txid: string): Promise<string> {
  // Actual API call here
  const response = await axios.get(`https://mempool.space/api/tx/${txid}/hex`);
  return response.data;
}

// Verification
function verifyLegacy(txData: string): {
  inputs: TxInput[];
  outputs: TxOutput[];
  sequence: string;
} {
  // Inputs
  // Extract input count using VarInt
  const inputCountVarInt = verifyVarInt(txData.slice(0, 18));
  const inputCountVarIntSize = inputCountVarInt.length;
  const inputCount = parseInt(inputCountVarInt, 16);
  // Create empty array of Inputs
  const inputs: TxInput[] = [];
  const txDataNoInputCount = txData.slice(inputCountVarIntSize);
  //console.log(txDataNoInputCount);
  // Loop through transaction inputCountVarInt amount of times to extract inputs
  let offset = 0;
  for (let i = 0; i < inputCount; i++) {
    // Parse next 64 characters & change from LE to BE -> TXID
    const txid = leToBe64(txDataNoInputCount.slice(0 + offset, 64 + offset));
    offset += 64;
    // Parse next 8 characters & change from LE to BE -> VOUT
    const vout = leToBe8(txDataNoInputCount.slice(0 + offset, 8 + offset));
    //console.log("after suspected vout");
    offset += 8;
    // Parse up to next 10 characters for sigScriptSize
    const scriptSigSize = verifyVarInt(
      txDataNoInputCount.slice(offset, 18 + offset)
    );
    const scriptSigSizeSize = scriptSigSize.length;
    const scriptSigSizeInt = parseInt(scriptSigSize, 16);
    offset += scriptSigSizeSize;
    let scriptSig = "";
    let isSegWitLocal = false;
    if (scriptSigSize === "00") {
      isSegWitLocal = true;
    } else {
      scriptSig = txDataNoInputCount.slice(
        offset,
        scriptSigSizeInt * 2 + offset
      );
      offset += scriptSigSizeInt * 2;
    }
    const sequence = leToBe8(txDataNoInputCount.slice(0 + offset, 8 + offset));
    offset += 8;

    inputs.push({
      txid: txid,
      vout: vout,
      sigScriptSize: scriptSigSize,
      sigScript: scriptSig,
      sequence: sequence,
      isSegWit: isSegWitLocal,
    });
  }

  // Outputs
  // Extract output count & size using VarInt
  const outputCountVarInt = verifyVarInt(
    txDataNoInputCount.slice(0 + offset, 9 + offset)
  );
  const outputCountVarIntSize = inputCountVarInt.length;
  const outputCount = parseInt(outputCountVarInt, 16);
  offset += outputCountVarIntSize;
  // Create empty array of Outputs
  const outputs: TxOutput[] = [];
  const txDataNoInputsNoOutputcount = txDataNoInputCount.slice(offset);
  // Loop through transaction outputCount amount of times to extract outputs
  for (let i = 0; i < outputCount; i++) {
    // Extract amount of sats being transferred
    const amount = leToBe16(txDataNoInputCount.slice(0 + offset, 16 + offset));
    offset += 16;
    // Parse up to next 18 characters for pubKeySize
    const pubKeySize = verifyVarInt(
      txDataNoInputCount.slice(offset, 18 + offset)
    );
    const pubKeyVarIntSize = pubKeySize.length;
    offset += pubKeyVarIntSize;
    // Parse script
    const pubKeyDecSize = parseInt(pubKeySize, 16);
    //console.log(pubKeyDecSize);
    const pubKeyScript = txDataNoInputCount.slice(
      offset,
      pubKeyDecSize * 2 + offset
    );
    offset += pubKeyDecSize * 2;
    outputs.push({
      amount: parseInt(amount, 16),
      pubKeySize: pubKeySize,
      pubKeyScript: pubKeyScript,
    });
  }
  console.log(inputs);
  console.log(outputs);
  //console.log(txData.slice(-8));
  throw new Error("LEGACY TEMP ");
  // return {
  //   inputs: inputs,
  //   outputs: outputs,
  //   locktime: txData.slice(-8),
  // };
}

function verifySegWit(txData: String): MinTxData {
  // Inputs
  // Extract input count using VarInt

  // idea is to be able to catch the errors inside the try statment and be able to return the data that was able to be parsed so far
  // this way we can show the user what we were able to parse and what we were not able to parse after throwing an error
  const keepTrackOfTxData: MinTxData = {
    inputCount: undefined,
    inputs: [],
    outputCount: undefined,
    outputs: [],
    witnesses: [],
    locktime: undefined,
    error: undefined,
  };

  try {
    const inputCountVarInt = verifyVarInt(txData.slice(0, 18));
    const inputCountVarIntSize = inputCountVarInt.length;
    const inputCount = parseInt(inputCountVarInt, 16);

    // set the input count in the top level data object
    keepTrackOfTxData.inputCount = inputCountVarInt;

    // Create empty array of Inputs
    const inputs: TxInput[] = [];
    const txDataNoInputCount = txData.slice(inputCountVarIntSize);
    //console.log(txDataNoInputCount);
    // Loop through transaction inputCountVarInt amount of times to extract inputs
    let offset = 0;
    for (let i = 0; i < inputCount; i++) {
      // Parse next 64 characters & change from LE to BE -> TXID
      const txid = leToBe64(txDataNoInputCount.slice(0 + offset, 64 + offset));
      offset += 64;
      // Parse next 8 characters & change from LE to BE -> VOUT
      const vout = leToBe8(txDataNoInputCount.slice(0 + offset, 8 + offset));
      //console.log("after suspected vout");
      offset += 8;
      // Parse up to next 10 characters for sigScriptSize
      const scriptSigSize = verifyVarInt(
        txDataNoInputCount.slice(offset, 18 + offset)
      );
      const scriptSigSizeSize = scriptSigSize.length;
      const scriptSigSizeInt = parseInt(scriptSigSize, 16);
      offset += scriptSigSizeSize;
      let scriptSig = "";
      let isSegWitLocal = false;
      if (scriptSigSize === "00") {
        isSegWitLocal = true;
      } else {
        scriptSig = txDataNoInputCount.slice(
          offset,
          scriptSigSizeInt * 2 + offset
        );
        offset += scriptSigSizeInt * 2;
      }
      const sequence = leToBe8(
        txDataNoInputCount.slice(0 + offset, 8 + offset)
      );
      offset += 8;

      inputs.push({
        txid: txid,
        vout: vout,
        sigScriptSize: scriptSigSize,
        sigScript: scriptSig,
        sequence: sequence,
        isSegWit: isSegWitLocal,
      });
    }
    // set the inputs in the top level data object
    keepTrackOfTxData.inputs = inputs;

    // Outputs
    // Extract output count & size using VarInt
    const outputCountVarInt = verifyVarInt(
      txDataNoInputCount.slice(0 + offset, 9 + offset)
    );
    const outputCountVarIntSize = inputCountVarInt.length;
    const outputCount = parseInt(outputCountVarInt, 16);

    // set the output count in the top level data object
    keepTrackOfTxData.outputCount = outputCountVarInt;

    offset += outputCountVarIntSize;
    // // Create empty array of Outputs
    const outputs: TxOutput[] = [];
    const txDataNoInputsNoOutputcount = txDataNoInputCount.slice(offset);
    // Loop through transaction outputCount amount of times to extract outputs
    for (let i = 0; i < outputCount; i++) {
      // Extract amount of sats being transferred
      const amount = leToBe16(
        txDataNoInputCount.slice(0 + offset, 16 + offset)
      );
      offset += 16;
      // Parse up to next 18 characters for pubKeySize
      const pubKeySize = verifyVarInt(
        txDataNoInputCount.slice(offset, 18 + offset)
      );
      const pubKeyVarIntSize = pubKeySize.length;
      offset += pubKeyVarIntSize;
      // Parse script
      const pubKeyDecSize = parseInt(pubKeySize, 16);
      //console.log(pubKeyDecSize);
      const pubKeyScript = txDataNoInputCount.slice(
        offset,
        pubKeyDecSize * 2 + offset
      );
      offset += pubKeyDecSize * 2;
      outputs.push({
        amount: parseInt(amount, 16),
        pubKeySize: pubKeySize,
        pubKeyScript: pubKeyScript,
        knownScript: parseOutputForKnownScript(pubKeyScript),
      });
    }
    // set the outputs in the top level data object
    keepTrackOfTxData.outputs = outputs;

    console.log(inputs);
    console.log(outputs);
    // Create empty array of Witnesses
    const witnesses: TxWitness[] = [];
    for (let i = 0; i < inputCount; i++) {
      const witnessNumOfElementsVarInt = verifyVarInt(
        txDataNoInputCount.slice(0 + offset, 18 + offset)
      );
      const witnessNumOfElementsVarIntSize = witnessNumOfElementsVarInt.length;
      const witnessNumOfElementsInt = parseInt(witnessNumOfElementsVarInt, 16);
      offset += witnessNumOfElementsVarIntSize;
      const witnessElements: TxWitnessElement[] = [];
      for (let j = 0; j < witnessNumOfElementsInt; j++) {
        const elementVarInt = verifyVarInt(
          txDataNoInputCount.slice(0 + offset, 18 + offset)
        );
        const elementVarIntSize = elementVarInt.length;
        const elementSizeInt = parseInt(elementVarInt, 16);
        offset += elementVarIntSize;
        const elementValue = txDataNoInputCount.slice(
          0 + offset,
          elementSizeInt * 2 + offset
        );
        offset += elementSizeInt * 2;
        witnessElements.push({
          elementSize: elementVarInt,
          elementValue: elementValue,
        });
        //console.log(elementValue);
      }
      //console.log("from inside of witness loop: " + JSON.stringify(inputs[i]));
      //console.log(witnessElements);
      witnesses.push({
        witnessNumElements: witnessNumOfElementsInt,
        witnessElements: witnessElements,
        knownScript: parseWitnessForKnownScript(
          inputs[i],
          witnessNumOfElementsInt,
          witnessElements
        ),
      });
    }
    // set the witnesses in the top level data object
    keepTrackOfTxData.witnesses = witnesses;

    console.log(JSON.stringify(witnesses));

    // set the lock time in the top level data object
    keepTrackOfTxData.locktime = txData.slice(-8);

    return keepTrackOfTxData;
  } catch (err) {
    console.log(err);
    return {
      ...keepTrackOfTxData,
      error: err,
    };
  }

  //  return true;
}

function updateTXData(txData: TxData, isLegacy: boolean): TxData {
  if (isLegacy) {
    // Update the legacy transaction data here
  } else {
    // Update the SegWit transaction data here
  }
  return txData;
}

function verifyAndUpdateTXDataHex(hexData: string): TxData {
  // Parsing for version
  // added this to keep track of the data that was able to be parsed before an error was thrown
  const topLevelData: TxData = {
    hash: hexData,
    txType: undefined,
    version: undefined,
    marker: undefined,
    flag: undefined,
    inputCount: undefined,
    inputs: [],
    outputCount: undefined,
    outputs: [],
    witnesses: [],
    locktime: undefined,
    error: undefined,
  };
  try {
    const version = hexData.slice(0, 8);

    // set the version in the top level data object
    topLevelData.version = version;

    // Assert version is valid
    if (version !== "01000000" && version !== "02000000") {
      if (version.slice(0, 2) === "00") {
        throw errInvalidVersionEndian;
      }
      if (parseInt(version) >= 3) {
        throw errNonstandardVersion;
      }
    }
    // Parsing to check for Marker & Flag field -> means it's SegWit
    const isSegWit = hexData.slice(8, 12) === "0001" ? true : false;

    topLevelData.marker = hexData.slice(8, 10);
    topLevelData.flag = hexData.slice(10, 12);

    // Start main verify & update funcs
    if (isSegWit) {
      // Validate/Store as SegWit
      // Parse out Version, Marker & Flag fields
      const hexDataSegWit = hexData.slice(12);
      //console.log(hexDataSegWit);
      const SegWitRes = verifySegWit(hexDataSegWit);

      return {
        txType: true,
        marker: hexData.slice(8, 10),
        flag: hexData.slice(10, 12),
        ...topLevelData,
        ...SegWitRes,
      };
    } else {
      // Store as Legacy
      const hexDataLegacy = hexData.slice(8);
      // Validate as Legacy
      verifyLegacy(hexDataLegacy);
      throw new Error("FIX LEGACY TX RETURN VALUE");
    }
  } catch (err) {
    console.log("wehre is this coming from ", err);
    return {
      ...topLevelData,
      error: err,
    };
  }
}

const TEST_DESERIALIZE = async (userInput: string) => {
  const topLevelData: TxData = {
    hash: "",
    txId: userInput,
    txType: undefined,
    version: undefined,
    marker: undefined,
    flag: undefined,
    inputCount: undefined,
    inputs: [],
    outputCount: undefined,
    outputs: [],
    witnesses: [],
    locktime: undefined,
    error: undefined,
  };

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
    //const userInput = "e0b46bf5838ed82946aa2d55986791885f26c890a1e9f341f584a3f1b4cb01da"

    if (userInput.length != 64 && userInput.length < 256) {
      throw errInvalidInput;
    }

    // User submitted a TXID -> fetch -> store
    if (userInput.length == 64) {
      // Fetch hex of transaction

      // set txId
      topLevelData.txId = userInput;

      const hexData = await fetchTXID(userInput);

      // set hash
      topLevelData.hash = hexData;

      const isValid = verifyAndUpdateTXDataHex(hexData);

      console.log("pre return hash", hexData);
      console.log("pre return isValid", hexData.length);
      return {
        ...topLevelData,
        ...isValid,
        hash: hexData,
      };
      // User submitted a raw hex -> validate -> store
    } else {
      // Parse/Validate hex of transaction
      const isValid = verifyAndUpdateTXDataHex(userInput);

      return {
        ...topLevelData,
        ...isValid,
      };
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`);

    return {
      ...topLevelData,
      error: error,
    };
  }
};

export default TEST_DESERIALIZE;
