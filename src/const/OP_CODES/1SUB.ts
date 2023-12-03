import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import ONESUB from "@/../public/images/ONESUB.svg";

const ONESUB_STEPS: EXECUTION_STEPS[] = [
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

          dataNumber: "4",
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
        dataNumber: "4",

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
          name: "OP_ONESUB",
          number: 140,
          hex: "0x8c",
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
          dataNumber: "4",
          stackIndex: 1,
          className: "COLUMN-1-1",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
    ],
  },
  // Video 3
  // Video 4
  {
    containers: [],
    mainStack: [
      {
        name: "OP_ONESUB",
        number: 139,
        hex: "0x8b",
        stackIndex: 0,
        description: ".",
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
        stackIndex: 0,
        dataHex: "01000000",
        dataNumber: "4",

        className: "COLUMN-1-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
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
        dataNumber: "1",
        stackIndex: 1,
        className: "COLUMN-1-0",
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
          dataNumber: 3,
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
          dataNumber: 3,
          stackIndex: 0,
          className: "COLUMN-2-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
    ],
  },
  // Video 5
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
        dataHex: "01000000",
        dataNumber: 3,
        stackIndex: 0,
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
          dataNumber: "3",
          className: "COLUMN-1-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
    ],
  },
];

export const OP_ONESUB: OP_CODE_PAGE_PROPS = {
  name: "OP_ONESUB",
  opCode: "140",
  hex: "0x8c",
  category: "Math",
  shortDescription: "Decrements the top item of the stack by 1",
  longDescription:
    "The counterpart to OP_1ADD, OP_1SUB subtracts 1 from the top item on the stack. This opcode finds its use in scripts that require decrementing values, such as in countdowns, decrementing loops, or in adjusting values downward by a single unit.",
  inputNum: "1",
  inputType: "Number",
  returnNum: "1",
  returnType: "Number",
  seenIn: "",

  linkPath: "/OPS/OP_ONESUB",
  tileImage: ONESUB,
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: ONESUB_STEPS,
    failureSteps: ONESUB_STEPS,
    title: "OP_Code Walkthrough",
    description: "Decrements the top item of the stack by 1",
    steps: ["Pop Top Item", "Substract 1 from Item", "Push Item"],
  },
};
