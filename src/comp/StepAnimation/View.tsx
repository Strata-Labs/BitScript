import * as d3 from "d3";

import { use, useEffect, useRef, useState } from "react";
import { TEST_DATA } from "@/utils";
import { EXECUTION_STEPS, BaseLine } from ".";
import { SATOSHI_ART_BOARD } from "../MultiSectionHelper/DrawScene";
import { StartStack } from "./StartStack";
import { OpCodes } from "./OpCodes";

enum LANG_TYPE {
  OPERATORS = "OPERATORS",
  LANG_TYPE = "LANG_TYPE",
}

const StepAnimationView = () => {
  // basic height and width
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(350);
  const [step, setStep] = useState(0);
  const [scriptClassHandler, setScriptClassHandler] = useState<OpCodes | null>(
    null
  );

  const svgRef = useRef(null);

  useEffect(() => {
    // need to be done this way so we can ensure the svg is loaded

    const scriptAccessScene = new OpCodes({
      scriptStackSteps: TEST_DATA,
      width,
      height,
    });
    setScriptClassHandler(scriptAccessScene);
    scriptAccessScene.startDrawStack();
  }, []);

  const handleNext = () => {
    console.log("drawScene", scriptClassHandler);
    if (step === TEST_DATA.length - 1) return;

    if (scriptClassHandler) {
      //drawScene.startOp();
      //scriptClassHandler.resetScene(TEST_DATA[step + 1]);

      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 0) return;

    if (scriptClassHandler) {
      //drawScene.startOp();
      //scriptClassHandler.resetScene(TEST_DATA[step - 1]);

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
          onClick={() => scriptClassHandler?.goBack()}
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Back
        </button>
        {/* <button
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Start
        </button> */}
        <p className="text-xl"></p>
        <button
          onClick={() => scriptClassHandler?.goForward()}
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

export default StepAnimationView;
