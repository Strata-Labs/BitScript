import React from "react";
import { useAtom } from "jotai";
import { isClickedInfoPopUpOpen } from "../atom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "next-i18next";

const InfoPopUp = () => {
  const { t } = useTranslation("signature");
  const [isClickedInfoPopUp, setIsClickedInfoPopUp] = useAtom(
    isClickedInfoPopUpOpen
  );

  const handleCloseInfo = () => {
    setIsClickedInfoPopUp(false);
  };

  return (
    <AnimatePresence>
      {isClickedInfoPopUp && (
        <motion.div
          id="modularPopUpSat"
          className="z-50 w-full cursor-default flex-col items-center overflow-hidden rounded-xl bg-white p-6 text-[#0C071D] shadow-xl md:mb-10 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          transition={{ duration: 0.8 }}
        >
          <div className="flex w-full flex-col">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <div className="mx-5 mt-5 flex flex-row justify-between">
                <div className="flex flex-row items-center justify-center gap-x-1">
                  <p className="text-[28px] font-semibold text-[#0C071D]">
                    {t("info_version_title")}
                  </p>
                </div>
                <div className="flex flex-row items-center">
                  <p className="overflow-hidden truncate text-[28px] font-semibold text-[#F79327]">
                    01000000
                  </p>
                </div>
              </div>
            </motion.div>
            <div>
              <hr className="mx-5 mt-3 h-0.5 flex-1 bg-[#F79327]" />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <p className="mx-5 mt-3">{t("info_version_description")}</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoPopUp;
