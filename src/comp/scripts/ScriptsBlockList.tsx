import React from "react";
import ImageScriptComponent from "./ImageScriptComponent";
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
        <div className="group mx-9 mb-5 flex h-[226px] w-[353px] flex-col justify-between rounded-lg bg-white from-[#100F20] to-[#321B3A] p-4 px-5 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:bg-gradient-to-b">
          <div>
            <p className="text-[14px] font-extralight text-[#68757E] ">
              {scriptNameTitle}
            </p>
            <p className="text-[16px] text-[#111827]  transition-all duration-500 ease-in-out group-hover:text-white">
              {scriptShortName}{" "}
              <span className="text-[16px] font-extralight">
                {scriptCompleteName}
              </span>
            </p>
            <p className="mt-4 text-[14px] font-extralight text-[#68757E] ">
              Summary
            </p>
            <p className="mt-1 text-[14px] font-light text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
              {summary}
            </p>
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <p className="text-[14px] font-extralight text-[#68757E]">
                Introduced
              </p>
              <p className="mt-1 text-[14px] font-extralight text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
                {introduced}
              </p>
            </div>
            <div>
              <p className="text-[14px] font-extralight text-[#68757E]">
                In Use?
              </p>
              <p className="mt-1 text-[14px] font-extralight text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
                {inUse}
              </p>
            </div>
            <div>
              <p className="text-[14px] font-extralight text-[#68757E]">
                # of OPs
              </p>
              <p className="mt-1 text-[14px] font-extralight text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
                {numberOfOPs}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ScriptBlockListContainer;
