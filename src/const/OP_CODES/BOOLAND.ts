import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const BOOLAND_STEPS: EXECUTION_STEPS[] = [];

export const OP_BOOLAND: OP_CODE_PAGE_PROPS = {
  name: "OP_BOOLAND",
  opCode: "154",
  hex: "0x9a",
  category: "Math",
  shortDescription: "Logical AND of the top two items of the stack",
  longDescription:
    "OP_BOOLAND is a logical operation that takes the top two items from the stack and performs a logical AND operation. If both items are nonzero, it pushes 1 (true) onto the stack; otherwise, it pushes 0 (false). This opcode is used in scripts where a logical conjunction of two conditions is necessary.",
  inputNum: "2",
  inputType: "Number",
  returnNum: "1",
  returnType: "Number (Boolean)",
  seenIn: "",

  linkPath: "/OPS/OP_BOOLAND",
  tileImage: "",
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: BOOLAND_STEPS,
    failureSteps: BOOLAND_STEPS,
    title: "OP_Code Walkthrough",
    description: "Logical AND of the top two items of the stack",
    steps: [
      "Pop Top Item a",
      "Pop Top Item b",
      "Compute logical AND of a and b",
      "Push Result",
    ],
  },
};
