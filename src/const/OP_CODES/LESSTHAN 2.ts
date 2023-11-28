import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const LESSTHAN_STEPS: EXECUTION_STEPS[] = [];

export const OP_LESSTHAN: OP_CODE_PAGE_PROPS = {
  name: "OP_LESSTHAN",
  opCode: "159",
  hex: "0x9f",
  category: "Math",
  shortDescription:
    "Checks if the second item is less than the top item of the stack",
  longDescription:
    "OP_LESSTHAN compares the top two items on the stack and checks if the second-to-top item is less than the top item. If so, it pushes 1 (true) onto the stack; otherwise, it pushes 0 (false). This opcode is used in scripts that require a less-than comparison between numerical values.",
  inputNum: "2",
  inputType: "Number",
  returnNum: "1",
  returnType: "Number (Boolean)",
  seenIn: "",

  linkPath: "/OPS/OP_LESSTHAN",
  tileImage: "",
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: LESSTHAN_STEPS,
    failureSteps: LESSTHAN_STEPS,
    title: "OP_Code Walkthrough",
    description:
      "Checks if the second item is less than the top item of the stack",
    steps: [
      "Pop Top Item a",
      "Pop Top Item b",
      "Check if b is less than a",
      "Push Result",
    ],
  },
};
