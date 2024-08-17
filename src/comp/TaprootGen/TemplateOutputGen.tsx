import { classNames } from "@/utils";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "./UI/input";
import { OUTPUT_TYPE, SCRIPT_INPUT_TYPE, SCRIPT_LEAF } from "./types";
import { Tap } from "@cmdcode/tapscript";
import { activeTaprootComponent, TaprootNodes } from "../atom";
import { useAtom, useSetAtom } from "jotai";
import { TaprootGenComponents } from "./types";
import React from "react";
import {
  SCRIPT_INPUT_VALIDATOR,
  SCRIPT_SANDBOX_TYPE,
  TAG_TYPE,
  TemplateOutputGenProps,
} from "./types";
import { validateInput } from "./utils/validators";
import { ScriptInput } from "./components/ScriptInput";
import { OutPutScriptSandbox } from "./components/ScriptSandbox";
import { analyzeScriptHex, generateUUID } from "./utils/helpers";

export type ScriptNodeData = {
  id: string;
  templateType: OUTPUT_TYPE;
  title: string;
  // note for dynamic inputs alway put the right index
  inputs: {
    [key: string]: string | string[];
  };
};

export const TemplateOutputGen = ({
  scriptTemplate,
  selectedNodeData,
}: TemplateOutputGenProps) => {
  // save the formdata
  // if the selected is undefined then just save normally like we always do
  // if it is not undefined then we update the initial form data to the selectedNodeData

  const exampleP2PKHData: ScriptNodeData = {
    id: "testing34k3434343",
    templateType: OUTPUT_TYPE.P2SH_MULTISIG,
    title: "testing-again",
    inputs: {
      totalPublicKeys: "2",
      requiredSignatures: "1",
      "publicKey-0": "f2b97d8c4f89bcd3e64f78e8a6b7c7a9d5f3e1a7",
      "publicKey-1": "f2b97d8c4f89bcd3e64f78e8a6b7c7a9d5f3e1a7",
    },
  };

  const [formData, setFormData] = useState<any>({});
  const [validForm, setValidForm] = useState(false);
  const [nodeTitle, setNodeTitle] = useState("");
  const [dynamicFields, setDynamicFields] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [nodeLeaf, setNodeLeaf] = useAtom(TaprootNodes);
  const setTaprootComponent = useSetAtom(activeTaprootComponent);
  // the state value of the current node should be here, this empty if there is no value

  useEffect(() => {
    if (
      exampleP2PKHData &&
      exampleP2PKHData.templateType === scriptTemplate.outputType
    ) {
      const initialFormData: any = {};
      Object.entries(exampleP2PKHData.inputs).forEach(([key, value]) => {
        initialFormData[key] = { value, touched: true, valid: true };
      });
      console.log("this is the initial form data: ", initialFormData);
      setFormData(initialFormData);
      setNodeTitle(exampleP2PKHData.title);
    }
  }, [scriptTemplate]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    dynamic: boolean,
    validatorType: SCRIPT_INPUT_VALIDATOR
  ) => {
    const { name, value } = event.target;
    const isValid = validateInput(validatorType, value);

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: {
        value,
        touched: value !== "",
        dynamic,
        valid: isValid.valid,
      },
    }));

    const dynamicInput = scriptInput.find(
      (input) => input.dynamic && input.dependsOn === name
    );

    // we need this to check if the dynamic input is valid, without this the dynamic input will not be validated because it won't be included in the form data in the beginning
    if (dynamicInput) {
      const count = parseInt(value, 10);
      if (!isNaN(count) && count > 0) {
        setFormData((prevFormData: any) => {
          const dynamicFields = Array(count)
            .fill(null)
            .reduce((acc, _, index) => {
              const key = `${dynamicInput.scriptSandBoxInputName}-${index}`;
              return {
                ...acc,
                [key]: {
                  value: "",
                  touched: false,
                  dynamic: true,
                  valid: false,
                },
              };
            }, {});

          return {
            ...prevFormData,
            ...dynamicFields,
          };
        });

        setDynamicFields(Array(count).fill(dynamicInput));
      } else {
        setDynamicFields([]);
      }
    }
  };

  const handleSubmit = () => {
    const newScript = scriptTemplate.scriptSandbox
      .flatMap((sandbox) => {
        switch (sandbox.type) {
          case SCRIPT_SANDBOX_TYPE.CODE:
            return [sandbox.content];

          case SCRIPT_SANDBOX_TYPE.INPUT_CODE:
          case SCRIPT_SANDBOX_TYPE.DYNAMIC_TEXT:
          case SCRIPT_SANDBOX_TYPE.DYNAMIC:
            const inputName = sandbox.scriptSandBoxInputName || "";
            let inputs = [];

            if (
              sandbox.type === SCRIPT_SANDBOX_TYPE.DYNAMIC &&
              sandbox.dependsOn
            ) {
              const dependentValue = formData[sandbox.dependsOn]?.value;
              const totalFields = parseInt(dependentValue, 10) || 0;

              for (let i = 0; i < totalFields; i++) {
                const dynamicInputName = `${inputName}-${i}`;
                if (formData[dynamicInputName]) {
                  console.log(
                    "this is the dynamic input value: ",
                    formData[dynamicInputName]
                  );
                  inputs.push(formData[dynamicInputName]);
                }
              }
            } else if (formData[inputName]) {
              inputs.push(formData[inputName]);
            }

            // If no inputs found, use the label
            if (inputs.length === 0) {
              inputs.push({ value: sandbox.label });
            }

            // Map inputs to their values or labels
            return inputs.map((input) => {
              let value = input.value !== "" ? input.value : sandbox.label;

              //TODO: make this even better

              // if (sandbox.renderFunction) {
              //   value = sandbox.renderFunction(value);
              // }

              if (sandbox.calculateFunction) {
                value = sandbox.calculateFunction(value);
              }

              console.log("Input name:", inputName, "Value:", value);
              return value;
            });

          default:
            return [];
        }
      })
      .filter((script) => script !== undefined);

    const title = nodeTitle;
    console.log("this is the new script: ", newScript);
    let scriptHash;
    try {
      const hash = Tap.encodeScript(newScript);
      console.log("this is the hash: ", hash);
      scriptHash = hash;
    } catch (err) {
      // throw the error
      // set the state to display the error
      setError("Cannot parse one of the inputs");

      console.log("this is the script hash error: ", err);
      return;
    }
    const scriptSize = analyzeScriptHex(scriptHash!);
    console.log("this is the script size: ", scriptSize);
    const outputType = scriptTemplate.title;
    const description = scriptTemplate.description[0];
    // get all the key value pairs from the form data
    const inputs = Object.entries(formData).reduce<Record<string, string>>(
      (acc, [key, value]) => {
        if (typeof value === "object" && value !== null && "value" in value) {
          acc[key] = String(value.value);
        }
        return acc;
      },
      {}
    );
    console.log(
      "This is the formdata broken down inputs: ",
      JSON.stringify(inputs, null, 2)
    );

    const newOutput: SCRIPT_LEAF = {
      id: generateUUID(),
      outputType: outputType,
      title: title,
      script: newScript,
      scriptHash: scriptHash,
      scriptSize: scriptSize,
      description,
      scriptType: scriptTemplate.outputType,
      inputs: inputs,
    };

    // console.log("this is the new script: ", newScript);
    if (exampleP2PKHData !== undefined) {
      // check if the particular state is empty, if it's empty then you can add this as a new leaf else update the prev one
      // sort through the NodeLeaf and then find the particular id and then update it
      const newNodeLeaf = nodeLeaf.map((leaf) => {
        if (leaf.id === exampleP2PKHData.id) {
          return { ...leaf, ...newOutput };
        }
        return leaf;
      });
      setNodeLeaf(newNodeLeaf);
    } else {
      // check if the particular state is empty, if it's empty then you can add this as a new leaf else update the prev one
      const newNodeLeaf = [...nodeLeaf, newOutput];
      setNodeLeaf(newNodeLeaf);
    }

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
  }, [formData, nodeTitle, validForm]);

  const checkIfFormIsValid = () => {
    // get the requiredKeys that are not dynamic; this is because we don't necessary use the dynamic fields for validation
    const requiredKeys = scriptInput.filter((input) => {
      return input.required && !input.dynamic;
    });

    // get all the keys that are valid
    const isValid = Object.keys(formData).every((key) => {
      return formData[key].valid;
    });
    const isTitleValid = nodeTitle !== "" && nodeTitle !== undefined;

    const isActuallyValid =
      requiredKeys.every((key) => {
        return formData[key.scriptSandBoxInputName]?.valid;
      }) &&
      isValid &&
      isTitleValid;
    console.log("isFormValid", isActuallyValid);
    setValidForm(isActuallyValid);
  };

  const { outputType, title, tags, description, scriptSandbox, scriptInput } =
    scriptTemplate;

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
                    value={nodeTitle}
                    placeholder="descriptional Tapleaf title"
                    className="h-14 w-full rounded-full bg-dark-purple px-8 text-lg"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  {scriptInput.map((input, index) => {
                    if (input.dynamic) {
                      // Handle dynamic inputs
                      const dependentValue =
                        formData[input.dependsOn || ""]?.value;
                      const totalFields = parseInt(dependentValue, 10) || 0;

                      return (
                        <React.Fragment key={`dynamic-${index}`}>
                          {Array.from({ length: totalFields }).map(
                            (_, fieldIndex) => (
                              <ScriptInput
                                key={`${input.scriptSandBoxInputName}-${fieldIndex}`}
                                value={
                                  formData[
                                    `${input.scriptSandBoxInputName}-${fieldIndex}`
                                  ]?.value
                                }
                                onChange={(e) =>
                                  handleChange(e, true, input.validator!)
                                }
                                label={`${input.label} #${fieldIndex + 1}`}
                                placeholder={input.placeholder}
                                scriptSandBoxInputName={`${input.scriptSandBoxInputName}-${fieldIndex}`}
                                valid={validateInput(
                                  input.validator!,
                                  formData[
                                    `${input.scriptSandBoxInputName}-${fieldIndex}`
                                  ]?.value
                                )}
                                touched={
                                  formData[
                                    `${input.scriptSandBoxInputName}-${fieldIndex}`
                                  ]?.touched || false
                                }
                              />
                            )
                          )}
                        </React.Fragment>
                      );
                    } else if (
                      // this just handles a case in the UI for multisig that has the requiredSignatures and totalPublicKeys displayed side by side
                      input.scriptSandBoxInputName === "requiredSignatures" ||
                      input.scriptSandBoxInputName === "totalPublicKeys"
                    ) {
                      // Handle M-of-N Threshold inputs
                      const nextInput = scriptInput[index + 1];
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
                                onChange={(e) =>
                                  handleChange(
                                    e,
                                    false,
                                    SCRIPT_INPUT_VALIDATOR.DECIMAL
                                  )
                                }
                                placeholder={input.placeholder}
                                scriptSandBoxInputName={
                                  input.scriptSandBoxInputName
                                }
                                valid={validateInput(
                                  SCRIPT_INPUT_VALIDATOR.DECIMAL,
                                  formData[input.scriptSandBoxInputName]?.value
                                )}
                                touched={
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
                                onChange={(e) =>
                                  handleChange(
                                    e,
                                    false,
                                    SCRIPT_INPUT_VALIDATOR.DECIMAL
                                  )
                                }
                                placeholder={nextInput.placeholder}
                                scriptSandBoxInputName={
                                  nextInput.scriptSandBoxInputName
                                }
                                valid={validateInput(
                                  SCRIPT_INPUT_VALIDATOR.DECIMAL,
                                  formData[nextInput.scriptSandBoxInputName]
                                    ?.value
                                )}
                                touched={
                                  formData[nextInput.scriptSandBoxInputName]
                                    ?.touched || false
                                }
                                width="w-1/2"
                              />
                            </div>
                          </div>
                        );
                      }
                    } else if (
                      index > 0 &&
                      (scriptInput[index - 1].scriptSandBoxInputName ===
                        "requiredSignatures" ||
                        scriptInput[index - 1].scriptSandBoxInputName ===
                          "totalPublicKeys")
                    ) {
                      // Skip rendering the second M-of-N input as it's already rendered
                      return null;
                    } else if (input.type === SCRIPT_INPUT_TYPE.SELECT) {
                      // Handle select inputs
                      return (
                        <div key={index} className="flex flex-col gap-1">
                          <label className="text-md font-semibold text-white">
                            {input.label}
                          </label>
                          <select
                            value={
                              formData[input.scriptSandBoxInputName]?.value ||
                              ""
                            }
                            onChange={(e) =>
                              handleChange(e, false, input.validator!)
                            }
                            name={input.scriptSandBoxInputName}
                            className="h-14 w-full rounded-full bg-dark-purple px-8 text-lg text-white"
                          >
                            <option value="">Select an option</option>
                            {input.options.map((option, optionIndex) => (
                              <option key={optionIndex} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    } else {
                      // Handle regular inputs
                      return (
                        <ScriptInput
                          key={index}
                          value={formData[input.scriptSandBoxInputName]?.value}
                          onChange={(e) =>
                            handleChange(e, false, input.validator!)
                          }
                          label={input.label}
                          placeholder={input.placeholder}
                          scriptSandBoxInputName={input.scriptSandBoxInputName}
                          valid={validateInput(
                            input.validator!,
                            formData[input.scriptSandBoxInputName]?.value
                          )}
                          touched={
                            formData[input.scriptSandBoxInputName]?.touched ||
                            false
                          }
                        />
                      );
                    }
                  })}
                </div>
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
          <OutPutScriptSandbox formData={formData} output={scriptTemplate} />
        </div>
      </div>
      <div className="relative w-full ">
        <button
          onClick={handleSubmit}
          className={classNames(
            "mx-auto mb-3 block w-[95%] rounded-full border bg-lighter-dark-purple px-6 py-3 text-left text-lg text-white no-underline transition-all duration-300 hover:bg-dark-purple",

            validForm ? "border-dark-orange bg-dark-orange" : "border-gray-800"
          )}
          disabled={!validForm}
        >
          <span className="font-thin text-white">Confirm TapLeaf </span>
          <span className="font-bold text-dark-orange">
            ({nodeLeaf.length + 1})
          </span>
          <span className="font-bold"> {nodeTitle} </span>
        </button>

        <div className="absolute right-12 top-1/2 -translate-y-1/2  flex-col justify-center ">
          <CheckCircleIcon
            className={classNames(
              "h-7 w-7 ",
              validForm ? "text-dark-orange" : "text-gray-300"
            )}
          />
        </div>
      </div>
    </div>
  );
};
