import { useState, useEffect, useRef, Fragment } from "react";
import { ScriptWiz, VM, VM_NETWORK, VM_NETWORK_VERSION } from "@script-wiz/lib";
import { useAtom } from "jotai";

import {
  accountTierAtom,
  menuOpen,
  paymentAtom,
  sandBoxPopUpOpen,
  userSignedIn,
} from "../atom";
import StackVisualizerPane from "../StackVisualizer/StackVisualizerPane";
import SandboxEditorInput from "./SandBoxInput";
import SandBoxPopUp from "./SandboxPopUp";

import { ScriptData } from "@/corelibrary/scriptdata";
import { MediaControlButtons } from "../opCodes/OpCodeVideoContainer";
import { Line } from "rc-progress";
import { set } from "zod";
import {
  SpeedSettingData,
  SpeedSettingEnum,
  StackVisualizerProps,
} from "./util";
import { testScriptData } from "@/corelibrary/main";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/utils";
import { StackState } from "@/corelibrary/stackstate";

const Sandbox = () => {
  // ref
  const editorRef = useRef<any>(null);

  const [scriptWiz, setScriptWiz] = useState<ScriptWiz>();
  const [isSandBoxPopUpOpen, setIsSandBoxPopUpOpen] = useAtom(sandBoxPopUpOpen);
  const [payment, setPayment] = useAtom(paymentAtom);
  const [isUserSignedIn] = useAtom(userSignedIn);
  const [isMenuOpen, setMenuOpen] = useAtom(menuOpen);
  const [accountTier, setAccountTier] = useAtom(accountTierAtom);

  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(300);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [totalSteps, setTotalSteps] = useState(0);

  // TODO: maybe use the controlled value here and feed it into SandBoxInput
  const [editorValue, setEditorValue] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");

  const [vm, setVm] = useState<VM>({
    network: VM_NETWORK.BTC,
    ver: VM_NETWORK_VERSION.SEGWIT,
  });

  const [scriptRes, setScriptRes] = useState<StackState[]>([]);
  const [scriptResError, setScriptResError] = useState<{
    error: null | any;
    errorIndex: null | any;
  }>({
    error: null,
    errorIndex: null,
  });

  useEffect(() => {
    const extension = {};

    const scriptWizInstance = new ScriptWiz(vm, extension);
    setScriptWiz(scriptWizInstance);
  }, [vm, vm.network, vm.ver]);

  const handleEditorChange = (newValue: string) => {
    setEditorValue(newValue);
  };

  const handleUserInput = (value: string) => {
    console.log("value in handleUserInput: " + value);
    const res = testScriptData(value);

    // check if res is an array
    if (typeof res === "object" && res !== null && !Array.isArray(res)) {
      console.log("error", res.error);
      console.log("errorIndex", res.errorIndex);

      // set error script
      setScriptResError(res);
    } else {
      console.log("yas res: ", res);
      console.log("total steps should be ", res.length);
      setScriptRes(res);
      setTotalSteps(res.length);
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
    //console.log("is this running");
    // have a while loops that wait 3 seconds then increment currentStep
    // if currentStep === totalSteps then stop
    // if currentStep < totalSteps then keep going
    // if currentStep > totalSteps then stop
    // if (totalSteps > 0) {
    //   if (currentStep < totalSteps) {
    //     setTimeout(() => {
    //       setCurrentStep(currentStep + 1);
    //     }, 1000);
    //   }
    // }
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

  const handleSetIsPlaying = (isPlaying: boolean) => {
    setIsPlaying(isPlaying);
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

      <div className="mb-10 mt-10 hidden min-h-[92vh] flex-1 flex-row items-start  justify-between gap-x-4 bg-primary-gray md:ml-[270px] md:flex">
        <SandBoxPopUp editorRef={editorRef} />

        <div className="flex min-h-[88vh] w-11/12 flex-row ">
          <SandboxEditorInput
            handleUserInput={handleUserInput}
            scriptWiz={scriptWiz}
            isPlaying={isPlaying}
            currentStep={currentStep}
            totalSteps={totalSteps}
            editorRef={editorRef}
          />
          <div className="h-full min-h-[92vh] w-[1px] bg-[#4d495d]" />
          <StackVisualizerPane
            totalSteps={totalSteps}
            currentStep={currentStep}
            isPlaying={isPlaying}
            goToStep={goToStep}
            goBackStep={goBackStep}
            onSetIsPlaying={handleSetIsPlaying}
            goForwardStep={goForwardStep}
            scriptRes={scriptRes}
            scriptResError={scriptResError}
          />
        </div>
      </div>
    </>
  );
};

export default Sandbox;
