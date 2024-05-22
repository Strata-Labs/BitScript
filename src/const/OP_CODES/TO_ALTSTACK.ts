
import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import TileImage from "@/../public/images/DUP_TILE.svg";

export const OP_TOALTSTACK_STEPS: EXECUTION_STEPS[] = [
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
          dataNumber: "item1",
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
          dataNumber: "item2",
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
          dataNumber: "item3",
          className: "COLUMN-0-2",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        },
      },
    ],
  },
  // Second Video
  // this should basically pop the last item from the original stack
  
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
        dataNumber: "item1",
        stackIndex: 0,
        className: "COLUMN-1-0",
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
        dataNumber: "item2",
        stackIndex: 0,
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
        dataNumber: "item3",
        stackIndex: 0,
        className: "COLUMN-1-2",
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
          name: "TOALTSTACK",
          number: 118,
          hex: "0x76",
          stackIndex: 0,
          description: "Removes the top item from the main stack and pushes it to the alternate stack.",
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
          dataNumber: "item3",
          stackIndex: 1,
          className: "COLUMN-1-1",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.DUPLICATE,
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
        dataNumber: "item3",
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
        dataNumber: "Altitem1",
        className: "COLUMN-2-0",
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
        stackIndex: 0,
        dataHex: "01000000",
        dataNumber: "Altitem2",
        className: "COLUMN-2-1",
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

export const OP_TOALTSTACK: OP_CODE_PAGE_PROPS = {
  name: "OP_TOALTSTACK",
  opCode: "107",
  hex: "0x6b",
  category: "Stack",
  shortDescription:
    "Moves the top item from the main stack to the alternate stack.",
  longDescription:
    "The OP_TOALTSTACK operation transfers the top item from the main stack to the alternate stack. This opcode is useful in scripts where temporary storage of items is necessary. By using the alternate stack, scripts can manage and retrieve data without disrupting the main stack's flow of operations.",
  inputNum: "1",
  inputType: "Any",
  returnNum: "0",
  returnType: "N/A",
  seenIn: "N/A",
  status: "Committed",
  linkPath: "/OPS/OP_TOALTSTACK",
  tileImage: TileImage,
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: OP_TOALTSTACK_STEPS,
    title: "OP_Code Walkthrough",
    failureSteps: OP_TOALTSTACK_STEPS,
    description:
      "Moves the top item from the main stack to the alternate stack.",
    steps: [
      "Pop top item from the main stack",
      "Push item to the alternate stack",
    ],
  },
};

