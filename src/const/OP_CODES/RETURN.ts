import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import ADD_TILE from "@/../public/images/ADD_TILE.svg";

const RETURN_STEPS: EXECUTION_STEPS[] = [];

export const OP_RETURN: OP_CODE_PAGE_PROPS = {
  name: "OP_RETURN",
  opCode: "106",
  hex: "0x6a",
  category: "Flow Control",
  shortDescription:
    "Marks the transaction as invalid and returns all of the remaining bytes as an error message.",
  longDescription:
    "OP_RETURN is a script opcode used to mark a transaction output as unspendable. It allows the inclusion of a small amount of data in a transaction, which gets permanently recorded on the blockchain. This opcode immediately stops the script execution and marks the transaction as invalid, ensuring that the output is not used for further transactions. It's widely used for embedding arbitrary data in the blockchain, such as timestamps or simple messages, without bloating the UTXO set.",
  inputNum: "0",
  inputType: "N/A",
  returnNum: "0",
  returnType: "N/A",
  seenIn: "OP_RETURN transactions",

  linkPath: "/OPS/OP_RETURN",
  tileImage: ADD_TILE,
  type: "ScriptControl",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: RETURN_STEPS,
    failureSteps: RETURN_STEPS,
    title: "OP_Code Walkthrough",
    description:
      "Marks the transaction as invalid and returns all of the script's remaining bytes as an error message.",
    steps: ["Script fail", "Remaining bytes are returned as error message"],
  },
};
