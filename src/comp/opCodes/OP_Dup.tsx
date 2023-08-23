import React from "react";
import Link from "next/link";
import OpCodeVideoContainer from "./OpCodeVideoContainer";
import OpCodesUsageList from "./OpCodesUsageList";
import OpCodeBlockList from "./OpCodeBlockList";
import { EXECUTION_STEPS } from "../../OPS_ANIMATION_LIB";
import { useRouter } from "next/router";

export type OP_CODE_PAGE_PROPS = {
  [key: string]: any; // TODO: Fix this
  name: string;
  langId: string;
  input: number;
  output: number;
  info: string;
  category: string;
  linkPath: string;
  type: string;
  visualProps: STACK_VISUAL_PROPS;
  opImage: string;
  alternative: string;
};

export type STACK_VISUAL_PROPS = {
  stackSteps: EXECUTION_STEPS[];
  failureSteps: EXECUTION_STEPS[];
  title: string;
  description: string;
  steps: string[];
};

const OpDup = ({
  name,
  langId,
  input,
  output,
  info,
  visualProps,
  image,
}: OP_CODE_PAGE_PROPS) => {
  const router = useRouter();
  return (
    <div className="h-screen w-screen overflow-auto">
      <div className="ml-10 mt-[30px] flex flex-col justify-between md:ml-0 md:mt-5 md:w-screen md:min-w-[1440px] md:flex-row">
        <div className="flex flex-col justify-start md:ml-[260px] md:flex-row">
          {/* Left pointing icon that returns to /opCodes page */}
          <a className="cursor-pointer" onClick={() => router.back()}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              rotate="180deg"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-[17px] md:mt-[7px]"
            >
              <g transform="rotate(180 12 12)">
                <path
                  d="M8.99978 19.7498C8.80778 19.7498 8.61575 19.6768 8.46975 19.5298C8.17675 19.2368 8.17675 18.7618 8.46975 18.4688L14.9397 11.9988L8.46975 5.52883C8.17675 5.23583 8.17675 4.7608 8.46975 4.4678C8.76275 4.1748 9.23779 4.1748 9.53079 4.4678L16.5308 11.4678C16.8238 11.7608 16.8238 12.2358 16.5308 12.5288L9.53079 19.5288C9.38379 19.6768 9.19178 19.7498 8.99978 19.7498Z"
                  fill="#F79327"
                />
              </g>
            </svg>
          </a>
          {/* Title and Description */}
          <div className="flex">
            <p className="ml-2 mt-[17px] text-[20px] font-semibold text-[#0C071D] md:ml-4 md:mt-0 md:text-[28px]">
              {name}
            </p>
            <p className="ml-[8px] mt-[22px] text-[12px] font-extralight text-[#687588] md:mt-2 md:text-[18px]">
              {langId}
            </p>
          </div>
        </div>
        {/* Top Right Input and Output */}
        <div className="ml-2 mr-6 mt-3 flex items-center md:justify-end">
          <p className="text-sm text-black">Input</p>
          <Link
            href={""}
            className="md:text-md ml-2 text-sm text-[#F79327] underline  md:mt-0"
          >
            {`${input} items`}
          </Link>
          <p className="ml-3 mr-4 text-gray-300">|</p>
          <p className="text-sm text-black">Output</p>
          <Link
            href={""}
            className="md:text-md ml-2 text-sm text-[#F79327] underline md:mt-0"
          >
            {`${output} items`}
          </Link>
        </div>
      </div>

      {/* Summary of Op Dup */}
      <div className="ml-12 mr-12 mt-7 flex flex-col items-start md:ml-[265px] md:mr-[200px] md:min-w-[1030px]">
        <p className="text-[16px] font-extralight text-[#6C5E70] ">{info}</p>
      </div>
      {/* Bottom part of Op_Dup */}
      <div>
        <OpCodeVideoContainer {...visualProps} />
      </div>
      {/* Usage List Hidden on Small screens */}
      <div className="hidden items-center justify-center md:flex md:justify-start">
        <OpCodesUsageList />
      </div>
      {/* Usage blocks hidden on medium screens */}
      <div className="mb-7 flex flex-col justify-center md:hidden">
        <OpCodeBlockList
          usedIn={"P2PKH (pay to public key hash)"}
          description={
            "The most basic script for a direct transfer. Rarely used, but a good starting point."
          }
          timesUsed={"0x38ADD1aD..."}
          example={"14"}
          linkPath={"/scripts/P2PKH"}
        />
      </div>
    </div>
  );
};

export default OpDup;
