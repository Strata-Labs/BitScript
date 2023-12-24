import { useEffect, useState } from "react";
import { SIGNATURE_SIGN_DATA } from "./SignatureParent";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/utils";

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
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(false);
    checkIfValid();
  }, [step]);

  useEffect(() => {
    checkIfValid();
  }, [signatureSigningData]);
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
          <span className={spanStyle}>Waiting for K to complete</span>
        </p>
      );
    } else if (step === 2) {
      return (
        <p className={textStyle}>
          Provide Signing Key
          <span className={spanStyle}>(e)</span>
        </p>
      );
    } else if (step === 3) {
      return (
        <p className={textStyle}>
          Provide Message
          <span className={spanStyle}>(m)</span>
        </p>
      );
    } else if (step === 4) {
      return (
        <p className={textStyle}>
          Provide Message
          <span className={spanStyle}>(m)</span>
        </p>
      );
    } else if (step === 5) {
      return (
        <p className={textStyle}>
          View Signature
          <span className={spanStyle}>(s)</span>
        </p>
      );
    } else {
      return <>\ nothing found</>;
    }
  };

  const checkIfValid = () => {
    if (step === 1) {
      console.log(
        "signatureSigningData.random.length",
        signatureSigningData.random.length
      );
      setIsValid(signatureSigningData.random.length === 64 ? true : false);
    } else if (step === 2) {
      setIsValid(true);
    } else if (step === 3) {
      setIsValid(signatureSigningData.signing_key.length == 64 ? true : false);
    }
  };

  const handleClick = () => {
    if (isValid) {
      setStep(step + 1);
    }
  };
  console.log("isValid", isValid);
  return (
    <div
      onClick={() => handleClick()}
      className={classNames(
        "mt-6 flex h-[5rem] w-full flex-row items-center  justify-between rounded-[16px] bg-[#E0E0E0] px-6 py-2",
        isValid ? "cursor-pointer" : "cursor-not-allowed"
      )}
    >
      {renderText()}
      <div
        className={classNames(
          "j flex h-12 w-12 cursor-pointer items-center justify-center rounded-full",
          isValid ? "bg-dark-orange" : "bg-gray-400"
        )}
      >
        <ChevronRightIcon
          className={classNames(
            "h-10 w-10 text-white",
            isValid ? "" : "text-gray-400"
          )}
        />
      </div>
    </div>
  );
};

export default UserActionButton;
