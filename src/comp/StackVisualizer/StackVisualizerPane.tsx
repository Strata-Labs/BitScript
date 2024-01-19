import React, { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
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

  console.log("width", width);

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
  const [selectedSpeedSetting, setSelectedSpeed] = useState<SpeedSettingEnum>(
    SpeedSettingEnum.NORMAL
  );

  let stackData = scriptRes;
  const [codeBlocks, setCodeBlocks] = useState<CodeBlockType[]>([]);
  const [scriptResErr, setScriptResErr] = useState<ScriptResError>({
    error: null,
    errorIndex: null,
  });

  const descriptions = stackData.map((stackData, index) => {
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
  if (stackData.length === 0) {
    headerText = "Write code in the Script Sandbox to visualize it here";
  } else {
    headerText = `Step ${currentStep + 1}/${stackData.length} - ${
      descriptions[currentStep]
    }`;
  }

  const percentDone =
    stackData.length > 1 ? 100 * (currentStep / (stackData.length - 1)) : 1;

  const handleGoToStep = (step: number) => {
    if (step < 0 || step >= stackData.length) {
      return;
    }

    goToStep(step);
  };

  return (
    <div id={CON_ID} className="flex-1  rounded-r-3xl bg-[#110b24]">
      <div className="flex flex-row items-center justify-between p-4 px-6">
        <h2 className="text-lg text-white">Stack Inspector Sandbox</h2>
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
      <div className=" w-full ">
        <div className={styles.paneHeader}>{headerText}</div>

        <div className="top-pane">
          <StackStepAnimator
            currentStep={currentStep}
            isPlaying={isPlaying}
            onGoToStep={handleGoToStep}
            playbackSpeedMultiplier={
              SpeedSettingData[selectedSpeedSetting]?.multiplier || 1
            }
            stackData={stackData}
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
      <div className="">
        <SandboxToolSelect />
      </div>
    </div>
  );
};

export default StackVisualizerPane;
