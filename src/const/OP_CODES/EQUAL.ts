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
  longDescription:
    "OP_EQUAL is a fundamental logical opcode in Bitcoin's scripting language. It is used to compare the top two items on the stack. When this opcode is executed, it removes the top two items from the stack and compares them. If the items are identical, OP_EQUAL pushes true (1) onto the stack; if they are not, it pushes false (0). This opcode is integral in various script types, including those for standard transaction validation, where it's used to ensure that provided data (like a hashed public key) matches expected values",
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
