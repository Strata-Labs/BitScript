import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OP_Dup";
import { _TEST } from ".";

export const OP_DUP: OP_CODE_PAGE_PROPS = {
  name: "OP_DUP",
  langId: "(118 | 0x76)",
  info: "OP_DUP is a common stack operation used to duplicate the top item of the stack. Dup, short for duplicate, is usually used when we need to do something more than once (usually verify), with a specific existing item in the stack. In P2PKH, for example, it’s used to duplicate a public key which is used twice: once in an OP_EQUALVERIFY & again in OP_CHECKSIG.",
  input: 1,
  output: 2,
  visualProps: {
    stackSteps: _TEST,
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
