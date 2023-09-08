import axios from "axios";

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
}
// Input Helpers

interface TxOutput {
  amount: number;
  pubKeySize: VarInt;
  pubKeyScript: string;
}

interface TxWitness {
  witnessNumElements: string;
  witnessElements: TxWitnessElement[];
}

interface TxWitnessElement {
  elementSize: VarInt;
  elementValue: string;
}

export interface TxData {
  txType: boolean;
  version: string;
  marker?: string;
  flag?: string;
  inputCount: VarInt;
  inputs: TxInput[];
  outputCount: VarInt;
  outputs: TxOutput[];
  witnesses?: TxWitness[];
  locktime: string;
}

interface MinTxData {
  inputCount: VarInt;
  inputs: TxInput[];
  outputCount: VarInt;
  outputs: TxOutput[];
  witnesses?: TxWitness[];
  locktime: string;
}
async function fetchTXID(txid: string): Promise<string> {
  if (txid.length !== 64) {
    throw new Error("Invalid TXID length");
  }

  // Actual API call here
  const response = await axios.get(`https://mempool.space/api/tx/${txid}/hex`);
  return response.data;
}

function verifyVarInt(varint: string): VarInt {
  const firstTwoChars = varint.substring(0, 2);
  if (firstTwoChars === "fd") {
    return varint.substring(0, 6);
  }
  if (firstTwoChars === "fe") {
    return varint.substring(0, 10);
  }
  if (firstTwoChars === "ff") {
    return varint.substring(0, 18);
  }
  return varint.substring(0, 2);
}

function hexToJSON(hex: string): TxData {
  // Implement the logic to convert hex to JSON
  return {} as TxData;
}

function jsonToHex(json: TxData): string {
  // Implement the logic to convert JSON to hex
  return "";
}

function leToBe8(le: string): string {
  if (le.length !== 8) {
    throw new Error("Input string must be 8 characters");
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
    throw new Error("Input string must be 16 characters");
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
    throw new Error("Input string must be 64 characters");
  }

  let be = "";
  for (let i = 0; i < 64; i += 2) {
    let chunk = le.slice(i, i + 2);
    be = chunk + be;
  }
  return be;
}

function verifyLegacy(txData: string): {
  inputs: TxInput[];
  outputs: TxOutput[];
  locktime: string;
  sequence?: string;
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
  //console.log(inputs);
  //console.log(txDataNoInputCount);
  //console.log(offset);
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
    //console.log(pubKeySize);
    //console.log(pubKeyVarIntSize);
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
  return {
    inputs: inputs,
    outputs: outputs,
    locktime: txData.slice(-8),
  };
}

function verifySegWit(txData: String): MinTxData {
  console.log("verifySegWit - txData", txData);
  // Inputs
  // Extract input count using VarInt
  const inputCountVarInt = verifyVarInt(txData.slice(0, 18));
  console.log("inputCountVarInt", inputCountVarInt);
  const inputCountVarIntSize = inputCountVarInt.length;
  console.log("inputCountVarIntSize", inputCountVarIntSize);
  const inputCount = parseInt(inputCountVarInt, 16);
  console.log("inputCount", inputCount);
  // Create empty array of Inputs
  const inputs: TxInput[] = [];
  const txDataNoInputCount = txData.slice(inputCountVarIntSize);

  //console.log(txDataNoInputCount);
  // Loop through transaction inputCountVarInt amount of times to extract inputs
  let offset = 0;
  for (let i = 0; i < inputCount; i++) {
    // Parse next 64 characters & change from LE to BE -> TXID
    console.log("txId", txDataNoInputCount.slice(0 + offset, 64 + offset));
    const txid = leToBe64(txDataNoInputCount.slice(0 + offset, 64 + offset));
    offset += 64;
    // Parse next 8 characters & change from LE to BE -> VOUT
    console.log("vout", txDataNoInputCount.slice(0 + offset, 8 + offset));
    const vout = leToBe8(txDataNoInputCount.slice(0 + offset, 8 + offset));
    console.log("vout leToBe8", vout);
    //console.log("after suspected vout");
    offset += 8;
    // Parse up to next 10 characters for sigScriptSize
    const scriptSigSize = verifyVarInt(
      txDataNoInputCount.slice(offset, 18 + offset)
    );

    console.log("scriptSigSize", scriptSigSize);
    const scriptSigSizeSize = scriptSigSize.length;
    console.log("scriptSigSizeSize", scriptSigSizeSize);

    const scriptSigSizeInt = parseInt(scriptSigSize, 16);
    console.log("scriptSigSizeInt", scriptSigSizeInt);
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
  //console.log(offset)
  //console.log(txData.slice(offset));

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
    //console.log(pubKeySize);
    //console.log(pubKeyVarIntSize);
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
  console.log(txDataNoInputCount.slice(offset));
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
    }
    //console.log(witnessElements);
    witnesses.push({
      witnessNumElements: witnessNumOfElementsInt + "",
      witnessElements: witnessElements,
    });
  }
  console.log(witnesses);
  console.log(txData.slice(-8));
  return {
    inputCount: inputCountVarInt,
    inputs: inputs,
    outputCount: outputCountVarInt,
    outputs: outputs,
    witnesses: witnesses,
    locktime: txData.slice(-8),
  };
}
// More SegWit verification here

//  return true;

function updateTXData(txData: TxData, isLegacy: boolean): TxData {
  if (isLegacy) {
    // Update the legacy transaction data here
  } else {
    // Update the SegWit transaction data here
  }
  return txData;
}

function verifyAndUpdateTXDataHex(hexData: string): TxData {
  //console.log(hexData);
  // Parsing for version
  const version = hexData.slice(0, 8);
  // Assert version is valid
  if (version !== "01000000" && version !== "02000000") {
    throw new Error("Invalid version");
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
      version: hexData.slice(0, 8),
      ...SegWitRes,
    };
  } else {
    throw new Error("Not SegWit");
  }
  /*
  comment this out in favor of returing a txData to the front end and OG Caller
  else {
    // Store as Legacy
    const hexDataLegacy = hexData.slice(8);
    // Validate as Legacy
    verifyLegacy(hexDataLegacy);
  }
  */
  //up  dateTXData(txData, version === "01000000");
}

/* 
  02000000000101634ca4909db158237af26bebbd28cf3b551f5ed4c5998bbff5692d4a21bad6220600000000fdffffff05303e19000000000016001419cd05e452b9bc7b4bbe9ffd359ff878102c4ed4ac010200000000001600146615380a87e9fcb9017a916593ca1d6ead71259da42e65000000000017a9146d4e008c341aa96d0a9fcba6c6180076493bfd4287d60916000000000017a914e63d1c7eff86591e317cacbad7353ae461559d908789a5a70100000000160014f60834ef165253c571b11ce9fa74e46692fc5ec102483045022100f06815aa20a790b286e45c94c6b9b7a4c3eb945555223e50c6171a4fe3e1d80502202291ffe91e4f90c381322dd41cab5a28a53657dfcd63c0cddca96cee298aa6d00121026e5628506ecd33242e5ceb5fdafe4d3066b5c0f159b3c05a621ef65f177ea28600000000
*/
const TEST_DESERIALIZE = async () => {
  try {
    // SegWit/NotTapRoot -> 1 input | 5 outputs | 1 witness
    // f8622f0427425f769069e36f7fdfbde2a9d51ad44b6eef51435f24236de05239
    // SegWit -> 3 inputs | 2 outputs | 1 witness
    // b55b1886d1cecf733a12bcdcc8ef413f158d84eb4f75052abde2469fa3a004cd
    // Legacy -> 3 inputs | 2 outputs
    // de0465c042cc00b46983c13e884f9a54e06d6f5ef3baf4c73238ed0ed70905ab
    // SegWit/Taproot ->
    // f73ce97a5b8b1a2c23d97b3e6aaf3d0af52bf94c28162f1a2f5d6bfb3c019a42
    const txid =
      "b55b1886d1cecf733a12bcdcc8ef413f158d84eb4f75052abde2469fa3a004cd";
    const hexData = await fetchTXID(txid);
    console.log("hex data", hexData);
    const isValid = verifyAndUpdateTXDataHex(hexData);
    return isValid;
    console.log(`Transaction is ${isValid ? "valid" : "invalid"}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
};

export default TEST_DESERIALIZE;

// Script categorization

// String must be exactly 64 hex chars to fetch TXID
// String must be v (8) + ic (2) + txid (64) + vout (8) + scriptSigSiz (2) + scriptSig (1) + sequence (8) + oc (4) + amount (16) + pubKeySize (2) + pubKey (1) + locktime (8)
// String must be > 128 characters before checking for raw hex

// Error Messages
// Universal Issues
//   Incorrect hex format
// Version Issues
//   Incorrect length -> String isn't at least
//   Incorrect version -> Version should be either 01000000 or 02000000
//   Incorrect endian format -> In big endian, should be little endian format
// Input Count Issues
//   Forbidden first two bytes -> VarInt can't be only "fd" "fe" or "ff"
// Input TXID Issues
//   Incorrect length
//   TXID not found -> TXID not found, make sure it's in little endian format
// Input VOUT Issues
//  Incorrect length
//  Incorrect endian format ->
// Input ScriptSigSize Issues
// Input ScriptSig Issues
// Input Sequence Issues
// Output Count Issues
//   Forbidden first two bytes -> VarInt can't be only "fd" "fe" or "ff"
// Output Amount Issues
//  Invalid endian format
//
// Output PubKeyScriptSize Issues
// Output PubKeyScript Issues
// Witness WitnessSigSize Issues
// Witness WitnessElementSize Issues
// Witness WitnessElementItem Issues
//
// Locktime Issues
//   Invalid Hex -> Invalid hex value
