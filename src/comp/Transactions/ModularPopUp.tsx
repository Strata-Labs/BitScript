import { useAtom, useAtomValue } from "jotai";
import {
  TxTextSectionClickScript,
  isClickedModularPopUpOpen,
  popUpExampleOpen,
} from "../atom";
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VersionPopUp from "./PopUpSections/VersionPopUp";
import LockTimePopUp from "./PopUpSections/LockTimePopUp";
import { TxTextSectionType } from "./Helper";
import ScriptSigPopUp from "./PopUpSections/ScriptSig";
import {
  BaseTransactionItem,
  CountItem,
  InputScriptSigItem,
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
import WitnessElementValue from "./PopUpSections/WitnessElementValue";
import OpCode from "./PopUpSections/OpCode";
import PushedData from "./PopUpSections/PushedData";
import Image from "next/image";

import schorKey from "@/../public/images/schnorrSig.png";
import signatureIcon from "@/../public/images/signatureIcon.png";
import hashPublicKey from "@/../public/images/hashPublicKey.png";
import scriptIcon from "@/../public/images/scriptIcon.png";

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

  const [txTextSectionClickScript, setTxTextSectionClickScript] = useAtom(
    TxTextSectionClickScript
  );

  const { item, rawHex } = popUpData;
  const { title, type, value } = item;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsClickedModularPopUp(false);
      setTxTextSectionClickScript([]);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const renderView = () => {
    switch (type) {
      case TxTextSectionType.version:
        return <VersionPopUp {...(item as VersionItem)} />;
      case TxTextSectionType.inputSequence:
        return <LockTimePopUp {...(item as BaseTransactionItem)} />;
      case TxTextSectionType.lockTimeValue:
        return <LockTimePopUp {...(item as BaseTransactionItem)} />;
      case TxTextSectionType.inputScriptSig:
        const props = {
          ...popUpData,
          item: popUpData.item as InputScriptSigItem,
        };
        return <ScriptSigPopUp {...props} />;
      case TxTextSectionType.outputPubKeyScript:
        const props2 = {
          ...popUpData,
          item: popUpData.item as InputScriptSigItem,
        };
        return <ScriptSigPopUp {...props2} />;

      case TxTextSectionType.witnessElementValue:
        return <WitnessElementValue />;
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
      case TxTextSectionType.opCode:
        return <OpCode {...popUpData} />;
      case TxTextSectionType.pushedData:
        return <PushedData {...popUpData} />;

      default:
        return <></>;
    }
  };

  const renderValue = () => {
    if (
      type === TxTextSectionType.outputPubKeySize ||
      type === TxTextSectionType.witnessElementSize ||
      type === TxTextSectionType.opCode ||
      type === TxTextSectionType.inputScriptSigSize ||
      type === TxTextSectionType.inputSequence ||
      type === TxTextSectionType.lockTimeValue
    ) {
      return value;
    } else {
      return value.length > 8
        ? value.slice(0, 8) + "..." + value.slice(-8)
        : value;
    }
  };

  const handleRenderIcon = () => {
    // ensure
    const { type, title } = popUpData.item;

    if (type === TxTextSectionType.pushedData) {
      let image: any = "";
      if (title === "Signature (schnorr)") {
        image = schorKey;
      } else if (title === "Signature (ecdsa)") {
        image = signatureIcon;
      } else if (title === "Hashed Public Key") {
        image = hashPublicKey;
      } else if (
        title === "Script" ||
        title === "ScriptPubKey" ||
        title === "ScriptSig" ||
        title === "Redeem Script"
      ) {
        image = scriptIcon;
      }

      if (image === "") {
        return null;
      } else {
        return <Image src={image} alt="schnorr key" width={50} height={50} />;
      }
    }

    return null;
  };
  return (
    <AnimatePresence key="modularPopUp">
      <motion.div
        key={"asdjf"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsClickedModularPopUp(false)}
        className="fixed inset-0 z-40 grid cursor-pointer place-items-center overflow-y-scroll p-8"
        style={{ display: isClickedModularPopUp ? "grid" : "none" }}
      ></motion.div>
      <motion.div
        key={"asdjfasdfsd"}
        initial={{ scale: 1, y: 300 }}
        animate={{ scale: 1, y: position }}
        exit={{ scale: 0, y: 300 }}
        onClick={(e) => e.stopPropagation()}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="z-50 ml-5 flex w-[82%]  cursor-default flex-col items-center overflow-hidden rounded-xl bg-white p-6 text-[#0C071D] shadow-xl md:mb-10 md:ml-[270px]"
      >
        {popUpData && (
          <div className="flex w-full  flex-col">
            <div className="mx-5 mt-5 flex flex-row justify-between">
              <div className="flex flex-row items-center justify-center gap-x-1">
                <p className="text-[28px] font-semibold text-[#0C071D]">
                  {title}
                </p>
              </div>
              <div className="flex flex-row items-center">
                {handleRenderIcon()}
                <p className=" overflow-hidden truncate text-[28px] font-semibold text-[#F79327]">
                  {renderValue()}
                </p>
              </div>
            </div>

            <div>
              <hr className="mx-5 mt-3 h-0.5 flex-1 bg-[#F79327]" />
            </div>
            <div className="my-6">{renderView()}</div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ModularPopUp;
