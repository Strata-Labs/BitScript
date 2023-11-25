import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import ADD_TILE from "@/../public/images/ADD_TILE.svg";

const EQUAL_STEPS: EXECUTION_STEPS[] = [];

export const OP_EQUAL: OP_CODE_PAGE_PROPS = {
  name: "OP_EQUAL",
  opCode: "135",
  hex: "0x87",
  category: "Logic",
  shortDescription:
    "Compares the top two items on the stack for equality, pushes result (0 or 1).",
  longDescription: "",
  inputNum: "2",
  inputType: "Any",
  returnNum: "1",
  returnType: "Number (boolean)",
  seenIn: "p2pkh, p2sh, p2wpkh, p2wsh",

  linkPath: "/OPS/OP_EQUAL",
  tileImage: "",
  type: "ScriptControl",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: EQUAL_STEPS,
    failureSteps: EQUAL_STEPS,
    title: "OP_Code Walkthrough",
    description:
      "Marks the transaction as invalid and returns all of the script's remaining bytes as an error message.",
    steps: [
      "Pop top item",
      "Pop top item",
      "Push result of comparison (boolean)",
    ],
  },
};
