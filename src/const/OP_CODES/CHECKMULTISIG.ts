import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
  SCRIPT_DATA_STYLE_TYPE,
} from "@/OPS_ANIMATION_LIB";
import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import tileImage from "@/../public/images/CHECK_MULTISIG_TILE.svg";

const CHECK_MULTISIG_STEPS: EXECUTION_STEPS[] = [
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
          stackIndex: 0,
          dataNumber: "n",
          className: "COLUMN-0-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
        },
      },
      {
        moveType: MOVE_TYPE.ADD,
        to: COLUMN_TYPE.MAIN_STACK,
        stackIndex: 0,
        data: {
          stackIndex: 1,
          dataNumber: "pub-key-1",
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

          dataNumber: "pub-key-2",
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

          dataNumber: "m",
          className: "COLUMN-0-2",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

          styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
        },
      },
      {
        moveType: MOVE_TYPE.ADD,
        to: COLUMN_TYPE.MAIN_STACK,
        stackIndex: 0,
        data: {
          stackIndex: 2,
          dataNumber: "sig-1",
          className: "COLUMN-0-3",
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
          dataNumber: "0",
          className: "COLUMN-0-4",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
        },
      },
    ],
  },
  {
    containers: [1],
    mainStack: [
      {
        stackIndex: 0,
        dataNumber: "n",
        className: "COLUMN-1-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
      },
      {
        stackIndex: 1,
        dataNumber: "pub-key-1",
        className: "COLUMN-1-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
      {
        stackIndex: 2,

        dataNumber: "pub-key-2",
        className: "COLUMN-1-2",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
      {
        stackIndex: 3,

        dataNumber: "m",
        className: "COLUMN-1-3",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

        styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
      },
      {
        stackIndex: 4,
        dataNumber: "sig-1",
        className: "COLUMN-1-4",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
      {
        stackIndex: 5,
        dataNumber: "0",
        className: "COLUMN-1-5",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
      },
    ],
    resultStack: [],
    actions: [
      {
        moveType: MOVE_TYPE.ADD,
        to: COLUMN_TYPE.RESULT_STACK,
        stackIndex: 0,
        data: {
          name: "OP_CHECKMULTISIG",
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
          styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
        },
      },
    ],
  },
  {
    containers: [1],
    mainStack: [
      {
        stackIndex: 0,
        dataNumber: "n",
        className: "COLUMN-1-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
      },
      {
        stackIndex: 1,
        dataNumber: "pub-key-1",
        className: "COLUMN-1-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
      {
        stackIndex: 2,

        dataNumber: "pub-key-2",
        className: "COLUMN-1-2",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
      {
        stackIndex: 3,

        dataNumber: "m",
        className: "COLUMN-1-3",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

        styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
      },
      {
        stackIndex: 4,
        dataNumber: "sig-1",
        className: "COLUMN-1-4",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
    ],
    resultStack: [
      {
        name: "OP_CHECKMULTISIG",
        number: 118,
        hex: "0x76",
        stackIndex: 0,
        description: "Duplicates the top stack item.",
        className: "COLUMN-2-0",
        libDataType: LIB_DATA_TYPE.OP_CODE,
      },
      {
        stackIndex: 1,
        dataNumber: "0",
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
  {
    containers: [1],
    mainStack: [
      {
        stackIndex: 0,
        dataNumber: "n",
        className: "COLUMN-1-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
      },
      {
        stackIndex: 1,
        dataNumber: "pub-key-1",
        className: "COLUMN-1-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
      {
        stackIndex: 2,

        dataNumber: "pub-key-2",
        className: "COLUMN-1-2",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
      {
        stackIndex: 3,

        dataNumber: "m",
        className: "COLUMN-1-3",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

        styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
      },
    ],
    resultStack: [
      {
        name: "OP_CHECKMULTISIG",
        number: 118,
        hex: "0x76",
        stackIndex: 0,
        description: "Duplicates the top stack item.",
        className: "COLUMN-2-0",
        libDataType: LIB_DATA_TYPE.OP_CODE,
      },
      {
        stackIndex: 1,
        dataNumber: "0",
        className: "COLUMN-2-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
      },
      {
        stackIndex: 4,
        dataNumber: "sig-1",
        className: "COLUMN-1-4",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
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
  {
    containers: [1],
    mainStack: [
      {
        stackIndex: 0,
        dataNumber: "n",
        className: "COLUMN-1-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
      },
      {
        stackIndex: 1,
        dataNumber: "pub-key-1",
        className: "COLUMN-1-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
      {
        stackIndex: 2,

        dataNumber: "pub-key-2",
        className: "COLUMN-1-2",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
    ],
    resultStack: [
      {
        name: "OP_CHECKMULTISIG",
        number: 118,
        hex: "0x76",
        stackIndex: 0,
        description: "Duplicates the top stack item.",
        className: "COLUMN-2-0",
        libDataType: LIB_DATA_TYPE.OP_CODE,
      },
      {
        stackIndex: 1,
        dataNumber: "0",
        className: "COLUMN-2-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
      },
      {
        stackIndex: 4,
        dataNumber: "sig-1",
        className: "COLUMN-1-4",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
      {
        stackIndex: 3,

        dataNumber: "m",
        className: "COLUMN-1-3",
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

          dataNumber: "pub-key-2",
          className: "COLUMN-1-2",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
      {
        moveType: MOVE_TYPE.MOVE_POP_ARROW,
        to: COLUMN_TYPE.RESULT_STACK,

        stackIndex: 1,
        data: {
          stackIndex: 2,
          dataNumber: "pub-key-1",
          className: "COLUMN-1-1",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
    ],
  },
  {
    containers: [1],
    mainStack: [
      {
        stackIndex: 0,
        dataNumber: "n",
        className: "COLUMN-1-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
      },
    ],
    resultStack: [
      {
        name: "OP_CHECKMULTISIG",
        number: 118,
        hex: "0x76",
        stackIndex: 0,
        description: "Duplicates the top stack item.",
        className: "COLUMN-2-0",
        libDataType: LIB_DATA_TYPE.OP_CODE,
      },
      {
        stackIndex: 1,
        dataNumber: "0",
        className: "COLUMN-2-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
      },
      {
        stackIndex: 4,
        dataNumber: "sig-1",
        className: "COLUMN-1-4",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
      {
        stackIndex: 3,

        dataNumber: "m",
        className: "COLUMN-1-3",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,

        styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
      },
      {
        stackIndex: 2,

        dataNumber: "pub-key-2",
        className: "COLUMN-1-4",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
      {
        stackIndex: 2,

        dataNumber: "pub-key-1",
        className: "COLUMN-1-5",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
      },
    ],
    actions: [
      {
        moveType: MOVE_TYPE.MOVE_POP_ARROW,
        to: COLUMN_TYPE.RESULT_STACK,

        stackIndex: 1,
        data: {
          stackIndex: 0,
          dataNumber: "n",
          className: "COLUMN-1-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.SECONDARY,
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
          dataNumber: 1,
          stackIndex: 0,
          className: "COLUMN-1-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
          styleType: SCRIPT_DATA_STYLE_TYPE.BASIC,
        },
      },
    ],
  },
];

const OP_MULTI_CHECKSIG: OP_CODE_PAGE_PROPS = {
  name: "OP_CHECKMULTISIG",
  opCode: "174",
  hex: "0xae",
  category: "Crypto",
  shortDescription:
    "Verifies multiple signatures against multiple public keys.",
  longDescription: `An extension of CheckSig, CheckMultiSig allows for multi-signature transactions; as the name suggests, this sigop is the foundation for multi-signature wallets. The opcode operates in a m-of-n fashion, where 'm' is the minimum number of correct signatures required for validation, and 'n' is the number of public keys provided. If m signatures among the n public keys are correct, it returns true (1). Otherwise, it returns false (0). A maximum amount of 20 (n) public keys are allowed in this op.`,
  inputNum: "2>",
  inputType: "Hexadecimal",
  returnNum: "1",
  returnType: "Number",
  seenIn: "p2pkhms",
  linkPath: "/OPS/OP_CHECKMULTISIG",
  tileImage: tileImage,
  type: "Pop & Push",
  generalType: "OpCode",

  visualProps: {
    stackSteps: CHECK_MULTISIG_STEPS,
    failureSteps: CHECK_MULTISIG_STEPS,
    title: "OP_Code Walkthrough",
    description:
      "Verifies a cryptographic signature against a public key and a message.",
    steps: [
      "Pop top item (number of keys: n)",
      "Pop next (n) top items",
      "Pop top item (number of signatures: m)",
      "Pop next (m) top items",
      "Verify n-of-m signatures",
      "Push Boolean result item (0 or 1)",
    ],
  },
};

export default OP_MULTI_CHECKSIG;
