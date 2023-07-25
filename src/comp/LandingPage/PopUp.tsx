import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { popUpOpen } from "../atom";
import Link from "next/link";
import ScriptContainerPopUp from "./ScriptPopUp";


const PopUpMenu = () => {
    const [IsOpen, setIsOpen] = useAtom(popUpOpen) 
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
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-[#0C071D] p-6 rounded-xl w-[346px] h-[591px] md:w-[770px] md:h-[617px] shadow-xl cursor-default relative overflow-hidden flex flex-col items-center"
          >
            <div className="relative z-10 flex flex-col items-center justify-center">
            <button
                  onClick={() => setIsOpen(false)}
                  className="hover:opacity-90 transition-all ease-in-out duration-500 text-[#25314C] font-semibold w-full rounded flex justify-end"
                >
                  <svg
                  className="w-[16px] h-[16px]"
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
              <h3 className="text-[18px] md:text-[28px] font-bold text-center mb-2 mt-5 ml-[20px] mr-[20px] md:ml-[120px] md:mr-[120px]">
                Choose An Existing Script Or Start From Scratch
              </h3>
              <Link className="mt-5" href={"/sandbox"}>
                <div className="text-center mb-6 h-[43px] w-[146px] bg-black rounded-xl text-white text-[16px] flex items-center justify-center">
                    Blank Template
                </div> 
              </Link>
              <div className="flex flex-col w-[100%] overflow-y-auto h-[360px]">
                <ScriptContainerPopUp scriptName={"P2PK"} scriptCompleteName={"(pay to public key)"} inUse={"Constant"} numberOfOPs={"Pop & Push"} linkPath={"/p2pk"}/>
                <ScriptContainerPopUp scriptName={"P2PK"} scriptCompleteName={"(pay to public key)"} inUse={"Constant"} numberOfOPs={"Pop & Push"} linkPath={"/p2pk"}/>
                <ScriptContainerPopUp scriptName={"P2PK"} scriptCompleteName={"(pay to public key)"} inUse={"Constant"} numberOfOPs={"Pop & Push"} linkPath={"/p2pk"}/>
                <ScriptContainerPopUp scriptName={"P2PK"} scriptCompleteName={"(pay to public key)"} inUse={"Constant"} numberOfOPs={"Pop & Push"} linkPath={"/p2pk"}/>
                <ScriptContainerPopUp scriptName={"P2PK"} scriptCompleteName={"(pay to public key)"} inUse={"Constant"} numberOfOPs={"Pop & Push"} linkPath={"/p2pk"}/>
                <ScriptContainerPopUp scriptName={"P2PK"} scriptCompleteName={"(pay to public key)"} inUse={"Constant"} numberOfOPs={"Pop & Push"} linkPath={"/p2pk"}/>
              </div>
            </div>
          </motion.div>
        </motion.div>
    </AnimatePresence>
  );
};

export default PopUpMenu;