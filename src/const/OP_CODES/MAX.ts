import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const MAX_STEPS: EXECUTION_STEPS[] = [];

export const OP_MAX: OP_CODE_PAGE_PROPS = {
  name: "OP_MAX",
  opCode: "164",
  hex: "0xa4",
  category: "Math",
  shortDescription:
    "Pushes the larger of the top two items on the stack onto the stack.",
  longDescription:
    "OP_MAX is used in Bitcoin scripting to compare two numerical values from the stack. When executed, it pops the top two items, which are expected to be numeric values, and then evaluates which of the two is larger. The larger of these two values is then pushed back onto the stack. This opcode is crucial in scripts where decisions are made based on the comparison of numerical values, such as in certain types of conditional transactions or complex multi-condition scripts.",
  inputNum: "2",
  inputType: "Numbers",
  returnNum: "1",
  returnType: "Number",
  seenIn: "",

  linkPath: "/OPS/OP_MAX",
  tileImage: "",
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: MAX_STEPS,
    failureSteps: MAX_STEPS,
    title: "OP_Code Walkthrough",
    description:
      "Pushes the larger of the top two items on the stack onto the stack.",
    steps: ["Pop Top Item", "Pop Next Top Item", "Push Maximum of Two Items"],
  },
};
