import { ScriptData } from "@/corelibrary/scriptdata";
import { TxData } from "@/corelibrary/stackstate";
import CryptoJS from "crypto-js";

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

////////////////////////
// Crypto Operations ///
////////////////////////

// This expects a string input, not a hex string
export class OP_RIPEMD160 extends OP_Code {
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
    let result = ScriptData.fromString(hash);
    stack.push(result);
    return [stack, [result], 1];
  }
}

export class OP_SHA1 extends OP_Code {
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
    let result = ScriptData.fromString(hash);
    stack.push(result);
    return [stack, [result], 1];
  }
}

export class OP_SHA256 extends OP_Code {
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
    let result = ScriptData.fromString(hash);
    stack.push(result);
    return [stack, [result], 1];
  }
}

export class OP_HASH160 extends OP_Code {
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
    let result = ScriptData.fromString(ripemd160Hash);
    stack.push(result);
    return [stack, [result], 1];
  }
}

export class OP_HASH256 extends OP_Code {
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

    let firstHash = CryptoJS.SHA256(a.dataString!);
    let secondHash = CryptoJS.SHA256(firstHash).toString();

    let result = ScriptData.fromString(secondHash);
    stack.push(result);
    return [stack, [result], 1];
  }
}
