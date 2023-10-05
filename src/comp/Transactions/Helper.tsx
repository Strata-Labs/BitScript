import { useAtom, useAtomValue } from "jotai";
import router from "next/router";
import {
  TxTextSectionClickScript,
  TxTextSectionHoverScript,
  isClickedModularPopUpOpen,
  isVersion,
  modularPopUp,
} from "../atom";
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
import { txDataAtom } from "./TransactionsView";
import { classNames } from "@/utils";

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
  dataItemIndex: number;
};

export const TxTextSection = ({
  transactionItem,
  handleHover,
  setIsClickedModularPopUp,
  isClickedModularPopUp,
  dataItemIndex,
}: TxTextSectionProps) => {
  const plausible = usePlausible();

  const [isModularPopUpOpen, setIsModularPopUpOpen] = useAtom(modularPopUp);

  const [txTextSectionHoverScript, setTxTextSectionHoverScript] = useAtom(
    TxTextSectionHoverScript
  );

  const [txTextSectionClickScript, setTxTextSectionClickScript] = useAtom(
    TxTextSectionClickScript
  );

  const txData = useAtomValue(txDataAtom);

  const { item, rawHex } = transactionItem;

  const [isFreezedPopUP] = useAtom(isClickedModularPopUpOpen);

  const handleHoverAction = () => {
    // if the user is hovering over the first character in a script we need to kinda highlight the whole script
    if (transactionItem.item.type === TxTextSectionType.inputScriptSig) {
      // get the whole content of this script
      const wholeScript = transactionItem.item.value;

      // we have a couple options
      // parse through the whole script and find the index of items within the script we're going through

      let script = "";

      const copOut: number[] = [];
      const scriptItemIndex = txData?.hexResponse.parsedRawHex.forEach(
        (d, i) => {
          // check that we're one index ahead of the current index
          if (i >= dataItemIndex) {
            // we're going to append the hex of the current item to the script until it's identical to whole script
            script = script + d.rawHex;
            if (script.length <= wholeScript.length) {
              copOut.push(i);
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
      );

      setTxTextSectionHoverScript(copOut);
    }
    // everything else stays the same
    if (router.pathname.startsWith("/transaction")) {
      handleHover({ ...transactionItem, dataItemIndex: dataItemIndex });
    }
  };
  const [isTextClicked, setIsTextClicked] = useState(false);
  const ref = useRef(null);

  const handleTextClick = () => {
    if (transactionItem.item.type === TxTextSectionType.inputScriptSig) {
      setTxTextSectionClickScript(txTextSectionHoverScript);
    }
    setIsClickedModularPopUp(!isClickedModularPopUp);
    setIsTextClicked(true);

    plausible("Selected tx detail");
  };

  useEffect(() => {
    if (!isFreezedPopUP) {
      setIsTextClicked(false); // reset state when isFreezedPopUP changes to false
    }
  }, [isFreezedPopUP]);

  // helper to determine if the user is hovering over the first character in a script which should highlight the whole script
  const shouldShowFromScriptHover = txTextSectionHoverScript.find((d) => {
    return d === dataItemIndex;
  });

  // helper to determine if the user has clicked on the first character in a script which should highlight the whole script
  const shouldShowFromScriptClick = txTextSectionClickScript.find((d) => {
    return d === dataItemIndex;
  });

  const handleMouseLeave = () => {
    setIsModularPopUpOpen(false);
    if (txTextSectionHoverScript.length > 0) {
      setTxTextSectionHoverScript([]);
    }
  };

  return (
    <span
      onClick={() => handleTextClick()}
      onMouseEnter={() => handleHoverAction()}
      onMouseLeave={() => handleMouseLeave()}
      className={classNames(
        "deserializeText text-md  break-words rounded-md py-1 text-black transition-all hover:bg-black hover:text-dark-orange",
        isTextClicked
          ? "bg-black text-dark-orange"
          : isFreezedPopUP
          ? "text-black opacity-[25%]"
          : shouldShowFromScriptClick &&
            "bg-black text-dark-orange opacity-[25%]",
        shouldShowFromScriptHover && "bg-black text-dark-orange"
      )}
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
