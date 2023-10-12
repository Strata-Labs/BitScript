import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { resetEmail, resetPassword } from "../atom";
import Link from "next/link";
import { render } from "@headlessui/react/dist/utils/render";

const PopUpSettings = () => {
  const [isResetPassword, setIsResetPassword] = useAtom(resetPassword);
  const [isResetEmail, setIsResetEmail] = useAtom(resetEmail);

  if (!isResetEmail && !isResetPassword) return null;

  const getContent = () => {
    if (isResetEmail) {
      return (
        <div className="relative z-10 mx-10 flex flex-col items-center justify-center">
          <h3 className="mb-2 mt-3 text-[18px] font-bold md:text-[28px]">
            Change Email
          </h3>
          <p className="mb-6 flex items-center justify-center rounded-xl text-center text-[16px] text-black">
            If you want to change your registered & login email just type in the
            new email & confirm with your password.
          </p>
          <div className="flex flex-col items-start justify-start">
            <p className="font-extralight text-[#6C5E70]">Current Email</p>
            <div className="mt-2 h-[48px] w-[448px] rounded-full bg-white p-3 font-light">
              jnajera1917@gmail.com
            </div>
          </div>
          <div className="mt-5 h-[1px] w-full bg-[#F79327]"></div>
          <div className="mt-3 flex flex-col items-start justify-start">
            <p className="font-extralight text-[#6C5E70]">New Email</p>
            <input
              className="mt-2 h-[48px] w-[448px] rounded-full border border-black bg-white p-3 font-light"
              placeholder="type new email here..."
            ></input>
            <p className="mt-3 font-extralight text-[#6C5E70]">
              Password Confirm
            </p>
            <input
              className="mt-2 h-[48px] w-[448px] rounded-full border border-black bg-white p-3 font-light"
              placeholder="type password here..."
              type="password"
            ></input>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center">
            <button className="h-[56px] w-[448px] rounded-xl bg-[#F79327] text-white">
              Update
            </button>
            <button
              className="mt-2 underline"
              onClick={() => {
                setIsResetPassword(false);
                setIsResetEmail(false);
              }}
            >
              cancel
            </button>
          </div>
        </div>
      );
    }
    if (isResetPassword) {
      return (
        <div className="relative z-10 mx-10 flex flex-col items-center justify-center">
          <h3 className="mb-2 mt-3 text-[18px] font-bold md:text-[28px]">
            Change Password
          </h3>
          <p className="mb-6 flex items-center justify-center rounded-xl text-center text-[16px] text-black">
            If you want to change your password just type in the new one &
            confirm with the old one.
          </p>
          <div className="flex flex-col items-start justify-start">
            <p className="font-extralight text-[#6C5E70]">Current Password</p>
            <div className="mt-2 h-[48px] w-[448px] rounded-full bg-white p-3 font-light">
              dot dot dot dot
            </div>
          </div>
          <div className="mt-5 h-[1px] w-full bg-[#F79327]"></div>
          <div className="mt-3 flex flex-col items-start justify-start">
            <p className="font-extralight text-[#6C5E70]">New Password</p>
            <input
              className="mt-2 h-[48px] w-[448px] rounded-full border border-black bg-white p-3 font-light"
              placeholder="type new password here..."
              type="password"
            ></input>
            <p className="mt-3 font-extralight text-[#6C5E70]">
              Password Confirm
            </p>
            <input
              className="mt-2 h-[48px] w-[448px] rounded-full border border-black bg-white p-3 font-light"
              placeholder="type password here..."
              type="password"
            ></input>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center">
            <button className="h-[56px] w-[448px] rounded-xl bg-[#F79327] text-white">
              Update
            </button>
            <button
              className="mt-2 underline"
              onClick={() => {
                setIsResetPassword(false);
                setIsResetEmail(false);
              }}
            >
              cancel
            </button>
          </div>
        </div>
      );
    }
  };

  return !isResetEmail && !isResetPassword ? null : (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          setIsResetPassword(false);
          setIsResetEmail(false);
        }}
        className="fixed bottom-0 left-0 right-0 top-0 z-50 grid cursor-pointer place-items-center overflow-y-scroll bg-slate-900/20 p-8 backdrop-blur md:ml-[240px] "
      >
        <motion.div
          initial={{ scale: 0, rotate: "12.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex h-[589px] w-[508px] cursor-default flex-col items-center overflow-hidden rounded-xl bg-[#FAFAFA] p-6 text-[#0C071D] shadow-xl"
        >
          {getContent()}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopUpSettings;
