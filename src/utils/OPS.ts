import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OP_Dup";
import { OP_DUP_STEPS } from ".";
import HASH_160_STEPS from "@/const/HASH_160_STEPS";

export const OP_DUP: OP_CODE_PAGE_PROPS = {
  name: "OP_DUP",
  langId: "(118 | 0x76)",
  info: "OP_DUP is a common stack operation used to duplicate the top item of the stack. Dup, short for duplicate, is usually used when we need to do something more than once (usually verify), with a specific existing item in the stack. In P2PKH, for example, it’s used to duplicate a public key which is used twice: once in an OP_EQUALVERIFY & again in OP_CHECKSIG.",
  input: 1,
  output: 2,
  visualProps: {
    stackSteps: OP_DUP_STEPS,
    title: "OP_Code Walkthrough",
    description:
      "OP_Dup takes in one parameter, the top item of the stack, & returns an additional single integer stack item.",
    steps: [
      "Get the value (not pop) of the top stack item",
      "Duplicate item (in binary)",
      "Push duplicated item",
    ],
  },
};

export const OP_HASH_160: OP_CODE_PAGE_PROPS = {
  name: "OP_HASH_160",
  langId: "(169 | 0xa9)",
  info: "Hashes the top item on the stack using the RIPEMD-160 and SHA-256 algorithms.",
  input: 1,
  output: 1,
  visualProps: {
    stackSteps: HASH_160_STEPS,
    title: "OP_Code Walkthrough",
    description:
      "Hashes the top item on the stack using the RIPEMD-160 and SHA-256 algorithms.",
    steps: [
      "Pop top item",
      "Apply Hash160 (ripemd160  then sha256)",
      "Push result",
    ],
  },
};

export const OP_EQUAL: OP_CODE_PAGE_PROPS = {
  name: "OP_EQUAL",
  langId: "(135 | 0x87)",
  info: "Compares the top two items on the stack for equality.",
  input: 2,
  output: 1,
  visualProps: {
    stackSteps: HASH_160_STEPS,
    title: "OP_Code Walkthrough",
    description: "Compares the top two items on the stack for equality.",
    steps: ["Pop top item", "Pop top item", "Push result of equality check"],
  },
};
