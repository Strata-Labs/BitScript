import React from "react";
import { Tabs, TabsList, TabsTrigger } from "./Tab";
import { Input } from "./Input";
import Link from "next/link";
export default function HashCalculator() {
  const [tab, setTab] = React.useState("hex");

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
      <div className="z-10 flex items-center justify-between rounded-full bg-black p-3">
        <div className="flex ">
          <img src="/fingerprint.svg" alt="" />
          <p className="ml-2 font-extralight text-white">Selected Hash</p>
            <p className="ml-2 capitalize font-bold text-white">
            Hash256
            </p>
        </div>
        <img src="/angle-right.svg" alt="" />
      </div>
      <img src="/ArrowDown.svg" alt="" className="h-[50px]" />
        <textarea
          className="-mt-2 h-3/4 w-full border border-black rounded-3xl bg-[#F0F0F0] p-5 text-black outline-none"
          placeholder="waiting for input"
          readOnly
        ></textarea>
    </div>
  );
}
