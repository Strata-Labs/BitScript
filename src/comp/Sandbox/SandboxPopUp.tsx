import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { paymentAtom, sandBoxPopUpOpen, userSignedIn } from "../atom";
import Link from "next/link";
import { useEffect } from "react";

const SandBoxPopUp = () => {
  const [payment, setPayment] = useAtom(paymentAtom);
  const [isUserSignedIn] = useAtom(userSignedIn);
  const [isSandBoxPopUpOpen, setIsSandBoxPopUpOpen] = useAtom(sandBoxPopUpOpen);

  return !isSandBoxPopUpOpen ? null : (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 my-[200px] ml-[260px] grid place-items-center overflow-y-scroll"
      >
        <motion.div
          initial={{ scale: 0, rotate: "12.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-50 mr-[460px] flex h-[591px] w-[346px] cursor-default flex-col items-center rounded-xl bg-[#110B24] p-6 text-white shadow-xl md:ml-[260px] md:h-[667px] md:w-[784px]"
        >
          <div className="relative z-50 flex w-full flex-col items-center justify-center">
            <h3 className="mb-2 ml-[20px] mr-[20px] mt-5 text-center text-[18px] font-bold md:ml-[120px] md:mr-[120px] md:text-[28px]">
              Script Sandbox
            </h3>
            <p className="font-extralight">select an option to continue</p>
            <div className="mt-5 h-[0.5px] w-full border-b border-[#F79327] "></div>

            <div className="mt-5 flex flex-row ">
              {/* Scratch */}
              <button
                className={`absolute left-3 mr-1 flex h-[235px] w-[350px] flex-col items-center rounded-2xl bg-[#0C071D]`}
              >
                <p className="mt-5">Scratch</p>
                <p className="mx-10 mt-5 text-center">
                  Start with an empty SigScript & PubKeyScript
                </p>
              </button>
              {/* Example */}
              <button
                className={`absolute right-3 mr-1 flex h-[235px] w-[350px] flex-col items-center rounded-2xl bg-[#0C071D]`}
              >
                <p className="mt-5">Example</p>
                <p className="mx-10 mt-5 text-center">
                  Start by loading one of our pre-loaded script examples
                </p>
              </button>
            </div>

            <div className="mt-2 flex flex-row">
              {/* Fetch */}
              {!payment?.hasAccess && (
                <div className="relative -left-[300px] top-[250px] z-50 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#0C071D]">
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.75 6.30396V5C12.75 2.381 10.619 0.25 8 0.25C5.381 0.25 3.25 2.381 3.25 5V6.30396C1.312 6.56096 0.25 7.846 0.25 10V16C0.25 18.418 1.582 19.75 4 19.75H12C14.418 19.75 15.75 18.418 15.75 16V10C15.75 7.847 14.688 6.56195 12.75 6.30396ZM8 1.75C9.792 1.75 11.25 3.208 11.25 5V6.25H4.75V5C4.75 3.208 6.208 1.75 8 1.75ZM14.25 16C14.25 17.577 13.577 18.25 12 18.25H4C2.423 18.25 1.75 17.577 1.75 16V10C1.75 8.423 2.423 7.75 4 7.75H12C13.577 7.75 14.25 8.423 14.25 10V16ZM9.27002 12C9.27002 12.412 9.058 12.7601 8.75 12.9871V15C8.75 15.414 8.414 15.75 8 15.75C7.586 15.75 7.25 15.414 7.25 15V12.9619C6.962 12.7329 6.76489 12.395 6.76489 12C6.76489 11.31 7.32001 10.75 8.01001 10.75H8.02002C8.71002 10.75 9.27002 11.31 9.27002 12Z"
                      fill="white"
                    />
                  </svg>
                </div>
              )}

              <button
                className={`absolute -bottom-[450px] left-3 mr-1 flex h-[235px] w-[350px] flex-col items-center rounded-2xl ${
                  payment?.hasAccess
                    ? "bg-[#0C071D]"
                    : "bg-[#6C5E70] blur-[2px]"
                }`}
              >
                <p className="mt-5">Fetch</p>
                <p className="mx-10 mt-5 text-center">
                  Start by first fetching a UTXO - best for custom work
                </p>
              </button>
              {/* Load */}
              {!payment?.hasAccess && (
                <div className="relative left-8 top-[250px] z-50 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#0C071D]">
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.75 6.30396V5C12.75 2.381 10.619 0.25 8 0.25C5.381 0.25 3.25 2.381 3.25 5V6.30396C1.312 6.56096 0.25 7.846 0.25 10V16C0.25 18.418 1.582 19.75 4 19.75H12C14.418 19.75 15.75 18.418 15.75 16V10C15.75 7.847 14.688 6.56195 12.75 6.30396ZM8 1.75C9.792 1.75 11.25 3.208 11.25 5V6.25H4.75V5C4.75 3.208 6.208 1.75 8 1.75ZM14.25 16C14.25 17.577 13.577 18.25 12 18.25H4C2.423 18.25 1.75 17.577 1.75 16V10C1.75 8.423 2.423 7.75 4 7.75H12C13.577 7.75 14.25 8.423 14.25 10V16ZM9.27002 12C9.27002 12.412 9.058 12.7601 8.75 12.9871V15C8.75 15.414 8.414 15.75 8 15.75C7.586 15.75 7.25 15.414 7.25 15V12.9619C6.962 12.7329 6.76489 12.395 6.76489 12C6.76489 11.31 7.32001 10.75 8.01001 10.75H8.02002C8.71002 10.75 9.27002 11.31 9.27002 12Z"
                      fill="white"
                    />
                  </svg>
                </div>
              )}

              <button
                className={`absolute -bottom-[450px] right-3 ml-1 flex h-[235px] w-[350px] flex-col items-center rounded-2xl ${
                  payment?.hasAccess
                    ? "bg-[#0C071D]"
                    : "bg-[#6C5E70] blur-[2px]"
                }`}
              >
                <p className="mt-5">Load</p>
                <p className="mx-10 mt-5 text-center">
                  Start by loading a previously-saved work environment
                </p>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SandBoxPopUp;
