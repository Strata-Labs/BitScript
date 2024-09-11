import React, { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Line } from "rc-progress";

import { Menu, Transition } from "@headlessui/react";

import { classNames } from "@/utils";
import { StackState } from "@/corelibrary/stackstate";
import { testScriptData } from "@/corelibrary/main";

import {
  CodeBlockType,
  CodeDisplayBlock,
} from "../scripts/ScriptVideoContainer";
import { MediaControlButtons } from "../opCodes/OpCodeVideoContainer";

import { SpeedSettingData, SpeedSettingEnum } from "./speedSettings";
import StackStepAnimator from "./StackStepAnimator";
import P2PKH_SCRIPT_DATA_STACK from "@/const/SCRIPTS/p2pkh";
import { SCRIPT_DATA_STACK } from "@/SCRIPT_ANIMATION_LIB";
import styles from "./StackVisualizerPane.module.css";
import { StackVisualizerProps } from "../Sandbox/util";
import { select, stack } from "d3";
import { getStringForDataBytes } from "@/SCRIPT_ANIMATION_LIB/SingleColumnOpCodeAnimators/dataBytes";
import SandboxToolSelect from "../Sandbox/SandboxToolSelect";
import { Switch } from "../Switch";
import { allOps, includeExperimentalOps } from "../atom";
import { useAtom } from "jotai";
import { toggleExperimentalOps } from "@/corelibrary/op_code";

type ScriptResError = {
  error: unknown;
  errorIndex: unknown;
};

const isScriptResError = (
  val: ScriptResError | StackState[]
): val is ScriptResError => {
  return (val as ScriptResError).error !== undefined;
};

interface StackVisualizerPaneProps {
  editorValue: string;
  userInput: string;
}

const CON_ID = "sandboxVisualizerCon";
const StackVisualizerPane = (props: StackVisualizerProps) => {
  const {
    scriptRes,
    currentStep,
    isPlaying,
    goBackStep,
    goForwardStep,
    onSetIsPlaying,
    goToStep,
    totalSteps,
  } = props;

  const [width, setWidth] = useState<number>(0);

  const [topPaneHeight, setTopPaneHeight] = useState(450); // Default height
  const [isDragging, setIsDragging] = useState(false);
  const [includeExperimental, setIncludeExperimental] = useAtom(
    includeExperimentalOps
  );
  const [allOpsAtom, setAllOpsAtom] = useAtom(allOps);

  useEffect(() => {
    if (totalSteps > 0) {
      // get teh width of our id CON_ID
      const con = document.getElementById(CON_ID);
      if (con) {
        const conWidth = con.clientWidth;
        setWidth(conWidth);
      }
    }
  }, [totalSteps]);

  // useEffect(() => {
  //   console.log("scriptRes", scriptRes);
  //   // make the stackData to be the value of the scriptRes
  //   setStackData(scriptRes);
  // }, [scriptRes]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp, { once: true });
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const [selectedSpeedSetting, setSelectedSpeed] = useState<SpeedSettingEnum>(
    SpeedSettingEnum.NORMAL
  );

  // let stackData = scriptRes;

  /* removed since it was not being used
  const [codeBlocks, setCodeBlocks] = useState<CodeBlockType[]>([]);
  const [scriptResErr, setScriptResErr] = useState<ScriptResError>({
    error: null,
    errorIndex: null,
  });
  */
  const descriptions = scriptRes.map((stackData, index) => {
    if (stackData.opCode) {
      return stackData.opCode.description;
    }

    if (stackData.currentStack?.length > 0) {
      const lastStep =
        stackData.currentStack[stackData.currentStack.length - 1];
      return `Pushing ${getStringForDataBytes(
        lastStep._dataBytes
      )} onto the stack`;
    }

    return "";
  });

  let headerText = "";
  if (scriptRes.length === 0) {
    headerText = "Write code in the Script Sandbox to visualize it here";
  } else {
    headerText = `Step ${currentStep + 1}/${scriptRes.length} - ${
      descriptions[currentStep]
    }`;
  }

  const percentDone =
    scriptRes.length > 1 ? 100 * (currentStep / (scriptRes.length - 1)) : 1;

  const handleGoToStep = (step: number) => {
    if (step < 0 || step >= scriptRes.length) {
      return;
    }

    goToStep(step);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.preventDefault(); // Prevents unwanted text selection during drag
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    // get the height of id whole-pane
    const wholePane = document.getElementById("whole-pane");

    const parentCont = document.getElementById(CON_ID);

    if (!wholePane) {
      return;
    }

    if (!parentCont) {
      return;
    }

    const wholePaneHeight = wholePane.clientHeight;
    //console.log("wholePaneHeight", wholePaneHeight);
    // get the y point of the top of the whole-pane
    const wholePaneTop = wholePane.getBoundingClientRect().top;

    const wholePaneBottom = parentCont.getBoundingClientRect().bottom - 30;
    // get the bottom of the parentCont with the padding included

    console.log("wholePaneBottom", wholePaneBottom);

    //console.log("wholePaneTop", wholePaneTop);

    const newHeight = e.clientY; // Use clientY for vertical movement
    console.log("newHeight", newHeight);
    const paneHeight = newHeight - wholePaneTop;

    // ensure we can't drag the pane off the bottom of the screen
    if (newHeight >= wholePaneBottom) {
      return;
    } else {
      setTopPaneHeight(paneHeight);
    }

    // Optionally, add limits to the resizing
    // Example: setTopPaneHeight(Math.min(Math.max(newHeight, minHeight), maxHeight));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleExperimentalToggle = (include: boolean) => {
    console.log("--------------------------------------------------")
    console.log("this is the include boolean: ", include); 
    console.log("--------------------------------------------------")
    setIncludeExperimental(include);
    const updatedOps = toggleExperimentalOps(include);
    console.log("this is the updated ops: ", updatedOps);
    setAllOpsAtom(updatedOps);
  };

  return (
    <div
      id={CON_ID}
      className="flex flex-1 flex-col overflow-scroll rounded-r-3xl bg-[#110b24]"
    >
      <div className="flex flex-row items-center justify-between p-4 px-6">
        <h2 className="text-lg text-white">Stack Inspector Sandbox</h2>

        <div className="flex items-center space-x-2">
          <Switch
            checked={includeExperimental}
            onCheckedChange={() => handleExperimentalToggle(!includeExperimental)}
            id="experimental-ops"
          />
          <label className="text-white text-sm dark:text-white" htmlFor="experimental-ops">Experimental Ops</label>
        </div>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-accent-dark-purple px-6 py-3 text-sm font-semibold  text-white shadow-sm   ">
              {SpeedSettingData[selectedSpeedSetting].title}
              <ChevronDownIcon
                className="-mr-1 ml-5 h-5 w-5 text-white"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="ring-1focus:outline-none absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-accent-dark-purple shadow-lg">
              <div className="py-1">
                {Object.keys(SpeedSettingData).map((scriptVersion, index) => {
                  const enumKey = scriptVersion as SpeedSettingEnum;
                  const data = SpeedSettingData[enumKey];

                  return (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <div
                          onClick={() => setSelectedSpeed(enumKey)}
                          className={classNames(
                            SpeedSettingData[selectedSpeedSetting].title ===
                              data.title
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700 hover:text-white",
                            "block cursor-pointer px-4 py-2 text-sm"
                          )}
                        >
                          {data.title}
                        </div>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="w-full flex-1  transition-all " id="whole-pane">
        <div
          className=" w-full  overflow-scroll"
          style={{
            height: `${topPaneHeight}px`,
          }}
        >
          <div className={styles.paneHeader}>{headerText}</div>

          <div className="top-pane">
            <StackStepAnimator
              width={width}
              currentStep={currentStep}
              isPlaying={isPlaying}
              onGoToStep={handleGoToStep}
              playbackSpeedMultiplier={
                SpeedSettingData[selectedSpeedSetting]?.multiplier || 1
              }
              stackData={scriptRes}
            />

            <div className={styles.progressLine}>
              <Line
                percent={percentDone}
                strokeWidth={0.5}
                strokeColor="#F79327"
              />
            </div>

            <div className={styles.mediaControls}>
              <MediaControlButtons
                buttonSize="18px"
                currentStep={currentStep}
                isPlaying={isPlaying}
                goToStep={handleGoToStep}
                goBackStep={() => handleGoToStep(currentStep - 1)}
                handlePausePlayClick={() => onSetIsPlaying(!isPlaying)}
                goForwardStep={() => handleGoToStep(currentStep + 1)}
                totalSteps={totalSteps + 1}
              />
            </div>
          </div>
        </div>
        <div className="relative mb-5 mt-5 h-[3px] w-full bg-[#4D495D]">
          <div
            onMouseDown={handleMouseDown}
            className="absolute inset-0 left-0 right-0 mx-auto flex w-6 cursor-pointer flex-row items-center"
          >
            <ChevronUpDownIcon className="  h-6 w-6  text-dark-orange" />
          </div>
        </div>
        <div className="overflow-scroll">
          <SandboxToolSelect />
        </div>
      </div>
    </div>
  );
};

export default StackVisualizerPane;
