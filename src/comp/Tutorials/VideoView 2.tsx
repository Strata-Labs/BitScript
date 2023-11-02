import Link from "next/link";
import { useState } from "react";

const VideoView = () => {
  const [isPayedUser, setIsPayedUser] = useState(false);
  return (
    <div className="mb-10 ml-10 mr-10 mt-10 md:ml-[260px]">
      <div className="flex flex-col text-[#0C071D]">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <Link href={"/tutorials"}>
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(180)"
              >
                <path
                  d="M7.99986 16.4583C8.15986 16.4583 8.31988 16.3975 8.44155 16.275L14.2749 10.4417C14.519 10.1975 14.519 9.80164 14.2749 9.55747L8.44155 3.72414C8.19738 3.47997 7.80152 3.47997 7.55735 3.72414C7.31319 3.96831 7.31319 4.36417 7.55735 4.60834L12.949 9.99998L7.55735 15.3916C7.31319 15.6358 7.31319 16.0317 7.55735 16.2758C7.67985 16.3975 7.83986 16.4583 7.99986 16.4583Z"
                  fill="#F79327"
                  stroke="#F79327"
                />
              </svg>
            </Link>

            <p className="ml-5 text-[22px] font-semibold">Bytes vs Hex</p>
          </div>
          <button
            className={`mt flex flex-row items-center justify-center rounded-2xl bg-[#0C071D] p-3 ${
              isPayedUser ? "" : "cursor-not-allowed opacity-[20%]"
            }`}
            disabled={!isPayedUser}
          >
            <p className="mr-3 text-white">Press To Complete</p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-3"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.03 10.2L11.36 14.86C11.22 15.01 11.03 15.08 10.83 15.08C10.64 15.08 10.45 15.01 10.3 14.86L7.97 12.53C7.68 12.24 7.68 11.76 7.97 11.47C8.26 11.18 8.74 11.18 9.03 11.47L10.83 13.27L14.97 9.14001C15.26 8.84001 15.74 8.84001 16.03 9.14001C16.32 9.43001 16.32 9.90001 16.03 10.2Z"
                fill="#F79327"
              />
            </svg>
          </button>
        </div>
        <div className="mt-10 flex flex-row justify-between">
          <div className="flex flex-col rounded-2xl bg-white p-5">
            <img src="/VideoExample.png" alt="" />
            <p className="mt-10">
              In this video we cover xyzIn this video we cover xyzIn this video
              we cover xyzIn this video we cover xyzIn this video we cover xyzIn
              this video we cover xyzIn this video we cover xyzIn this video we
              cover xyzIn this video we cover xyzIn this video
            </p>
            <p className="mt-10">
              we cover xyzIn this video we cover xyzIn this video we cover xyzIn
              this video we cover xyz In this video we cover xyzIn this video we
              cover xyzIn this video we cover xyzIn this video we cover xyzIn
              this video we cover xyzIn this video we cover xyzIn this video we
              cover xyzIn this video we cover xyz
            </p>
          </div>
          <div
            className={`ml-10 flex h-[400px] flex-col rounded-2xl bg-[#F0F0F0] p-5 text-[#6C5E70] ${
              isPayedUser ? "" : "blur-[3px]"
            }`}
          >
            <div className="flex flex-row items-start justify-between">
              <div className="flex flex-col">
                <p>Bitcoin Basics</p>
                <p>12 Lessons</p>
              </div>
              <p>87% Completed</p>
            </div>
            <div className="mt-5 w-[372px] border-b"></div>
            {/* One step */}
            <div className="fle-row mt-5 flex items-center justify-between">
              <div className="flex flex-row">
                <div className="relative">
                  <div className="h-[20px] w-[20px] rounded-full bg-[#F79327]"></div>
                  <div className="absolute left-[50%] top-[20px] h-[60px] w-[2px] translate-x-[-50%] bg-[#F79327]"></div>
                </div>
                <p className="ml-3 font-bold">Reviewing The Math</p>
              </div>
              <div className="flex flex-row items-center">
                <p className="mr-3 text-[10px]">Video</p>
                <img src="/video-play.svg" alt="" />
              </div>
            </div>
            {/* One step */}
            <div className="fle-row mt-9 flex items-center justify-between">
              <div className="flex flex-row">
                <div className="relative">
                  <div className="h-[20px] w-[20px] rounded-full bg-[#F79327]"></div>
                  <div className="absolute left-[50%] top-[20px] h-[60px] w-[2px] translate-x-[-50%] bg-[#F79327]"></div>
                </div>
                <p className="ml-3 font-bold">Base-2</p>
              </div>
              <div className="flex flex-row items-center">
                <p className="mr-3 text-[10px]">Article</p>
                <img src="/document.svg" alt="" />
              </div>
            </div>
            {/* One step */}
            <div className="fle-row mt-9 flex items-center justify-between">
              <div className="flex flex-row">
                <div className="relative">
                  <div className="h-[20px] w-[20px] rounded-full bg-[#F79327]"></div>
                  <div className="absolute left-[50%] top-[20px] h-[60px] w-[2px] translate-x-[-50%] bg-[#DDDDDD]"></div>
                </div>
                <p className="ml-3 font-bold">Bytes vs. Hex</p>
              </div>
              <div className="flex flex-row items-center">
                <p className="mr-3 text-[10px]">Video</p>
                <img src="/video-play.svg" alt="" />
              </div>
            </div>
            {/* One step */}
            <div className="fle-row mt-9 flex items-center justify-between">
              <div className="flex flex-row">
                <div className="relative">
                  <div className="h-[20px] w-[20px] rounded-full border bg-white"></div>
                  <div className="absolute left-[50%] top-[20px] h-[60px] w-[2px] translate-x-[-50%] bg-[#DDDDDD]"></div>
                </div>
                <p className="ml-3 font-bold">Numbers & Strings</p>
              </div>
              <div className="flex flex-row items-center">
                <p className="mr-3 text-[10px]">Article</p>
                <img src="/document.svg" alt="" />
              </div>
            </div>
            {/* One step */}
            <div className="fle-row mt-9 flex items-center justify-between">
              <div className="flex flex-row">
                <div className="relative">
                  <div className="h-[20px] w-[20px] rounded-full border bg-white"></div>
                </div>
                <p className="ml-3 font-bold">Bytes vs. Hex </p>
              </div>
              <div className="flex flex-row items-center">
                <p className="mr-3 text-[10px]">Oct. 10th - 3:51 pm</p>
                <img src="/calendar.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoView;
