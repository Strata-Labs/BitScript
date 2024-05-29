import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const OP_2DIV_STEPS: EXECUTION_STEPS[] = [
  // Video 1
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
          stackIndex: 0,
          dataHex: "01000000",

          dataNumber: "10",
          className: "COLUMN-0-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
    ],
  },
  // Video 2
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
        stackIndex: 0,
        dataHex: "01000000",
        dataNumber: "10",
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
          name: "OP_2DIV",
          number: 167,
          hex: "0xa7",
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
          dataNumber: "10",
          stackIndex: 1,
          className: "COLUMN-1-1",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
    ],
  },
  {
    containers: [],
    mainStack: [
      {
        name: "OP_2DIV",
        number: 167,
        hex: "0xa7",
        description: "",
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
        dataNumber: 10,
        stackIndex: 1,
        className: "COLUMN-1-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
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
          dataNumber: "5",
          stackIndex: 0,
          className: "COLUMN-2-0",
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
        dataBinary: {},
        dataBytes: {
          "0": 1,
          "1": 0,
          "2": 0,
          "3": 0,
        },
        stackIndex: 0,
        dataHex: "01000000",
        dataNumber: "5",
        className: "COLUMN-1-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
    ],
    resultStack: [],
    actions: [
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
          stackIndex: 1,
          dataHex: "01000000",
          dataNumber: "5",
          className: "COLUMN-1-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
    ],
  },
];

export const OP_2DIV: OP_CODE_PAGE_PROPS = {
  name: "OP_2DIV",
  opCode: "142",
  hex: "0x8e",
  category: "Arithmetic",
  shortDescription: "Divides the top item on the stack by 2.",
  longDescription:
    "OP_2DIV divides the top item on the stack by 2. It takes the top item from the stack, interprets it as an integer, divides it by 2, and pushes the result back onto the stack. This operation is commonly used in Bitcoin scripts for various arithmetic operations.",
  inputNum: "1",
  inputType: "Number",
  returnNum: "1",
  returnType: "Number",
  seenIn: "Bitcoin Scripts",
  linkPath: "/OPS/OP_2DIV",
  tileImage: SHA1,
  type: "Pop & Push",
  generalType: "OpCode",
  visualProps: {
    stackSteps: OP_2DIV_STEPS,
    failureSteps: OP_2DIV_STEPS,
    title: "OP_Code Walkthrough",
    description: "Divides the top item on the stack by 2.",
    steps: [
      "Pop the number from the stack",
      "Divide the number by 2",
      "Push the result back onto the stack",
    ],
  },
};

