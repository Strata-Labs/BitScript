import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import tileImage from "@/../public/images/CHECK_MULTISIG_TILE.svg";


const CHECKSIGADD_STEPS: EXECUTION_STEPS[] = [
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
      {
        moveType: MOVE_TYPE.ADD,
        to: COLUMN_TYPE.MAIN_STACK,
        stackIndex: 0,
        data: {
          stackIndex: 1,
          dataNumber: "signature",
          className: "COLUMN-0-1",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
      {
        moveType: MOVE_TYPE.ADD,
        to: COLUMN_TYPE.MAIN_STACK,
        stackIndex: 0,
        data: {
          stackIndex: 2,
          dataNumber: "public-key",
          className: "COLUMN-0-1",
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
        className: "COLUMN-0-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

        styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
      },

      {
        stackIndex: 1,
        dataNumber: "signature",
        className: "COLUMN-1-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
      {
        stackIndex: 2,

        dataNumber: "public-key",
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
          name: "CHECKSIGADD",
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
          stackIndex: 2,
          dataNumber: "0",
          className: "COLUMN-0-5",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
    ],
  },

  // Video 3
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
        className: "COLUMN-0-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

        styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
      },
      {
        stackIndex: 1,
        dataNumber: "signature",
        className: "COLUMN-1-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
    ],
    resultStack: [
      {
        name: "OP_CHECKSIGADD",
        number: 118,
        hex: "0x76",
        stackIndex: 0,
        description: "Duplicates the top stack item.",
        className: "COLUMN-2-0",
        libDataType: LIB_DATA_TYPE.OP_CODE,
      },
      {
        stackIndex: 1,
        dataNumber: "public-key",
        className: "COLUMN-2-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
      },
    ],
    actions: [
      {
        moveType: MOVE_TYPE.MOVE_POP_ARROW,
        to: COLUMN_TYPE.RESULT_STACK,

        stackIndex: 1,
        data: {
          stackIndex: 2,
          dataNumber: "0",
          className: "COLUMN-2-2",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
        },
      },
    ],
  },

  // Video 4
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
        className: "COLUMN-0-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

        styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
      },
    ],
    resultStack: [
      {
        name: "OP_CHECKSIGADD",
        number: 118,
        hex: "0x76",
        stackIndex: 0,
        description: "Duplicates the top stack item.",
        className: "COLUMN-2-0",
        libDataType: LIB_DATA_TYPE.OP_CODE,
      },
      {
        stackIndex: 1,
        dataNumber: "public-key",
        className: "COLUMN-2-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
      },
      {
        stackIndex: 4,
        dataNumber: "signature",
        className: "COLUMN-1-4",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
    ],
    actions: [
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
          className: "COLUMN-3-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
    ],
  },
  //video 5
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
    resultStack: [
      {
        name: "ADD",
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
        stackIndex: 0,
        dataHex: "01000000",
        dataNumber: "1",

        className: "COLUMN-1-0",
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
          dataHex: "01000000",
          dataNumber: 4,
          stackIndex: 0,
          className: "COLUMN-1-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
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
          dataNumber: 5,
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
          dataBinary: {},
          dataBytes: {
            "0": 1,
            "1": 0,
            "2": 0,
            "3": 0,
          },
          dataHex: "01000000",
          dataNumber: 5,
          stackIndex: 0,
          className: "COLUMN-3-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
    ],
  },
  // video 6
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
        dataNumber: 5,
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
          dataNumber: 5,
          stackIndex: 0,
          className: "COLUMN-1-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
    ],
  },
];

export const OP_CHECKSIGADD: OP_CODE_PAGE_PROPS = {
  name: "OP_CHECK_SIG_ADD",
  opCode: "186",
  hex: "0xba",
  category: "Crypto",
  shortDescription:
    "Verifies a signature against a public key and increments the result by one if successful.",
  longDescription:
    "The operation OP_CHECKSIGADD verifies a signature against a public key and increments the result by one if successful. It follows the OP_CHECKSIG operation, which typically pops three items off the stack: the signature, the public key, and the original data. If the signature verification is successful, OP_CHECKSIGADD pushes back the incremented verification result onto the stack; otherwise, it pushes 0 onto the stack.",
  inputNum: "1",
  inputType: "Any",
  returnNum: "1",
  returnType: "Bytes (32)",
  seenIn: "",

  linkPath: "/OPS/OP_CHECK_SIG_ADD",
  tileImage: tileImage,
  type: "Pop & Push",
  generalType: "OpCode",
  longName: "",
  visualProps: {
    stackSteps: CHECKSIGADD_STEPS,
    failureSteps: CHECKSIGADD_STEPS,
    title: "OP_Code Walkthrough",
    description:
      "Verifies a signature against a public key and increments the result by one if successful.",
    steps: [
      "Pop public key",
      "Pop signature",
      "Apply OP_CHECKSIGADD",
      "add the result to the initial value",
      "Push incremented verification result to the stack",
    ],
  },
};
