import * as d3 from "d3";

import { use, useEffect, useRef, useState } from "react";
import DrawScene, { SATOSHI_ART_BOARD } from "./MultiSectionHelper/DrawScene";

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

const MultiSections = () => {
  // basic height and width
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(500);

  const svgRef = useRef(null);
  let drawScene: DrawScene | null = null;

  useEffect(() => {
    // need to be done this way so we can ensure the svg is loaded
    const stack = {
      queStack: [],
      processStack: [],
      processResultStack: [],
      resultStack: [],
    };
    drawScene = new DrawScene({
      scene: stack,
      width,
      height,
    });
  }, []);

  const handleNext = () => {
    if (drawScene) {
      drawScene.startOp();
    }
  };
  return (
    <div className="min-h-screen w-screen bg-white flex flex-col gap-y-10 items-center justify-center">
      <svg
        ref={svgRef}
        id={SATOSHI_ART_BOARD}
        className="bg-primary-gray"
      ></svg>
      <div className="flex flex-row items-center gap-x-4">
        <button
          type="button"
          onClick={() => handleNext()}
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Start
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
