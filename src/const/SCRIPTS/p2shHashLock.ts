import { SCRIPT_DATA_STACK } from "@/SCRIPT_ANIMATION_LIB";
import { OP_DUP_STEPS } from "../OP_CODES/DUP";
import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import {
  CodeBlockType,
  CodeDisplayBlock,
} from "@/comp/scripts/ScriptVideoContainer";

export const P2SHHASHLOCK_STEPS: SCRIPT_DATA_STACK[] = [
  // step 1
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
    currentStack: [],
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
      dataString: "<secret>",
    },
  },

  //Step 3
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
        dataString: "<secret>",
      },
    ],
    currentStack: [],
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
      dataString: "<redeem script>",
    },
  },

  //step 4
  {
    beforeStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<secret>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<redeem script>",
      },
    ],
    currentStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<secret>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<redeem script>",
      },

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
        dataString: "<script hash>",
      },
    ],
    opCode: {
      name: "OP_HASH160",
      number: 118,
      hex: "0x76",
      description: "Duplicates the top stack item.",
    },
  },

  //step 5
  {
    beforeStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<secret>",
      }, 
      {
        dataHex: "3c7369673e",
        dataString: "<redeem script>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<script hash>",
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
        dataString: "1 or 0",
      },
    ],
    opCode: {
      name: "OP_EQUAL",
      number: 118,
      hex: "0x76",
      description: "Duplicates the top stack item.",
    },
  },
  //step 6
  {
    beforeStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<secret>",
      },
    ],
    currentStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<secret>",
      },
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
        dataString: "<hashofsecret>",
      },
    ],
    opCode: {
      name: "OP_HASH160",
      number: 118,
      hex: "0x76",
      description: "Duplicates the top stack item.",
    },
  },


  //step 6
  {
    beforeStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<secret>",
      }, 
      {
        dataHex: "3c7369673e",
        dataString: "<hashofsecret>",
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
        dataString: "1",
      },
    ],
    opCode: {
      name: "OP_EQUAL",
      number: 118,
      hex: "0x76",
      description: "Duplicates the top stack item.",
    },
  },
  //step 7

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
      dataString: "<public key>",
    },
  },
  //step 8

  {
    beforeStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<pub key>",
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
        dataString: "1 or 0",
      },
    ],
    opCode: {
      name: "OP_CHECKSIG",
      number: 118,
      hex: "0x76",
      description: "Duplicates the top stack item.",
    },
  },
];

const descriptionText = [
  "Push <signature> onto the stack",
  "Push <secret> onto the stack",
  "Push <redeemScript> onto the stack",
  "Execute OP_HASH160 on redeemScript",
  "Execute OP_EQUAL",
  "If true, execute redeemScript",
  "Execute OP_HASH160 on secret",
  "Push <hashOfSecret> onto the stack",
  "Execute OP_EQUALVERIFY",
  "Push <publicKey> onto the stack",
  "Execute OP_CHECKSIG",
];

const codeBlocks: CodeBlockType[] = [
  {
    code: "# WitnessScript",
    displayType: CodeDisplayBlock.comment,
  },
  {
    code: "<signature>",
    displayType: CodeDisplayBlock.code,
    step: 0,
  },
  {
    code: "<secret>",
    displayType: CodeDisplayBlock.code,
    step: 1,
  },
  {
    code: "<redeemScript>",
    displayType: CodeDisplayBlock.code,
    step: 2,
  },
  {
    code: "",
    displayType: CodeDisplayBlock.comment,
  },
  {
    code: "# RedeemScript",
    displayType: CodeDisplayBlock.comment,
  },
  {
    code: "OP_HASH160",
    displayType: CodeDisplayBlock.code,
    step: 7,
  },
  {
    code: "<hashOfSecret>",
    displayType: CodeDisplayBlock.code,
    step: 8,
  },
  {
    code: "OP_EQUALVERIFY",
    displayType: CodeDisplayBlock.code,
    step: 9,
  },
  {
    code: "<publicKey>",
    displayType: CodeDisplayBlock.code,
    step: 10,
  },
  {
    code: "OP_CHECKSIG",
    displayType: CodeDisplayBlock.code,
    step: 11,
  },
];

const P2SHHASHLOCK: SCRIPTS_PAGE_PROPS = {
  descriptionText: descriptionText,
  codeBlocks: codeBlocks,
  STACK_DATA: P2SHHASHLOCK_STEPS,
  shortHand: "P2SH-HL",
  longHand: "Pay to Script Hash (HashLock)",
  opCodes: "OP_HASH160 OP_EQUAL OP_HASH160 OP_EQUALVERIFY OP_CHECKSIG",
  shortDescription: "A P2SH output with a hash-locked condition for spending",
  longDescription:
    "A Pay-to-Script-Hash (HashLock) script is a P2SH output that includes a hash-based condition in its redeemScript. The funds can only be spent by providing a secret value that, when hashed, matches a predefined hash. This is commonly used in atomic swaps and other cryptographic protocols.",
  introduction: "BIP16 (P2SH)",
  opCodeReview:
    "P2SH-HashLock combines the P2SH structure with a hash verification step. The redeemScript includes hashing the provided secret, comparing it to a predefined hash, and then verifying a signature.",
  inUse: "Yes",
  numberOfOps: "5",
  generalType: "Script",
  linkPath: "/scripts/P2SH-HL",
  exampleLink: "",
  image: "/images/P2SH.svg",
};

export default P2SHHASHLOCK;
