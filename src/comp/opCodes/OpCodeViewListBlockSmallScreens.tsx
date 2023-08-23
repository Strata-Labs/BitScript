import React from "react";
import Link from "next/link";

// Information contained in the blocks, we can change this for each block we use
interface ScriptContainerProps {
  OP_Code: string;
  description: string;
  input: number;
  output: number;
  category: string;
  type: string;
  linkPath: string;
  image: string;
}

// Block only viewed in small screens
const OpCodesViewListSmallScreens: React.FC<ScriptContainerProps> = ({
  OP_Code,
  description,
  input,
  output,
  category,
  type,
  linkPath,
  image,
}) => {
  return (
    <Link href={linkPath}>
      <div className="mt-5 flex w-full justify-center">
        {/* General white background container */}
        <div className="group mx-9 flex h-[290px] w-full flex-col justify-between rounded-lg bg-white from-[#100F20] to-[#321B3A] px-5 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:bg-gradient-to-b md:h-[343px] md:w-[274px] md:rounded-xl">
          {/* Information */}
          <div className="">
            <div>
              <p className="mt-4 text-[14px] font-extralight text-[#68757E] md:hidden">
                OP_Code
              </p>
              <p className="text-[14px] font-light text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white md:mt-5 md:text-center">
                {OP_Code}
              </p>
              <div>
                <p className="mt-4 text-[14px] font-extralight text-[#68757E]">
                  Description
                </p>
                <p className="mt-1 text-[14px] font-extralight text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
                  {description}
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-start md:hidden">
              <div>
                <p className="text-[14px] font-extralight text-[#68757E]">
                  Input
                </p>
                <p className="mt-1 text-[14px] font-extralight text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
                  {input}
                </p>
              </div>
              <div className="ml-[150px]">
                <p className="text-[14px] font-extralight text-[#68757E]">
                  Output
                </p>
                <p className="mt-1 text-[14px] font-extralight text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
                  {output}
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-start md:hidden">
              <div>
                <p className="text-[14px] font-extralight text-[#68757E]">
                  Category
                </p>
                <p className="mt-1 text-[14px] font-extralight text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
                  {category}
                </p>
              </div>
              <div className="ml-[125px]">
                <p className="text-[14px] font-extralight text-[#68757E]">
                  Type
                </p>
                <p className="mt-1 text-[14px] font-extralight text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
                  {type}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OpCodesViewListSmallScreens;
