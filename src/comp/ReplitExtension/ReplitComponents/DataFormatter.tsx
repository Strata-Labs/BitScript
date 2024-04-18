import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Input } from "./Input";
import { Tabs, TabsList, TabsTrigger } from "./Tab";
import { Popover, PopoverContent, PopoverTrigger } from "./PopOver";

export default function DataFormatter() {
  const [tab1, setTab1] = React.useState("tab-1-le");
  const [tab2, setTab2] = React.useState("tab-2-le");
  const [inputType, setInputType] = React.useState("Binary" as const);

  const onTabChange1 = (value: string) => {
    setTab1(value);
  };

  const onTabChange2 = (value: string) => {
    setTab2(value);
  };
  const dataTypes = [
    "Binary",
    "Byte",
    "Hexadecimal",
    "Decimal",
    "String",
  ] as const;

  const handleUpdateInput = (input: string) => {
    console.log("clicked");
    console.log(" this is the input: ", input);
    setInputType(input as any);
  };

  return (
    <div className="mt-4 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between ">
          <p className="text-sm text-gray-400">
            Waiting for input below to run....
          </p>

          <Popover>
            <PopoverTrigger>
              <button className="flex w-fit items-center justify-between rounded-2xl bg-black px-2 py-1.5 text-sm text-white ">
                {inputType}
                <span>
                  <ChevronLeftIcon className="h-6 w-6 text-white" />
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="space-y-2 divide-y rounded-lg bg-white p-4 shadow-md"
              side="top"
              align="center"
            >
              {dataTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleUpdateInput(type)}
                  className="w-full py-1 text-left text-sm "
                >
                  {type}
                </button>
              ))}
            </PopoverContent>
          </Popover>
        </div>
        <Input placeholder="copy/paste binary to cast to the other formats" />
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between ">
          <p className="text-md font-medium text-black">Byte</p>
          <Tabs
            value={tab1}
            onValueChange={onTabChange1}
            defaultValue="data-formatter"
            className="h-fit w-24 rounded-full border-none bg-gray-100 text-xs"
          >
            <TabsList className="grid h-fit w-24 grid-cols-2 border-none px-1 py-1">
              <TabsTrigger value="tab-1-be">BE</TabsTrigger>
              <TabsTrigger value="tab-1-le">LE</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Input placeholder="copy/paste <b>binary</b> to cast to the other formats" />
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between ">
          <p className="text-lg font-medium text-black">Hexadecimal</p>
          <Tabs
            value={tab2}
            onValueChange={onTabChange2}
            defaultValue="data-formatter"
            className="h-fit w-24 rounded-full border-none bg-gray-100 text-xs"
          >
            <TabsList className="grid h-fit w-full grid-cols-2 border-none px-1 py-1">
              <TabsTrigger value="tab-2-be">BE</TabsTrigger>
              <TabsTrigger value="tab-2-le">LE</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Input placeholder="waiting for input..." />
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between ">
          <p className="text-lg font-medium text-black">Decimal</p>
        </div>
        <Input placeholder="waiting for input..." />
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between ">
          <p className="text-lg font-medium text-black">String</p>
        </div>
        <Input placeholder="waiting for input..." />
      </div>
    </div>
  );
}
