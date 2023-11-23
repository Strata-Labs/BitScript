import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const SHA1_STEPS: EXECUTION_STEPS[] = [];

export const OP_SHA1: OP_CODE_PAGE_PROPS = {
  name: "OP_SHA1",
  opCode: "167",
  hex: "0xa7",
  category: "Crypto",
  shortDescription:
    "Performs the SHA-1 hash function on the top item of the stack.",
  longDescription:
    "SHA1, or Secure Hash Algorithm 1, is a cryptographic hash function which produces a 160-bit (20-byte) hash value, often rendered as a hexadecimal number that's 40 digits long. Despite its ubiquity in various systems, it's seen declining use in Bitcoin due to vulnerability concerns. The Bitcoin Script opcode OP_SHA1 provides a direct way to compute the SHA-1 hash of data, but in modern Bitcoin protocols, its use is discouraged in favor of more secure algorithms. ",
  inputNum: "1",
  inputType: "Any",
  returnNum: "1",
  returnType: "Bytes (20)",
  seenIn: "",

  linkPath: "/OPS/OP_SHA1",
  tileImage: SHA1,
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: SHA1_STEPS,
    failureSteps: SHA1_STEPS,
    title: "OP_Code Walkthrough",
    description:
      "Performs the SHA-1 hash function on the top item of the stack.",
    steps: ["Pop top item", "Apply SHA1 hash", "Push hashed item"],
  },
};
