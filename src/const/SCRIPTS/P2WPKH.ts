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

const P2WPKH: SCRIPTS_PAGE_PROPS = {
  descriptionText: [],
  codeBlocks,
  STACK_DATA: P2PK_STEPS,
  shortHand: "P2WPKH",
  longHand: "(pay to witness public key hash)",
  shortDescription: "",
  longDescription: [
    " A Pay-to-Witness-Public-Key-Hash (P2WPKH) script is the standard SegWit script for a direct transfer transaction. The logic for a P2WPKH witness script & output pubKeyScript is exactly the same as a P2PKH input sigScript & output pubKeyScript. However, there is a large difference in the op_codes explicitly expressed in the raw transaction. Wallets/clients know that when a P2WPKH output is detected they'll need to insert the common P2PKH op_codes; therefore, a P2WPKH pubKeyScript requires only one specific item: a hashed public key.",
  ],

  introduction: "BIP133",
  opCodeReview:
    "P2WPKH requires the same three (3) pieces of data & four (4) op_codes as P2PKH. However, as we see in the first step below, the initial formatting for the ScriptPubKey is different.",
  inUse: "Yes",
  numberOfOps: "14",
  generalType: "Script",
  linkPath: "/scripts/P2WPKH",
  exampleLink: "",
};

export default P2WPKH;
