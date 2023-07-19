import React from 'react';
import Link from 'next/link';

// Information contained in the blocks, we can change this for each block we use
interface ScriptContainerProps {
  usedIn: string;
  description: string;
  timesUsed: string;
  example: string;
  linkPath: string;
}

// Block only viewed in small screens 
const OpCodeBlockList: React.FC<ScriptContainerProps> = ({
  usedIn,
  description,
  timesUsed,
  example,
  linkPath,
}) => {
  return (
    <Link href={linkPath}>
    <div className="flex justify-center mt-5">
      {/* General white background container */}
      <div className="bg-white h-[226px] mx-9 px-5 w-[400px] rounded-lg md:rounded-xl md:w-[274px] md:h-[343px] flex flex-col justify-between group hover:-translate-y-1 hover:bg-gradient-to-b from-[#100F20] to-[#321B3A] transition-all ease-in-out duration-500">
        {/* Information */}
        <div className=''>
          <div>
            <p className="text-[#68757E] font-extralight mt-4 text-[14px] md:hidden">Used In</p>
            <p className="text-[#111827] font-light text-[14px] mt-1 md:text-center md:mt-5 group-hover:text-white transition-all ease-in-out duration-500">{usedIn}</p>
            <div>
              <p className="text-[#68757E] font-extralight text-[14px]">Description</p>
              <p className="text-[#111827] font-extralight text-[14px] mt-1 group-hover:text-white transition-all ease-in-out duration-500">{description}</p>
            </div>
          </div>
          <div className="flex justify-between mt-4 md:hidden">
            <div>
              <p className="text-[#68757E] font-extralight text-[14px]">Times Used</p>
              <p className="text-[#111827] font-extralight text-[14px] mt-1 group-hover:text-white transition-all ease-in-out duration-500">{timesUsed}</p>
            </div>
            <div>
              <p className="text-[#68757E] font-extralight text-[14px]">Example</p>
              <p className="text-[#111827] font-extralight text-[14px] mt-1 group-hover:text-white transition-all ease-in-out duration-500">{example}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default OpCodeBlockList;
