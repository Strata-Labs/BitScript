import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import SHA1 from "@/../public/images/SHA1.svg";

const NEGATE_STEPS: EXECUTION_STEPS[] = [
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
          name: "OP_NEGATE",
          number: 143,
          hex: "0x8f",
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
        name: "OP_NEGATE",
        number: 143,
        hex: "0x8f",
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
          dataNumber: -4,
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
          dataNumber: -4,
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
        dataNumber: -4,
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
          dataNumber: "-4",
          className: "COLUMN-1-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
    ],
  },
];

export const OP_NEGATE: OP_CODE_PAGE_PROPS = {
  name: "OP_NEGATE",
  opCode: "143",
  hex: "0x8f",
  category: "Math",
  shortDescription: "Negates the top item of the stack",
  longDescription:
    "OP_NEGATE changes the sign of the top numeric item on the stack. It turns positive numbers into their negative counterparts and vice versa. This opcode is particularly useful in scripts that require the inversion of values, such as in financial transactions involving refunds or reversals.",
  inputNum: "1",
  inputType: "Number",
  returnNum: "1",
  returnType: "Number",
  seenIn: "",

  linkPath: "/OPS/OP_NEGATE",
  tileImage: "",
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: NEGATE_STEPS,
    failureSteps: NEGATE_STEPS,
    title: "OP_Code Walkthrough",
    description: "Negates the top item of the stack",
    steps: ["Pop Top Item", "Multiply Item by -1", "Push Item"],
  },
};
