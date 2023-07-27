import React from "react";
import Link from "next/link";
import ImageOpCodeComponent from "./ImageOpCodeComponent";

// Information contained about the Op Code
interface OpCodeContainerProps {
  opCodeDescription: string;
  summary: string;
  category: string;
  type: string;
  linkPath: string;
}

// This are used for Grid view
const OpCodeContainer: React.FC<OpCodeContainerProps> = ({
  opCodeDescription,
  summary,
  category,
  type,
  linkPath,
}) => {
  return (
    <Link href={linkPath}>
      <div className="mb-5 flex w-full justify-center">
        {/* General white background container */}
        <div className="group mx-[80px] flex h-[345px] w-full flex-col justify-between rounded-lg bg-white from-[#100F20] to-[#321B3A] p-4 px-5 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:bg-gradient-to-b md:h-[345px] md:w-[274px] md:rounded-xl">
          <div className="flex flex-col items-center">
            {/* Title */}
            <p className="text-[26px] font-medium text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
              {opCodeDescription}
            </p>
            {/* The Container and the image */}
            <div className="flex w-full justify-center">
              <ImageOpCodeComponent />
            </div>
            {/* Summary */}
            <p className="mt-6 text-center text-[14px] font-light text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white md:mt-5">
              {summary}
            </p>
          </div>
          {/* Bottom part of the container */}
          <div className="mx-8 flex items-center justify-between md:mx-0">
            {/* Left Rectangle circle with grayish background */}
            <div className="flex h-[27px] w-[112px] items-center justify-center rounded-full bg-[#F4F4F4] transition-all duration-500 ease-in-out group-hover:bg-[#3E314A] ">
              <p className="text-[12px] font-extralight text-[#6C5E70] transition-all duration-500 ease-in-out group-hover:text-[#FFFFFF]">
                {category}
              </p>
            </div>
            {/* Right Rectangle circle with grayish background */}
            <div className="flex h-[27px] w-[112px] items-center justify-center rounded-full bg-[#F4F4F4] transition-all duration-500 ease-in-out group-hover:bg-[#3E314A] ">
              <p className="text-[12px] font-extralight text-[#6C5E70] transition-all duration-500 ease-in-out group-hover:text-[#FFFFFF]">
                {type}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OpCodeContainer;
