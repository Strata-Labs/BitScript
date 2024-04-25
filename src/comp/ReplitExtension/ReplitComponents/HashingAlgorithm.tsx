import Link from "next/link";
import { Hashing_List } from "../lib/utils";
import { useState } from "react";
import { useAtom } from "jotai";
import { hashingAlgorithm, showHashingAlgorithm } from "../atoms";

export type HashingAlgorithm = {
  Name: string;
  Returns: string;
  BigDesc: string;
  Link: string;
  Op: string;
  Script: string;
  LinkScript: string;
  Desc: string;
};
export default function HashingAlgorithm() {
  const [selectedAlgorithmInfo, setSelectedAlgorithmInfo] =
    useAtom(hashingAlgorithm)    
  const [showHashingContainer, setShowHashingContainer] =
    useAtom(showHashingAlgorithm);

  const handleSelectedAlgo = (algorithm: HashingAlgorithm) => {
    setSelectedAlgorithmInfo(algorithm);
  };

  return (
    <div>
      <div className="flex items-end">
        <div className="cursor-pointer" onClick={() => setShowHashingContainer(false)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            rotate="180deg"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2  mt-[7px] md:ml-0"
          >
            <g transform="rotate(180 12 12)">
              <path
                d="M8.99978 19.7498C8.80778 19.7498 8.61575 19.6768 8.46975 19.5298C8.17675 19.2368 8.17675 18.7618 8.46975 18.4688L14.9397 11.9988L8.46975 5.52883C8.17675 5.23583 8.17675 4.7608 8.46975 4.4678C8.76275 4.1748 9.23779 4.1748 9.53079 4.4678L16.5308 11.4678C16.8238 11.7608 16.8238 12.2358 16.5308 12.5288L9.53079 19.5288C9.38379 19.6768 9.19178 19.7498 8.99978 19.7498Z"
                fill="#F79327"
              />
            </g>
          </svg>
        </div>
        <p className="font-bold text-xl">Selecting Algorithms</p>
      </div>

      <div className="mt-5 flex flex-col rounded-2xl bg-black p-4">
        <div className="flex flex-row justify-between">
          <p className="font-semibold text-[#F79327]">
            {selectedAlgorithmInfo ? selectedAlgorithmInfo.Name : ""}
          </p>
          <div className="flex flex-row text-white">
            {" "}
            <p className="font-extralight">returns</p>
            <p className="ml-1 font-semibold">
              {selectedAlgorithmInfo ? selectedAlgorithmInfo.Returns : ""}
            </p>
          </div>
        </div>
        <div>
          <p className="mt-10 text-sm text-white">
            <span className="font-semibold">
              {selectedAlgorithmInfo ? selectedAlgorithmInfo.Name : ""}
            </span>{" "}
            {selectedAlgorithmInfo ? selectedAlgorithmInfo.BigDesc : ""}
          </p>
        </div>
        <div className="mt-10 flex flex-row justify-start">
          <Link
            className="mx-1 rounded-full border border-white px-4 py-2 text-white"
            href={selectedAlgorithmInfo ? selectedAlgorithmInfo.Link : ""}
            target="_blank"
          >
            <p>{selectedAlgorithmInfo ? selectedAlgorithmInfo.Op : ""}</p>
          </Link>
          {selectedAlgorithmInfo && selectedAlgorithmInfo.Script !== "n/a" && (
            <Link
              className="mx-1 rounded-full border border-white px-4 py-2 text-white"
              href={selectedAlgorithmInfo.LinkScript}
              target="_blank"
            >
              <p>{selectedAlgorithmInfo.Script}</p>
            </Link>
          )}
        </div>
      </div>

      <div className="mt-4 flex h-2/5 w-fit flex-col divide-y rounded-2xl bg-white  px-6 py-3 text-sm shadow-xl">
        {Hashing_List.map((algo) => {
          return (
            <div
              className="grid grid-cols-3 items-center px-2 pb-2 pt-5 relative "
              onClick={() => handleSelectedAlgo(algo)}
            >
                {selectedAlgorithmInfo.Name === algo.Name && (
              <div className="absolute left-0 top-5 bottom-2 bg-[#F79327] w-2 rounded-md"></div>
            )}
              <p className="text-md ml-5 col-span-1 font-semibold capitalize">
                {algo.Name}
              </p>
              <p className="col-span-2">{algo.Desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
