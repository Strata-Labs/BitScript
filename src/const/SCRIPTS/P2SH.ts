import { SCRIPT_DATA_STACK } from "@/SCRIPT_ANIMATION_LIB";
import { OP_DUP_STEPS } from "../OP_CODES/DUP";
import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import {
  CodeBlockType,
  CodeDisplayBlock,
} from "@/comp/scripts/ScriptVideoContainer";
import { P2PK_STEPS } from "./p2pk";

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
    code: "<OP_HASH160> ",
    displayType: CodeDisplayBlock.code,
    step: 2,
  },
  {
    code: "<OP_20>",
    displayType: CodeDisplayBlock.code,
    step: 3,
  },
  {
    code: "[hash160 [lock-script]]",
    displayType: CodeDisplayBlock.code,
    step: 4,
  },
  {
    code: "<OP_EQUAL> ",
    displayType: CodeDisplayBlock.code,
    step: 5,
  },
];

const P2SH: SCRIPTS_PAGE_PROPS = {
  descriptionText: [],
  codeBlocks,
  STACK_DATA: P2PK_STEPS,
  shortHand: "P2SH",
  longHand: "(pay to script hash)",
  shortDescription:
    "The standard Legacy format for more complex transactions that require a script.",
  longDescription: [
    "  A Pay-to-Script-Hash (P2SH) script is the script standard in Legacy for more complex transaction types (such as multi-sigs). Instead of sending Bitcoin to a specific script directly, the output pubKeyScript contains the hash of the lock script; in the future accompanying input sigScript, must both prove they know the original lock script & provide data & op_codes to unlock it. This means the unlocking input sigScript contains both the unlock script *&* the original lock / redeem script. Let’s break this down into two clear steps:",

    "1. Validate Input Hashed Lock Script Matches Previous Output Hashed Lock Script. First, to spend Bitcoin sent to a hashed script, it must be proven that the script we’re unlocking matches the original hashed script. This means that the stack first consumes the entire lock/redeem script as a single array & hashes it with HASH160. This is then compared to the original hashed script using OP_EQUAL.",
    "2. Execution Of Unlock Script & Lock Script. If the  last op_code (OP_EQUAL) of the previous validation step returns 1/true, then we can move on to actually unlocking the lock script by pushing both the lock script (now separated into the appropriate data & op_code bytes). This is a more normal execution in which all elements are pushed to the stack & then processed in typical LIFO behavior. ",
  ],

  introduction: "BIP133",
  opCodeReview:
    "P2SH requires two (2) pieces of data, the scripts,  & four (4) op_codes.",
  inUse: "Yes",
  numberOfOps: "4",
  generalType: "Script",
  linkPath: "/scripts/P2SH",
  exampleLink: "",
  image: "/images/P2SH.svg",
};

export default P2SH;
