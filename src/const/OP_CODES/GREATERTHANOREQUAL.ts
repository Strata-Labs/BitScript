import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const GREATERTHANOREQUAL_STEPS: EXECUTION_STEPS[] = [];

export const OP_GREATERTHANOREQUAL: OP_CODE_PAGE_PROPS = {
  name: "OP_GREATERTHANOREQUAL",
  opCode: "162",
  hex: "0xa2",
  category: "Math",
  shortDescription:
    "Checks if the second item is greater than or equal to the top item of the stack",
  longDescription:
    "OP_GREATERTHANOREQUAL performs a comparison similar to OP_LESSTHANOREQUAL but in the opposite direction. It checks if the second-to-top item is greater than or equal to the top item, pushing 1 (true) if so, and 0 (false) if not. This opcode is used in scripts needing a greater-than-or-equal-to comparison.",
  inputNum: "2",
  inputType: "Number",
  returnNum: "1",
  returnType: "Number (Boolean)",
  seenIn: "",

  linkPath: "/OPS/OP_GREATERTHANOREQUAL",
  tileImage: "",
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: GREATERTHANOREQUAL_STEPS,
    failureSteps: GREATERTHANOREQUAL_STEPS,
    title: "OP_Code Walkthrough",
    description:
      "Checks if the second item is greater than or equal to the top item of the stack",
    steps: [
      "Pop Top Item a",
      "Pop Top Item b",
      "Check if b is greater than or equal to a",
      "Push Result",
    ],
  },
};
