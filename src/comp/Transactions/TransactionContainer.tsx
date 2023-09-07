import React from "react";
import Link from "next/link";

interface TransactionContainerProps {
  Title: string;
  Summary: string;
  Bips: string;
  ComingSoon: string;
  linkPath: string;
}

const TransactionContainer: React.FC<TransactionContainerProps> = ({
  Title,
  Summary,
  Bips,
  ComingSoon,
  linkPath,
}) => {
  return (
    <div>
      <div className="relative flex flex-col justify-center">
        {/* Color overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-[#6C5E70] bg-opacity-95">
          <p className="text-[24px] font-extralight text-white">{ComingSoon}</p>
        </div>
        {/* General white background container */}
        <div className="group relative mx-[20px] mb-2 flex h-[240px] flex-col justify-between rounded-3xl bg-white from-[#100F20] to-[#321B3A] p-4 px-5 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:bg-gradient-to-b md:mx-[5px] md:h-[240px] md:w-[375px]">
          <div className="flex items-center justify-center">
            <img
              src="/TapRoot Button 1.png"
              alt=""
              className="h-[90px] w-[90px]"
            />
          </div>
          <div className="flex flex-col items-center">
            {/* Title */}
            <p className="text-center text-[24px] text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
              {Title}
            </p>
            <p className="text-center text-[16px] font-extralight text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
              {Summary}
            </p>
            <p className="mt-3 text-center text-[16px] font-light text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
              {Bips}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionContainer;
