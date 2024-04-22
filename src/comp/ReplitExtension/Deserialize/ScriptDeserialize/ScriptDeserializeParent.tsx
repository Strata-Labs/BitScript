import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowDownTrayIcon,
  ChevronRightIcon,
  FingerPrintIcon,
  KeyIcon,
} from "@heroicons/react/20/solid";
import { classNames } from "@/utils";

import { P2PKH } from "@/const/SCRIPTS/p2pkh";
import { SigScriptData } from "../DeserializeParent";
import { TransactionItem } from "@/deserialization/model";
import { TxTextSectionType } from "../Helper";

const variants = {
  open: { opacity: 1, height: "auto" },
  collapsed: { opacity: 0, height: 0 },
};

type ScriptDeserializeParentProps = {
  sigScriptData: SigScriptData;
};

const CodeSectionData = ({ item, rawHex }: TransactionItem) => {
  const { type, title } = item;
  const renderIcon = () => {
    if (type === "opCode") {
      return <ArrowDownTrayIcon className="h-4 w-4  text-white" />;
    }

    if (type === TxTextSectionType.pushedData) {
      let image: any = "";
      if (title === "Signature (schnorr)") {
        //image = schorKey;
        return <KeyIcon className="h-4 w-4  text-white" />;
      } else if (title === "Signature (ecdsa)") {
        //image = signatureIcon;
        return <FingerPrintIcon className="h-4 w-4  text-white" />;
      } else if (title === "Hashed Public Key" || title === "Public Key") {
        //image = hashPublicKey;
        return <KeyIcon className="h-4 w-4  text-white" />;
      } else if (
        title === "Script" ||
        title === "ScriptPubKey" ||
        title === "ScriptSig" ||
        title === "Redeem Script"
      ) {
        //image = scriptIcon;
        return <FingerPrintIcon className="h-4 w-4  text-white" />;
      }

      if (image === "") {
        return null;
      } else {
        //return <Image src={image} alt="schnorr key" width={50} height={50} />;
      }
    }
  };

  const renderIconText = () => {
    if (type === "opCode") {
      // convert hex to bytes

      let byteArray = [];

      for (let i = 0; i < rawHex.length; i += 2) {
        let hexChunk = rawHex.substring(i, i + 2);
        byteArray.push(parseInt(hexChunk, 16).toString());
      }

      let bytesFromHex = byteArray.join(" ");

      return `OP_${bytesFromHex}`;
    } else {
      if (type === TxTextSectionType.pushedData) {
        let image: any = "";
        if (title === "Signature (schnorr)") {
          return "schnorr";
        } else if (title === "Signature (ecdsa)") {
          return "ecdsa";
        } else if (title === "Hashed Public Key" || title === "Public Key") {
          return "pubkey";
        } else if (
          title === "Script" ||
          title === "ScriptPubKey" ||
          title === "ScriptSig" ||
          title === "Redeem Script"
        ) {
          return "script";
        }
      }

      return null;
    }
  };
  const renderRawValue = () => {
    if (type === "opCode") {
      return `0x${rawHex}`;
    }

    return rawHex;
  };
  return (
    <div className="flex w-full flex-col items-start justify-center gap-2">
      <div className="flex flex-row items-center justify-center gap-2 rounded-full  bg-black px-4 py-2">
        <>{renderIcon()}</>
        <p className="text-sm font-normal text-white">{renderIconText()}</p>
      </div>
      <div>
        <p className="break-all text-lg font-semibold text-black">
          {renderRawValue()}
        </p>
      </div>
    </div>
  );
};
const ScriptCodeSection = ({ sigScriptData }: ScriptDeserializeParentProps) => {
  const renderData = () => {
    return sigScriptData.deserializeData.map((item, index) => {
      return <CodeSectionData key={index} {...item} />;
    });
  };
  return (
    <div
      className={classNames(
        "min-h-10 flex w-full flex-col gap-6  rounded-xl bg-[#EEEEEE] px-6 py-4 transition-all"
      )}
    >
      {renderData()}
    </div>
  );
};
const ScriptDescriptionSection = ({
  sigScriptData,
}: ScriptDeserializeParentProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const script = sigScriptData.knownScript;
  return (
    <div
      className={classNames(
        "min-h-10 w-full  bg-[#EEEEEE] px-6 py-4 transition-all ",
        isExpanded ? "rounded-xl" : "rounded-full"
      )}
    >
      <div className="flex w-full flex-row items-center justify-between">
        <p className="text-lg font-bold text-black">
          {script.shortHand}
          <span className="ml-2 text-sm font-normal text-gray-500">
            (script.longHand)
          </span>
        </p>
        <div
          onClick={() => setIsExpanded((prev) => !prev)}
          className="cursor-pointer"
        >
          <ChevronRightIcon
            className={`h-10 w-10 transform text-black transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="detail-section"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={variants}
            transition={{ duration: 0.8 }}
          >
            {script.longDescription instanceof Array ? (
              <div className="flex flex-col gap-4">
                {script.longDescription.map((desc, index) => (
                  <p
                    key={index}
                    className="text-[14px] font-extralight text-[#6C5E70] md:text-[16px]"
                  >
                    {/^\d/.test(desc) ? ( // Check if the description starts with a number
                      <>
                        <span className="font-bold">
                          {desc.substring(
                            0,
                            desc.indexOf(".", desc.indexOf(".") + 1) + 1
                          )}
                        </span>
                        <br />
                        {desc.substring(
                          desc.indexOf(".", desc.indexOf(".") + 1) + 1
                        )}
                      </>
                    ) : (
                      desc // Render normally if it doesn't start with a number
                    )}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-[14px] font-extralight text-[#6C5E70] md:text-[16px]">
                {script.longDescription}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ScriptDeserializeParent = ({
  sigScriptData,
}: ScriptDeserializeParentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="flex w-full flex-col  gap-2  px-8"
    >
      <p className="text-md mt-4 font-thin text-black">
        SigScript/Unlock Script
      </p>
      {
        // Text Info view
      }
      <ScriptDescriptionSection sigScriptData={sigScriptData} />
      {
        // Script Data View
      }
      <ScriptCodeSection sigScriptData={sigScriptData} />
    </motion.div>
  );
};

export default ScriptDeserializeParent;
