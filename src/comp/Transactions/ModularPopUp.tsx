import { useAtomValue } from "jotai";
import { popUpExampleOpen } from "../atom";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ModularPopUpProps {
  Title: string;
  Value: string;
  Content1: string;
  Content2: string;
  Content3: string;
  linkPath: string;
  position: string;
}

const ModularPopUp: React.FC<ModularPopUpProps> = ({
  Title,
  Value,
  Content1,
  Content2,
  Content3,
  linkPath,
  position,
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
          className="relative mx-10 flex cursor-default flex-col overflow-hidden rounded-xl bg-white p-4 text-[#0C071D] shadow-xl md:ml-[280px]"
        >
          <div className="flex flex-col">
            <div className="mx-5 mt-5 flex flex-row justify-between">
              <p className="text-[28px] font-semibold text-[#0C071D]">
                {Title}
              </p>
              <p className="text-[28px] font-semibold text-[#F79327]">
                {Value}
              </p>
            </div>
            <div>
              <hr className="mx-5 mt-3 h-0.5 flex-1 bg-[#F79327]" />
            </div>
            <p className="mx-5 mt-3 text-[#0C071D]">{Content1}</p>
            <p className="mx-5 mt-3 text-[#0C071D]">{Content2}</p>
            <p className="mx-5 mt-3 text-[12px] text-[#0C071D]">{Content3}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModularPopUp;
