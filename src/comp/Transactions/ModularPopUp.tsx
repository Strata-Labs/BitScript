import { useAtom, useAtomValue } from "jotai";
import { isClickedModularPopUpOpen, popUpExampleOpen } from "../atom";
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VersionPopUp from "./PopUpSections/VersionPopUp";
import LockTimePopUp from "./PopUpSections/LockTimePopUp";
import { TxTextSectionType } from "./Helper";
import ScriptSigPopUp from "./PopUpSections/ScriptSig";

interface ModularPopUpProps {
  Title: string;
  Value: string;
  txTextSectionType: TxTextSectionType;
  position: number;
  dataIndex?: string;
}

const ModularPopUp: React.FC<ModularPopUpProps> = ({
  Title,
  Value,
  txTextSectionType,
  position,
  dataIndex,
  // LockTime
}) => {
  const [isClickedModularPopUp, setIsClickedModularPopUp] = useAtom(
    isClickedModularPopUpOpen
  );

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
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsClickedModularPopUp(false)}
        className="fixed inset-0 z-40 grid cursor-pointer place-items-center overflow-y-scroll p-8"
        style={{ display: isClickedModularPopUp ? "grid" : "none" }}
      ></motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: "0deg", y: position }}
        exit={{ scale: 0, rotate: "0deg" }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-50 flex cursor-default flex-col items-center overflow-hidden rounded-xl bg-white p-6 text-[#0C071D] shadow-xl"
      >
        <div className="flex flex-col">
          <div className="mx-5 mt-5 flex flex-row justify-between">
            <div className="flex flex-row items-center justify-center gap-x-1">
              <p className="text-[28px] font-semibold text-[#0C071D]">
                {Title}
              </p>
              {dataIndex && (
                <span className="text-lg  text-[#0C071D]">{dataIndex}</span>
              )}
            </div>

            <p className="max-w-[70%] overflow-hidden truncate text-[28px] font-semibold text-[#F79327]">
              {Value.length > 16 ? Value.slice(0, 16) + "..." : Value}
            </p>
          </div>
          <div>
            <hr className="mx-5 mt-3 h-0.5 flex-1 bg-[#F79327]" />
          </div>
          {txTextSectionType === TxTextSectionType.version && <VersionPopUp />}
          {(txTextSectionType === TxTextSectionType.lockTimeValue ||
            txTextSectionType === TxTextSectionType.inputSequence) && (
            <LockTimePopUp />
          )}
          {txTextSectionType === TxTextSectionType.inputScriptSig && (
            <ScriptSigPopUp />
          )}
          {txTextSectionType === TxTextSectionType.outputPubKeyScript && (
            <ScriptSigPopUp />
          )}
          {txTextSectionType === TxTextSectionType.witnessElementValue && (
            <ScriptSigPopUp />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModularPopUp;
