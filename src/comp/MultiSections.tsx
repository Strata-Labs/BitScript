import * as d3 from "d3";

import { use, useEffect, useRef, useState } from "react";
import DrawScene, { SATOSHI_ART_BOARD } from "./MultiSectionHelper/DrawScene";
import SetScene from "./MultiSectionHelper/SetScene";

const PLACEHOLDER_CON_COLOR = "#456F97";
const SQUARE_SIZE = 155;
const COLUMN_WIDTH = 200;
const BLOCK_WIDTH = SQUARE_SIZE * 0.8;

const BLOCK_ITEM_HEIGHT = SQUARE_SIZE * 0.2;

const HALF_COLUMN_WIDTH = COLUMN_WIDTH / 2;
const HALF_SCORE = SQUARE_SIZE / 2;

enum LANG_TYPE {
  OPERATORS = "OPERATORS",
  LANG_TYPE = "LANG_TYPE",
}
type DATA_NODE = {
  text: string | null;
  value: number;
  tye: LANG_TYPE;
  className: string;
};

type STACK_STATE = {
  beforeStack: Array<DATA_NODE>;
  currentStack: Array<DATA_NODE>;
  stackData?: DATA_NODE;
  opCode?: DATA_NODE;
};
// const TEST_DATA = [
//   {
//     beforeStack: [],
//     currentStack: [
//       {
//         text: "1",
//         value: 1,
//         type: LANG_TYPE.LANG_TYPE,
//         className: "COLUMN-0-0",
//       },
//     ],
//     processStack: [],
//     processResultStack: [],
//   },
//   {
//     beforeStack: [
//       {
//         text: "1",
//         value: 1,
//         type: LANG_TYPE.LANG_TYPE,
//         className: "COLUMN-0-0",
//       },
//     ],
//     currentStack: [
//       {
//         text: "1",
//         value: 1,
//         type: LANG_TYPE.LANG_TYPE,
//         className: "COLUMN-0-0",
//       },
//       {
//         text: "2",
//         value: 2,
//         type: LANG_TYPE.LANG_TYPE,
//         className: "COLUMN-0-1",
//       },
//     ],
//     processStack: [],
//     processResultStack: [],
//   },
//   {
//     beforeStack: [
//       {
//         text: "1",
//         value: 1,
//         type: LANG_TYPE.LANG_TYPE,
//         className: "COLUMN-0-0",
//       },
//       {
//         text: "2",
//         value: 2,
//         type: LANG_TYPE.LANG_TYPE,
//         className: "COLUMN-0-1",
//       },
//     ],
//     currentStack: [],
//     processStack: [],
//     processResultStack: [],
//   },
// ];

const TEST_DATA = [
  {
    queStack: [
      {
        text: "1",
        value: 1,
        type: LANG_TYPE.LANG_TYPE,
        className: "COLUMN-0-0",
      },
      {
        text: "2",
        value: 2,
        type: LANG_TYPE.LANG_TYPE,
        className: "COLUMN-0-1",
      },
      {
        text: "3",
        value: 3,
        type: LANG_TYPE.LANG_TYPE,
        className: "COLUMN-0-2",
      },
    ],
    processStack: [],
    processResultStack: [],
    resultStack: [
      {
        text: "5",
        value: 3,
        type: LANG_TYPE.LANG_TYPE,
        className: "COLUMN-3-0",
      },
    ],
  },
  {
    queStack: [],
    processStack: [
      {
        text: "1",
        value: 1,
        type: LANG_TYPE.LANG_TYPE,
        className: "COLUMN-1-0",
      },
      {
        text: "2",
        value: 2,
        type: LANG_TYPE.LANG_TYPE,
        className: "COLUMN-1-1",
      },
      {
        text: "3",
        value: 3,
        type: LANG_TYPE.LANG_TYPE,
        className: "COLUMN-1-2",
      },
    ],
    processResultStack: [],
    resultStack: [
      {
        text: "5",
        value: 3,
        type: LANG_TYPE.LANG_TYPE,
        className: "COLUMN-3-0",
      },
    ],
  },
  {
    queStack: [],
    processStack: [],
    processResultStack: [],
    resultStack: [
      {
        text: "5",
        value: 3,
        type: LANG_TYPE.LANG_TYPE,
        className: "COLUMN-3-0",
      },
      {
        text: "1",
        value: 1,
        type: LANG_TYPE.LANG_TYPE,
        className: "COLUMN-0-1",
      },
      {
        text: "2",
        value: 2,
        type: LANG_TYPE.LANG_TYPE,
        className: "COLUMN-0-2",
      },
      {
        text: "3",
        value: 3,
        type: LANG_TYPE.LANG_TYPE,
        className: "COLUMN-0-3",
      },
    ],
  },
];
const finalScene = {
  queStack: [
    {
      text: "1",
      value: 1,
      type: LANG_TYPE.LANG_TYPE,
      className: "COLUMN-0-0",
      color: "blue",
    },
    {
      text: "2",
      value: 2,
      type: LANG_TYPE.LANG_TYPE,
      className: "COLUMN-0-0",
      color: "blue",
    },
    {
      text: "3",
      value: 3,
      type: LANG_TYPE.LANG_TYPE,
      className: "COLUMN-0-0",
      color: "blue",
    },
  ],
  processStack: [],
  processResultStack: [],
  resultStack: [
    {
      text: "5",
      value: 1,
      type: LANG_TYPE.LANG_TYPE,
      className: "COLUMN-3-0",
      color: "blue",
    },
  ],
};

const MultiSections = () => {
  // basic height and width
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(500);
  const [step, setStep] = useState(0);
  const [drawScene, setDrawScene] = useState<SetScene | null>(null);

  const svgRef = useRef(null);

  useEffect(() => {
    // need to be done this way so we can ensure the svg is loaded

    const drawScene = new SetScene({
      scene: TEST_DATA[step],
      width,
      height,
      finalScene,
    });
    setDrawScene(drawScene);
  }, []);

  const handleNext = () => {
    console.log("drawScene", drawScene);
    if (step === TEST_DATA.length - 1) return;

    if (drawScene) {
      //drawScene.startOp();
      drawScene.resetScene(TEST_DATA[step + 1]);

      setStep(step + 1);
    }
  };

  const handleBack = () => {
    console.log("drawScene", drawScene);
    if (step === 0) return;

    if (drawScene) {
      //drawScene.startOp();
      drawScene.resetScene(TEST_DATA[step - 1]);

      setStep(step - 1);
    }
  };
  console.log("step", step);
  return (
    <div className="min-h-screen over w-full bg-white flex flex-col gap-y-10 items-center justify-center">
      <svg
        ref={svgRef}
        id={SATOSHI_ART_BOARD}
        className="bg-primary-gray"
      ></svg>
      <div className="flex flex-row items-center gap-x-4">
        <button
          onClick={() => handleBack()}
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Start
        </button>
        <button
          onClick={() => handleNext()}
          //onClick={() => addOpAdd()}
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Next
        </button>
        {/* <button
          //onClick={() => popLatestToProcess()}
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Pop from Stack
        </button>
        <button
          //onClick={() => addOpAdd()}
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Add OP_ADD
        </button>
        <button
          //onClick={() => handleProcessOpAdd()}
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          process OP_ADD
        </button>
        <button
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Show new Stack
        </button> */}
      </div>
    </div>
  );
};

export default MultiSections;
