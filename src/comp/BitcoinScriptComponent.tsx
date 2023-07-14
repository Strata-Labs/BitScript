import React from 'react';

const BitcoinScriptComponent = () => {
  return (
    <div className="w-[253px] h-[123px] bg-[#F4F4F4] flex flex-col items-center justify-center mt-6 rounded-lg relative">
      <div className="absolute mt-1 -ml-40 bg-[#6C5E70] w-[30px] h-[30px] rounded-full">
        <p className="text-white text-center font-extralight mt-[2px]">A</p>
      </div>
      <div className="absolute mt-1 -mr-40 bg-[#6C5E70] w-[30px] h-[30px] rounded-full">
        <p className="text-white text-center font-extralight mt-[2px]">B</p>
      </div>
      {/* Dotted Line */}
      <div className="border-dashed border-[.3px] border-[#6C5E70] w-[130px]"></div>
      {/* Arrow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] -rotate-45 rounded-sm border-b-[5px] border-r-[5px] border-[#6C5E70]"></div>
    </div>
  );
};

export default BitcoinScriptComponent;
