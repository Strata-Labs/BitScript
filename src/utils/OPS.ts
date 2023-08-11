import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OP_Dup";
import { OP_ADD } from "@/const/OP_CODES/ADD";
import { OP_CHECKSIG } from "@/const/OP_CODES/CHECKSIG";
import { OP_DEPTH } from "@/const/OP_CODES/DEPTH";
import { OP_DUP } from "@/const/OP_CODES/DUP";
import { OP_HASH_160 } from "@/const/OP_CODES/HASH_160";

export const OP_CODES: OP_CODE_PAGE_PROPS[] = [
  OP_ADD,
  OP_CHECKSIG,
  OP_DEPTH,
  OP_DUP,
  OP_HASH_160,
];

/*

export const OP_EQUAL: OP_CODE_PAGE_PROPS = {
  name: "OP_EQUAL",
  langId: "(135 | 0x87)",
  info: "Compares the top two items on the stack for equality.",
  input: 2,
  output: 1,
  category: "Math",
  visualProps: {
    stackSteps: HASH_160_STEPS,
    failureSteps: [],
    title: "OP_Code Walkthrough",
    description: "Compares the top two items on the stack for equality.",
    steps: ["Pop top item", "Pop top item", "Push result of equality check"],
  },
};

*/
