import { useState, useEffect, useRef, use } from "react";

import { useAtom } from "jotai";

import {
  accountTierAtom,
  includeExperimentalOps,
  sandBoxPopUpOpen,
  SandboxTool,
  sandboxToolAtom,
} from "../atom";

import {
  menuOpen,
  paymentAtom,
  sandboxScriptsAtom,
  UserSandboxScript,
  userSignedIn,
} from "../atom";

import StackVisualizerPane from "../StackVisualizer/StackVisualizerPane";
import SandboxEditorInput from "./SandBoxInput";

import { testScriptData } from "@/corelibrary/main";
import { StackState } from "@/corelibrary/stackstate";
import { trpc } from "@/utils/trpc";
import { PaymentStatus } from "@prisma/client";
import { useRouter } from "next/router";
import { curveStep, dsvFormat } from "d3";
import ScriptInfo from "./PopUp/ScriptInfo";
import { AnimatePresence } from "framer-motion";

import { Square3Stack3DIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/utils";

const DEFAULT_SCRIPT: UserSandboxScript = {
  id: -1,
  content: "",
  description: "",
  name: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: -1,
};

const Sandbox = () => {
  // ref
  const editorRef = useRef<any>(null);
  const [editorMounted, setEditorMounted] = useState(false);

  const [scriptMountedId, setScriptMountedId] = useState(-1);

  const [includeExperimental, setIncludeExperimental] = useAtom(includeExperimentalOps);

  const router = useRouter();
  const scriptId =
    typeof router.query.script_id === "string"
      ? parseInt(router.query.script_id, 10)
      : -1;

  const [currentScript, setCurrentScript] =
    useState<UserSandboxScript>(DEFAULT_SCRIPT);

  const [isUserSignedIn] = useAtom(userSignedIn);

  const [selectedTool, setSelectedTool] = useAtom(sandboxToolAtom);

  const { refetch } = trpc.fetchOneScriptEvent.useQuery(
    { id: scriptId },
    {
      refetchOnMount: false,
      enabled: scriptId >= 0,
      onSuccess: (data: UserSandboxScript) => {
        if (data === undefined || data.id === currentScript.id) {
          return;
        }

        setCurrentScript(data);

        setEditorValue(data.content);
        //handleAddContent(data.content);
      },
    }
  );

  // if we lose the script id for any reason, clear everything
  useEffect(() => {
    if (scriptId >= 0) {
      return;
    }

    setCurrentScript(DEFAULT_SCRIPT);
    handleUserInput("");
  }, [scriptId]);

  const [isScriptInfoPopupVisible, setIsScriptInfoPopupVisible] =
    useState<boolean>(false);
  useEffect(() => {
    if (currentScript.id < 0) {
      return;
    }

    setIsScriptInfoPopupVisible(true);
  }, [currentScript.id]);

  const [payment, setPayment] = useAtom(paymentAtom);
  const [isMenuOpen, setMenuOpen] = useAtom(menuOpen);

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [totalSteps, setTotalSteps] = useState(0);

  // TODO: maybe use the controlled value here and feed it into SandBoxInput

  const [editorValue, setEditorValue] = useState<string>("");

  const [scriptRes, setScriptRes] = useState<StackState[]>([]);
  const [scriptResError, setScriptResError] = useState<{
    error: null | any;
    errorIndex: null | any;
  }>({
    error: null,
    errorIndex: null,
  });

  // if the user edits a loaded script, hide the info popup
  useEffect(() => {
    if (currentScript.id < 0) {
      return;
    }

    /*
    if (editorValue !== currentScript.content) {
      setIsScriptInfoPopupVisible(false);
    }
    */
  }, [editorValue, currentScript.id]);

  const handleUserInput = (value: string) => {
    setEditorValue(value);
    if (value === "") {
      return;
    }

    const res = testScriptData(value, includeExperimental);
    console.log("-----------------------------------")
    console.log("this is the res: ", res)
    console.log("-----------------------------------")

    // check if res is an array
    if (typeof res === "object" && res !== null && !Array.isArray(res)) {
      console.log("error", res.error);
      console.log("errorIndex", res.errorIndex);

      // set error script
      setScriptResError(res);
    } else {
      console.log("res", res);
      setScriptRes(res);
      setTotalSteps(res.length);
      setIsPlaying(true);

      //handleTempStart(currentStep);
      // call handleTempStart

      // if (totalSteps > 0) {
      //   if (currentStep <= totalSteps) {
    }
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

  if (isMenuOpen === true) {
    return null;
  }

  const handleScriptUpdated = (updatedScript: UserSandboxScript) => {
    setCurrentScript(updatedScript);
  };

  const handleToolSelect = (tool: SandboxTool) => {
    if (tool === selectedTool) {
      setSelectedTool(SandboxTool.NONE);
    } else {
      setSelectedTool(tool);
    }
  };
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

      <div className="relative mb-10 mt-10 hidden min-h-[92vh] flex-1 flex-row items-start justify-between gap-x-4 bg-primary-gray md:ml-[270px] md:flex">
        <div className="flex max-h-[88vh] w-full flex-row overflow-hidden ">
          <div className="flex w-full">
            <SandboxEditorInput
              editorValue={editorValue}
              scriptRes={scriptRes}
              currentScript={currentScript}
              handleUserInput={handleUserInput}
              isPlaying={isPlaying}
              currentStep={currentStep}
              totalSteps={totalSteps}
              onUpdateScript={handleScriptUpdated}
              setEditorMounted={setEditorMounted}
              scriptMountedId={scriptMountedId}
              setScriptMountedId={setScriptMountedId}
            />
          </div>

          <div className="h-full min-h-[92vh] w-[1px] bg-[#4d495d]" />
          <div className="flex w-full flex-col">
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
        <div className="hidden h-[88vh] w-16 flex-col  items-center justify-start gap-4 rounded-bl-2xl rounded-tl-2xl bg-white py-4 shadow-2xl md:flex">
          <div className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-xl bg-[#ededed]">
            <Square3Stack3DIcon className="h-6 w-6 text-dark-orange" />
          </div>

          <div
            onClick={() => handleToolSelect(SandboxTool.CONVERT)}
            className={classNames(
              "flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl",
              selectedTool === SandboxTool.CONVERT && "bg-[#ededed]"
            )}
          >
            <svg
              viewBox="0 0 20 20"
              fill="#F79327"
              height={"24"}
              width={"24"}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-dark-orange"
            >
              <path d="M5.8264 12.0849C5.71696 12.0849 5.60858 12.1064 5.50746 12.1483C5.40635 12.1901 5.31447 12.2515 5.23708 12.3289C5.15969 12.4063 5.09831 12.4982 5.05644 12.5993C5.01457 12.7004 4.99304 12.8088 4.99307 12.9182V14.4035C3.91894 13.1887 3.32615 11.6231 3.3264 10.0016C3.32625 9.75648 3.34092 9.51162 3.37034 9.26832C3.38383 9.15952 3.37572 9.04913 3.34647 8.94347C3.31722 8.83781 3.26741 8.73896 3.19989 8.65259C3.13237 8.56622 3.04847 8.49402 2.95299 8.44013C2.85752 8.38624 2.75234 8.35172 2.64351 8.33855C2.53467 8.32538 2.4243 8.33382 2.31872 8.36338C2.21315 8.39294 2.11445 8.44305 2.02828 8.51082C1.9421 8.5786 1.87015 8.66271 1.81655 8.75835C1.76294 8.85398 1.72873 8.95925 1.71588 9.06813C1.67814 9.37784 1.65938 9.68956 1.65973 10.0016C1.66087 11.99 2.37553 13.9121 3.67379 15.4182H2.49307C2.27205 15.4182 2.06009 15.506 1.90381 15.6623C1.74753 15.8186 1.65973 16.0305 1.65973 16.2516C1.65973 16.4726 1.74753 16.6845 1.90381 16.8408C2.06009 16.9971 2.27205 17.0849 2.49307 17.0849H5.8264C5.95673 17.0833 6.08479 17.0505 6.1999 16.9894C6.31501 16.9282 6.41385 16.8405 6.48818 16.7334C6.49789 16.7206 6.5103 16.711 6.51935 16.6975C6.5249 16.6893 6.52505 16.6794 6.53023 16.671C6.56995 16.6039 6.5997 16.5314 6.61857 16.4557C6.6309 16.4133 6.63967 16.3698 6.64476 16.3258C6.64715 16.3001 6.65976 16.2779 6.65976 16.2516V12.9182C6.65979 12.8088 6.63826 12.7004 6.59639 12.5993C6.55452 12.4982 6.49314 12.4063 6.41574 12.3289C6.33835 12.2515 6.24647 12.1901 6.14535 12.1483C6.04423 12.1064 5.93585 12.0849 5.8264 12.0849ZM7.0764 5.00156H5.59101C6.80584 3.92748 8.37151 3.3347 9.99307 3.33489C10.238 3.3343 10.4828 3.34898 10.7259 3.37884C10.8346 3.39204 10.9448 3.3837 11.0503 3.3543C11.1557 3.3249 11.2544 3.27502 11.3406 3.2075C11.4267 3.13998 11.4988 3.05614 11.5526 2.96078C11.6064 2.86542 11.6408 2.76039 11.654 2.65171C11.6672 2.54302 11.6589 2.4328 11.6295 2.32733C11.6001 2.22187 11.5502 2.12323 11.4827 2.03704C11.4152 1.95086 11.3313 1.87881 11.236 1.82503C11.1406 1.77124 11.0356 1.73676 10.9269 1.72357C10.617 1.68618 10.3052 1.6677 9.99307 1.66822C8.00462 1.6693 6.08258 2.38392 4.5764 3.68213V2.50156C4.5764 2.28054 4.4886 2.06858 4.33232 1.9123C4.17604 1.75602 3.96408 1.66822 3.74307 1.66822C3.52205 1.66822 3.31009 1.75602 3.15381 1.9123C2.99753 2.06858 2.90973 2.28054 2.90973 2.50156V5.83489C2.91497 5.88997 2.92595 5.94435 2.94249 5.99715L2.94269 5.99817C2.96293 6.10071 3.00288 6.19835 3.06033 6.28567L3.06985 6.29975C3.12491 6.37984 3.19393 6.44937 3.2736 6.50503C3.28271 6.5117 3.28723 6.52192 3.29669 6.52827C3.3086 6.53616 3.32208 6.53866 3.33423 6.54587C3.38149 6.57431 3.43157 6.59776 3.48367 6.61587C3.55407 6.64037 3.62748 6.65518 3.70187 6.65992C3.71631 6.66068 3.72847 6.66825 3.74307 6.66825H7.0764C7.29741 6.66825 7.50938 6.58045 7.66566 6.42417C7.82194 6.26789 7.90973 6.05593 7.90973 5.83492C7.90973 5.6139 7.82194 5.40194 7.66566 5.24566C7.50938 5.08938 7.29741 5.00158 7.0764 5.00158V5.00156ZM17.0434 14.005C17.0232 13.9024 16.9833 13.8047 16.9257 13.7174L16.9163 13.7034C16.8612 13.6233 16.7922 13.5537 16.7124 13.498C16.7033 13.4914 16.6989 13.4811 16.6894 13.4748C16.6804 13.4689 16.6698 13.4687 16.6606 13.4631C16.5549 13.4043 16.4391 13.366 16.3192 13.3502C16.2928 13.3477 16.2701 13.3348 16.2431 13.3348H12.9097C12.6887 13.3348 12.4768 13.4226 12.3205 13.5789C12.1642 13.7352 12.0764 13.9472 12.0764 14.1682C12.0764 14.3892 12.1642 14.6012 12.3205 14.7574C12.4768 14.9137 12.6887 15.0015 12.9097 15.0015H14.3951C13.1803 16.0756 11.6146 16.6684 9.99307 16.6682C9.7481 16.6685 9.50334 16.6536 9.26023 16.6234C9.04073 16.5968 8.81963 16.6584 8.64557 16.7948C8.47151 16.9311 8.35875 17.1311 8.33209 17.3506C8.30544 17.5701 8.36707 17.7912 8.50343 17.9652C8.6398 18.1393 8.83972 18.252 9.05923 18.2787C9.3691 18.3161 9.68094 18.3348 9.99307 18.3348C11.9815 18.3338 13.9036 17.6192 15.4097 16.3209V17.5016C15.4097 17.7226 15.4975 17.9345 15.6538 18.0908C15.8101 18.2471 16.0221 18.3349 16.2431 18.3349C16.4641 18.3349 16.676 18.2471 16.8323 18.0908C16.9886 17.9345 17.0764 17.7226 17.0764 17.5016V14.1682C17.0712 14.1131 17.0602 14.0588 17.0436 14.006L17.0434 14.005ZM17.4931 4.58489C17.7141 4.58489 17.926 4.49709 18.0823 4.34081C18.2386 4.18453 18.3264 3.97257 18.3264 3.75156C18.3264 3.53054 18.2386 3.31858 18.0823 3.1623C17.926 3.00602 17.7141 2.91822 17.4931 2.91822H14.1597C14.1055 2.92345 14.0519 2.93426 13.9999 2.95047L13.9943 2.95159C13.8931 2.97184 13.7967 3.01131 13.7104 3.06787L13.6941 3.0789C13.6144 3.13388 13.5451 3.20268 13.4897 3.28205C13.4831 3.29105 13.473 3.29547 13.4668 3.30478C13.4608 3.31373 13.4606 3.32432 13.455 3.33342C13.3956 3.43974 13.357 3.55647 13.3414 3.6773C13.339 3.70304 13.3264 3.72521 13.3264 3.75156V7.08489C13.3264 7.3059 13.4142 7.51787 13.5705 7.67415C13.7268 7.83043 13.9387 7.91822 14.1597 7.91822C14.3807 7.91822 14.5927 7.83043 14.749 7.67415C14.9053 7.51787 14.9931 7.3059 14.9931 7.08489V5.59916C16.0671 6.81413 16.6599 8.37987 16.6597 10.0015C16.6599 10.2466 16.6452 10.4915 16.6158 10.7348C16.5894 10.9541 16.6511 11.175 16.7873 11.3489C16.9235 11.5228 17.1232 11.6356 17.3425 11.6625C17.3763 11.6664 17.4103 11.6683 17.4442 11.6682C17.6477 11.6679 17.8441 11.5932 17.9962 11.4581C18.1484 11.323 18.2459 11.137 18.2703 10.9349C18.308 10.6253 18.3267 10.3135 18.3264 10.0016C18.3253 8.01307 17.6105 6.09103 16.3122 4.58489H17.4931Z" />
            </svg>
          </div>
        </div>
        <AnimatePresence>
          {isScriptInfoPopupVisible && (
            <ScriptInfo
              setIsScriptInfoPopupVisible={setIsScriptInfoPopupVisible}
              script={currentScript}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Sandbox;
