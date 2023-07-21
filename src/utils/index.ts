export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

import {
  COLUMN_TYPE,
  EXECUTION_STEPS,
  LIB_DATA_TYPE,
  MOVE_TYPE,
} from "@/comp/OpCodesAnimations";

export const _TEST: EXECUTION_STEPS[] = [
  {
    containers: [0],
    mainStack: [],
    resultStack: [],
    actions: [
      {
        moveType: MOVE_TYPE.ADD,
        to: COLUMN_TYPE.MAIN_STACK,
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
        data: {
          name: "OP_DUP",
          number: 118,
          hex: "0x76",
          description: "Duplicates the top stack item.",
          className: "COLUMN-2-0",
          libDataType: LIB_DATA_TYPE.OP_CODE,
        },
      },
      {
        moveType: MOVE_TYPE.MOVE_POP_ARROW,
        to: COLUMN_TYPE.RESULT_STACK,
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
          className: "COLUMN-1-1",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        },
      },
    ],
  },
  {
    containers: [],
    mainStack: [
      {
        name: "OP_DUP",
        number: 118,
        hex: "0x76",
        description: "Duplicates the top stack item.",
        className: "COLUMN-1-0",
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
        dataNumber: 1,
        className: "COLUMN-1-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
      },
    ],
    resultStack: [],
    actions: [
      {
        moveType: MOVE_TYPE.ADD,
        to: COLUMN_TYPE.RESULT_STACK,
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
          className: "COLUMN-2-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
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
        className: "COLUMN-1-0",
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
        dataHex: "01000000",
        dataNumber: 1,
        className: "COLUMN-2-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
      },
    ],
    actions: [
      {
        moveType: MOVE_TYPE.MOVE_POP_ARROW,
        to: COLUMN_TYPE.RESULT_STACK,
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
          className: "COLUMN-1-0",
          libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
        },
      },
    ],
  },
];

/*
export const OP_DUP: EXECUTION_STEPS[] = [
  {
    containers: [0],
    beforeStack: [
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
        className: "COLUMN-0-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
      },
    ],
    currentStack: [],
  },
  {
    containers: [1],
    beforeStack: [
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
        className: "COLUMN-1-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
      },
    ],
    currentStack: [
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
        className: "COLUMN-2-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
      },
    ],
    opCode: {
      name: "OP_DUP",
      number: 118,
      hex: "0x76",
      description: "Duplicates the top stack item.",
      className: "COLUMN-2-0",
      libDataType: LIB_DATA_TYPE.OP_CODE,
    },
  },
  {
    containers: [],
    beforeStack: [
      {
        name: "OP_DUP",
        number: 118,
        hex: "0x76",
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
        dataHex: "01000000",
        dataNumber: 1,
        className: "COLUMN-1-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
      },
    ],
    currentStack: [
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
        className: "COLUMN-2-1",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
      },
    ],
    stackData: {
      dataBinary: {},
      dataBytes: {
        "0": 1,
        "1": 0,
        "2": 0,
        "3": 0,
      },
      dataHex: "01000000",
      dataNumber: 1,
      className: "COLUMN-2-1",
      libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
    },
  },
  {
    containers: [2],
    beforeStack: [
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
        className: "COLUMN-1-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
      },
    ],
    currentStack: [
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
        className: "COLUMN-2-1",
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
        dataHex: "01000000",
        dataNumber: 1,
        className: "COLUMN-1-0",
        libDataType: LIB_DATA_TYPE.SCRIPT_DATA,
      },
    ],
  },
];
/*



*/
