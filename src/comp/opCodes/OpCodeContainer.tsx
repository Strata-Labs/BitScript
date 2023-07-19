import React from 'react';
import Link from 'next/link';
import ImageOpCodeComponent from './ImageOpCodeComponent';

// Information contained about the Op Code
interface OpCodeContainerProps {
  opCodeDescription: string;
  summary: string;
  category: string;
  type: string;
  linkPath: string;
}

// This are used for Grid view
const OpCodeContainer: React.FC<OpCodeContainerProps> = ({
  opCodeDescription,
  summary,
  category,
  type,
  linkPath,
}) => {
  return (
    <Link href={linkPath}>
    <div className="flex justify-center mb-5">
      {/* General white background container */}
      <div className="bg-white h-[345px] mx-9 px-5 w-[353px] p-4 rounded-lg md:rounded-xl md:w-[274px] md:h-[345px] flex flex-col justify-between group hover:bg-gradient-to-b from-[#100F20] to-[#321B3A]">
        <div className='flex flex-col items-center'>
          {/* Title */}
          <p className="text-[#111827] text-[26px] font-medium group-hover:text-white">
            {opCodeDescription} 
          </p>
          {/* The Container and the image */}
          <div className="flex justify-center">
            <ImageOpCodeComponent />
          </div>
          {/* Summary */}
          <p className="text-[#111827] font-light text-[14px] mt-1 md:text-center md:mt-5 group-hover:text-white">{summary}</p>
        </div>
        {/* Bottom part of the container */}
        <div className='flex items-center justify-between md:mx-0 mx-8'>
          {/* Left Rectangle circle with grayish background */}
          <div className="w-[112px] h-[27px] bg-[#F4F4F4] flex items-center justify-center rounded-full group-hover:bg-[#3E314A]">
            <p className='text-[#6C5E70] group-hover:text-[#FFFFFF] text-[12px] font-extralight'>{category}</p>
          </div>
          {/* Right Rectangle circle with grayish background */}
          <div className="w-[112px] h-[27px] bg-[#F4F4F4] flex items-center justify-center rounded-full group-hover:bg-[#3E314A]">
            <p className='text-[#6C5E70] group-hover:text-[#FFFFFF] text-[12px] font-extralight'>{type}</p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default OpCodeContainer;
