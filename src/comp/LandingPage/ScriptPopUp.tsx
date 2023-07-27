import React from "react";
import Link from "next/link";

interface ScriptContainerProps {
  scriptCompleteName: string;
  scriptName: string;
  inUse: string;
  numberOfOPs: string;
  linkPath: string;
}

const ScriptContainerPopUp: React.FC<ScriptContainerProps> = ({
  scriptCompleteName,
  scriptName,
  inUse,
  numberOfOPs,
  linkPath,
}) => {
  return (
    <Link href={linkPath}>
      <div className="flex items-center justify-center">
        <div className="group mx-[20px] mb-3 flex h-[112px] w-[100%] rounded-3xl bg-[#F4F4F4] from-[#100F20] to-[#321B3A] p-4 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:bg-gradient-to-b md:mx-[30px] md:h-[70px]">
          <div className="flex w-[100%] flex-col items-center justify-between md:flex-row">
            <div className="flex items-center">
              <p className="ml-2 text-center text-[16px] font-medium text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white md:text-[20px]">
                {scriptName}
              </p>
              <p className="ml-[8px] text-center text-[14px] font-extralight text-[#A29EB5] transition-all duration-500 ease-in-out group-hover:text-white md:text-[16px]">
                {scriptCompleteName}
              </p>
            </div>
            <div className="flex items-center">
              <div className="flex h-[30px] w-[112px] items-center justify-center rounded-full bg-white group-hover:bg-[#321B3A] md:w-[122px]">
                <p className="text-center text-[14px] font-light text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
                  {inUse}
                </p>
              </div>
              <div className="mx-3 flex h-[30px] w-[112px] items-center justify-center rounded-full bg-white group-hover:bg-[#321B3A] md:w-[122px]">
                <p className="text-center text-[14px] font-light text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
                  {numberOfOPs}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ScriptContainerPopUp;
