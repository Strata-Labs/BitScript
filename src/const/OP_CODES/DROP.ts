import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import TileImage from "@/../public/images/DROP_TILE.svg";

export const OP_DROP_STEPS: EXECUTION_STEPS[] = [
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
    ],
    resultStack: [],
    actions: [
      {
        moveType: MOVE_TYPE.ADD,
        to: COLUMN_TYPE.RESULT_STACK,
        stackIndex: 0,
        data: {
          name: "DROP",
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
    ],
  },
  {
    containers: [2],
    mainStack: [
      {
        name: "DROP",
        number: 118,
        hex: "0x76",
        stackIndex: 0,
        description: "Duplicates the top stack item.",
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
        dataNumber: 1,
        className: "COLUMN-0-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
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
    ],
  },
];

const OP_DROP: OP_CODE_PAGE_PROPS = {
  name: "OP_DROP",
  opCode: "117",
  hex: "0x75",
  category: "Stack",
  shortDescription: "Removes the top item from the stack.",
  longDescription:
    "This is a simple but powerful operation designed to remove & entirely discard the top item in a stack (as always in an LIFO ordering). Drop, along with Return, are the two op_codes most commonly used as a way of storing data on Bitcoin. As opposed to simply pushing data on the stack, using OP_Drop ensures that the script will remain valid.",
  inputNum: "0",
  inputType: "N/A",
  returnNum: "0",
  returnType: "N/A",
  seenIn: "N/A",
  Status: "Committed",
  linkPath: "/OPS/OP_DROP",
  tileImage: TileImage,
  type: "Pop",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: OP_DROP_STEPS,
    title: "OP_Code Walkthrough",
    description: "Drops the top item in the stack",
    steps: ["Pop top item", " Continue script operations"],
    failureSteps: OP_DROP_STEPS,
  },
};

export default OP_DROP;
