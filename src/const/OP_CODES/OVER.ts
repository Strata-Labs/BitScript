import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const OVER_STEPS: EXECUTION_STEPS[] = [];

export const OP_OVER: OP_CODE_PAGE_PROPS = {
  name: "OP_OVER",
  opCode: "120",
  hex: "0x78",
  category: "Stack",
  shortDescription: "Copies the second-to-top stack item to the top.",
  longDescription:
    "The OP_OVER opcode is used to duplicate the second-to-top item on the stack, placing this copy on top of the stack. It is often used in scripts that require the reuse of a previous value while keeping the original stack order intact, such as in scripts that perform repeated calculations or comparisons with a specific stack item.",
  inputNum: "2",
  inputType: "Any",
  returnNum: "3",
  returnType: "Any",
  seenIn: "",

  linkPath: "/OPS/OP_OVER",
  tileImage: "",
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: OVER_STEPS,
    failureSteps: OVER_STEPS,
    title: "OP_Code Walkthrough",
    description: "Copies the second-to-top stack item to the top.",
    steps: [
      "Pop Top Item 1",
      "Pop Top Item 2",
      "Push Item 2",
      "Push Item 1",
      "Push Item 2",
    ],
  },
};
