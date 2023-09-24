import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import tileImage from "@/../public/images/CHECK_SEQUENCE_TILE.svg";

const CHECK_SEQUENCE_VERIFY_STEPS: EXECUTION_STEPS[] = [
  {
    containers: [0],
    mainStack: [],
    resultStack: [],
    actions: [
      {
        moveType: MOVE_TYPE.ADD,
        to: COLUMN_TYPE.MAIN_STACK,
        stackIndex: 0,
        data: {
          stackIndex: 0,
          dataHex: "01000000",

          dataNumber: "805375",
          className: "COLUMN-0-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
    ],
  },
  {
    containers: [1],
    mainStack: [
      {
        stackIndex: 0,

        dataNumber: "805375",
        className: "COLUMN-1-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
    ],
    resultStack: [],
    actions: [
      {
        moveType: MOVE_TYPE.ADD,
        to: COLUMN_TYPE.RESULT_STACK,
        stackIndex: 0,
        data: {
          name: "OP_CHECKSEQUENCEVERIFY",
          number: 119,
          hex: "",
          stackIndex: 0,
          description: ".",
          className: "COLUMN-2-0",
          libDataType: LIB_DATA_TYPE.OP_CODE,
        },
      },
      {
        moveType: MOVE_TYPE.MOVE_POP_ARROW,
        to: COLUMN_TYPE.RESULT_STACK,

        stackIndex: 1,
        data: {
          dataBinary: {},
          dataBytes: {
            "0": 1,
            "1": 0,
            "2": 0,
            "3": 0,
          },
          dataHex: "01000000",
          dataNumber: "805375",
          stackIndex: 1,
          className: "COLUMN-1-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
    ],
  },
  {
    containers: [1],
    mainStack: [],
    resultStack: [
      {
        name: "OP_CHECKSEQUENCEVERIFY",
        number: 119,
        hex: "",
        stackIndex: 0,
        description: ".",
        className: "COLUMN-2-0",
        libDataType: LIB_DATA_TYPE.OP_CODE,
      },
      {
        dataNumber: "805375",
        stackIndex: 1,
        className: "COLUMN-1-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
    ],
    actions: [
      {
        moveType: MOVE_TYPE.ADD,
        to: COLUMN_TYPE.RESULT_STACK,

        stackIndex: 1,
        data: {
          dataNumber: "Block",
          stackIndex: 1,
          className: "COLUMN-1-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

          styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
        },
      },
    ],
  },
  {
    containers: [1],
    mainStack: [],
    resultStack: [
      {
        name: "OP_CHECKSEQUENCEVERIFY",
        number: 119,
        hex: "",
        stackIndex: 0,
        description: ".",
        className: "COLUMN-2-0",
        libDataType: LIB_DATA_TYPE.OP_CODE,
      },
      {
        dataNumber: "805375",
        stackIndex: 1,
        className: "COLUMN-2-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
      {
        dataNumber: "Block",
        stackIndex: 2,
        className: "COLUMN-2-2",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

        styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
      },
    ],
    actions: [
      {
        moveType: MOVE_TYPE.ADD,
        to: COLUMN_TYPE.RESULT_STACK,

        stackIndex: 1,
        data: {
          dataNumber: "nLockTime",
          stackIndex: 1,
          className: "COLUMN-1-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

          styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
        },
      },
      {
        moveType: MOVE_TYPE.ADD_EQUAL,
        to: COLUMN_TYPE.END_STACK,
        stackIndex: 0,
        data: {
          dataBinary: {},
          dataBytes: {
            "0": 1,
            "1": 0,
            "2": 0,
            "3": 0,
          },
          dataHex: "01000000",
          dataNumber: 1,
          stackIndex: 0,
          className: "COLUMN-2-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.EQUAL,
        },
      },
      {
        moveType: MOVE_TYPE.ADD,
        to: COLUMN_TYPE.END_STACK,
        stackIndex: 0,
        data: {
          dataNumber: 1,
          stackIndex: 0,
          className: "COLUMN-3-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
    ],
  },
  {
    containers: [0],
    mainStack: [],
    resultStack: [],
    actions: [],
  },
];

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
