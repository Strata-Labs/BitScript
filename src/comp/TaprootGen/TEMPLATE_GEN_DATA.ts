import {
  OUTPUT_TYPE,
  SCRIPT_OUTPUT_TYPE,
  SCRIPT_SANDBOX_TYPE,
  TAG_TYPE,
} from "./TemplateOutputGen";

/*
 * FIRST COUPLE TEMPLATES
 */
const P2PKH_TEMPLATE: SCRIPT_OUTPUT_TYPE = {
  outputType: OUTPUT_TYPE.P2PKH,
  title: "P2PKH",
  tags: [
    {
      text: "legacy",
      type: TAG_TYPE.TEXT,
      link: null,
    },
    {
      text: "P2PKH",
      type: TAG_TYPE.LINK,
      link: "/scripts/p2pkh",
    },
  ],
  description: [
    "A Pay-to-Public-Key-Hash (P2PKH) script is a common type of Bitcoin transaction script that allows bitcoins to be sent to a specific Bitcoin address. The script locks the bitcoins to the hash of a public key, requiring a signature from the corresponding private key to spend them. When the bitcoins are spent, the spender provides a scriptSig that includes the public key & a valid signature.",
    "We already have our public key from before (423F...), so in order to complete our two-item ScriptSig/UnlockSig, seen to the right, we’ll need to provide a valid ECDSA (legacy) signature.",
  ],
  scriptInput: [
    {
      label: "Recipient Hashed Public Key",
      placeholder: "start typing a wallet like ‘Alice’...",
      scriptSandBoxInputName: "hashedPublicKey",
      required: true,
    },
  ],
  scriptSandbox: [
    {
      type: SCRIPT_SANDBOX_TYPE.COMMENT,
      id: 0,
      content: "# lockscript/scriptpubkey",
    },
    {
      type: SCRIPT_SANDBOX_TYPE.CODE,
      id: 1,
      content: "OP_DUP",
    },
    {
      type: SCRIPT_SANDBOX_TYPE.CODE,
      id: 2,
      content: "OP_HASH160",
    },
    {
      type: SCRIPT_SANDBOX_TYPE.INPUT_CODE,
      id: 3,
      content: "",
      label: "Hashed Public Key",
      scriptSandBoxInputName: "hashedPublicKey",
    },
    {
      type: SCRIPT_SANDBOX_TYPE.CODE,
      id: 4,
      content: "OP_EQUALVERIFY",
    },
    {
      type: SCRIPT_SANDBOX_TYPE.CODE,
      id: 5,
      content: "OP_CHECKSIG",
    },
  ],
};

export const SCRIPT_OUTPUT_TEMPLATES: SCRIPT_OUTPUT_TYPE[] = [P2PKH_TEMPLATE];
