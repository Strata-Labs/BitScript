import React from 'react';
import Link from 'next/link';
import BitcoinOpCodeComponent from './BitcoinOpCodeComponent';

interface OpCodeContainerProps {
  opCodeDescription: string;
  summary: string;
  category: string;
  type: string;
  linkPath: string;
}

const OpCodeContainer: React.FC<OpCodeContainerProps> = ({
  opCodeDescription,
  summary,
  category,
  type,
  linkPath,
}) => {
  return (
    <Link href={linkPath}>
    <div className="flex justify-center">
      <div className="bg-white h-[345px] mx-9 px-5 w-[353px] p-4 rounded-lg md:rounded-xl md:w-[274px] md:h-[345px] flex flex-col justify-between group hover:bg-gradient-to-b from-[#100F20] to-[#321B3A]">
        <div className='flex flex-col items-center'>
          <p className="text-[#111827] text-[26px] font-medium group-hover:text-white">
            {opCodeDescription} 
          </p>
          <div className="flex justify-center">
            <BitcoinOpCodeComponent />
          </div>
          <p className="text-[#111827] font-light text-[14px] mt-1 md:text-center md:mt-5 group-hover:text-white">{summary}</p>
        </div>
        <div className="flex justify-between mt-4 md:hidden">
        </div>
        <div className='flex items-center justify-between md:mx-0 mx-8'>
          <div className="w-[112px] h-[27px] bg-[#F4F4F4] flex items-center justify-center rounded-full  group-hover:bg-[#3E314A]">
            <p className='text-[#6C5E70] group-hover:text-[#FFFFFF] text-[12px] font-extralight'>{category}</p>
          </div>
          <div className="w-[112px] h-[27px] bg-[#F4F4F4] flex items-center justify-center rounded-full  group-hover:bg-[#3E314A]">
            <p className='text-[#6C5E70] group-hover:text-[#FFFFFF] text-[12px] font-extralight'>{type}</p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default OpCodeContainer;
