import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { popUpExampleOpen } from "../atom";
import Link from "next/link";
import ScriptExamplePopUp from "./ScriptExamplePopUp";

const PopUpExampleMenu = () => {
  const [IsExampleOpen, setIsExampleOpen] = useAtom(popUpExampleOpen);
  const isPopUpExampleOpen = useAtomValue(popUpExampleOpen);

  if (!isPopUpExampleOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsExampleOpen(false)}
        className="fixed inset-0 z-50 grid cursor-pointer place-items-center overflow-y-scroll bg-slate-900/20 p-8 backdrop-blur"
      >
        <motion.div
          initial={{ scale: 0, rotate: "12.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex h-[591px] w-[346px] cursor-default flex-col items-center overflow-hidden rounded-xl bg-white p-6 text-[#0C071D] shadow-xl md:h-[617px] md:w-[770px]"
        >
          <div className="relative z-10 flex flex-col items-center justify-center">
            <button
              onClick={() => setIsExampleOpen(false)}
              className="-ml-10 flex w-full justify-end rounded font-semibold text-[#25314C] transition-all duration-500 ease-in-out hover:opacity-90 md:-ml-0"
            >
              <svg
                className="h-[16px] w-[16px]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <p className="mx-[30px] mb-2 mt-5 text-center text-[18px] font-bold md:mx-[20px] md:text-[28px]">
              Choose A Transaction Example To Deserealize
            </p>
            <div className="flex h-[480px] w-[100%] flex-col overflow-y-auto">
              <ScriptExamplePopUp
                Type={"Inscription"}
                Description={"(reveal-in...)"}
                First={"Taproot"}
                Inputs={"1 Input"}
                Outputs={"2 Outputs"}
                linkPath={""}
              />
              <ScriptExamplePopUp
                Type={"DLC"}
                Description={"(discreet log contract)"}
                First={"Taproot"}
                Inputs={"1 Input"}
                Outputs={"4 Outputs"}
                linkPath={""}
              />
              <ScriptExamplePopUp
                Type={"Direct Transfer"}
                Description={"(p2wpkh)"}
                First={"Segwit"}
                Inputs={"2 Input"}
                Outputs={"2 Outputs"}
                linkPath={""}
              />
              <ScriptExamplePopUp
                Type={"MultiSig"}
                Description={"(p2wsh)"}
                First={"Segwit"}
                Inputs={"4 Input"}
                Outputs={"2 Outputs"}
                linkPath={""}
              />
              <ScriptExamplePopUp
                Type={"Direct Transfer"}
                Description={"(p2pkh)"}
                First={"Legacy"}
                Inputs={"1 Input"}
                Outputs={"2 Outputs"}
                linkPath={""}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopUpExampleMenu;
