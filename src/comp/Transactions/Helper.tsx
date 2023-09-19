import { useAtom, useAtomValue } from "jotai";
import { isVersion, modularPopUp } from "../atom";
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
import React from "react";
import { TransactionItem } from "../../deserialization/model";

export enum TxTextSectionType {
  txType = "txType",
  version = "version",
  marker = "marker",
  flag = "flag",

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
  const handleHoverAction = () => {
    handleHover(transactionItem);
  };

  const handleTextClick = () => {
    setIsClickedModularPopUp(!isClickedModularPopUp);
  };
  return (
    <span
      onClick={() => handleTextClick()}
      onMouseEnter={() => handleHoverAction()}
      onMouseLeave={() => setIsModularPopUpOpen(false)}
      className="deserializeText text-md break-words  rounded-md transition-all hover:bg-black  hover:text-[#F79327]"
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
export type ModularPopUpDataProps = {
  Title: string;
  Value: string | number;
  Content: string;
  Content2: string;
  Content3: string;
  dataIndex?: string;
  txTextSectionType: TxTextSectionType;
  // LockTime
  Title1: string;
  Cont1: string;
  Title2: string;
  Cont2: string;
  Bottom1: string;
  Bottom2: string;
};
