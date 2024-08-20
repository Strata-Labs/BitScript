import React from "react";
import { ScriptInput } from "./ScriptInput";
import { SCRIPT_INPUT_TYPE, SCRIPT_INPUT_VALIDATOR } from "../types";

interface ScriptInputsProps {
  scriptInput: any[];
  formData: any;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    dynamic: boolean,
    validatorType: SCRIPT_INPUT_VALIDATOR
  ) => void;
  validateInput: (
    validator: SCRIPT_INPUT_VALIDATOR,
    value: string
  ) => { valid: boolean; message: string };
}

export const ScriptInputs: React.FC<ScriptInputsProps> = ({
  scriptInput,
  formData,
  handleChange,
  validateInput,
}) => {
  const renderInput = (input: any, index: number) => {
    switch (input.type) {
      case SCRIPT_INPUT_TYPE.DYNAMIC:
        return renderDynamicInput(input, index);
      case SCRIPT_INPUT_TYPE.THRESHOLD:
        return renderThresholdInput(input, index);
      case SCRIPT_INPUT_TYPE.SELECT:
        return renderSelectInput(input, index);
      default:
        return renderRegularInput(input, index);
    }
  };

  const renderDynamicInput = (input: any, index: number) => {
    const dependentValue = formData[input.dependsOn || ""]?.value;
    const totalFields = parseInt(dependentValue, 10) || 0;

    return (
      <React.Fragment key={`dynamic-${index}`}>
        {Array.from({ length: totalFields }).map((_, fieldIndex) => (
          <ScriptInput
            key={`${input.scriptSandBoxInputName}-${fieldIndex}`}
            value={
              formData[`${input.scriptSandBoxInputName}-${fieldIndex}`]?.value
            }
            onChange={(e) => handleChange(e, true, input.validator!)}
            label={`${input.label} #${fieldIndex + 1}`}
            placeholder={input.placeholder}
            scriptSandBoxInputName={`${input.scriptSandBoxInputName}-${fieldIndex}`}
            valid={validateInput(
              input.validator!,
              formData[`${input.scriptSandBoxInputName}-${fieldIndex}`]?.value
            )}
            touched={
              formData[`${input.scriptSandBoxInputName}-${fieldIndex}`]
                ?.touched || false
            }
          />
        ))}
      </React.Fragment>
    );
  };

  const renderThresholdInput = (input: any, index: number) => {
    const nextInput = scriptInput[index + 1];
    if (
      nextInput &&
      (nextInput.scriptSandBoxInputName === "requiredSignatures" ||
        nextInput.scriptSandBoxInputName === "totalPublicKeys")
    ) {
      return (
        <div key={index} className="flex flex-col gap-1">
          <p className="text-md font-semibold text-white">M-of-N Threshold</p>
          <div className="flex w-full flex-row gap-4">
            <ScriptInput
              key={`${index}-1`}
              value={formData[input.scriptSandBoxInputName]?.value}
              onChange={(e) =>
                handleChange(e, false, SCRIPT_INPUT_VALIDATOR.DECIMAL)
              }
              placeholder={input.placeholder}
              scriptSandBoxInputName={input.scriptSandBoxInputName}
              valid={validateInput(
                SCRIPT_INPUT_VALIDATOR.DECIMAL,
                formData[input.scriptSandBoxInputName]?.value
              )}
              touched={formData[input.scriptSandBoxInputName]?.touched || false}
              width="w-1/2"
            />
            <ScriptInput
              key={`${index}-2`}
              value={formData[nextInput.scriptSandBoxInputName]?.value}
              onChange={(e) =>
                handleChange(e, false, SCRIPT_INPUT_VALIDATOR.DECIMAL)
              }
              placeholder={nextInput.placeholder}
              scriptSandBoxInputName={nextInput.scriptSandBoxInputName}
              valid={validateInput(
                SCRIPT_INPUT_VALIDATOR.DECIMAL,
                formData[nextInput.scriptSandBoxInputName]?.value
              )}
              touched={
                formData[nextInput.scriptSandBoxInputName]?.touched || false
              }
              width="w-1/2"
            />
          </div>
        </div>
      );
    }
    return null;
  };

  const renderSelectInput = (input: any, index: number) => {
    return (
      <div key={index} className="flex flex-col gap-1">
        <label className="text-md font-semibold text-white">
          {input.label}
        </label>
        <div className="relative">
          <select
            value={formData[input.scriptSandBoxInputName]?.value || ""}
            onChange={(e) => handleChange(e, false, input.validator!)}
            name={input.scriptSandBoxInputName}
            className="h-14 w-full appearance-none rounded-full bg-dark-purple border border-white px-8 pr-12 text-lg text-white focus:border-dark-orange focus-visible:outline-none"
          >
            <option value="">Select an option</option>
            {input.options.map((option: string, optionIndex: number) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
            <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  const renderRegularInput = (input: any, index: number) => {
    return (
      <ScriptInput
        key={index}
        value={formData[input.scriptSandBoxInputName]?.value}
        onChange={(e) => handleChange(e, false, input.validator!)}
        label={input.label}
        placeholder={input.placeholder}
        scriptSandBoxInputName={input.scriptSandBoxInputName}
        valid={validateInput(
          input.validator!,
          formData[input.scriptSandBoxInputName]?.value
        )}
        touched={formData[input.scriptSandBoxInputName]?.touched || false}
      />
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {scriptInput.map((input, index) => renderInput(input, index))}
    </div>
  );
};