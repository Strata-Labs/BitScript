import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OP_Dup";
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
];

const OP_DROP: OP_CODE_PAGE_PROPS = {
  name: "OP_DROP",
  langId: "(117 |	0x75)",
  info: "This is a simple but powerful operation designed to remove & entirely discard the top item in a stack (as always in an LIFO ordering). Drop, along with Return, are the two op_codes most commonly used as a way of storing data on Bitcoin. As opposed to simply pushing data on the stack, using OP_Drop ensures that the script will remain valid.",
  input: 0,
  output: 0,
  category: "Stack",
  linkPath: "/OPS/OP_DROP",
  type: "POP",
  generalType: "OpCode",
  tileImage: TileImage,
  longName: "",
  visualProps: {
    stackSteps: OP_DROP_STEPS,
    title: "OP_Code Walkthrough",
    description: "Drops the top item in the stack",
    steps: ["Pop top item"],
    failureSteps: OP_DROP_STEPS,
  },
};

export default OP_DROP;
