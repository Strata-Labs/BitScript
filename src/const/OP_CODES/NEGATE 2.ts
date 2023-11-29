import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const NEGATE_STEPS: EXECUTION_STEPS[] = [];

export const OP_NEGATE: OP_CODE_PAGE_PROPS = {
  name: "OP_NEGATE",
  opCode: "143",
  hex: "0x8f",
  category: "Math",
  shortDescription: "Negates the top item of the stack",
  longDescription:
    "OP_NEGATE changes the sign of the top numeric item on the stack. It turns positive numbers into their negative counterparts and vice versa. This opcode is particularly useful in scripts that require the inversion of values, such as in financial transactions involving refunds or reversals.",
  inputNum: "1",
  inputType: "Number",
  returnNum: "1",
  returnType: "Number",
  seenIn: "",

  linkPath: "/OPS/OP_NEGATE",
  tileImage: "",
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: NEGATE_STEPS,
    failureSteps: NEGATE_STEPS,
    title: "OP_Code Walkthrough",
    description: "Negates the top item of the stack",
    steps: ["Pop Top Item", "Multiply Item by -1", "Push Item"],
  },
};
