import React from 'react';
import ScriptContainer from './ScriptContainer';

const ContentContainer: React.FC = () => {
  return (
    <div className="h-screen overflow-auto w-screen">
      <div className="w-screen flex flex-col">
      <div className="hidden md:block bg-white w-screen items-center justify-between p-4 h-[90px]">
        <input
          type="text"
          placeholder="Type in a script or op_code"
          className="p-2 border border-[#F0F0F0] bg-opacity-50 bg-[#F0F0F0] rounded-full focus:outline-none w-[390px] ml-[250px]"
        />
        <div className="absolute top-0 right-0 mr-4 mt-5 bg-gray-200 rounded-lg w-[40px] h-[40px] flex justify-center items-center">
          <svg
            className="text-[#6C5E70] ml-[4px] mt-1 "
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.0002 6.87416C8.27683 6.87416 6.87516 8.27583 6.87516 9.99916C6.87516 11.7225 8.27683 13.1242 10.0002 13.1242C11.7235 13.1242 13.1252 11.7225 13.1252 9.99916C13.1252 8.27583 11.7235 6.87416 10.0002 6.87416ZM10.0002 11.8742C8.96599 11.8742 8.12516 11.0333 8.12516 9.99916C8.12516 8.96499 8.96599 8.12416 10.0002 8.12416C11.0343 8.12416 11.8752 8.96499 11.8752 9.99916C11.8752 11.0333 11.0343 11.8742 10.0002 11.8742ZM17.6735 11.6267C17.0952 11.2917 16.7352 10.6683 16.7343 9.99916C16.7335 9.33166 17.091 8.70917 17.6768 8.37001C18.106 8.12084 18.2527 7.56832 18.0043 7.13832L16.611 4.73333C16.3627 4.30416 15.8102 4.15667 15.3802 4.40417C14.7977 4.74 14.0735 4.74 13.4893 4.40084C12.9135 4.06667 12.5552 3.44583 12.5552 2.78C12.5552 2.28083 12.1485 1.875 11.6493 1.875H8.35348C7.85348 1.875 7.44767 2.28083 7.44767 2.78C7.44767 3.44583 7.08932 4.06666 6.51182 4.40249C5.92932 4.73999 5.206 4.74082 4.6235 4.40498C4.19266 4.15665 3.64101 4.305 3.39267 4.73417L1.99766 7.14167C1.74933 7.57084 1.89682 8.12248 2.33015 8.37415C2.90765 8.70832 3.26766 9.33082 3.26933 9.99832C3.271 10.6667 2.91266 11.2908 2.32766 11.63C2.11933 11.7508 1.96933 11.945 1.90766 12.1783C1.84599 12.4108 1.87767 12.6533 1.9985 12.8625L3.39099 15.2658C3.63933 15.6958 4.19183 15.845 4.6235 15.5958C5.206 15.26 5.9285 15.2608 6.50267 15.5933L6.50432 15.5942C6.50682 15.5958 6.50933 15.5975 6.51266 15.5992C7.0885 15.9333 7.44599 16.5541 7.44515 17.2208C7.44515 17.72 7.85098 18.1258 8.35015 18.1258H11.6493C12.1485 18.1258 12.5543 17.72 12.5543 17.2217C12.5543 16.555 12.9127 15.9342 13.491 15.5983C14.0727 15.2608 14.796 15.2592 15.3793 15.5958C15.8093 15.8442 16.361 15.6967 16.6102 15.2675L18.0052 12.86C18.2527 12.4292 18.1052 11.8767 17.6735 11.6267ZM15.6927 14.355C14.7843 13.9592 13.7302 14.0133 12.8618 14.5158C12.001 15.015 11.4327 15.8975 11.3227 16.8742H8.67516C8.56683 15.8975 7.99682 15.0133 7.13598 14.515C6.26932 14.0125 5.2135 13.9592 4.30767 14.355L3.24433 12.5191C4.04016 11.9333 4.52099 10.9933 4.51765 9.99334C4.51515 9 4.03516 8.06666 3.24349 7.48082L4.30767 5.64415C5.21433 6.03915 6.27017 5.98582 7.1385 5.48248C7.9985 4.98415 8.56682 4.10083 8.67682 3.125H11.3227C11.4318 4.10167 12.001 4.98416 12.8635 5.48416C13.7293 5.98666 14.7852 6.03999 15.6927 5.64499L16.7568 7.48082C15.9627 8.06582 15.4827 9.00416 15.4843 10.0025C15.4852 10.9975 15.9652 11.9325 16.7577 12.52L15.6927 14.355Z"/>
          </svg>
        </div>
      </div>

        <p className="text-[14px] font-extralight absolute top-0 left-0 mt-24 ml-9 md:ml-[270px] text-[#6C5E70]">Scripts</p>
        <div className='flex flex-wrap'>
          <p className="mt-36 md:mt-12 ml-9 md:ml-[270px] text-[20px] text-[#0C071D] font-semibold">Select A Bitcoin Script</p>
          <p className="md:mt-12 ml-1 text-[20px] text-[#0C071D] font-semibold md:block hidden">Format To Explore</p>
            <button className="bg-trasparent border border-black rounded-lg lg:w-[38px] lg:h-[38px] justify-center items-center ml-2 absolute right-0 mr-24 lg:mt-12 mt-2 hidden md:flex">
              <svg
                className="text-[#6C5E70] ml-[4px] mt-1"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="bg-trasparent border border-black rounded-lg lg:w-[38px] lg:h-[38px] justify-center items-center ml-2 absolute right-0 mr-12 lg:mt-12 mt-2 hidden md:flex">
              <svg
                className="text-[#6C5E70] ml-[4px] mt-1"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
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
        </div>
      </div>
    </div>
  );
};

export default ContentContainer;
