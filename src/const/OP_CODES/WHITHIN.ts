import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const WITHIN_STEPS: EXECUTION_STEPS[] = [];

export const OP_WITHIN: OP_CODE_PAGE_PROPS = {
  name: "OP_WITHIN",
  opCode: "165",
  hex: "0xa5",
  category: "Math",
  shortDescription:
    "Checks if the third item of the stack is within the top two items.",
  longDescription:
    "OP_WITHIN is used to verify whether a given number falls within a certain range. It takes three values from the stack: x, min, and max, and checks whether min <= x < max. If x is within this range, the opcode pushes true (1) onto the stack; otherwise, it pushes false (0). This operation is useful in scripts that need to validate whether an input meets specific numerical conditions.",
  inputNum: "3",
  inputType: "Numbers",
  returnNum: "1",
  returnType: "Number (Boolean)",
  seenIn: "",

  linkPath: "/OPS/OP_WITHIN",
  tileImage: "",
  type: "Conditional",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: WITHIN_STEPS,
    failureSteps: WITHIN_STEPS,
    title: "OP_Code Walkthrough",
    description:
      "Checks if the third item of the stack is within the top two items.",
    steps: [
      "Pop Top Item (max)",
      "Pop Next Top Item (min)",
      "Pop Next Top Item (x)",
      "Check Range",
      "Push result",
    ],
  },
};
