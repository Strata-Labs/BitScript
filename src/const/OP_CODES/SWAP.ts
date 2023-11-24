import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const SWAP_STEPS: EXECUTION_STEPS[] = [];

export const OP_SWAP: OP_CODE_PAGE_PROPS = {
  name: "OP_SWAP",
  opCode: "124",
  hex: "0x7c",
  category: "Stack",
  shortDescription: "Swaps the top two stack items.",
  longDescription:
    "OP_SWAP is a straightforward stack manipulation opcode that swaps the positions of the top two items on the stack. This operation is integral in scripts where the order of items needs to be altered for proper execution of subsequent operations, such as in complex scripts that perform multiple operations on a series of stack items.",
  inputNum: "2",
  inputType: "Any",
  returnNum: "2",
  returnType: "Any",
  seenIn: "",

  linkPath: "/OPS/OP_SWAP",
  tileImage: "",
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: SWAP_STEPS,
    failureSteps: SWAP_STEPS,
    title: "OP_Code Walkthrough",
    description: "Swaps the top two stack items.",
    steps: ["Pop Top Item 1", "Pop Top Item 2", "Push Item 2", "Push Item 1"],
  },
};
