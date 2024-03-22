import { classNames } from "@/utils";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";

import InputSetup from "./InputSetup";
import { useState } from "react";
import Link from "next/link";
const CustomTransaction = () => {
  const [showInputModal, setShowInputModal] = useState(false);

  return (
    <div
      style={{
        //minHeight: "calc(100vh - 110px)",
        height: "100%",
        minHeight: "92vh",
        paddingLeft: "240px",
      }}
      className="min-height-[92vh] flex h-full w-full flex-col gap-4 overflow-auto"
    >
      <AnimatePresence>
        {showInputModal && (
          <InputSetup
            setShowOverlay={setShowInputModal}
            showOverlay={showInputModal}
          />
        )}
      </AnimatePresence>
      <div className="flex flex-1 flex-col gap-10 p-8">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <ChevronLeftIcon className="h-10 w-10 text-[#0C071D]  " />
            <p className=" text-[20px] font-semibold text-[#0C071D]  md:text-[32px]">
              Transaction Type
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <p className="ml-2 mt-[17px] text-[20px] font-semibold text-[#0C071D] md:ml-4 md:mt-0 md:text-[28px]">
              Wallet Settings
            </p>
            <div className="flex flex-row items-center gap-2">
              <p className=" text-[20px] font-thin text-[#0C071D] md:text-[24px]">
                <span className="font-bold"> 0</span> Inputs
              </p>
              <p className=" text-[20px] font-bold text-[#0C071D] md:text-[24px]">
                |
              </p>
              <p className=" text-[20px] font-thin text-[#0C071D] md:text-[24px]">
                <span className="font-bold">0</span> Outputs
              </p>
              <p className=" text-[20px] font-bold text-[#0C071D] md:text-[24px]">
                |
              </p>
              <p className=" text-[20px] font-thin text-[#0C071D] md:text-[24px]">
                <span className="font-bold">0.0</span> BTC
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full  flex-1 flex-col ">
          <div className="flex w-full flex-row gap-2">
            <div className="flex h-20 flex-1 flex-row items-center justify-between rounded-l-2xl bg-[#0C071D] px-8 ">
              <p className="m-0 text-[20px]  font-bold text-white  md:text-[28px]">
                Input(s)
              </p>
              <p className="m-0 text-[20px] font-thin text-white  md:text-[28px]">
                How is this funded?
              </p>
            </div>
            <div className="flex h-20 flex-1 flex-row flex-nowrap  items-center justify-between rounded-r-2xl bg-[#0C071D] px-8 ">
              <p className=" text-[20px] font-bold text-white  md:text-[28px]">
                Output(s)
              </p>
              <p className=" text-[20px] font-thin text-white  md:text-[28px]">
                Where is this going?
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-row gap-1">
            <div className="flex flex-1 flex-col items-center justify-start  px-2">
              <div className="flex flex-col gap-4">
                <div className="h-5 w-2 rounded-full bg-dark-orange" />
                <div className="h-5 w-2 rounded-full bg-dark-orange" />
                <div className="h-5 w-2 rounded-full bg-dark-orange" />
              </div>
              <button
                onClick={() => setShowInputModal(true)}
                className="flex- w-full flex-row items-center justify-center rounded-2xl border-2 border-solid border-dark-orange"
              >
                <p className="mr-5 py-6 text-[20px]  font-thin tracking-wider text-black  md:mr-10">
                  Add Input
                </p>
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-start px-2">
              <div className="flex flex-col gap-4">
                <div className="h-5 w-2 rounded-full bg-dark-orange" />
                <div className="h-5 w-2 rounded-full bg-dark-orange" />
                <div className="h-5 w-2 rounded-full bg-dark-orange" />
              </div>
              <Link
                className="w-full"
                href="/bitsim/commands/transactions/outputselection"
              >
                <button className="flex- w-full flex-row items-center justify-center rounded-2xl border-2 border-solid border-dark-orange">
                  <p className="mr-5 py-6 text-[20px]  font-thin tracking-wider text-black  md:mr-10">
                    Add Output
                  </p>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <button
          className={classNames(
            "flex h-[72px] w-full items-center justify-between rounded-full px-6 shadow-md  ",
            "cursor-pointer bg-[#cacad9]  "
          )}
        >
          <p className="mr-5 text-[20px]  font-thin tracking-wider text-white  md:mr-10">
            Generating Transaction Command...Create at least{" "}
            <span className="font-bold"> one input </span> &{" "}
            <span className="font-bold">one output</span>
          </p>
        </button>
      </div>
    </div>
  );
};

export default CustomTransaction;
