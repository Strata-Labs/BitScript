import { useAtomValue } from "jotai";
import { popUpExampleOpen } from "../atom";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import VersionPopUp from "./PopUpSections/VersionPopUp";
import LockTimePopUp from "./PopUpSections/LockTimePopUp";
import { TxTextSectionType } from "./Helper";
import ScriptSigPopUp from "./PopUpSections/ScriptSig";

interface ModularPopUpProps {
  Title: string;
  Value: string;
  txTextSectionType: TxTextSectionType;
  position: string;
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
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, top: position }}
        exit={{ opacity: 0 }}
        className="fixed inset-x-0 z-50 grid cursor-pointer overflow-y-scroll"
      >
        <motion.div
          initial={{ scale: 0, rotate: "0deg" }}
          animate={{ scale: 1, rotate: "0deg", top: "0" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="relative mx-10 flex cursor-default  flex-col overflow-hidden rounded-xl bg-white p-4 text-[#0C071D] shadow-xl md:ml-[280px]"
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
            {txTextSectionType === TxTextSectionType.version && (
              <VersionPopUp />
            )}
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
      </motion.div>
    </AnimatePresence>
  );
};

export default ModularPopUp;
