import { ScriptControl } from "@/SCRIPT_ANIMATION_LIB/ScriptControl";
import React, { use, useEffect, useRef, useState } from "react";
import { Line } from "rc-progress";

import { classNames, useIsMobile, useWindowSize } from "@/utils";
import { MediaControlButtons } from "../opCodes/OpCodeVideoContainer";
import { SATOSHI_ART_BOARD } from "@/OPS_ANIMATION_LIB";
import { P2PKH_SCRIPT_DATA_STACK } from "@/const/SCRIPTS/p2pkh";
import { SCRIPT_DATA_STACK } from "@/SCRIPT_ANIMATION_LIB";

export enum CodeDisplayBlock {
  comment = "comment",
  code = "code",
}
export type CodeBlockType = {
  code: string;
  displayType: CodeDisplayBlock;
  step?: number;
};

export type CodeBlockDisplayProps = {
  codeBlocks: CodeBlockType[];
  goToStep: (step: number) => void;
  currentStep: number;
};

export type BottomVideoContainerProps = {
  codeBlocks: CodeBlockType[];
  descriptionText: string[];
  STACK_DATA: SCRIPT_DATA_STACK[];
};
const BottomVideoContainer = ({
  codeBlocks,
  descriptionText,
  STACK_DATA,
}: BottomVideoContainerProps) => {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(300);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  //const { width: windowWidth } = useWindowSize();

  const [scriptHandler, setScriptHandler] = useState<ScriptControl | null>(
    null
  );

  const svgRef = useRef(null);

  useEffect(() => {
    let svgWidth = width;
    let svgHeight = height;
    const windowWidth = window.innerWidth;

    if (windowWidth < 650) {
      svgWidth = windowWidth - 130;
      svgHeight = 190;
    } else if (windowWidth > 1000 && windowWidth < 1400) {
      svgWidth = 500;
    } else if (windowWidth > 1400 && windowWidth < 1700) {
      svgWidth = 700;
    } else if (windowWidth > 1700) {
      svgWidth = 800;
    }

    console.log("svgWidth", svgWidth);
    setWidth(svgWidth);
    setHeight(svgHeight);

    const scriptControlClass = new ScriptControl({
      scriptStackSteps: STACK_DATA,
      width: svgWidth,
      height: svgHeight,
      autoPlay: true,
      handleStepFromClass: handleStepFromClass,
      handleClassPauseCallBack: handleClassPauseCallBack,
    });

    setScriptHandler(scriptControlClass);
    scriptControlClass.start();
  }, []);

  const handleStepFromClass = (step: number) => {
    const _step = step;

    setCurrentStep(_step);
  };

  const checkStep = (step: number) => {
    // check if step is less than the length of _TEST
    if (step < STACK_DATA.length && step >= 0) {
      if (scriptHandler) {
        scriptHandler.goToStep(step);
      }
    }
  };

  const goBackStep = () => {
    if (currentStep > 0) {
      checkStep(currentStep - 1);
    }
  };

  const goForwardStep = () => {
    if (currentStep < STACK_DATA.length - 1) {
      checkStep(currentStep + 1);
    }
  };

  const handlePausePlayClick = () => {
    if (scriptHandler) {
      if (isPlaying) {
        console.log("pause");
        scriptHandler.handlePause();
      } else {
        console.log("play");

        scriptHandler.handlePlay();
      }
    }
  };

  const handleClassPauseCallBack = (status: boolean) => {
    setIsPlaying(status);
  };

  const goToStep = (stepNumber: number) => {
    checkStep(stepNumber);
  };

  const base = STACK_DATA.length - 1;

  const percentDone = (100 / base) * currentStep;

  return (
    <div className="flex-col items-center justify-center md:items-start">
      {/* White container */}
      <div
        className={`mx-12 mb-5 mt-4 flex h-[${
          height + 50
        }] flex-col items-center rounded-xl bg-white md:ml-[267px] md:mr-8  md:min-w-[1200px] md:items-start md:justify-between lg:pb-4`}
      >
        {/* Black Rectangle Container */}
        <div className="mt-4 flex w-full flex-col md:justify-between">
          <div className="mt-4 flex w-full flex-col md:flex-row md:justify-between">
            <div className="flex h-full flex-1">
              <CodeBlockDisplay
                codeBlocks={codeBlocks}
                currentStep={currentStep}
                goToStep={goToStep}
              />
            </div>
            {/* Video Section */}
            <div className="flex flex-col md:ml-10 md:mr-5">
              {/* Titles */}
              {/* <div className="mt-5 flex items-center justify-center md:mt-0 md:items-start md:justify-start">
                <p className="font-semibold text-black md:text-[16px]">
                  Press Play Button Below
                </p>
                <p className="ml-5 hidden text-[12px] text-[#CAC6DD] md:block">
                  OR
                </p>
                <p className="ml-5 hidden font-semibold text-black md:block">
                  Tap The Spacebar
                </p>
              </div> */}
              {/* Video */}
              <div className="flex  flex-col items-center gap-4 py-4  md:items-start md:py-0">
                <div className="  flex h-[31px] w-[160px] items-center justify-center rounded-full bg-[#F3F3F3]  ">
                  <p className="text-[12px] text-black">{`Step ${
                    currentStep + 1
                  }`}</p>
                </div>
                <p className="text-md ml-2 pb-4 text-center font-bold text-black md:text-left">
                  {descriptionText[currentStep]}
                </p>
              </div>
              <svg
                ref={svgRef}
                id={SATOSHI_ART_BOARD}
                className={`m-auto flex bg-[#F9F9F9]  w-[${width}px] h-[${height}px] mt-1 rounded-lg`}
              ></svg>
            </div>
          </div>
          {/* Media Buttons Bar Desktop */}
          <div className="ml-auto mr-auto mt-4 h-[50px] w-auto items-center justify-center  rounded-xl bg-[#F9F9F9] pl-4 pr-4 pt-2  sm:pt-0 md:ml-7 md:mr-4 md:flex md:justify-start">
            <MediaControlButtons
              currentStep={currentStep}
              isPlaying={isPlaying}
              goToStep={goToStep}
              goBackStep={goBackStep}
              handlePausePlayClick={handlePausePlayClick}
              goForwardStep={goForwardStep}
              totalSteps={STACK_DATA.length - 1}
            />

            <div className="flex h-2 w-full items-center px-4 ">
              <Line
                percent={percentDone}
                strokeWidth={0.5}
                strokeColor="#0C071D"
              />
            </div>
          </div>
          {/* Media Buttons Mobile */}
          <div className="mt-5 flex w-full justify-between md:hidden">
            <div className="mx-10 flex w-full justify-between">
              {/* <MediaControlButtons
              currentStep={currentStep}
              isPlaying={isPlaying}
              goToStep={goToStep}
              goBackStep={goBackStep}
              handlePausePlayClick={handlePausePlayClick}
              goForwardStep={goForwardStep}
            /> */}
            </div>
          </div>
          {/* Media Playing Bar Mobile*/}
        </div>
      </div>
    </div>
  );
};

export default BottomVideoContainer;

const CodeBlockDisplay = ({
  codeBlocks,
  goToStep,
  currentStep,
}: CodeBlockDisplayProps) => {
  const renderCodeBlock = () => {
    return codeBlocks.map((code, index) => {
      if (code.displayType === CodeDisplayBlock.comment) {
        return (
          <p className="mt-2 text-[14px] text-[#787878] md:text-[20px]">
            {code.code}
          </p>
        );
      } else {
        return (
          <p
            className={classNames(
              "text-[11px]  md:text-[20px]",
              currentStep === code.step
                ? "font-bold text-[#FABC78] "
                : "text-white"
            )}
            onClick={() => goToStep(code.step || 0)}
          >
            {code.code}
          </p>
        );
      }
    });
  };
  return (
    <div className="mx-4 flex h-[200px] w-full flex-col rounded-xl bg-[#26292C] sm:mx-10 md:mx-0  md:ml-7 md:mt-0 md:h-[393px] md:w-[494px] ">
      <div className="flex h-[35px] w-full items-start rounded-t-lg bg-[#1C1E20] md:w-[494px]">
        {/* 3 buttons */}
        <button className="ml-3 mt-3 h-[9px] w-[9px] rounded-full bg-[#F45952]"></button>
        <button className="ml-3 mt-3 h-[9px] w-[9px] rounded-full bg-[#DFB94E]"></button>
        <button className="ml-3 mt-3 h-[9px] w-[9px] rounded-full bg-[#5AB748]"></button>
      </div>
      {/* Information */}
      <div className="ml-3 mt-1 flex flex-col">
        {renderCodeBlock()}

        {/* <p className="text-[11px] md:text-[16px]">&lt;checksig&gt;</p> */}
      </div>
    </div>
  );
};
