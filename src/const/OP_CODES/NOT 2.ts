import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const NOT_STEPS: EXECUTION_STEPS[] = [];

export const OP_NOT: OP_CODE_PAGE_PROPS = {
  name: "OP_NOT",
  opCode: "145",
  hex: "0x91",
  category: "Math",
  shortDescription: "Logical NOT of the top item of the stack",
  longDescription:
    "OP_NOT is used to invert the boolean value of the top item on the stack. If the top item is nonzero, OP_NOT replaces it with 0 (false), and if it is 0, OP_NOT replaces it with 1 (true). This opcode is often used in scripts that require logical negation, such as inverting conditions or toggling boolean flags.",
  inputNum: "1",
  inputType: "Number (Boolean)",
  returnNum: "1",
  returnType: "Number (Boolean)",
  seenIn: "",

  linkPath: "/OPS/OP_NOT",
  tileImage: "",
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: NOT_STEPS,
    failureSteps: NOT_STEPS,
    title: "OP_Code Walkthrough",
    description: "Logical NOT of the top item of the stack",
    steps: ["Pop Top Item", "Compute logical NOT of item", "Push Item"],
  },
};
