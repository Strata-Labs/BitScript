import { SCRIPT_DATA_STACK } from "@/SCRIPT_ANIMATION_LIB";
import { OP_DUP_STEPS } from "../OP_CODES/DUP";
import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import {
  CodeBlockType,
  CodeDisplayBlock,
} from "@/comp/scripts/ScriptVideoContainer";

export const P2SH_STEPS: SCRIPT_DATA_STACK[] = [
  // Step 1
  {
    beforeStack: [],
    currentStack: [
      {
        dataBinary: {},

        dataHex: "3c7369673e",
        dataString: "lock-script",
      },
    ],
    stackData: {
      dataBinary: {},

      dataHex: "3c7369673e",
      dataNumber: 0,
      dataString: "lock-script",
    },
  },
  // Step 2
  {
    beforeStack: [
      {
        dataBinary: {},

        dataHex: "3c7369673e",
        dataString: "lock-script",
      },
    ],
    currentStack: [
      {
        dataBinary: {},

        dataHex: "3c7369673e",
        dataString: "lock-script",
      },
      {
        dataBinary: {},

        dataHex: "3c7075626b65793e",
        dataString: "unlock-script",
      },
    ],
    stackData: {
      dataBinary: {},

      dataHex: "3c7075626b65793e",
      dataNumber: 0,
      dataString: "unlock-script",
    },
  },
  // Step 3
  {
    opCode: {
      name: "OP_HASH160",
      number: 169,
      hex: "0xa9",
      description:
        "Hashes the top item on the stack using the SHA-256 & RIPEMD-160 algorithms.",
    },
    currentStack: [
      {
        dataBinary: {},

        dataHex: "3c7369673e",
        dataString: "lock-script",
      },
      {
        dataBinary: {},

        dataHex: "3c7369673e",
        dataString: "hashed-script",
      },
    ],
    beforeStack: [
      {
        dataBinary: {},

        dataHex: "3c7369673e",
        dataString: "lock-script",
      },
      {
        dataBinary: {},

        dataHex: "3c7075626b65793e",
        dataString: "unlock-script",
      },
    ],
  },
  // Step 4
  // {
  //   opCode: {
  //     name: "OP_20",
  //     number: 169,
  //     hex: "0xa9",
  //     description:
  //       "Hashes the top item on the stack using the SHA-256 & RIPEMD-160 algorithms.",
  //   },
  //   currentStack: [
  //     {
  //       dataBinary: {},

  //       dataHex: "3c7369673e",
  //       dataString: "lock-script",
  //     },
  //     {
  //       dataBinary: {},

  //       dataHex: "3c7075626b65793e",
  //       dataString: "hashed-script",
  //     },
  //     {
  //       dataBinary: {},

  //       dataHex: "3c7369673e",
  //       dataString: "hash160-lock",
  //     },
  //   ],
  //   beforeStack: [
  //     {
  //       dataBinary: {},

  //       dataHex: "3c7369673e",
  //       dataString: "lock-script",
  //     },
  //     {
  //       dataBinary: {},

  //       dataHex: "3c7075626b65793e",
  //       dataString: "hashed-script",
  //     },
  //   ],
  // },
  // Step 5
  {
    opCode: {
      name: "OP_EQUAL",
      number: 169,
      hex: "0xa9",
      description:
        "Hashes the top item on the stack using the SHA-256 & RIPEMD-160 algorithms.",
    },
    currentStack: [
      {
        dataBinary: {},

        dataHex: "3c7369673e",
        dataString: "lock-script",
      },
      {
        dataBinary: {},

        dataHex: "3c7369673e",
        dataString: "0-or-1",
      },
    ],
    beforeStack: [
      {
        dataBinary: {},

        dataHex: "3c7369673e",
        dataString: "lock-script",
      },
      {
        dataBinary: {},

        dataHex: "3c7075626b65793e",
        dataString: "hashed-script",
      },
      {
        dataBinary: {},

        dataHex: "3c7075626b65793e",
        dataString: "hash160-lock",
      },
    ],
  },
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
    code: "<OP_HASH160>",
    displayType: CodeDisplayBlock.code,
    step: 2,
  },
  {
    code: "<OP_20>",
    displayType: CodeDisplayBlock.code,
    step: 3,
  },
  {
    code: "[hash160[lock-script]",
    displayType: CodeDisplayBlock.code,
  },
  {
    code: "<OP_EQUAL>",
    displayType: CodeDisplayBlock.code,
    step: 4,
  },
];

const P2SH: SCRIPTS_PAGE_PROPS = {
  descriptionText: [],
  codeBlocks,
  STACK_DATA: P2SH_STEPS,
  shortHand: "P2SH",
  longHand: "(pay to script hash)",
  shortDescription:
    "The standard Legacy format for more complex transactions that require a script.",
  longDescription: [
    "  A Pay-to-Script-Hash (P2SH) script is the script standard in Legacy for more complex transaction types (such as multi-sigs). Instead of sending Bitcoin to a specific script directly, the output pubKeyScript contains the hash of the lock script; in the future accompanying input sigScript, must both prove they know the original lock script & provide data & op_codes to unlock it. This means the unlocking input sigScript contains both the unlock script *&* the original lock / redeem script. Let’s break this down into two clear steps:",

    "1. Validate Input Hashed Lock Script Matches Previous Output Hashed Lock Script. First, to spend Bitcoin sent to a hashed script, it must be proven that the script we’re unlocking matches the original hashed script. This means that the stack first consumes the entire lock/redeem script as a single array & hashes it with HASH160. This is then compared to the original hashed script using OP_EQUAL.",
    "2. Execution Of Unlock Script & Lock Script. If the  last op_code (OP_EQUAL) of the previous validation step returns 1/true, then we can move on to actually unlocking the lock script by pushing both the lock script (now separated into the appropriate data & op_code bytes). This is a more normal execution in which all elements are pushed to the stack & then processed in typical LIFO behavior. ",
  ],

  introduction: "BIP16",
  opCodeReview:
    "P2SH requires two (2) pieces of data, the scripts,  & three (3) op_codes.",
  inUse: "Yes",
  numberOfOps: "3",
  generalType: "Script",
  linkPath: "/scripts/P2SH",
  exampleLink: "",
  image: "/images/P2SH.svg",
};

export default P2SH;
