import React, { useEffect, useRef, useState } from "react";

import { SATOSHI_ART_BOARD } from "@/OPS_ANIMATION_LIB";

import {
  SCRIPT_DATA_STACK,
  SingleColumnScriptControl,
} from "@/SCRIPT_ANIMATION_LIB/SingleColumnScriptControl";

import styles from "./StackStepAnimator.module.css";
import {
  getDataValues,
  Result,
} from "@/SCRIPT_ANIMATION_LIB/SingleColumnOpCodeAnimators/dataBytes";

interface StackStepAnimatorProps {
  currentStep: number;
  isPlaying: boolean;
  playbackSpeedMultiplier: number;
  onGoToStep: (step: number) => void;
  stackData: SCRIPT_DATA_STACK[];
  width: number;
}

const StackStepAnimator = (props: StackStepAnimatorProps) => {
  const {
    currentStep,
    isPlaying,
    playbackSpeedMultiplier = 1,
    onGoToStep,
    stackData,
  } = props;

  const [width, setWidth] = useState<number>(600);
  const [height, setHeight] = useState<number>(300);
  const [scriptControl, setScriptControl] =
    useState<SingleColumnScriptControl>();
  const [popupInfo, setPopupInfo] = useState<{
    visible: boolean;
    x: number;
    y: number;
    data?: any;
  }>({ visible: false, x: 0, y: 0 });
  const [result, setResult] = useState<Result>();

  const svgRef = useRef(null);

  //TODO: change this to stackContainer
  const stackContainer = 150;
  const minimumStackCapacity = 3;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) {
      return;
    }

    const svgElement = svg as SVGSVGElement;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = svgElement.getBoundingClientRect();
      const mouseX = e.clientX - rect.left; // X position within the SVG
      const mouseY = e.clientY - rect.top; // Y position within the SVG
      const startX = width / 2 - stackContainer / 2;
      const topY = height - stackContainer * 1.25;
      const bottomY = topY + stackContainer * 0.95;
      const endX = startX + stackContainer;
      const blockHeight = stackContainer * 0.2;
      const stackIndex = scriptControl?.currentStack.length;

      const getBlockHeight = (stackHeight: number): number => {
        const maxStackHeight = blockHeight * minimumStackCapacity;

        return Math.min(maxStackHeight / stackHeight, blockHeight);
      };

      const computedBlockHeight = getBlockHeight(
        scriptControl?.currentStack.length || 0
      );
      const yDistanceInStack =
        bottomY - computedBlockHeight * (stackIndex! + 1);

      // mouse is within the stack area drawn on the satoshi board
      if (
        mouseX >= startX &&
        mouseX <= endX &&
        mouseY >= topY &&
        mouseY <= bottomY
      ) {
        // get the current stack height
        const blockDistance = bottomY - yDistanceInStack;
        //fix this to use the block wdith into account when calculating the yDistance in stack
        // -1 as some sort of correction block
        const particularBlocks = Math.floor(
          blockDistance / computedBlockHeight - 1
        );

        const exactBlock = Math.floor(
          //I added 10 to the computeed block height to make it more accurate to account for the space betweeen and the stroke width of the container
          (bottomY - mouseY) / (computedBlockHeight + 10)
        );
        //check if the exact block is greater than the stack index
        console.log("this is the exact block: ", exactBlock);

        const stackItem = scriptControl?.currentStack[exactBlock];

        if (stackItem) {
          //make it directly above the cursor
          const data = stackItem._dataBytes;
          const dataResult = getDataValues(data);
          setResult(dataResult);

          setPopupInfo({
            visible: true,
            x: mouseX + 10,
            y: mouseY - 250, // Position the popup wayyyy above the cursor
            data: stackItem,
          });
        }
      } else {
        setPopupInfo({ visible: false, x: 0, y: 0 });
      }
    };

    svgElement.addEventListener("mousemove", handleMouseMove);

    return () => {
      svgElement.removeEventListener("mousemove", handleMouseMove);
    };
  }, [svgRef.current, scriptControl]);

  const handleStepChangeRequest = (stepIndex: number) => {
    onGoToStep(stepIndex);
  };

  useEffect(() => {
    let svgWidth = width;
    let svgHeight = height;
    const windowWidth = window.innerWidth;

    if (width === 0) {
      return;
    }
    // if (windowWidth < 650) {
    //   svgWidth = windowWidth - 130;
    //   svgHeight = 190;
    // } else if (windowWidth > 1000 && windowWidth < 1400) {
    //   svgWidth = 500;
    // } else if (windowWidth > 1400 && windowWidth < 1700) {
    //   svgWidth = 700;
    // } else if (windowWidth > 1700) {
    //   svgWidth = 800;
    // }

    setWidth(svgWidth);
    setHeight(svgHeight);

    const scriptControl = new SingleColumnScriptControl({
      height: height,
      isPlaying,
      playbackSpeedMultiplier,
      requestStepChange: onGoToStep,
      scriptSteps: stackData,
      width: width,
    });

    scriptControl.setStep(0);
    setScriptControl(scriptControl);
  }, [stackData, width]);

  useEffect(() => {
    if (!scriptControl) {
      return;
    }

    scriptControl.setStep(currentStep);
  }, [currentStep, scriptControl]);

  useEffect(() => {
    if (!scriptControl) {
      return;
    }

    scriptControl.setPlaybackSpeedMultiplier(playbackSpeedMultiplier);
  }, [playbackSpeedMultiplier]);

  useEffect(() => {
    if (!scriptControl) {
      return;
    }

    scriptControl.setIsPlaying(isPlaying);
  }, [isPlaying]);

  //TODO:

  return (
    <div className="relative cursor-pointer">
      <svg
        ref={svgRef}
        id={SATOSHI_ART_BOARD}
        className={`m-auto flex bg-[#F9F9F9]  w-[${width}px] h-[${height}px] mt-1 rounded-lg ${styles.svg}`}
      ></svg>
      {popupInfo.visible && (
        <div
          className="animate-popup absolute z-50 w-2/5 rounded-2xl bg-[#110B24] px-5 py-6 shadow-lg border border-[#F79327] "
          style={{
            left: popupInfo.x,
            top: popupInfo.y,
          }}
        >
          {popupInfo.data && (
            <div className="space-y-3 text-xs">
              <p className="overflow-hidden text-ellipsis text-lg">
                Hex : {result?.dataHex}
              </p>
              <div className="space-y-2">
                <p className="font-bold"># Binary</p>
                <div className="overflow-hidden text-ellipsis rounded-2xl bg-[#2A253A] px-3 py-2">
                  <p className="overflow-hidden text-ellipsis">
                    {result?.dataBinary}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-bold"># byte</p>
                <div className="rounded-2xl bg-[#2A253A] px-3 py-2">
                  <p className="overflow-hidden text-ellipsis">
                    {result?.dataBytes}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-bold"># decimal</p>
                <div className="rounded-2xl bg-[#2A253A] px-3 py-2">
                  <p className="overflow-hidden text-ellipsis">
                    {result?.dataNumber}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-bold"># string</p>
                <div className="rounded-2xl bg-[#2A253A] px-3 py-2">
                  <p className="overflow-hidden text-ellipsis">
                    {result?.dataString}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StackStepAnimator;
