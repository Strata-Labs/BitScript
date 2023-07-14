import React from 'react';
import ScriptContainer from './ScriptContainer';

const ContentContainer: React.FC = () => {
  return (
    <div className="h-screen overflow-auto w-screen">
      <div className="w-screen flex flex-col">
      <div className="hidden md:flex bg-white w-screen justify-between p-5 h-[90px]">
        <div className='flex justify-between w-screen'>
        <input
          type="text"
          placeholder="Type in a script or op_code"
          className="p-2 border border-[#F0F0F0] bg-opacity-50 bg-[#F0F0F0] rounded-full focus:outline-none w-[390px] ml-[250px] text-black"
        />
        <button className=''>
          <svg
            className="text-[#6C5E70] ml-[4px] mt-1 "
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.0002 6.87514C8.27683 6.87514 6.87516 8.2768 6.87516 10.0001C6.87516 11.7235 8.27683 13.1251 10.0002 13.1251C11.7235 13.1251 13.1252 11.7235 13.1252 10.0001C13.1252 8.2768 11.7235 6.87514 10.0002 6.87514ZM10.0002 11.8751C8.96599 11.8751 8.12516 11.0343 8.12516 10.0001C8.12516 8.96597 8.96599 8.12514 10.0002 8.12514C11.0343 8.12514 11.8752 8.96597 11.8752 10.0001C11.8752 11.0343 11.0343 11.8751 10.0002 11.8751ZM17.6735 11.6276C17.0952 11.2926 16.7352 10.6693 16.7343 10.0001C16.7335 9.33264 17.091 8.71015 17.6768 8.37098C18.106 8.12182 18.2527 7.56929 18.0043 7.13929L16.611 4.7343C16.3627 4.30514 15.8102 4.15765 15.3802 4.40515C14.7977 4.74098 14.0735 4.74098 13.4893 4.40181C12.9135 4.06765 12.5552 3.44681 12.5552 2.78098C12.5552 2.28181 12.1485 1.87598 11.6493 1.87598H8.35348C7.85348 1.87598 7.44767 2.28181 7.44767 2.78098C7.44767 3.44681 7.08932 4.06763 6.51182 4.40347C5.92932 4.74097 5.206 4.74179 4.6235 4.40596C4.19266 4.15763 3.64101 4.30598 3.39267 4.73514L1.99766 7.14265C1.74933 7.57182 1.89682 8.12346 2.33015 8.37513C2.90765 8.70929 3.26766 9.3318 3.26933 9.9993C3.271 10.6676 2.91266 11.2918 2.32766 11.631C2.11933 11.7518 1.96933 11.946 1.90766 12.1793C1.84599 12.4118 1.87767 12.6543 1.9985 12.8635L3.39099 15.2668C3.63933 15.6968 4.19183 15.846 4.6235 15.5968C5.206 15.261 5.9285 15.2618 6.50267 15.5943L6.50432 15.5951C6.50682 15.5968 6.50933 15.5985 6.51266 15.6001C7.0885 15.9343 7.44599 16.5551 7.44515 17.2218C7.44515 17.721 7.85098 18.1268 8.35015 18.1268H11.6493C12.1485 18.1268 12.5543 17.721 12.5543 17.2226C12.5543 16.556 12.9127 15.9351 13.491 15.5993C14.0727 15.2618 14.796 15.2601 15.3793 15.5968C15.8093 15.8451 16.361 15.6976 16.6102 15.2685L18.0052 12.861C18.2527 12.4301 18.1052 11.8776 17.6735 11.6276ZM15.6927 14.356C14.7843 13.9601 13.7302 14.0143 12.8618 14.5168C12.001 15.016 11.4327 15.8985 11.3227 16.8751H8.67516C8.56683 15.8985 7.99682 15.0143 7.13598 14.516C6.26932 14.0135 5.2135 13.9601 4.30767 14.356L3.24433 12.5201C4.04016 11.9343 4.52099 10.9943 4.51765 9.99431C4.51515 9.00098 4.03516 8.06763 3.24349 7.4818L4.30767 5.64513C5.21433 6.04013 6.27017 5.98679 7.1385 5.48346C7.9985 4.98513 8.56682 4.10181 8.67682 3.12598H11.3227C11.4318 4.10264 12.001 4.98514 12.8635 5.48514C13.7293 5.98764 14.7852 6.04097 15.6927 5.64597L16.7568 7.4818C15.9627 8.0668 15.4827 9.00514 15.4843 10.0035C15.4852 10.9985 15.9652 11.9335 16.7577 12.521L15.6927 14.356Z"/>
          </svg>
          </button>
        </div>
      </div>
        <p className="text-[14px] font-extralight top-0 left-0 mt-24 md:mt-10 ml-9 md:ml-[270px] text-[#6C5E70]">Scripts</p>
        <div className='flex flex-wrap'>
          <div className='flex w-screen justify-between'>
            <div className='flex'>
          <p className="mt-6 md:mt-6 ml-9 md:ml-[270px] text-[20px] md:text-[18px] lg:text-[20px] text-[#0C071D] font-semibold ">Select A Bitcoin Script</p>
          <p className="md:mt-6 ml-1 lg:text-[20px] md:text-[18px] text-[#0C071D] font-semibold md:block hidden">Format To Explore</p>
          </div>
          <div className='flex lg:items-end'>
            <button className="bg-trasparent border border-[#6C5E70] border-opacity-50 group hover:border-opacity-100 rounded-lg w-[24px] h-[24px] lg:w-[38px] lg:h-[38px] justify-center items-center ml-2 relative lg:mt-6 -mt-6 hidden md:flex">
              <svg
                className="text-[#6C5E70] opacity-50 group-hover:opacity-100 md:w-[14px] md:h-[14px] lg:w-[20px] lg:h-[20px]"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18.5 10.75H15.5C14.091 10.75 13.25 9.909 13.25 8.5V5.5C13.25 4.091 14.091 3.25 15.5 3.25H18.5C19.909 3.25 20.75 4.091 20.75 5.5V8.5C20.75 9.909 19.909 10.75 18.5 10.75ZM15.5 4.75C14.911 4.75 14.75 4.911 14.75 5.5V8.5C14.75 9.089 14.911 9.25 15.5 9.25H18.5C19.089 9.25 19.25 9.089 19.25 8.5V5.5C19.25 4.911 19.089 4.75 18.5 4.75H15.5ZM8.5 10.75H5.5C4.091 10.75 3.25 9.909 3.25 8.5V5.5C3.25 4.091 4.091 3.25 5.5 3.25H8.5C9.909 3.25 10.75 4.091 10.75 5.5V8.5C10.75 9.909 9.909 10.75 8.5 10.75ZM5.5 4.75C4.911 4.75 4.75 4.911 4.75 5.5V8.5C4.75 9.089 4.911 9.25 5.5 9.25H8.5C9.089 9.25 9.25 9.089 9.25 8.5V5.5C9.25 4.911 9.089 4.75 8.5 4.75H5.5ZM18.5 20.75H15.5C14.091 20.75 13.25 19.909 13.25 18.5V15.5C13.25 14.091 14.091 13.25 15.5 13.25H18.5C19.909 13.25 20.75 14.091 20.75 15.5V18.5C20.75 19.909 19.909 20.75 18.5 20.75ZM15.5 14.75C14.911 14.75 14.75 14.911 14.75 15.5V18.5C14.75 19.089 14.911 19.25 15.5 19.25H18.5C19.089 19.25 19.25 19.089 19.25 18.5V15.5C19.25 14.911 19.089 14.75 18.5 14.75H15.5ZM8.5 20.75H5.5C4.091 20.75 3.25 19.909 3.25 18.5V15.5C3.25 14.091 4.091 13.25 5.5 13.25H8.5C9.909 13.25 10.75 14.091 10.75 15.5V18.5C10.75 19.909 9.909 20.75 8.5 20.75ZM5.5 14.75C4.911 14.75 4.75 14.911 4.75 15.5V18.5C4.75 19.089 4.911 19.25 5.5 19.25H8.5C9.089 19.25 9.25 19.089 9.25 18.5V15.5C9.25 14.911 9.089 14.75 8.5 14.75H5.5Z"/>
              </svg>
            </button>
            <button className="bg-trasparent border border-[#6C5E70] border-opacity-50 group hover:border-opacity-100 rounded-lg w-[24px] h-[24px] lg:w-[38px] lg:h-[38px] justify-center items-center ml-2 relative right-0 mr-12 lg:mt-6 -mt-6 hidden md:flex">
              <svg
                className="text-[#6C5E70] opacity-50 group-hover:opacity-100 md:w-[14px] md:h-[14px] lg:w-[20px] lg:h-[20px]"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18.5 10.75H5.5C4.091 10.75 3.25 9.909 3.25 8.5V5.5C3.25 4.091 4.091 3.25 5.5 3.25H18.5C19.909 3.25 20.75 4.091 20.75 5.5V8.5C20.75 9.909 19.909 10.75 18.5 10.75ZM5.5 4.75C4.911 4.75 4.75 4.911 4.75 5.5V8.5C4.75 9.089 4.911 9.25 5.5 9.25H18.5C19.089 9.25 19.25 9.089 19.25 8.5V5.5C19.25 4.911 19.089 4.75 18.5 4.75H5.5ZM18.5 20.75H5.5C4.091 20.75 3.25 19.909 3.25 18.5V15.5C3.25 14.091 4.091 13.25 5.5 13.25H18.5C19.909 13.25 20.75 14.091 20.75 15.5V18.5C20.75 19.909 19.909 20.75 18.5 20.75ZM5.5 14.75C4.911 14.75 4.75 14.911 4.75 15.5V18.5C4.75 19.089 4.911 19.25 5.5 19.25H18.5C19.089 19.25 19.25 19.089 19.25 18.5V15.5C19.25 14.911 19.089 14.75 18.5 14.75H5.5Z"/>
              </svg>
            </button>
            </div>
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
