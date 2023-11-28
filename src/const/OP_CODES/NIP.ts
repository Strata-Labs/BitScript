import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const NIP_STEPS: EXECUTION_STEPS[] = [];

export const OP_NIP: OP_CODE_PAGE_PROPS = {
  name: "OP_NIP",
  opCode: "119",
  hex: "0x77",
  category: "Stack",
  shortDescription: "Removes the second-to-top stack item.",
  longDescription:
    "OP_NIP is a selective stack manipulation opcode that removes the second-to-top item from the stack, leaving the top item intact. This opcode is useful in scenarios where the script needs to discard an intermediate calculation or value that is no longer needed for the remaining operations, thereby streamlining the script execution process.",
  inputNum: "2",
  inputType: "Any",
  returnNum: "1",
  returnType: "Any",
  seenIn: "",

  linkPath: "/OPS/OP_NIP",
  tileImage: "",
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: NIP_STEPS,
    failureSteps: NIP_STEPS,
    title: "OP_Code Walkthrough",
    description: "Removes the second-to-top stack item.",
    steps: ["Pop Top Item 1", "Pop Top Item 2", "Push Item 1"],
  },
};
