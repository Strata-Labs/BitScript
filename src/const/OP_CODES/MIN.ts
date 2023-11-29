import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const MIN_STEPS: EXECUTION_STEPS[] = [];

export const OP_MIN: OP_CODE_PAGE_PROPS = {
  name: "OP_MIN",
  opCode: "163",
  hex: "0xa3",
  category: "Math",
  shortDescription:
    "Pushes the smaller of the top two items on the stack onto the stack.",
  longDescription:
    "OP_MIN performs a similar function to OP_MAX but in reverse. It assesses the top two numerical values on the stack, popping them off for comparison. The opcode then pushes the smaller of these two values back onto the stack. This operation is particularly useful in scripts that require determination of minimum thresholds or limits, such as in scripts that enforce minimum payment amounts or other conditional logic based on numerical values.",
  inputNum: "2",
  inputType: "Numbers",
  returnNum: "1",
  returnType: "Number",
  seenIn: "",

  linkPath: "/OPS/OP_MIN",
  tileImage: "",
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: MIN_STEPS,
    failureSteps: MIN_STEPS,
    title: "OP_Code Walkthrough",
    description:
      "Pushes the smaller of the top two items on the stack onto the stack.",
    steps: ["Pop Top Item", "Pop Next Top Item", "Push Minimum of Two Items"],
  },
};
