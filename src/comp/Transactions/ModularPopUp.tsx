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
  popUpData: TransactionItem | null;
}

const ModularPopUp = ({
  popUpData, // LockTime
}: ModularPopUpProps) => {
  const [isClickedModularPopUp, setIsClickedModularPopUp] = useAtom(
    isClickedModularPopUpOpen
  );

  const [txTextSectionClickScript, setTxTextSectionClickScript] = useAtom(
    TxTextSectionClickScript
  );

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

  useEffect(() => {
    const ele = document.getElementById("modularPopUpSat");
    if (ele) {
      ele.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    }
    return () => {
      if (ele) {
        ele.removeEventListener("click", function (e) {
          e.stopPropagation();
        });
      }
    };
  }, []);
  const renderView = () => {
    if (popUpData) {
      const { type, value } = popUpData.item;
      const item = popUpData.item;

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
            dataItemIndex: popUpData.dataItemIndex,
          };
          return <ScriptSigPopUp {...props} />;
        case TxTextSectionType.outputPubKeyScript:
          const props2 = {
            ...popUpData,
            item: popUpData.item as InputScriptSigItem,
            dataItemIndex: popUpData.dataItemIndex,
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
    }
  };

  const renderValue = () => {
    if (popUpData) {
      const { type, value } = popUpData.item;
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
    }
  };

  const handleRenderIcon = () => {
    if (popUpData) {
      // ensure
      const { type, title } = popUpData.item;

      if (type === TxTextSectionType.pushedData) {
        let image: any = "";
        if (title === "Signature (schnorr)") {
          image = schorKey;
        } else if (title === "Signature (ecdsa)") {
          image = signatureIcon;
        } else if (title === "Hashed Public Key" || title === "Public Key") {
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
    }
  };

  return (
    <div
      id="modularPopUpSat"
      className=" z-50  flex w-full  cursor-default  flex-col items-center overflow-hidden rounded-xl bg-white p-6 text-[#0C071D] shadow-xl md:mb-10  "
    >
      <div className="flex w-full  flex-col">
        <motion.div
          key={popUpData ? popUpData.rawHex : "empty"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={(e) => e.stopPropagation()}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <div className="mx-5 mt-5 flex flex-row justify-between">
            <div className="flex flex-row items-center justify-center gap-x-1">
              <p className="text-[28px] font-semibold text-[#0C071D]">
                {popUpData ? popUpData.item.title : ""}
              </p>
            </div>
            <div className="flex flex-row items-center">
              {handleRenderIcon()}
              <p className=" overflow-hidden truncate text-[28px] font-semibold text-[#F79327]">
                {renderValue()}
              </p>
            </div>
          </div>
        </motion.div>
        <div>
          <hr className="mx-5 mt-3 h-0.5 flex-1 bg-[#F79327]" />
        </div>
        <motion.div
          key={popUpData ? popUpData.rawHex + "2" : "empty-2"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={(e) => e.stopPropagation()}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <div className="my-6">{renderView()}</div>
        </motion.div>
      </div>
    </div>
  );
};

export default ModularPopUp;
