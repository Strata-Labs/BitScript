import { useAtom } from "jotai";
import { useState } from "react";
import { hashingAlgorithm, showHashingAlgorithm } from "../atoms";
import { Tabs, TabsList, TabsTrigger } from "./Tab";
import { Input } from "./Input";
import useDebouncedEffect from "../hooks/useDebounce";
import { calculateHash } from "../lib/hashcalculator";

export default function HashCalculatorContent() {
  const [tab, setTab] = useState("Hex");
  const [algorithm, setAlgorithm] = useAtom(hashingAlgorithm);
  const [showHashingContainer, setShowHashingContainer] =
    useAtom(showHashingAlgorithm);
  const [inputData, setInputData] = useState<string>("");
  const [hash, setHash] = useState("");

  const onTabChange = (value: string) => {
    setTab(value);
  };

  useDebouncedEffect(
    () => {
      const hash = calculateHash({
        algorithm: algorithm.Name,
        input: inputData,
        hexString: tab as "Hex" | "String",
      });
      console.log("hash: ", hash);

      setHash(hash);
    },
    [inputData],
    1000
  );

  return (
    <div className="mt-4">
      <div className="space-y-1">
        <div className="flex items-center justify-between ">
          <p className="text-sm text-gray-400">
            waiting for the input below to run..
          </p>
          <Tabs
            value={tab}
            onValueChange={onTabChange}
            defaultValue="Hex"
            className="h-fit w-32 rounded-full border-none bg-gray-100 text-xs"
          >
            <TabsList className="grid h-fit w-32 grid-cols-2 border-none px-1 py-1">
              <TabsTrigger value="Hex">Hex</TabsTrigger>
              <TabsTrigger value="String"> String</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Input
          onChange={(e) => setInputData(e.target.value)}
          placeholder="copy/paste binary to cast to the other formats"
        />
      </div>
      <img src="/ArrowDown.svg" alt="" className=" h-[50px]" />
      <div
        onClick={() => setShowHashingContainer(true)}
        className="z-10 flex items-center justify-between rounded-full bg-black p-3"
      >
        <div className="flex ">
          <img src="/fingerprint.svg" alt="" />
          <p className="ml-2 font-extralight text-white">Selected Hash</p>
          <p className="ml-2 font-bold capitalize text-white">
            {algorithm.Name}
          </p>
        </div>
        <img src="/angle-right.svg" alt="" />
      </div>
      <img src="/ArrowDown.svg" alt="" className="h-[50px]" />
      <textarea
        className="-mt-2 h-3/4 w-full rounded-3xl border border-black bg-[#F0F0F0] p-5 text-black outline-none"
        placeholder="waiting for input"
        value={hash}
        readOnly
      ></textarea>
    </div>
  );
}
