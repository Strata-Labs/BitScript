import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import TileImage from "@/../public/images/DROP_TILE.svg";

export const OP_2DROP_STEPS: EXECUTION_STEPS[] = [
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
          dataNumber: 2,
          className: "COLUMN-0-1",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        },
      },
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
          dataNumber: 3,
          className: "COLUMN-0-2",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        },
      },
    ],
  },
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
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        stackIndex: 0,
        dataHex: "01000000",
        dataNumber: 1,
        className: "COLUMN-1-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
      },
      {
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
        dataNumber: 2,
        className: "COLUMN-1-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
      },
      {
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
        dataNumber: 3,
        className: "COLUMN-1-2",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
      },
    ],
    resultStack: [],
    actions: [
      {
        moveType: MOVE_TYPE.ADD,
        to: COLUMN_TYPE.RESULT_STACK,
        stackIndex: 0,
        data: {
          name: "2DROP",
          number: 118,
          hex: "0x76",
          stackIndex: 0,
          description: "Duplicates the top stack item.",
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
          dataNumber: "<Signature>",
          stackIndex: 1,
          className: "COLUMN-1-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
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
          dataNumber: "<Signature>",
          stackIndex: 1,
          className: "COLUMN-1-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
    ],
  },
  {
    containers: [2],
    mainStack: [
      {
        name: "2DROP",
        number: 118,
        hex: "0x76",
        stackIndex: 0,
        description: "Drops the 2 top stack items.",
        className: "COLUMN-2-0",
        libDataType: LIB_DATA_TYPE.OP_CODE,
      },
      {
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
        dataNumber: 3,
        className: "COLUMN-0-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
      },
      {
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
        dataNumber: 2,
        className: "COLUMN-0-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
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
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        stackIndex: 0,
        dataHex: "01000000",
        dataNumber: 1,
        className: "COLUMN-0-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
      },
    ],
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
    ],
  },
];

const OP_2DROP: OP_CODE_PAGE_PROPS = {
  name: "OP_2DROP",
  opCode: "109",
  hex: "0x6d",
  category: "Stack",
  shortDescription: "Removes the top two items from the stack.",
  longDescription:
    "This operation removes the top two items from the stack. It is useful for cleaning up the stack by discarding unnecessary values. This is a common operation in Bitcoin scripts where intermediate results need to be discarded to maintain the correct stack state for subsequent operations.",
  inputNum: "2",
  inputType: "Any",
  returnNum: "0",
  returnType: "N/A",
  seenIn: "N/A",
  status: "Committed",
  linkPath: "/OPS/OP_2DROP",
  tileImage: TileImage,
  type: "Pop",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: OP_2DROP_STEPS,
    title: "OP_Code Walkthrough",
    description: "Removes the top two items from the stack.",
    steps: [
        "Pop top 2 items", 
    "Continue script operations"],
    failureSteps: OP_2DROP_STEPS,
  },
};

export default OP_2DROP;
