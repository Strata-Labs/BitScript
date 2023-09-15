import { 
    VarInt,
    verifyVarInt,
    leToBe8, leToBe16, leToBe64,
    KnownScript
  } from "./helpers";

// Types of Transactions
export enum TxType {
    LEGACY = "Legacy",
    SEGWIT = "SegWit",
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