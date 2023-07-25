import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { popUpOpen } from "../atom";
import Link from "next/link";
import ScriptContainerPopUp from "./ScriptPopUp";

const PopUpMenu = () => {
  const [IsOpen, setIsOpen] = useAtom(popUpOpen);
  const isPopUpOpen = useAtomValue(popUpOpen);

  if (!isPopUpOpen) {
    // Menu is open, hide the component
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
              className="flex w-full justify-end rounded font-semibold text-[#25314C] transition-all duration-500 ease-in-out hover:opacity-90"
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
            <h3 className="mb-2 ml-[20px] mr-[20px] mt-5 text-center text-[18px] font-bold md:ml-[120px] md:mr-[120px] md:text-[28px]">
              Choose An Existing Script Or Start From Scratch
            </h3>
            <Link className="mt-5" href={"/sandbox"}>
              <div className="mb-6 flex h-[43px] w-[146px] items-center justify-center rounded-xl bg-black text-center text-[16px] text-white">
                Blank Template
              </div>
            </Link>
            <div className="flex h-[360px] w-[100%] flex-col overflow-y-auto">
              <ScriptContainerPopUp
                scriptName={"P2PK"}
                scriptCompleteName={"(pay to public key)"}
                inUse={"Constant"}
                numberOfOPs={"Pop & Push"}
                linkPath={"/p2pk"}
              />
              <ScriptContainerPopUp
                scriptName={"P2PK"}
                scriptCompleteName={"(pay to public key)"}
                inUse={"Constant"}
                numberOfOPs={"Pop & Push"}
                linkPath={"/p2pk"}
              />
              <ScriptContainerPopUp
                scriptName={"P2PK"}
                scriptCompleteName={"(pay to public key)"}
                inUse={"Constant"}
                numberOfOPs={"Pop & Push"}
                linkPath={"/p2pk"}
              />
              <ScriptContainerPopUp
                scriptName={"P2PK"}
                scriptCompleteName={"(pay to public key)"}
                inUse={"Constant"}
                numberOfOPs={"Pop & Push"}
                linkPath={"/p2pk"}
              />
              <ScriptContainerPopUp
                scriptName={"P2PK"}
                scriptCompleteName={"(pay to public key)"}
                inUse={"Constant"}
                numberOfOPs={"Pop & Push"}
                linkPath={"/p2pk"}
              />
              <ScriptContainerPopUp
                scriptName={"P2PK"}
                scriptCompleteName={"(pay to public key)"}
                inUse={"Constant"}
                numberOfOPs={"Pop & Push"}
                linkPath={"/p2pk"}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopUpMenu;
