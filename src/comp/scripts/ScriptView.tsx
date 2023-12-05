import React, { use, useEffect } from "react";
import Link from "next/link";
import BottomVideoContainer, { CodeBlockType } from "./ScriptVideoContainer";

import { useRouter } from "next/router";
import { SCRIPT_DATA_STACK } from "../../SCRIPT_ANIMATION_LIB";
import { usePlausible } from "next-plausible";
import { trpc } from "@/utils/trpc";
//import { SCRIPT_DATA_STACK } from "@/SCRIPT_ANIMATION_LIB";

export type SCRIPTS_PAGE_PROPS = {
  [key: string]: any; // TODO: Fix this
  shortHand: string;
  longHand: string;
  shortDescription: string;
  longDescription: string | string[];
  introduction: string;
  opCodeReview: string;
  inUse: string;
  numberOfOps: string;
  generalType: string;
  linkPath: string;
  exampleLink: string;
  codeBlocks: CodeBlockType[];
  descriptionText: string[];
  STACK_DATA: SCRIPT_DATA_STACK[];
};

const ScriptView = ({
  shortHand,
  longHand,
  shortDescription,
  longDescription,
  introduction,
  opCodeReview,
  codeBlocks,
  descriptionText,
  exampleLink,
  STACK_DATA,
}: SCRIPTS_PAGE_PROPS) => {
  console.log(`script ${shortHand} uses code blocks`, codeBlocks);
  const router = useRouter();
  const plausible = usePlausible();

  const visitOpCode = trpc.createHistoryEvent.useMutation();

  useEffect(() => {
    plausible("pageview", {
      props: { scriptName: shortHand },
    });

    visitOpCode.mutate({
      action: "Reviewed Script",
      entry: longHand,
      uri: router.asPath,
    });
  }, []);

  return (
    <div className="h-screen w-screen overflow-auto">
      <div className="mt-[30px] flex w-screen flex-col justify-between md:mt-5 md:flex-row">
        <div className="ml-10 flex flex-col justify-start md:ml-[260px] md:flex-row">
          {/* Left pointing icon link */}
          <a className="cursor-pointer" onClick={() => window.close()}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              rotate="180deg"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 mt-[17px] md:ml-0 md:mt-[7px]"
            >
              <g transform="rotate(180 12 12)">
                <path
                  d="M8.99978 19.7498C8.80778 19.7498 8.61575 19.6768 8.46975 19.5298C8.17675 19.2368 8.17675 18.7618 8.46975 18.4688L14.9397 11.9988L8.46975 5.52883C8.17675 5.23583 8.17675 4.7608 8.46975 4.4678C8.76275 4.1748 9.23779 4.1748 9.53079 4.4678L16.5308 11.4678C16.8238 11.7608 16.8238 12.2358 16.5308 12.5288L9.53079 19.5288C9.38379 19.6768 9.19178 19.7498 8.99978 19.7498Z"
                  fill="#F79327"
                />
              </g>
            </svg>
          </a>
          {/* Title and description */}
          <div className="flex">
            <p className="ml-2 mt-[17px] text-[20px] font-semibold text-[#0C071D] md:ml-4 md:mt-0 md:text-[28px]">
              {shortHand}
            </p>
            <p className="ml-[8px] mt-[22px] text-[12px] font-extralight text-[#687588] md:mt-2 md:text-[18px]">
              {longHand}
            </p>
          </div>
        </div>
        <div className="ml-12 flex md:mr-6 md:justify-end">
          <Link
            href={exampleLink}
            className="md:text-md mt-5 text-sm text-[#F79327] underline md:mt-0"
            target="_blank"
          >
            Deserialization Example
          </Link>
        </div>
      </div>
      {/* Paragraph */}
      <div className="ml-12 mr-12 mt-7 flex flex-col items-start md:ml-[265px] md:mr-[200px]">
        {longDescription instanceof Array ? (
          <div className="flex flex-col gap-4">
            {longDescription.map((desc, index) => (
              <p
                key={index}
                className="text-[14px] font-extralight text-[#6C5E70] md:text-[16px]"
              >
                {/^\d/.test(desc) ? ( // Check if the description starts with a number
                  <>
                    <span className="font-bold">
                      {desc.substring(
                        0,
                        desc.indexOf(".", desc.indexOf(".") + 1) + 1
                      )}
                    </span>
                    <br />
                    {desc.substring(
                      desc.indexOf(".", desc.indexOf(".") + 1) + 1
                    )}
                  </>
                ) : (
                  desc // Render normally if it doesn't start with a number
                )}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-[14px] font-extralight text-[#6C5E70] md:text-[16px]">
            {longDescription}
          </p>
        )}

        <p className="mt-[30px] text-[18px] font-semibold text-black md:mt-[48px]">
          OP_Code(s) Review
        </p>
        <p className="mt-[20px] text-[14px] font-extralight text-[#6C5E70] md:text-[16px]">
          {opCodeReview}
        </p>
      </div>
      {/* Signature, Public Key, Hashed Key */}

      <div className="flex w-full flex-col justify-between md:flex-row md:justify-start">
        <div className="mb-0 mt-6 flex w-full flex-col items-center justify-center md:mb-[16px] md:ml-[265px] md:flex-col md:items-start md:justify-start xl:flex-row">
          {/* Signature */}
          {/* <div className="flex w-full justify-between md:justify-start">
            <div className="ml-12 flex md:ml-0">
              <svg
                width="16"
                height="21"
                viewBox="0 0 16 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.999 19.249C13.851 19.249 13.7011 19.205 13.5701 19.114C13.2301 18.877 13.148 18.4091 13.385 18.0701C13.983 17.2151 14.249 16.113 14.249 14.5V8.5C14.249 7.188 13.8521 5.94195 13.1011 4.89795C12.8591 4.56195 12.935 4.09307 13.271 3.85107C13.609 3.60907 14.0771 3.68597 14.3181 4.02197C15.2551 5.32297 15.75 6.872 15.75 8.5V14.5C15.75 16.44 15.399 17.8069 14.614 18.9299C14.469 19.1369 14.236 19.249 13.999 19.249ZM1.75 14.499V8.49902C1.75 5.05302 4.554 2.24902 8 2.24902C8.22 2.24902 8.43891 2.25694 8.65991 2.28394C9.06791 2.32594 9.4439 2.04113 9.4939 1.63013C9.5439 1.21813 9.25109 0.844922 8.84009 0.794922C8.56109 0.760922 8.28 0.75 8 0.75C3.727 0.75 0.25 4.227 0.25 8.5V14.5C0.25 14.914 0.586 15.25 1 15.25C1.414 15.25 1.75 14.913 1.75 14.499ZM8.41699 20.123C10.66 18.624 11.75 16.5851 11.75 13.8901V8.49902C11.75 7.49902 11.3589 6.55814 10.6499 5.84814C9.9739 5.17414 9.04089 4.77302 8.08789 4.74902C7.68689 4.74002 7.33009 5.06698 7.31909 5.47998C7.30909 5.89398 7.63605 6.23802 8.05005 6.24902C8.62105 6.26302 9.18289 6.50394 9.58789 6.90894C10.0139 7.33494 10.248 7.89902 10.248 8.49902V13.8889C10.248 16.0749 9.40005 17.659 7.58105 18.875C7.23705 19.105 7.14402 19.571 7.37402 19.916C7.52002 20.132 7.75702 20.249 7.99902 20.249C8.14402 20.249 8.28899 20.208 8.41699 20.123ZM4.56396 15.926C5.32896 14.93 5.75 13.688 5.75 12.429V8.49902C5.75 8.26502 5.78104 8.04497 5.84204 7.86597C5.97304 7.47297 5.75997 7.04797 5.36597 6.91797C4.97297 6.78497 4.54897 7.00007 4.41797 7.39307C4.30697 7.72807 4.25 8.101 4.25 8.5V12.4299C4.25 13.3599 3.939 14.2779 3.375 15.0129C3.122 15.3419 3.18494 15.8119 3.51294 16.0649C3.64994 16.1689 3.80999 16.22 3.96899 16.22C4.19399 16.219 4.41697 16.118 4.56396 15.926ZM8.75 13.499V9.49902C8.75 9.08502 8.414 8.74902 8 8.74902C7.586 8.74902 7.25 9.08502 7.25 9.49902V13.499C7.25 13.913 7.586 14.249 8 14.249C8.414 14.249 8.75 13.913 8.75 13.499Z"
                  fill="#0C071D"
                />
              </svg>
              <p className="ml-5 text-black md:ml-5">Signature</p>
            </div>
            <div className="-mt-1 mr-12 flex h-[31px] w-[160px] items-center justify-center rounded-full bg-[#0C071D] bg-opacity-10 md:ml-9">
              <p className="text-[12px] text-black">{"<sig>"}</p>
            </div>
          </div> */}
          {/* Public Key */}
          {/* <div className="mt-5 flex w-full justify-between md:justify-start xl:mt-0">
            <div className="ml-12 flex md:-ml-0">
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5 0.75C9.778 0.75 6.75 3.778 6.75 7.5C6.75 8.015 6.8081 8.52309 6.9231 9.01709L0.969971 14.97C0.828971 15.111 0.75 15.302 0.75 15.5V19.5C0.75 19.914 1.086 20.25 1.5 20.25H5.5C5.914 20.25 6.25 19.914 6.25 19.5V17.25H8.5C8.699 17.25 8.89003 17.171 9.03003 17.03L11.9829 14.0769C12.4759 14.1919 12.984 14.25 13.5 14.25C17.222 14.25 20.25 11.222 20.25 7.5C20.25 3.778 17.222 0.75 13.5 0.75ZM13.5 12.75C12.979 12.75 12.467 12.6739 11.981 12.5229C11.714 12.4399 11.425 12.512 11.229 12.71L8.18896 15.75H5.5C5.086 15.75 4.75 16.086 4.75 16.5V18.75H2.25V15.811L8.29004 9.771C8.48604 9.574 8.55905 9.28502 8.47705 9.02002C8.32705 8.53402 8.25 8.02198 8.25 7.50098C8.25 4.60598 10.605 2.25098 13.5 2.25098C16.395 2.25098 18.75 4.60598 18.75 7.50098C18.75 10.396 16.395 12.75 13.5 12.75ZM15.77 6.5C15.77 7.19 15.21 7.75 14.52 7.75C13.831 7.75 13.2649 7.19 13.2649 6.5C13.2649 5.81 13.82 5.25 14.51 5.25H14.52C15.21 5.25 15.77 5.81 15.77 6.5Z"
                  fill="#0C071D"
                />
              </svg>
              <p className="ml-4 text-black">Public Key</p>
            </div>
            <div className="-mt-1 mr-12 flex h-[31px] w-[160px] items-center justify-center rounded-full bg-[#0C071D] bg-opacity-10 md:ml-8">
              <p className="text-[12px] text-black">{"<pub-key>"}</p>
            </div>
          </div> */}
          {/* Hasked Key */}

          {shortHand === "P2PKH" && (
            <div className="mt-5 flex w-full justify-between md:justify-start xl:mt-0">
              <div className="ml-12 flex md:ml-0">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 0.75C9.778 0.75 6.75 3.778 6.75 7.5C6.75 8.015 6.8081 8.52309 6.9231 9.01709L0.969971 14.97C0.828971 15.111 0.75 15.302 0.75 15.5V19.5C0.75 19.914 1.086 20.25 1.5 20.25H5.5C5.914 20.25 6.25 19.914 6.25 19.5V17.25H8.5C8.699 17.25 8.89003 17.171 9.03003 17.03L11.9829 14.0769C12.4759 14.1919 12.984 14.25 13.5 14.25C17.222 14.25 20.25 11.222 20.25 7.5C20.25 3.778 17.222 0.75 13.5 0.75ZM13.5 12.75C12.979 12.75 12.467 12.6739 11.981 12.5229C11.714 12.4399 11.425 12.512 11.229 12.71L8.18896 15.75H5.5C5.086 15.75 4.75 16.086 4.75 16.5V18.75H2.25V15.811L8.29004 9.771C8.48604 9.574 8.55905 9.28502 8.47705 9.02002C8.32705 8.53402 8.25 8.02198 8.25 7.50098C8.25 4.60598 10.605 2.25098 13.5 2.25098C16.395 2.25098 18.75 4.60598 18.75 7.50098C18.75 10.396 16.395 12.75 13.5 12.75ZM15.77 6.5C15.77 7.19 15.21 7.75 14.52 7.75C13.831 7.75 13.2649 7.19 13.2649 6.5C13.2649 5.81 13.82 5.25 14.51 5.25H14.52C15.21 5.25 15.77 5.81 15.77 6.5Z"
                    fill="#0C071D"
                  />
                </svg>
                <p className="ml-4 text-black">Hashed Key</p>
              </div>
              <div className="-mt-1 mr-12 flex h-[31px] w-[160px] items-center justify-center rounded-full bg-[#0C071D] bg-opacity-10 md:ml-5">
                <p className="text-[12px] text-black">4d412760f4</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <BottomVideoContainer
          codeBlocks={codeBlocks}
          descriptionText={descriptionText}
          STACK_DATA={STACK_DATA}
        />
      </div>
    </div>
  );
};

export default ScriptView;
