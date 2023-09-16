import { 
    VarInt,
    verifyVarInt,
    leToBe8, leToBe16, leToBe64,
    KnownScript
  } from "./helpers";

// Universal
// Regardless of response type (hex | json) these types persist
export enum TxType {
  LEGACY = "Legacy",
  SEGWIT = "SegWit",
}

// Hex Response
// All data required for when a user is looking at the hex / overlay view
// The most important item is the parsedRaw which is an array of [transactionElements]
export interface HexResponse {
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

// JSON Response
// All data required for when a user is looking at the JSON view
// Types of Transactions

export interface VersionItem extends BaseTransactionItem {
  bigEndian: string;
}

export interface CountItem extends BaseTransactionItem {
  asset: string;
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