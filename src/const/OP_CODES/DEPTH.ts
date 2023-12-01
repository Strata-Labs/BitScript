import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import DEPTH from "@/../public/images/DEPTH.svg";

const DEPTH_STEPS: EXECUTION_STEPS[] = [];

export const OP_DEPTH: OP_CODE_PAGE_PROPS = {
  name: "OP_DEPTH",
  opCode: "116",
  hex: "0x74",
  category: "Stack",
  shortDescription: "Pushes the depth of the stack onto the stack.",
  longDescription:
    "As a stack-based language, it's always useful to capture the current state of the stack. The OP_Depth op is used specifically to provide a count of all the items in the stack (without removing / popping any item) & pushing that count value (in hex) onto the stack. While not used in any of the common scripts, op_depth could be useful in a multsig scenario where a count is needed to check the number of m-of-n signatures.",
  inputNum: "0",
  inputType: "N/A",
  returnNum: "1",
  returnType: "Number",
  seenIn: "N/A",
  Status: "Committed",
  linkPath: "/OPS/OP_DEPTH",
  tileImage: DEPTH,
  type: "Stack",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: DEPTH_STEPS,
    failureSteps: DEPTH_STEPS,
    title: "OP_Code Walkthrough",
    description: "Pushes the depth of the stack onto the stack.",
    steps: [
      "Get the count value of the current stack (how many items)",
      "Push result of count value",
    ],
  },
};
