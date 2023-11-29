import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const LESSTHANOREQUAL_STEPS: EXECUTION_STEPS[] = [];

export const OP_LESSTHANOREQUAL: OP_CODE_PAGE_PROPS = {
  name: "OP_LESSTHANOREQUAL",
  opCode: "161",
  hex: "0xa1",
  category: "Math",
  shortDescription:
    "Checks if the second item is less than or equal to the top item of the stack",
  longDescription:
    "OP_LESSTHANOREQUAL compares the top two items on the stack, checking if the second-to-top item is less than or equal to the top item. It pushes 1 (true) if this condition is met, and 0 (false) if not. This opcode is used in scripts where a less-than-or-equal-to comparison is required.",
  inputNum: "2",
  inputType: "Number",
  returnNum: "1",
  returnType: "Number (Boolean)",
  seenIn: "",

  linkPath: "/OPS/OP_LESSTHANOREQUAL",
  tileImage: "",
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: LESSTHANOREQUAL_STEPS,
    failureSteps: LESSTHANOREQUAL_STEPS,
    title: "OP_Code Walkthrough",
    description:
      "Checks if the second item is less than or equal to the top item of the stack",
    steps: [
      "Pop Top Item a",
      "Pop Top Item b",
      "Check if b is less than or equal to a ",
      "Push Result",
    ],
  },
};
