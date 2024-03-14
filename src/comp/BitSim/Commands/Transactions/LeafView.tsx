import { classNames } from "@/utils";
import { CheckCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

const LeafView = () => {
  return (
    <div
      style={{
        //minHeight: "calc(100vh - 110px)",

        paddingLeft: "240px",
      }}
      className="flex h-full w-full flex-col gap-4 overflow-auto"
    >
      <div className=" flex w-full flex-col justify-between px-8 ">
        <div className="flex items-center md:flex-row">
          {/* Title and Description */}
          <div className="mt-10 flex items-center">
            <Link href={"/bitsim/commands/transactions"}>
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-180"
              >
                <path
                  d="M7.99986 16.4583C8.15986 16.4583 8.31988 16.3975 8.44155 16.275L14.2749 10.4417C14.519 10.1975 14.519 9.80164 14.2749 9.55747L8.44155 3.72414C8.19738 3.47997 7.80152 3.47997 7.55735 3.72414C7.31319 3.96831 7.31319 4.36417 7.55735 4.60834L12.949 9.99998L7.55735 15.3916C7.31319 15.6358 7.31319 16.0317 7.55735 16.2758C7.67985 16.3975 7.83986 16.4583 7.99986 16.4583Z"
                  fill="#25314C"
                  stroke="#25314C"
                />
              </svg>
            </Link>

            <p className=" text-[20px] font-semibold text-[#0C071D] md:mt-0 md:text-[20px]">
              ScriptPath
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-10 px-8">
        <div className="flex w-full flex-col rounded-2xl bg-[#EEEEEE] px-6 py-8">
          <div className="flex flex-row items-center justify-between">
            <p className="font-semibold text-[#0C071D]">
              Merkle Tree Visualizer{" "}
              <span className="font-light">
                smt = TapTweak(PubKey, MerkelTree)
              </span>
            </p>
            <div className="flex items-center">
              <div className="flex h-[31px] w-[90px] items-center justify-center rounded-lg bg-white text-[12px] text-dark-purple">
                # TapLeaf: <span className="font-bold">1</span>
              </div>
              <button>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0197 5.5C11.1907 5.5 10.5146 4.829 10.5146 4C10.5146 3.171 11.1816 2.5 12.0096 2.5H12.0197C12.8487 2.5 13.5197 3.171 13.5197 4C13.5197 4.829 12.8487 5.5 12.0197 5.5ZM13.5197 12C13.5197 11.171 12.8487 10.5 12.0197 10.5H12.0096C11.1816 10.5 10.5146 11.171 10.5146 12C10.5146 12.829 11.1907 13.5 12.0197 13.5C12.8487 13.5 13.5197 12.829 13.5197 12ZM13.5197 20C13.5197 19.171 12.8487 18.5 12.0197 18.5H12.0096C11.1816 18.5 10.5146 19.171 10.5146 20C10.5146 20.829 11.1907 21.5 12.0197 21.5C12.8487 21.5 13.5197 20.829 13.5197 20Z"
                    fill="#6C5E70"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-2 h-[1px] w-full bg-[#A7A7A7]"></div>
        </div>

        <button
          className={classNames(
            "flex h-[72px] w-full items-center justify-between rounded-full px-6  ",
            "cursor-pointer bg-[#0C071D] "
          )}
        >
          <p className="gradient-text mr-5 text-[20px] font-semibold tracking-wider md:mr-10">
            Confirm Output (0)
          </p>
          <CheckCircleIcon
            className={classNames(
              "h-10 w-10 ",
              "text-dark-orange",
              true ? "text-gray-300" : "text-dark-orange"
            )}
          />
        </button>
      </div>
    </div>
  );
};

export default LeafView;
