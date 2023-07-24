import React, { useState } from 'react';
import ScriptContainer from '../scripts/ScriptContainer';
import OpCodeContainer from '../opCodes/OpCodeContainer';

const ScriptsMenu = () => {
    const [activeTab, setActiveTab] = useState(0);
  
    const handleTabClick = (tabIndex: number) => {
      setActiveTab(tabIndex);
    };
  
    return (
      <div>

        {/* Render ScriptContainer based on activeTab */}
        {activeTab === 0 && (
          <ScriptContainer
          scriptName="Script Name"
          scriptCompleteName='(pay to public key)'
          scriptDescription="P2PK"
          summary="The most basic script for a direct transfer. Rarely used, but a good starting point"
          introduction="BIP133"
          inUse="Yes"
          numberOfOPs="14"
          linkPath='/p2pkh'
          />
        )}
  
        {activeTab === 1 && (
          <ScriptContainer
          scriptName="Script Name"
          scriptCompleteName='(pay to public key)'
          scriptDescription="P2PKH"
          summary="The most basic script for a direct transfer. Rarely used, but a good starting point"
          introduction="BIP133"
          inUse="Yes"
          numberOfOPs="14"
          linkPath='/p2pkh'
          />
        )}
  
        {activeTab === 2 && (
          <ScriptContainer
          scriptName="Script Name"
          scriptCompleteName='(pay to public key)'
          scriptDescription="P2PK2"
          summary="The most basic script for a direct transfer. Rarely used, but a good starting point"
          introduction="BIP133"
          inUse="Yes"
          numberOfOPs="14"
          linkPath='/p2pkh'
          />
        )}

        {activeTab === 3 && (
          <ScriptContainer
          scriptName="Script Name"
          scriptCompleteName='(pay to public key)'
          scriptDescription="P2PK3"
          summary="The most basic script for a direct transfer. Rarely used, but a good starting point"
          introduction="BIP133"
          inUse="Yes"
          numberOfOPs="14"
          linkPath='/p2pkh'
          />
        )}
        <div className='flex items-center justify-center'>
          {/* Buttons to switch between tabs */}
            <button
                onClick={() => handleTabClick(0)}
                className={`rounded-full transition-all ease-in-out duration-500 ${activeTab === 0 ? 'bg-[#F79327] w-[12px] h-[6px]' : 'bg-[#6C5E70] w-[6px] h-[6px]'}`}
            >
            </button>
            <button
                onClick={() => handleTabClick(1)}
                className={`ml-2 rounded-full transition-all ease-in-out duration-500 ${activeTab === 1 ? 'bg-[#F79327] w-[12px] h-[6px]' : 'bg-[#6C5E70] w-[6px] h-[6px]'}`}
            >
            </button>
            <button
                onClick={() => handleTabClick(2)}
                className={`ml-2 rounded-full transition-all ease-in-out duration-500 ${activeTab === 2 ? 'bg-[#F79327] w-[12px] h-[6px]' : 'bg-[#6C5E70] w-[6px] h-[6px]'}`}
            >
            </button>
            <button
                onClick={() => handleTabClick(3)}
                className={`ml-2 rounded-full transition-all ease-in-out duration-500 ${activeTab === 3 ? 'bg-[#F79327] w-[12px] h-[6px]' : 'bg-[#6C5E70] w-[6px] h-[6px]'}`}
            >
            </button>
        </div>
      </div>
    );
  };

  const OpCodesMenu = () => {
    const [activeTab, setActiveTab] = useState(0);
  
    const handleTabClick = (tabIndex: number) => {
      setActiveTab(tabIndex);
    };
  
    return (
      <div>

        {/* Render OpCodeContainer based on activeTab */}
        {activeTab === 0 && (
          <OpCodeContainer 
          opCodeDescription="OP_Dup"
          summary="Duplicates the top item in the stack"
          category="Stack"
          type="Push"
          linkPath="/OPS/OP_DUP"        />
        )}
  
        {activeTab === 1 && (
          <OpCodeContainer 
          opCodeDescription="OP_HASH160"
          summary="Hashes the top item on the stack using the SHA-256 and RIPEMD-160 algorithms."
          category="Constant"
          type="Pop & Push"
          linkPath="/OPS/OP_HASH160"         />
        )}
  
        {activeTab === 2 && (
          <OpCodeContainer 
          opCodeDescription="OP_Equal"
          summary="Returns 1 if the inputs are exactly equal, 0 otherwise."
          category="Constant"
          type="Pop & Push"
          linkPath=""         />
        )}

        {activeTab === 3 && (
          <OpCodeContainer 
          opCodeDescription="OP_Equal"
          summary="Returns 1 if the inputs are exactly equal, 0 otherwise."
          category="Constant"
          type="Pop & Push"
          linkPath=""          />
        )}

        <div className='flex items-center justify-center'>
          {/* Buttons to switch between tabs */}
            <button
                onClick={() => handleTabClick(0)}
                className={`rounded-full transition-all ease-in-out duration-500 ${activeTab === 0 ? 'bg-[#F79327] w-[12px] h-[6px]' : 'bg-[#6C5E70] w-[6px] h-[6px]'}`}
            >
            </button>
            <button
                onClick={() => handleTabClick(1)}
                className={`ml-2 rounded-full transition-all ease-in-out duration-500 ${activeTab === 1 ? 'bg-[#F79327] w-[12px] h-[6px]' : 'bg-[#6C5E70] w-[6px] h-[6px]'}`}
            >
            </button>
            <button
                onClick={() => handleTabClick(2)}
                className={`ml-2 rounded-full transition-all ease-in-out duration-500 ${activeTab === 2 ? 'bg-[#F79327] w-[12px] h-[6px]' : 'bg-[#6C5E70] w-[6px] h-[6px]'}`}
            >
            </button>
            <button
                onClick={() => handleTabClick(3)}
                className={`ml-2 rounded-full transition-all ease-in-out duration-500 ${activeTab === 3 ? 'bg-[#F79327] w-[12px] h-[6px]' : 'bg-[#6C5E70] w-[6px] h-[6px]'}`}
            >
            </button>
        </div>
      </div>
    );
  };


const LandingView = () => {
  return (
    <div className="flex flex-col bg-[#F8F8F8] h-screen items-center overflow-auto md:items-start ml-0 md:ml-[270px]">
        <div className='w-[100%]'>
            <div className="min-h-[213px] bg-[#0C071D] rounded-2xl mt-[100px] flex flex-col items-center justify-center md:mt-[30px] md:min-w-[1156px] md:min-h-[114px] md:flex-row md:justify-between mr-[75px] ml-[75px] md:ml-0 md:mr-10">
                <p className='gradient-text text-[31px] ml-5 mr-5 text-center font-semibold md:hidden flex'>Learn & Write Bitcoin</p>
                <p className='gradient-text text-[31px] ml-5 mr-5 text-center font-semibold md:flex hidden'>Learn & Write Bitcoin Script</p>
                <button className='flex w-[221px] h-[44px] bg-white rounded-lg mt-5 md:mt-0 items-center justify-center mr-5'>
                    <p className='text-black'> Open Script Sandbox</p>
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99986 16.4583C8.15986 16.4583 8.31988 16.3975 8.44155 16.275L14.2749 10.4417C14.519 10.1975 14.519 9.80164 14.2749 9.55747L8.44155 3.72414C8.19738 3.47997 7.80152 3.47997 7.55735 3.72414C7.31319 3.96831 7.31319 4.36417 7.55735 4.60834L12.949 9.99998L7.55735 15.3916C7.31319 15.6358 7.31319 16.0317 7.55735 16.2758C7.67985 16.3975 7.83986 16.4583 7.99986 16.4583Z" fill="#25314C"/>
                    </svg>
                </button>
            </div>
        </div>
      <p className='text-black mt-10 font-semibold'>Review Common Scripts</p>
      <div className='mt-5'>
        <ScriptsMenu/>
      </div>
      <p className='text-black mt-10 font-semibold'>OP Code Deep Dives</p>
      <div className='mt-5 mb-10'>
        <OpCodesMenu/>
      </div>
    </div>
  );
};

export default LandingView;
