import {
  OUTPUT_TYPE,
  SCRIPT_INPUT_VALIDATOR,
  SCRIPT_OUTPUT_TYPE,
  SCRIPT_SANDBOX_TYPE,
  TAG_TYPE,
} from "./types";
import { checkDecimalToHex } from "./utils/helpers";

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
  signature: [
    {
      text: "ECDSA",
      type: TAG_TYPE.TEXT,
      link: null,
    },
    {
      text: "SEGWIT",
      type: TAG_TYPE.TEXT,
      link: null,
    },
  ],

  description: [
    "A Pay-to-Public-Key-Hash (P2PKH) script is a common type of Bitcoin transaction script that allows bitcoins to be sent to a specific Bitcoin address. The script locks the bitcoins to the hash of a public key, requiring a signature from the corresponding private key to spend them. When the bitcoins are spent, the spender provides a scriptSig that includes the public key & a valid signature.",
  ],
  scriptInput: [
    {
      label: "Recipient Hashed Public Key",
      placeholder: "20-byte hash",
      scriptSandBoxInputName: "hashedPublicKey",
      required: true,
      validator: SCRIPT_INPUT_VALIDATOR.HEX,
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

const P2SH_TL_TEMPLATE: SCRIPT_OUTPUT_TYPE = {
  outputType: OUTPUT_TYPE.P2SH_TL,
  title: "P2SH(timelock)",
  tags: [
    {
      text: "legacy",
      type: TAG_TYPE.TEXT,
      link: null,
    },
    {
      text: "P2SH",
      type: TAG_TYPE.LINK,
      link: "/scripts/p2sh",
    },
  ],
  signature: [
    {
      text: "ECDSA",
      type: TAG_TYPE.TEXT,
      link: null,
    },
    {
      text: "SEGWIT",
      type: TAG_TYPE.TEXT,
      link: null,
    },
  ],

  description: [
    "A Pay-to-Script-Hash (timelock) script is a common type of Bitcoin legacy transaction that requires a certain block height *or* unix timestamp to pass before the transaction can be confirmed.O. As you can imagine, multisigs are a critical part of BitcoinBitcoin SegWit transaction that requires m of n signatures & public keys to consume the UTXO. As you can imagine, multisigs are a critical part of Bitcoin",
  ],
  scriptInput: [
    {
      label: "Time lock value",
      placeholder:
        "Lower than 500000000 processed as height, else unix timestamp",
      scriptSandBoxInputName: "timeLock",
      required: true,
    },
    {
      label: "Public key",
      placeholder: "33-byte Bitcoin public key | 32-byte Taproot public key",
      scriptSandBoxInputName: "publicKey",
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
      type: SCRIPT_SANDBOX_TYPE.INPUT_CODE,
      id: 1,
      content: "",
      label: "Time lock value",
      scriptSandBoxInputName: "timeLock",
    },
    {
      type: SCRIPT_SANDBOX_TYPE.CODE,
      id: 2,
      content: "OP_CHECKLOCKTIMEVERIFY",
    },
    {
      type: SCRIPT_SANDBOX_TYPE.CODE,
      id: 3,
      content: "OP_DROP",
    },
    {
      type: SCRIPT_SANDBOX_TYPE.INPUT_CODE,
      id: 4,
      content: "",
      label: "Public key",
      scriptSandBoxInputName: "publicKey",
    },
    {
      type: SCRIPT_SANDBOX_TYPE.CODE,
      id: 5,
      content: "OP_CHECKSIG",
    },
  ],
};

const P2SH_HL_TEMPLATE: SCRIPT_OUTPUT_TYPE = {
  outputType: OUTPUT_TYPE.P2SH_HL,
  title: "P2SH(hashlock)",
  tags: [
    {
      text: "legacy",
      type: TAG_TYPE.TEXT,
      link: null,
    },
    {
      text: "P2SH",
      type: TAG_TYPE.LINK,
      link: "/scripts/p2sh",
    },
  ],
  signature: [
    {
      text: "ECDSA",
      type: TAG_TYPE.TEXT,
      link: null,
    },
    {
      text: "SEGWIT",
      type: TAG_TYPE.TEXT,
      link: null,
    },
  ],

  description: [
    "A Pay-to-Script-Hash (timelock) script is a common type of Bitcoin legacy transaction that requires a certain block height *or* unix timestamp to pass before the transaction can be confirmed.O. As you can imagine, multisigs are a critical part of BitcoinBitcoin SegWit transaction that requires m of n signatures & public keys to consume the UTXO. As you can imagine, multisigs are a critical part of Bitcoin",
  ],
  scriptInput: [
    {
      label: "Hashed value",
      placeholder: "20-byte hash",
      scriptSandBoxInputName: "20-byte hash",
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
      type: SCRIPT_SANDBOX_TYPE.INPUT_CODE,
      id: 1,
      content: "",
      label: "Hash value",
      scriptSandBoxInputName: "20-byte hash",
    },
    {
      type: SCRIPT_SANDBOX_TYPE.CODE,
      id: 2,
      content: "OP_DROP",
    },
  ],
};
const P2WSH_MULTISIG_TEMPLATE: SCRIPT_OUTPUT_TYPE = {
  outputType: OUTPUT_TYPE.P2SH_MULTISIG,
  title: "P2WSH(multisig)",
  tags: [
    { text: "segwit", type: TAG_TYPE.TEXT, link: null },
    { text: "P2WSH", type: TAG_TYPE.LINK, link: "/scripts/p2wsh" },
  ],
  signature: [
    { text: "Schnorr", type: TAG_TYPE.TEXT, link: null },
    { text: "SEGWIT", type: TAG_TYPE.TEXT, link: null },
  ],
  description: [
    "A Pay-to-Witness-Script-Hash (P2WSH) multisig script is a type of Bitcoin SegWit transaction that requires m of n signatures to spend the funds. It embeds the multisig script in the witness program, reducing transaction weight and improving scalability. This script type is commonly used for multi-party control of funds and enhanced security.",
  ],
  scriptInput: [
    {
      label: "Number of required signatures (m)",
      placeholder: "M signatures",
      scriptSandBoxInputName: "requiredSignatures",
      required: true,
      validator: SCRIPT_INPUT_VALIDATOR.DECIMAL,
      defaultValue: 2,
    },
    {
      label: "Total number of public keys (n)",
      placeholder: "N public keys",
      scriptSandBoxInputName: "totalPublicKeys",
      required: true,
      validator: SCRIPT_INPUT_VALIDATOR.DECIMAL,
      defaultValue: 3,
    },
    {
      label: "Public keys",
      placeholder: "Public key",
      scriptSandBoxInputName: "publicKey",
      required: true,
      dynamic: true,
      dependsOn: "totalPublicKeys",
      validator: SCRIPT_INPUT_VALIDATOR.HEX,
    },
  ],
  scriptSandbox: [
    {
      type: SCRIPT_SANDBOX_TYPE.COMMENT,
      id: 0,
      content: "#lockscript/scriptpubkey",
    },
    {
      type: SCRIPT_SANDBOX_TYPE.DYNAMIC_TEXT,
      id: 1,
      content: "",
      label: "Required Signatures",
      scriptSandBoxInputName: "requiredSignatures",
      // change the render function for this
      renderFunction: (value) => `OP_${value}`,
      calculateFunction: (value) => {
        // calculate the function
        // const hexValue = checkDecimalToHex(value)
        // return hexValue;
        // return OP to the value
        return `OP_${value}`;
      },
    },
    {
      type: SCRIPT_SANDBOX_TYPE.DYNAMIC,
      id: 2,
      content: "",
      dependsOn: "totalPublicKeys",
      scriptSandBoxInputName: "publicKey",
      renderFunction: (value) => {
        return `public Key #${value}`;
      },
    },
    {
      type: SCRIPT_SANDBOX_TYPE.DYNAMIC_TEXT,
      id: 3,
      content: "",
      label: "Total public keys",
      scriptSandBoxInputName: "totalPublicKeys",
      //change the render function for this too
      renderFunction: (value) => `OP_${value}`,
      calculateFunction: (value) => {
        // calculate the function
        // const hexValue = checkDecimalToHex(value)
        // return hexValue;
        return `OP_${value}`;
      },
    },
    {
      type: SCRIPT_SANDBOX_TYPE.CODE,
      id: 4,
      content: "OP_CHECKMULTISIG",
    },
  ],
};

export const SCRIPT_OUTPUT_TEMPLATES: SCRIPT_OUTPUT_TYPE[] = [
  P2PKH_TEMPLATE,
  P2SH_TL_TEMPLATE,
  P2SH_HL_TEMPLATE,
  P2WSH_MULTISIG_TEMPLATE,
];

//loop through the scriptSandbox
// if any of them has a dynamic tag go to the formdata and then find the data that has the label and has the dynamic set to true in the formdata
