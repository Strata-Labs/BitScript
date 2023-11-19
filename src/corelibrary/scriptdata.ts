import { OP_Code } from "./op_code";

export class ScriptData {
  public _dataBytes: Uint8Array = new Uint8Array(0);

  private constructor() {}

  static fromBinaryString(binary: string): ScriptData {
    const instance = new ScriptData();
    const bytes = Uint8Array.from(
      binary.match(/.{1,8}/g)!.map((byte) => parseInt(byte, 2))
    );
    instance._dataBytes = bytes;
    return instance;
  }

  static fromHex(hex: string): ScriptData {
    const instance = new ScriptData();

    // Remove "0x" prefix if it exists
    hex = hex.startsWith("0x") ? hex.slice(2) : hex;

    const matches = hex.match(/.{1,2}/g);
    if (matches) {
      const bytes = new Uint8Array(matches.map((byte) => parseInt(byte, 16)));
      instance._dataBytes = bytes;
    } else {
      throw new Error("Invalid hexadecimal input");
    }
    return instance;
  }

  static fromNumber(num: number): ScriptData {
    // console.log("fromNumber firing: " + num);
    // console.log("fromNumber firing uint8array: " + new Uint8Array([num]));
    // if (num < 0 || num > 255) {
    //   throw new Error("Number out of byte range (0-255)");
    // }
    const instance = new ScriptData();
    const test1000 = new ScriptData();
    test1000._dataBytes = new Uint8Array([3,232]);
    if (num > 0 && num < 255) {
      instance._dataBytes = new Uint8Array([num]);
    } else if (num > 255 && num < 65535) {
      console.log("test chatGPT solution: " + new Uint8Array([num >> 8, num & 0xff]));
      instance._dataBytes = new Uint8Array([num >> 8, num & 0xff]);
    }
    //instance._dataBytes = new Uint8Array([num]);
    
    console.log("fired from scriptdata fromNumber, instance is: " + instance._dataBytes);
    console.log("fired from scriptdata fromNumber, instance in Int is: " + instance.dataNumber);
    console.log("fired from scriptdata fromNumber, test1000 in Hex is: " + test1000.dataHex);
    console.log("fired from scriptdata fromNumber, test1000 in Int is: " + test1000.dataNumber);
    return instance;
  }

  static fromString(str: string): ScriptData {
    const instance = new ScriptData();
    instance._dataBytes = new TextEncoder().encode(str);
    return instance;
  }

  static fromBytes(bytes: Uint8Array): ScriptData {
    const instance = new ScriptData();
    instance._dataBytes = bytes;
    return instance;
  }

  clone(): ScriptData {
    return ScriptData.fromBytes(this._dataBytes);
  }

  get dataBinary(): string {
    return Array.from(this._dataBytes)
      .map((b) => b.toString(2).padStart(8, "0"))
      .join("");
  }

  get dataHex(): string {
    return Array.from(this._dataBytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  get dataBytes(): Uint8Array {
    return this._dataBytes;
  }

  get dataNumber(): number | undefined {
    if (this._dataBytes.byteLength <= 32) {
      return parseInt(this.dataHex, 16);
    }

    // If the dataBytes is longer than 4 bytes, we can't convert it to a number easily.
    return undefined;
  }

  get dataString(): string | undefined {
    return new TextDecoder().decode(this._dataBytes);
  }
}
