import { ScriptData } from "./scriptdata";

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

  execute(stack: Array<ScriptData>): [Array<ScriptData>, Array<ScriptData>, number] {
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

class OP_ADD extends OP_Code {
  constructor() {
    super("OP_ADD", 1, "0x01", "Adds the top two stack items.");
  }

  execute(stack: Array<ScriptData>): [Array<ScriptData>, Array<ScriptData>, number] {
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

class OP_SWAP extends OP_Code {
  constructor() {
    super("OP_SWAP", 2, "0x02", "Swaps the top two stack items.");
  }

  execute(stack: Array<ScriptData>): [Array<ScriptData>, Array<ScriptData>, number] {
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

  execute(stack: Array<ScriptData>): [Array<ScriptData>, Array<ScriptData>, number] {
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

  execute(stack: Array<ScriptData>): [Array<ScriptData>, Array<ScriptData>, number] {
    // We don't execute any changes to the stack within this method, we'll handle it externally in testScriptData
    // This is because the execution depends on other elements in the input sequence
    return [stack, [], 0];
  }
}

class OP_ENDIF extends OP_Code {
  constructor() {
    super("OP_ENDIF", 101, "0x65", "Ends an if/else block.");
  }

  execute(stack: Array<ScriptData>): [Array<ScriptData>, Array<ScriptData>, number] {
    // We don't execute any changes to the stack within this method, we'll handle it externally in testScriptData
    // This is because the execution depends on other elements in the input sequence
    return [stack, [], 0];
  }
}

class OP_IFDUP extends OP_Code {
  constructor() {
    super("OP_IFDUP", 115, "0x73", "If the top stack value is not 0, duplicate it.");
  }

  execute(stack: Array<ScriptData>): [Array<ScriptData>, Array<ScriptData>, number] {
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
    super("OP_DEPTH", 116, "0x74", "Puts the number of stack items onto the stack.");
  }

  execute(stack: Array<ScriptData>): [Array<ScriptData>, Array<ScriptData>, number] {
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

  execute(stack: Array<ScriptData>): [Array<ScriptData>, Array<ScriptData>, number] {
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

  execute(stack: Array<ScriptData>): [Array<ScriptData>, Array<ScriptData>, number] {
    let toRemove = 0;
    if (stack.length < 1) {
      throw new Error("Invalid stack size for OP_DUP");
    }
    let top = stack[stack.length - 1];
    stack.push(top);
    toRemove = 1;
    return [stack, [], toRemove];
  }
}

class OP_NIP extends OP_Code {
  constructor() {
    super("OP_NIP", 119, "0x77", "Removes the second-to-top stack item.");
  }

  execute(stack: Array<ScriptData>): [Array<ScriptData>, Array<ScriptData>, number] {
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
    super("OP_OVER", 120, "0x78", "Copies the second-to-top stack item to the top.");
  }

  execute(stack: Array<ScriptData>): [Array<ScriptData>, Array<ScriptData>, number] {
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
      super("OP_EQUAL", 135, "0x87", "Returns 1 if the inputs are exactly equal, 0 otherwise.");
    }
  
    execute(stack: Array<ScriptData>): [Array<ScriptData>, Array<ScriptData>, number] {
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
      super("OP_EQUALVERIFY", 136, "0x88", "Same as OP_EQUAL, but  doesn't push result & stops executing if false.");
    }
  
    execute(stack: Array<ScriptData>): [Array<ScriptData>, Array<ScriptData>, number] {
      let toRemove = 2;
      if (stack.length < toRemove) {
        throw new Error("Invalid stack size for OP_EQUALVERIFY");
      }
      let a = stack.pop();
      let b = stack.pop();
      if (!a || !b) {
        throw new Error("ScriptData object is undefined");
      }
      if(a.dataNumber !== b.dataNumber){
        throw new Error("OP_EQUALVERIFY failed. Values are not equal.");
      }
      // No push operation because OP_VERIFY removes the value if it is true.
      return [stack, [], toRemove];
    }
  }
  
  class OP_MAX extends OP_Code {
    constructor() {
      super("OP_MAX", 164, "0xa4", "Pushes the larger of the top two items on the stack onto the stack.");
    }
  
    execute(stack: Array<ScriptData>): [Array<ScriptData>, Array<ScriptData>, number] {
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
      super("OP_MIN", 163, "0xa3", "Pushes the smaller of the top two items on the stack onto the stack.");
    }
  
    execute(stack: Array<ScriptData>): [Array<ScriptData>, Array<ScriptData>, number] {
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
  
  class OP_RETURN extends OP_Code {
    constructor() {
      super("OP_RETURN", 106, "0x6a", "Marks the transaction as invalid and returns all of the script's remaining bytes as an error message.");
    }
  
    execute(stack: Array<ScriptData>): [Array<ScriptData>, Array<ScriptData>, number] {
      //OP_RETURN invalidates the script, so we don't need to do anything here
      throw new Error("OP_RETURN called. Transaction is invalid.");
    }
  }
  
  class OP_SIZE extends OP_Code {
    constructor() {
      super("OP_SIZE", 130, "0x82", "Pushes the string length of the top element of the stack (without popping it).");
    }
  
    execute(stack: Array<ScriptData>): [Array<ScriptData>, Array<ScriptData>, number] {
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
