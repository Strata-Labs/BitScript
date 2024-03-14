import { AnimatePresence, motion } from "framer-motion";
import { classNames } from "@/utils";
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { OUTPUT_PUBKEY_TYPES, OutputSetUpTableRow } from "./Outputsetup";

type SelectTabLeafOutputType = {
  setShowOverlay: (show: boolean) => void;
};
const SelectTabLeafOutputType = ({
  setShowOverlay,
}: SelectTabLeafOutputType) => {
  return (
    <motion.div
      initial={{ x: "0", opacity: 0 }}
      animate={{ x: "0", opacity: 1 }}
      onClick={() => setShowOverlay(false)}
      className="fixed inset-0 z-50 grid cursor-pointer place-items-center overflow-y-scroll bg-slate-100/10 backdrop-blur md:ml-[240px]"
    >
      <motion.div
        initial={{ scale: 0, rotate: "0deg" }}
        animate={{ scale: 1, rotate: "0deg" }}
        exit={{ scale: 0, rotate: "0deg" }}
        onClick={(e) => e.stopPropagation()}
        className="relative m-auto flex  w-3/4  flex-col items-center rounded-[20px] bg-[#f9f9f9] p-8 px-10 text-[#0C071D] shadow-xl   "
      >
        <div className="flex w-full  flex-col gap-8 p-1">
          <div className="flex w-full flex-row items-center justify-center">
            <p className=" text-[26px]  font-normal  text-[#0C071D]">
              Select TapLeaf (0) OutPut Type
            </p>
          </div>
        </div>
        <div className="w-full  overflow-hidden overflow-x-auto">
          <table className="w-full table-auto">
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "65%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <thead>
              <tr className="bg-[#FAFAFA]">
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-light text-[#687588] sm:pl-3"
                >
                  PubKey Type
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-light text-[#687588] sm:pl-3"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-light text-[#687588] sm:pl-3"
                >
                  Auto Sign
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-light text-[#687588] sm:pl-3"
                >
                  Select
                </th>
              </tr>
            </thead>
            <tbody>
              {OUTPUT_PUBKEY_TYPES.map((outputPubKeyType, index: number) => (
                <OutputSetUpTableRow
                  keyIndex={index}
                  pubkeyType={outputPubKeyType.pubkeyType}
                  description={outputPubKeyType.description}
                  autoSign={outputPubKeyType.autoSign}
                />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SelectTabLeafOutputType;
