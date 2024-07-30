import React from "react";
import { OutputScriptSandboxProps, SCRIPT_SANDBOX_TYPE, TAG_TYPE } from "../types";
import Link from "next/link";

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
              className="flex w-full flex-row items-center rounded-full bg-[#0C071D] px-6 py-2"
            >
              <p className="text-[20px] text-dark-orange">{content}</p>
            </div>
          );

          // case for normal dynamic text

          case SCRIPT_SANDBOX_TYPE.DYNAMIC_TEXT:
            const inputText = formData[sandbox.scriptSandBoxInputName || ""];
            let contentText =
              inputText && inputText.value !== "" ? inputText.value : sandbox.label;

            if (sandbox.renderFunction && inputText?.value === "") {
              contentText = sandbox.renderFunction(contentText);
            }

            if (sandbox.calculateFunction && inputText?.value !== "") {
              contentText = sandbox.calculateFunction(contentText);
            }

            return (
              <div
                key={index}
                className="flex w-full flex-row items-center rounded-full bg-[#0C071D] px-6 py-2"
              >
                <p className="text-[20px] text-dark-orange">{contentText}</p>
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
                      className="mt-2 flex w-full flex-row items-center rounded-full bg-[#0C071D] px-6 py-2"
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
      <div className="flex  h-20 flex-row justify-between gap-4 rounded-l-3xl  px-12  py-6">
        <p className=" text-sm font-semibold text-white">Script Sandbox</p>
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
                    <p className="text-xs font-normal text-white underline">
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