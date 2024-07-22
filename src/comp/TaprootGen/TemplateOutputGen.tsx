import { classNames } from "@/utils";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "./UI/input";
import { SCRIPT_LEAF } from "./taprootTree";
import { Address, Script, Signer, Tap, Tx } from "@cmdcode/tapscript";
import { activeTaprootComponent, TaprootNodes } from "../atom";
import { useAtom, useSetAtom } from "jotai";
import { TaprootGenComponents } from "./TaprootParent";
import React from "react";
import dynamic from "next/dynamic";

export enum OUTPUT_TYPE {
  P2PKH = "P2PKH",
  P2SH_TL = "P2SH-TL",
  P2SH_HL = "P2SH-HL",
  P2SH_MULTISIG = "P2SH-MULTISIG",
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
  dynamic?: boolean;
  dependsOn?: string;
};

export type SCRIPT_OUTPUT_TYPE = {
  outputType: OUTPUT_TYPE;
  title: string;
  tags: SCRIPT_OUTPUT_TAG_TYPE[];
  signature?: SIGNATURE_OUTPUT_TAG_TYPE[];
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
  label?: string;
  placeholder: string;
  valid: boolean;
  scriptSandBoxInputName: string;
  width?: string;
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

function analyzeScriptHex(scriptHex: string): number {
  // Remove any whitespace and '0x' prefix if present
  const cleanHex = scriptHex.replace(/\s/g, "").replace(/^0x/, "");

  // Calculate the size in bytes
  const sizeInBytes = cleanHex.length / 2;

  // console.log(`Script hex: ${cleanHex}`);
  // console.log(`Script size: ${sizeInBytes} bytes`);

  return sizeInBytes;

  // Additional analysis could be added here
}

function checkDecimalToHex(value: number | string): string {
  if (!isNaN(Number(value)) && typeof value !== "boolean") {
    const number = parseInt(String(value), 10);
    let hex = number.toString(16);
    if (hex.length === 1) {
      hex = "0" + hex;
    }
    // Add the '0x' prefix
    return "0x" + hex;
  } else {
    // If it's not a number, return the original value as a string
    return String(value);
  }
}

export const ScriptInput = ({
  value,
  onChange,
  label,
  placeholder,
  valid,
  scriptSandBoxInputName,
  width = "w-full",
}: ScriptInput) => {
  return (
    // <div className="flex w-full flex-col gap-2">
    <div className={`flex flex-col gap-2 ${width}`}>
      <p>
        <label className="text-md font-semibold text-white">{label}</label>
      </p>
      <div className="w-full">
        <Input
          name={scriptSandBoxInputName}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="relative h-14  w-full rounded-full border border-dark-orange bg-dark-purple px-8 text-lg text-white placeholder:text-slate-400"
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
          // const input = formData[sandbox.scriptSandBoxInputName || ""];

          // const text =
          //   input && input.value !== "" ? input.value : sandbox.label;
          // return (
          //   <div className="flex w-full flex-row items-center rounded-full bg-[#0C071D] px-6 py-2">
          //     <p className="text-[20px] text-dark-orange">{text}</p>
          //   </div>
          // );

          if (sandbox.scriptSandBoxInputName === "requiredNoOfPublicKeys") {
            // it renders all the public key dynamically on the script sandbox
            const totalKeys =
              parseInt(formData["totalPublicKeys"]?.value, 10) || 0;
            return (
              <React.Fragment key={index}>
                {Array.from({ length: totalKeys }).map((_, keyIndex) => {
                  const publicKeyInput = formData[`publicKey-${keyIndex}`];
                  const publicKeyText =
                    publicKeyInput && publicKeyInput.value !== ""
                      ? publicKeyInput.value
                      : `Public Key #${keyIndex + 1}`;
                  return (
                    <div
                      key={`pubkey-${keyIndex}`}
                      className="mt-2 flex w-full flex-row items-center rounded-full bg-[#0C071D] px-6 py-2"
                    >
                      <p className="text-[20px] text-dark-orange">
                        {publicKeyText}
                      </p>
                    </div>
                  );
                })}
              </React.Fragment>
            );
          } else if (sandbox.scriptSandBoxInputName === "requiredSignatures") {
            const totalSignatures =
              parseInt(formData["requiredSignatures"]?.value, 10) || "0x";
            //convert this to hex value so it will begin with "OX"

            return (
              <p className="text-[20px]">
                {checkDecimalToHex(totalSignatures)}
              </p>
            );
          } else if (sandbox.scriptSandBoxInputName === "totalPublicKeys") {
            const totalKeys =
              parseInt(formData["totalPublicKeys"]?.value, 10) || "0x";
            //convert this to hex value so it will begin with "OX"

            return (
              <p className="text-[20px]">{checkDecimalToHex(totalKeys)}</p>
            );
          } else {
            // Render other input fields
            const input = formData[sandbox.scriptSandBoxInputName || ""];
            const text =
              input && input.value !== "" ? input.value : sandbox.label;
            return (
              <div
                key={index}
                className="flex w-full flex-row items-center rounded-full bg-[#0C071D] px-6 py-2"
              >
                <p className="text-[20px] text-dark-orange">{text}</p>
              </div>
            );
          }
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

export const TemplateOutputGen = ({
  scriptTemplate,
  handleExitScriptTemplate,
}: TemplateOutputGen) => {
  const [formData, setFormData] = useState<any>({});
  const [validForm, setValidForm] = useState(false);
  const [nodeTitle, setNodeTitle] = useState("");
  const [dynamicFields, setDynamicFields] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [nodeLeaf, setNodeLeaf] = useAtom(TaprootNodes);
  const setTaprootComponent = useSetAtom(activeTaprootComponent);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    dynamic: boolean
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: {
        value: value,
        touched: true,
        dynamic: dynamic,
      },
    });
    const dynamicInput = scriptInput.find(
      (input) => input.dynamic && input.dependsOn === name
    );

    console.log(" this is the dynamic input it finds: ", dynamicInput);
    if (dynamicInput) {
      const count = parseInt(value, 10);
      if (!isNaN(count) && count > 0) {
        setDynamicFields(Array(count).fill(dynamicInput));
      } else {
        setDynamicFields([]);
      }
    }
  };

  const handleSubmit = () => {
    // get all the script values.
    // const newScript = scriptTemplate.scriptSandbox
    //   .map((sandbox) => {
    //     if (sandbox.type === SCRIPT_SANDBOX_TYPE.CODE) {
    //       return sandbox.content;
    //     }
    //     if (sandbox.type === SCRIPT_SANDBOX_TYPE.INPUT_CODE) {

    //       //also check if the input doesn't exist also check for dynamic values in the form data that have the same name with the sandboxInputName but has an index

    //       const input = formData[sandbox.scriptSandBoxInputName || ""];
    //       console.log("this is the formDAta5: ", formData);
    //       const text =
    //         input && input.value !== "" ? input.value : sandbox.label;
    //       console.log("this is the text: ", text);
    //       return text;
    //     }
    //   })
    //   .filter((script) => script !== undefined);

    const newScript = scriptTemplate.scriptSandbox
      .flatMap((sandbox) => {
        if (sandbox.type === SCRIPT_SANDBOX_TYPE.CODE) {
          return [sandbox.content];
        }
        if (sandbox.type === SCRIPT_SANDBOX_TYPE.INPUT_CODE) {
          const inputName = sandbox.scriptSandBoxInputName || "";
          let inputs = [];

          // Check for static input
          if (formData[inputName]) {
            inputs.push(formData[inputName]);
            console.log("inputs if they are found: ", inputs);
          } else {
            //TODO:  Check for dynamic inputs this is mostly for the multisig; hardcoded this. Ideally there should be a better way
            const dynamicKeys = Object.keys(formData)
              .filter(
                (key) => key.startsWith("publicKey") && formData[key].dynamic
              )
              .sort();

            inputs = dynamicKeys.map((key) => formData[key]);
            console.log("inputs: ", inputs);
          }

          // If no inputs found, use the label
          if (inputs.length === 0) {
            inputs.push({ value: sandbox.label });
          }

          // Map inputs to their values or labels
          return inputs.map((input) => {
            // check if the input name is "requiredSignatures" and "totalPublicKeys"
            let text;
            // if (inputName === "requiredSignatures" || "totalPublicKeys") {
            //   text = checkDecimalToHex(input.value);
            // } else {
              text = input.value !== "" ? input.value : sandbox.label;
            // }
            console.log("Input name:", inputName, "Value:", text);
            return text;
          });
        }
        return [];
      })
      .filter((script) => script !== undefined);

    // store this value to state.
    const title = nodeTitle;

    /// get the script hash used the Tap.encodeScript()
    // const scriptHash = "0xscriptHash";
    console.log("this is the new script: ", newScript);
    let scriptHash;
    try {
      const hash = Tap.encodeScript(newScript);
      scriptHash = hash;
    } catch (err) {
      // throw the error
      // set the state to display the error
      setError("Cannot parse one of the inputs");

      console.log("this is the script hash error: ", err);
      return;
    }
    //TODO:  dynamically calculate the script size from the script
    // get the script size from the whole thing.
    const scriptSize = analyzeScriptHex(scriptHash!);

    // const scriptSize = "2";
    console.log("this is the script size: ", scriptSize);
    const outputType = scriptTemplate.title;
    const description = scriptTemplate.description[0];

    console.log("this is the new script: ", newScript);

    const newOutput: SCRIPT_LEAF = {
      outputType: outputType,
      title: title,
      script: newScript,
      scriptHash: scriptHash,
      scriptSize: scriptSize,
      description,
    };
    console.log("this is the new output: ", newOutput);

    setNodeLeaf([...nodeLeaf, newOutput]);

    // save this value to the global state
    setTaprootComponent(TaprootGenComponents.NewScriptPathView);

    // grab the title from the state and also grab the form data then adds it to state
  };

  const handleSetNodeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    // get the title and then store it to the state
    setNodeTitle(e.target.value);
  };

  useEffect(() => {
    checkIfFormIsValid();
  }, [formData, nodeTitle]);

  const checkIfFormIsValid = () => {
    // get all the keys that are required
    const requiredKeys = scriptInput.filter((input) => {
      return input.required;
    });

    // ensure that all the required keys are filled in the formData
    // const requiredKeysFilled = requiredKeys.every((key) => {
    //   return formData[key.scriptSandBoxInputName]?.value !== "";
    // });

    // // check if the title is filled
    // const isTitleValid = nodeTitle !== "";
    // const isFormValid = requiredKeysFilled && isTitleValid;
    // console.log("isFormValid", isFormValid);
    // setValidForm(isFormValid);

    console.log("these are the required keys: ", requiredKeys)
    const requiredKeysFilled = requiredKeys.every((key) => {
      const value = formData[key.scriptSandBoxInputName]?.value;
      return value !== "" && value !== undefined;
    });

    const isTitleValid = nodeTitle !== "" && nodeTitle !== undefined;

    const isFormValid = requiredKeysFilled && isTitleValid;

    console.log("isFormValid", isFormValid);
    setValidForm(isFormValid);
  };

  const { outputType, title, tags, description, scriptSandbox, scriptInput } =
    scriptTemplate;

  console.log("is tis runinng");
  return (
    <div className="space-y-4">
      <div className="flex  flex-1 flex-col gap-5 rounded-3xl bg-lighter-dark-purple ">
        <div className="flex w-full flex-row">
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
                    <p
                      key={index}
                      className="text-white] text-[16px] font-normal"
                    >
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
                  <label className="text-md font-semibold text-white">
                    Title
                  </label>
                </p>
                <div className="w-full">
                  <p>{error}</p>
                  <Input
                    name="Title"
                    onChange={handleSetNodeTitle}
                    placeholder="descriptional Tapleaf title"
                    className="h-14 w-full rounded-full border border-dark-orange bg-dark-purple px-8 text-lg text-white placeholder:text-slate-400"
                  />
                </div>
                {/* {scriptInput
                  .filter((input) => !input.dynamic)
                  .map((input, index) => {
                    return (
                      <ScriptInput
                        key={index}
                        value={formData[input.scriptSandBoxInputName]?.value}
                        onChange={handleChange}
                        label={input.label}
                        placeholder={input.placeholder}
                        scriptSandBoxInputName={input.scriptSandBoxInputName}
                        valid={
                          formData[input.scriptSandBoxInputName]?.touched ||
                          false
                        }
                      />
                    );
                  })} */}

                {scriptInput
                  .filter((input) => !input.dynamic)
                  .map((input, index, array) => {
                    if (
                      input.scriptSandBoxInputName === "requiredSignatures" ||
                      input.scriptSandBoxInputName === "totalPublicKeys"
                    ) {
                      const nextInput = array[index + 1];
                      if (
                        nextInput &&
                        (nextInput.scriptSandBoxInputName ===
                          "requiredSignatures" ||
                          nextInput.scriptSandBoxInputName ===
                            "totalPublicKeys")
                      ) {
                        return (
                          <div key={index} className="flex flex-col gap-1">
                            <p className="text-md font-semibold text-white">
                              M-of-N Threshold
                            </p>
                            <div className="flex w-full flex-row gap-4">
                              <ScriptInput
                                key={`${index}-1`}
                                value={
                                  formData[input.scriptSandBoxInputName]?.value
                                }
                                onChange={(e) => handleChange(e, false)}
                                // label={input.label}
                                placeholder={input.placeholder}
                                scriptSandBoxInputName={
                                  input.scriptSandBoxInputName
                                }
                                valid={
                                  formData[input.scriptSandBoxInputName]
                                    ?.touched || false
                                }
                                width="w-1/2"
                              />
                              <ScriptInput
                                key={`${index}-2`}
                                value={
                                  formData[nextInput.scriptSandBoxInputName]
                                    ?.value
                                }
                                onChange={(e) => handleChange(e, false)}
                                // label={nextInput.label}
                                placeholder={nextInput.placeholder}
                                scriptSandBoxInputName={
                                  nextInput.scriptSandBoxInputName
                                }
                                valid={
                                  formData[nextInput.scriptSandBoxInputName]
                                    ?.touched || false
                                }
                                width="w-1/2"
                              />
                            </div>
                          </div>
                        );
                      }
                    }

                    if (
                      index > 0 &&
                      (array[index - 1].scriptSandBoxInputName ===
                        "requiredSignatures" ||
                        array[index - 1].scriptSandBoxInputName ===
                          "totalPublicKeys")
                    ) {
                      return null;
                    }

                    return (
                      <ScriptInput
                        key={index}
                        value={formData[input.scriptSandBoxInputName]?.value}
                        onChange={(e) => {
                          handleChange(e, false);
                        }}
                        label={input.label}
                        placeholder={input.placeholder}
                        scriptSandBoxInputName={input.scriptSandBoxInputName}
                        valid={
                          formData[input.scriptSandBoxInputName]?.touched ||
                          false
                        }
                      />
                    );
                  })}

                {dynamicFields.map((field, index) => (
                  <ScriptInput
                    key={`dynamic-${index}`}
                    value={
                      formData[`${field.scriptSandBoxInputName}-${index}`]
                        ?.value
                    }
                    onChange={(e) => {
                      handleChange(e, true);
                    }}
                    label={`${field.label} #${index + 1}`}
                    placeholder={field.placeholder}
                    scriptSandBoxInputName={`${field.scriptSandBoxInputName}-${index}`}
                    valid={
                      formData[`${field.scriptSandBoxInputName}-${index}`]
                        ?.touched || false
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          {
            // divider
          }
          <div className=" w-[1px] bg-gray-800" />
          {
            // script sandbox
          }
          <OutPutScriptSandbox
            handleExitScriptTemplate={handleExitScriptTemplate}
            formData={formData}
            output={scriptTemplate}
          />
        </div>
      </div>
      <div className="relative w-full ">
        <button
          onClick={handleSubmit}
          className="mx-auto mb-2 block w-[95%] rounded-full border border-dark-orange bg-lighter-dark-purple px-6 py-3 text-left text-sm text-white no-underline transition-all duration-300 hover:bg-dark-purple"
        >
          <span className="font-bold">Confirm TapLeaf </span>
          <span className="font-bold text-dark-orange">
            ({nodeLeaf.length + 1})
          </span>
          <span className="font-bold"> {nodeTitle} </span>
        </button>

        <div className="absolute right-9 top-1/2 -translate-y-1/2  flex-col justify-center ">
          <CheckCircleIcon
            className={classNames(
              "h-10 w-10 ",
              validForm ? "text-dark-orange" : "text-gray-300"
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateOutputGenParent;
