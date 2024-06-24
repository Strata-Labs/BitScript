import { SCRIPT_DATA_STACK } from "@/SCRIPT_ANIMATION_LIB";
import { OP_DUP_STEPS } from "../OP_CODES/DUP";
import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import {
  CodeBlockType,
  CodeDisplayBlock,
} from "@/comp/scripts/ScriptVideoContainer";

export const P2SHMULTISIG_STEPS: SCRIPT_DATA_STACK[] = [
    //step 1
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
        dataString: "<OP_0>",
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
      dataString: "<OP_0>",
    },
  },
  // step 2
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
        dataString: "<OP_0>",
      },
    ],
    currentStack: [
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
      dataString: "<sig1>",
    },
  },

  // Step 3
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
        dataString: "<OP_0>",
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
        dataString: "<sig1>",
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
      dataString: "<sig2>",
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
        dataString: "<OP_0>",
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
        dataString: "<sig1>",
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
        dataString: "<sig2>",
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
        dataString: "<OP_0>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<sig1>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<sig2>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<redeem script>",
      },
    ],
    currentStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<OP_0>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<sig1>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<sig2>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<redeemScript>",
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
        dataString: "<OP_0>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<sig1>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<sig2>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<redeemScript>",
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




  //step 7

  {
    beforeStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<OP_0>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<sig1>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "<sig2>",
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
      name: "OP_CHECKMULTISIG",
      number: 118,
      hex: "0x76",
      description: "Duplicates the top stack item.",
    },
  },

  



];

const descriptionText = [
  "Push OP_0 onto the stack (due to CHECKMULTISIG bug)",
  "Push <signature1> onto the stack",
  "Push <signature2> onto the stack",
  "Push <redeemScript> onto the stack",
  "Execute OP_HASH160 on redeemScript",
  "Execute OP_EQUAL",
  "Execute OP_CHECKMULTISIG",
];

const codeBlocks: CodeBlockType[] = [
  {
    code: "# WitnessScript",
    displayType: CodeDisplayBlock.comment,
  },
  {
    code: "OP_0",
    displayType: CodeDisplayBlock.code,
    step: 0,
  },
  {
    code: "<signature1>",
    displayType: CodeDisplayBlock.code,
    step: 1,
  },
  {
    code: "<signature2>",
    displayType: CodeDisplayBlock.code,
    step: 2,
  },
  {
    code: "<redeemScript>",
    displayType: CodeDisplayBlock.code,
    step: 3,
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
    code: "OP_2",
    displayType: CodeDisplayBlock.code,
    step: 8,
  },
  {
    code: "<publicKey1>",
    displayType: CodeDisplayBlock.code,
    step: 9,
  },
  {
    code: "<publicKey2>",
    displayType: CodeDisplayBlock.code,
    step: 10,
  },
  {
    code: "<publicKey3>",
    displayType: CodeDisplayBlock.code,
    step: 11,
  },
  {
    code: "OP_3",
    displayType: CodeDisplayBlock.code,
    step: 12,
  },
  {
    code: "OP_CHECKMULTISIG",
    displayType: CodeDisplayBlock.code,
    step: 13,
  },
];

const P2SHMULTISIG: SCRIPTS_PAGE_PROPS = {
  descriptionText: descriptionText,
  codeBlocks: codeBlocks,
  STACK_DATA: P2SHMULTISIG_STEPS, // Assuming this is defined elsewhere
  shortHand: "P2SH-MS",
  longHand: "Pay to Script Hash (Multisig)",
  opCodes: "OP_HASH160 OP_EQUAL OP_2 OP_3 OP_CHECKMULTISIG",
  shortDescription:
    "A P2SH output with a multisignature condition for spending",
  longDescription:
    "A Pay-to-Script-Hash (Multisig) script is a P2SH output that includes a multisignature condition in its redeemScript. This example uses a 2-of-3 multisig setup, where any 2 out of 3 specified public keys must provide valid signatures to spend the funds. This provides enhanced security and flexibility in managing shared funds.",
  introduction: "BIP16 (P2SH), BIP11 (M-of-N Standard Transactions)",
  opCodeReview:
    "P2SH-Multisig combines the P2SH structure with OP_CHECKMULTISIG to create a multisignature spending condition. The redeemScript specifies the number of required signatures, the public keys, and uses OP_CHECKMULTISIG for verification.",
  inUse: "Yes",
  numberOfOps: "5",
  generalType: "Script",
  linkPath: "/scripts/P2SH-MS",
  exampleLink: "",
  image: "/images/P2SH.svg",
};

export default P2SHMULTISIG;