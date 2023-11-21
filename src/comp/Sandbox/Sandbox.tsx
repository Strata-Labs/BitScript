import { useState, useEffect } from "react";
import { ScriptWiz, VM, VM_NETWORK, VM_NETWORK_VERSION } from "@script-wiz/lib";
import { useAtom } from "jotai";

import { menuOpen, paymentAtom, sandBoxPopUpOpen, userSignedIn } from "../atom";
import StackVisualizerPane from "../StackVisualizer/StackVisualizerPane";
import SandboxEditorInput from "./SandBoxInput";
import SandBoxPopUp from "./SandboxPopUp";

const Sandbox = () => {
  const [scriptWiz, setScriptWiz] = useState<ScriptWiz>();
  const [isSandBoxPopUpOpen, setIsSandBoxPopUpOpen] = useAtom(sandBoxPopUpOpen);
  const [payment, setPayment] = useAtom(paymentAtom);
  const [isUserSignedIn] = useAtom(userSignedIn);
  const [isMenuOpen, setMenuOpen] = useAtom(menuOpen);

  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(300);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const [totalSteps, setTotalSteps] = useState(0);

  // TODO: maybe use the controlled value here and feed it into SandBoxInput
  const [editorValue, setEditorValue] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');

  const [vm, setVm] = useState<VM>({
    network: VM_NETWORK.BTC,
    ver: VM_NETWORK_VERSION.SEGWIT,
  });

  useEffect(() => {
    const extension = {};

    const scriptWizInstance = new ScriptWiz(vm, extension);
    setScriptWiz(scriptWizInstance);
  }, [vm, vm.network, vm.ver]);

  if (scriptWiz === undefined) {
    return null;
  }
  if (isMenuOpen === true) {
    return null;
  }

  const handleEditorChange = (newValue: string) => {
    setEditorValue(newValue);
  };

  const handleUserInput = (input: string) => {
    setUserInput(input)
  }

  return (
    <div className="flex min-h-[92vh] flex-1 flex-row items-start justify-between gap-x-4  bg-primary-gray md:ml-[270px] ">
      <div className="flex min-h-[88vh] w-11/12 flex-row ">
        <SandboxEditorInput
          handleEditorChange={handleEditorChange}
          handleUserInput={handleUserInput}
          scriptWiz={scriptWiz}
        />
        <StackVisualizerPane editorValue={editorValue} userInput={userInput} />
      </div>
    </div>
  );
};

export default Sandbox;
