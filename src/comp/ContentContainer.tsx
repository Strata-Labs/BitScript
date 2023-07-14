import React from 'react';
import ScriptContainer from './ScriptContainer';

const ContentContainer: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <p className="text-[14px] font-extralight absolute top-0 left-0 mt-24 ml-9 text-[#6C5E70]">Scripts</p>
      <p className="mt-36 ml-9 text-[20px] text-[#0C071D] font-semibold">Select A Bitcoin Script</p>
      <p className="ml-9 text-[20px] text-[#0C071D] font-semibold">Format To Explore</p>
      <div className='mt-5'>
      <ScriptContainer
        scriptName="Script Name"
        scriptDescription="P2PK"
        summary="The most basic script for a direct transfer."
        introduction="BIP133"
        inUse="Yes"
        numberOfOPs="14"
      />
      </div>
      <div className='mt-3'>
      <ScriptContainer
        scriptName="Script Name"
        scriptDescription="P2PK"
        summary="The most basic script for a direct transfer."
        introduction="BIP133"
        inUse="Yes"
        numberOfOPs="14"
      />
      </div>
      <div className='mt-3'>
      <ScriptContainer
        scriptName="Script Name"
        scriptDescription="P2PK"
        summary="The most basic script for a direct transfer."
        introduction="BIP133"
        inUse="Yes"
        numberOfOPs="14"
      />
      </div>
    </div>
  );
};

export default ContentContainer;
