import { classNames } from "@/utils";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "./UI/input";
import { OUTPUT_TYPE, SCRIPT_INPUT_TYPE, SCRIPT_LEAF } from "./types";
import { Tap } from "@cmdcode/tapscript";
import {
  activeTaprootComponent,
  selectedTaprootNode,
  TaprootNodes,
} from "../atom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
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
import { ScriptInputs } from "./components/RenderedInputs";

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
}: TemplateOutputGenProps) => {
  // states
  const [formData, setFormData] = useState<any>({});
  const [validForm, setValidForm] = useState(false);
  const [nodeTitle, setNodeTitle] = useState("");
  const [dynamicFields, setDynamicFields] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [nodeLeaf, setNodeLeaf] = useAtom(TaprootNodes);
  const setTaprootComponent = useSetAtom(activeTaprootComponent);
  const [selectedTaprootItem, setSelectedTaprootItem] =
    useAtom(selectedTaprootNode);
  const [inputsTouched, setInputsTouched] = useState(false);

  // effects

  // populates the form data with the selected taproot item
  useEffect(() => {
    if (
      selectedTaprootItem &&
      selectedTaprootItem.scriptType === scriptTemplate.outputType
    ) {
      const initialFormData: any = {};
      Object.entries(selectedTaprootItem.inputs).forEach(([key, value]) => {
        initialFormData[key] = { value, touched: true, valid: true };
      });
      // sets the form data and the node title
      setFormData(initialFormData);
      setNodeTitle(selectedTaprootItem.title);
    }
  }, [scriptTemplate, selectedTaprootItem]);

  // Runs to check if the form is touched
  useEffect(() => {
    // the formdata is an object, so we need to check if any of the input has been touched
    Object.values(formData).forEach((input: any) => {
      // if any of the input is touched then set the inputsTouched to true
      if (input.touched) {
        setInputsTouched(true);
      } else {
        setInputsTouched(false);
      }
    });
  }, [formData]);

  useEffect(() => {
    checkIfFormIsValid();
  }, [formData, nodeTitle, validForm]);

  // functions

  // this function updates the form data and the dynamic fields
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

    // it also checks if the script input has any dynamic input and then automatically fills the formData only after any of the fields have been touched
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
              // this is the key syntax for any of the dynamic fields
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

        // sets the dynamic fields to display the right number of input; Note: this is only important for p2sh-multisig
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

              if (sandbox.calculateFunction) {
                value = sandbox.calculateFunction(value);
              }

              return value;
            });

          default:
            return [];
        }
      })
      .filter((script) => script !== undefined);

    const title = nodeTitle;
    let scriptHash;
    try {
      const hash = Tap.encodeScript(newScript);
      scriptHash = hash;
    } catch (err) {
      setError("Cannot parse one of the inputs");

      console.log("this is the script hash error: ", err);
      return;
    }
    const scriptSize = analyzeScriptHex(scriptHash!);
    const outputType = scriptTemplate.outputType;
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

    const newOutput: SCRIPT_LEAF = {
      id: selectedTaprootItem?.id || generateUUID(),
      outputType: outputType,
      title: title,
      script: newScript,
      scriptHash: scriptHash,
      scriptSize: scriptSize,
      description,
      scriptType: scriptTemplate.outputType,
      inputs: inputs,
    };

    if (selectedTaprootItem !== undefined && nodeLeaf.length > 0) {
      // check if the new output is already in the node leaf, then if not just add it
      const isAlreadyInNodeLeaf = nodeLeaf.some(
        (leaf) => leaf.id === newOutput.id
      );
      if (!isAlreadyInNodeLeaf) {
        const newNodeLeaf = [...nodeLeaf, newOutput];
        setNodeLeaf(newNodeLeaf);
        setSelectedTaprootItem(null);
      } else {
        // if it is already in the node leaf then update the prev one
        const newNodeLeaf = nodeLeaf.map((leaf) => {
          if (leaf.id === selectedTaprootItem?.id) {
            return { ...leaf, ...newOutput };
          }
          return leaf;
        });
        setNodeLeaf(newNodeLeaf);
        setSelectedTaprootItem(null);
      }
    } else {
      // check if the particular state is empty, if it's empty then you can add this as a new leaf else update the prev one
      const newNodeLeaf = [...nodeLeaf, newOutput];
      setNodeLeaf(newNodeLeaf);
      setSelectedTaprootItem(null);
    }

    setTaprootComponent(TaprootGenComponents.NewScriptPathView);
  };

  const handleSetNodeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    // get the title and then store it to the state
    setInputsTouched(true);
    setNodeTitle(e.target.value);
  };

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
                  <Input
                    name="Title"
                    onChange={handleSetNodeTitle}
                    value={nodeTitle}
                    placeholder="descriptional Tapleaf title"
                    className="h-14 w-full rounded-full bg-dark-purple px-8 text-lg"
                  />
                </div>
                <ScriptInputs
                  scriptInput={scriptInput}
                  formData={formData}
                  handleChange={handleChange}
                  validateInput={validateInput}
                />
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
            "mx-auto mb-3 block w-[95%] rounded-full px-6 py-3 text-left text-lg text-white no-underline transition-all duration-300 hover:bg-dark-purple",
            inputsTouched ? "border" : "",
            validForm
              ? "border-dark-orange bg-lighter-dark-purple"
              : inputsTouched
              ? "border-gray-800"
              : ""
          )}
          disabled={!validForm}
        >
          {inputsTouched ? (
            <div>
              <span className="font-thin text-white">Confirm TapLeaf </span>
              <span className="font-bold text-dark-orange">
                ({nodeLeaf.length + 1})
              </span>
              <span className="font-bold"> {nodeTitle} </span>
            </div>
          ) : (
            <p className="text-xl font-light italic text-zinc-700">
              Generating Output ScriptPubKey...fill in required inputs
            </p>
          )}
        </button>

        <div className="absolute right-12 top-1/2 -translate-y-1/2 flex-col justify-center">
          {validForm && (
            <CheckCircleIcon className="h-7 w-7 text-dark-orange" />
          )}
        </div>
      </div>
    </div>
  );
};
