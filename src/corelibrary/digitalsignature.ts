import axios from "axios";
import { } from "../deserialization/errors";
import {
  leToBe8,
  leToBe64,
} from "../deserialization/helpers";
import {
  TxInput,
  TxOutput,
} from "../deserialization/model";
import {  
} from "../deserialization/overlayValues";
import { TxTextSectionType } from "../comp/Transactions/Helper";
import {
  OP_Code,
  getOpcodeByHex,
  makePushOPBiggerThan4b,
} from "../corelibrary/op_code";
import * as CryptoJS from "crypto-js";
import { zeroByte, fetchSignedOutputItems } from "../deserialization/index";
import { ScriptData } from "./scriptdata"; 

// Create hashed transaction message h(m) = z
// Only SIGHASH_ALL is supported for now
async function createSignatureTransaction(
    inputIndex: number,
    version: string,
    inputCountLE: string,
    inputs: TxInput[],
    outputCountLE: string,
    outputs: TxOutput[],
    locktime: string,
    sighashFlag: string
  ): Promise<string> {
    let prehashedMessage = "";
    prehashedMessage += version;
    prehashedMessage += inputCountLE;
    console.log("input count from create signature message; " + inputCountLE);
    for (let i = 0; i < inputs.length; i++) {
      if (i == inputIndex) {
        prehashedMessage += inputs[i].txid;
        prehashedMessage += inputs[i].vout;
        const txIDBE = leToBe64(inputs[i].txid);
        const voutBE = leToBe8(inputs[i].vout);
        const signedOutPubKeyItems = await fetchSignedOutputItems(
          txIDBE,
          inputs[i].vout
        );
        prehashedMessage += signedOutPubKeyItems.selectedOutputPubKeyScriptSize;
        prehashedMessage += signedOutPubKeyItems.selectedOutputPubKeyScript;
        prehashedMessage += inputs[i].sequence;
      } else {
        prehashedMessage += inputs[i].txid;
        prehashedMessage += inputs[i].vout;
        prehashedMessage += zeroByte;
        prehashedMessage += inputs[i].sequence;
      }
    }
    prehashedMessage += outputCountLE;
    for (let i = 0; i < outputs.length; i++) {
      prehashedMessage += outputs[i].amountLE;
      prehashedMessage += outputs[i].pubKeySize;
      prehashedMessage += outputs[i].pubKeyScript;
    }
    prehashedMessage += locktime;
    prehashedMessage += sighashFlag;
    const hashedMessage = CryptoJS.SHA256(
      CryptoJS.SHA256(CryptoJS.enc.Hex.parse(prehashedMessage))
    );
    console.log(
      "hashed message from create signature message: " + hashedMessage.toString()
    );
    return hashedMessage.toString();
  }

// Convert From Point Format (r,s) to DER Format
// Convert From DER Format to Point Format (r,s)

// Create Digital Signature - Message
// Inputs required:
// Random Key (k) -> String (hex)
// Private Key (e) -> String (hex)
// Message (m) -> String
// Output: (r,s)

// Create Digital Signature - Transaction
// Inputs required:
// Random Key (k) -> String (hex)
// Private Key (e) -> String (hex)
// Message (m) -> String
// Output: (r,s)

//   function createSignatureMessage(message: string, privateKey: ScriptData): string {
//     const signature = CryptoJS.HmacSHA256(message, privateKey.toString());
//     console.log("signature from create signature message: " + signature.toString());
//     return signature.toString();
//   }