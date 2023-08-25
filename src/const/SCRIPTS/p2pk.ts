import { SCRIPT_DATA_STACK } from "@/SCRIPT_ANIMATION_LIB";
import { OP_DUP_STEPS } from "../OP_CODES/DUP";
import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import {
  CodeBlockType,
  CodeDisplayBlock,
} from "@/comp/scripts/ScriptVideoContainer";

export const P2PK_STEPS: SCRIPT_DATA_STACK[] = [
  {
    beforeStack: [],
    currentStack: [
      {
        dataBinary: {},
        dataBytes: {
          "0": 60,
          "1": 115,
          "2": 105,
          "3": 103,
          "4": 62,
        },
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
    ],
    stackData: {
      dataBinary: {},
      dataBytes: {
        "0": 60,
        "1": 115,
        "2": 105,
        "3": 103,
        "4": 62,
      },
      dataHex: "3c7369673e",
      dataNumber: 0,
      dataString: "<sig>",
    },
  },
  {
    beforeStack: [
      {
        dataBinary: {},
        dataBytes: {
          "0": 60,
          "1": 115,
          "2": 105,
          "3": 103,
          "4": 62,
        },
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
    ],
    currentStack: [
      {
        dataBinary: {},
        dataBytes: {
          "0": 60,
          "1": 115,
          "2": 105,
          "3": 103,
          "4": 62,
        },
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
      {
        dataBinary: {},
        dataBytes: {
          "0": 60,
          "1": 112,
          "2": 117,
          "3": 98,
          "4": 107,
          "5": 101,
          "6": 121,
          "7": 62,
        },
        dataHex: "3c7075626b65793e",
        dataString: "<pubkey>",
      },
    ],
    stackData: {
      dataBinary: {},
      dataBytes: {
        "0": 60,
        "1": 112,
        "2": 117,
        "3": 98,
        "4": 107,
        "5": 101,
        "6": 121,
        "7": 62,
      },
      dataHex: "3c7075626b65793e",
      dataNumber: 0,
      dataString: "<pubkey>",
    },
  },
  {
    opCode: {
      name: "OP_CHECKSIG",
      number: 136,
      hex: "0x88",
      description:
        "Same as OP_EQUAL, but  doesn't push result & stops executing if false.",
    },
    currentStack: [],
    beforeStack: [
      {
        dataBinary: {},
        dataBytes: {
          "0": 60,
          "1": 115,
          "2": 105,
          "3": 103,
          "4": 62,
        },
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
      {
        dataBinary: {},
        dataBytes: {
          "0": 60,
          "1": 112,
          "2": 117,
          "3": 98,
          "4": 107,
          "5": 101,
          "6": 121,
          "7": 62,
        },
        dataHex: "3c7075626b65793e",
        dataString: "<pubkey>",
      },
    ],
  },
];

const descriptionText = [
  "Push <signature> onto the stack",
  "Push <pubkey> onto the stack",
  "Pop two items (pub-key & sign.) & verify ECDSA signature",
];

const codeBlocks: CodeBlockType[] = [
  {
    code: " # UnlockScript/ScriptSig",
    displayType: CodeDisplayBlock.comment,
  },
  {
    code: " [signature]",
    displayType: CodeDisplayBlock.code,
    step: 0,
  },
  {
    code: "[public-key]",
    displayType: CodeDisplayBlock.code,
    step: 1,
  },
  {
    code: "<checksig>",
    displayType: CodeDisplayBlock.code,
    step: 2,
  },
];

const P2PK: SCRIPTS_PAGE_PROPS = {
  descriptionText: descriptionText,
  codeBlocks: codeBlocks,
  STACK_DATA: P2PK_STEPS,
  row: 1,
  name: "Script Name",
  completeName: "(pay to public key)",
  scriptDescription: "P2PK",
  summary:
    "A Pay-to-Public-Key (P2PK) script is the most simple type of Bitcoin transaction script that allows bitcoins to be sent to a specific Bitcoin address. The script locks the bitcoins directly to  a public key, requiring a signature from the corresponding private key to spend them. ",
  shortSummary:
    "The simplest common script for a direct transfer. A total of three op_codes are needed.",
  reallyShortSummary: "At one point the most universal script for simple...",
  introduction: "BIP133",
  opCodeReview: "P2PK requires three (2) pieces of data & four (1) op_codes. ",
  inUse: "Yes",
  numberOfOps: "14",
  generalType: "Script",
  linkPath: "/scripts/P2PK",
};

export default P2PK;
