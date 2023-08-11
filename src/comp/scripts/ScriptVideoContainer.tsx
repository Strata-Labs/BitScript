"use client";

import { ScriptControl } from "@/SCRIPT_ANIMATION_LIB/ScriptControl";
import React, { use, useEffect, useRef, useState } from "react";

import p2pkh from "@/const/SCRIPTS/p2pkh";
import { SATOSHI_ART_BOARD } from "../OpCodesAnimations";
import { useRouter } from "next/router";
import { classNames } from "@/utils";

const BottomVideoContainer: React.FC = () => {
  const router = useRouter();

  if (typeof window === "undefined") {
    /* we're on the server */
    return null;
  }
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(300);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [scriptHandler, setScriptHandler] = useState<ScriptControl | null>(
    null
  );

  const svgRef = useRef(null);

  useEffect(() => {
    let svgWidth = width;
    let svgHeight = height;

    if (windowWidth < 600) {
      svgWidth = 312;
      svgHeight = 190;
    } else if (windowWidth > 1000 && windowWidth < 1400) {
      svgWidth = 500;
    } else if (windowWidth > 1400 && windowWidth < 1700) {
      svgWidth = 700;
    } else if (windowWidth > 1700) {
      svgWidth = 800;
    }

    setWidth(svgWidth);
    setHeight(svgHeight);
    const scriptControlClass = new ScriptControl({
      scriptStackSteps: p2pkh,
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
    console.log("handleStepFromClass", step);
    const _step = step;

    setCurrentStep(_step);
  };

  const checkStep = (step: number) => {
    // check if step is less than the length of _TEST
    if (step < p2pkh.length && step >= 0) {
      if (scriptHandler) {
        scriptHandler.goToStep(step + 1);
      }
    }
  };

  const goBackStep = () => {
    if (currentStep > 0) {
      checkStep(currentStep - 1);
    }
  };

  const goForwardStep = () => {
    if (currentStep < p2pkh.length - 1) {
      checkStep(currentStep + 1);
    }
  };

  const handlePausePlayClick = () => {
    if (scriptHandler) {
      if (isPlaying) {
        scriptHandler.handlePause();
      } else {
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
            <div className="flex w-full">
              <div className="mx-10 flex h-[200px] w-full flex-col rounded-xl bg-[#26292C] md:mx-0 md:mx-0 md:ml-7 md:mt-0 md:h-[303px] md:w-[494px] ">
                <div className="flex h-[35px] w-full items-start rounded-t-lg bg-[#1C1E20] md:w-[494px]">
                  {/* 3 buttons */}
                  <button className="ml-3 mt-3 h-[9px] w-[9px] rounded-full bg-[#F45952]"></button>
                  <button className="ml-3 mt-3 h-[9px] w-[9px] rounded-full bg-[#DFB94E]"></button>
                  <button className="ml-3 mt-3 h-[9px] w-[9px] rounded-full bg-[#5AB748]"></button>
                </div>
                {/* Information */}
                <div className="ml-3 mt-1 flex flex-col">
                  <p className="mt-2 text-[11px] text-[#787878] md:text-[16px]">
                    # UnlockScript/ScriptSig
                  </p>
                  <p
                    className={classNames(
                      "text-[11px] md:text-[16px]",
                      currentStep === 0 && "text-[#5AB748]"
                    )}
                    onClick={() => goToStep(-1)}
                  >
                    [signature]
                  </p>
                  <p
                    className={classNames(
                      "text-[11px] md:text-[16px]",
                      currentStep === 1 && "text-[#5AB748]"
                    )}
                    onClick={() => goToStep(0)}
                  >
                    [public-key]
                  </p>
                  <p className="mt-2 text-[11px] text-[#787878] md:text-[16px]">
                    # LockScript/ScriptPubKey
                  </p>
                  <p
                    className={classNames(
                      "text-[11px] md:text-[16px]",
                      currentStep === 2 && "text-[#5AB748]"
                    )}
                    onClick={() => goToStep(1)}
                  >
                    &lt;dup&gt;
                  </p>
                  <p
                    className={classNames(
                      "text-[11px] md:text-[16px]",
                      currentStep === 3 && "text-[#5AB748]"
                    )}
                    onClick={() => goToStep(2)}
                  >
                    &lt;hash160&gt;
                  </p>
                  <p
                    className={classNames(
                      "text-[11px] md:text-[16px]",
                      currentStep === 4 && "text-[#5AB748]"
                    )}
                    onClick={() => goToStep(3)}
                  >
                    [hash160[publick-key]]
                  </p>
                  <p
                    className={classNames(
                      "text-[11px] md:text-[16px]",
                      currentStep === 5 && "text-[#5AB748]"
                    )}
                    onClick={() => goToStep(4)}
                  >
                    &lt;equalverify&gt;
                  </p>
                  <p className="text-[11px] md:text-[16px]">&lt;checksig&gt;</p>
                </div>
              </div>
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
              <div className="flex  w-40 flex-col">
                <div className="-mt-1 mr-12 flex h-[31px] w-[160px] items-center justify-center rounded-full bg-[#F3F3F3]  md:ml-8">
                  <p className="text-[12px] text-black">{`Step ${
                    currentStep + 1
                  }`}</p>
                </div>
              </div>
              <svg
                ref={svgRef}
                id={SATOSHI_ART_BOARD}
                className={`flex bg-[#F9F9F9]  w-[${width}px] h-[${height}px] mt-1 rounded-lg`}
              ></svg>
            </div>
          </div>
          {/* Media Buttons Bar Desktop */}
          <div className="ml-7 mt-4  h-[50px] w-[1130px] items-center justify-start rounded-xl bg-[#F9F9F9] md:flex">
            {/* Fast Rewind */}
            <button
              onClick={() => goToStep(0)}
              disabled={currentStep === 0}
              style={{
                cursor: currentStep === 0 ? "not-allowed" : "pointer",
              }}
            >
              <svg
                width="24"
                height="24"
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
            {/* Hard Rewind */}
            <button
              onClick={() => goBackStep()}
              disabled={currentStep === 0}
              style={{
                cursor: currentStep === 0 ? "not-allowed" : "pointer",
              }}
              className="ml-5 "
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={currentStep === 0 ? "#D2D2D2" : "#FABC78"}
                strokeWidth={currentStep === 0 ? "0" : "2"}
                stroke={currentStep === 0 ? "#D2D2D2" : "#FABC78"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.8571 3.58691C16.7001 3.02691 15.353 3.17292 14.343 3.97192L7.52795 9.354C7.20495 9.609 6.955 9.92389 6.75 10.2649V4C6.75 3.586 6.414 3.25 6 3.25C5.586 3.25 5.25 3.586 5.25 4V20C5.25 20.414 5.586 20.75 6 20.75C6.414 20.75 6.75 20.414 6.75 20V13.7329C6.956 14.0739 7.20595 14.389 7.52795 14.644L14.343 20.0271C14.947 20.5041 15.67 20.749 16.402 20.749C16.895 20.749 17.3911 20.6381 17.8571 20.4131C19.0241 19.8471 19.75 18.6861 19.75 17.3831V6.61792C19.75 5.31392 19.0241 4.15291 17.8571 3.58691ZM18.25 17.3821C18.25 18.1161 17.858 18.745 17.203 19.062C16.558 19.374 15.8379 19.2951 15.2729 18.8501L8.45801 13.467C8.00801 13.112 7.75 12.576 7.75 11.999C7.75 11.421 8.00801 10.886 8.45801 10.531L15.2729 5.14893C15.8369 4.70393 16.558 4.62601 17.203 4.93701C17.858 5.25401 18.25 5.88294 18.25 6.61694V17.3821Z" />
              </svg>
            </button>
            {/* Play */}
            <button
              onClick={() => handlePausePlayClick()}
              className="ml-5 text-yellow-500"
              disabled={currentStep === 2}
              style={{
                cursor: currentStep === 2 ? "not-allowed" : "pointer",
              }}
            >
              {isPlaying ? (
                <svg
                  width="9"
                  height="16"
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
                  width="24"
                  height="24"
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
            {/* Fast Forward */}
            <button
              onClick={() => goForwardStep()}
              className="ml-5 "
              disabled={currentStep === 2}
              style={{
                cursor: currentStep === 2 ? "not-allowed" : "pointer",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={currentStep === p2pkh.length ? "#D2D2D2" : "#FABC78"}
                strokeWidth={currentStep === p2pkh.length ? "0" : "2"}
                stroke={currentStep === 2 ? "#D2D2D2" : "#FABC78"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 3.25C17.586 3.25 17.25 3.586 17.25 4V10.2661C17.044 9.92511 16.794 9.60998 16.472 9.35498L9.65698 3.9729C8.64598 3.1739 7.30094 3.02889 6.14294 3.58789C4.97594 4.15389 4.25 5.31492 4.25 6.61792V17.3831C4.25 18.6861 4.97594 19.8471 6.14294 20.4131C6.60894 20.6391 7.10502 20.749 7.59802 20.749C8.32902 20.749 9.05298 20.5041 9.65698 20.0271L16.472 14.644C16.795 14.389 17.045 14.0739 17.25 13.7329V20C17.25 20.414 17.586 20.75 18 20.75C18.414 20.75 18.75 20.414 18.75 20V4C18.75 3.586 18.414 3.25 18 3.25ZM15.542 13.467L8.72705 18.8501C8.16405 19.2951 7.442 19.373 6.797 19.062C6.142 18.745 5.75 18.1161 5.75 17.3821V6.61694C5.75 5.88294 6.142 5.25401 6.797 4.93701C7.058 4.81101 7.32995 4.74902 7.60095 4.74902C7.99895 4.74902 8.39105 4.88393 8.72705 5.14893L15.542 10.531C15.992 10.886 16.25 11.422 16.25 11.999C16.25 12.577 15.992 13.112 15.542 13.467Z" />
              </svg>
            </button>
            {/* Hard Forward */}
            <button
              onClick={() => goToStep(0)}
              className="ml-5"
              disabled={currentStep === p2pkh.length}
              style={{
                cursor: currentStep === 2 ? "not-allowed" : "pointer",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={currentStep === p2pkh.length ? "#D2D2D2" : "#FABC78"}
                strokeWidth={currentStep === p2pkh.length ? "0" : "2"}
                stroke={currentStep === p2pkh.length ? "#D2D2D2" : "#FABC78"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 5.25C20.586 5.25 20.25 5.586 20.25 6V9.49805L15.608 5.83203C14.793 5.18903 13.709 5.07097 12.774 5.52197C11.834 5.97797 11.25 6.91289 11.25 7.96289V9.49707L6.60803 5.83105C5.79303 5.18805 4.70905 5.07 3.77405 5.521C2.83405 5.977 2.25 6.91191 2.25 7.96191V16.0349C2.25 17.0849 2.83405 18.0201 3.77405 18.4761C4.15005 18.6581 4.55 18.7471 4.948 18.7471C5.538 18.7471 6.12103 18.55 6.60803 18.165L11.25 14.499V16.0339C11.25 17.0839 11.834 18.0191 12.774 18.4751C13.15 18.6571 13.55 18.7461 13.948 18.7461C14.538 18.7461 15.121 18.5491 15.608 18.1641L20.25 14.498V18C20.25 18.414 20.586 18.75 21 18.75C21.414 18.75 21.75 18.414 21.75 18V6C21.75 5.586 21.414 5.25 21 5.25ZM10.79 12.9541L5.67896 16.991C5.31396 17.28 4.84796 17.3309 4.42896 17.1289C4.00396 16.9229 3.75 16.5151 3.75 16.0381V7.96509C3.75 7.48709 4.00396 7.08002 4.42896 6.87402C4.59796 6.79202 4.77495 6.75195 4.94995 6.75195C5.20795 6.75195 5.46196 6.83999 5.67896 7.01099L10.79 11.0471C11.082 11.2781 11.25 11.626 11.25 12.001C11.25 12.376 11.082 12.7231 10.79 12.9541ZM19.79 12.9541L14.679 16.991C14.314 17.28 13.848 17.3309 13.429 17.1289C13.004 16.9229 12.75 16.5151 12.75 16.0381V7.96509C12.75 7.48709 13.004 7.08002 13.429 6.87402C13.598 6.79202 13.775 6.75195 13.95 6.75195C14.208 6.75195 14.462 6.83999 14.679 7.01099L19.79 11.0471C20.082 11.2781 20.25 11.626 20.25 12.001C20.25 12.376 20.082 12.7231 19.79 12.9541Z" />
              </svg>
            </button>
          </div>
          {/* Media Buttons Mobile */}
          <div className="mt-5 flex w-full justify-between md:hidden">
            <div className="mx-10 flex w-full justify-between">
              {/* Fast Rewind */}
              <button>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                >
                  <path
                    d="M20.226 5.52197C19.291 5.06997 18.207 5.18901 17.392 5.83301L12.75 9.49805V7.96411C12.75 6.91411 12.166 5.97895 11.226 5.52295C10.291 5.07095 9.20697 5.18998 8.39197 5.83398L3.75 9.49902V6C3.75 5.586 3.414 5.25 3 5.25C2.586 5.25 2.25 5.586 2.25 6V18C2.25 18.414 2.586 18.75 3 18.75C3.414 18.75 3.75 18.414 3.75 18V14.501L8.39197 18.168C8.87897 18.552 9.462 18.75 10.052 18.75C10.449 18.75 10.85 18.66 11.226 18.479C12.166 18.023 12.75 17.0881 12.75 16.0381V14.5029L17.392 18.1699C17.879 18.5539 18.462 18.752 19.052 18.752C19.449 18.752 19.85 18.662 20.226 18.481C21.166 18.025 21.75 17.09 21.75 16.04V7.96704C21.75 6.91304 21.166 5.97797 20.226 5.52197ZM11.25 16.0371C11.25 16.5151 10.996 16.9219 10.571 17.1279C10.153 17.3309 9.68704 17.278 9.32104 16.991L4.20996 12.9541C3.91796 12.7231 3.75 12.375 3.75 12C3.75 11.625 3.91796 11.2769 4.20996 11.0459L9.32104 7.01001C9.68704 6.72201 10.153 6.67107 10.571 6.87207C10.996 7.07807 11.25 7.48589 11.25 7.96289V16.0371ZM20.25 16.0371C20.25 16.5151 19.996 16.9219 19.571 17.1279C19.153 17.3309 18.687 17.278 18.321 16.991L13.21 12.9541C12.918 12.7231 12.75 12.375 12.75 12C12.75 11.625 12.918 11.2769 13.21 11.0459L18.321 7.01001C18.687 6.72201 19.154 6.67107 19.571 6.87207C19.996 7.07807 20.25 7.48589 20.25 7.96289V16.0371Z"
                    fill="#D2D2D2"
                  />
                </svg>
              </button>
              {/* Hard Rewind */}
              <button>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.8571 3.58691C16.7001 3.02691 15.353 3.17292 14.343 3.97192L7.52795 9.354C7.20495 9.609 6.955 9.92389 6.75 10.2649V4C6.75 3.586 6.414 3.25 6 3.25C5.586 3.25 5.25 3.586 5.25 4V20C5.25 20.414 5.586 20.75 6 20.75C6.414 20.75 6.75 20.414 6.75 20V13.7329C6.956 14.0739 7.20595 14.389 7.52795 14.644L14.343 20.0271C14.947 20.5041 15.67 20.749 16.402 20.749C16.895 20.749 17.3911 20.6381 17.8571 20.4131C19.0241 19.8471 19.75 18.6861 19.75 17.3831V6.61792C19.75 5.31392 19.0241 4.15291 17.8571 3.58691ZM18.25 17.3821C18.25 18.1161 17.858 18.745 17.203 19.062C16.558 19.374 15.8379 19.2951 15.2729 18.8501L8.45801 13.467C8.00801 13.112 7.75 12.576 7.75 11.999C7.75 11.421 8.00801 10.886 8.45801 10.531L15.2729 5.14893C15.8369 4.70393 16.558 4.62601 17.203 4.93701C17.858 5.25401 18.25 5.88294 18.25 6.61694V17.3821Z"
                    fill="#D2D2D2"
                  />
                </svg>
              </button>
              {/* Play */}
              <button className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#F1F1F1]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path
                    d="M18.66 14.3869L8.58398 20.5529C6.57898 21.7799 4 20.3408 4 17.9948V6.00575C4 3.65975 6.57898 2.22089 8.58398 3.44789L18.66 9.6139C20.445 10.7069 20.445 13.2949 18.66 14.3869Z"
                    fill="#25314C"
                  />
                </svg>
              </button>
              {/* Fast Forward */}
              <button>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 3.25C17.586 3.25 17.25 3.586 17.25 4V10.2661C17.044 9.92511 16.794 9.60998 16.472 9.35498L9.65698 3.9729C8.64598 3.1739 7.30094 3.02889 6.14294 3.58789C4.97594 4.15389 4.25 5.31492 4.25 6.61792V17.3831C4.25 18.6861 4.97594 19.8471 6.14294 20.4131C6.60894 20.6391 7.10502 20.749 7.59802 20.749C8.32902 20.749 9.05298 20.5041 9.65698 20.0271L16.472 14.644C16.795 14.389 17.045 14.0739 17.25 13.7329V20C17.25 20.414 17.586 20.75 18 20.75C18.414 20.75 18.75 20.414 18.75 20V4C18.75 3.586 18.414 3.25 18 3.25ZM15.542 13.467L8.72705 18.8501C8.16405 19.2951 7.442 19.373 6.797 19.062C6.142 18.745 5.75 18.1161 5.75 17.3821V6.61694C5.75 5.88294 6.142 5.25401 6.797 4.93701C7.058 4.81101 7.32995 4.74902 7.60095 4.74902C7.99895 4.74902 8.39105 4.88393 8.72705 5.14893L15.542 10.531C15.992 10.886 16.25 11.422 16.25 11.999C16.25 12.577 15.992 13.112 15.542 13.467Z"
                    fill="#D2D2D2"
                  />
                </svg>
              </button>
              {/* Hard Forward */}
              <button>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 5.25C20.586 5.25 20.25 5.586 20.25 6V9.49805L15.608 5.83203C14.793 5.18903 13.709 5.07097 12.774 5.52197C11.834 5.97797 11.25 6.91289 11.25 7.96289V9.49707L6.60803 5.83105C5.79303 5.18805 4.70905 5.07 3.77405 5.521C2.83405 5.977 2.25 6.91191 2.25 7.96191V16.0349C2.25 17.0849 2.83405 18.0201 3.77405 18.4761C4.15005 18.6581 4.55 18.7471 4.948 18.7471C5.538 18.7471 6.12103 18.55 6.60803 18.165L11.25 14.499V16.0339C11.25 17.0839 11.834 18.0191 12.774 18.4751C13.15 18.6571 13.55 18.7461 13.948 18.7461C14.538 18.7461 15.121 18.5491 15.608 18.1641L20.25 14.498V18C20.25 18.414 20.586 18.75 21 18.75C21.414 18.75 21.75 18.414 21.75 18V6C21.75 5.586 21.414 5.25 21 5.25ZM10.79 12.9541L5.67896 16.991C5.31396 17.28 4.84796 17.3309 4.42896 17.1289C4.00396 16.9229 3.75 16.5151 3.75 16.0381V7.96509C3.75 7.48709 4.00396 7.08002 4.42896 6.87402C4.59796 6.79202 4.77495 6.75195 4.94995 6.75195C5.20795 6.75195 5.46196 6.83999 5.67896 7.01099L10.79 11.0471C11.082 11.2781 11.25 11.626 11.25 12.001C11.25 12.376 11.082 12.7231 10.79 12.9541ZM19.79 12.9541L14.679 16.991C14.314 17.28 13.848 17.3309 13.429 17.1289C13.004 16.9229 12.75 16.5151 12.75 16.0381V7.96509C12.75 7.48709 13.004 7.08002 13.429 6.87402C13.598 6.79202 13.775 6.75195 13.95 6.75195C14.208 6.75195 14.462 6.83999 14.679 7.01099L19.79 11.0471C20.082 11.2781 20.25 11.626 20.25 12.001C20.25 12.376 20.082 12.7231 19.79 12.9541Z"
                    fill="#D2D2D2"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Media Playing Bar Mobile*/}
        </div>
      </div>
    </div>
  );
};

export default BottomVideoContainer;
