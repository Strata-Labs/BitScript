import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const BOOLOR_STEPS: EXECUTION_STEPS[] = [];

export const OP_BOOLOR: OP_CODE_PAGE_PROPS = {
  name: "OP_BOOLOR",
  opCode: "155",
  hex: "0x9b",
  category: "Math",
  shortDescription: "Logical OR of the top two items of the stack",
  longDescription:
    "Similar to OP_BOOLAND, OP_BOOLOR performs a logical OR operation on the top two items on the stack. If at least one of the items is nonzero, OP_BOOLOR pushes 1 (true); if both are 0, it pushes 0 (false). This opcode is useful in scripts that require a logical disjunction, where either of the conditions being true is sufficient.",
  inputNum: "2",
  inputType: "Number",
  returnNum: "1",
  returnType: "Number (Boolean)",
  seenIn: "",

  linkPath: "/OPS/OP_BOOLOR",
  tileImage: "",
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: BOOLOR_STEPS,
    failureSteps: BOOLOR_STEPS,
    title: "OP_Code Walkthrough",
    description: "Logical OR of the top two items of the stack",
    steps: [
      "Pop Top Item a",
      "Pop Top Item b",
      "Compute logical OR of a and b",
      "Push Result",
    ],
  },
};
