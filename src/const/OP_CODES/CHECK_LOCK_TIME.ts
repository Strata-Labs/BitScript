import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import TileImage from "@/../public/images/CHECK_LOCK_TIME_TILE.svg";

export const OP_CHECK_LOCK_STEPS: EXECUTION_STEPS[] = [
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
          name: "OP_CHECKLOCKTIMEVERIFY",
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
        name: "OP_CHECKLOCKTIMEVERIFY",
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
        name: "OP_CHECKLOCKTIMEVERIFY",
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

const OP_CHECKLOCKTIMEVERIFY: OP_CODE_PAGE_PROPS = {
  name: "OP_CHECKLOCKTIMEVERIFY",
  opCode: "177",
  hex: "0xb1",
  category: "Locktime",
  shortDescription:
    "Ensure a UTXO cannot be spent until an absolute block height or specific time",
  longDescription:
    "Enforces a UTXO to remain unspendable until a certain block height is reached or a specific point in time has passed. Also known as CLTV, this op defines an absolute timelock mechanism; unlike checksequenceverify (csv), this enforces a condition where the UTXO is locked until a specified *absolute* block height or Unix timestamp. When the input item value is below 500000000, it represents a block height; otherwise, it represents a Unix timestamp. This allows for constructing contracts like payment channels for Lightning or atomic swaps, where conditions must be met after a certain period. For the operation to succeed, the value on the top of the stack must be less than or equal to the transaction's `nLockTime` field and greater than or equal to the current block height or timestamp.",
  inputNum: "1",
  inputType: "Number",
  returnNum: "0",
  returnType: "Any",

  linkPath: "/OPS/OP_CHECKLOCKTIMEVERIFY",
  tileImage: TileImage,
  type: "Push",
  generalType: "OpCode",

  visualProps: {
    stackSteps: OP_CHECK_LOCK_STEPS,
    title: "OP_Code Walkthrough",
    failureSteps: OP_CHECK_LOCK_STEPS,
    description:
      "Ensure a UTXO cannot be spent until an absolute block height or specific time",
    steps: [
      "Pop top item (locktime value)",
      "Determine if it's block height or Unix timestamp based on value",
      "Compare to transaction's nLockTime",
      "Verify transaction based on Boolean result (fail or continue)",
    ],
  },
};

export default OP_CHECKLOCKTIMEVERIFY;
