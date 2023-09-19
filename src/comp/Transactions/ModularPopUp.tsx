import { useAtom, useAtomValue } from "jotai";
import { isClickedModularPopUpOpen, popUpExampleOpen } from "../atom";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import VersionPopUp from "./PopUpSections/VersionPopUp";
import LockTimePopUp from "./PopUpSections/LockTimePopUp";
import { TxTextSectionType } from "./Helper";
import ScriptSigPopUp from "./PopUpSections/ScriptSig";
import { TransactionItem, VersionItem } from "../../deserialization/model";

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

  console.log("modularPopUp", isClickedModularPopUp);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, top: position }}
        exit={{ opacity: 0 }}
        onClick={() => setIsClickedModularPopUp(false)}
        className="fixed inset-x-0 z-50 grid cursor-pointer overflow-y-scroll bg-inherit"
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
                  {title}
                </p>
              </div>

              <p className="max-w-[70%] overflow-hidden truncate text-[28px] font-semibold text-[#F79327]">
                {rawHex.length > 16 ? rawHex.slice(0, 16) + "..." : rawHex}
              </p>
            </div>
            <div>
              <hr className="mx-5 mt-3 h-0.5 flex-1 bg-[#F79327]" />
            </div>
            {type === TxTextSectionType.version && (
              <VersionPopUp {...(item as VersionItem)} />
            )}
            {(type === TxTextSectionType.lockTimeValue ||
              type === TxTextSectionType.inputSequence) && <LockTimePopUp />}
            {type === TxTextSectionType.inputScriptSig && <ScriptSigPopUp />}
            {type === TxTextSectionType.outputPubKeyScript && (
              <ScriptSigPopUp />
            )}
            {type === TxTextSectionType.witnessElementValue && (
              <ScriptSigPopUp />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModularPopUp;
