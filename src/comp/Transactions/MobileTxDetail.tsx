import { TransactionItem } from "@/deserialization/model";

import { useAtom, useAtomValue } from "jotai";
import { isClickedModularPopUpOpen, popUpExampleOpen } from "../atom";
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VersionPopUp from "./PopUpSections/VersionPopUp";
import LockTimePopUp from "./PopUpSections/LockTimePopUp";
import { TxTextSectionType } from "./Helper";
import ScriptSigPopUp from "./PopUpSections/ScriptSig";
import {
  CountItem,
  InputTXIDItem,
  InputVOUTItem,
  OutputAmountItem,
  VersionItem,
} from "../../deserialization/model";
import TxId from "./PopUpSections/TxId";
import InputCount from "./PopUpSections/InputCount";
import VOut from "./PopUpSections/VOut";
import ScriptSigSize from "./PopUpSections/ScriptSigSize";
import WitnessElementSize, {
  ElementSize,
} from "./PopUpSections/WitnessElementCount";
import Amount from "./PopUpSections/Amount";
import ScriptPubKeySize from "./PopUpSections/ScriptPubKeySize";
import Marker, { Flag } from "./PopUpSections/MarkerFlag";

type MobileTxDetailProps = {
  popUpData: TransactionItem | null;
  closePopUp: (status: boolean) => void;
};

const MobileTxDetail = ({ popUpData }: MobileTxDetailProps) => {
  if (!popUpData) {
    return null;
  }

  const renderView = () => {
    const item = popUpData.item;

    const type = item.type;

    switch (type) {
      case TxTextSectionType.version:
        return <VersionPopUp {...(item as VersionItem)} />;
      case TxTextSectionType.inputSequence:
        return <LockTimePopUp value={item.value} />;
      case TxTextSectionType.lockTimeValue:
        return <LockTimePopUp value={item.value} />;
      case TxTextSectionType.inputScriptSig:
        return <ScriptSigPopUp />;
      case TxTextSectionType.outputPubKeyScript:
        return <ScriptSigPopUp />;
      case TxTextSectionType.witnessElementValue:
        return <ScriptSigPopUp />;
      case TxTextSectionType.inputTxId:
        return <TxId {...(item as InputTXIDItem)} />;
      case TxTextSectionType.inputCount:
        return <InputCount {...(item as CountItem)} />;
      case TxTextSectionType.outputCount:
        return <InputCount {...(item as CountItem)} />;
      case TxTextSectionType.inputVout:
        return <VOut {...(item as InputVOUTItem)} />;
      case TxTextSectionType.inputScriptSigSize:
        return <ScriptSigSize />;
      case TxTextSectionType.witnessElementSize:
        return <ElementSize />;
      case TxTextSectionType.witnessSize:
        return <WitnessElementSize />;
      case TxTextSectionType.outputAmount:
        return <Amount {...(item as OutputAmountItem)} />;
      case TxTextSectionType.outputPubKeySize:
        return <ScriptPubKeySize />;
      case TxTextSectionType.marker:
        return <Marker />;
      case TxTextSectionType.flag:
        return <Flag />;
      default:
        return <></>;
    }
  };

  const renderValue = () => {
    const item = popUpData.item;

    const type = item.type;
    const value = item.value;

    if (
      type === TxTextSectionType.outputPubKeySize ||
      type === TxTextSectionType.witnessElementSize ||
      type === TxTextSectionType.inputScriptSigSize
    ) {
      return value;
    } else {
      return value.length > 12
        ? value.slice(0, 8) + "..." + value.slice(-8)
        : value;
    }
  };

  return (
    <>
      <div className="flex w-[80vw] flex-col items-center ">
        <p className="text-xl font-semibold text-dark-orange">
          {renderValue()}
        </p>
        <div className="my-3 h-[1px] w-full rounded-xl bg-dark-orange" />
        <p className="text-xl font-semibold text-black">
          {popUpData.item.title}
        </p>
        <div className="text-center">{renderView()}</div>
      </div>
    </>
  );
};

export default MobileTxDetail;
