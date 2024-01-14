import { SCRIPT_DATA_STACK } from "@/SCRIPT_ANIMATION_LIB";
import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import {
  CodeBlockType,
  CodeDisplayBlock,
} from "@/comp/scripts/ScriptVideoContainer";

export const P2PK_STEPS: SCRIPT_DATA_STACK[] = [
  // STEP 1
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
  // Step 2
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
    code: "[signature]",
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
  shortHand: "P2PK",
  longHand: "(pay to public key)",
  opCodes: "",
  shortDescription:
    "The simplest common script for a direct transfer. A total of three op_codes are needed.",
  longDescription:
    "A Pay-to-Public-Key (P2PK) script is the most simple type of Bitcoin transaction script that allows bitcoins to be sent to a specific Bitcoin address. The script locks the bitcoins directly to  a public key, requiring a signature from the corresponding private key to spend them. ",
  introduction: "Genesis",
  opCodeReview: "P2PK requires three (3) pieces of data & four (4) op_codes. ",
  inUse: "Yes",
  numberOfOps: "1",
  generalType: "Script",
  linkPath: "/scripts/P2PK",
  exampleLink: "",
  image: "/images/P2PK.svg",
};

export default P2PK;
