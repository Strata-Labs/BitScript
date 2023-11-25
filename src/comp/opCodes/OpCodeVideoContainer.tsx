import React, { useEffect, useRef, useState } from "react";

import { OpCodes } from "../../OPS_ANIMATION_LIB/OpCodes";
import { SATOSHI_ART_BOARD } from "../../OPS_ANIMATION_LIB";
import { STACK_VISUAL_PROPS } from "./OpCodeView";
import { useRouter } from "next/router";

const OpCodeVideoContainer = ({
  stackSteps,
  title,
  description,
  steps,
}: STACK_VISUAL_PROPS) => {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(350);

  const svgRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const [scriptClassHandler, setScriptClassHandler] = useState<OpCodes | null>(
    null
  );

  const router = useRouter();

  useEffect(() => {
    if ((title = "OP_CHECKMULTISIG")) {
      setHeight(500);
    }
    const windowWidth = window.innerWidth;
    // need to be done this way so we can ensure the svg is loaded

    // check is search params has step
    let startStep = 0;

    if (router.query.step) {
      const stepNumber = parseInt(router.query.step as string);
      if (stepNumber) {
        startStep = stepNumber;
        //setCurrentStep(stepNumber);
      }
    }

    let svgWidth = width;
    let svgHeight = height;

    if ((title = "OP_CHECKMULTISIG")) {
      setHeight(500);
      svgHeight = 500;
    }

    if (windowWidth < 650) {
      svgWidth = windowWidth - 120;
      svgHeight = 260;
    } else if (windowWidth > 1000 && windowWidth < 1400) {
      svgWidth = 700;
    } else if (windowWidth > 1400 && windowWidth < 1700) {
      svgWidth = 800;
    } else if (windowWidth > 1700) {
      svgWidth = 1000;
    }

    setWidth(svgWidth);
    setHeight(svgHeight);

    const scriptAccessScene = new OpCodes({
      opCodeStackSteps: stackSteps,
      width: svgWidth,
      height: svgHeight,
      autoPlay: true,
      handleStepFromClass: handleStepFromClass,
      handleClassPauseCallBack: handleClassPauseCallBack,
    });
    setScriptClassHandler(scriptAccessScene);
    scriptAccessScene.startDrawStack();
  }, []);

  const handleStepFromClass = (step: number) => {
    const _step = step - 1;
    /*
    router.replace({
      query: { ...router.query, step: _step },
    });
    */
    setCurrentStep(_step);
  };

  const checkStep = (step: number) => {
    // check if step is less than the length of _TEST
    console.log("checkStep", step);

    if (step < stackSteps.length && step >= 0) {
      console.log("scriptClassHandler", scriptClassHandler);
      if (scriptClassHandler) {
        console.log("yyy");
        scriptClassHandler.goToStep(step + 1);
      }
    }
  };

  const goBackStep = () => {
    if (currentStep > 0) {
      checkStep(currentStep - 1);
    }
  };

  const goForwardStep = () => {
    if (currentStep < stackSteps.length - 1) {
      checkStep(currentStep + 1);
    }
  };

  const goToStep = (stepNumber: number) => {
    checkStep(stepNumber);
  };

  const handlePausePlayClick = () => {
    if (scriptClassHandler) {
      if (isPlaying) {
        scriptClassHandler.handlePause();
      } else {
        scriptClassHandler.handlePlay();
      }
    }
  };

  const handleClassPauseCallBack = (status: boolean) => {
    setIsPlaying(status);
  };

  console.log("width", width);
  return (
    <div className="flex-col items-center justify-center md:items-start">
      <div className="ml-4 mr-4 mt-4 flex min-h-[614px] flex-col  rounded-xl bg-white sm:ml-12 sm:mr-12 md:ml-[267px] md:mr-8 md:min-h-[405px] md:min-w-[1156px]  md:flex-row md:items-center lg:pb-4 2xl:justify-between">
        <div className="ml-5 mt-8 flex flex-col ">
          <div className="ml-2 hidden md:flex">
            <MediaControlButtons
              currentStep={currentStep}
              isPlaying={isPlaying}
              goToStep={goToStep}
              goBackStep={goBackStep}
              handlePausePlayClick={handlePausePlayClick}
              goForwardStep={goForwardStep}
              totalSteps={stackSteps.length - 1}
            />
          </div>
          <p className="font-semibold text-black md:mt-10">{title}</p>
          <p className="mt-5 max-w-[420px] text-[16px] text-[#26292C]">
            {description}
          </p>

          {/* 1,2,3 list */}
          {steps.map((text, index) => {
            return (
              <StackTextSteps
                key={index}
                text={text}
                step={index}
                currentStep={currentStep}
                goToStep={goToStep}
              />
            );
          })}

          <div className="-ml-5 flex flex-col items-center justify-center">
            {/* Video Section Mobile */}

            <div
              className={`mt-5 flex h-[${height}px] w-[${width}px] rounded-lg bg-[#F9F9F9] md:hidden`}
            >
              {window.innerWidth < 600 && (
                <svg
                  ref={svgRef}
                  id={SATOSHI_ART_BOARD}
                  className={`flex bg-[#F9F9F9] md:hidden w-[${width}px] h-[${height}px] mt-1 rounded-lg`}
                ></svg>
              )}
            </div>
            <div className=" mt-6 flex md:hidden">
              <MediaControlButtons
                currentStep={currentStep}
                isPlaying={isPlaying}
                goToStep={goToStep}
                goBackStep={goBackStep}
                handlePausePlayClick={handlePausePlayClick}
                goForwardStep={goForwardStep}
                totalSteps={stackSteps.length - 1}
              />
            </div>
          </div>
        </div>
        {/* Video Desktop Section */}
        <div className="ml-10 mr-10 mt-8 flex md:flex-col">
          {window.innerWidth > 601 && (
            <svg
              ref={svgRef}
              id={SATOSHI_ART_BOARD}
              className={`hidden bg-[#F9F9F9] md:flex w-[${width}px] h-[${height}px] mt-1 rounded-lg`}
            ></svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpCodeVideoContainer;

type MediaControlButtonsProps = {
  buttonSize?: string;
  currentStep: number;
  isPlaying: boolean;
  goToStep: (stepNumber: number) => void;
  goBackStep: () => void;
  handlePausePlayClick: () => void;
  goForwardStep: () => void;
  totalSteps: number;
};

export const MediaControlButtons = ({
  buttonSize = "24",
  currentStep,
  isPlaying,
  goToStep,
  goBackStep,
  handlePausePlayClick,
  goForwardStep,
  totalSteps,
}: MediaControlButtonsProps) => {
  return (
    <>
      {/* Fast rewind button */}
      <button
        onClick={() => goToStep(0)}
        disabled={currentStep === 0}
        style={{
          cursor: currentStep === 0 ? "not-allowed" : "pointer",
          height: buttonSize,
          width: buttonSize,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill={currentStep === 0 ? "#D2D2D2" : "#FABC78"}
          strokeWidth={currentStep === 0 ? "0" : "2"}
          stroke={currentStep === 0 ? "#D2D2D2" : "#FABC78"}
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <path d="M20.226 5.52197C19.291 5.06997 18.207 5.18901 17.392 5.83301L12.75 9.49805V7.96411C12.75 6.91411 12.166 5.97895 11.226 5.52295C10.291 5.07095 9.20697 5.18998 8.39197 5.83398L3.75 9.49902V6C3.75 5.586 3.414 5.25 3 5.25C2.586 5.25 2.25 5.586 2.25 6V18C2.25 18.414 2.586 18.75 3 18.75C3.414 18.75 3.75 18.414 3.75 18V14.501L8.39197 18.168C8.87897 18.552 9.462 18.75 10.052 18.75C10.449 18.75 10.85 18.66 11.226 18.479C12.166 18.023 12.75 17.0881 12.75 16.0381V14.5029L17.392 18.1699C17.879 18.5539 18.462 18.752 19.052 18.752C19.449 18.752 19.85 18.662 20.226 18.481C21.166 18.025 21.75 17.09 21.75 16.04V7.96704C21.75 6.91304 21.166 5.97797 20.226 5.52197ZM11.25 16.0371C11.25 16.5151 10.996 16.9219 10.571 17.1279C10.153 17.3309 9.68704 17.278 9.32104 16.991L4.20996 12.9541C3.91796 12.7231 3.75 12.375 3.75 12C3.75 11.625 3.91796 11.2769 4.20996 11.0459L9.32104 7.01001C9.68704 6.72201 10.153 6.67107 10.571 6.87207C10.996 7.07807 11.25 7.48589 11.25 7.96289V16.0371ZM20.25 16.0371C20.25 16.5151 19.996 16.9219 19.571 17.1279C19.153 17.3309 18.687 17.278 18.321 16.991L13.21 12.9541C12.918 12.7231 12.75 12.375 12.75 12C12.75 11.625 12.918 11.2769 13.21 11.0459L18.321 7.01001C18.687 6.72201 19.154 6.67107 19.571 6.87207C19.996 7.07807 20.25 7.48589 20.25 7.96289V16.0371Z" />
        </svg>
      </button>
      {/* Hard rewind button */}
      <button
        onClick={() => goBackStep()}
        disabled={currentStep === 0}
        style={{
          cursor: currentStep === 0 ? "not-allowed" : "pointer",
          height: buttonSize,
          width: buttonSize,
        }}
        className="ml-5 "
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill={currentStep === 0 ? "#D2D2D2" : "#FABC78"}
          strokeWidth={currentStep === 0 ? "0" : "2"}
          stroke={currentStep === 0 ? "#D2D2D2" : "#FABC78"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.8571 3.58691C16.7001 3.02691 15.353 3.17292 14.343 3.97192L7.52795 9.354C7.20495 9.609 6.955 9.92389 6.75 10.2649V4C6.75 3.586 6.414 3.25 6 3.25C5.586 3.25 5.25 3.586 5.25 4V20C5.25 20.414 5.586 20.75 6 20.75C6.414 20.75 6.75 20.414 6.75 20V13.7329C6.956 14.0739 7.20595 14.389 7.52795 14.644L14.343 20.0271C14.947 20.5041 15.67 20.749 16.402 20.749C16.895 20.749 17.3911 20.6381 17.8571 20.4131C19.0241 19.8471 19.75 18.6861 19.75 17.3831V6.61792C19.75 5.31392 19.0241 4.15291 17.8571 3.58691ZM18.25 17.3821C18.25 18.1161 17.858 18.745 17.203 19.062C16.558 19.374 15.8379 19.2951 15.2729 18.8501L8.45801 13.467C8.00801 13.112 7.75 12.576 7.75 11.999C7.75 11.421 8.00801 10.886 8.45801 10.531L15.2729 5.14893C15.8369 4.70393 16.558 4.62601 17.203 4.93701C17.858 5.25401 18.25 5.88294 18.25 6.61694V17.3821Z" />
        </svg>
      </button>
      {/* Play and Pause Buttons deppending on  */}
      <button
        onClick={() => handlePausePlayClick()}
        className="ml-5 cursor-pointer text-yellow-500"
        style={{
          height: buttonSize,
          width: buttonSize,
        }}
      >
        {isPlaying ? (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 9 16"
            fill="#FABC78"
            stroke="#FABC78"
            strokeWidth="2"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-[5px] mr-[10px]"
          >
            <rect x="6" width="3" height="16" rx="1.5" fill="#FABC78" />
            <rect width="3" height="16" rx="1.5" fill="#FABC78" />
          </svg>
        ) : (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill={currentStep === 2 ? "#D2D2D2" : "#FABC78"}
            strokeWidth={currentStep === 2 ? "0" : "2"}
            stroke={currentStep === 2 ? "#D2D2D2" : "#FABC78"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.66 14.3869L8.58398 20.5529C6.57898 21.7799 4 20.3408 4 17.9948V6.00575C4 3.65975 6.57898 2.22089 8.58398 3.44789L18.66 9.6139C20.445 10.7069 20.445 13.2949 18.66 14.3869Z" />
          </svg>
        )}
      </button>
      {/* Hard Forward */}
      <button
        onClick={() => goForwardStep()}
        className="ml-5 "
        disabled={currentStep >= totalSteps - 1}
        style={{
          cursor: currentStep >= totalSteps - 1 ? "not-allowed" : "pointer",
          height: buttonSize,
          width: buttonSize,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill={currentStep >= totalSteps - 1 ? "#D2D2D2" : "#FABC78"}
          strokeWidth={currentStep >= totalSteps - 1 ? "0" : "2"}
          stroke={currentStep >= totalSteps - 1 ? "#D2D2D2" : "#FABC78"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 3.25C17.586 3.25 17.25 3.586 17.25 4V10.2661C17.044 9.92511 16.794 9.60998 16.472 9.35498L9.65698 3.9729C8.64598 3.1739 7.30094 3.02889 6.14294 3.58789C4.97594 4.15389 4.25 5.31492 4.25 6.61792V17.3831C4.25 18.6861 4.97594 19.8471 6.14294 20.4131C6.60894 20.6391 7.10502 20.749 7.59802 20.749C8.32902 20.749 9.05298 20.5041 9.65698 20.0271L16.472 14.644C16.795 14.389 17.045 14.0739 17.25 13.7329V20C17.25 20.414 17.586 20.75 18 20.75C18.414 20.75 18.75 20.414 18.75 20V4C18.75 3.586 18.414 3.25 18 3.25ZM15.542 13.467L8.72705 18.8501C8.16405 19.2951 7.442 19.373 6.797 19.062C6.142 18.745 5.75 18.1161 5.75 17.3821V6.61694C5.75 5.88294 6.142 5.25401 6.797 4.93701C7.058 4.81101 7.32995 4.74902 7.60095 4.74902C7.99895 4.74902 8.39105 4.88393 8.72705 5.14893L15.542 10.531C15.992 10.886 16.25 11.422 16.25 11.999C16.25 12.577 15.992 13.112 15.542 13.467Z" />
        </svg>
      </button>
      {/* Fast Forward */}
      <button
        onClick={() => goToStep(totalSteps - 1)}
        className="ml-5"
        disabled={currentStep >= totalSteps - 1}
        style={{
          cursor: currentStep >= totalSteps - 1 ? "not-allowed" : "pointer",
          height: buttonSize,
          width: buttonSize
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill={totalSteps - 1 <= currentStep ? "#D2D2D2" : "#FABC78"}
          strokeWidth={currentStep <= totalSteps - 1 ? "0" : "2"}
          stroke={currentStep <= totalSteps - 1 ? "#D2D2D2" : "#FABC78"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 5.25C20.586 5.25 20.25 5.586 20.25 6V9.49805L15.608 5.83203C14.793 5.18903 13.709 5.07097 12.774 5.52197C11.834 5.97797 11.25 6.91289 11.25 7.96289V9.49707L6.60803 5.83105C5.79303 5.18805 4.70905 5.07 3.77405 5.521C2.83405 5.977 2.25 6.91191 2.25 7.96191V16.0349C2.25 17.0849 2.83405 18.0201 3.77405 18.4761C4.15005 18.6581 4.55 18.7471 4.948 18.7471C5.538 18.7471 6.12103 18.55 6.60803 18.165L11.25 14.499V16.0339C11.25 17.0839 11.834 18.0191 12.774 18.4751C13.15 18.6571 13.55 18.7461 13.948 18.7461C14.538 18.7461 15.121 18.5491 15.608 18.1641L20.25 14.498V18C20.25 18.414 20.586 18.75 21 18.75C21.414 18.75 21.75 18.414 21.75 18V6C21.75 5.586 21.414 5.25 21 5.25ZM10.79 12.9541L5.67896 16.991C5.31396 17.28 4.84796 17.3309 4.42896 17.1289C4.00396 16.9229 3.75 16.5151 3.75 16.0381V7.96509C3.75 7.48709 4.00396 7.08002 4.42896 6.87402C4.59796 6.79202 4.77495 6.75195 4.94995 6.75195C5.20795 6.75195 5.46196 6.83999 5.67896 7.01099L10.79 11.0471C11.082 11.2781 11.25 11.626 11.25 12.001C11.25 12.376 11.082 12.7231 10.79 12.9541ZM19.79 12.9541L14.679 16.991C14.314 17.28 13.848 17.3309 13.429 17.1289C13.004 16.9229 12.75 16.5151 12.75 16.0381V7.96509C12.75 7.48709 13.004 7.08002 13.429 6.87402C13.598 6.79202 13.775 6.75195 13.95 6.75195C14.208 6.75195 14.462 6.83999 14.679 7.01099L19.79 11.0471C20.082 11.2781 20.25 11.626 20.25 12.001C20.25 12.376 20.082 12.7231 19.79 12.9541Z" />
        </svg>
      </button>
    </>
  );
};
type StackTextStepsProps = {
  currentStep: number;
  goToStep: (step: number) => void;
  text: string;
  step: number;
};
export const StackTextSteps = ({
  currentStep,
  goToStep,
  text,
  step,
}: StackTextStepsProps) => {
  return (
    <div className="mt-5 flex flex-row items-center md:mt-10">
      {/* 1 */}
      <button
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-full border px-3 ${
          currentStep === step ? "border-[#FABC78] bg-[#FABC78]" : ""
        }`}
        onClick={() => goToStep(step)}
      >
        <p
          className={`${
            currentStep === step ? "font-bold text-white" : "text-black"
          }`}
        >
          {step + 1}
        </p>
      </button>
      <p
        className={`ml-3 ${
          currentStep === step
            ? "font-bold text-black"
            : "font-light text-black"
        }`}
      >
        {text}
      </p>
    </div>
  );
};
