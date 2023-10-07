import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { popUpExampleOpen } from "../atom";
import Link from "next/link";
import ScriptExamplePopUp from "./ScriptExamplePopUp";
import { useEffect } from "react";
import { usePlausible } from "next-plausible";

type PopUpExampleMenuProps = {
  setTxUserInput: (tx: string) => void;
};
const PopUpExampleMenu = ({ setTxUserInput }: PopUpExampleMenuProps) => {
  useEffect(() => {}, []);
  const [isExampleOpen, setIsExampleOpen] = useAtom(popUpExampleOpen);
  const plausible = usePlausible();

  if (!isExampleOpen) {
    return null;
  }

  const handleClick = (link: string) => {
    setIsExampleOpen(false);
    setTxUserInput(link);

    plausible("pageview", { props: { selected_example: true } });
  };

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
                Type={"Direct Transfer"}
                Description={"(p2pkh)"}
                tags={["Legacy", "1 Input", "1 Output"]}
                txId="c9d4d95c4706fbd49bdc681d0c246cb6097830d9a4abfa4680117af706a2a5a0"
                handleClick={handleClick}
              />
              <ScriptExamplePopUp
                Type={"Direct Transfer"}
                Description={"(p2wpkh)"}
                tags={["SegWit", "1 Input", "1 Output"]}
                txId="11904bf4607935ab83fb05dfe8f7727aac4ca430883f27548c13c0a7fbcf4551"
                handleClick={handleClick}
              />
              <ScriptExamplePopUp
                Type={"Multi-Sig"}
                Description={"(p2wsh) "}
                tags={["SegWit", "1 Input", "2 Output"]}
                txId="e14d8794950ad04bd856f8dcf02505ff47826c10c7a2a568f607144df7217604"
                handleClick={handleClick}
              />
              <ScriptExamplePopUp
                Type={"Inscription Commit "}
                Description={"(p2tr)"}
                tags={["TapRoot", "1 Input", "1 Output"]}
                txId="d53b9e0b9e4a0b2e77ad61862a3d385d9748c9b6e6ea402be7efdcafb931d2a7"
                handleClick={handleClick}
              />
              <ScriptExamplePopUp
                Type={"Inscription Reveal "}
                Description={"(p2tr)"}
                tags={["TapRoot", "1 Input", "1 Output"]}
                txId="3dad657b937915e5c090bade175803c863b8cfe13b7735ac5ffff58fdae29618"
                handleClick={handleClick}
              />
              <ScriptExamplePopUp
                Type={"Direct Transfer"}
                Description={"(p2pkh)"}
                tags={["Legacy", "1 Input", "2 Output"]}
                txId="30493316ff9a6fd7c62b9fa08f6fc43ba0edfb035b0b0127e3ecfe8976779e39"
                handleClick={handleClick}
              />
              <ScriptExamplePopUp
                Type={"Lock Script "}
                Description={"(p2sh)"}
                tags={["SegWit", "3 Input", "2 Output"]}
                txId="cef7c653ed303009136948b7d64026e34c7789916d61824b6471c7ec9709f666"
                handleClick={handleClick}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopUpExampleMenu;
