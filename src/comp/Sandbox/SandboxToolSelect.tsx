import { useRef, useState, useEffect } from "react";
import SandboxFormatter from "./SandBoxFormatter";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { SandboxTool, sandboxToolAtom } from "../atom";

const SandboxToolSelect = () => {
  const [selectedTool, setSelectedTool] = useAtom(sandboxToolAtom);

  return (
    <div className="flex flex-1 flex-col overflow-scroll">
      {/* <button className="w-full">
        <div className="flex h-[70px] flex-row items-center justify-between border-b-[0.5px]  border-[#4D495D] text-white">
          <div className="mx-5 flex w-full flex-row justify-between">
            <p>Data Helper</p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0201 5.5C11.1911 5.5 10.5151 4.829 10.5151 4C10.5151 3.171 11.1821 2.5 12.0101 2.5H12.0201C12.8491 2.5 13.5201 3.171 13.5201 4C13.5201 4.829 12.8491 5.5 12.0201 5.5ZM13.5201 12C13.5201 11.171 12.8491 10.5 12.0201 10.5H12.0101C11.1821 10.5 10.5151 11.171 10.5151 12C10.5151 12.829 11.1911 13.5 12.0201 13.5C12.8491 13.5 13.5201 12.829 13.5201 12ZM13.5201 20C13.5201 19.171 12.8491 18.5 12.0201 18.5H12.0101C11.1821 18.5 10.5151 19.171 10.5151 20C10.5151 20.829 11.1911 21.5 12.0201 21.5C12.8491 21.5 13.5201 20.829 13.5201 20Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </button> */}
      <AnimatePresence>
        {selectedTool === SandboxTool.CONVERT && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <SandboxFormatter />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SandboxToolSelect;
