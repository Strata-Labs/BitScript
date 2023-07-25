import React, { useEffect, useState } from 'react';
import ScriptContainer from '../scripts/ScriptContainer';
import OpCodeContainer from '../opCodes/OpCodeContainer';
import { useAtom, useAtomValue } from 'jotai';
import { menuOpen, popUpOpen } from '../atom';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';
import PopUpMenu from './PopUp';

const scripts = [
    {
        scriptName: "Script Name 1",
        scriptCompleteName: "(pay to public key)",
        scriptDescription: "P2PK",
        summary: "The most basic script for a direct transfer. Rarely used, but a good starting point",
        introduction: "BIP133",
        inUse: "Yes",
        numberOfOPs: "14",
        linkPath: "/p2pk",
    },
    {
        scriptName: "Script Name 2",
        scriptCompleteName: "(pay to public key hash)",
        scriptDescription: "P2PKH",
        summary: "At one point the most universal script for simple, direct transfers. Still the default for pre-SegWit.",
        introduction: "BIP133",
        inUse: "Yes",
        numberOfOPs: "14",
        linkPath: "/p2pkh",
    },
    {
        scriptName: "Script Name 3",
        scriptCompleteName: "(pay to public key hash)",
        scriptDescription: "P2PKH",
        summary: "At one point the most universal script for simple, direct transfers. Still the default for pre-SegWit.",
        introduction: "BIP133",
        inUse: "Yes",
        numberOfOPs: "14",
        linkPath: "/p2pkh",
    },
    {
        scriptName: "Script Name 4",
        scriptCompleteName: "(pay to public key hash)",
        scriptDescription: "P2PKH",
        summary: "At one point the most universal script for simple, direct transfers. Still the default for pre-SegWit.",
        introduction: "BIP133",
        inUse: "Yes",
        numberOfOPs: "14",
        linkPath: "/p2pkh",
    },
    {
        scriptName: "Script Name 5",
        scriptCompleteName: "(pay to public key hash)",
        scriptDescription: "P2PKH",
        summary: "At one point the most universal script for simple, direct transfers. Still the default for pre-SegWit.",
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
    <div className=''>
        <div className='md:hidden block'>
            {/* Render ScriptContainers based on activeTab and screen size */}
            {scripts.map((script, index) => (
                <div
                    key={index}
                    style={{ display: activeTab === index && (isMediumOrLarger || activeTab === index) ? "block" : "none" }}
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
                    className={`rounded-full transition-all ease-in-out duration-500 mx-1 ${
                        activeTab === index ? "bg-[#F79327] w-[12px] h-[6px]" : "bg-[#6C5E70] w-[6px] h-[6px]"
                    }`}
                />
                ))}
            </div>
        </div>

        <div className="md:overflow-auto hidden md:block">
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
        opCodeDescription:"OP_Dup",
        summary:"Returns 1 if the inputs are exactly equal, 0 otherwise.",
        category:"Constant",
        type:"Pop & Push",
        linkPath:"/OPS/OP_DUP",
    },
    {
        opCodeDescription:"OP_Dup",
        summary:"Returns 1 if the inputs are exactly equal, 0 otherwise.",
        category:"Constant",
        type:"Pop & Push",
        linkPath:"/OPS/OP_DUP",
    },
    {
        opCodeDescription:"OP_Dup",
        summary:"Returns 1 if the inputs are exactly equal, 0 otherwise.",
        category:"Constant",
        type:"Pop & Push",
        linkPath:"/OPS/OP_DUP",
    },
    {
        opCodeDescription:"OP_Dup",
        summary:"Returns 1 if the inputs are exactly equal, 0 otherwise.",
        category:"Constant",
        type:"Pop & Push",
        linkPath:"/OPS/OP_DUP",
    },
    {
        opCodeDescription:"OP_Dup",
        summary:"Returns 1 if the inputs are exactly equal, 0 otherwise.",
        category:"Constant",
        type:"Pop & Push",
        linkPath:"/OPS/OP_DUP",
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
        <div className='w-full'>
        <div className='md:hidden block'>
            {/* Render ScriptContainers based on activeTab and screen size */}
            {opCodes.map((script, index) => (
                <div
                    key={index}
                    style={{ display: activeTab === index && (isMediumOrLarger || activeTab === index) ? "block" : "none" }}
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
                    className={`rounded-full transition-all ease-in-out duration-500 mx-1 ${
                        activeTab === index ? "bg-[#F79327] w-[12px] h-[6px]" : "bg-[#6C5E70] w-[6px] h-[6px]"
                    }`}
                />
                ))}
            </div>
        </div>
        

        <div className="md:overflow-auto hidden md:block">
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
const isMenuOpen = useAtomValue(menuOpen)
const [IsOpen, setIsOpen] = useAtom(popUpOpen)

  return (
    <div className={`flex flex-col bg-[#F8F8F8] h-screen items-center overflow-auto md:items-start ml-0 md:ml-[270px] ${isMenuOpen ? "hidden" : "block"}`}>
        <PopUpMenu/>
        <div className='w-[100%]'>
            <div className="min-h-[213px] bg-[#0C071D] rounded-2xl mt-[30px] flex flex-col items-center justify-center md:mt-[30px] md:min-w-[400px] md:min-h-[114px] md:flex-row md:justify-between mr-[75px] ml-[75px] md:ml-0 md:mr-10">
                <p className='gradient-text text-[31px] ml-5 mr-5 text-center font-semibold md:hidden flex'>Learn & Write Bitcoin</p>
                <p className='gradient-text text-[31px] ml-5 mr-5 text-center font-semibold md:flex hidden'>Learn & Write Bitcoin Script</p>
                <button className='flex w-[221px] h-[44px] bg-white rounded-lg mt-5 md:mt-0 items-center justify-center mr-5'
                onClick={() => setIsOpen(true)}>
                    <p className='text-black'> Open Script Sandbox</p>
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99986 16.4583C8.15986 16.4583 8.31988 16.3975 8.44155 16.275L14.2749 10.4417C14.519 10.1975 14.519 9.80164 14.2749 9.55747L8.44155 3.72414C8.19738 3.47997 7.80152 3.47997 7.55735 3.72414C7.31319 3.96831 7.31319 4.36417 7.55735 4.60834L12.949 9.99998L7.55735 15.3916C7.31319 15.6358 7.31319 16.0317 7.55735 16.2758C7.67985 16.3975 7.83986 16.4583 7.99986 16.4583Z" fill="#25314C"/>
                    </svg>
                </button>
            </div>
        </div>
        <div className='flex flex-row mt-10 items-center w-[100%] justify-center md:justify-between'>
            <p className='text-black font-semibold'>Review Common Scripts</p>
            <div className='md:flex hidden mr-10'>
            <div className='w-[40px] h-[40px] rounded-lg bg-[#F0F0F0] mr-2 items-center justify-center flex rotate-180'>
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99986 16.4583C8.15986 16.4583 8.31988 16.3975 8.44155 16.275L14.2749 10.4417C14.519 10.1975 14.519 9.80164 14.2749 9.55747L8.44155 3.72414C8.19738 3.47997 7.80152 3.47997 7.55735 3.72414C7.31319 3.96831 7.31319 4.36417 7.55735 4.60834L12.949 9.99998L7.55735 15.3916C7.31319 15.6358 7.31319 16.0317 7.55735 16.2758C7.67985 16.3975 7.83986 16.4583 7.99986 16.4583Z" fill="#25314C"/>
                    </svg>
                </div>
                <div className='w-[40px] h-[40px] rounded-lg bg-[#F0F0F0] mr-2 items-center justify-center flex'>
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99986 16.4583C8.15986 16.4583 8.31988 16.3975 8.44155 16.275L14.2749 10.4417C14.519 10.1975 14.519 9.80164 14.2749 9.55747L8.44155 3.72414C8.19738 3.47997 7.80152 3.47997 7.55735 3.72414C7.31319 3.96831 7.31319 4.36417 7.55735 4.60834L12.949 9.99998L7.55735 15.3916C7.31319 15.6358 7.31319 16.0317 7.55735 16.2758C7.67985 16.3975 7.83986 16.4583 7.99986 16.4583Z" fill="#25314C"/>
                    </svg>
                </div>
            </div>
        </div>
      <div className='mt-5 md:-ml-10 w-[100%]'>
        <ScriptsMenu/>
      </div>
      <div className='flex flex-row mt-10 items-center w-[100%] justify-center md:justify-between'>
            <p className='text-black font-semibold'>Op Code Deep Dives</p>
            <div className='md:flex hidden mr-10'>
                <div className='w-[40px] h-[40px] rounded-lg bg-[#F0F0F0] mr-2 items-center justify-center flex rotate-180'>
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99986 16.4583C8.15986 16.4583 8.31988 16.3975 8.44155 16.275L14.2749 10.4417C14.519 10.1975 14.519 9.80164 14.2749 9.55747L8.44155 3.72414C8.19738 3.47997 7.80152 3.47997 7.55735 3.72414C7.31319 3.96831 7.31319 4.36417 7.55735 4.60834L12.949 9.99998L7.55735 15.3916C7.31319 15.6358 7.31319 16.0317 7.55735 16.2758C7.67985 16.3975 7.83986 16.4583 7.99986 16.4583Z" fill="#25314C"/>
                    </svg>
                </div>
                <div className='w-[40px] h-[40px] rounded-lg bg-[#F0F0F0] mr-2 items-center justify-center flex'>
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99986 16.4583C8.15986 16.4583 8.31988 16.3975 8.44155 16.275L14.2749 10.4417C14.519 10.1975 14.519 9.80164 14.2749 9.55747L8.44155 3.72414C8.19738 3.47997 7.80152 3.47997 7.55735 3.72414C7.31319 3.96831 7.31319 4.36417 7.55735 4.60834L12.949 9.99998L7.55735 15.3916C7.31319 15.6358 7.31319 16.0317 7.55735 16.2758C7.67985 16.3975 7.83986 16.4583 7.99986 16.4583Z" fill="#25314C"/>
                    </svg>
                </div>
            </div>
        </div>
      <div className='mt-5 mb-10 md:-ml-10 w-[100%]'>
        <OpCodesMenu/>
      </div>
    </div>
  );
};

export default LandingView;
