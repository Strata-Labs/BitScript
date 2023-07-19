import React from 'react';

const ImageScriptComponent = () => {
  return (
<div className="w-[327px] h-[123px] md:w-[253px] md:h-[123px] bg-[#F4F4F4] flex items-center justify-center mt-6 rounded-lg group-hover:bg-[#321B3A] transition-all ease-in-out duration-500">
  <div className='flex items-center justify-between'>
    <div className=" bg-[#6C5E70] w-[30px] h-[30px] rounded-full">
      <p className="text-white text-center font-extralight mt-[2px]">A</p>
    </div>
    <div className='flex'>
      {/* Dotted Line */}
      <div className="border-dashed border-t-[.3px] border-t-[#6C5E70] w-[200px] md:w-[130px] group-hover:border-white flex items-center transition-all ease-in-out duration-500 mt-2">
        {/* Arrow */}
        <div className='flex'>
        <div className="ml-[100px] md:ml-[65px] -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] -rotate-45 rounded-sm border-b-[5px] border-r-[5px] border-[#6C5E70] group-hover:border-white transition-all ease-in-out duration-500"></div>
        </div>
      </div>
    </div>
    <div className="bg-[#6C5E70] w-[30px] h-[30px] rounded-full">
      <p className="text-white text-center font-extralight mt-[2px]">B</p>
    </div>
  </div>
</div>  
  );
};

export default ImageScriptComponent;
