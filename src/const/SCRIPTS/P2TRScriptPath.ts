import { SCRIPT_DATA_STACK } from "@/SCRIPT_ANIMATION_LIB";
import { OP_DUP_STEPS } from "../OP_CODES/DUP";
import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import {
  CodeBlockType,
  CodeDisplayBlock,
} from "@/comp/scripts/ScriptVideoContainer";
import scriptImage from "@/../public/images/P2PK.svg";

export const P2TRSP_STEPS: SCRIPT_DATA_STACK[] = [
  // step 1 

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
      {
        dataHex: "3c7369673e",
        dataString: "<merkel proof>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<script B>",
      },
    ],
    currentStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<pub key>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<merkel proof>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<script Hash>",
      },
      
    ],
    opCode: {
      name: "OP_HASH256",
      number: 118,
      hex: "0x76",
      description: "Duplicates the top stack item.",
    },
  },


  //step 2 

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
      {
        dataHex: "3c7369673e",
        dataString: "<merkel proof>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<script Hash>",
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
        dataString: "<output key>",
      },
    ],
    opCode: {
      name: "OP_VALIDATE",
      number: 118,
      hex: "0x76",
      description: "Duplicates the top stack item.",
    },
  },

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
      {
        dataHex: "3c7369673e",
        dataString: "<output key>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<taproot key>",
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
  "Push <OP_64> onto the stack",
  "Push [schnorr-signature] onto the stack",
  "Push <OP_1 - OP_PUSHDATA3> onto the stack",
  "Push [witness-script & tapleaf-script] onto the stack",
  "Push <OP_1 - OP_PUSHDATA3> onto the stack",
  "Push [control-block] onto the stack",
  "Push <OP_PUSHDATA> onto the stack",
  "Push [taproot-output] onto the stack",
];

const codeBlocks: CodeBlockType[] = [
  {
    code: "# WitnessScript",
    displayType: CodeDisplayBlock.comment,
  },
  {
    code: "<OP_64>",
    displayType: CodeDisplayBlock.code,
    step: 0,
  },
  {
    code: "[schnorr-signature]",
    displayType: CodeDisplayBlock.code,
    step: 1,
  },
  {
    code: "<OP_1 - OP_PUSHDATA3>",
    displayType: CodeDisplayBlock.code,
    step: 2,
  },
  {
    code: "[witness-script & tapleaf-script]",
    displayType: CodeDisplayBlock.code,
    step: 3,
  },
  {
    code: "<OP_1 - OP_PUSHDATA3>",
    displayType: CodeDisplayBlock.code,
    step: 4,
  },
  {
    code: "[control-block]",
    displayType: CodeDisplayBlock.code,
    step: 5,
  },
  {
    code: "",
    displayType: CodeDisplayBlock.comment,
  },
  {
    code: "# PubKeyScript",
    displayType: CodeDisplayBlock.comment,
  },
  {
    code: "<OP_PUSHDATA>",
    displayType: CodeDisplayBlock.code,
    step: 6,
  },
  {
    code: "[taproot-output]",
    displayType: CodeDisplayBlock.code,
    step: 7,
  },
];

const P2TRSP: SCRIPTS_PAGE_PROPS = {
  descriptionText: descriptionText,
  codeBlocks: codeBlocks,
  STACK_DATA: P2TRSP_STEPS,
  shortHand: "P2TR-SP",
  longHand: "(pay to taproot - scriptpath)",
  opCodes: "",
  shortDescription:
    "A Taproot output spent with through the script path for a complex transaction.",
  longDescription:
    "A Pay-to-TapRoot - KeyPath script is a P2TR output scriptPubKey that was unlocked with the scriptpath. P2TR outputs have both a straight-forward keypath unlockable with a Schnorr Signature & a tree of scripts (called scriptpath) that require much more data to unlock. Below is an example of the latter.  ",
  introduction: "BIP341",
  opCodeReview:
    "P2TR - ScriptPath requires the same three (3) pieces of data & four (4) op_codes as P2PKH. However, as we see in the first step below, the initial formatting for the ScriptPubKey is different.",
  inUse: "Yes",
  numberOfOps: "4",
  generalType: "Script",
  linkPath: "/scripts/P2TR-SP",
  exampleLink: "",
  image: "/images/P2SH.svg",
};

export default P2TRSP;
