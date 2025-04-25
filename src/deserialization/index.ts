import { errInvalidInput } from "./errors";
import {
  leToBe8,
  leToBe64,
  parseInputs,
  parseVersion,
  parseMarkerAndFlag,
  parseOutputs,
  parseWitnesses,
  parseLocktime,
} from "./helpers";
import {
  TxInput,
  TxOutput,
  TxWitness,
  TxType,
  TransactionItem,
  TransactionFeResponse,
  TransactionSelectedOutputResponse,
} from "./model";
import { KnownScript } from "./overlayValues";
import * as CryptoJS from "crypto-js";
import { zeroByte, BTC_ENV } from "./consts";

async function fetchTXID(txid: string, env = BTC_ENV.MAINNET): Promise<string> {
  console.log("fetchTXID - env", env);
  // Try mainnet, then testnet
  try {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      method: "getrawtransaction",

      params: [txid, 0],
    });

    var requestOptions = {
      method: "POST",

      headers: myHeaders,

      body: raw,

      redirect: "follow",
    };

    const envThing = localStorage.getItem("env");

    let _env = BTC_ENV.MAINNET;
    if (envThing) {
      if (envThing === "TESTNET") {
        _env = BTC_ENV.TESTNET;
      }
    }
    const url =
      _env === BTC_ENV.MAINNET
        ? "https://withered-rough-lake.btc.quiknode.pro/f46b3a795512b0cf36f9607866beea5bd10ce940/"
        : "https://soft-dawn-theorem.btc-testnet.quiknode.pro/3f9f693550d9894f1562a13e8e46ebfabc4873dd/";

    console.log("url", url);
    const res = await fetch(url, requestOptions as any);
    const resJson = await res.json();

    console.log("resJson", resJson);
    return resJson.result;
    //return response.data;
  } catch (errorMainnet) {
    console.error("Error fetching from mempool.space:", errorMainnet);

    /* 
    todo - add other func and route for testnet funcs
   
    */
    throw errorMainnet;
  }
}

function parseRawHex(rawHex: string): TransactionFeResponse {
  // Hex Response Items
  let offset = 0;
  let txType;
  let numOutputs;
  let numInputs;
  let totalBitcoin = 0;
  let knownScripts: KnownScript[] = [];
  let parsedRawHex: TransactionItem[] = [];
  let inputCountLE = "";

  // JSON Response Items
  let versionJSON = "";
  let versionLE = "";
  let locktimeJSON = "";
  let inputs: TxInput[] = [];
  const outputs: TxOutput[] = [];
  const witnesses: TxWitness[] = [];

  // Check if rawHex is at least 256 characters
  if (rawHex.length < 256) {
    throw errInvalidInput;
  }

  // Parse transaction version
  const versionResult = parseVersion(rawHex, offset);
  parsedRawHex = parsedRawHex.concat(versionResult.parsedRawHex);
  versionJSON = versionResult.versionJSON;
  versionLE = versionResult.versionLE;
  offset = versionResult.newOffset;

  // Check if transaction is SegWit or Legacy
  const markerFlagResult = parseMarkerAndFlag(rawHex, offset);
  parsedRawHex = parsedRawHex.concat(markerFlagResult.parsedRawHex);
  txType = markerFlagResult.txType;
  offset = markerFlagResult.newOffset;

  // Parse inputs using the new function
  const inputsResult = parseInputs(rawHex, offset);
  parsedRawHex = parsedRawHex.concat(inputsResult.parsedRawHex);
  inputs = inputsResult.inputs;
  knownScripts = knownScripts.concat(inputsResult.knownScripts);
  offset = inputsResult.newOffset;
  numInputs = inputsResult.inputCount;
  inputCountLE = inputsResult.inputCountLE;

  // Parse outputs
  const outputsResult = parseOutputs(rawHex, offset);
  parsedRawHex = parsedRawHex.concat(outputsResult.parsedRawHex);
  outputs.push(...outputsResult.outputs);
  knownScripts = knownScripts.concat(outputsResult.knownScripts);
  totalBitcoin = outputsResult.totalBitcoin;
  numOutputs = outputsResult.numOutputs;
  const outputCountLE = outputsResult.outputCountLE;
  offset = outputsResult.newOffset;

  // Parse witnesses if SegWit transaction
  if (txType === TxType.SEGWIT) {
    const witnessResult = parseWitnesses(rawHex, offset, numInputs, inputs);
    parsedRawHex = parsedRawHex.concat(witnessResult.parsedRawHex);
    witnesses.push(...witnessResult.witnesses);
    knownScripts = knownScripts.concat(witnessResult.knownScripts);
    offset = witnessResult.newOffset;
  }

  // Parse locktime
  const locktimeResult = parseLocktime(rawHex, offset);
  parsedRawHex = parsedRawHex.concat(locktimeResult.parsedRawHex);
  locktimeJSON = locktimeResult.locktimeJSON;
  offset = locktimeResult.newOffset;

  createSignatureMessage(
    0,
    versionLE,
    inputCountLE,
    inputs,
    outputCountLE,
    outputs,
    locktimeJSON,
    "01000000"
  );

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

function parseRawHexNoSig(rawHex: string): TransactionFeResponse {
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
  let inputs: TxInput[] = [];
  const outputs: TxOutput[] = [];
  const witnesses: TxWitness[] = [];

  // Parse transaction version
  const versionResult = parseVersion(rawHex, offset);
  parsedRawHex = parsedRawHex.concat(versionResult.parsedRawHex);
  versionJSON = versionResult.versionJSON;
  offset = versionResult.newOffset;

  // Check if transaction is SegWit or Legacy
  const markerFlagResult = parseMarkerAndFlag(rawHex, offset);
  parsedRawHex = parsedRawHex.concat(markerFlagResult.parsedRawHex);
  txType = markerFlagResult.txType;
  offset = markerFlagResult.newOffset;

  // Parse inputs
  const inputsResult = parseInputs(rawHex, offset);
  inputs = inputsResult.inputs;
  knownScripts = knownScripts.concat(inputsResult.knownScripts);
  offset = inputsResult.newOffset;
  numInputs = inputsResult.inputCount;

  // Parse outputs
  const outputsResult = parseOutputs(rawHex, offset);
  outputs.push(...outputsResult.outputs);
  knownScripts = knownScripts.concat(outputsResult.knownScripts);
  totalBitcoin = outputsResult.totalBitcoin;
  numOutputs = outputsResult.numOutputs;
  offset = outputsResult.newOffset;

  // Parse witnesses if SegWit transaction
  if (txType === TxType.SEGWIT) {
    const witnessResult = parseWitnesses(rawHex, offset, numInputs, inputs);
    witnesses.push(...witnessResult.witnesses);
    knownScripts = knownScripts.concat(witnessResult.knownScripts);
    offset = witnessResult.newOffset;
  }

  // Parse locktime
  const locktimeResult = parseLocktime(rawHex, offset);
  locktimeJSON = locktimeResult.locktimeJSON;
  offset = locktimeResult.newOffset;

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
async function createSignatureMessage(
  inputIndex: number,
  version: string,
  inputCountLE: string,
  inputs: TxInput[],
  outputCountLE: string,
  outputs: TxOutput[],
  locktime: string,
  sighashFlag: string
): Promise<string> {
  let prehashedMessage = "";
  prehashedMessage += version;
  prehashedMessage += inputCountLE;
  //console.log("input count from create signature message; " + inputCountLE);
  for (let i = 0; i < inputs.length; i++) {
    if (i == inputIndex) {
      prehashedMessage += inputs[i].txid;
      prehashedMessage += inputs[i].vout;
      const txIDBE = leToBe64(inputs[i].txid);
      const voutBE = leToBe8(inputs[i].vout);
      const signedOutPubKeyItems = await fetchSignedOutputItems(
        txIDBE,
        inputs[i].vout
      );
      prehashedMessage += signedOutPubKeyItems.selectedOutputPubKeyScriptSize;
      prehashedMessage += signedOutPubKeyItems.selectedOutputPubKeyScript;
      prehashedMessage += inputs[i].sequence;
    } else {
      prehashedMessage += inputs[i].txid;
      prehashedMessage += inputs[i].vout;
      prehashedMessage += zeroByte;
      prehashedMessage += inputs[i].sequence;
    }
  }
  prehashedMessage += outputCountLE;
  for (let i = 0; i < outputs.length; i++) {
    prehashedMessage += outputs[i].amountLE;
    prehashedMessage += outputs[i].pubKeySize;
    prehashedMessage += outputs[i].pubKeyScript;
  }
  prehashedMessage += locktime;
  prehashedMessage += sighashFlag;
  const hashedMessage = CryptoJS.SHA256(
    CryptoJS.SHA256(CryptoJS.enc.Hex.parse(prehashedMessage))
  );
  // console.log(
  //   "hashed message from create signature message: " + hashedMessage.toString()
  // );
  return hashedMessage.toString();
}

// Fetch pubkeyscriptsize & pubkeyscript for input being verified
async function fetchSignedOutputItems(
  txidBE: string,
  vout: string
): Promise<TransactionSelectedOutputResponse> {
  const fetched = await fetchTXID(txidBE);
  const parseResponse = parseRawHexNoSig(fetched);
  const voutNumb = parseInt(leToBe8(vout));
  const selectedPubkeyScriptSize =
    parseResponse.jsonResponse.outputs[voutNumb].pubKeySize;
  const selectedPubkeyScript =
    parseResponse.jsonResponse.outputs[voutNumb].pubKeyScript;
  return {
    selectedOutputPubKeyScriptSize: selectedPubkeyScriptSize,
    selectedOutputPubKeyScript: selectedPubkeyScript,
  };
}

const TEST_DESERIALIZE = async (
  userInput: string,
  env = BTC_ENV.MAINNET
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
      const fetched = await fetchTXID(userInput, env);
      const parseResponse = parseRawHex(fetched);
      const jsonResponse = parseResponse.jsonResponse;
      //createSignatureMessage(0, jsonResponse.version, jsonResponse.inputs, jsonResponse.outputs, jsonResponse.locktime, "01");
      //console.log("firing from within test_deserialize");
      return parseResponse;
    } else {
      // Parse/Validate hex of transaction
      const parseResponse = parseRawHex(userInput);
      return parseResponse;
    }
    throw errInvalidInput;
  } catch (error: any) {
    //console.error(`Error: Something Went Wrong`);
    throw new Error(error);
  }
};

export default TEST_DESERIALIZE;
