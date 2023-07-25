import React from 'react';
import Link from 'next/link';

interface ScriptContainerProps {
  scriptCompleteName: string;
  scriptName: string;
  inUse: string;
  numberOfOPs: string;
  linkPath: string;
}

const ScriptContainerPopUp: React.FC<ScriptContainerProps> = ({

    scriptCompleteName,
    scriptName,
    inUse,
    numberOfOPs,
    linkPath
}) => {
  return (
    <Link href={linkPath}>
    <div className="flex justify-center items-center">
      <div className="bg-[#F4F4F4] mb-3 p-4 rounded-3xl h-[112px] w-[100%] mx-[20px] md:mx-[30px] md:h-[70px] flex group hover:-translate-y-1 hover:bg-gradient-to-b from-[#100F20] to-[#321B3A] transition-all ease-in-out duration-500">
        <div className='flex md:flex-row flex-col items-center justify-between w-[100%]'>
            <div className='flex items-center'>
                <p className="text-[#111827] text-center group-hover:text-white transition-all ease-in-out duration-500 ml-2 text-[16px] md:text-[20px] font-medium">
                {scriptName}
                </p>
                <p className="text-[#A29EB5] text-center font-extralight group-hover:text-white transition-all ease-in-out duration-500 ml-[8px] text-[14px] md:text-[16px]">{scriptCompleteName}</p>
            </div>
            <div className='flex items-center'>
                <div className='w-[112px] md:w-[122px] h-[30px] bg-white rounded-full flex items-center justify-center group-hover:bg-[#321B3A]'>
                    <p className="text-[#111827] font-light text-[14px] text-center group-hover:text-white transition-all ease-in-out duration-500">{inUse}</p>
                </div>
                <div className='w-[112px] md:w-[122px] h-[30px] bg-white mx-3 rounded-full flex items-center justify-center group-hover:bg-[#321B3A]'>
                    <p className="text-[#111827] font-light text-[14px] text-center group-hover:text-white transition-all ease-in-out duration-500">{numberOfOPs}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ScriptContainerPopUp;
