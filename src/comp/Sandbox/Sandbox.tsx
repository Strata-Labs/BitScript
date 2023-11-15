import { useState, Fragment, useEffect, useMemo, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/utils";
import { testScriptData } from "@/corelibrary/main";

import { ScriptWiz, VM, VM_NETWORK, VM_NETWORK_VERSION } from "@script-wiz/lib";
import SandboxEditorInput from "./SandBoxInput";
import { StackState } from "@/corelibrary/stackstate";

import SandBoxPopUp from "./SandboxPopUp";
import { menuOpen, paymentAtom, sandBoxPopUpOpen, userSignedIn } from "../atom";
import { useAtom } from "jotai";

import { ScriptData } from "@/corelibrary/scriptdata";
import { MediaControlButtons } from "../opCodes/OpCodeVideoContainer";
import { Line } from "rc-progress";
import { set } from "zod";
import {
  SpeedSettingData,
  SpeedSettingEnum,
  StackVisualizerProps,
} from "./util";

const Sandbox = () => {
  const [scriptWiz, setScriptWiz] = useState<ScriptWiz>();
  const [isSandBoxPopUpOpen, setIsSandBoxPopUpOpen] = useAtom(sandBoxPopUpOpen);
  const [payment, setPayment] = useAtom(paymentAtom);
  const [isUserSignedIn] = useAtom(userSignedIn);
  const [isMenuOpen, setMenuOpen] = useAtom(menuOpen);

  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(300);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [totalSteps, setTotalSteps] = useState(0);

  const [scriptRes, setScriptRes] = useState<
    | StackState[]
    | {
        error: unknown;
        errorIndex: unknown;
      }
  >({
    error: null,
    errorIndex: null,
  });

  const [vm, setVm] = useState<VM>({
    network: VM_NETWORK.BTC,
    ver: VM_NETWORK_VERSION.SEGWIT,
  });

  useEffect(() => {
    const extension = {};

    const scriptWizInstance = new ScriptWiz(vm, extension);
    setScriptWiz(scriptWizInstance);
  }, [vm, vm.network, vm.ver]);

  const handleUserInput = (value: string) => {
    //console.log("value in handleUserInput: " + value);
    const res = testScriptData(value);

    setScriptRes(res);

    // check if res is an array
    if (typeof res === "object" && res !== null && !Array.isArray(res)) {
      console.log("error", res.error);
      console.log("errorIndex", res.errorIndex);
    } else {
      console.log("yas res: ", res);
      console.log("total steps should be ", res.length - 1);
      setTotalSteps(res.length - 1);
      setIsPlaying(true);

      //handleTempStart(currentStep);
      // call handleTempStart

      // if (totalSteps > 0) {
      //   if (currentStep <= totalSteps) {
    }
  };
  useEffect(() => {
    handleTempStart();
  }, [currentStep, totalSteps]);

  const handleTempStart = () => {
    console.log("is this running");
    // have a while loops that wait 3 seconds then increment currentStep
    // if currentStep === totalSteps then stop
    // if currentStep < totalSteps then keep going
    // if currentStep > totalSteps then stop

    if (totalSteps > 0) {
      if (currentStep < totalSteps) {
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
        }, 1000);
      }
    }
  };

  // const handleTempStartMemo = useMemo(
  //   (step: number)  => handleTempStart(step),
  //   [totalSteps, currentStep]
  // );

  const handleStepFromClass = (step: number) => {
    const _step = step;

    setCurrentStep(_step);
  };

  const goToStep = (stepNumber: number) => {
    setCurrentStep(stepNumber);
    //checkStep(stepNumber);
  };

  const goBackStep = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  };

  const handlePausePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  const goForwardStep = () => {
    if (currentStep < totalSteps) {
      goToStep(currentStep + 1);
    }
  };

  if (scriptWiz === undefined) {
    return null;
  }
  if (isMenuOpen === true) {
    return null;
  }

  return (
    <>
      <div className="mt-5 flex w-full items-center justify-center md:hidden">
        <img
          src="/Bg Image Sandbox Mobile.png"
          alt=""
          className="relative flex items-center justify-center blur-[2px]"
        />
        <img src="/Overlay.png" alt="" className="absolute" />
      </div>
      <div className="hidden min-h-[92vh] flex-1 flex-row items-start justify-between gap-x-4  bg-primary-gray md:ml-[270px] md:flex ">
        {isSandBoxPopUpOpen && <SandBoxPopUp />}
        <div className="flex min-h-[88vh] w-11/12 flex-row ">
          <SandboxEditorInput
            handleUserInput={handleUserInput}
            scriptWiz={scriptWiz}
            isPlaying={isPlaying}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
          <div className="h-full min-h-[92vh] w-[1px] bg-[#4d495d]" />
          <StackVisualizer
            totalSteps={totalSteps}
            currentStep={currentStep}
            isPlaying={isPlaying}
            goToStep={goToStep}
            goBackStep={goBackStep}
            handlePausePlayClick={handlePausePlayClick}
            goForwardStep={goForwardStep}
            scriptRes={scriptRes}
          />
        </div>
      </div>
    </>
  );
};

export default Sandbox;

const StackVisualizer = (props: StackVisualizerProps) => {
  const {
    scriptRes,
    currentStep,
    isPlaying,
    goBackStep,
    goForwardStep,
    handlePausePlayClick,
    goToStep,
    totalSteps,
  } = props;

  const [selectedSpeedSetting, setSelectedSpeed] = useState<SpeedSettingEnum>(
    SpeedSettingEnum.NORMAL
  );

  const renderTempEndCurrentStack = () => {
    if (
      typeof scriptRes === "object" &&
      scriptRes !== null &&
      !Array.isArray(scriptRes)
    ) {
      // check if scriptRes.error is a throw error

      if (scriptRes.error instanceof Error) {
        return (
          <p className="text-lg font-semibold text-red-500">
            {scriptRes.error.message}
          </p>
        );
      } else {
        return (
          <p className="text-lg font-semibold text-red-500">
            Please enter a valid script
          </p>
        );
      }
    } else {
      // can assume it's going be a StackState[] type
      // we want to show the result of the last stackState

      const lastStep = scriptRes[currentStep];

      let items: any = [];

      let keyNumber = 0;

      console.log("lastStep", lastStep);
      if (lastStep && lastStep.opCode) {
        keyNumber += 1;
        items.push(
          <div
            key={keyNumber + "-dataTile-" + currentStep}
            className="text-md flex h-14 w-52 flex-row items-center justify-center rounded-md bg-[#5C469C] px-4 py-2 font-semibold text-white"
          >
            <p className="text-white">{`${lastStep.opCode.hex} |  ${lastStep.opCode.name}`}</p>
          </div>
        );
      }
      if (lastStep && lastStep.currentStack.length > 0) {
        const stack = lastStep.currentStack.map((x) => {
          keyNumber += 1;
          const test = ScriptData.fromBytes(new Uint8Array([x._dataBytes[0]]));
          return (
            <div
              key={keyNumber + "-dataTile-" + currentStep}
              className="text-md flex h-14 w-52 flex-row items-center justify-center rounded-md bg-[#0C134F] px-4 py-2 font-semibold text-white"
            >
              <p className="text-white">{`0x${test.dataHex} | ${test.dataNumber}`}</p>
            </div>
          );
        });
        items = [...stack, ...items];
      }

      return items;
    }
  };

  const base = totalSteps;

  const percentDone = (100 / base) * currentStep;

  return (
    <div className="flex-1  rounded-r-3xl bg-[#110b24]">
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
                {Object.keys(SpeedSettingData).map((scriptVersion) => {
                  const enumKey = scriptVersion as SpeedSettingEnum;
                  const data = SpeedSettingData[enumKey];

                  return (
                    <Menu.Item>
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
      <div className="h-[1px] w-full bg-[#4d495d]" />
      <div
        style={{
          height: "calc(100vh - 20vh)",
        }}
        className="flex w-full flex-col items-center justify-center gap-2"
      >
        <div className="flex flex-col-reverse items-center gap-2 pb-6">
          {renderTempEndCurrentStack()}
        </div>
        <div className="flex h-2 w-full items-center px-8 ">
          <Line percent={percentDone} strokeWidth={0.5} strokeColor="#F79327" />
        </div>

        <div className="ml-auto mr-auto mt-4 h-[50px] w-auto items-center justify-center  rounded-xl  pl-4 pr-4 pt-2  sm:pt-0  md:flex md:justify-center">
          <MediaControlButtons
            currentStep={currentStep}
            isPlaying={isPlaying}
            goToStep={goToStep}
            goBackStep={goBackStep}
            handlePausePlayClick={handlePausePlayClick}
            goForwardStep={goForwardStep}
            totalSteps={totalSteps + 1}
          />
        </div>
      </div>
    </div>
  );
};
