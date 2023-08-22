import React from "react";
import Link from "next/link";

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

const ScriptBlockList: React.FC<ScriptContainerProps> = ({
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
      <div className="flex w-full justify-center">
        <div className="group mx-[80px] mb-5 flex h-[226px] w-full flex-col justify-between rounded-lg bg-white from-[#100F20] to-[#321B3A] p-4 px-5 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:bg-gradient-to-b">
          <div>
            <p className="text-[12px] font-extralight text-[#68757E] ">
              Script Name
            </p>
            <p className="text-[14px] text-[#111827]  transition-all duration-500 ease-in-out group-hover:text-white">
              {scriptShortName}{" "}
              <span className="text-[14px] font-extralight">
                {scriptCompleteName}
              </span>
            </p>
            <p className="mt-2 text-[14px] font-extralight text-[#68757E] ">
              Summary
            </p>
            <p className="text-[14px] font-light text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
              {summary}
            </p>
          </div>
          <div className="mt-2 flex justify-between">
            <div>
              <p className="text-[12px] font-extralight text-[#68757E]">
                Introduced
              </p>
              <p className="text-[12px] font-extralight text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
                {introduced}
              </p>
            </div>
            <div>
              <p className="text-[12px] font-extralight text-[#68757E]">
                In Use?
              </p>
              <p className="text-[12px] font-extralight text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
                {inUse}
              </p>
            </div>
            <div>
              <p className="text-[12px] font-extralight text-[#68757E]">
                # of OPs
              </p>
              <p className="text-[12px] font-extralight text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
                {numberOfOPs}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ScriptBlockList;
