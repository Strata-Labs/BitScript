import { SCRIPT_DATA_STACK } from "@/SCRIPT_ANIMATION_LIB";
import { OP_DUP_STEPS } from "../OP_CODES/DUP";
import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import {
  CodeBlockType,
  CodeDisplayBlock,
} from "@/comp/scripts/ScriptVideoContainer";
import scriptImage from "@/../public/images/P2PK.svg";

export const P2TRKP_STEPS: SCRIPT_DATA_STACK[] = [
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
];

const descriptionText = [
  "Push <signature> onto the stack",
  "Push <pubkey> onto the stack",
];

const codeBlocks: CodeBlockType[] = [
  {
    code: " # WitnessScript",
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
    step: 2,
  },
  {
    code: "[taproot-output]",
    displayType: CodeDisplayBlock.code,
    step: 3,
  },
];

const P2TRKP: SCRIPTS_PAGE_PROPS = {
  descriptionText: descriptionText,
  codeBlocks: codeBlocks,
  STACK_DATA: P2TRKP_STEPS,
  shortHand: "P2TR-KP",
  longHand: "(pay to taproot - keypath)",
  opCodes: "",
  shortDescription:
    "A Taproot output spent with through the key path for a (likely) simple direct transfer",
  longDescription:
    "A Pay-to-TapRoot - KeyPath script is a P2TR output scriptPubKey that was unlocked with the keypath. P2TR outputs have both a straight-forward keypath unlockable with a Schnorr Signature & a tree of scripts (called scriptpath) that require much more data to unlock. Below is an example of the former.",
  introduction: "BIP133",
  opCodeReview:
    "P2TR - KeyPath requires only two (2) pieces of data & four (4) op_codes as P2PKH. However, as we see in the first step below, the initial formatting for the ScriptPubKey is different.",
  inUse: "Yes",
  numberOfOps: "2",
  generalType: "Script",
  linkPath: "/scripts/P2TR-KP",
  exampleLink: "",
  image: "/images/P2SH.svg",
};

export default P2TRKP;
