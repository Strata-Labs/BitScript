import { classNames } from "@/utils";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "./UI/input";

export enum OUTPUT_TYPE {
  P2PKH = "P2PKH",
  P2SH_TL = "P2SH-TL",
}

export enum SCRIPT_SANDBOX_TYPE {
  COMMENT = "COMMENT",
  CODE = "CODE",
  INPUT_CODE = "INPUT_CODE",
}

export enum TAG_TYPE {
  TEXT = "TEXT",
  LINK = "LINK",
}

type SCRIPT_OUTPUT_TAG_TYPE = {
  text: string;
  type: TAG_TYPE;
  link: string | null;
};

type SIGNATURE_OUTPUT_TAG_TYPE = {
  text: string;
  type: TAG_TYPE;
  link: string | null;
};

type SCRIPT_SANDBOX = {
  type: SCRIPT_SANDBOX_TYPE;
  id: number;
  content: string;
  label?: string;
  scriptSandBoxInputName?: string;
};

type SCRIPT_INPUT = {
  label: string;
  placeholder: string;
  scriptSandBoxInputName: string;
  required: boolean;
};

export type SCRIPT_OUTPUT_TYPE = {
  outputType: OUTPUT_TYPE;
  title: string;
  tags: SCRIPT_OUTPUT_TAG_TYPE[];
  signature: SIGNATURE_OUTPUT_TAG_TYPE[];
  description: string[];
  scriptSandbox: SCRIPT_SANDBOX[];
  scriptInput: SCRIPT_INPUT[];
};

type TemplateOutputGenParentProps = {
  scriptTemplate: SCRIPT_OUTPUT_TYPE | null;
  showScriptSandbox: boolean;
  handleExitScriptTemplate: () => void;
};

type ScriptInput = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  valid: boolean;
  scriptSandBoxInputName: string;
};

type TemplateOutputGen = {
  scriptTemplate: SCRIPT_OUTPUT_TYPE;
  handleExitScriptTemplate: () => void;
};

type OutputScriptSandboxProps = {
  output: SCRIPT_OUTPUT_TYPE;
  handleExitScriptTemplate: () => void;

  formData: any;
};

export const ScriptInput = ({
  value,
  onChange,
  label,
  placeholder,
  valid,
  scriptSandBoxInputName,
}: ScriptInput) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <p>
        <label className="text-md font-semibold text-white">{label}</label>
      </p>
      <div className="w-full">
        <Input
          name={scriptSandBoxInputName}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="relative  h-14 w-full rounded-full border border-dark-orange bg-dark-purple px-8 text-lg text-white"
        />

        {/* <div
          style={{
            right: "45px",
            top: "15%",
          }}
          className="absolute flex  flex-col justify-center "
        >
          <CheckCircleIcon
            className={classNames(
              "h-10 w-10 ",
              valid ? "text-dark-orange" : "text-gray-300"
            )}
          />
        </div> */}
      </div>
    </div>
  );
};

const TemplateOutputGenParent = ({
  scriptTemplate,
  showScriptSandbox,
  handleExitScriptTemplate,
}: TemplateOutputGenParentProps) => {
  console.log("TemplateOutputGenParent");
  console.log("scriptTemplate", scriptTemplate);
  console.log("showScriptSandbox", showScriptSandbox);

  return (
    <>
      <AnimatePresence>
        {showScriptSandbox && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -200 }}
            style={{
              minHeight: "92vh",
              paddingLeft: "0",
            }}
            className=" min-height-[92vh] flex h-full w-full flex-col gap-4 overflow-auto"
          >
            {
              <AnimatePresence>
                {scriptTemplate !== null && (
                  <motion.div
                    initial={{ scale: 0, rotate: "12.5deg" }}
                    animate={{ scale: 1, rotate: "0deg" }}
                    exit={{ scale: 0, rotate: "0deg" }}
                    onClick={(e) => e.stopPropagation()}
                    className="flex  flex-1 flex-col rounded-3xl bg-lighter-dark-purple "
                  >
                    <div className="flex w-full flex-row ">
                      <TemplateOutputGen
                        handleExitScriptTemplate={handleExitScriptTemplate}
                        scriptTemplate={scriptTemplate}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            }
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const OutPutScriptSandbox = ({
  output,
  formData,
  handleExitScriptTemplate,
}: OutputScriptSandboxProps) => {
  console.log("formData", formData);
  const renderCodeBox = () => {
    return output.scriptSandbox.map((sandbox, index) => {
      switch (sandbox.type) {
        case SCRIPT_SANDBOX_TYPE.COMMENT:
          return (
            <p className="text-[20px] text-[#a19f8a]">{sandbox.content}</p>
          );

        case SCRIPT_SANDBOX_TYPE.CODE:
          return <p className="text-[20px] text-white">{sandbox.content}</p>;

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
        <p className=" text-sm font-semibold text-white">Script Sandbox</p>
        <div className="flex flex-row items-center gap-2">
          {output.signature.map((tag, index) => {
            if (tag.type === TAG_TYPE.TEXT) {
              return (
                <div
                  key={index}
                  className="flex flex-row items-center rounded-lg bg-[#0c071d] px-4 py-2"
                >
                  <p className="text-xs font-normal text-white">
                    {tag.text}
                  </p>
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

export const TemplateOutputGen = ({
  scriptTemplate,
  handleExitScriptTemplate,
}: TemplateOutputGen) => {
  const [formData, setFormData] = useState<any>({});
  const [validForm, setValidForm] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
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
    const requiredKeys = scriptInput.filter((input) => {
      return input.required;
    });

    // ensure that all the required keys are filled in the formData
    const isFormValid = requiredKeys.every((key) => {
      return formData[key.scriptSandBoxInputName]?.value !== "";
    });

    console.log("isFormValid", isFormValid);
    setValidForm(isFormValid);
  };

  const { outputType, title, tags, description, scriptSandbox, scriptInput } =
    scriptTemplate;

  console.log("is tis runinng");
  return (
    <>
      <div className="flex flex-1 flex-col rounded-l-3xl">
        <div className="flex h-20 flex-row justify-between gap-4 rounded-l-3xl  px-12 py-6">
          <p className=" text-lg font-semibold text-white">
            Script Summary
          </p>
          <div className="flex flex-row items-center gap-8">
            <div className="flex flex-row items-center gap-4">
              {tags.map((tag, index) => {
                if (tag.type === TAG_TYPE.TEXT) {
                  return (
                    <div
                      key={index}
                      className="flex flex-row items-center rounded-lg bg-[#0c071d] px-6 py-2"
                    >
                      <p className="text-xs font-normal text-white">
                        {tag.text}
                      </p>
                    </div>
                  );
                } else {
                  return (
                    <Link href={tag.link || ""} key={index}>
                      <div className="flex flex-row items-center rounded-lg bg-[#0c071d] px-6 py-2">
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
        </div>

        <div className="h-[1px] w-full bg-gray-800" />
        <div className="flex  flex-col gap-4  px-12  py-6">
          <p className="text-[36px] font-semibold tracking-wider text-white">
            {title}
          </p>
          <div className="flex flex-col gap-8">
            {description.map((desc, index) => {
              return (
                <p key={index} className="text-white] text-[16px] font-normal">
                  {desc}
                </p>
              );
            })}
            <div className="flex h-[1px]   w-[inherit] rounded-lg bg-dark-orange" />
          </div>
        </div>
        <div className="flex w-full  flex-col  gap-6 px-12 py-6">
          <div className="flex w-full flex-col gap-3">
            <p>
              <label className="text-md font-semibold text-white">Title</label>
            </p>
            <div className="w-full">
              <Input
                name="Title"
                onChange={() => console.log("handling onchange")}
                placeholder="descriptional Tapleaf title"
                className="h-14 w-full rounded-full border border-dark-orange bg-dark-purple px-8 text-lg text-white"
              />
            </div>

            {scriptInput.map((input, index) => {
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
      <div className="h-[96vh] w-[1px] bg-gray-800" />

      {
        // script sandbox
      }
      <OutPutScriptSandbox
        handleExitScriptTemplate={handleExitScriptTemplate}
        formData={formData}
        output={scriptTemplate}
      />
    </>
  );
};

export default TemplateOutputGenParent;
