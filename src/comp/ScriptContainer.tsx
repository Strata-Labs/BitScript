import React from 'react';
import BitcoinScriptComponent from './BitcoinScriptComponent';

interface ScriptContainerProps {
  scriptName: string;
  scriptDescription: string;
  summary: string;
  introduction: string;
  inUse: string;
  numberOfOPs: string;
}

const ScriptContainer: React.FC<ScriptContainerProps> = ({
  scriptName,
  scriptDescription,
  summary,
  introduction,
  inUse,
  numberOfOPs,
}) => {
  return (
    <div className="flex justify-center">
      <div className="bg-white h-[226px] mx-9 px-5 w-[353px] p-4 rounded-lg md:w-[274px] md:h-[343px] flex flex-col justify-between">
        <div>
          <p className="text-[#68757E] font-extralight text-[14px] md:hidden">{scriptName}</p>
          <p className="text-[#111827] text-[16px] md:text-center md:text-[26px]">
            {scriptDescription} <span className="font-extralight text-[16px] md:hidden">(pay to public key)</span>
          </p>
          <p className="hidden md:block text-[#111827] text-center font-extralight">(pay to public key)</p>
          <div className="hidden md:flex justify-center">
            <BitcoinScriptComponent />
          </div>
          <p className="text-[#68757E] font-extralight mt-4 text-[14px] md:hidden">Summary</p>
          <p className="text-[#111827] font-light text-[14px] mt-1 md:text-center md:mt-5">{summary}</p>
        </div>
        <div className="flex justify-between mt-4 md:hidden">
          <div>
            <p className="text-[#68757E] font-extralight text-[14px]">Introduced</p>
            <p className="text-[#111827] font-extralight text-[14px] mt-1">{introduction}</p>
          </div>
          <div>
            <p className="text-[#68757E] font-extralight text-[14px]">In Use?</p>
            <p className="text-[#111827] font-extralight text-[14px] mt-1">{inUse}</p>
          </div>
          <div>
            <p className="text-[#68757E] font-extralight text-[14px]"># of OPs</p>
            <p className="text-[#111827] font-extralight text-[14px] mt-1">{numberOfOPs}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptContainer;
