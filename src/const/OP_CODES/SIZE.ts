import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const SIZE_STEPS: EXECUTION_STEPS[] = [];

export const OP_SIZE: OP_CODE_PAGE_PROPS = {
  name: "OP_SIZE",
  opCode: "130",
  hex: "0x82",
  category: "Stack",
  shortDescription:
    "Pushes the size of the top item on the stack onto the stack.",
  longDescription:
    "The OP_SIZE opcode is designed to assess the size of the data present in the top item of the stack. It pushes the size (in bytes) of this item onto the stack but does not remove the original item. This is particularly useful in scripts that need to validate or work with data of specific sizes, such as in certain data verification scripts or in complex contracts that require inputs of a certain length or format.",
  inputNum: "",
  inputType: "",
  returnNum: "1",
  returnType: "Number",
  seenIn: "",

  linkPath: "/OPS/OP_SIZE",
  tileImage: "",
  type: "Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: SIZE_STEPS,
    failureSteps: SIZE_STEPS,
    title: "OP_Code Walkthrough",
    description: "Pushes the size of the top item on the stack onto the stack.",
    steps: ["Peek at Top Item", "Push Size of Item"],
  },
};
