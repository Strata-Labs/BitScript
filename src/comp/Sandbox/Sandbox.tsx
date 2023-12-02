import { useState, useEffect, useRef } from "react";
import { ScriptWiz, VM, VM_NETWORK, VM_NETWORK_VERSION } from "@script-wiz/lib";
import { useAtom } from "jotai";

import { menuOpen, paymentAtom, sandboxScriptsAtom, UserSandboxScript, userSignedIn } from "../atom";
import StackVisualizerPane from "../StackVisualizer/StackVisualizerPane";
import SandboxEditorInput from "./SandBoxInput";

import { testScriptData } from "@/corelibrary/main";
import { StackState } from "@/corelibrary/stackstate";
import { trpc } from "@/utils/trpc";
import { PaymentStatus } from "@prisma/client";
import { useRouter } from "next/router";
import { dsvFormat } from "d3";

const DEFAULT_SCRIPT: UserSandboxScript = {
  id: -1,
  content: '',
  description: '',
  name: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: -1,
}

const Sandbox = () => {
  // ref
  const editorRef = useRef<any>(null);

  const router = useRouter()
  const scriptId = typeof router.query.script_id === 'string' ? parseInt(router.query.script_id, 10) : -1

  const [currentScript, setCurrentScript] = useState<UserSandboxScript>(DEFAULT_SCRIPT)

  const [isUserSignedIn] = useAtom(userSignedIn)

  trpc.fetchOneScriptEvent.useQuery({ id: scriptId }, {
    refetchOnMount: false,
    enabled: isUserSignedIn && scriptId >= 0,
    onSuccess: (data: UserSandboxScript) => {
      if (data === undefined || data.id === currentScript.id) {
        return
      }

      setCurrentScript(data)
      setEditorValue(data.content)
    },
  })

  // if we lose the script id for any reason, clear everything
  useEffect(() => {
    if (scriptId >= 0) {
      return;
    }

    setCurrentScript(DEFAULT_SCRIPT)
    handleUserInput('')
  }, [scriptId])

  const [scriptWiz, setScriptWiz] = useState<ScriptWiz>();
  const [payment, setPayment] = useAtom(paymentAtom);
  const [isMenuOpen, setMenuOpen] = useAtom(menuOpen);

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [totalSteps, setTotalSteps] = useState(0);

  // TODO: maybe use the controlled value here and feed it into SandBoxInput
  const [vm, setVm] = useState<VM>({
    network: VM_NETWORK.BTC,
    ver: VM_NETWORK_VERSION.SEGWIT,
  });

  const [editorValue, setEditorValue] = useState<string>('')

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

  const handleUserInput = (value: string) => {
    setEditorValue(value)
    const res = testScriptData(value);

    // check if res is an array
    if (typeof res === "object" && res !== null && !Array.isArray(res)) {
      console.log("error", res.error);
      console.log("errorIndex", res.errorIndex);

      // set error script
      setScriptResError(res);
    } else {
      setScriptRes(res);
      setTotalSteps(res.length);
      setIsPlaying(true);

      //handleTempStart(currentStep);
      // call handleTempStart

      // if (totalSteps > 0) {
      //   if (currentStep <= totalSteps) {
    }
  }

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

  const handleScriptUpdated = (updatedScript: UserSandboxScript) => {
    setCurrentScript(updatedScript)
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
        <div className="flex min-h-[88vh] w-11/12 flex-row ">
          <SandboxEditorInput
            editorValue={editorValue}
            currentScript={currentScript}
            handleUserInput={handleUserInput}
            scriptWiz={scriptWiz}
            isPlaying={isPlaying}
            currentStep={currentStep}
            totalSteps={totalSteps}
            onUpdateScript={handleScriptUpdated}
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
