import { OP_Code } from './op_code';

export class ScriptData {
    private _dataBytes: Uint8Array = new Uint8Array(0);

    private constructor() { }

    static fromBinaryString(binary: string): ScriptData {
        const instance = new ScriptData();
        const bytes = Uint8Array.from(binary.match(/.{1,8}/g)!.map(byte => parseInt(byte, 2)));
        instance._dataBytes = bytes;
        return instance;
    }

    static fromHex(hex: string): ScriptData {
        const instance = new ScriptData();
        const matches = hex.match(/.{1,2}/g);
        if (matches) {
            const bytes = new Uint8Array(matches.map(byte => parseInt(byte, 16)));
            instance._dataBytes = bytes;
        } else {
            throw new Error("Invalid hexadecimal input");
        }
        return instance;
    }

    static fromNumber(num: number): ScriptData {
        const instance = new ScriptData();
        const buffer = new ArrayBuffer(4);
        new DataView(buffer).setUint32(0, num, false);
        instance._dataBytes = new Uint8Array(buffer);
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
                    .map(b => b.toString(2).padStart(8, '0'))
                    .join('');
    }

    get dataHex(): string {
        return Array.from(this._dataBytes)
                    .map(b => b.toString(16).padStart(2, '0'))
                    .join('');
    }

    get dataBytes(): Uint8Array {
        return this._dataBytes;
    }

    get dataNumber(): number | undefined {
        if (this._dataBytes.byteLength <= 4) {
            const buffer = new ArrayBuffer(4);
            const view = new DataView(buffer);
            this._dataBytes.forEach((byte, index) => {
                view.setUint8(index, byte);
            });
            return view.getUint32(0);
        }
        // if the dataBytes is longer than 4 bytes, we can't convert it to a number easily
        return undefined;
    }
    
    get dataString(): string | undefined {
        return new TextDecoder().decode(this._dataBytes);
    }
    
}
