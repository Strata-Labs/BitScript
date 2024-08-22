import React, { useEffect, useState } from "react";
import {
  OutputScriptSandboxProps,
  SCRIPT_SANDBOX_TYPE,
  TAG_TYPE,
} from "../types";
import Link from "next/link";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "../UI/hoverCard";
export const OutPutScriptSandbox = ({
  output,
  formData,
}: OutputScriptSandboxProps) => {
  console.log("formData", formData);
  const renderCodeBox = () => {
    return output.scriptSandbox.map((sandbox, index) => {
      switch (sandbox.type) {
        case SCRIPT_SANDBOX_TYPE.COMMENT:
          return (
            <p key={index} className="text-[20px] text-[#a19f8a]">
              {sandbox.content}
            </p>
          );

        case SCRIPT_SANDBOX_TYPE.CODE:
          return (
            <p key={index} className="text-[20px] text-white">
              {sandbox.content}
            </p>
          );

        //create any case for just normal text it should display
        case SCRIPT_SANDBOX_TYPE.INPUT_CODE:
          const input = formData[sandbox.scriptSandBoxInputName || ""];
          let content =
            input && input.value !== "" ? input.value : sandbox.label;

          if (sandbox.renderFunction && input?.value === "") {
            content = sandbox.renderFunction(content);
          }

          if (sandbox.calculateFunction && input?.value !== "") {
            content = sandbox.calculateFunction(content);
          }

          return (
            <div
              key={index}
              className="flex w-full flex-row overflow-x-auto max-w-xl items-center rounded-full bg-[#0C071D] px-6 py-2"
            >
              {sandbox.showHover ? (
                <HoverCard openDelay={100} closeDelay={100}>
                  <HoverCardTrigger asChild>
                    <p className="cursor-help text-[20px] text-dark-orange">
                      {content}
                    </p>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-fit">
                    <HoverContentCard content={content} />
                  </HoverCardContent>
                </HoverCard>
              ) : (
                <p className="text-[20px] text-dark-orange">
                  {content}
                </p>
              )}
            </div>
          );

        // case for normal dynamic text

        case SCRIPT_SANDBOX_TYPE.DYNAMIC_TEXT:
          const inputText = formData[sandbox.scriptSandBoxInputName || ""];
          let contentText =
            inputText && inputText.value !== ""
              ? inputText.value
              : sandbox.label;

          // if (sandbox.renderFunction && inputText?.value === "") {
          //   contentText = sandbox.renderFunction(contentText);
          // }

          if (sandbox.calculateFunction && inputText?.value !== "") {
            contentText = sandbox.calculateFunction(contentText);
          }

          return (
            <div
              key={index}
              className="flex w-full flex-row items-center rounded-full px-6 py-2"
            >
              <p className="text-[20px] text-white">{contentText}</p>
            </div>
          );

        case SCRIPT_SANDBOX_TYPE.DYNAMIC:
          if (sandbox.dependsOn) {
            console.log("this is the sandbox: ", sandbox);
            const dependentValue = formData[sandbox.dependsOn]?.value;
            console.log("this is the dependentValue: ", dependentValue);
            const totalKeys = parseInt(dependentValue, 10) || 0;
            console.log("this is the totalKey: ", totalKeys);

            return (
              <React.Fragment key={index}>
                {Array.from({ length: totalKeys }).map((_, keyIndex) => {
                  const dynamicInputName = `${sandbox.scriptSandBoxInputName}-${keyIndex}`;
                  console.log(
                    "this is the dynamic input name: ",
                    dynamicInputName
                  );
                  const dynamicInput = formData[dynamicInputName];
                  console.log(
                    "this is the dynamicInput: ",
                    dynamicInput?.value
                  );
                  const content =
                    dynamicInput && dynamicInput.value !== ""
                      ? dynamicInput.value
                      : sandbox.renderFunction &&
                        sandbox.renderFunction(keyIndex + 1);

                  console.log("This is the content: ", content);
                  return (
                    <div
                      key={`${index}-${keyIndex}`}
                      className="mt-2 flex  overflow-x-auto max-w-xl w-full flex-row items-center rounded-full bg-[#0C071D] px-6 py-2"
                    >
                      <p className="text-[20px] text-dark-orange">{content}</p>
                    </div>
                  );
                })}
              </React.Fragment>
            );
          }
          return null;

        default:
          return null;
      }
    });
  };
  return (
    <div className="flex flex-1 flex-col rounded-l-3xl">
      <div className="flex  h-20 flex-row items-center justify-between gap-4 rounded-l-3xl  px-12  py-6">
        <p className=" text-md font-semibold text-white">Script Sandbox</p>
        <div className="flex flex-row items-center gap-2">
          {output.signature?.map((tag, index) => {
            if (tag.type === TAG_TYPE.TEXT) {
              return (
                <div
                  key={index}
                  className="flex flex-row items-center rounded-lg bg-[#0c071d] px-4 py-2"
                >
                  <p className="text-xs font-normal text-white">{tag.text}</p>
                </div>
              );
            } else {
              return (
                <Link href={tag.link || ""} key={index}>
                  <div className="flex flex-row items-center rounded-lg bg-[#0c071d] px-4 py-2">
                    <p className="text-sm font-normal text-white underline">
                      {tag.text}
                    </p>
                  </div>
                </Link>
              );
            }
          })}
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-800" />
      <div className="flex flex-col gap-2 px-12 py-6">{renderCodeBox()}</div>
    </div>
  );
};

const HoverContentCard = ({ content }: { content: string }) => {
  const [hexValue, setHexValue] = useState("");
  const [binaryValue, setBinaryValue] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [stringValue, setStringValue] = useState("");

useEffect(() => {
  const trimmedContent = content.trim();
  const isHex = /^(0x)?[0-9A-Fa-f]+$/.test(trimmedContent);

  if (isHex) {
    const hex = trimmedContent.replace(/^0x/, "");
    setHexValue(hex);

    // Use BigNumber for large numbers
     const num = BigInt(`0x${hex}`);
    setBinaryValue(num.toString(2).padStart(hex.length * 4, "0"));
    setNumberValue(num.toString());
    setStringValue(hexToUtf8(hex));
  } else {
    // If it's not a hex, treat it as a string
    setStringValue(trimmedContent);
    const hex = stringToHex(trimmedContent);
    setHexValue(hex);

    const num = BigInt(`0x${hex}`);
    setBinaryValue(num.toString(2));
    setNumberValue(num.toString());
  }
}, [content]);

  const hexToUtf8 = (hex: string) => {
    try {
      return decodeURIComponent(
        hex.match(/.{2}/g)?.map(byte => '%' + byte).join('') || ''
      );
    } catch (e) {
      console.error('Failed to decode hex to UTF-8:', e);
      return 'Invalid UTF-8 string';
    }
  };

  const stringToHex = (str: string) => {
    return str
      .split('')
      .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-black text-white ">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-300">
          Hex
        </label>
        <div className="w-full overflow-x-auto rounded-md bg-[#1A0F2E] px-3 py-2 text-white">
          <p className="font-mono">{hexValue}</p>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-300">
          Binary
        </label>
        <div className="w-full overflow-x-auto rounded-md bg-[#1A0F2E] px-3 py-2 text-white">
          <p className="font-mono">{binaryValue}</p>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-300">
          Number
        </label>
        <div className="w-full overflow-x-auto rounded-md bg-[#1A0F2E] px-3 py-2 text-white">
          <p>{numberValue}</p>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-300">
          String
        </label>
        <div className="w-full overflow-x-auto rounded-md bg-[#1A0F2E] px-3 py-2 text-white">
          <p>{stringValue}</p>
        </div>
      </div>
    </div>
  );
};