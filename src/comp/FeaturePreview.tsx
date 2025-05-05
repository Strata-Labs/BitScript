import Link from "next/link";
import { GENERATE_OUTPUT_FROM_SCRIPT } from "./BitSim/Commands/Transactions/Outputsetup";
import { classNames } from "@/utils";
import { useEffect, useState } from "react";
import { isValid, output } from "zod";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import {
  SCRIPT_OUTPUT_TYPE,
  SCRIPT_SANDBOX_TYPE,
  ScriptInput,
  TAG_TYPE,
} from "./TaprootGen/TemplateOutputGen";

interface InputMetaData {
  valid: boolean;
  touched: boolean;
  error?: string;
}

const FeaturePreview = () => {
  const output: SCRIPT_OUTPUT_TYPE = GENERATE_OUTPUT_FROM_SCRIPT[0];

  const [formData, setFormData] = useState<any>({});
  const [validForm, setValidForm] = useState(false);

  // i have a dynamic state that is filled with a variaety of generic types of data

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      // Update meta data (e.g., set touched to true)
      ...formData,
      [name]: {
        value: value,
        touched: true,
      },
    });
  };

  useEffect(() => {
    checkIfFormIsValid();
  }, [formData]);
  const checkIfFormIsValid = () => {
    // get all the keys that are required
    const requiredKeys = output.scriptInput.filter((input) => {
      return input.required;
    });

    // ensure that all the required keys are filled in the formData
    const isFormValid = requiredKeys.every((key) => {
      return formData[key.scriptSandBoxInputName]?.value !== "";
    });

    setValidForm(isFormValid);
  };

  return (
    <div
      style={{
        minHeight: "92vh",
        paddingLeft: "240px",
      }}
      className="min-height-[92vh] flex h-full w-full flex-col gap-4 overflow-auto"
    >
      <div className="flex flex-1 flex-col gap-4 bg-[#f8f8f8] p-12">
        <div className="flex  flex-1 flex-row rounded-3xl bg-[#EEEEEE]">
          <div className="flex flex-1 flex-col rounded-l-3xl">
            <div className="flex h-20 flex-row justify-between gap-4 rounded-l-3xl  px-12 py-6">
              <p className=" text-[20px] font-semibold text-[#0C071D]">
                Script Summary
              </p>
              <div className="flex flex-row items-center gap-8">
                <div className="flex flex-row items-center gap-4">
                  {output.tags.map((tag, index) => {
                    if (tag.type === TAG_TYPE.TEXT) {
                      return (
                        <div
                          key={index}
                          className="flex flex-row items-center rounded-lg bg-[#f3f3f3] px-6 py-2"
                        >
                          <p className="text-[14px] font-normal text-[#0C071D]">
                            {tag.text}
                          </p>
                        </div>
                      );
                    } else {
                      return (
                        <Link href={tag.link || ""} key={index}>
                          <div className="flex flex-row items-center rounded-lg bg-[#f3f3f3] px-6 py-2">
                            <p className="text-[14px] font-normal text-[#0C071D] underline">
                              {tag.text}
                            </p>
                          </div>
                        </Link>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="h-[1px] w-full bg-[#aeaeae]" />
            <div className="flex  flex-col gap-4  px-12  py-6">
              <p className="text-[36px] font-semibold tracking-wider text-black">
                {output.title}
              </p>
              <div className="flex flex-col gap-8">
                {output.description.map((desc, index) => {
                  return (
                    <p
                      key={index}
                      className="text-[16px] font-normal text-[#0C071D]"
                    >
                      {desc}
                    </p>
                  );
                })}
                <div className="flex h-[1px]   w-[inherit] rounded-lg bg-dark-orange" />
              </div>
            </div>
            <div className="flex w-full  flex-col  gap-6 px-12 py-6">
              <p className="text-[16px] font-bold text-[#0C071D]">
                Required Data
              </p>
              <div className="flex w-full flex-col gap-8">
                {output.scriptInput.map((input, index) => {
                  return (
                    <ScriptInput
                      key={index}
                      value={formData[input.scriptSandBoxInputName]?.value}
                      onChange={handleChange}
                      label={input.label}
                      placeholder={input.placeholder}
                      scriptSandBoxInputName={input.scriptSandBoxInputName}
                      valid={
                        formData[input.scriptSandBoxInputName]?.touched || false
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {
            // divider
          }
          <div className="h-[80vh] w-[1px] bg-[#aeaeae]" />
          <OutPutScriptSandbox formData={formData} output={output} />
        </div>
        <div className="px-12">
          <button
            className={classNames(
              "flex h-[72px] w-full cursor-pointer items-center justify-between rounded-full px-6 shadow-md transition-all ",
              validForm ? "bg-[#0C071D]" : "bg-[#cacad9]"
            )}
          >
            <p
              className={classNames(
                "mr-5 text-[20px]  font-thin tracking-wider text-white  md:mr-10",
                validForm ? "gradient-text" : "text-white"
              )}
            >
              Generating Transaction Command...Create at least{" "}
              <span className="font-bold"> one input </span> &{" "}
              <span className="font-bold">one output</span>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturePreview;

type OutputScriptSandboxProps = {
  output: SCRIPT_OUTPUT_TYPE;
  formData: any;
};

const OutPutScriptSandbox = ({
  output,
  formData,
}: OutputScriptSandboxProps) => {
  const renderCodeBox = () => {
    return output.scriptSandbox.map((sandbox, index) => {
      switch (sandbox.type) {
        case SCRIPT_SANDBOX_TYPE.COMMENT:
          return (
            <p className="text-[20px] text-[#a19f8a]">{sandbox.content}</p>
          );

        case SCRIPT_SANDBOX_TYPE.CODE:
          return (
            <p className="text-[20px] text-[#0c071d]">{sandbox.content}</p>
          );

        case SCRIPT_SANDBOX_TYPE.INPUT_CODE:
          const input = formData[sandbox.scriptSandBoxInputName || ""];

          const text =
            input && input.value !== "" ? input.value : sandbox.label;
          return (
            <div className="flex w-full flex-row items-center rounded-full bg-[#0C071D] px-6 py-2">
              <p className="text-[20px] text-dark-orange">{text}</p>
            </div>
          );
      }
    });
  };
  return (
    <div className="flex flex-1 flex-col rounded-l-3xl">
      <div className="flex  h-20 flex-row justify-between gap-4 rounded-l-3xl  px-12  py-6">
        <p className=" text-[20px] font-semibold text-[#0C071D]">
          Script Sandbox
        </p>
        <div className="flex flex-row items-center gap-8">
          <div className="flex flex-row items-center gap-4"></div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-[#aeaeae]" />
      <div className="flex flex-col gap-1 px-12 py-6">{renderCodeBox()}</div>
    </div>
  );
};
