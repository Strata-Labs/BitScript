import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const GREATERTHAN_STEPS: EXECUTION_STEPS[] = [];

export const OP_GREATERTHAN: OP_CODE_PAGE_PROPS = {
  name: "OP_GREATERTHAN",
  opCode: "160",
  hex: "0xa0",
  category: "Math",
  shortDescription:
    "Checks if the second item is greater than the top item of the stack",
  longDescription:
    "Opposite to OP_LESSTHAN, OP_GREATERTHAN checks if the second-to-top item on the stack is greater than the top item. It pushes 1 (true) if this is the case, and 0 (false) otherwise. This opcode is essential in scripts that involve greater-than comparisons.",
  inputNum: "2",
  inputType: "Number",
  returnNum: "1",
  returnType: "Number (Boolean)",
  seenIn: "",

  linkPath: "/OPS/OP_GREATERTHAN",
  tileImage: "",
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: GREATERTHAN_STEPS,
    failureSteps: GREATERTHAN_STEPS,
    title: "OP_Code Walkthrough",
    description:
      "Checks if the second item is greater than the top item of the stack",
    steps: [
      "Pop Top Item a",
      "Pop Top Item b",
      "Check if b is greater than a",
      "Push Result",
    ],
  },
};
