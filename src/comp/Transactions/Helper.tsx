import { useAtom } from "jotai";
import { modularPopUp } from "../atom";
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
  WITNESS_ELEMENT_SIZE,
  WITNESS_ELEMENT_VALUE,
  WITNESS_SIZE,
} from "@/const/deserializeTx";

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
  text: string | undefined | number;
  type: TxTextSectionType;
  handleHover: (type: ModularPopUpDataProps) => void;
  inputIndex?: number;
  setIsClickedModularPopUp: (isClicked: boolean) => void;
  isClickedModularPopUp: boolean;
};
export const TxTextSection = ({
  text,
  type,
  handleHover,
  inputIndex,
  setIsClickedModularPopUp,
  isClickedModularPopUp,
}: TxTextSectionProps) => {
  const [isModularPopUpOpen, setIsModularPopUpOpen] = useAtom(modularPopUp);

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
    let displayData: ModularPopUpDataProps = {
      Title: "",
      Value: text ? text : "",
      txTextSectionType: type,
      Content: "",
      Content2: "",
      Content3: "",
      dataIndex: undefined,
      // LockTime
      Title1: "",
      Cont1: "",
      Title2: "",
      Cont2: "",
      Bottom1: "",
      Bottom2: "",
    };

    const itemIndex = inputIndex ? inputIndex + 1 : 1;

    switch (type) {
      case TxTextSectionType.inputSequence:
        displayData = {
          ...displayData,
          ...INPUT_SEQUENCE,
        };
        break;
      case TxTextSectionType.inputScriptSig:
        displayData = {
          ...displayData,
          ...INPUT_SCRIPTSIG,
          dataIndex: `(${itemIndex}${determineNumberSuffix(itemIndex)} input)`,
        };
        break;
      case TxTextSectionType.inputScriptSigSize:
        displayData = {
          ...displayData,
          ...INPUT_SCRIPTSIGSIZE,
          dataIndex: `(${itemIndex}${determineNumberSuffix(itemIndex)} input)`,
        };
        break;
      case TxTextSectionType.inputVout:
        displayData = {
          ...displayData,
          ...INPUT_VOUT,
          dataIndex: `(${itemIndex}${determineNumberSuffix(itemIndex)} input)`,
        };
        break;
      case TxTextSectionType.version:
        displayData = {
          ...displayData,
          ...VERSION_DATA,
        };
        break;
      case TxTextSectionType.inputCount:
        displayData = {
          ...displayData,
          ...INPUT_COUNT_DATA,
        };
        break;
      case TxTextSectionType.inputTxId:
        // get the proper
        displayData = {
          ...displayData,
          ...INPUT_TX_ID,
          dataIndex: `(${itemIndex}${determineNumberSuffix(itemIndex)} input)`,
        };
        break;
      case TxTextSectionType.outputCount:
        displayData = {
          ...displayData,
          ...OUTPUT_COUNT,
        };
        break;
      case TxTextSectionType.outputAmount:
        displayData = {
          ...displayData,
          ...OUTPUT_AMOUNT,
          dataIndex: `(${itemIndex}${determineNumberSuffix(itemIndex)} output)`,
        };
        break;
      case TxTextSectionType.outputPubKeySize:
        displayData = {
          ...displayData,
          ...OUTPUT_SCRIPT_PUB_SIZE,
          dataIndex: `(${itemIndex}${determineNumberSuffix(itemIndex)} output)`,
        };
        break;
      case TxTextSectionType.outputPubKeyScript:
        displayData = {
          ...displayData,
          ...OUTPUT_SCRIPT_PUB_KEY,
          dataIndex: `(${itemIndex}${determineNumberSuffix(itemIndex)} output)`,
        };
        break;
      case TxTextSectionType.witnessSize:
        displayData = {
          ...displayData,
          ...WITNESS_SIZE,
          dataIndex: `(${itemIndex}${determineNumberSuffix(
            itemIndex
          )} element)`,
        };
        break;
      case TxTextSectionType.witnessElementSize:
        displayData = {
          ...displayData,
          ...WITNESS_ELEMENT_SIZE,
          dataIndex: `(${itemIndex}${determineNumberSuffix(
            itemIndex
          )} element)`,
        };
        break;
      case TxTextSectionType.witnessElementValue:
        displayData = {
          ...displayData,
          ...WITNESS_ELEMENT_VALUE,
          dataIndex: `(${itemIndex}${determineNumberSuffix(
            itemIndex
          )} element)`,
        };
        break;
      case TxTextSectionType.lockTimeValue:
        displayData = {
          ...displayData,
          ...LOCK_TIME,
        };
        break;
      case TxTextSectionType.flag:
        displayData = {
          ...displayData,
          ...FLAG,
        };
        break;
      case TxTextSectionType.marker:
        displayData = {
          ...displayData,
          ...MARKER,
        };
        break;
    }

    handleHover(displayData);
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
      {text}
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
