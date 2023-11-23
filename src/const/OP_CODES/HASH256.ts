import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import HASH256 from "@/../public/images/HASH256.svg";

const HASH256_STEPS: EXECUTION_STEPS[] = [];

export const OP_HASH256: OP_CODE_PAGE_PROPS = {
  name: "OP_HASH256",
  opCode: "170",
  hex: "0xaa",
  category: "Crypto",
  shortDescription:
    "Applies the SHA-256 hashing algorithm twice on the top item of the stack.",
  longDescription:
    "The operation OP_HASH256 represents a specific double hashing using the SHA-256 algorithm. It takes an input, hashes it once with SHA-256, and then hashes the result again with SHA-256. This double hashing is a distinctive part of the Bitcoin protocol and is used notably in the creation of block hashes and transaction IDs.",
  inputNum: "1",
  inputType: "Any",
  returnNum: "1",
  returnType: "Bytes (32)",
  seenIn: "",

  linkPath: "/OPS/OP_HASH256",
  tileImage: HASH256,
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: HASH256_STEPS,
    failureSteps: HASH256_STEPS,
    title: "OP_Code Walkthrough",
    description:
      "Double-hashes the top item on the stack using the SHA256 algorithm.",
    steps: [
      "Pop top item",
      "Apply First SHA256 hash",
      "Apply Second SHA256 hash",
      "Push twice-hashed item",
    ],
  },
};
