// Import OpCode classes and objects
import { OP_Code} from './op_code';

// Define ScriptData class
export class ScriptData {
    dataBinary: ArrayBuffer = new ArrayBuffer(0);
    dataBytes: Uint8Array = new Uint8Array(0);
    dataHex: string = '';
    dataNumber?: number;
    dataString?: string;
    
    constructor(input: string | number | ArrayBuffer) {
        if (typeof input === 'string') {
            this.inputString(input);
        } else if (typeof input === 'number') {
            this.inputNumber(input);
        } else if (input instanceof ArrayBuffer) {
            this.inputBinary(input);
        }
    }

    clone(): ScriptData {
        let cloned = new ScriptData(0);
        
        if (this.dataBinary) {
          cloned.inputBinary(this.dataBinary.slice(0));
        }
        
        if (this.dataBytes) {
          cloned.inputBytes(new Uint8Array(this.dataBytes));
        }
    
        if (this.dataHex) {
          cloned.inputHex(this.dataHex);
        }
    
        if (this.dataNumber !== undefined) {
          cloned.inputNumber(this.dataNumber);
        }
    
        if (this.dataString) {
          cloned.inputString(this.dataString);
        }
    
        return cloned;
      }
    
    inputBinary(input: ArrayBuffer) {
        this.dataBinary = input;
        this.dataBytes = new Uint8Array(input);
        this.dataHex = Array.from(this.dataBytes).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    inputBytes(input: Uint8Array) {
        this.dataBinary = input.buffer;
        this.dataBytes = input;
        this.dataHex = Array.from(input).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    inputHex(input: string) {
        const matches = input.match(/.{1,2}/g);
        if (matches) {
            const bytes = new Uint8Array(matches.map(byte => parseInt(byte, 16)));
            this.inputBytes(bytes);
        } else {
            throw new Error("Invalid hexadecimal input");
        }
    }
    
    inputNumber(input: number) {
        this.dataBinary = new ArrayBuffer(4); 
        new DataView(this.dataBinary).setUint32(0, input, true);
        this.dataBytes = new Uint8Array(this.dataBinary);
        this.dataHex = Array.from(this.dataBytes).map(b => b.toString(16).padStart(2, '0')).join('');
        this.dataNumber = input;
    }
    
    inputString(input: string) {
        this.dataBytes = new TextEncoder().encode(input);
        this.dataBinary = this.dataBytes.buffer;
        this.dataHex = Array.from(this.dataBytes).map(b => b.toString(16).padStart(2, '0')).join('');
        this.dataString = input;
    }
}