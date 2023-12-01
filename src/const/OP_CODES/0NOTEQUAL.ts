import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import ZNE from "@/../public/images/ZNE.svg";

const ZERONOTEQUAL_STEPS: EXECUTION_STEPS[] = [];

export const OP_ZERONOTEQUAL: OP_CODE_PAGE_PROPS = {
  name: "OP_ZERONOTEQUAL",
  opCode: "146",
  hex: "0x92",
  category: "Math",
  shortDescription: "Checks if the top item of the stack is not 0",
  longDescription:
    "OP_0NOTEQUAL checks whether the top item on the stack is not zero. If the top item is any nonzero value, OP_0NOTEQUAL pushes 1 (true) onto the stack; if the top item is 0, it pushes 0 (false). This opcode is useful in conditions where the presence or absence of a value is to be checked, essentially serving as a nonzero check.",
  inputNum: "1",
  inputType: "Number",
  returnNum: "1",
  returnType: "Number (Boolean)",
  seenIn: "",

  linkPath: "/OPS/OP_ZERONOTEQUAL",
  tileImage: ZNE,
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: ZERONOTEQUAL_STEPS,
    failureSteps: ZERONOTEQUAL_STEPS,
    title: "OP_Code Walkthrough",
    description: "Checks if the top item of the stack is not 0",
    steps: ["Pop Top Item", "Check if item is not 0 ", "Push Result"],
  },
};
