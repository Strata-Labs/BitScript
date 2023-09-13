import axios from "axios";

// Error List
const errInvalidInput = new Error(
  "Invalid string length - TXID must be exactly 64 chars OR HEX transaction should be at least > 128 chars"
);
const errStringLengthInLE8 = new Error(
  "Little Endian - input string must be 8 characters"
);
const errStringLengthInLE16 = new Error(
  "Little Endian - input string must be 16 characters"
);
const errStringLengthInLE64 = new Error(
  "Little Endian - Input string must be 64 characters"
);
const errIncompleteVarIntFC = new Error(
  "Incomplete VarInt - byte decimal value > fc"
);
const errIncompleteVarIntFD = new Error(
  "Incomplete VarInt - For prefix 'fd', 2 bytes are expected"
);
const errIncompleteVarIntFE = new Error(
  "Incomplete VarInt - for prefix 'fe', 4 bytes are expected"
);
const errIncompleteVarIntFF = new Error(
  "Incomplete VarInt - for prefix 'ff', 8 bytes are expected"
);
const errInvalidVersionEndian = new Error(
  "Invalid version - endian format is incorrect, try in little endian"
);
const errNonstandardVersion = new Error(
  "Nonstandard version - only 00000001 & 00000002 are mined *&* relayed"
);

// Known Scripts List
enum KnownScript {
  NONE = "NONE",
  P2PKH = "P2PKH",
  P2SH = "P2SH",
  P2WPKH = "P2WPKH",
  P2WSH = "P2WSH",
  P2SHP2WPKH = "P2SH-P2WPKH",
  P2SHP2WSH = "P2SH-P2WSH",
  P2TR = "P2TR",
}

type VarInt = string;

// Input Model & Helpers
// Input Model
interface TxInput {
  txid: string;
  vout: string;
  sigScriptSize: VarInt;
  sigScript: string;
  sequence: string;
  isSegWit: boolean;
  knownScipt?: KnownScript;
}
// Input Helpers

interface TxOutput {
  amount: number;
  pubKeySize: VarInt;
  pubKeyScript: string;
  knownScript?: KnownScript;
}

interface TxWitness {
  witnessNumElements: number;
  witnessElements: TxWitnessElement[];
  knownScript?: KnownScript;
}

interface TxWitnessElement {
  elementSize: VarInt;
  elementValue: string;
}

export interface TxData {
  hash: string;
  txType?: boolean;
  version?: string;
  marker?: string;
  flag?: string;
  inputCount?: VarInt;
  inputs: TxInput[];
  outputCount?: VarInt;
  outputs: TxOutput[];
  witnesses?: TxWitness[];
  locktime?: string;
  error?: any;
  txId?: string;
}

interface MinTxData {
  inputCount?: VarInt;
  inputs: TxInput[];
  outputCount?: VarInt;
  outputs: TxOutput[];
  witnesses?: TxWitness[];
  locktime?: string;
  error?: any;
}

//const errInvalidTXIDLength

async function fetchTXID(txid: string): Promise<string> {
  // Actual API call here
  const response = await axios.get(`https://mempool.space/api/tx/${txid}/hex`);
  return response.data;
}

// Helper & Utility
// VarInt
function verifyVarInt(varint: string): VarInt {
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

// Hex <-> JSON
function hexToJSON(hex: string): TxData {
  // Implement the logic to convert hex to JSON
  return {} as TxData;
}

function jsonToHex(json: TxData): string {
  // Implement the logic to convert JSON to hex
  return "";
}

// Little-Endian
function leToBe8(le: string): string {
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
function leToBe16(le: string): string {
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
function leToBe64(le: string): string {
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
// Categorization Functions
// Categorize Output
function parseOutputForKnownScript(
  pubKeySize: string,
  pubKeyScript: string
): KnownScript {
  if (pubKeyScript.slice(0, 4) === "0014") {
    return KnownScript.P2WPKH;
  } else if (pubKeyScript.slice(0, 2) === "a9") {
    return KnownScript.P2SH;
  } else {
    throw new Error("todo");
  }
}
// Categorize Witness
function parseWitnessForKnownScript(
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
    throw new Error("todo");
  }
}

// Verification Functions
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

    // Start main verify & update funcs
    if (isSegWit) {
      // Validate/Store as SegWit
      // Parse out Version, Marker & Flag fields
      const hexDataSegWit = hexData.slice(12);
      //console.log(hexDataSegWit);
      const SegWitRes = verifySegWit(hexDataSegWit);

      return {
        txType: true,
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
    hash: userInput,
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
      return {
        ...topLevelData,
        ...isValid,
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
