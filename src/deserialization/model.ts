import { 
    VarInt,
    verifyVarInt,
    leToBe8, leToBe16, leToBe64,
    KnownScript
  } from "./helpers";
import {
  VersionBigEndian
} from "./overlayValues";

// Universal
// Regardless of response type (hex | json) these types persist
export enum TxType {
  LEGACY = "Legacy",
  SEGWIT = "SegWit",
}

// Hex Response
// All data required for when a user is looking at the hex / overlay view
// The most important item is the parsedRaw which is an array of [transactionElements]
// Prioritizing precision
export interface HexResponse {
  // can't include txid / out of scope for now since segwit txs require a few things
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

export interface VersionItem extends BaseTransactionItem {
  bigEndian: string;
}

export interface CountItem extends BaseTransactionItem {
  asset: string;
}

export interface InputTXIDItem extends BaseTransactionItem {
  bigEndian: string;
  previousTransactionURL: string;
}

export interface InputVOUTItem extends BaseTransactionItem {
  bigEndian: string;
  decimal: number;
}

export interface InputScriptSigSizeItem extends BaseTransactionItem {
  bigEndian: string;
  decimal: number;
  asset: string;
}

export interface InputScriptSigItem extends BaseTransactionItem {
  knownScript: KnownScript;
}

export interface OutputAmountItem extends BaseTransactionItem {
  bigEndian: string;
  decimal: number;
}

export interface OutputScriptPubKeyItem extends BaseTransactionItem {
  bigEndian: string;
  decimal: number;
  asset: string;
}

export interface OutputPubKeyScriptItem extends BaseTransactionItem {
  knownScript: KnownScript;
}


// JSON Response
// All data required for when a user is looking at the JSON view
// Prioritizing readability
export interface JSONResponse {
  //txID: string; -> out of scope since requires scrubbing wtxs
  totalBitcoin: number;
  version: string;
  locktime: string;
  numInputs: number;
  numOutputs: number;
  inputs: TxInput[];
  outputs: TxOutput[];
  witnesses: TxWitness[];
}

// Input Model
export interface TxInput {
    txid: string;
    vout: string;
    sigScriptSize: VarInt;
    sigScript: string;
    sequence: string;
    isSegWit: boolean;
    knownScript?: KnownScript;
  }
  
  // Output Model
  export interface TxOutput {
    amount: number;
    pubKeySize: VarInt;
    pubKeyScript: string;
    knownScript?: KnownScript;
  }
  
  // Witness Model
  export interface TxWitness {
    witnessNumElements: number;
    witnessElements: TxWitnessElement[];
    knownScript?: KnownScript;
  }
  
  // Witness Element Model
  export interface TxWitnessElement {
    elementSize: VarInt;
    elementValue: string;
  }
  
  // Transaction Model
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
  
  export interface MinTxData {
    inputCount?: VarInt;
    inputs: TxInput[];
    outputCount?: VarInt;
    outputs: TxOutput[];
    witnesses?: TxWitness[];
    locktime?: string;
    error?: any;
  }