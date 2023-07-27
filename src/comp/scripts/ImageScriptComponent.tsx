import React from "react";

const ImageScriptComponent = () => {
  return (
    // General Container
    <div className="mt-4 flex h-[123px] w-full items-center justify-center rounded-lg bg-[#F4F4F4] transition-all duration-500 ease-in-out group-hover:bg-[#321B3A] md:h-[123px] md:w-[253px]">
      <div className="mx-5 flex w-full items-center justify-between">
        {/* A circle */}
        <div className="h-[30px] w-[35px] rounded-full bg-[#6C5E70] md:w-[40px]">
          <p className="mt-[2px] text-center font-extralight text-white">A</p>
        </div>
        {/* Dotted Line */}
        <div className="w-full">
          <div className="mt-2 flex flex-1 items-center border-t-[.3px] border-dashed border-t-[#6C5E70] transition-all duration-500 ease-in-out group-hover:border-white">
            {/* Arrow */}
            <div className="mx-auto h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-sm border-b-[5px] border-r-[5px] border-[#6C5E70] transition-all duration-500 ease-in-out group-hover:border-white md:ml-[65px]"></div>
          </div>
        </div>
        {/* B Circle */}
        <div className="h-[30px] w-[35px] rounded-full bg-[#6C5E70] md:w-[40px]">
          <p className="mt-[2px] text-center font-extralight text-white">B</p>
        </div>
      </div>
    </div>
  );
};

export default ImageScriptComponent;
