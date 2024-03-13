import { classNames } from "@/utils";
import { trpc } from "@/utils/trpc";
import { CheckCircleIcon, CubeIcon } from "@heroicons/react/20/solid";
import { useAtom } from "jotai";
import { useState } from "react";
const COMMAND_ROW_SECTION_HEIGHT = 75;

import { blockHeightAtom } from "./BitSimAtoms";

type CommandType = {
  command: string;
};
const Commands = () => {
  const [chainTipBlock, setChainTipBlock] = useAtom(blockHeightAtom);
  const [commands, setCommands] = useState<CommandType[]>([
    {
      command: "add your first command below...",
    },
    {
      command: "add your seocond command below...",
    },
  ]);

  trpc.getBitSimTip.useQuery(undefined, {
    enabled: true,
    onSuccess: (data) => {
      console.log("data", data);
      const blockHeight = data.blocks;
      setChainTipBlock(blockHeight);
    },
  });

  console.log("chainTipBlock", chainTipBlock);
  if (commands.length === 0) {
    return (
      <div
        style={{
          //minHeight: "calc(100vh - 110px)",
          minHeight: "92vh",
          paddingLeft: "240px",
        }}
        className="min-height-[92vh] flex h-full w-full flex-col gap-4 overflow-auto"
      >
        <div className="flex flex-col p-8">
          <div className="flex flex-row">
            <p className=" text-[20px] font-semibold text-[#0C071D]  md:text-[32px]">
              Commands
            </p>
          </div>
          <p className="text-[20px] font-extralight text-[#0C071D] ">
            Below are all of the chained commands that’ll run when the button
            above is clicked. Once ran, you’ll be able to inspect each block &
            transaction by opening up the mempool explorer seen above.
          </p>
        </div>
        <div className="flex h-full w-full flex-1 flex-row gap-10  p-8">
          <div className="flex flex-1 flex-row ">
            <div className="relative flex h-full flex-col items-start ">
              <div className="relative h-full w-[16px] rounded-full bg-black">
                <div
                  style={{
                    height: COMMAND_ROW_SECTION_HEIGHT + "px",
                    right: "0px",
                    top: COMMAND_ROW_SECTION_HEIGHT * -0.9 + "px",
                  }}
                  className="absolute flex  w-[16px] flex-col items-center rounded-t-full bg-black "
                >
                  <div
                    className=" flex  flex-col items-center justify-center rounded-full bg-black"
                    style={{
                      height: COMMAND_ROW_SECTION_HEIGHT * 0.55 + "px",
                      width: COMMAND_ROW_SECTION_HEIGHT * 0.55 + "px",
                      // right: "-13px",
                      // top: COMMAND_ROW_SECTION_HEIGHT * -0.55 + "px",
                    }}
                  >
                    <CubeIcon className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div
                  style={{
                    height: COMMAND_ROW_SECTION_HEIGHT + "px",
                    right: "-13px",
                  }}
                  className="items   absolute flex flex-col items-center justify-center "
                >
                  <div
                    className="flex  flex-col items-center justify-center rounded-full bg-black"
                    style={{
                      height: COMMAND_ROW_SECTION_HEIGHT * 0.55 + "px",
                      width: COMMAND_ROW_SECTION_HEIGHT * 0.55 + "px",
                    }}
                  >
                    <p className="text-[16px] font-bold text-white">1</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                paddingLeft: COMMAND_ROW_SECTION_HEIGHT * 0.25 + "px",
              }}
              className="flex w-full flex-1  flex-col"
            >
              {
                // each section should look like this
              }
              <div
                style={{
                  height: COMMAND_ROW_SECTION_HEIGHT + "px",
                }}
                className="flex flex-row items-center"
              >
                <div className="flex w-full flex-row rounded-full bg-white px-2 py-2">
                  <p className="text-[16px] font-light italic text-[#0C071D]">
                    add your first command below...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "92vh",
        paddingLeft: "240px",
      }}
      className="min-height-[92vh] flex h-full w-full flex-col gap-4 overflow-auto"
    >
      <div className="flex flex-col p-8">
        <div className="flex flex-row">
          <p className=" text-[20px] font-semibold text-[#0C071D]  md:text-[32px]">
            Commands
          </p>
        </div>
        <p className="text-[20px] font-extralight text-[#0C071D] ">
          Below are all of the chained commands that’ll run when the button
          above is clicked. Once ran, you’ll be able to inspect each block &
          transaction by opening up the mempool explorer seen above.
        </p>
      </div>
      <div className="flex h-full w-full flex-1 flex-row gap-10  p-8">
        <div className="flex flex-1 flex-row ">
          <div className="relative flex h-full flex-col items-start ">
            <div className="relative h-full w-[16px] rounded-full bg-black">
              <div
                style={{
                  height: COMMAND_ROW_SECTION_HEIGHT + "px",
                  right: "0px",
                  top: COMMAND_ROW_SECTION_HEIGHT * -0.9 + "px",
                }}
                className="absolute flex  w-[16px] flex-col items-center rounded-t-full bg-black "
              >
                <div
                  className=" flex  flex-col items-center justify-center rounded-full bg-black"
                  style={{
                    height: COMMAND_ROW_SECTION_HEIGHT * 0.55 + "px",
                    width: COMMAND_ROW_SECTION_HEIGHT * 0.55 + "px",
                  }}
                >
                  <CubeIcon className="h-6 w-6 text-white" />
                </div>
              </div>
              {commands.map((command, index) => {
                return (
                  <div
                    style={{
                      height: COMMAND_ROW_SECTION_HEIGHT + "px",
                      right: "-33px",
                      top: COMMAND_ROW_SECTION_HEIGHT * index + "px",
                    }}
                    className="items   absolute flex flex-col items-center justify-center "
                  >
                    <div
                      className="flex flex-col items-center justify-center rounded-full bg-black px-4"
                      style={{
                        height: COMMAND_ROW_SECTION_HEIGHT * 0.55 + "px",
                      }}
                    >
                      <p className="text-[16px] font-bold text-white">
                        {chainTipBlock + index + 1}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            style={{
              paddingLeft: COMMAND_ROW_SECTION_HEIGHT * 0.55 + "px",
            }}
            className="flex w-full flex-1 flex-col  justify-between"
          >
            {
              // each section should look like this
            }
            <div className="flex flex-col">
              {commands.map((command, index) => {
                return (
                  <div
                    style={{
                      height: COMMAND_ROW_SECTION_HEIGHT + "px",
                    }}
                    className="flex flex-row items-center"
                  >
                    <div className="flex w-full flex-row rounded-full bg-white px-2 py-2">
                      <p className="text-[16px] font-light italic text-[#0C071D]">
                        {command.command}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              className={
                "flex h-[72px] w-full cursor-pointer items-center justify-between rounded-full  bg-[#0C071D] px-6 "
              }
            >
              <p className="gradient-text mr-5 text-[20px] font-bold tracking-wider  md:mr-10">
                Run Commands
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
      </div>
    </div>
  );
};

export default Commands;
