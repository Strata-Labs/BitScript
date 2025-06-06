import { createHash } from "crypto";

import { ScriptData } from "./scriptdata";
import * as CryptoJS from "crypto-js";
import { TxData } from "./stackstate";

export abstract class OP_Code {
  static opCodeRegistry: Array<OP_Code> = [];
  static opCodeMap: { [key: string]: OP_Code } = {};

  name: string;
  number: number;
  hex: string;
  description: string;

  constructor(name: string, number: number, hex: string, description: string) {
    this.name = name;
    this.number = number;
    this.hex = hex;
    this.description = description;
    OP_Code.opCodeRegistry.push(this);
    OP_Code.opCodeMap[this.name] = this;
  }

  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toAdd: Array<ScriptData> = [];
    let toRemove = 0;
    // OPCode logic goes here
    // Updates toRemove, toAdd, & returns a stack
    return [stack, toAdd, toRemove];
  }

  animate() {
    // Implement your opcode animation here
  }
}

//////////////////////
// Stack operations //
//////////////////////
class OP_SWAP extends OP_Code {
  constructor() {
    super("OP_SWAP", 124, "0x7c", "Swaps the top two stack items.");
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 2;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_SWAP");
    }
    let a = stack.pop();
    let b = stack.pop();

    // Check that neither a or b are undefined
    if (!a || !b) {
      throw new Error("Attempted to swap undefined values");
    }

    stack.push(a);
    stack.push(b);
    return [stack, [a, b], toRemove];
  }
}

class OP_IF extends OP_Code {
  constructor() {
    super(
      "OP_IF",
      99,
      "0x63",
      "If the top stack value is not False, the statements are executed. The top stack value is removed."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    // We don't execute any changes to the stack within this method, we'll handle it externally in testScriptData
    // This is because the execution depends on other elements in the input sequence
    return [stack, [], 0];
  }
}

class OP_ELSE extends OP_Code {
  constructor() {
    super(
      "OP_ELSE",
      100,
      "0x64",
      "If the preceding OP_IF or OP_NOTIF or OP_ELSE was not executed then these statements are and if the preceding OP_IF or OP_NOTIF or OP_ELSE was executed then these statements are not."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    // We don't execute any changes to the stack within this method, we'll handle it externally in testScriptData
    // This is because the execution depends on other elements in the input sequence
    return [stack, [], 0];
  }
}

class OP_ENDIF extends OP_Code {
  constructor() {
    super("OP_ENDIF", 104, "0x68", "Ends an if/else block.");
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    // We don't execute any changes to the stack within this method, we'll handle it externally in testScriptData
    // This is because the execution depends on other elements in the input sequence
    return [stack, [], 0];
  }
}

class OP_IFDUP extends OP_Code {
  constructor() {
    super(
      "OP_IFDUP",
      115,
      "0x73",
      "If the top stack value is not 0, duplicate it."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 0;
    if (stack.length < 1) {
      throw new Error("Invalid stack size for OP_IFDUP");
    }
    let top = stack[stack.length - 1];
    if (top.dataNumber !== 0) {
      stack.push(top);
      toRemove = 1;
    }
    return [stack, [], toRemove];
  }
}

class OP_DEPTH extends OP_Code {
  constructor() {
    super(
      "OP_DEPTH",
      116,
      "0x74",
      "Puts the number of stack items onto the stack."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 0;
    let depth = stack.length;
    stack.push(ScriptData.fromNumber(depth));
    return [stack, [], toRemove];
  }
}

class OP_DROP extends OP_Code {
  constructor() {
    super("OP_DROP", 117, "0x75", "Removes the top stack item.");
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 1;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_DROP");
    }
    stack.pop();
    return [stack, [], toRemove];
  }
}

class OP_DUP extends OP_Code {
  constructor() {
    super("OP_DUP", 118, "0x76", "Duplicates the top stack item.");
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 0;
    if (stack.length < 1) {
      throw new Error("Invalid stack size for OP_DUP");
    }
    let top = stack[stack.length - 1];
    stack.push(top);
    return [stack, [], toRemove];
  }
}

class OP_NIP extends OP_Code {
  constructor() {
    super("OP_NIP", 119, "0x77", "Removes the second-to-top stack item.");
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 2;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_NIP");
    }
    stack.splice(stack.length - 2, 1);
    return [stack, [], toRemove];
  }
}

class OP_OVER extends OP_Code {
  constructor() {
    super(
      "OP_OVER",
      120,
      "0x78",
      "Copies the second-to-top stack item to the top."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 2;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_OVER");
    }
    let top = stack[stack.length - 2];
    stack.push(top);
    return [stack, [], toRemove];
  }
}

class OP_EQUAL extends OP_Code {
  constructor() {
    super(
      "OP_EQUAL",
      135,
      "0x87",
      "Returns 1 if the inputs are exactly equal, 0 otherwise."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 2;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_EQUAL");
    }
    let a = stack.pop();
    let b = stack.pop();
    if (!a || !b) {
      throw new Error("ScriptData object is undefined");
    }
    const aArray = a.dataBytes;
    const bArray = b.dataBytes;

    // compare the two arrays
    let equal = true;
    if (aArray.length !== bArray.length) {
      equal = false;
    } else {
      for (let i = 0; i < aArray.length; i++) {
        if (aArray[i] !== bArray[i]) {
          equal = false;
          break;
        }
      }
    }
    stack.push(ScriptData.fromNumber(equal ? 1 : 0));
    return [stack, [a, b], toRemove];
  }
}

class OP_EQUALVERIFY extends OP_Code {
  constructor() {
    super(
      "OP_EQUALVERIFY",
      136,
      "0x88",
      "Same as OP_EQUAL, but  doesn't push result & stops executing if false."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 2;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_EQUALVERIFY");
    }
    let a = stack.pop();
    let b = stack.pop();
    if (!a || !b) {
      throw new Error("ScriptData object is undefined");
    }
    let testBoolDataBytes = a._dataBytes === b._dataBytes ? 1 : 0;
    let testBoolDataHex = a.dataHex === b.dataHex ? 1 : 0;
    if (a.dataHex != b.dataHex) {
      throw new Error("OP_EQUALVERIFY failed. Values are not equal.");
    }
    // No push operation because OP_VERIFY removes the value if it is true.
    return [stack, [], toRemove];
  }
}

class OP_RETURN extends OP_Code {
  constructor() {
    super(
      "OP_RETURN",
      106,
      "0x6a",
      "Marks the transaction as invalid and returns all of the script's remaining bytes as an error message."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    //OP_RETURN invalidates the script, so we don't need to do anything here
    throw new Error("OP_RETURN called. Transaction is invalid.");
  }
}

class OP_SIZE extends OP_Code {
  constructor() {
    super(
      "OP_SIZE",
      130,
      "0x82",
      "Pushes the string length of the top element of the stack (without popping it)."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 0;
    if (stack.length < 1) {
      throw new Error("Invalid stack size for OP_SIZE");
    }
    let a = stack[stack.length - 1];
    if (!a || a.dataHex === undefined) {
      throw new Error("ScriptData object or dataHex field is undefined");
    }
    let size = a.dataHex.length / 2; // Each byte is represented by 2 hex characters
    const scriptDataSize = ScriptData.fromNumber(size);
    stack.push(scriptDataSize);
    return [stack, [scriptDataSize], toRemove];
  }
}

class OP_CAT extends OP_Code {
  constructor() {
    super(
      "OP_CAT",
      126,
      "0x7e",
      "Concatenates two strings. Removes the top two stack items."
    );
  }
  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 2;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_CAT");
    }
    let a = stack.pop();
    let b = stack.pop();
    if (!a || !b) {
      throw new Error("ScriptData object is undefined");
    }
    const firstItem = a.dataBytes;
    const secondItem = b.dataBytes;
    let concatenated = new Uint8Array(firstItem.length + secondItem.length);
    concatenated.set(secondItem, 0);
    concatenated.set(firstItem, secondItem.length);

    let result = ScriptData.fromBytes(concatenated);
    stack.push(result);
    return [stack, [result], toRemove];
  }
}

class OP_ROT extends OP_Code {
  constructor() {
    super(
      "OP_ROT",
      123,
      "0x7b",
      "The top three items on the stack are rotated."
    );
  }
  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 3;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_ROT");
    }
    let a = stack.pop();
    let b = stack.pop();
    let c = stack.pop();
    if (!a || !b || !c) {
      throw new Error("ScriptData object is undefined");
    }
    if (
      !a ||
      !b ||
      !c ||
      a.dataNumber === undefined ||
      b.dataNumber === undefined ||
      c.dataNumber === undefined
    ) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }

    const resultA = ScriptData.fromNumber(a.dataNumber);
    const resultB = ScriptData.fromNumber(b.dataNumber);
    const resultC = ScriptData.fromNumber(c.dataNumber);

    stack.push(resultA);
    stack.push(resultB);
    stack.push(resultC);
    return [stack, [], toRemove];
  }
}

//////////////////////
// Math operations ///
//////////////////////
class OP_ADD extends OP_Code {
  constructor() {
    super("OP_ADD", 147, "0x93", "Adds the top two stack items.");
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 2;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_ADD");
    }
    let a = stack.pop();
    let b = stack.pop();
    if (!a || !b || a.dataNumber === undefined || b.dataNumber === undefined) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }
    let result = ScriptData.fromNumber(a.dataNumber + b.dataNumber);
    stack.push(result);
    return [stack, [result], toRemove];
  }
}

class OP_1ADD extends OP_Code {
  constructor() {
    super("OP_1ADD", 139, "0x8b", "Increments the top item of the stack by 1.");
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 1;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_1ADD");
    }
    let a = stack.pop();
    if (!a || a.dataNumber === undefined) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }
    let result = ScriptData.fromNumber(a.dataNumber + 1);
    stack.push(result);
    return [stack, [result], toRemove];
  }
}

class OP_1SUB extends OP_Code {
  constructor() {
    super("OP_1SUB", 140, "0x8c", "Decrements the top item of the stack by 1.");
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 1;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_1SUB");
    }
    let a = stack.pop();
    if (!a || a.dataNumber === undefined) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }
    let result = ScriptData.fromNumber(a.dataNumber - 1);
    stack.push(result);
    return [stack, [result], toRemove];
  }
}

class OP_NEGATE extends OP_Code {
  constructor() {
    super("OP_NEGATE", 143, "0x8f", "Negates the top item of the stack.");
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 1;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_NEGATE");
    }
    let a = stack.pop();
    if (!a || a.dataNumber === undefined) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }
    let result = ScriptData.fromNumber(a.dataNumber * -1);
    stack.push(result);
    return [stack, [result], toRemove];
  }
}

class OP_ABS extends OP_Code {
  constructor() {
    super(
      "OP_ABS",
      144,
      "0x90",
      "Absolute value of the top item of the stack."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 1;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_ABS");
    }
    let a = stack.pop();
    if (!a || a.dataNumber === undefined) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }
    let result = ScriptData.fromNumber(Math.abs(a.dataNumber));
    stack.push(result);
    return [stack, [result], toRemove];
  }
}

class OP_NOT extends OP_Code {
  constructor() {
    super("OP_NOT", 145, "0x91", "Logical NOT of the top item of the stack.");
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 1;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_NOT");
    }
    let a = stack.pop();
    if (!a || a.dataNumber === undefined) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }
    let result = ScriptData.fromNumber(a.dataNumber != 0 ? 0 : 1);
    stack.push(result);
    return [stack, [result], toRemove];
  }
}

class OP_0NOTEQUAL extends OP_Code {
  constructor() {
    super(
      "OP_0NOTEQUAL",
      146,
      "0x92",
      "Checks if the top item of the stack is not 0."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 1;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_0NOTEQUAL");
    }
    let a = stack.pop();
    if (!a || a.dataNumber === undefined) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }
    let result = ScriptData.fromNumber(a.dataNumber != 0 ? 1 : 0);
    stack.push(result);
    return [stack, [result], toRemove];
  }
}

class OP_SUB extends OP_Code {
  constructor() {
    super(
      "OP_SUB",
      148,
      "0x94",
      "Subtracts the second item from the top item of the stack."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 2;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_SUB");
    }
    let a = stack.pop();
    let b = stack.pop();
    if (!a || !b || a.dataNumber === undefined || b.dataNumber === undefined) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }
    let result = ScriptData.fromNumber(a.dataNumber - b.dataNumber);
    stack.push(result);
    return [stack, [result], toRemove];
  }
}

class OP_MAX extends OP_Code {
  constructor() {
    super(
      "OP_MAX",
      164,
      "0xa4",
      "Pushes the larger of the top two items on the stack onto the stack."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 2;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_MAX");
    }
    let a = stack.pop();
    let b = stack.pop();
    if (!a || !b || a.dataNumber === undefined || b.dataNumber === undefined) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }
    let max = Math.max(a.dataNumber, b.dataNumber);
    let result = ScriptData.fromNumber(max);
    stack.push(result);
    return [stack, [result], toRemove];
  }
}

class OP_MIN extends OP_Code {
  constructor() {
    super(
      "OP_MIN",
      163,
      "0xa3",
      "Pushes the smaller of the top two items on the stack onto the stack."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 2;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_MIN");
    }
    let a = stack.pop();
    let b = stack.pop();
    if (!a || !b || a.dataNumber === undefined || b.dataNumber === undefined) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }
    let min = Math.min(a.dataNumber, b.dataNumber);
    let result = ScriptData.fromNumber(min);
    stack.push(result);
    return [stack, [result], toRemove];
  }
}

class OP_BOOLAND extends OP_Code {
  constructor() {
    super("OP_BOOLAND", 154, "0x9a", "Logical AND of the top two stack items.");
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 2;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_BOOLAND");
    }
    let a = stack.pop();
    let b = stack.pop();

    if (!a || !b || a.dataNumber === undefined || b.dataNumber === undefined) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }

    let result = ScriptData.fromNumber(
      a.dataNumber !== 0 && b.dataNumber !== 0 ? 1 : 0
    );
    stack.push(result);
    return [stack, [result], toRemove];
  }
}

class OP_BOOLOR extends OP_Code {
  constructor() {
    super("OP_BOOLOR", 155, "0x9b", "Logical OR of the top two stack items.");
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 2;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_BOOLOR");
    }
    let a = stack.pop();
    let b = stack.pop();

    if (!a || !b || a.dataNumber === undefined || b.dataNumber === undefined) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }

    let result = ScriptData.fromNumber(
      a.dataNumber !== 0 || b.dataNumber !== 0 ? 1 : 0
    );
    stack.push(result);
    return [stack, [result], toRemove];
  }
}

class OP_NUMEQUAL extends OP_Code {
  constructor() {
    super(
      "OP_NUMEQUAL",
      156,
      "0x9c",
      "Compares the top two items of the stack for equality."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 2;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_NUMEQUAL");
    }
    let a = stack.pop();
    let b = stack.pop();

    if (!a || !b || a.dataNumber === undefined || b.dataNumber === undefined) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }

    let result = ScriptData.fromNumber(a.dataNumber === b.dataNumber ? 1 : 0);
    stack.push(result);
    return [stack, [result], toRemove];
  }
}

class OP_NUMEQUALVERIFY extends OP_Code {
  constructor() {
    super(
      "OP_NUMEQUALVERIFY",
      157,
      "0x9d",
      "Same as numequal, but stops executing if false."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 2;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_NUMEQUALVERIFY");
    }
    let a = stack.pop();
    let b = stack.pop();
    if (!a || !b || a.dataNumber === undefined || b.dataNumber === undefined) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }
    if (a.dataNumber !== b.dataNumber) {
      throw new Error(
        "Script execution failed - OP_NUMEQUALVERIFY condition not met"
      );
    }
    return [stack, [], toRemove];
  }
}

class OP_NUMNOTEQUAL extends OP_Code {
  constructor() {
    super(
      "OP_NUMNOTEQUAL",
      158,
      "0x9e",
      "Compares the top two items of the stack for inequality."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 2;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_NUMNOTEQUAL");
    }
    let a = stack.pop();
    let b = stack.pop();
    if (!a || !b || a.dataNumber === undefined || b.dataNumber === undefined) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }
    let result = ScriptData.fromNumber(a.dataNumber !== b.dataNumber ? 1 : 0);
    stack.push(result);
    return [stack, [result], toRemove];
  }
}

class OP_LESSTHAN extends OP_Code {
  constructor() {
    super(
      "OP_LESSTHAN",
      159,
      "0x9f",
      "Checks if the second item is less than the top item of the stack."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 2;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_LESSTHAN");
    }
    let a = stack.pop();
    let b = stack.pop();
    if (!a || !b || a.dataNumber === undefined || b.dataNumber === undefined) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }
    let result = ScriptData.fromNumber(b.dataNumber < a.dataNumber ? 1 : 0);
    stack.push(result);
    return [stack, [result], toRemove];
  }
}

class OP_GREATERTHAN extends OP_Code {
  constructor() {
    super(
      "OP_GREATERTHAN",
      160,
      "0xa0",
      "Checks if the second item is greater than the top item of the stack."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 2;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_GREATERTHAN");
    }
    let a = stack.pop();
    let b = stack.pop();
    if (!a || !b || a.dataNumber === undefined || b.dataNumber === undefined) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }
    let result = ScriptData.fromNumber(b.dataNumber > a.dataNumber ? 1 : 0);
    stack.push(result);
    return [stack, [result], toRemove];
  }
}

class OP_LESSTHANOREQUAL extends OP_Code {
  constructor() {
    super(
      "OP_LESSTHANOREQUAL",
      161,
      "0xa1",
      "Checks if the second item is less than or equal to the top item of the stack."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 2;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_LESSTHANOREQUAL");
    }
    let a = stack.pop();
    let b = stack.pop();
    if (!a || !b || a.dataNumber === undefined || b.dataNumber === undefined) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }
    let result = ScriptData.fromNumber(b.dataNumber <= a.dataNumber ? 1 : 0);
    stack.push(result);
    return [stack, [result], toRemove];
  }
}

class OP_GREATERTHANOREQUAL extends OP_Code {
  constructor() {
    super(
      "OP_GREATERTHANOREQUAL",
      162,
      "0xa2",
      "Checks if the second item is greater than or equal to the top item of the stack."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 2;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_GREATERTHANOREQUAL");
    }
    let a = stack.pop();
    let b = stack.pop();
    if (!a || !b || a.dataNumber === undefined || b.dataNumber === undefined) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }
    let result = ScriptData.fromNumber(b.dataNumber >= a.dataNumber ? 1 : 0);
    stack.push(result);
    return [stack, [result], toRemove];
  }
}

class OP_WITHIN extends OP_Code {
  constructor() {
    super(
      "OP_WITHIN",
      165,
      "0xa5",
      "Checks if the third item is within the interval defined by the top two items of the stack (inclusive)."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 3;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_WITHIN");
    }
    let c = stack[stack.length - 3];
    let b = stack[stack.length - 2];
    let a = stack[stack.length - 1];
    if (
      !a ||
      !b ||
      !c ||
      a.dataNumber === undefined ||
      b.dataNumber === undefined ||
      c.dataNumber === undefined
    ) {
      throw new Error("ScriptData object or dataNumber field is undefined");
    }
    stack.pop();
    stack.pop();
    stack.pop();
    let result = ScriptData.fromNumber(
      c.dataNumber >= b.dataNumber && c.dataNumber <= a.dataNumber ? 1 : 0
    );
    stack.push(result);
    return [stack, [result], toRemove];
  }
}

////////////////////////
// Crypto Operations ///
////////////////////////

// This expects a string input, not a hex string
class OP_RIPEMD160 extends OP_Code {
  constructor() {
    super(
      "OP_RIPEMD160",
      166,
      "0xa6",
      "Input is hashed using the RIPEMD-160 hashing algorithm."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let a = stack.pop();
    if (!a) {
      throw new Error("Invalid stack size for OP_RIPEMD160");
    }

    let ripemd160Hash = CryptoJS.RIPEMD160(CryptoJS.enc.Hex.parse(a.dataHex));

    // Create a new ScriptData object and push it back to the stack
    let result = ScriptData.fromHex(ripemd160Hash.toString());
    stack.push(result);
    return [stack, [result], 1];
  }
}

class OP_SHA1 extends OP_Code {
  constructor() {
    super(
      "OP_SHA1",
      167,
      "0xa7",
      "Input is hashed using the SHA1 hashing algorithm."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let a = stack.pop();
    if (!a) {
      throw new Error("Invalid stack size for OP_SHA1");
    }

    let sha1Hash = CryptoJS.SHA1(CryptoJS.enc.Hex.parse(a.dataHex));

    // Create a new ScriptData object and push it back to the stack
    let result = ScriptData.fromHex(sha1Hash.toString());
    stack.push(result);
    return [stack, [result], 1];
  }
}

class OP_SHA256 extends OP_Code {
  constructor() {
    super(
      "OP_SHA256",
      168,
      "0xa8",
      "Input is hashed using the SHA256 hashing algorithm."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let a = stack.pop();
    if (!a) {
      throw new Error("Invalid stack size for OP_SHA256");
    }

    let sha256Hash = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(a.dataHex));

    // Create a new ScriptData object and push it back to the stack
    let result = ScriptData.fromHex(sha256Hash.toString());
    stack.push(result);
    return [stack, [result], 1];
  }
}

class OP_HASH160 extends OP_Code {
  constructor() {
    super(
      "OP_HASH160",
      169,
      "0xa9",
      "Input is hashed twice. First with SHA256 then with RIPEMD-160."
    );
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let a = stack.pop();
    if (!a) {
      throw new Error("Invalid stack size for OP_HASH160");
    }
    let sha256Hash = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(a.dataHex));
    let ripemd160Hash = CryptoJS.RIPEMD160(sha256Hash);

    // Create a new ScriptData object and push it back to the stack
    let result = ScriptData.fromHex(ripemd160Hash.toString());
    stack.push(result);
    return [stack, [result], 1];
  }
}

class OP_HASH256 extends OP_Code {
  constructor() {
    super("OP_HASH256", 170, "0xaa", "Input is hashed twice with SHA256.");
  }

  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let a = stack.pop();
    if (!a) {
      throw new Error("Invalid stack size for OP_HASH256");
    }

    let hash = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(a.dataHex));
    hash = CryptoJS.SHA256(hash);
    let result = ScriptData.fromHex(hash.toString());
    stack.push(result);
    return [stack, [result], 1];
  }
}

/////////////////////
// Sig Operations ///
/////////////////////

class OP_CHECKSIG extends OP_Code {
  constructor() {
    super(
      "OP_CHECKSIG",
      172,
      "0xac",
      "Verifies a cryptographic signature against a public key and a message."
    );
  }

  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 2;
    if (stack.length < toRemove) {
      throw new Error("Invalid stack size for OP_CHECKSIG");
    }
    let a = stack.pop();
    let b = stack.pop();
    if (!a || !b || a.dataHex === undefined || b.dataHex === undefined) {
      throw new Error("ScriptData object or dataHex field is undefined");
    }
    // TODO: signature validation (i.e length of 71 + 1 byte for sighash)
    // TODO: public key validation (i.e. length of 33 or 65 bytes)

    let hash = CryptoJS.SHA256(a.dataString!).toString();
    hash = CryptoJS.SHA256(hash).toString();
    let result = ScriptData.fromString(hash);
    stack.push(result);
    return [stack, [result], 1];
  }
}

class OP_CHECKSIGVERIFY extends OP_Code {
  constructor() {
    super(
      "OP_CHECKSIGVERIFY",
      173,
      "0xad",
      "Same as OP_CHECKSIG, but OP_VERIFY is executed afterward."
    );
  }

  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let [stack_, data, num] = new OP_CHECKSIG().execute(stack, txData);
    if (data.length < 1) {
      throw new Error("Invalid stack size for OP_CHECKSIGVERIFY");
    }
    if (data[0].dataHex !== "01") {
      throw new Error("OP_CHECKSIGVERIFY failed");
    }
    return [stack_, data, num];
  }
}

class OP_CHECKMULTISIG extends OP_Code {
  constructor() {
    super(
      "OP_CHECKMULTISIG",
      174,
      "0xae",
      "Verifies multiple ECDSA signatures."
    );
  }

  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let [stack_, data, num] = new OP_CHECKSIG().execute(stack, txData);
    if (data.length < 1) {
      throw new Error("Invalid stack size for OP_CHECKSIGVERIFY");
    }
    // TODO
    // Figure out how to handle multiple signatures
    if (data[0].dataHex !== "01") {
      throw new Error("OP_CHECKSIGVERIFY failed");
    }
    return [stack_, data, num];
  }
}

class OP_1 extends OP_Code {
  constructor() {
    super("OP_1", 81, "0x51", "The number 1 is pushed onto the stack.");
  }

  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let result = ScriptData.fromNumber(1);
    stack.push(result);
    return [stack, [result], 0];
  }
}

class OP_2 extends OP_Code {
  constructor() {
    super("OP_2", 82, "0x52", "The number 2 is pushed onto the stack.");
  }

  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let result = ScriptData.fromNumber(2);
    stack.push(result);
    return [stack, [result], 0];
  }
}

class OP_3 extends OP_Code {
  constructor() {
    super("OP_3", 83, "0x53", "The number 3 is pushed onto the stack.");
  }

  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    let result = ScriptData.fromNumber(3);
    stack.push(result);
    return [stack, [result], 0];
  }
}

//////////////////////
// Push Operations ///
//////////////////////

class OP_PUSH1 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH1",
      1,
      "0x01",
      "Prepares to push 1-byte worth of data to the stack."
    );
  }

  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSH2 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH2",
      1,
      "0x02",
      "Prepares to push 2-byte worth of data to the stack."
    );
  }

  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

// write OP_PUSH3 - OP_PUSH75
class OP_PUSH3 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH3",
      1,
      "0x03",
      "Prepares to push 3-byte worth of data to the stack."
    );
  }

  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSH4 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH4",
      1,
      "0x04",
      "Prepares to push 4-byte worth of data to the stack."
    );
  }

  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSH5 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH5",
      1,
      "0x05",
      "Prepares to push 5-byte worth of data to the stack."
    );
  }

  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSH6 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH6",
      1,
      "0x06",
      "Prepares to push 6-byte worth of data to the stack."
    );
  }

  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

// write the rest of the push operations
class OP_PUSH7 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH7",
      1,
      "0x07",
      "Prepares to push 7-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}
class OP_PUSH8 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH8",
      1,
      "0x08",
      "Prepares to push 8-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}
class OP_PUSH9 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH9",
      1,
      "0x09",
      "Prepares to push 9-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}
class OP_PUSH10 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH10",
      1,
      "0x0a",
      "Prepares to push 10-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}
class OP_PUSH11 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH11",
      1,
      "0x0b",
      "Prepares to push 11-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSH12 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH12",
      1,
      "0x0c",
      "Prepares to push 12-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}
class OP_PUSH13 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH13",
      1,
      "0x0d",
      "Prepares to push 13-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSH14 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH14",
      1,
      "0x0e",
      "Prepares to push 14-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSH15 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH15",
      1,
      "0x0f",
      "Prepares to push 15-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSH16 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH16",
      1,
      "0x10",
      "Prepares to push 16-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

// write OP_PUSH17 - OP_PUSH75
class OP_PUSH17 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH17",
      1,
      "0x11",
      "Prepares to push 17-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}
class OP_PUSH18 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH18",
      1,
      "0x12",
      "Prepares to push 18-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}
class OP_PUSH19 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH19",
      1,
      "0x13",
      "Prepares to push 19-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}
class OP_PUSH20 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH20",
      1,
      "0x14",
      "Prepares to push 20-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

// add ops OP_PUSH20 - OP_PUSH33
class OP_PUSH21 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH21",
      1,
      "0x15",
      "Prepares to push 21-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}
class OP_PUSH22 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH22",
      1,
      "0x16",
      "Prepares to push 22-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSH23 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH23",
      1,
      "0x17",
      "Prepares to push 23-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}
class OP_PUSH24 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH24",
      1,
      "0x18",
      "Prepares to push 24-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}
class OP_PUSH25 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH25",
      1,
      "0x19",
      "Prepares to push 25-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSH26 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH26",
      1,
      "0x1a",
      "Prepares to push 26-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSH27 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH27",
      1,
      "0x1b",
      "Prepares to push 27-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSH28 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH28",
      1,
      "0x1c",
      "Prepares to push 28-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSH29 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH29",
      1,
      "0x1d",
      "Prepares to push 29-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSH30 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH30",
      1,
      "0x1e",
      "Prepares to push 30-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSH31 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH31",
      1,
      "0x1f",
      "Prepares to push 31-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSH32 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH32",
      1,
      "0x20",
      "Prepares to push 32-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSH33 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH33",
      1,
      "0x21",
      "Prepares to push 33-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSH64 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH64",
      1,
      "0x40",
      "Prepares to push 64-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSH71 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH71",
      1,
      "0x47",
      "Prepares to push 71-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSH72 extends OP_Code {
  constructor() {
    super(
      "OP_PUSH72",
      1,
      "0x48",
      "Prepares to push 72-byte worth of data to the stack."
    );
  }
  execute(
    stack: Array<ScriptData>
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

class OP_PUSHDATA1 extends OP_Code {
  constructor() {
    super(
      "OP_PUSHDATA1",
      76,
      "0x4c",
      "Push data flag that signals that the next byte is meant to communicate length of upcoming data."
    );
  }

  execute(
    stack: Array<ScriptData>,
    txData: TxData
  ): [Array<ScriptData>, Array<ScriptData>, number] {
    return [stack, [], 0];
  }
}

new OP_ROT();
new OP_CAT();
new OP_ADD();
new OP_SWAP();
new OP_IF();
new OP_ELSE();
new OP_ENDIF();
new OP_IFDUP();
new OP_DEPTH();
new OP_DROP();
new OP_DUP();
new OP_NIP();
new OP_OVER();
new OP_EQUAL();
new OP_EQUALVERIFY();
new OP_MAX();
new OP_MIN();
new OP_RETURN();
new OP_SIZE();
new OP_1ADD();
new OP_1SUB();
new OP_NEGATE();
new OP_ABS();
new OP_NOT();
new OP_0NOTEQUAL();
new OP_SUB();
new OP_BOOLAND();
new OP_BOOLOR();
new OP_NUMEQUAL();
new OP_NUMEQUALVERIFY();
new OP_NUMNOTEQUAL();
new OP_LESSTHAN();
new OP_GREATERTHAN();
new OP_LESSTHANOREQUAL();
new OP_GREATERTHANOREQUAL();
new OP_WITHIN();
new OP_RIPEMD160();
new OP_SHA1();
new OP_SHA256();
new OP_HASH160();
new OP_HASH256();
new OP_CHECKSIG();
new OP_CHECKSIGVERIFY();
new OP_CHECKMULTISIG();
new OP_1();
new OP_PUSH1();
new OP_PUSH2();
new OP_PUSHDATA1();
new OP_PUSH3();
new OP_PUSH4();
new OP_PUSH5();
new OP_PUSH6();
new OP_PUSH7();
new OP_PUSH8();
new OP_PUSH9();
new OP_PUSH10();
new OP_PUSH11();
new OP_PUSH12();
new OP_PUSH13();
new OP_PUSH14();
new OP_PUSH15();
new OP_PUSH16();
new OP_PUSH17();
new OP_PUSH18();
new OP_PUSH19();
new OP_PUSH20();
new OP_PUSH21();
new OP_PUSH22();
new OP_PUSH23();
new OP_PUSH24();
new OP_PUSH25();
new OP_PUSH26();
new OP_PUSH27();
new OP_PUSH28();
new OP_PUSH29();
new OP_PUSH30();
new OP_PUSH31();
new OP_PUSH32();
new OP_PUSH33();
new OP_PUSH64();
new OP_PUSH71();
new OP_PUSH72();

export const ALL_OPS = [
  new OP_ADD(),
  new OP_SWAP(),
  new OP_IF(),
  new OP_ELSE(),
  new OP_ENDIF(),
  new OP_IFDUP(),
  new OP_DEPTH(),
  new OP_DROP(),
  new OP_DUP(),
  new OP_NIP(),
  new OP_OVER(),
  new OP_EQUAL(),
  new OP_EQUALVERIFY(),
  new OP_MAX(),
  new OP_MIN(),
  new OP_RETURN(),
  new OP_SIZE(),
  new OP_1ADD(),
  new OP_1SUB(),
  new OP_NEGATE(),
  new OP_ABS(),
  new OP_NOT(),
  new OP_0NOTEQUAL(),
  new OP_SUB(),
  new OP_BOOLAND(),
  new OP_BOOLOR(),
  new OP_NUMEQUAL(),
  new OP_NUMEQUALVERIFY(),
  new OP_NUMNOTEQUAL(),
  new OP_LESSTHAN(),
  new OP_GREATERTHAN(),
  new OP_LESSTHANOREQUAL(),
  new OP_GREATERTHANOREQUAL(),
  new OP_WITHIN(),
  new OP_RIPEMD160(),
  new OP_SHA1(),
  new OP_SHA256(),
  new OP_HASH160(),
  new OP_HASH256(),
  new OP_CHECKSIG(),
  new OP_1(),
  new OP_2(),
  new OP_3(),
  new OP_PUSH1(),
  new OP_PUSH2(),
  new OP_PUSHDATA1(),
  new OP_PUSH4(),
  new OP_PUSH5(),
  new OP_PUSH6(),
  new OP_PUSH7(),
  new OP_PUSH8(),
  new OP_PUSH9(),
  new OP_PUSH10(),
  new OP_PUSH11(),
  new OP_PUSH12(),
  new OP_PUSH13(),
  new OP_PUSH14(),
  new OP_PUSH15(),
  new OP_PUSH16(),
  new OP_PUSH17(),
  new OP_PUSH18(),
  new OP_PUSH19(),
  new OP_PUSH20(),
  new OP_PUSH21(),
  new OP_PUSH22(),
  new OP_PUSH23(),
  new OP_PUSH24(),
  new OP_PUSH25(),
  new OP_PUSH26(),
  new OP_PUSH27(),
  new OP_PUSH28(),
  new OP_PUSH29(),
  new OP_PUSH30(),
  new OP_PUSH31(),
  new OP_PUSH32(),
  new OP_PUSH33(),
  new OP_PUSH64(),
  new OP_PUSH71(),
  new OP_PUSH72(),
  new OP_CAT(),
  new OP_ROT(),
];

export function getOpcodeByHex(
  hex: string
): { name: string; number: number; description: string } | null {
  const dec = parseInt(hex, 16);

  if (dec < 98) {
    return {
      name: "OP_" + dec,
      number: dec,
      description:
        "The following data item being pushed to the stack is " +
        dec +
        " bytes.",
    };
  } else {
    if (!hex.startsWith("0x")) {
      hex = "0x" + hex;
    }
    // Use the values of the opCodeMap to find the opcode by hex
    const opCodes = Object.values(OP_Code.opCodeMap);
    const foundOpCode = opCodes.find((opCode) => opCode.hex === hex);

    if (foundOpCode) {
      return {
        name: foundOpCode.name,
        number: foundOpCode.number,
        description: foundOpCode.description,
      };
    }
  }

  // Return null if no opcode is found with the given hex
  return null;
}

export function makePushOPBiggerThan4b(hex: string): {
  name: string;
  number: number;
  description: string;
} {
  const dec = parseInt(hex, 16);

  return {
    name: "OP_" + dec,
    number: dec,
    description:
      "The following data item being pushed to the stack is " + dec + " bytes.",
  };
}
