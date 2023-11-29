import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const NUMNOTEQUAL_STEPS: EXECUTION_STEPS[] = [];

export const OP_NUMNOTEQUAL: OP_CODE_PAGE_PROPS = {
  name: "OP_NUMNOTEQUAL",
  opCode: "158",
  hex: "0x9e",
  category: "Math",
  shortDescription: "Compares the top two items of the stack for inequality",
  longDescription:
    "The inverse of OP_NUMEQUAL, OP_NUMNOTEQUAL checks whether the top two items on the stack are numerically unequal. It pushes 1 (true) if they are not equal, and 0 (false) if they are equal. This opcode is used in conditions where inequality is a key factor in the script's logic.",
  inputNum: "2",
  inputType: "Number",
  returnNum: "1",
  returnType: "Number (Boolean)",
  seenIn: "",

  linkPath: "/OPS/OP_NUMNOTEQUAL",
  tileImage: "",
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: NUMNOTEQUAL_STEPS,
    failureSteps: NUMNOTEQUAL_STEPS,
    title: "OP_Code Walkthrough",
    description: "Compares the top two items of the stack for inequality",
    steps: [
      "Pop Top Item a",
      "Pop Top Item b",
      "Check if a is not equal to b ",
      "Push Result",
    ],
  },
};
