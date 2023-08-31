import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import tileImage from "@/../public/images/CHECK_SEQUENCE_TILE.svg";

const CHECK_SEQUENCE_VERIFY_STEPS: EXECUTION_STEPS[] = [];

const OP_CHECK_SEQUENCE_VERIFY: OP_CODE_PAGE_PROPS = {
  name: "OP_CHECKSEQUENCEVERIFY",
  opCode: "178",
  hex: "0xb2",
  category: "Locktime",
  shortDescription:
    "Ensure a UTXO remains unspendable for a relative number of blocks or duration since its confirmation.",
  longDescription:
    "Enforces a UTXO to remain unspendable for a specific number of blocks after its confirmation or a specific period of time after its inclusion in a block. Also known as CSV, this op defines a *relative* timelock mechanism; unlike checklocktimeverify (CLTV), this enforces a condition where the UTXO is locked based on the age or duration since its confirmation, rather than a fixed point in the Bitcoin timeline. When the input item value is below 500000000, it represents a relative block height; otherwise, it represents a relative period in seconds. This is particularly valuable for protocols like Lightning, which rely on relative timelocks to enforce penalty conditions. For the operation to succeed, the sequence value of the transaction input must be disabled or, if enabled, must be less than or equal to the sequence value in the script and greater than or equal to the version-based minimum.",
  inputNum: "1",
  inputTypes: "number",
  returnNum: "0",
  returnTypes: "N/A",
  linkPath: "/OPS/OP_CHECKSEQUENCEVERIFY",
  tileImage: tileImage,
  type: "Verify",
  generalType: "OpCode",
  visualProps: {
    stackSteps: CHECK_SEQUENCE_VERIFY_STEPS,
    failureSteps: CHECK_SEQUENCE_VERIFY_STEPS,
    title: "OP_Code Walkthrough",
    description:
      "Ensure a UTXO remains unspendable for a relative number of blocks or duration since its confirmation.",
    steps: [
      " Pop top item (relative locktime value)",
      "Determine if it's block height or Unix timestamp based on value",
      "Compare the value to the sequence field of the spending input.",
      "Verify transaction based on Boolean result (fail or continue)",
    ],
  },
};

export default OP_CHECK_SEQUENCE_VERIFY;
