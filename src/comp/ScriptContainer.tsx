import React from 'react';

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
      <div className="bg-white h-[226px] mx-9 px-5 w-[353px] p-4 rounded-lg">
        <div>
          <p className="text-[#68757E] font-extralight text-[14px]">{scriptName}</p>
          <p className="text-[#111827] text-[16px]">
            {scriptDescription} <span className="font-extralight text-[16px]">(pay to public key)</span>
          </p>
          <p className="text-[#68757E] font-extralight mt-4 text-[14px]">Summary</p>
          <p className="text-[#111827] font-light text-[14px] mt-1">{summary}</p>
          <p className="text-[#111827] font-light text-[14px]">Rarely used, but a good starting point.</p>
        </div>
        <div className="flex justify-between mt-4">
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
