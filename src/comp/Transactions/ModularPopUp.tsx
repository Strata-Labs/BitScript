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
}

const ModularPopUp: React.FC<ModularPopUpProps> = ({
  Title,
  Value,
  Content1,
  Content2,
  Content3,
  linkPath,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-x-0 z-50 grid cursor-pointer place-items-center overflow-y-scroll"
      >
        <motion.div
          initial={{ scale: 0, rotate: "12.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="relative mx-5 ml-[260px] flex h-full cursor-default flex-col items-center overflow-hidden rounded-xl bg-white p-4 text-[#0C071D] shadow-xl"
        >
          <div className="rounded-3xl bg-white p-2">
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
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModularPopUp;
