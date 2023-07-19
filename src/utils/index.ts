import { EXECUTION_STEPS } from "@/comp/StepAnimation";

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const TEST_DATA: EXECUTION_STEPS[] = [
  {
    beforeStack: [],
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
        className: "COLUMN-0-0",
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
    },
  },
  {
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
        className: "COLUMN-0-1",
        dataNumber: 1,
      },
    ],
    opCode: {
      name: "OP_DUP",
      number: 118,
      hex: "0x76",
      description: "Duplicates the top stack item.",
      className: "COLUMN-1-0",
    },
  },
];
