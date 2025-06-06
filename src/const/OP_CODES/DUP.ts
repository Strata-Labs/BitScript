import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import TileImage from "@/../public/images/DUP_TILE.svg";

export const OP_DUP_STEPS: EXECUTION_STEPS[] = [
  {
    // First Video
    containers: [0],
    mainStack: [],
    resultStack: [],
    actions: [
      {
        moveType: MOVE_TYPE.ADD,
        to: COLUMN_TYPE.MAIN_STACK,
        stackIndex: 0,
        data: {
          dataBinary: {},
          dataBytes: {
            "0": 1,
            "1": 0,
            "2": 0,
            "3": 0,
          },
          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
          stackIndex: 0,
          dataHex: "01000000",
          dataNumber: 1,
          className: "COLUMN-0-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        },
      },
    ],
  },
  // Second Video
  {
    containers: [1],
    mainStack: [
      {
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
          name: "OP_DUP",
          number: 118,
          hex: "0x76",
          stackIndex: 0,
          description: "Duplicates the top stack item.",
          className: "COLUMN-2-0",
          libDataType: LIB_DATA_TYPE.OP_CODE,
        },
      },
      {
        moveType: MOVE_TYPE.DUPLICATE,
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
          dataNumber: 1,
          stackIndex: 1,
          className: "COLUMN-1-1",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.DUPLICATE,
        },
      },
    ],
  },
  // Third video
  {
    containers: [],
    mainStack: [
      {
        name: "OP_DUP",
        number: 118,
        hex: "0x76",
        description: "Duplicates the top stack item.",
        className: "COLUMN-1-0",
        libDataType: LIB_DATA_TYPE.OP_CODE,
        stackIndex: 0,
      },
      {
        dataBinary: {},
        dataBytes: {
          "0": 1,
          "1": 0,
          "2": 0,
          "3": 0,
        },
        dataHex: "01000000",
        dataNumber: 1,
        stackIndex: 1,
        className: "COLUMN-1-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.DUPLICATE,
      },
    ],
    resultStack: [],
    actions: [
      {
        moveType: MOVE_TYPE.ADD_EQUAL,
        to: COLUMN_TYPE.RESULT_STACK,
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
        to: COLUMN_TYPE.RESULT_STACK,
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
          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
    ],
  },
  // Fourth Video
  {
    containers: [2],
    mainStack: [
      {
        dataBinary: {},
        dataBytes: {
          "0": 1,
          "1": 0,
          "2": 0,
          "3": 0,
        },
        stackIndex: 0,
        dataHex: "01000000",
        dataNumber: 1,
        className: "COLUMN-1-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
    ],
    resultStack: [
      {
        dataBinary: {},
        dataBytes: {
          "0": 1,
          "1": 0,
          "2": 0,
          "3": 0,
        },
        stackIndex: 0,
        dataHex: "01000000",
        dataNumber: 1,
        className: "COLUMN-2-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
    ],
    actions: [
      {
        moveType: MOVE_TYPE.MOVE_POP_ARROW,
        to: COLUMN_TYPE.RESULT_STACK,
        stackIndex: 0,
        data: {
          dataBinary: {},
          dataBytes: {
            "0": 1,
            "1": 0,
            "2": 0,
            "3": 0,
          },
          stackIndex: 1,
          dataHex: "01000000",
          dataNumber: 1,
          className: "COLUMN-1-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
    ],
  },
];

export const OP_DUP: OP_CODE_PAGE_PROPS = {
  name: "OP_DUP",
  opCode: "118",
  hex: "0x76",
  category: "Stack",
  shortDescription:
    "Duplicates the top item on the stack and pushes the duplicate onto the stack.",
  longDescription:
    "OP_DUP is a common stack operation used to duplicate the top item of the stack. Dup, short for duplicate, is usually used when we need to do something more than once (usually verify), with a specific existing item in the stack. In P2PKH, for example, it’s used to duplicate a public key which is used twice: once in an OP_EQUALVERIFY & again in OP_CHECKSIG.",
  inputNum: "1",
  inputType: "Any",
  returnNum: "2",
  returnType: "Any",
  seenIn: "p2pkh, p2sh, p2wpkh, p2wsh",

  linkPath: "/OPS/OP_DUP",
  tileImage: TileImage,
  type: "Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: OP_DUP_STEPS,
    title: "OP_Code Walkthrough",
    failureSteps: OP_DUP_STEPS,
    description: "Duplicates the top-most element in the stack",
    steps: [
      "Get the value (not pop) of the top stack item",
      "Duplicate item (in binary)",
      "Push duplicated item",
    ],
  },
};
