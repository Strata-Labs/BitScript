import { SCRIPT_DATA_STACK } from "@/SCRIPT_ANIMATION_LIB";
import { OP_DUP_STEPS } from "../OP_CODES/DUP";
import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import {
  CodeBlockType,
  CodeDisplayBlock,
} from "@/comp/scripts/ScriptVideoContainer";

export const P2WPKH_STEPS: SCRIPT_DATA_STACK[] = [
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
        dataString: "<lock-script>",
      },
    ],
    stackData: {},
  },
];

const codeBlocks: CodeBlockType[] = [
  {
    code: "# WitnessScript",
    displayType: CodeDisplayBlock.comment,
  },
  {
    code: "<OP_70 - 72> ",
    displayType: CodeDisplayBlock.code,
    step: 0,
  },
  {
    code: "[ecdsa-signature]",
    displayType: CodeDisplayBlock.code,
    step: 1,
  },
  {
    code: "<OP_33> ",
    displayType: CodeDisplayBlock.code,
    step: 2,
  },
  {
    code: "[public-key]",
    displayType: CodeDisplayBlock.code,
    step: 3,
  },
  {
    code: "# PubKeyScript",
    displayType: CodeDisplayBlock.comment,
  },
  {
    code: "<OP_0> ",
    displayType: CodeDisplayBlock.code,
    step: 4,
  },
  {
    code: "<OP_20>",
    displayType: CodeDisplayBlock.code,
    step: 5,
  },
  {
    code: "[hash160 [public-key]]",
    displayType: CodeDisplayBlock.code,
    step: 6,
  },
];

const P2WPKH: SCRIPTS_PAGE_PROPS = {
  descriptionText: [],
  codeBlocks,
  STACK_DATA: P2WPKH_STEPS,
  shortHand: "P2WPKH",
  longHand: "(pay to witness public key hash)",
  shortDescription:
    "The standard SegWit script for  direct transfers & the most common transaction type.",
  longDescription: [
    " A Pay-to-Witness-Public-Key-Hash (P2WPKH) script is the standard SegWit script for a direct transfer transaction. The logic for a P2WPKH witness script & output pubKeyScript is exactly the same as a P2PKH input sigScript & output pubKeyScript. However, there is a large difference in the op_codes explicitly expressed in the raw transaction. Wallets/clients know that when a P2WPKH output is detected they'll need to insert the common P2PKH op_codes; therefore, a P2WPKH pubKeyScript requires only one specific item: a hashed public key.",
  ],

  introduction: "BIP141",
  opCodeReview:
    "P2WPKH requires the same three (3) pieces of data & four (4) op_codes as P2PKH. However, as we see in the first step below, the initial formatting for the ScriptPubKey is different.",
  inUse: "Yes",
  numberOfOps: "4",
  generalType: "Script",
  linkPath: "/scripts/P2WPKH",
  exampleLink: "",
  image: "/images/P2PK.svg",
};

export default P2WPKH;
