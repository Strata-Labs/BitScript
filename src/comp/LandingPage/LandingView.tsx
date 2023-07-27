import React, { useEffect, useState } from "react";
import ScriptContainer from "../scripts/ScriptContainer";
import OpCodeContainer from "../opCodes/OpCodeContainer";
import { useAtom, useAtomValue } from "jotai";
import { menuOpen, popUpOpen } from "../atom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import PopUpMenu from "./PopUp";

const scripts = [
  {
    scriptName: "Script Name 1",
    scriptCompleteName: "(pay to public key)",
    scriptDescription: "P2PK",
    summary:
      "The most basic script for a direct transfer. Rarely used, but a good starting point",
    introduction: "BIP133",
    inUse: "Yes",
    numberOfOPs: "14",
    linkPath: "/p2pk",
  },
  {
    scriptName: "Script Name 2",
    scriptCompleteName: "(pay to public key hash)",
    scriptDescription: "P2PKH",
    summary:
      "At one point the most universal script for simple, direct transfers. Still the default for pre-SegWit.",
    introduction: "BIP133",
    inUse: "Yes",
    numberOfOPs: "14",
    linkPath: "/p2pkh",
  },
  {
    scriptName: "Script Name 3",
    scriptCompleteName: "(pay to public key hash)",
    scriptDescription: "P2PKH",
    summary:
      "At one point the most universal script for simple, direct transfers. Still the default for pre-SegWit.",
    introduction: "BIP133",
    inUse: "Yes",
    numberOfOPs: "14",
    linkPath: "/p2pkh",
  },
  {
    scriptName: "Script Name 4",
    scriptCompleteName: "(pay to public key hash)",
    scriptDescription: "P2PKH",
    summary:
      "At one point the most universal script for simple, direct transfers. Still the default for pre-SegWit.",
    introduction: "BIP133",
    inUse: "Yes",
    numberOfOPs: "14",
    linkPath: "/p2pkh",
  },
  {
    scriptName: "Script Name 5",
    scriptCompleteName: "(pay to public key hash)",
    scriptDescription: "P2PKH",
    summary:
      "At one point the most universal script for simple, direct transfers. Still the default for pre-SegWit.",
    introduction: "BIP133",
    inUse: "Yes",
    numberOfOPs: "14",
    linkPath: "/p2pkh",
  },
];

const ScriptsMenu = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isMediumOrLarger, setIsMediumOrLarger] = useState<boolean>(false);

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

  return (
    <div className="">
      <div className="block md:hidden">
        {/* Render ScriptContainers based on activeTab and screen size */}
        {scripts.map((script, index) => (
          <div
            key={index}
            style={{
              display:
                activeTab === index && (isMediumOrLarger || activeTab === index)
                  ? "block"
                  : "none",
            }}
          >
            <ScriptContainer {...script} />
          </div>
        ))}

        <div className="flex items-center justify-center">
          {/* Buttons to switch between tabs */}
          {scripts.map((script, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`mx-1 rounded-full transition-all duration-500 ease-in-out ${
                activeTab === index
                  ? "h-[6px] w-[12px] bg-[#F79327]"
                  : "h-[6px] w-[6px] bg-[#6C5E70]"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="hidden md:block md:overflow-auto">
        {/* Render all ScriptContainers in a single row */}
        <div className="flex justify-start">
          {scripts.map((script, index) => (
            <div key={index} className="">
              {/* Adjust the width and other styling based on your design */}
              <ScriptContainer {...script} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const opCodes = [
  {
    opCodeDescription: "OP_Dup",
    summary: "Returns 1 if the inputs are exactly equal, 0 otherwise.",
    category: "Constant",
    type: "Pop & Push",
    linkPath: "/OPS/OP_DUP",
  },
  {
    opCodeDescription: "OP_Dup",
    summary: "Returns 1 if the inputs are exactly equal, 0 otherwise.",
    category: "Constant",
    type: "Pop & Push",
    linkPath: "/OPS/OP_DUP",
  },
  {
    opCodeDescription: "OP_Dup",
    summary: "Returns 1 if the inputs are exactly equal, 0 otherwise.",
    category: "Constant",
    type: "Pop & Push",
    linkPath: "/OPS/OP_DUP",
  },
  {
    opCodeDescription: "OP_Dup",
    summary: "Returns 1 if the inputs are exactly equal, 0 otherwise.",
    category: "Constant",
    type: "Pop & Push",
    linkPath: "/OPS/OP_DUP",
  },
  {
    opCodeDescription: "OP_Dup",
    summary: "Returns 1 if the inputs are exactly equal, 0 otherwise.",
    category: "Constant",
    type: "Pop & Push",
    linkPath: "/OPS/OP_DUP",
  },
];

const OpCodesMenu = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isMediumOrLarger, setIsMediumOrLarger] = useState<boolean>(false);

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

  return (
    <div className="w-full">
      <div className="block md:hidden">
        {/* Render ScriptContainers based on activeTab and screen size */}
        {opCodes.map((script, index) => (
          <div
            key={index}
            style={{
              display:
                activeTab === index && (isMediumOrLarger || activeTab === index)
                  ? "block"
                  : "none",
            }}
          >
            <OpCodeContainer {...script} />
          </div>
        ))}

        <div className="flex items-center justify-center">
          {/* Buttons to switch between tabs */}
          {opCodes.map((script, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`mx-1 rounded-full transition-all duration-500 ease-in-out ${
                activeTab === index
                  ? "h-[6px] w-[12px] bg-[#F79327]"
                  : "h-[6px] w-[6px] bg-[#6C5E70]"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="hidden md:block md:overflow-auto">
        {/* Render all ScriptContainers in a single row */}
        <div className="flex justify-start">
          {opCodes.map((script, index) => (
            <div key={index} className="">
              <OpCodeContainer {...script} />
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
        <div className="ml-[75px] mr-[75px] mt-[30px] flex min-h-[213px] flex-col items-center justify-center rounded-2xl bg-[#0C071D] md:ml-0 md:mr-10 md:mt-[30px] md:min-h-[114px] md:min-w-[400px] md:flex-row md:justify-between">
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
      <div className="mt-5 w-[100%] md:-ml-10">
        <ScriptsMenu />
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
      <div className="mb-10 mt-5 w-[100%] md:-ml-10">
        <OpCodesMenu />
      </div>
    </div>
  );
};

export default LandingView;
