import { useAtomValue } from "jotai";
import { popUpExampleOpen } from "../atom";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import VersionPopUp from "./VersionPopUp";
import LockTimePopUp from "./LockTimePopUp";

interface ModularPopUpProps {
  Title: string;
  Value: string | number;
  Content1: string;
  Content2: string;
  Content3: string;
  linkPath: string;
  position: string;
  dataIndex?: string;
  // LockTime
  Title1: string;
  Cont1: string;
  Title2: string;
  Cont2: string;
  Bottom1: string;
  Bottom2: string;
}

const ModularPopUp: React.FC<ModularPopUpProps> = ({
  Title,
  Value,
  Content1,
  Content2,
  Content3,
  linkPath,
  position,
  dataIndex,
  // LockTime
  Title1,
  Cont1,
  Title2,
  Cont2,
  Bottom1,
  Bottom2,
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
                {Value}
              </p>
            </div>
            <div>
              <hr className="mx-5 mt-3 h-0.5 flex-1 bg-[#F79327]" />
            </div>
            {Title.includes("Version") && (
              <VersionPopUp
                Content1={Content1}
                Content2={Content2}
                Content3={Content3}
              />
            )}
            {Title.includes("Locktime") && (
              <LockTimePopUp
                Content1={Content1}
                Content2={Content2}
                Title1={Title1}
                Cont1={Cont1}
                Title2={Title2}
                Cont2={Cont2}
                Bottom1={Bottom1}
                Bottom2={Bottom2}
                Active={true}
                Active2={false}
                ActiveCheckMark={true}
              />
            )}
            {Title.includes("Sequence") && (
              <LockTimePopUp
                Content1={Content1}
                Content2={Content2}
                Title1={Title1}
                Cont1={Cont1}
                Title2={Title2}
                Cont2={Cont2}
                Bottom1={Bottom1}
                Bottom2={Bottom2}
                Active={false}
                Active2={true}
                ActiveCheckMark={false}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModularPopUp;
