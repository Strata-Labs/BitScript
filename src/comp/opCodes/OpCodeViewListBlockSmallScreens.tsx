import React from 'react';
import Link from 'next/link';

// Information contained in the blocks, we can change this for each block we use
interface ScriptContainerProps {
  OP_Code: string;
  description: string;
  input: string;
  output: string;
  category: string;
  type: string;
  linkPath: string;
}

// Block only viewed in small screens 
const OpCodesViewListSmallScreens: React.FC<ScriptContainerProps> = ({
  OP_Code,
  description,
  input,
  output,
  category,
  type,
  linkPath,
}) => {
  return (
    <Link href={linkPath}>
    <div className="flex justify-center mt-5">
      {/* General white background container */}
      <div className="bg-white h-[290px] mx-9 px-5 w-[353px] rounded-lg md:rounded-xl md:w-[274px] md:h-[343px] flex flex-col justify-between group hover:-translate-y-1 hover:bg-gradient-to-b from-[#100F20] to-[#321B3A] transition-all ease-in-out duration-500">
        {/* Information */}
        <div className=''>
          <div>
            <p className="text-[#68757E] font-extralight mt-4 text-[14px] md:hidden">OP_Code</p>
            <p className="text-[#111827] font-light text-[14px] md:text-center md:mt-5 group-hover:text-white transition-all ease-in-out duration-500">{OP_Code}</p>
            <div>
              <p className="text-[#68757E] font-extralight text-[14px] mt-4">Description</p>
              <p className="text-[#111827] font-extralight text-[14px] mt-1 group-hover:text-white transition-all ease-in-out duration-500">{description}</p>
            </div>
          </div>
          <div className="flex justify-start mt-4 md:hidden">
            <div>
              <p className="text-[#68757E] font-extralight text-[14px]">Input</p>
              <p className="text-[#111827] font-extralight text-[14px] mt-1 group-hover:text-white transition-all ease-in-out duration-500">{input}</p>
            </div>
            <div className='ml-[150px]'>
              <p className="text-[#68757E] font-extralight text-[14px]">Output</p>
              <p className="text-[#111827] font-extralight text-[14px] mt-1 group-hover:text-white transition-all ease-in-out duration-500">{output}</p>
            </div>
          </div>
          <div className="flex justify-start mt-4 md:hidden">
            <div>
              <p className="text-[#68757E] font-extralight text-[14px]">Category</p>
              <p className="text-[#111827] font-extralight text-[14px] mt-1 group-hover:text-white transition-all ease-in-out duration-500">{category}</p>
            </div>
            <div className='ml-[125px]'>
              <p className="text-[#68757E] font-extralight text-[14px]">Type</p>
              <p className="text-[#111827] font-extralight text-[14px] mt-1 group-hover:text-white transition-all ease-in-out duration-500">{type}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default OpCodesViewListSmallScreens;
