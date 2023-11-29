import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const ONEADD_STEPS: EXECUTION_STEPS[] = [];

export const OP_ONEADD: OP_CODE_PAGE_PROPS = {
  name: "OP_ONEADD",
  opCode: "139",
  hex: "0x8b",
  category: "Math",
  shortDescription: "Increments the top item of the stack by 1",
  longDescription:
    "OP_1ADD is a simple arithmetic opcode that adds 1 to the top item on the stack. This opcode is typically used in scripts that require incremental steps or counters, such as in loop-like structures within a script or in scenarios where a value needs to be adjusted by a single increment.",
  inputNum: "1",
  inputType: "Number",
  returnNum: "1",
  returnType: "Number",
  seenIn: "",

  linkPath: "/OPS/OP_ONEADD",
  tileImage: "",
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: ONEADD_STEPS,
    failureSteps: ONEADD_STEPS,
    title: "OP_Code Walkthrough",
    description: "Increments the top item of the stack by 1",
    steps: ["Pop Top Item", "Add 1 to Item", "Push Item"],
  },
};
