import { useEffect, useState } from "react";
import { SIGNATURE_SIGN_DATA } from "./SignatureParent";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/utils";
import { useTranslation } from "next-i18next";

type UserActionButton = {
  signatureSigningData: SIGNATURE_SIGN_DATA;
  step: number;
  setStep: (value: number) => void;
};

const UserActionButton = ({
  setStep,
  step,
  signatureSigningData,
}: UserActionButton) => {
  const { t } = useTranslation("signature");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(false);
    checkIfValid();
  }, [step]);

  useEffect(() => {
    checkIfValid();
  }, [signatureSigningData]);

  if (step === 7) return null;

  const renderText = () => {
    const textStyle = `text-[20px] font-bold ${
      isValid ? "text-dark-orange" : ""
    }`;
    const spanStyle = `ml-2 text-[20px] font-thin ${
      isValid ? "text-dark-orange" : ""
    }`;

    if (step === 1) {
      return (
        <p className={textStyle}>
          {""}
          <span className={spanStyle}>{t("action_waiting_for_k")}</span>
        </p>
      );
    } else if (step === 2) {
      return (
        <p className={textStyle}>
          {t("action_provide_signing_key")}
          <span className={spanStyle}>(e)</span>
        </p>
      );
    } else if (step === 3) {
      return (
        <p className={textStyle}>
          {t("action_provide_message")}
          <span className={spanStyle}>(m)</span>
        </p>
      );
    } else if (step === 4) {
      return (
        <p className={textStyle}>
          {t("action_provide_message")}
          <span className={spanStyle}>(m)</span>
        </p>
      );
    } else if (step === 5) {
      return (
        <p className={textStyle}>
          {t("action_view_signature")}
          <span className={spanStyle}>(s)</span>
        </p>
      );
    } else if (step === 6) {
      return (
        <p className={textStyle}>
          {t("action_confirm_hash_message")}
          <span className={spanStyle}>(H(m))</span>
        </p>
      );
    } else {
      return <>{t("action_nothing_found")}</>;
    }
  };

  const checkIfValid = () => {
    if (step === 1) {
      setIsValid(signatureSigningData.random.length === 64 ? true : false);
    } else if (step === 2) {
      setIsValid(true);
    } else if (step === 3) {
      setIsValid(signatureSigningData.signing_key.length == 64 ? true : false);
    } else if (step === 5) {
      setIsValid(signatureSigningData.plain_text_message.length > 0);
    }
  };

  const handleClick = () => {
    if (isValid) {
      if (step === 5) {
        setStep(7);
        return;
      } else {
        setStep(step + 1);
      }
    }
  };
  return (
    <div
      onClick={() => handleClick()}
      className={classNames(
        "mt-6 flex h-[5rem] w-full flex-row items-center  justify-between rounded-[16px] bg-[#F0F0F0] px-6 py-2",
        isValid ? "cursor-pointer" : "cursor-not-allowed"
      )}
    >
      {renderText()}
      <div
        className={classNames(
          "j flex h-12 w-12 cursor-pointer items-center justify-center rounded-full",
          isValid ? "bg-dark-orange" : "bg-[#D9D9D9]"
        )}
      >
        <ChevronRightIcon
          className={classNames(
            "h-10 w-10 text-white",
            isValid ? "" : "text-[#EEEEE]"
          )}
        />
      </div>
    </div>
  );
};

export default UserActionButton;
