import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import ONESUB from "@/../public/images/ONESUB.svg";

const ONESUB_STEPS: EXECUTION_STEPS[] = [];

export const OP_ONESUB: OP_CODE_PAGE_PROPS = {
  name: "OP_ONESUB",
  opCode: "140",
  hex: "0x8c",
  category: "Math",
  shortDescription: "Decrements the top item of the stack by 1",
  longDescription:
    "The counterpart to OP_1ADD, OP_1SUB subtracts 1 from the top item on the stack. This opcode finds its use in scripts that require decrementing values, such as in countdowns, decrementing loops, or in adjusting values downward by a single unit.",
  inputNum: "1",
  inputType: "Number",
  returnNum: "1",
  returnType: "Number",
  seenIn: "",

  linkPath: "/OPS/OP_ONESUB",
  tileImage: ONESUB,
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: ONESUB_STEPS,
    failureSteps: ONESUB_STEPS,
    title: "OP_Code Walkthrough",
    description: "Decrements the top item of the stack by 1",
    steps: ["Pop Top Item", "Substract 1 from Item", "Push Item"],
  },
};
