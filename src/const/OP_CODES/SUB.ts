import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const SUB_STEPS: EXECUTION_STEPS[] = [];

export const OP_SUB: OP_CODE_PAGE_PROPS = {
  name: "OP_SUB",
  opCode: "148",
  hex: "0x94",
  category: "Math",
  shortDescription: "Subtracts the second item from the top item of the stack",
  longDescription:
    "OP_SUB performs a subtraction operation between the top two items on the stack. It pops these two items, subtracts the top item from the second-to-top item, and pushes the result back onto the stack. This opcode is essential in scripts that involve arithmetic calculations, particularly where differences between values are required.",
  inputNum: "2",
  inputType: "Number",
  returnNum: "1",
  returnType: "Number",
  seenIn: "",

  linkPath: "/OPS/OP_SUB",
  tileImage: "",
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: SUB_STEPS,
    failureSteps: SUB_STEPS,
    title: "OP_Code Walkthrough",
    description: "Subtracts the second item from the top item of the stack",
    steps: [
      "Pop Top Item a",
      "Pop Top Item b",
      "Subtract b from a ",
      "Push Result",
    ],
  },
};
