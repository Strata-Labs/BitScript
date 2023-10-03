import { useAtom, useAtomValue } from "jotai";
import router from "next/router";
import { isClickedModularPopUpOpen, isVersion, modularPopUp } from "../atom";
import {
  FLAG,
  INPUT_COUNT_DATA,
  INPUT_SCRIPTSIG,
  INPUT_SCRIPTSIGSIZE,
  INPUT_SEQUENCE,
  INPUT_TX_ID,
  INPUT_VOUT,
  LOCK_TIME,
  MARKER,
  OUTPUT_AMOUNT,
  OUTPUT_COUNT,
  OUTPUT_SCRIPT_PUB_KEY,
  OUTPUT_SCRIPT_PUB_SIZE,
  VERSION_DATA,
  VERSION_DATA_2,
  WITNESS_ELEMENT_SIZE,
  WITNESS_ELEMENT_VALUE,
  WITNESS_SIZE,
} from "../../const/deserializeTx";
import React, { useEffect, useRef, useState } from "react";
import { TransactionItem } from "../../deserialization/model";
import { usePlausible } from "next-plausible";

export enum TxTextSectionType {
  txType = "txType",
  version = "version",
  marker = "marker",
  flag = "flag",
  segwitVersion = "segwitVersion",

  /* Input Fields */
  inputCount = "inputCount",
  inputTxId = "inputTxId",
  inputVout = "inputVout",
  inputScriptSigSize = "inputScriptSigSize",
  inputScriptSig = "inputScriptSig",
  inputSequence = "inputSequence",
  /* Output Fields */
  outputCount = "outputCount",
  outputAmount = "outputAmount",
  outputPubKeySize = "outputScriptPubKeySize",
  outputPubKeyScript = "outputScriptPubKey",
  /* Witness Fields */
  witnessSize = "witnessSize",
  witnessElementSize = "witnessElementSize",
  witnessElementValue = "witnessElementValue",
  /* Lock Time Field */
  lockTimeValue = "lockTimeValue",
  /* In-Script Items*/
  opCode = "opCode",
  pushedData = "pushedData",
}
export type TxTextSectionProps = {
  transactionItem: TransactionItem;
  handleHover: (type: TransactionItem) => void;

  setIsClickedModularPopUp: (isClicked: boolean) => void;
  isClickedModularPopUp: boolean;
};

export const TxTextSection = ({
  transactionItem,
  handleHover,
  setIsClickedModularPopUp,
  isClickedModularPopUp,
}: TxTextSectionProps) => {
  const plausible = usePlausible();

  const [isModularPopUpOpen, setIsModularPopUpOpen] = useAtom(modularPopUp);
  const [version] = useAtomValue(isVersion);

  const { item, rawHex } = transactionItem;

  const { title, description, type } = item;

  const determineNumberSuffix = (itemIndex: number) => {
    // based on the index, determine the suffix
    // 1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th

    const suffixes = [
      "th",
      "st",
      "nd",
      "rd",
      "th",
      "th",
      "th",
      "th",
      "th",
      "th",
    ];

    const suffix = suffixes[itemIndex];

    return suffix;
  };

  const [isFreezedPopUP] = useAtom(isClickedModularPopUpOpen);

  const handleHoverAction = () => {
    if (router.pathname.startsWith("/transaction")) {
      handleHover(transactionItem);
    }
  };
  const [isTextClicked, setIsTextClicked] = useState(false);
  const ref = useRef(null);

  const handleTextClick = () => {
    setIsClickedModularPopUp(!isClickedModularPopUp);
    setIsTextClicked(true);

    plausible("Selected tx detail");
  };

  useEffect(() => {
    if (!isFreezedPopUP) {
      setIsTextClicked(false); // reset state when isFreezedPopUP changes to false
    }
  }, [isFreezedPopUP]);

  return (
    <span
      onClick={() => handleTextClick()}
      onMouseEnter={() => handleHoverAction()}
      onMouseLeave={() => setIsModularPopUpOpen(false)}
      className={`deserializeText text-md break-words rounded-md transition-all ${
        isTextClicked
          ? "bg-black text-[#F79327]"
          : isFreezedPopUP
          ? "text-black opacity-[25%]"
          : "text-black"
      } hover:bg-black hover:text-[#F79327]`}
    >
      {rawHex}
    </span>
  );
};

export const UnserializedText = ({ text }: { text: string }) => {
  return (
    <span className="deserializeText text-md break-words  rounded-md transition-all ">
      {text}
    </span>
  );
};
