import { classNames } from "@/utils";
import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import VectordocSVG from "@/../public/images/VectordocSVG.svg";

type SelectMessageType = {
  setStep: (value: number) => void;
};

const SelectMessageType = ({ setStep }: SelectMessageType) => {
  const { t } = useTranslation("signature");
  return (
    <div className="flex  flex-col gap-2">
      <p className="text-[20px] font-normal">{t("select_message_type")}</p>
      <div
        onClick={() => setStep(5)}
        className={classNames(
          "mt-6  flex   w-full  cursor-pointer flex-row items-center  justify-between rounded-[16px] bg-[#ffffff] px-6 py-4"
        )}
      >
        <div className="flex flex-row items-center gap-4">
          <div className="flex h-20 w-20 flex-row items-center justify-center rounded-full border-2 border-dark-orange bg-light-orange">
            <Image src={VectordocSVG} height={40} width={40} alt="Document" />
          </div>
          <div className="flex flex-col  ">
            <p className="text-[20px] font-bold text-black">
              {t("plaintext_option_title")}
            </p>
            <p className="text-[20px  text-pretty	pr-2 font-normal text-[#0C071D]">
              {t("plaintext_option_description")}
            </p>
          </div>
        </div>
        <ChevronRightIcon className="h-16 w-16 font-bold text-dark-orange" />
      </div>
      <div
        onClick={() => setStep(6)}
        className={classNames(
          "mt-6  flex w-full  cursor-pointer flex-row items-center  justify-between rounded-[16px] bg-[#ffffff] px-6 py-4"
        )}
      >
        <div className="flex flex-row items-center gap-4">
          <div className="flex h-20 w-20 flex-row items-center justify-center rounded-full border-2 border-dark-orange bg-light-orange">
            <Image src={VectordocSVG} height={40} width={40} alt="Document" />
          </div>
          <div className="flex flex-col  ">
            <p className="text-[20px] font-bold text-black">
              {t("transaction_option_title")}
            </p>
            <p className="text-wrap text-balance pr-2	text-[20px]	font-normal text-[#0C071D]">
              {t("transaction_option_description")}
            </p>
          </div>
        </div>
        <ChevronRightIcon className="h-16 w-16 font-bold text-dark-orange" />
      </div>
    </div>
  );
};

export default SelectMessageType;
