import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Input } from "../ui/Input";
import { Tabs, TabsList, TabsTrigger } from "../ui/Tab";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/PopOver";
import { getConversions, reverseByteOrder } from "../../lib/dataFormatter";
import { ConversionResult } from "../../types";

export default function DataFormatter() {
  const [byteTab, setTab1] = useState("BYTE-BE");
  const [hexTab, setTab2] = useState("HEX-BE");
  const [inputType, setInputType] = useState("Binary");
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [convertedValues, setConvertedValues] =
    useState<ConversionResult | null>(null);

  const onTabChange1 = (value: string) => {
    setTab1(value);
  };

  const onTabChange2 = (value: string) => {
    setTab2(value);
  };

  const handleByteConversion = (value: string) => {
    if (byteTab === "BYTE-LE") {
      return reverseByteOrder(value);
    } else {
      return value;
    }
  };
  const handleHexConversion = (value: string) => {
    if (hexTab === "HEX-LE") {
      return reverseByteOrder(value);
    } else {
      return value;
    }
  };
  useEffect(() => {
    const result = getConversions(value, inputType);

    if (result.error) {
      setError(result.error);
      setConvertedValues(null);
    } else {
      setError(null);
      setConvertedValues(result);
    }
  }, [value, inputType]);

  const dataTypes = [
    "Binary",
    "Bytes",
    "Hexadecimal",
    "Decimal",
    "String",
  ] as const;

  const handleUpdateInput = (input: string) => {
    setInputType(input);
  };

  return (
    <div className="mt-4 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between ">
          <p className="text-sm text-gray-400">
            Waiting for input below to run...
          </p>

          <Popover>
            <PopoverTrigger>
              <div className="flex w-28 items-center justify-between rounded-2xl bg-black px-2 py-1.5 text-xs text-white ">
                {inputType}
                <span>
                  <ChevronLeftIcon className="h-6 w-6 text-white" />
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="space-y-2 divide-y rounded-lg bg-white p-4 shadow-md"
              side="top"
              align="center"
            >
              {dataTypes.map((type) => (
                <PopoverClose asChild>
                  <div
                    key={type}
                    onClick={() => handleUpdateInput(type)}
                    className="w-full py-1 text-left text-sm "
                  >
                    {type}
                  </div>
                </PopoverClose>
              ))}
            </PopoverContent>
          </Popover>
        </div>
        <Input
          onChange={(e) => {
            const inputValue = e.target.value;
            const sanitizedValue =
              inputType === "String"
                ? inputValue
                : inputValue.replace(/\s+/g, "");
            setValue(sanitizedValue);
          }}
          className="py-6"
          placeholder="copy/paste binary to cast to the other formats"
        />
      </div>
      {value !== "" && error && <p className="mt-2 text-red-500 ">{error}</p>}

      {inputType !== "Bytes" && (
        <div className="space-y-1">
          <div className="flex items-center justify-between ">
            <p className="text-lg font-medium text-black">Bytes</p>
            <Tabs
              value={byteTab}
              onValueChange={onTabChange1}
              defaultValue="data-formatter"
              className="h-fit w-24 rounded-full border-none bg-gray-100 text-xs"
            >
              <TabsList className="grid h-fit w-24 grid-cols-2 border-none px-1 py-1">
                <TabsTrigger value="BYTE-BE">BE</TabsTrigger>
                <TabsTrigger value="BYTE-LE">LE</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <textarea
            name="Bytes"
            className="h-12 w-full cursor-pointer resize-none overflow-auto rounded-full bg-[#F3F3F3] px-6 pt-3 text-black outline-none"
            placeholder="waiting for input..."
            value={
              value ? handleByteConversion(convertedValues?.Bytes ?? "") : ""
            }
            readOnly
          ></textarea>
        </div>
      )}

      {inputType !== "Hexadecimal" && (
        <div className="space-y-1">
          <div className="flex items-center justify-between ">
            <p className="text-lg font-medium text-black">Hexadecimal</p>
            <Tabs
              value={hexTab}
              onValueChange={onTabChange2}
              defaultValue="data-formatter"
              className="h-fit w-24 rounded-full border-none bg-gray-100 text-xs"
            >
              <TabsList className="grid h-fit w-full grid-cols-2 border-none px-1 py-1">
                <TabsTrigger value="HEX-BE">BE</TabsTrigger>
                <TabsTrigger value="HEX-LE">LE</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <textarea
            name="Hexadecimal"
            className="h-12 w-full cursor-pointer resize-none overflow-auto rounded-full bg-[#F3F3F3] px-6 pt-3 text-black outline-none"
            placeholder="waiting for input..."
            value={
              value
                ? handleHexConversion(convertedValues?.Hexadecimal ?? "")
                : ""
            }
            readOnly
          ></textarea>
        </div>
      )}

      {inputType !== "Decimal" && (
        <div className="space-y-1">
          <div className="flex items-center justify-between ">
            <p className="text-lg font-medium text-black">Decimal</p>
          </div>
          <textarea
            name="decimal"
            className="h-12 w-full cursor-pointer resize-none overflow-auto rounded-full bg-[#F3F3F3] px-6 pt-3 text-black outline-none"
            placeholder="waiting for input..."
            value={value ? convertedValues?.Decimal : ""}
            readOnly
          ></textarea>
        </div>
      )}
      {inputType !== "String" && (
        <div className="space-y-1">
          <div className="flex items-center justify-between ">
            <p className="text-lg font-medium text-black">String</p>
          </div>
          <textarea
            name="string"
            className="h-12 w-full cursor-pointer resize-none overflow-auto rounded-full bg-[#F3F3F3] px-6 pt-3 text-black outline-none"
            placeholder="waiting for input..."
            value={value ? convertedValues?.String : ""}
            readOnly
          ></textarea>
        </div>
      )}
    </div>
  );
}
