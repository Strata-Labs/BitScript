import { SCRIPT_DATA_STACK } from "@/SCRIPT_ANIMATION_LIB";
import { OP_DUP_STEPS } from "../OP_CODES/DUP";
import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import {
  CodeBlockType,
  CodeDisplayBlock,
} from "@/comp/scripts/ScriptVideoContainer";

export const P2SHTIMEHASHLOCK_STEPS: SCRIPT_DATA_STACK[] = [
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
      dataString: "1 or 0",
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
      dataString: "redeem script",
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
        dataString: "1",
      },
      {
        dataHex: "3c7369673e",
        dataString: "secret",
      },
      {
        dataHex: "3c7369673e",
        dataString: "redeem script",
      },
    ],
    currentStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "1",
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
        dataString: "1",
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
  //step 6
  {
    beforeStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "1",
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
        dataString: "1",
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
        dataString: "1",
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

  {
    beforeStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<sig>",
      }, 
      {
        dataHex: "3c7369673e",
        dataString: "0",
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
        dataString: "0",
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
  //step 5

  {
    beforeStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "0",
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
        dataString: "0",
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
  "Push <1 or 0> onto the stack (for OP_IF)",
  "If 1, push <secret> onto the stack",
  "Push <redeemScript> onto the stack",
  "Execute OP_HASH160 on redeemScript",
  "Push <scriptHash> onto the stack",
  "Execute OP_EQUAL",
  "If true, execute redeemScript",
  "Execute OP_IF or OP_ELSE based on <1 or 0>",
  "If hashlock path: Execute OP_HASH160 on secret",
  "If hashlock path: Push <hashOfSecret> and execute OP_EQUALVERIFY",
  "If timelock path: Push <timelock> and execute OP_CHECKLOCKTIMEVERIFY",
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
    code: "<1 or 0>",
    displayType: CodeDisplayBlock.code,
    step: 1,
  },
  {
    code: "<secret> (if using hashlock)",
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
    code: "OP_IF",
    displayType: CodeDisplayBlock.code,
    step: 8,
  },
  {
    code: "  OP_HASH160",
    displayType: CodeDisplayBlock.code,
    step: 9,
  },
  {
    code: "  <hashOfSecret>",
    displayType: CodeDisplayBlock.code,
    step: 10,
  },
  {
    code: "  OP_EQUALVERIFY",
    displayType: CodeDisplayBlock.code,
    step: 10,
  },
  {
    code: "  <alicePublicKey>",
    displayType: CodeDisplayBlock.code,
    step: 12,
  },
  {
    code: "OP_ELSE",
    displayType: CodeDisplayBlock.code,
    step: 8,
  },
  {
    code: "  <timelock>",
    displayType: CodeDisplayBlock.code,
    step: 11,
  },
  {
    code: "  OP_CHECKLOCKTIMEVERIFY",
    displayType: CodeDisplayBlock.code,
    step: 11,
  },
  {
    code: "  OP_DROP",
    displayType: CodeDisplayBlock.code,
    step: 11,
  },
  {
    code: "  <bobPublicKey>",
    displayType: CodeDisplayBlock.code,
    step: 12,
  },
  {
    code: "OP_ENDIF",
    displayType: CodeDisplayBlock.code,
    step: 8,
  },
  {
    code: "OP_CHECKSIG",
    displayType: CodeDisplayBlock.code,
    step: 13,
  },
];

const P2SHTIMEHASHLOCK: SCRIPTS_PAGE_PROPS = {
  descriptionText: descriptionText,
  codeBlocks: codeBlocks,
  STACK_DATA: P2SHTIMEHASHLOCK_STEPS, 
  shortHand: "P2SH-THL",
  longHand: "Pay to Script Hash (TimeHashLock)",
  opCodes:
    "OP_HASH160 OP_EQUAL OP_IF OP_HASH160 OP_EQUALVERIFY OP_ELSE OP_CHECKLOCKTIMEVERIFY OP_DROP OP_ENDIF OP_CHECKSIG",
  shortDescription:
    "A P2SH output with both time-based and hash-based conditions for spending",
  longDescription:
    "A Pay-to-Script-Hash (TimeHashLock) script is a P2SH output that includes both time-based and hash-based conditions in its redeemScript. This script allows for two spending paths: one that can be used immediately if a secret is known (hashlock), and another that can only be used after a certain time has passed (timelock). This type of script is commonly used in atomic swaps and other complex cryptocurrency protocols.",
  introduction: "BIP16 (P2SH), BIP65 (CLTV)",
  opCodeReview:
    "P2SH-TimeHashLock combines the P2SH structure with both OP_CHECKLOCKTIMEVERIFY and a hash verification step. The redeemScript uses OP_IF/OP_ELSE to provide two spending paths, one with a hashlock and one with a timelock.",
  inUse: "Yes",
  numberOfOps: "10",
  generalType: "Script",
  linkPath: "/scripts/P2SH-THL",
  exampleLink: "",
  image: "/images/P2SH.svg",
};

export default P2SHTIMEHASHLOCK;