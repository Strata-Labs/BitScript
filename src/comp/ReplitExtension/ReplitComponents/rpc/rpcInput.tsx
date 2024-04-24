import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export enum PARAMETER_TYPE {
  string = "string",
  number = "number",
  boolean = "boolean",
  json = "json",
  three = "three",
  enum = "enum",
}
export type MethodInputs = {
  method: string;
  description: string;
  required?: boolean;
  type: PARAMETER_TYPE;
  defaultValue?: string | number | boolean;
  enumValues?: (string | number | boolean)[];
};
type InputParamsProps = MethodInputs & {
  index: number;
  handleUpdateParent: (index: number, value: string | number | boolean) => void;
  handleRemoveKey: (index: number) => void;
};
export const InputParams = ({
  description,
  index,
  method,
  required,
  handleUpdateParent,
  handleRemoveKey,
  type,
  defaultValue,
  enumValues,
}: InputParamsProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [focused, setFocused] = useState(false);

  const [err, setErr] = useState<null | string>(null);

  const [value, setValue] = useState("");
  const [parsedValue, setParsedValue] = useState<
    string | number | boolean | null
  >(null);

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue.toString());
      setParsedValue(defaultValue);
      setIsValid(true);
    }
  }, []);

  useEffect(() => {
    if (isValid) {
      if (parsedValue !== null) {
        handleUpdateParent(index, parsedValue);
      }
    } else {
      if (defaultValue !== undefined) {
        handleUpdateParent(index, defaultValue);
      } else {
        handleRemoveKey(index);
      }
    }
  }, [isValid, parsedValue]);

  // create a useEffect that will get the width of the parent container container so that way i can ensure the text area is the same width
  // as the parent container

  useEffect(() => {
    // get the width of element by id inputparams-container
    const container = document.getElementById("inputparams-container");
    if (container && textAreaRef.current) {
      const width = container.offsetWidth;

      textAreaRef.current.style.width = `${width}px`;
    }
  }, []);
  const handleBooleanChange = (value: boolean) => {
    setParsedValue(value);
    setValue(value.toString());
    setIsValid(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    if (type === PARAMETER_TYPE.string) {
      // if the value is string then it's almost always valid
      console.log("param is string")
      setValue(inputValue);
      handleUpdateParent(index, inputValue);
      setParsedValue(inputValue);
      if (isValid === false) {
        setIsValid(true);
      }
    } else if (type === PARAMETER_TYPE.number) {
      console.log("inputValue.match(/^[0-9]*$/", inputValue.match(/^[0-9]*$/));
      if (inputValue.match(/^[0-9]*$/)) {
        const parsedValue = parseInt(inputValue);
        setParsedValue(parsedValue);

        setValue(inputValue);

        handleUpdateParent(index, parsedValue);
        if (err) {
          setErr(null);
        }
        if (isValid === false) {
          setIsValid(true);
        }
      } else {
        setErr("Only numbers are allowed");
        setValue(inputValue);
        if (true) {
          setIsValid(false);
        }
      }
    } else if (type === PARAMETER_TYPE.three) {
      // ensure input is a number and it's less than 3 but more than 0
      if (
        inputValue.match(/^[0-9]*$/) &&
        parseInt(inputValue) <= 3 &&
        parseInt(inputValue) > 0
      ) {
        const parsedValue = parseInt(inputValue);
        setParsedValue(parsedValue);

        setValue(inputValue);

        handleUpdateParent(index, parsedValue);
        if (err) {
          setErr(null);
        }
        if (isValid === false) {
          setIsValid(true);
        }
      } else {
        setErr("Only numbers are allowed and it must be less than 3");
        setValue(inputValue);
        if (true) {
          setIsValid(false);
        }
      }
    }
  };


  const handleSelectEnum = (index: number) => {
    console.log("handleSelectEnum", index);
    if (enumValues) {
      setParsedValue(enumValues[index]);
      setIsValid(true);
    }
  };
  return (
    <div
      className={cn(
        "flex h-fit w-full flex-col rounded-full  bg-[#F3F3F3]  pb-4"
      )}
      style={{ position: "relative" }}
    >
      <textarea
        className={cn(
          " no-outline h-fit resize-y rounded-full bg-transparent pl-10 pr-16 pt-6 text-lg text-black "
        )}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={handleChange}
        value={value}
        disabled={
          type === PARAMETER_TYPE.boolean || type === PARAMETER_TYPE.enum
        }
        ref={textAreaRef}
      ></textarea>

      <AnimatePresence>
        {!value && !focused && (
          <motion.span
            key="input-param-span-1"
            initial={{ x: "0", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
            style={{
              position: "absolute",
              top: "20%",
              left: "40px",
              transform: "translateY(-50%)",
              color: "black",
              cursor: "text",
            }}
            onClick={() =>
              type === PARAMETER_TYPE.boolean
                ? null
                : textAreaRef.current && textAreaRef.current.focus()
            }
            className="text-[12px]  md:text-[16px]"
          >
            <strong>{method}</strong>{" "}
            {required ? (
              <>
                {" "}
                <strong className="text-italic text-xs">(required)</strong>{" "}
                {" - "}{" "}
              </>
            ) : (
              " "
            )}
            {description}
          </motion.span>
        )}
        {err !== null && value !== "" && (
          <span
            key="input-param-span-2"
            style={{
              position: "absolute",
              top: "40%",
              right: "40px",
              transform: "translateY(-50%)",
              color: "red",
              cursor: "text",
            }}
            className="text-[12px] md:text-[16px]"
          >
            <strong>{err}</strong>{" "}
          </span>
        )}
        {type === PARAMETER_TYPE.boolean && (
          <motion.div
            key="input-param-div-3"
            className="flex h-full flex-col justify-center pl-10 text-[12px] md:text-[16px]"
          >
            <div className="flex items-start gap-3 rounded-full bg-[#F3F3F3]">
              <button
                className={`ml-1 h-[30px] w-[100px] rounded-full border-2 border-[#0C071D] ${
                  parsedValue === true
                    ? "bg-[#0C071D] text-white"
                    : "bg-white text-[#0C071D]"
                }`}
                onClick={() => handleBooleanChange(true)}
              >
                TRUE
              </button>
              <button
                className={`mr-1 h-[30px] w-[100px] rounded-full border-2 border-[#0C071D] ${
                  parsedValue === false
                    ? "bg-[#0C071D] text-white"
                    : "bg-white text-[#0C071D]"
                }`}
                onClick={() => handleBooleanChange(false)}
              >
                FALSE
              </button>
            </div>
          </motion.div>
        )}

        {type === PARAMETER_TYPE.enum && (
          <motion.div
            key="input-param-div-4"
            className="flex h-full  pl-10 text-[12px] md:text-[16px]"
          >
            <div className="flex h-[42px] flex-row rounded-full bg-[#F3F3F3]">
              {enumValues &&
                enumValues.map((d, i) => {
                  return (
                    <button
                      key={"enum" + i}
                      onClick={() => handleSelectEnum(i)}
                      className={`ml-1 h-[30px] rounded-full border-2 border-[#0C071D] px-4 ${
                        parsedValue === d
                          ? "bg-[#0C071D] text-white"
                          : "bg-white text-[#0C071D]"
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
            </div>
          </motion.div>
        )}

        {isValid && parsedValue !== null && err == null && (
          <motion.div
            key="input-param-div-5"
            initial={{ x: "0", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
            style={{
              right: "45px",
            }}
            className="absolute flex h-full flex-col justify-center text-[12px] md:text-[16px]"
          >
            <CheckCircleIcon className="h-5 w-5 text-dark-orange" />
          </motion.div>
        )}
        {required && !isValid && (
          <motion.div
            key="input-param-div-6"
            initial={{ x: "0", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
            style={{
              right: "45px",
            }}
            className="absolute flex h-full flex-col justify-center text-[12px] md:text-[16px]"
          >
            <div
              className={cn(
                "h-5 w-5 rounded-full border-2 border-dark-orange transition-all ",
                isValid && "bg-dark-orange"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
