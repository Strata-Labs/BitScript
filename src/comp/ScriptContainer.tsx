import React from 'react';
import { Link } from 'react-router-dom';
import BitcoinScriptComponent from './BitcoinScriptComponent';

interface ScriptContainerProps {
  scriptName: string;
  scriptCompleteName: string;
  scriptDescription: string;
  summary: string;
  introduction: string;
  inUse: string;
  numberOfOPs: string;
}

const ScriptContainer: React.FC<ScriptContainerProps> = ({
  scriptName,
  scriptCompleteName,
  scriptDescription,
  summary,
  introduction,
  inUse,
  numberOfOPs,
}) => {
  return (
    <a href="">
    <div className="flex justify-center">
      <div className="bg-white h-[226px] mx-9 px-5 w-[353px] p-4 rounded-lg md:rounded-xl md:w-[274px] md:h-[343px] flex flex-col justify-between group hover:bg-gradient-to-b from-[#100F20] to-[#321B3A]">
        <div>
          <p className="text-[#68757E] font-extralight text-[14px] md:hidden">{scriptName}</p>
          <p className="text-[#111827] text-[16px] md:text-center md:text-[26px] md:group-hover:text-white">
            {scriptDescription} <span className="font-extralight text-[16px] md:hidden">{scriptCompleteName}</span>
          </p>
          <p className="hidden md:block text-[#111827] text-center font-extralight md:group-hover:text-white">{scriptCompleteName}</p>
          <div className="hidden md:flex justify-center">
            <BitcoinScriptComponent />
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
            <p className="text-[#111827] font-extralight text-[14px] mt-1">{inUse}</p>
          </div>
          <div>
            <p className="text-[#68757E] font-extralight text-[14px]"># of OPs</p>
            <p className="text-[#111827] font-extralight text-[14px] mt-1">{numberOfOPs}</p>
          </div>
        </div>
      </div>
    </div>
    </a>
  );
};

export default ScriptContainer;
