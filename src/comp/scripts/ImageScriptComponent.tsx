import React from 'react';

const ImageScriptComponent = () => {
  return (
<div className="w-[253px] h-[123px] bg-[#F4F4F4] flex items-center justify-center mt-6 rounded-lg group-hover:bg-[#321B3A]">
  <div className='flex items-center justify-between'>
    <div className=" bg-[#6C5E70] w-[30px] h-[30px] rounded-full">
      <p className="text-white text-center font-extralight mt-[2px]">A</p>
    </div>
    <div className='flex items-center justify-center'>
      {/* Dotted Line */}
      <div className="relative border-dashed border-t-[.3px] border-t-[#6C5E70] w-[130px] md:group-hover:border-white flex items-center">
        {/* Arrow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] -rotate-45 rounded-sm border-b-[5px] border-r-[5px] border-[#6C5E70] md:group-hover:border-white flex" style={{ zIndex: 1 }}></div>
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
