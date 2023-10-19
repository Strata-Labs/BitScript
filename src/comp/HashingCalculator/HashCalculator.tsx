import { useAtom } from "jotai";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Hashing_List } from "@/utils/HASHES";
import { hashingAlgorithm } from "../atom";
import {
  OP_RIPEMD160,
  OP_SHA1,
  OP_SHA256,
  OP_HASH160,
  OP_HASH256,
} from "./HashingLogic";
import { ScriptData } from "@/corelibrary/scriptdata";

const HashCalculator = () => {
  const [algorithm, setAlgorithm] = useAtom(hashingAlgorithm);
  const [hexString, setHexString] = useState("Hex");
  const [bigLittle, setBigLittle] = useState("Big");
  const selectedAlgorithmInfo = Hashing_List.find(
    (script) => script.Name === algorithm
  );
  const [displayedHash, setDisplayedHash] = useState<string>("");

  console.log("current", algorithm);
  const [inputData, setInputData] = useState<string>("");
  const [hash, setHash] = useState<string>("");
  console.log("initial hash", hash);

  useEffect(() => {
    calculateHash();
  }, [inputData]);

  const convertEndianess = (input: string): string => {
    const result = [];
    for (let i = 0; i < input.length; i += 2) {
      result.unshift(input.substring(i, i + 2));
    }
    return result.join("");
  };

  useEffect(() => {
    if (bigLittle === "Little") {
      setDisplayedHash(convertEndianess(hash));
    } else {
      setDisplayedHash(hash);
    }
  }, [hash, bigLittle]);

  const convertInputData = (): string => {
    if (hexString === "Hex") {
      try {
        return Buffer.from(inputData, "hex").toString("utf8");
      } catch (err) {
        console.error("Invalid Hex:", err);
        return "";
      }
    }
    return inputData;
  };

  const calculateHash = () => {
    const processedInput = convertInputData();
    if (!processedInput) {
      setHash("");
      return;
    }

    let op;
    switch (algorithm) {
      case "RIPEMD160":
        op = new OP_RIPEMD160();
        break;
      case "SHA1":
        op = new OP_SHA1();
        break;
      case "SHA256":
        op = new OP_SHA256();
        break;
      case "HASH160":
        op = new OP_HASH160();
        break;
      case "HASH256":
        op = new OP_HASH256();
        break;
      default:
        console.error("Unsupported algorithm:", algorithm);
        return;
    }

    const stack = [ScriptData.fromString(processedInput)];

    try {
      const [_, resultStack] = op.execute(stack);
      setHash(resultStack[0].dataString!);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error calculating hash:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
      setHash("Error calculating hash!");
    }
  };

  useEffect(() => {
    calculateHash();
  }, [inputData, hexString]);

  return (
    <div className="mx-10 mb-10 mt-10 md:ml-[260px] md:mr-5">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <p className="font-extralight text-[#687588]">Utility Tool</p>
          <p className="text-[29px] font-semibold text-black">
            Hashing Calculator
          </p>
          <p className="font-extralight text-[#687588]">
            Below are a handful of Bitcoin tools that are universal & useful
            across many / all transaction types.{" "}
            <span className="text-[#F79327]">Explore a few below!</span>
          </p>
        </div>
        <div className="mt-10 flex flex-row items-center justify-between">
          <div className="flex flex-row">
            <p className="font-bold text-black">Preimage</p>
            <p className="ml-1 font-extralight text-black">(input)</p>
          </div>
          <div className="flex h-[42px] w-[222px] flex-row rounded-full bg-[#F3F3F3] p-2">
            <button
              className={`flex h-[30px] w-[100px] items-center justify-center rounded-full text-[14px] font-extralight ${
                hexString === "Hex"
                  ? "bg-[#0C071D] text-white"
                  : "bg-transparent text-black"
              }`}
              onClick={() => setHexString("Hex")}
            >
              Hex
            </button>
            <button
              className={`flex h-[30px] w-[100px] items-center justify-center rounded-full text-[14px] font-extralight ${
                hexString === "String"
                  ? "bg-[#0C071D] text-white"
                  : "bg-transparent text-black"
              }`}
              onClick={() => setHexString("String")}
            >
              String
            </button>
          </div>
        </div>
        <textarea
          className="z-10 mt-5 h-[204px] rounded-3xl bg-[#F0F0F0] p-5 text-black outline-none"
          placeholder="paste | type a hexadecimal value to hash"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        ></textarea>
        <img src="/ArrowDown.svg" alt="" className="-mt-2 h-[50px]" />
        <Link
          className="z-10 mt-5 flex h-[64px] items-center justify-between rounded-full bg-black p-5"
          href={"/hashingAlgorithms"}
        >
          <div className="flex ">
            <img src="/fingerprint.svg" alt="" />
            <p className="ml-2 font-extralight">Selected Hash</p>
            <p className="ml-2 font-bold">
              {selectedAlgorithmInfo ? selectedAlgorithmInfo.Name : ""}
            </p>
          </div>
          <img src="/angle-right.svg" alt="" />
        </Link>
        <img src="/ArrowDown.svg" alt="" className="-mt-2 h-[50px]" />
        <div className="mt-5 flex flex-row items-center justify-between">
          <div className="flex flex-row">
            <p className="font-bold text-black">Hash</p>
            <p className="ml-1 font-extralight text-black">(output)</p>
          </div>
          <div className="flex h-[42px] w-[222px] flex-row rounded-full bg-[#F3F3F3] p-2">
            <button
              className={`flex h-[30px] w-[100px] items-center justify-center rounded-full text-[14px] font-extralight ${
                bigLittle === "Big"
                  ? "bg-[#0C071D] text-white"
                  : "bg-transparent text-black"
              }`}
              onClick={() => setBigLittle("Big")}
            >
              Big Endian
            </button>
            <button
              className={`flex h-[30px] w-[100px] items-center justify-center rounded-full text-[14px] font-extralight ${
                bigLittle === "Little"
                  ? "bg-[#0C071D] text-white"
                  : "bg-transparent text-black"
              }`}
              onClick={() => setBigLittle("Little")}
            >
              Little Endian
            </button>
          </div>
        </div>
        <textarea
          className="mt-5 h-[204px] rounded-3xl bg-[#F0F0F0] p-5 text-black outline-none"
          placeholder="hash output will appear here"
          value={displayedHash}
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default HashCalculator;
