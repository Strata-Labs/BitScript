import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const NUMEQUAL_STEPS: EXECUTION_STEPS[] = [];

export const OP_NUMEQUAL: OP_CODE_PAGE_PROPS = {
  name: "OP_NUMEQUAL",
  opCode: "156",
  hex: "0x9c",
  category: "Math",
  shortDescription: "Compares the top two items of the stack for equality",
  longDescription:
    "OP_NUMEQUAL compares the top two items on the stack numerically. If they are equal, it pushes 1 (true) onto the stack; if not, it pushes 0 (false). This opcode is vital in scripts that require equality checks between numerical values.",
  inputNum: "2",
  inputType: "Number",
  returnNum: "1",
  returnType: "Number (Boolean)",
  seenIn: "",

  linkPath: "/OPS/OP_NUMEQUAL",
  tileImage: "",
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: NUMEQUAL_STEPS,
    failureSteps: NUMEQUAL_STEPS,
    title: "OP_Code Walkthrough",
    description: "Compares the top two items of the stack for equality",
    steps: [
      "Pop Top Item a",
      "Pop Top Item b",
      "Check if a is equal to b ",
      "Push Result",
    ],
  },
};
