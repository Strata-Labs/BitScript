import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import ONEADD from "@/../public/images/ONEADD.svg";

const PUSHDATA_STEPS: EXECUTION_STEPS[] = [
  // Video 1
  {
    containers: [],
    mainStack: [
      {
        name: "OP_PUSHDATA6",
        number: 139,
        hex: "0x8b",
        stackIndex: 0,
        description: ".",
        className: "COLUMN-2-0",
        libDataType: LIB_DATA_TYPE.OP_CODE,
      },
    ],
    resultStack: [],
    actions: [],
  },
  {
    containers: [],
    mainStack: [
      {
        name: "OP_PUSHDATA6",
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
        dataHex: "01000000",
        dataNumber: "537472617461",
        stackIndex: 0,
        className: "COLUMN-1-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
    ],
    resultStack: [],
    actions: [],
  },
  //   Video 2
  {
    containers: [],
    mainStack: [
      {
        name: "OP_PUSHDATA6",
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
        dataHex: "01000000",
        dataNumber: "537472617461",
        stackIndex: 0,
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
          dataNumber: "6 bytes",
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
          dataNumber: "6 bytes",
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
        dataNumber: "537472617461",
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
          dataNumber: "537472617461",
          className: "COLUMN-1-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
    ],
  },
];

export const OP_PUSHDATA: OP_CODE_PAGE_PROPS = {
  name: "OP_PUSHDATA",
  opCode: "Variable",
  hex: "Variable",
  category: "Data",
  shortDescription: "Pushes arbitrary data onto the stack",
  longDescription:
    "OP_PUSHDATA is a generic opcode used to push arbitrary data onto the stack. It allows you to add data of variable length to the script execution stack. The length of the data is determined by the data length byte(s) that follow this opcode. This opcode is versatile and used for working with various types of data, including public keys, signatures, and custom data.",
  inputNum: "Variable",
  inputType: "Variable",
  returnNum: "Variable",
  returnType: "Variable",
  seenIn: "",

  linkPath: "/OPS/OP_PUSHDATA",
  tileImage: "",
  type: "Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: PUSHDATA_STEPS,
    failureSteps: PUSHDATA_STEPS,
    title: "OP_Code Walkthrough",
    description: "Pushes arbitrary data onto the stack",
    steps: ["Parse Data Length", "Extract Data", "Push Data onto Stack"],
  },
};
