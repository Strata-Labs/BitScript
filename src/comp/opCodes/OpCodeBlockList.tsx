import React from "react";
import Link from "next/link";

// Information contained in the blocks, we can change this for each block we use
interface OpCodeContainerProps {
  usedIn: string;
  description: string;
  timesUsed: string;
  example: string;
  linkPath: string;
}

// Block only viewed in small screens
const OpCodeBlockList: React.FC<OpCodeContainerProps> = ({
  usedIn,
  description,
  timesUsed,
  example,
  linkPath,
}) => {
  return (
    <Link href={linkPath}>
      <div className="mt-5 flex w-full justify-center">
        {/* General white background container */}
        <div className="group mx-12 flex h-[226px] w-full flex-col justify-between rounded-lg bg-white from-[#100F20] to-[#321B3A] px-5 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:bg-gradient-to-b md:h-[343px] md:w-[274px] md:rounded-xl">
          {/* Information */}
          <div className="">
            <div>
              <p className="mt-4 text-[14px] font-extralight text-[#68757E] md:hidden">
                Used In
              </p>
              <p className="mt-1 text-[14px] font-light text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white md:mt-5 md:text-center">
                {usedIn}
              </p>
              <div>
                <p className="text-[14px] font-extralight text-[#68757E]">
                  Description
                </p>
                <p className="mt-1 text-[14px] font-extralight text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
                  {description}
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-between md:hidden">
              <div>
                <p className="text-[14px] font-extralight text-[#68757E]">
                  Times Used
                </p>
                <p className="mt-1 text-[14px] font-extralight text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
                  {timesUsed}
                </p>
              </div>
              <div className="mr-10">
                <p className="text-[14px] font-extralight text-[#68757E]">
                  Example
                </p>
                <p className="mt-1 text-[14px] font-extralight text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
                  {example}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OpCodeBlockList;
