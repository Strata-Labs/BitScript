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
  TransactionItem,
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

interface ModularPopUpProps {
  position: string;
  popUpData: TransactionItem;
}

const ModularPopUp = ({
  position,
  popUpData, // LockTime
}: ModularPopUpProps) => {
  const [isClickedModularPopUp, setIsClickedModularPopUp] = useAtom(
    isClickedModularPopUpOpen
  );

  const { item, rawHex } = popUpData;
  const { title, type } = item;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsClickedModularPopUp(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  console.log("modularPopUp", isClickedModularPopUp);

  const renderView = () => {
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
  return (
    <AnimatePresence key="modularPopUp">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsClickedModularPopUp(false)}
        className="fixed inset-0 z-40 grid cursor-pointer place-items-center overflow-y-scroll p-8"
        style={{ display: isClickedModularPopUp ? "grid" : "none" }}
      ></motion.div>
      <motion.div
        initial={{ scale: 1, y: 300 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0, y: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-50 ml-5 flex w-[82%]  cursor-default flex-col items-center overflow-hidden rounded-xl bg-white p-6 text-[#0C071D] shadow-xl md:ml-[270px] "
      >
        <div className="flex w-full  flex-col">
          <div className="mx-5 mt-5 flex flex-row justify-between">
            <div className="flex flex-row items-center justify-center gap-x-1">
              <p className="text-[28px] font-semibold text-[#0C071D]">
                {title}
              </p>
            </div>

            <p className="max-w-[70%] overflow-hidden truncate text-[28px] font-semibold text-[#F79327]">
              {rawHex.length > 8
                ? rawHex.slice(0, 8) + "..." + rawHex.slice(-8)
                : rawHex}
            </p>
          </div>

          <div>
            <hr className="mx-5 mt-3 h-0.5 flex-1 bg-[#F79327]" />
          </div>
          {renderView()}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModularPopUp;
