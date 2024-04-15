import { TransactionFeResponse } from "@/deserialization/model";
import { BTC_ENV, TransactionInputType } from "./DeserializeParent";
import { useState } from "react";

const stopErr = "";
const currentPath = stopErr;

const marginLeftClass = "md:ml-[250px] mt-5";

const textareaClass =
  "border border-dark-orange  min-h-[40px]  w-full rounded-full  bg-white px-8   text-black";

type DeserializeTxInputProps = {
  txData: TransactionFeResponse | null;
  //txInputError: string;
  txUserInput: string;
  setTxUserInput: (txUserInput: string) => void;
};

const DeserializeTxInput = ({
  setTxUserInput,
  txUserInput,
  txData,
}: DeserializeTxInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<any>) => {
    setTxUserInput(e.target.value);
  };

  //11904bf4607935ab83fb05dfe8f7727aac4ca430883f27548c13c0a7fbcf4551
  return (
    <div className="flex w-full flex-col gap-2  px-8">
      <p className="text-xl font-semibold text-black">Input</p>
      <div style={{ position: "relative" }}>
        <textarea
          onChange={handleTextAreaChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={textareaClass}
          value={txUserInput}
          disabled={txData !== null}
          placeholder="copy/paste a transaction ID, transaction hex, or script hex"
        ></textarea>
        <p className="text-md mt-4 font-thin text-black">
          Waiting for input to run
        </p>
      </div>
    </div>
  );
};

export default DeserializeTxInput;
