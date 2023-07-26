import React from "react";
import ImageScriptComponent from "./ImageScriptComponent";
import Link from "next/link";

interface ScriptContainerProps {
  scriptName: string;
  scriptCompleteName: string;
  scriptDescription: string;
  summary: string;
  introduction: string;
  inUse: string;
  numberOfOPs: string;
  linkPath: string;
}

const ScriptContainer: React.FC<ScriptContainerProps> = ({
  scriptCompleteName,
  scriptDescription,
  summary,
  linkPath,
}) => {
  return (
    <Link href={linkPath}>
      <div className="flex justify-center">
        <div className="group mx-20  mb-5 flex h-[321px] w-screen flex-col justify-between rounded-xl bg-white from-[#100F20] to-[#321B3A] p-4 px-5 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:bg-gradient-to-b md:h-[343px] md:w-[274px]">
          <div>
            <p className="text-center text-[26px] text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
              {scriptDescription}
            </p>
            <p className="text-center font-extralight text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
              {scriptCompleteName}
            </p>
            <div className="flex w-full justify-center">
              <ImageScriptComponent />
            </div>
            <p className="mt-4 hidden text-[14px] font-extralight text-[#68757E]">
              Summary
            </p>
            <p className="mt-3 text-center text-[14px] font-light text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white md:mt-5">
              {summary}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ScriptContainer;
