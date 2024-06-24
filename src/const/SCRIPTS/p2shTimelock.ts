import { SCRIPT_DATA_STACK } from "@/SCRIPT_ANIMATION_LIB";
import { OP_DUP_STEPS } from "../OP_CODES/DUP";
import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import {
  CodeBlockType,
  CodeDisplayBlock,
} from "@/comp/scripts/ScriptVideoContainer";

export const P2SHTIMELOCK_STEPS: SCRIPT_DATA_STACK[] = [
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
        dataString: "<redeem script>",
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
      dataString: "<redeem script>",
    },
  },

  //Step 3

  {
    beforeStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "redeemScript",
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

  //step 4
  {
    beforeStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<sig>",
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
  //step 5

  {
    beforeStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<redeem script>",
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
        dataString: "Timelock",
      },
    ],
    opCode: {
      name: "OP_EXECUTE",
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
        dataString: "<Timelock>",
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
      name: "OP_CHECKLOCKTIMEVERIFY",
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
        dataString: "<redeem script>",
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
  "Push <redeemScript> onto the stack",
  "Execute OP_HASH160 on redeemScript",
  "Execute OP_EQUAL",
  "If true, execute redeemScript",
  "Execute OP_CHECKLOCKTIMEVERIFY",
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
    code: "<redeemScript>",
    displayType: CodeDisplayBlock.code,
    step: 1,
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
    code: "<timelock>",
    displayType: CodeDisplayBlock.code,
    step: 6,
  },
  {
    code: "OP_CHECKLOCKTIMEVERIFY",
    displayType: CodeDisplayBlock.code,
    step: 7,
  },
  {
    code: "OP_DROP",
    displayType: CodeDisplayBlock.code,
    step: 8,
  },
  {
    code: "<publicKey>",
    displayType: CodeDisplayBlock.code,
    step: 9,
  },
  {
    code: "OP_CHECKSIG",
    displayType: CodeDisplayBlock.code,
    step: 10,
  },
];

const P2SHTIMELOCK: SCRIPTS_PAGE_PROPS = {
  descriptionText: descriptionText,
  codeBlocks: codeBlocks,
  STACK_DATA: P2SHTIMELOCK_STEPS, 
  shortHand: "P2SH-TL",
  longHand: "Pay to Script Hash (Timelock)",
  opCodes: "OP_HASH160 OP_EQUAL OP_CHECKLOCKTIMEVERIFY OP_DROP OP_CHECKSIG",
  shortDescription: "A P2SH output with a time-locked condition for spending",
  longDescription:
    "A Pay-to-Script-Hash (TimeLock) script is a P2SH output that includes a time-based condition in its redeemScript. The funds can only be spent after a specific time has passed, providing a way to create time-bound transactions.",
  introduction: "BIP16 (P2SH), BIP65 (CLTV)",
  opCodeReview:
    "P2SH-TimeLock combines the P2SH structure with OP_CHECKLOCKTIMEVERIFY to create a time-bound spending condition. The redeemScript includes the timelock, a public key, and signature verification.",
  inUse: "Yes",
  numberOfOps: "5",
  generalType: "Script",
  linkPath: "/scripts/P2SH-TL",
  exampleLink: "",
  image: "/images/P2SH.svg",
};

export default P2SHTIMELOCK;

