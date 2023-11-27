import React, { useEffect, useRef, useState } from "react";

import { SATOSHI_ART_BOARD } from "@/OPS_ANIMATION_LIB";

import {
  SCRIPT_DATA_STACK,
  SingleColumnScriptControl,
} from "@/SCRIPT_ANIMATION_LIB/SingleColumnScriptControl";

import styles from "./StackStepAnimator.module.css";

interface StackStepAnimatorProps {
  currentStep: number;
  isPlaying: boolean;
  onGoToStep: (step: number) => void;
  onSetIsPlaying: (isPlaying: boolean) => void;
  stackData: SCRIPT_DATA_STACK[];
}

const StackStepAnimator = (props: StackStepAnimatorProps) => {
  const { currentStep, isPlaying, onGoToStep, onSetIsPlaying, stackData } =
    props;

  console.log("stackData", stackData);
  console.log("currentStep", currentStep);
  const [width, setWidth] = useState<number>(600);
  const [height, setHeight] = useState<number>(400);
  const [scriptControl, setScriptControl] =
    useState<SingleColumnScriptControl>();

  const svgRef = useRef(null);

  const handleStepChangeRequest = (stepIndex: number) => {
    onGoToStep(stepIndex);
  };

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

    setWidth(svgWidth);
    setHeight(svgHeight);

    const scriptControl = new SingleColumnScriptControl({
      height: height,
      scriptSteps: stackData,
      width: width,
      requestStepChange: handleStepChangeRequest,
    });

    scriptControl.setStep(0);
    setScriptControl(scriptControl);
  }, [stackData]);

  useEffect(() => {
    if (scriptControl) {
      scriptControl?.setStep(currentStep);
    }
  }, [currentStep, scriptControl]);

  return (
    <div>
      <svg
        ref={svgRef}
        id={SATOSHI_ART_BOARD}
        className={`m-auto flex bg-[#F9F9F9]  w-[${width}px] h-[${height}px] mt-1 rounded-lg ${styles.svg}`}
      ></svg>
    </div>
  );
};

export default StackStepAnimator;
