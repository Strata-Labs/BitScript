import React, { useEffect, useRef, useState } from "react";
import ScriptContainer from "../scripts/ScriptContainer";
import OpCodeContainer from "../opCodes/OpCodeContainer";
import { useAtom, useAtomValue } from "jotai";
import { menuOpen, popUpOpen } from "../atom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import PopUpMenu from "./PopUp";
import { OP_CODES } from "@/utils/OPS";
import { OpCodesViewListProps } from "../opCodes/OpCodesViewList";
import { SCRIPTS_LIST } from "@/utils/SCRIPTS";
import { ScriptsViewListProps } from "../scripts/ScriptViewList";

const ScriptsMenu = ({ SCRIPTS_LIST }: ScriptsViewListProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isMediumOrLarger, setIsMediumOrLarger] = useState<boolean>(false);
  const ScriptList = SCRIPTS_LIST;

  useEffect(() => {
    // Check if the screen size is medium or larger
    const handleResize = () => {
      setIsMediumOrLarger(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  // Function to handle clicking the "R" button
  const handleRightButtonClick = () => {
    setActiveTab((prevTab) => {
      if (prevTab === SCRIPTS_LIST.length - 1) {
        return prevTab;
      }
      return prevTab + 1;
    });
  };

  // Function to handle clicking the "L" button
  const handleLeftButtonClick = () => {
    setActiveTab((prevTab) => {
      if (prevTab === 0) {
        console.log("L button is disabled!");
        return prevTab;
      }
      const newTab = prevTab - 1;
      console.log("L button clicked. New activeTab:", newTab);
      return newTab;
    });
  };

  return (
    <div className="">
      {/* Whole Script Menu for Mobile Scripts */}
      <div className="flex flex-col items-center justify-center md:hidden">
        {/* Buttons and ScriptCotainer */}
        <div className="flex w-full flex-row items-center justify-between">
          {/* Left Button */}
          <button
            onClick={handleLeftButtonClick}
            className={`relative ml-5 h-10 w-10 rounded-full ${
              activeTab === 0 ? "bg-[#F4F4F4]" : "bg-[#F79327]"
            }`}
            disabled={activeTab === 0}
          >
            L
          </button>
          <div className="-mx-[60px] min-w-[400px]">
            {/* Render ScriptContainers based on activeTab and screen size */}
            {SCRIPTS_LIST.map((script, index) => (
              <div
                key={index}
                style={{
                  display:
                    activeTab === index &&
                    (isMediumOrLarger || activeTab === index)
                      ? "block"
                      : "none",
                }}
              >
                <ScriptContainer
                  scriptName={script.name}
                  scriptCompleteName={script.completeName}
                  scriptDescription={script.scriptDescription}
                  summary={script.shortSummary}
                  introduction={script.introduction}
                  inUse={script.inUse}
                  numberOfOPs={script.numberOfOps}
                  linkPath={script.linkPath}
                />
              </div>
            ))}
          </div>
          {/* Right Button */}
          <button
            onClick={handleRightButtonClick}
            className={`relative mr-5 h-10 w-10 rounded-full ${
              activeTab === SCRIPTS_LIST.length - 1
                ? "bg-[#F4F4F4]"
                : "bg-[#F79327]"
            }`}
            disabled={activeTab === SCRIPTS_LIST.length - 1}
          >
            R
          </button>
        </div>
        {/* Small dots for animation */}
        <div></div>
      </div>
      <div className="-ml-10 hidden md:block md:overflow-auto">
        {/* Render all Scripts in a single row */}
        <div className="flex justify-start">
          {SCRIPTS_LIST.map((script, index) => (
            <div key={index} className=" -mr-[130px]">
              <ScriptContainer
                scriptName={script.name}
                scriptCompleteName={script.completeName}
                scriptDescription={script.scriptDescription}
                summary={script.shortSummary}
                introduction={script.introduction}
                inUse={script.inUse}
                numberOfOPs={script.numberOfOps}
                linkPath={script.linkPath}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OpCodesMenu = ({ OP_CODES }: OpCodesViewListProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isMediumOrLarger, setIsMediumOrLarger] = useState<boolean>(false);
  const OpCodeList = OP_CODES;

  useEffect(() => {
    // Check if the screen size is medium or larger
    const handleResize = () => {
      setIsMediumOrLarger(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  // Function to handle clicking the "R" button
  const handleRightButtonClick = () => {
    setActiveTab((prevTab) => {
      if (prevTab === OP_CODES.length - 1) {
        return prevTab;
      }
      return prevTab + 1;
    });
  };

  // Function to handle clicking the "L" button
  const handleLeftButtonClick = () => {
    setActiveTab((prevTab) => {
      if (prevTab === 0) {
        console.log("L button is disabled!");
        return prevTab;
      }
      const newTab = prevTab - 1;
      console.log("L button clicked. New activeTab:", newTab);
      return newTab;
    });
  };

  return (
    <div className="">
      {/* Whole Script Menu for Mobile Scripts */}
      <div className="flex flex-col items-center justify-center md:hidden">
        {/* Buttons and ScriptCotainer */}
        <div className="flex w-full flex-row items-center justify-between">
          {/* Left Button */}
          <button
            onClick={handleLeftButtonClick}
            className={`relative ml-5 h-10 w-10 rounded-full ${
              activeTab === 0 ? "bg-[#F4F4F4]" : "bg-[#F79327]"
            }`}
            disabled={activeTab === 0}
          >
            L
          </button>
          <div className="-mx-[60px] min-w-[400px]">
            {/* Render ScriptContainers based on activeTab and screen size */}
            {OP_CODES.map((opCode, index) => (
              <div
                key={index}
                style={{
                  display:
                    activeTab === index &&
                    (isMediumOrLarger || activeTab === index)
                      ? "block"
                      : "none",
                }}
              >
                <OpCodeContainer
                  opCodeDescription={opCode.name}
                  summary={opCode.visualProps.description}
                  category={opCode.category}
                  type={opCode.type}
                  linkPath={opCode.linkPath}
                  imageTile={opCode.tileImage}
                />
              </div>
            ))}
          </div>
          {/* Right Button */}
          <button
            onClick={handleRightButtonClick}
            className={`relative mr-5 h-10 w-10 rounded-full ${
              activeTab === OP_CODES.length - 1
                ? "bg-[#F4F4F4]"
                : "bg-[#F79327]"
            }`}
            disabled={activeTab === OP_CODES.length - 1}
          >
            R
          </button>
        </div>
        {/* Small dots for animation */}
        <div></div>
      </div>
      <div className="-ml-10 hidden md:block md:overflow-auto">
        {/* Render all OpCode in a single row */}
        <div className="flex justify-start">
          {OP_CODES.map((opCode, index) => (
            <div key={index} className=" -mr-[130px]">
              <OpCodeContainer
                opCodeDescription={opCode.name}
                summary={opCode.visualProps.description}
                category={opCode.category}
                type={opCode.type}
                linkPath={opCode.linkPath}
                imageTile={opCode.tileImage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LandingView = () => {
  const isMenuOpen = useAtomValue(menuOpen);
  const [IsOpen, setIsOpen] = useAtom(popUpOpen);

  return (
    <div
      className={`ml-0 flex h-screen flex-col items-center overflow-auto bg-[#F8F8F8] md:ml-[270px] md:items-start ${
        isMenuOpen ? "hidden" : "block"
      }`}
    >
      {/* Popup Menu component */}
      <PopUpMenu />
      {/* Landing Page */}
      <div className="w-[100%]">
        <div className="mx-[70px] mt-[30px] flex min-h-[213px] flex-col items-center justify-center rounded-2xl bg-[#0C071D] md:ml-0 md:mr-10 md:mt-[30px] md:min-h-[114px] md:min-w-[400px] md:flex-row md:justify-between">
          <p className="gradient-text ml-5 mr-5 flex text-center text-[31px] font-semibold md:hidden">
            Learn & Write Bitcoin
          </p>
          <p className="gradient-text ml-5 mr-5 hidden text-center text-[31px] font-semibold md:flex">
            Learn & Write Bitcoin Script
          </p>
          <button
            className="flex h-[44px] w-[221px] items-center justify-center rounded-lg bg-white md:mr-5 md:mt-0"
            onClick={() => setIsOpen(true)}
          >
            <p className="text-center text-black"> Open Script Sandbox</p>
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99986 16.4583C8.15986 16.4583 8.31988 16.3975 8.44155 16.275L14.2749 10.4417C14.519 10.1975 14.519 9.80164 14.2749 9.55747L8.44155 3.72414C8.19738 3.47997 7.80152 3.47997 7.55735 3.72414C7.31319 3.96831 7.31319 4.36417 7.55735 4.60834L12.949 9.99998L7.55735 15.3916C7.31319 15.6358 7.31319 16.0317 7.55735 16.2758C7.67985 16.3975 7.83986 16.4583 7.99986 16.4583Z"
                fill="#25314C"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-10 flex w-[100%] flex-row items-center justify-center md:justify-between">
        <p className="font-semibold text-black">Op Code Deep Dives</p>
        <div className="mr-10 hidden md:flex">
          <div className="mr-2 flex h-[40px] w-[40px] rotate-180 items-center justify-center rounded-lg bg-[#F0F0F0]">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99986 16.4583C8.15986 16.4583 8.31988 16.3975 8.44155 16.275L14.2749 10.4417C14.519 10.1975 14.519 9.80164 14.2749 9.55747L8.44155 3.72414C8.19738 3.47997 7.80152 3.47997 7.55735 3.72414C7.31319 3.96831 7.31319 4.36417 7.55735 4.60834L12.949 9.99998L7.55735 15.3916C7.31319 15.6358 7.31319 16.0317 7.55735 16.2758C7.67985 16.3975 7.83986 16.4583 7.99986 16.4583Z"
                fill="#25314C"
              />
            </svg>
          </div>
          <div className="mr-2 flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-[#F0F0F0]">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99986 16.4583C8.15986 16.4583 8.31988 16.3975 8.44155 16.275L14.2749 10.4417C14.519 10.1975 14.519 9.80164 14.2749 9.55747L8.44155 3.72414C8.19738 3.47997 7.80152 3.47997 7.55735 3.72414C7.31319 3.96831 7.31319 4.36417 7.55735 4.60834L12.949 9.99998L7.55735 15.3916C7.31319 15.6358 7.31319 16.0317 7.55735 16.2758C7.67985 16.3975 7.83986 16.4583 7.99986 16.4583Z"
                fill="#25314C"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="mt-5 w-full md:-ml-10">
        <OpCodesMenu OP_CODES={OP_CODES} />
      </div>
      <div className="mt-10 flex w-[100%] flex-row items-center justify-center md:justify-between">
        <p className="font-semibold text-black">Review Common Scripts</p>
        <div className="mr-10 hidden md:flex">
          <div className="mr-2 flex h-[40px] w-[40px] rotate-180 items-center justify-center rounded-lg bg-[#F0F0F0]">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99986 16.4583C8.15986 16.4583 8.31988 16.3975 8.44155 16.275L14.2749 10.4417C14.519 10.1975 14.519 9.80164 14.2749 9.55747L8.44155 3.72414C8.19738 3.47997 7.80152 3.47997 7.55735 3.72414C7.31319 3.96831 7.31319 4.36417 7.55735 4.60834L12.949 9.99998L7.55735 15.3916C7.31319 15.6358 7.31319 16.0317 7.55735 16.2758C7.67985 16.3975 7.83986 16.4583 7.99986 16.4583Z"
                fill="#25314C"
              />
            </svg>
          </div>
          <div className="mr-2 flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-[#F0F0F0]">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99986 16.4583C8.15986 16.4583 8.31988 16.3975 8.44155 16.275L14.2749 10.4417C14.519 10.1975 14.519 9.80164 14.2749 9.55747L8.44155 3.72414C8.19738 3.47997 7.80152 3.47997 7.55735 3.72414C7.31319 3.96831 7.31319 4.36417 7.55735 4.60834L12.949 9.99998L7.55735 15.3916C7.31319 15.6358 7.31319 16.0317 7.55735 16.2758C7.67985 16.3975 7.83986 16.4583 7.99986 16.4583Z"
                fill="#25314C"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="mb-10 mt-5 w-full md:-ml-10">
        <ScriptsMenu SCRIPTS_LIST={SCRIPTS_LIST} />
      </div>
    </div>
  );
};

export default LandingView;
