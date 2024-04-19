import React from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/Tab";
import { Input } from "./ui/Input";
import Link from "next/link";
import { useAtom } from "jotai";
import { hashingAlgorithm, showHashingAlgorithm } from "../atoms";
import { motion } from "framer-motion";
import HashingAlgorithm from "./HashingAlgorithm";

export default function HashCalculator() {
  const [showHashingContainer, setShowHashingContainer] =
    useAtom(showHashingAlgorithm);
  return (
    <div>
      {showHashingContainer ? (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.5, type: "spring", damping: 20 }}
          key="newComponent"
        >
          <HashingAlgorithm />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          key="originalComponent"
        >
          <HashCalculatorContent />
        </motion.div>
      )}
    </div>
  );
}

function HashCalculatorContent() {
  const [tab, setTab] = React.useState("hex");
  const [algorithm, setAlgorithm] = useAtom(hashingAlgorithm);
  const [showHashingContainer, setShowHashingContainer] =
    useAtom(showHashingAlgorithm);

  const onTabChange = (value: string) => {
    setTab(value);
  };
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
            defaultValue="hex"
            className="h-fit w-32 rounded-full border-none bg-gray-100 text-xs"
          >
            <TabsList className="grid h-fit w-32 grid-cols-2 border-none px-1 py-1">
              <TabsTrigger value="hex">Hex</TabsTrigger>
              <TabsTrigger value="string"> String</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Input placeholder="copy/paste binary to cast to the other formats" />
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
        readOnly
      ></textarea>
    </div>
  );
}
