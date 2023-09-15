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
  leToBe8, leToBe16, leToBe64,
  KnownScript, 
  parseOutputForKnownScript, parseWitnessForKnownScript
} from "./helpers";
import { 
  TxInput, TxOutput, 
  TxWitness, TxWitnessElement,
  TxData, MinTxData, 
  TxType
} from "./model";

// User arrives & has three options: paste TXID, paste raw hex or load example
// Paste TXID -> FetchTXID() -> ParseRawHex()
// Paste raw hex & load example -> ParseRawHex()

// ParseRawHex() -> Error | DeserializeData
// The response of parseRawHex should include *everything* needed client-side (at least without json format)
// The most important item is the parsedRaw which is an array of [transactionElements]

// Ideal response
export interface parseResponse {
  txID: string;
  rawHex: string;
  txType: TxType;
  numInputs: number;
  numOutputs: number;
  totalBitcoin: number;
  knownScripts: KnownScript[];
  parsedRawHex: TransactionItem[]; 
}

export interface TransactionItem {
  error?: Error;
  rawHex: string;
  item: any;
}

export interface BaseTransactionItem {
  title: string;
  value: string;
  description: string;
}

interface VersionItem extends BaseTransactionItem {
  bigEndian: string;
}

interface CountItem extends BaseTransactionItem {
  asset: string;
}


// Version 
const versionDescription = "The version field tells us what type of transaction this is (legacy vs segwit/taproot). It’s stored as a 4-byte | 8 hex string in Little-Endian format. The original version found, (1),  has been the standard for Bitcoin transactions since the origin block; this version does not have features found in version (2).";

enum VersionTitle {
  V1 = "Version 1",
  V2 = "Version 2"
}

enum VersionValueType {
  V1 = "00000001",
  V2 = "00000002"
}

enum VersionBigEndian {
  V1 = "01000000",
  V2 = "02000000"
}

// Counts
enum CountTitle {
  INPUT = "Input Count",
  OUTPUT = "Output Count",
}
enum CountDescription {
  INPUT = "The input count field tells us the total number of inputs that were used to fetch & unlock the Bitcoin spent in this transaction. It’s stored as a VarInt. /n With our input count, we know how many inputs we expect in the upcoming hex, recall that each input requires the following fields: TXID, VOUT, ScriptSigSize, ScriptSig, & Sequence.",
  OUTPUT = "The output count field tells us the total number of outputs that were used to assign & lock the inputs spent.  Like most items of varying size, it’s stored according to VarInt rules: /n With our output count, we know how many outputs we expect in the upcoming hex, recall that each output requires the following fields: Amount, PubKeySize, & PubKey.",
  WITNESSELEMENT = "Every Witness consists of an element count & an array of tuples that include the size(varint) of the upcoming element & the actual value / element (data or op_code) itself. /n This witness element count tells us how many items are in the upcoming witness script."
}
// interface MarkerFlagItem extends BaseTransactionItem {
//   bigEndian: string;
// }

interface InputOutputWitnessElementCount extends BaseTransactionItem {
  
}

type transactionItemSpecific = VersionItem;

// Missing functions
// getTotalBitcoin()
function parseRawHex(rawHex: string): parseResponse {

  let txID;
  let txType;
  let numInputs;
  let numOutputs;
  let totalBitcoin;
  let knownScripts;
  let parsedRawHex: TransactionItem[] = [];

  let testVersion;

  // Check if rawHex is at least 256 characters
  if (rawHex.length < 256) {
    throw errInvalidInput;
  }

  // Fetch, check & store Version
  const version = rawHex.slice(0, 8);
  if (version !== "01000000" && version !== "02000000") {
    if (version.slice(0, 2) === "00") {
      throw errInvalidVersionEndian;
    }
    if (parseInt(version) >= 3) {
      throw errNonstandardVersion;
    }
  } else if (version === "01000000") {
    parsedRawHex.push({
      rawHex: version,
      item: {
        title: VersionTitle.V1,
        value: VersionValueType.V1,
        description: versionDescription,
        bigEndian: VersionBigEndian.V1
      }
    });
  } else {
    parsedRawHex.push({
      rawHex: version,
      item: {
        title: VersionTitle.V2,
        value: VersionValueType.V2,
        description: versionDescription,
        bigEndian: VersionBigEndian.V2
      }
    });
  }

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
  } else {
    txType = TxType.LEGACY;
  }

  // Inputs
  // Input Count - extract using VarInt
  const inputCountVarInt = verifyVarInt(rawHex.slice(12, 12+18));
  const inputCountVarIntSize = inputCountVarInt.length;
  const inputCount = parseInt(inputCountVarInt, 16);
  parsedRawHex.push({
    rawHex: rawHex.slice(12, 12+inputCountVarIntSize),
    item: {
      title: CountTitle.INPUT,
      value: inputCount,
      description: CountDescription.INPUT,
      asset: "imageURL"
    }
  });

  return any
}

// txID: string;
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
  // // Create empty array of Outputs
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
        knownScript: parseOutputForKnownScript(pubKeySize, pubKeyScript),
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
