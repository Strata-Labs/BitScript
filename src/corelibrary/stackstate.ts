import { ScriptData } from './scriptdata';
import { OP_Code } from './op_code';

let testTransactionData2: TxData = {
  inputs: [],
  outputs: [],
  version: '2',
  timelock: '0',
  currentInputIndex: 0
}

export type TxInput = {
  previousTxId: string;
  vout: string;
  sequence: string;
  scriptSig: string;
  amount: string;
  assetId?: string;
  blockHeight?: string;
  blockTimestamp?: string;
};

export type TxOutput = {
  scriptPubKey: string;
  amount: string;
  assetId?: string;
};

export type TxData = {
  inputs: TxInput[];
  outputs: TxOutput[];
  version: string;
  timelock: string;
  currentInputIndex: number;
};

export class StackState {
    beforeStack: ScriptData[];
    currentStack: ScriptData[];
    stackData?: ScriptData;
    opCode?: OP_Code;
    txData?: TxData;
  
    constructor(
      beforeStack: ScriptData[],
      currentStack: ScriptData[],
      stackData?: ScriptData,
      opCode?: OP_Code,
      txData?: TxData
    ) {
      this.beforeStack = beforeStack;
      this.currentStack = currentStack;
      this.stackData = stackData;
      this.opCode = opCode;
      this.txData = txData;
    }
  
    // Method to process stackData or opCode and update resultStack
    process() {
        let newStack: Array<ScriptData> = [...this.currentStack];
        if (this.stackData) {
          // if there's a stackData, push it onto the stack
          newStack.push(this.stackData);
        } else if (this.opCode) {
          // if there's an opCode, execute it
          let [updatedStack, added, removed] = this.opCode.execute(newStack, testTransactionData2);
          newStack = updatedStack;
        }
        return newStack;
    }
}