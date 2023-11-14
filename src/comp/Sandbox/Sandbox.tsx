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

const Sandbox = () => {
  const [scriptWiz, setScriptWiz] = useState<ScriptWiz>();
  const [isSandBoxPopUpOpen, setIsSandBoxPopUpOpen] = useAtom(sandBoxPopUpOpen);
  const [payment, setPayment] = useAtom(paymentAtom);
  const [isUserSignedIn] = useAtom(userSignedIn);
  const [isMenuOpen, setMenuOpen] = useAtom(menuOpen);

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

  if (scriptWiz === undefined) {
    return null;
  }
  if (isMenuOpen === true) {
    return null;
  }

  const handleUserInput = (value: string) => {
    console.log("value in handleUserInput: " + value);
    const res = testScriptData(value);
    console.log("res after initializing: " + res);
    setScriptRes(res);

    // check if res is an array
    if (typeof res === "object" && res !== null && !Array.isArray(res)) {
      console.log("error", res.error);
      console.log("errorIndex", res.errorIndex);
    } else {
      console.log("res from sandbox", res);
      res.forEach((d) => {
        d.currentStack.forEach((x) => {
          // My hunch here thinks that a general approach is figure out length of x._dataBytes then pass on to ScriptData.fromBytes as an array of bytes***
          const test = ScriptData.fromBytes(new Uint8Array([x._dataBytes[0]]));

          console.log("this is test: " + JSON.stringify(test));
          console.log(
            "this is test._dataBytes: " + JSON.stringify(test._dataBytes[0])
          );
          console.log("this is test._hex: " + JSON.stringify(test.dataHex));
          console.log("test dataBytes: " + test._dataBytes);
          console.log("test dataHex: " + test.dataHex);
          console.log("test dataNumber: " + test.dataNumber);
        });
      });
    }
  };

  return (
    <div className="flex min-h-[92vh] flex-1 flex-row items-start justify-between gap-x-4  bg-primary-gray md:ml-[270px] ">
      {isSandBoxPopUpOpen && <SandBoxPopUp />}

      <div className="flex min-h-[88vh] w-11/12 flex-row ">
        <SandboxEditorInput
          handleUserInput={handleUserInput}
          scriptWiz={scriptWiz}
        />
        <div className="h-full min-h-[92vh] w-[1px] bg-[#4d495d]" />
        <StackVisualizer />
      </div>
    </div>
  );
};

export default Sandbox;

enum SpeedSettingEnum {
  "SLOW" = "SLOW",
  "NORMAL" = "NORMAL",
  "FAST" = "FAST",
}

type SpeedSettingType = {
  title: string;
};
type SpeedSettingDataType = {
  [key in SpeedSettingEnum]: SpeedSettingType;
};
const SpeedSettingData: SpeedSettingDataType = {
  [SpeedSettingEnum.FAST]: {
    title: "Fast",
  },
  [SpeedSettingEnum.NORMAL]: {
    title: "Normal",
  },
  [SpeedSettingEnum.SLOW]: {
    title: "Slow",
  },
};

const StackVisualizer = () => {
  const [selectedSpeedSetting, setSelectedSpeed] = useState<SpeedSettingEnum>(
    SpeedSettingEnum.NORMAL
  );
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
    </div>
  );
};
