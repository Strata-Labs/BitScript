import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import ABS from "@/../public/images/ABS.svg";

const ABS_STEPS: EXECUTION_STEPS[] = [];

export const OP_ABS: OP_CODE_PAGE_PROPS = {
  name: "OP_ABS",
  opCode: "144",
  hex: "0x90",
  category: "Math",
  shortDescription: "Absolute value of the top item of the stack",
  longDescription:
    "OP_ABS takes the top item on the stack and replaces it with its absolute value. This operation is crucial in scripts where only the magnitude of a number matters, irrespective of its sign, such as in scripts comparing distances, differences, or other calculations where direction or sign is irrelevant.",
  inputNum: "1",
  inputType: "Number",
  returnNum: "1",
  returnType: "Number",
  seenIn: "",

  linkPath: "/OPS/OP_ABS",
  tileImage: ABS,
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: ABS_STEPS,
    failureSteps: ABS_STEPS,
    title: "OP_Code Walkthrough",
    description: "Absolute value of the top item of the stack",
    steps: ["Pop Top Item", "Compute absolute value of item ", "Push Item"],
  },
};
