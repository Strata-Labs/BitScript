import { createHash } from "crypto";

import { ScriptData } from "./scriptdata";
import * as CryptoJS from "crypto-js";

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
    stack: Array<ScriptData>
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
    super("OP_ENDIF", 101, "0x65", "Ends an if/else block.");
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
    stack.push(new ScriptData(depth));
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
    stack.push(new ScriptData(a.dataNumber === b.dataNumber ? 1 : 0));
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
    let a = stack[stack.length-1];
    let b = stack[stack.length-2];
    if (!a || !b) {
      throw new Error("ScriptData object is undefined");
    }
    if (a.dataBytes !== b.dataBytes) {
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
    stack.push(new ScriptData(size));
    return [stack, [new ScriptData(size)], toRemove];
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
    let result = new ScriptData(a.dataNumber + b.dataNumber);
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
    let result = new ScriptData(a.dataNumber + 1);
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
    let result = new ScriptData(a.dataNumber - 1);
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
    let result = new ScriptData(-a.dataNumber);
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
    let result = new ScriptData(Math.abs(a.dataNumber));
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
    let result = new ScriptData(!a.dataNumber ? 1 : 0);
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
    let result = new ScriptData(a.dataNumber != 0 ? 1 : 0);
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
    let result = new ScriptData(a.dataNumber - b.dataNumber);
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
    stack.push(new ScriptData(max));
    return [stack, [new ScriptData(max)], toRemove];
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
    stack.push(new ScriptData(min));
    return [stack, [new ScriptData(min)], toRemove];
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

    let result = new ScriptData(
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

    let result = new ScriptData(
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

    let result = new ScriptData(a.dataNumber === b.dataNumber ? 1 : 0);
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
    let result = new ScriptData(a.dataNumber !== b.dataNumber ? 1 : 0);
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
    let result = new ScriptData(b.dataNumber < a.dataNumber ? 1 : 0);
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
    let result = new ScriptData(b.dataNumber > a.dataNumber ? 1 : 0);
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
    let result = new ScriptData(b.dataNumber <= a.dataNumber ? 1 : 0);
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
    let result = new ScriptData(b.dataNumber >= a.dataNumber ? 1 : 0);
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
    let result = new ScriptData(
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

    let hash = CryptoJS.RIPEMD160(a.dataString!).toString(); // use dataString instead of dataHex
    let result = new ScriptData(hash);
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

    let hash = CryptoJS.SHA1(a.dataString!).toString();
    let result = new ScriptData(hash);
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

    let hash = CryptoJS.SHA256(a.dataString!).toString();
    let result = new ScriptData(hash);
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
      
    let sha256Hash = CryptoJS.SHA256(a.dataString!);
    let ripemd160Hash = CryptoJS.RIPEMD160(sha256Hash).toString();

    // Create a new ScriptData object and push it back to the stack
    let result = new ScriptData(ripemd160Hash);
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

    let hash = CryptoJS.SHA256(a.dataString!).toString();
    hash = CryptoJS.SHA256(hash).toString();
    let result = new ScriptData(hash);
    stack.push(result);
    return [stack, [result], 1];
  }
}



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
