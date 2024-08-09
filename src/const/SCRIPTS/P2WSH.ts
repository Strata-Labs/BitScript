import { SCRIPT_DATA_STACK } from "@/SCRIPT_ANIMATION_LIB";
import { OP_DUP_STEPS } from "../OP_CODES/DUP";
import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import {
  CodeBlockType,
  CodeDisplayBlock,
} from "@/comp/scripts/ScriptVideoContainer";

export const P2WSH_STEPS: SCRIPT_DATA_STACK[] = [
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
      {
        dataHex: "3c7075626b65793e",
        dataString: "[witness script]",
      },
    ],
    opCode: {
      name: "OP_DECODE",
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
        dataString: "sig",
      },
    ],
    currentStack: [],
    stackData: {
      dataHex: "3c7369673e",
      dataNumber: 0,
      dataString: "[Witness script]",
    },
  },

  //step 3
  {
    beforeStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "[witness script]",
      },
    ],
    currentStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "[witness script]",
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
        dataString: "<witness hash>",
      },
    ],
    opCode: {
      name: "OP_SHA256",
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
    ],
    currentStack: [],
    stackData: {
      dataHex: "3c7369673e",
      dataNumber: 0,
      dataString: "[Witness hash]",
    },
  },

  //step 5
  {
    beforeStack: [],
    currentStack: [
      {
        dataHex: "3c7075626b65793e",
        dataString: "[script hash]",
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
        dataString: "<OP_0>",
      },
    ],
    opCode: {
      name: "OP_DECODESCRIPTPUBKEY",
      number: 118,
      hex: "0x76",
      description: "Duplicates the top stack item.",
    },
  },

  // step 6
  {
    beforeStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "witness hash",
      },
      {
        dataHex: "3c7075626b65793e",
        dataString: "script hash",
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
        dataHex: "3c7369673e",
        dataString: "sig",
      },
    ],
    currentStack: [],
    stackData: {
      dataHex: "3c7369673e",
      dataNumber: 0,
      dataString: "[Witness script]",
    },
  },

  //step 8

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
        dataString: "<pubkey>",
      },
      {
        dataHex: "3c7075626b65793e",
        dataString: "<OP_CHECKSIG>",
      },
    ],
    opCode: {
      name: "OP_DECODEWITNESSSCRIPT",
      number: 118,
      hex: "0x76",
      description: "Duplicates the top stack item.",
    },
  },

  //step 9
  {
    beforeStack: [
      {
        dataHex: "3c7369673e",
        dataString: "sig",
      },
      {
        dataHex: "3c7369673e",
        dataString: "pubkey",
      },
    ],
    currentStack: [],
    stackData: {
      dataHex: "3c7369673e",
      dataNumber: 0,
      dataString: "<OP_CHECKSIG>",
    },
  },

  //step 10
  {
    beforeStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "pubkey",
      },
    ],
    currentStack: [
      {
        dataHex: "3c7075626b65793e",
        dataString: "1",
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
  "Decode the witness to extract <sig>, <witness script>",
  "Push the witness script and <sig> into the stack,",
  "Hash the witness script(sha256 hash)",
  "Insert the witness script hash into the stack",
  "Decodes the script pub key to obtain <OP_0> and [witness script hash]",
  "Execute OP_EQUAL to compare script hash with witness script hash",
  "Push the [witness script] into the stack",
  "Decodes the witness script into <pubkey> and <OP_CHECKSIG>",
  "Pushes the <pubkey> and <OP_CHECKSIG> into the stack",
  "Execute OP_CHECKSIG to validate the signature",
];

const codeBlocks: CodeBlockType[] = [
  {
    code: "# Witness Data",
    displayType: CodeDisplayBlock.comment,
  },
  {
    code: "<Sig>",
    displayType: CodeDisplayBlock.code,
    step: 2,
  },
  {
    code: "# Script Pub key",
    displayType: CodeDisplayBlock.comment,
  },
  {
    code: "<OP_0>",
    displayType: CodeDisplayBlock.code,
    step: 5,
  },
  {
    code: "[Witness Script Hash]",
    displayType: CodeDisplayBlock.code,
    step: 6,
  },
  {
    code: "# Witness Script",
    displayType: CodeDisplayBlock.comment,
  },
  {
    code: "[Pubkey}",
    displayType: CodeDisplayBlock.code,
    step: 7,
  },
  {
    code: "<OP_CHECKSIG>",
    displayType: CodeDisplayBlock.code,
    step: 8,
  },
];

const P2WSH: SCRIPTS_PAGE_PROPS = {
  descriptionText: descriptionText,
  codeBlocks,
  STACK_DATA: P2WSH_STEPS,
  shortHand: "P2WSH",
  longHand: "(pay to witness script hash)",
  shortDescription:
    "The standard SegWit format for more complex transactions that require a script.",
  longDescription: [
    "P2WSH scripts serve a role similar to P2SH in the realm of SegWit, catering to more intricate transaction types.  The logic for a P2WSH witness script & output pubKeyScript is exactly the same as a P2SH input sigScript & output pubKeyScript. However, there is a large difference in the op_codes explicitly expressed in the raw transaction. Wallets/clients know that when a P2WSH output is detected they'll need to insert the common P2SH op_codes; therefore, a P2WSH pubKeyScript requires only one specific item: the hashed lock script.Here's a step-by-step breakdown:",
    "1. Validate Input Hashed Lock Script Matches Previous Output Hashed Lock Script. First, to spend Bitcoin sent to a hashed script, it must be proven that the script we’re unlocking matches the original hashed script. This means that the stack first consumes the entire lock/redeem script as a single array & hashes it with HASH160. This is then compared to the original hashed script using OP_EQUAL.",
    "2. Execution Of Unlock Script & Lock Script. If the  last op_code (OP_EQUAL) of the previous validation step returns 1/true, then we can move on to actually unlocking the lock script by pushing both the lock script (now separated into the appropriate data & op_code bytes). This is a more normal execution in which all elements are pushed to the stack & then processed in typical LIFO behavior.",
  ],

  introduction: "BIP141",
  opCodeReview:
    "P2WSH requires two (2) pieces of data, the scripts,  & four (4) op_codes.",
  inUse: "Yes",
  numberOfOps: "2",
  generalType: "Script",
  linkPath: "/scripts/P2WSH",
  exampleLink: "",
  image: "/images/P2SH.svg",
};

export default P2WSH;
