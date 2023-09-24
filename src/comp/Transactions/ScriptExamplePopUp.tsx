import React from "react";
import Link from "next/link";

interface ScriptExampleProps {
  Type: string;
  Description: string;
  txId: string;
  handleClick: (thing: string) => void;
  tags: string[];
}

const ScriptExamplePopUp: React.FC<ScriptExampleProps> = ({
  Type,
  Description,

  txId,
  handleClick,
  tags,
}) => {
  return (
    <div onClick={() => handleClick(txId)} className="cursor-pointer">
      <div className="flex items-center justify-center">
        <div className="group mx-[30px] mb-3 flex h-[112px] w-[100%] rounded-3xl bg-[#F4F4F4] from-[#100F20] to-[#321B3A] p-4 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:bg-gradient-to-b md:mx-[10px] md:h-[70px] ">
          <div className="flex w-[100%] flex-col items-center justify-between md:flex-row">
            <div className="flex items-center">
              <p className="ml-2 text-center text-[16px] font-medium text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white md:text-[20px]">
                {Type}
              </p>
              <p className="ml-[8px] text-center text-[14px] font-extralight text-[#A29EB5] transition-all duration-500 ease-in-out group-hover:text-white md:text-[16px]">
                {Description}
              </p>
            </div>
            <div className="flex items-center">
              {tags.map((tag, index) => {
                return (
                  <div className="flex h-[30px] w-[70px] items-center justify-center rounded-full bg-white group-hover:bg-[#321B3A] md:w-[98px]">
                    <p className="text-center text-[10px] font-light text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white md:text-[14px]">
                      {tag}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptExamplePopUp;
