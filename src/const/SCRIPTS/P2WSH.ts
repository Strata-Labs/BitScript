import { SCRIPT_DATA_STACK } from "@/SCRIPT_ANIMATION_LIB";
import { OP_DUP_STEPS } from "../OP_CODES/DUP";
import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import {
  CodeBlockType,
  CodeDisplayBlock,
} from "@/comp/scripts/ScriptVideoContainer";

export const P2WSH_STEPS: SCRIPT_DATA_STACK[] = [
  //step 1
  {
    beforeStack: [],
    currentStack: [
      {
        dataHex: "3c7369673e",
        dataString: "witness",
      },
    ],
    stackData: {
      dataHex: "3c7369673e",
      dataNumber: 0,
      dataString: "Witness",
    },
  },

  // step 2

  {
    beforeStack: [
      {
        dataHex: "3c7369673e",
        dataString: "witness",
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
        dataHex: "3c7075626b65793e",
        dataString: "<pubkey>",
      },
    ],
    opCode: {
      name: "OP_DECODE",
      number: 118,
      hex: "0x76",
      description: "Duplicates the top stack item.",
    },
  },

  //step 3

  {
    beforeStack: [
      {
        dataHex: "3c7369673e",
        dataString: "lockscript",
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
        dataString: "<OP_0>",
      },
      {
        dataHex: "3c7075626b65793e",
        dataString: "<pubkeyhash>",
      },
    ],
    opCode: {
      name: "OP_DECODE",
      number: 118,
      hex: "0x76",
      description: "Duplicates the top stack item.",
    },
  },

  /// step 4
  {
    beforeStack: [
      {
        dataHex: "3c7369673e",
        dataString: "<sig>",
      },
      {
        dataHex: "3c7369673e",
        dataString: "hashed script",
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
];

const descriptionText = [
  "Pushes the witness to the stack",
  "Decode the witness stack to extract <sig> and <pubkey>",
  "Decode the locking script to obtain <OP_0> and <pubkeyhash>",
  "Execute OP_EQUAL to compare script hash with provided hash",
  "Validate the result (1 for success, 0 for failure)"
];

const codeBlocks: CodeBlockType[] = [
  {
    code: "# UnlockScript/LockScript",
    displayType: CodeDisplayBlock.comment,
  },
  {
    code: "[lock-script]",
    displayType: CodeDisplayBlock.code,
    step: 0,
  },
  {
    code: "[unlock-script]",
    displayType: CodeDisplayBlock.code,
    step: 1,
  },
  {
    code: "# PubKeyScript",
    displayType: CodeDisplayBlock.comment,
  },
  {
    code: "<OP_0> ",
    displayType: CodeDisplayBlock.code,
    step: 2,
  },
  {
    code: "<OP_32>",
    displayType: CodeDisplayBlock.code,
    step: 3,
  },
  {
    code: "[sha256 [lock-script]]",
    displayType: CodeDisplayBlock.code,
    step: 4,
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
