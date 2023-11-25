import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const NUMEQUALVERIFY_STEPS: EXECUTION_STEPS[] = [];

export const OP_NUMEQUALVERIFY: OP_CODE_PAGE_PROPS = {
  name: "OP_NUMEQUALVERIFY",
  opCode: "157",
  hex: "0x9d",
  category: "Math",
  shortDescription:
    "Compares the top two items of the stack for equality, stops executing if false",
  longDescription:
    "OP_NUMEQUALVERIFY is similar to OP_NUMEQUAL but with an additional verification step. It performs the same numerical equality check and then executes an OP_VERIFY, meaning that the script will only continue if the comparison is true. This opcode is used in scripts where an equality check is crucial to the script's subsequent operations.",
  inputNum: "2",
  inputType: "Number",
  returnNum: "0",
  returnType: "",
  seenIn: "",

  linkPath: "/OPS/OP_NUMEQUALVERIFY",
  tileImage: "",
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: NUMEQUALVERIFY_STEPS,
    failureSteps: NUMEQUALVERIFY_STEPS,
    title: "OP_Code Walkthrough",
    description:
      "Compares the top two items of the stack for equality, stops executing if false",
    steps: [
      "Pop Top Item a",
      "Pop Top Item b",
      "Check if a is equal to b, if not, script fails",
    ],
  },
};
