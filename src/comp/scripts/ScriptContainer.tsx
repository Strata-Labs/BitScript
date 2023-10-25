import React from "react";
import ImageScriptComponent from "./ImageScriptComponent";
import Link from "next/link";

interface ScriptContainerProps {
  longHand: string;
  shortHand: string;
  shortDescription: string;

  introduction: string;
  inUse: string;
  numberOfOPs: string;
  linkPath: string;
}

// trigger redeployment

const ScriptContainer: React.FC<ScriptContainerProps> = ({
  longHand,
  shortHand,
  shortDescription,
  introduction,
  inUse,
  numberOfOPs,
  linkPath,
}) => {
  return (
    <Link href={linkPath} target="_blank">
      <div className="flex w-screen justify-center md:w-full">
        {/* General white background container */}
        <div className="group mx-[80px]  mb-5 flex h-[345px] w-full flex-col justify-between rounded-xl bg-white from-[#100F20] to-[#321B3A] p-4 px-5 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:bg-gradient-to-b md:h-[345px] md:w-[274px]">
          <div className="flex flex-col items-center">
            {/* Title */}
            <p className="text-center text-[26px] text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
              {shortHand}
            </p>
            <p className="text-center font-extralight text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
              {longHand}
            </p>
            {/* The Container and the image */}
            <div className="flex w-full justify-center">
              <ImageScriptComponent />
            </div>
            {/* Summary */}
            <p className="mt-4 hidden text-[14px] font-extralight text-[#68757E]">
              Summary
            </p>
            <p className="mt-3 text-center text-[14px] font-light text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white md:mt-5">
              {shortDescription}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ScriptContainer;
