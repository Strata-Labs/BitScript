import React from 'react';
import ScriptContainer from './ScriptContainer';
import TopSearchBar from './TopSearchBar';
import ViewButtons from './ViewButtons';

const ContentContainer: React.FC = () => {
  return (
    <div className="h-screen overflow-auto w-screen">
      <div className="w-screen flex flex-col">
      <TopSearchBar />
        <p className="text-[14px] font-extralight mt-24 md:mt-10 ml-9 md:ml-[270px] text-[#6C5E70]">Scripts</p>
        <div className='flex flex-wrap'>
          <div className='flex w-screen justify-between'>
            <div className='flex'>
          <p className="mt-6 md:mt-6 ml-9 md:ml-[270px] text-[20px] md:text-[18px] lg:text-[20px] text-[#0C071D] font-semibold ">Select A Bitcoin Script</p>
          <p className="md:mt-6 ml-1 lg:text-[20px] md:text-[18px] text-[#0C071D] font-semibold md:block hidden">Format To Explore</p>
          </div>
          <ViewButtons />
            </div>
        </div>
        <p className="ml-9 md:ml-[270px] text-[20px] text-[#0C071D] font-semibold md:hidden">Format To Explore</p>
        <div className='flex flex-col md:flex-row md:flex-wrap md:ml-[230px]'>
          <div className='mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4'>
            <ScriptContainer
              scriptName="Script Name"
              scriptDescription="P2PK"
              summary="The most basic script for a direct transfer. Rarely used, but a good starting point"
              introduction="BIP133"
              inUse="Yes"
              numberOfOPs="14"
            />
          </div>
          <div className='mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4'>
            <ScriptContainer
              scriptName="Script Name"
              scriptDescription="P2PK"
              summary="The most basic script for a direct transfer."
              introduction="BIP133"
              inUse="Yes"
              numberOfOPs="14"
            />
          </div>
          <div className='mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4'>
            <ScriptContainer
              scriptName="Script Name"
              scriptDescription="P2PK"
              summary="The most basic script for a direct transfer."
              introduction="BIP133"
              inUse="Yes"
              numberOfOPs="14"
            />
          </div>
          <div className='mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4'>
            <ScriptContainer
              scriptName="Script Name"
              scriptDescription="P2PK"
              summary="The most basic script for a direct transfer."
              introduction="BIP133"
              inUse="Yes"
              numberOfOPs="14"
            />
          </div>
          <div className='mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4'>
            <ScriptContainer
              scriptName="Script Name"
              scriptDescription="P2PK"
              summary="The most basic script for a direct transfer."
              introduction="BIP133"
              inUse="Yes"
              numberOfOPs="14"
            />
          </div>
          <div className='mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4'>
            <ScriptContainer
              scriptName="Script Name"
              scriptDescription="P2PK"
              summary="The most basic script for a direct transfer."
              introduction="BIP133"
              inUse="Yes"
              numberOfOPs="14"
            />
          </div>
          <div className='mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4'>
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
      </div>
    </div>
  );
};

export default ContentContainer;
