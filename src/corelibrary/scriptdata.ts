import { OP_Code } from "./op_code";

export class ScriptData {
  private _dataBytes: Uint8Array = new Uint8Array(0);

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
    if (num < 0 || num > 255) {
      throw new Error("Number out of byte range (0-255)");
    }
    const instance = new ScriptData();
    instance._dataBytes = new Uint8Array([num]);
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
    if (this._dataBytes.byteLength === 1) {
      // If the dataBytes contains only one byte, return its integer value.
      return this._dataBytes[0];
    } else if (this._dataBytes.byteLength <= 4) {
      // If the dataBytes contains between 2 and 4 bytes, create a little-endian view.
      const buffer = new ArrayBuffer(4);
      const view = new DataView(buffer);

      // Set the bytes in little-endian order.
      for (let i = 0; i < this._dataBytes.byteLength; i++) {
        view.setUint8(i, this._dataBytes[i]);
      }

      // Return the 32-bit integer value.
      return view.getInt32(0, true);
    }

    // If the dataBytes is longer than 4 bytes, we can't convert it to a number easily.
    return undefined;
  }

  get dataString(): string | undefined {
    return new TextDecoder().decode(this._dataBytes);
  }
}
