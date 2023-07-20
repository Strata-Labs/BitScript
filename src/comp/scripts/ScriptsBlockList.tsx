import React from 'react';
import ImageScriptComponent from './ImageScriptComponent';
import Link from 'next/link';

interface ScriptContainerProps {
  scriptNameTitle: string;
  scriptShortName: string;
  scriptCompleteName: string;
  summary: string;
  introduced: string;
  inUse: string;
  numberOfOPs: string;
  linkPath: string;
}

const ScriptBlockListContainer: React.FC<ScriptContainerProps> = ({
  scriptNameTitle,
  scriptShortName,
  scriptCompleteName,
  summary,
  introduced,
  inUse,
  numberOfOPs,
  linkPath,
}) => {
  return (
    <Link href={linkPath}>
    <div className="flex justify-center">
      <div className="bg-white mb-5 h-[226px] mx-9 px-5 w-[353px] p-4 rounded-lg flex flex-col justify-between group hover:-translate-y-1 hover:bg-gradient-to-b from-[#100F20] to-[#321B3A] transition-all ease-in-out duration-500">
        <div>
          <p className="text-[#68757E] font-extralight text-[14px] ">{scriptNameTitle}</p>
          <p className="text-[#111827] text-[16px]  group-hover:text-white transition-all ease-in-out duration-500">
            {scriptShortName} <span className="font-extralight text-[16px]">{scriptCompleteName}</span>
          </p>
          <p className="text-[#68757E] font-extralight mt-4 text-[14px] ">Summary</p>
          <p className="text-[#111827] font-light text-[14px] mt-1 group-hover:text-white transition-all ease-in-out duration-500">{summary}</p>
        </div>
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-[#68757E] font-extralight text-[14px]">Introduced</p>
            <p className="text-[#111827] font-extralight text-[14px] mt-1 group-hover:text-white transition-all ease-in-out duration-500">{introduced}</p>
          </div>
          <div>
            <p className="text-[#68757E] font-extralight text-[14px]">In Use?</p>
            <p className="text-[#111827] font-extralight text-[14px] mt-1 group-hover:text-white transition-all ease-in-out duration-500">{inUse}</p>
          </div>
          <div>
            <p className="text-[#68757E] font-extralight text-[14px]"># of OPs</p>
            <p className="text-[#111827] font-extralight text-[14px] mt-1 group-hover:text-white transition-all ease-in-out duration-500">{numberOfOPs}</p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ScriptBlockListContainer;
