import React from 'react';
import Link from 'next/link';
import BitcoinOpCodeComponent from './BitcoinOpCodeComponent';

interface OpCodeContainerProps {
  opCodeName: string;
  opCodeCompleteName: string;
  opCodeDescription: string;
  summary: string;
  introduction: string;
  input: string;
  output: string;
  category: string;
  type: string;
  linkPath: string;
}

const OpCodeContainer: React.FC<OpCodeContainerProps> = ({
  opCodeName,
  opCodeCompleteName,
  opCodeDescription,
  summary,
  introduction,
  input,
  output,
  category,
  type,
  linkPath,
}) => {
  return (
    <Link href={linkPath}>
    <div className="flex justify-center">
      <div className="bg-white h-[226px] mx-9 px-5 w-[353px] p-4 rounded-lg md:rounded-xl md:w-[274px] md:h-[343px] flex flex-col justify-between group hover:bg-gradient-to-b from-[#100F20] to-[#321B3A]">
        <div className='flex flex-col'>
          <p className="text-[#68757E] font-extralight text-[14px] md:hidden">
            {opCodeName}
          </p>
          <p className="text-[#111827] text-[16px] md:text-center md:text-[26px] md:group-hover:text-white">
            {opCodeDescription} 
            <span className="font-extralight text-[16px] md:hidden">
              {opCodeCompleteName}
            </span>
          </p>
          <p className="hidden md:block text-[#111827] text-center font-extralight md:group-hover:text-white">
            {opCodeCompleteName}
          </p>
          <div className="hidden md:flex justify-center">
            <BitcoinOpCodeComponent />
          </div>
          <p className="text-[#68757E] font-extralight mt-4 text-[14px] md:hidden">Summary</p>
          <p className="text-[#111827] font-light text-[14px] mt-1 md:text-center md:mt-5 md:group-hover:text-white">{summary}</p>
        </div>
        <div className="flex justify-between mt-4 md:hidden">
          <div>
            <p className="text-[#68757E] font-extralight text-[14px]">Introduced</p>
            <p className="text-[#111827] font-extralight text-[14px] mt-1">{introduction}</p>
          </div>
          <div>
            <p className="text-[#68757E] font-extralight text-[14px]">In Use?</p>
            <p className="text-[#111827] font-extralight text-[14px] mt-1">{input}</p>
          </div>
          <div>
            <p className="text-[#68757E] font-extralight text-[14px]"># of OPs</p>
            <p className="text-[#111827] font-extralight text-[14px] mt-1">{output}</p>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div className="w-[112px] h-[27px] bg-[#F4F4F4] flex items-center justify-center rounded-lg  group-hover:bg-[#3E314A]">
            <p className='text-[#6C5E70] group-hover:text-[#FFFFFF] text-[12px] font-extralight'>{category}</p>
          </div>
          <div className="w-[112px] h-[27px] bg-[#F4F4F4] flex items-center justify-center rounded-lg  group-hover:bg-[#3E314A]">
            <p className='text-[#6C5E70] group-hover:text-[#FFFFFF] text-[12px] font-extralight'>{type}</p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default OpCodeContainer;
