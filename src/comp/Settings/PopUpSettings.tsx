import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { resetEmail, resetPassword } from "../atom";
import Link from "next/link";
import { render } from "@headlessui/react/dist/utils/render";
import { useTranslation } from "next-i18next";

const PopUpSettings = () => {
  const { t } = useTranslation("settings");
  const [isResetPassword, setIsResetPassword] = useAtom(resetPassword);
  const [isResetEmail, setIsResetEmail] = useAtom(resetEmail);

  if (!isResetEmail && !isResetPassword) return null;

  const getContent = () => {
    if (isResetEmail) {
      return (
        <div className="relative z-10 mx-20 flex flex-col items-center justify-center md:mx-10">
          <h3 className="mb-2 mt-3 text-[18px] font-bold md:text-[28px]">
            {t("change_email")}
          </h3>
          <p className="mb-6 flex items-center justify-center rounded-xl text-center text-[16px] text-black">
            {t("change_email_desc")}
          </p>
          <div className="flex flex-col items-start justify-start">
            <p className="font-extralight text-[#6C5E70]">
              {t("current_email")}
            </p>
            <div className="mt-2 h-[48px] w-[348px] rounded-full bg-white p-3 font-light md:w-[448px]">
              jnajera1917@gmail.com
            </div>
          </div>
          <div className="mt-5 h-[1px] w-full bg-[#F79327]"></div>
          <div className="mt-3 flex flex-col items-start justify-start">
            <p className="font-extralight text-[#6C5E70]">{t("new_email")}</p>
            <input
              className="mt-2 h-[48px] w-[348px] rounded-full border border-black bg-white p-3 font-light md:w-[448px]"
              placeholder={t("new_email_placeholder")}
            ></input>
            <p className="mt-3 font-extralight text-[#6C5E70]">
              {t("password_confirm")}
            </p>
            <input
              className="mt-2 h-[48px] w-[348px] rounded-full border border-black bg-white p-3 font-light md:w-[448px]"
              placeholder={t("password_placeholder")}
              type="password"
            ></input>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center">
            <button className="h-[56px] w-[348px] rounded-xl bg-[#F79327] text-white md:w-[448px]">
              {t("update")}
            </button>
            <button
              className="mt-2 underline"
              onClick={() => {
                setIsResetPassword(false);
                setIsResetEmail(false);
              }}
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      );
    }
    if (isResetPassword) {
      return (
        <div className="relative z-10 mx-20 flex flex-col items-center justify-center md:mx-10">
          <h3 className="mb-2 mt-3 text-[18px] font-bold md:text-[28px]">
            {t("change_password")}
          </h3>
          <p className="mb-6 flex items-center justify-center rounded-xl text-center text-[16px] text-black">
            {t("change_password_desc")}
          </p>
          <div className="flex flex-col items-start justify-start">
            <p className="font-extralight text-[#6C5E70]">
              {t("current_password")}
            </p>
            <div className="mt-2 h-[48px] w-[348px] rounded-full bg-white p-3 font-light md:w-[448px]">
              dot dot dot dot
            </div>
          </div>
          <div className="mt-5 h-[1px] w-full bg-[#F79327]"></div>
          <div className="mt-3 flex flex-col items-start justify-start">
            <p className="font-extralight text-[#6C5E70]">{t("new_password")}</p>
            <input
              className="mt-2 h-[48px] w-[348px] rounded-full border border-black bg-white p-3 font-light md:w-[448px]"
              placeholder={t("new_password_placeholder")}
              type="password"
            ></input>
            <p className="mt-3 font-extralight text-[#6C5E70]">
              {t("password_confirm")}
            </p>
            <input
              className="mt-2 h-[48px] w-[348px] rounded-full border border-black bg-white p-3 font-light md:w-[448px]"
              placeholder={t("password_placeholder")}
              type="password"
            ></input>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center">
            <button className="h-[56px] w-[348px] rounded-xl bg-[#F79327] text-white md:w-[448px]">
              {t("update")}
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
          className="relative flex h-[600px] w-[408px] cursor-default flex-col items-center overflow-hidden rounded-xl bg-[#FAFAFA] p-6 text-[#0C071D] shadow-xl md:h-[589px] md:w-[508px]"
        >
          {getContent()}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopUpSettings;
