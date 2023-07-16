import { ScriptData } from './scriptdata';
import { OP_Code } from './op_code';

export class StackState {
    beforeStack: ScriptData[];
    currentStack: ScriptData[];
    stackData?: ScriptData;
    opCode?: OP_Code;
  
    constructor(
      beforeStack: ScriptData[],
      currentStack: ScriptData[],
      stackData?: ScriptData,
      opCode?: OP_Code
    ) {
      this.beforeStack = beforeStack;
      this.currentStack = currentStack;
      this.stackData = stackData;
      this.opCode = opCode;
    }
  
    // Method to process stackData or opCode and update resultStack
    process() {
        let newStack: Array<ScriptData> = [...this.currentStack];
        if (this.stackData) {
          // if there's a stackData, push it onto the stack
          newStack.push(this.stackData);
        } else if (this.opCode) {
          // if there's an opCode, execute it
          let [updatedStack, added, removed] = this.opCode.execute(newStack);
          newStack = updatedStack;
        }
        return newStack;
    }
}