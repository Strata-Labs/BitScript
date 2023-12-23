import { useEffect, useState } from "react";
import { EDCSA_STEPS } from "./const";

import { classNames, useIsMobile, useWindowSize } from "@/utils";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const stepsBasicStyling = `font-thin  text-[48px]`;

type ECDSAHeader = {
  currentStep: number;
};
const ECDSAGenerateHeader = ({ currentStep }: ECDSAHeader) => {
  const isSelected = (step: number) => {
    if (currentStep == 2 && step == 1) {
      return "!font-bold text-[50px] text-dark-orange";
    }

    if (step === currentStep) {
      return "!font-bold text-[50px] text-dark-orange";
    }

    if (step < currentStep) {
      return "!font-semibold text-[50px] text-black";
    }
  };

  return (
    <div className="flex w-full flex-row">
      <div className="flex  flex-col ">
        <p className="text-[48px] font-semibold tracking-widest	 text-black">
          ECDSA
        </p>
        <p className="text-[18px] font-light text-black">Generate Signature</p>
      </div>
      <p className="w-min text-[48px] font-semibold text-black">=</p>
      <div className="ml-4 flex  flex-row gap-2">
        <p className={classNames(stepsBasicStyling, "relative", isSelected(1))}>
          K{" "}
          <span className="absolute -right-4 -top-1.5 text-[23px] font-bold">
            -1
          </span>
        </p>
        <p className={classNames(stepsBasicStyling, "ml-2")}>{"("}</p>
        <p className={classNames(stepsBasicStyling, "", isSelected(2))}>H(m)</p>
        <p className={classNames(stepsBasicStyling, "")}>+</p>
        <p className={classNames(stepsBasicStyling, "", isSelected(3))}>e</p>
        <p className={classNames(stepsBasicStyling, "")}>*</p>
        <p className={classNames(stepsBasicStyling, "", isSelected(4))}>r</p>
        <p className={classNames(stepsBasicStyling, "")}>{")"}</p>
      </div>
    </div>
  );
};

enum SIGNATURE_ACTION {
  SIGN,
  VERIFY,
}

enum MESSAGE_TYPE {
  PLAIN_TEXT,
  TRANSACTION,
}

type SIGNATURE_SIGN_DATA = {
  [key: string]: string | MESSAGE_TYPE;
  random: string;
  inverse_modulo: string;
  public_key_r: string;
  public_key_s: string;
  signing_key: string;
  message_type: string;
  plain_text_message: string;
  transaction_id: string;
  sig_hash_flag: string;
  signing_data: string;
};

type TextInput = {
  isActive: boolean;

  label: string;
  title: string;
  subTitle: string;
  placeHolder: string;
  infoId?: string;
  val: string;
  setVal: (value: string, key: string) => void;
  keyName: string;
};

const TextInput = ({
  title,
  subTitle,
  isActive,
  placeHolder,
  val,
  setVal,
  keyName,
}: TextInput) => {
  const handleInputChange = (value: string) => {
    setVal(value, keyName);
  };

  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="flex flex-row items-center">
        <p className="text-[20px] font-semibold">
          {title} <span className="ml-1 text-[20px] font-thin">{subTitle}</span>
        </p>
      </div>

      <div className="flex h-16 w-full flex-row items-center rounded-[32px] bg-[#E0E0E0] px-6 py-2">
        <input
          type="text"
          placeholder={placeHolder}
          className="h-full w-full bg-transparent outline-none"
          value={val}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>
    </div>
  );
};

type TextSection = {
  title: string;
  subTitle: string;
  val: string[];
  isActive: boolean[];
};
const TextSection = ({ title, subTitle, val }: TextSection) => {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-row items-center">
        <p className="text-[20px] font-semibold">
          {title} <span className="ml-1 text-[20px] font-thin">{subTitle}</span>
        </p>
      </div>
      <div className="flex-no-wrap flex flex-row gap-2">
        {val.map((d, i) => {
          return (
            <div className="flex min-h-[5rem] flex-1 flex-row  items-center rounded-[32px] bg-[#E0E0E0] px-6 py-2">
              <p className="text-[20px] font-semibold">{d}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type CollectRandomGen = {
  setVal: (value: string, key: string) => void;
  random: string;
};
const CollectRandomGen = ({ setVal, random }: CollectRandomGen) => {
  // need to store inputs needed

  return (
    <>
      <TextInput
        keyName="random"
        title="Random #"
        subTitle="(k)"
        label="Signing Key"
        placeHolder="Paste a 32-byte | 64-char string of valid hex or press the random button"
        infoId="random-key"
        setVal={setVal}
        val={random}
        isActive={true}
      />
    </>
  );
};

type CollectInverseModulo = {
  setVal: (value: string, key: string) => void;
  random: string;
  inverse_modulo: string;
  public_key_r: string;
  public_key_s: string;
};
const CollectInverseModulo = ({
  setVal,
  random,
  inverse_modulo,
  public_key_r,
  public_key_s,
}: CollectInverseModulo) => {
  return (
    <>
      <TextSection
        title="Random #"
        subTitle="(k)"
        val={[random]}
        isActive={[false]}
      />
      <TextSection
        title="Inverse Moduolo"
        subTitle="(k)"
        val={[inverse_modulo]}
        isActive={[true]}
      />
      <div className="flex-no-wrap flex w-full flex-row gap-2">
        <TextSection
          title="Public Key "
          subTitle="(kG = (r,y ))"
          val={[public_key_r, public_key_s]}
          isActive={[true, false]}
        />
      </div>
    </>
  );
};

type UserActionButton = {
  signatureSigningData: SIGNATURE_SIGN_DATA;
  step: number;
  setStep: (value: number) => void;
};
const UserActionButton = ({ step, signatureSigningData }: UserActionButton) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(false);
    checkIfValid();
  }, [step]);

  useEffect(() => {
    checkIfValid();
  }, [signatureSigningData]);
  const renderText = () => {
    return (
      <p className="text-[20px] font-semibold">
        <span className="ml-1 text-[20px] font-thin">
          Waiting for K to complete
        </span>
      </p>
    );
  };

  const checkIfValid = () => {
    if (step === 1) {
      setIsValid(signatureSigningData.random.length !== 0 ? true : false);
    }
  };

  console.log("isValid", isValid);
  return (
    <div
      className={classNames(
        "flex h-[5rem] w-full flex-row items-center  justify-between rounded-[16px] bg-[#E0E0E0] px-6 py-2",
        isValid ? "cursor-pointer" : "cursor-not-allowed"
      )}
    >
      <p className="text-[20px] font-semibold">{renderText()}</p>
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
const SignatureParent = () => {
  const [step, setStep] = useState(1);
  //const [signatureaction, setSignatureData] = useState(SIGNATURE_ACTION.SIGN);

  const [signatureSigningData, setSignatureSigningData] =
    useState<SIGNATURE_SIGN_DATA>({
      random:
        "0xef235aacf90d9f4aadd8c92e4b2562e1d9eb97f0df9ba3b508258739cb013db2",
      inverse_modulo:
        "0xef235aacf90d9f4aadd8c92e4b2562e1d9eb97f0df9ba3b508258739cb013db2",
      public_key_r: "0x19bf1b1cbfe9b861f793d3da14eb5186d",
      public_key_s: "0x109be93d21d12b5f33aded2f657392c",
      signing_key: "",
      message_type: "",
      plain_text_message: "",
      transaction_id: "",
      sig_hash_flag: "",
      signing_data: "",
    });

  const handleRenderStep = () => {
    switch (step) {
      case 1:
        return (
          <CollectRandomGen
            setVal={handleSignatureGenerateDataUpdate}
            random={signatureSigningData.random}
          />
        );
      case 2:
        return (
          <>
            <CollectInverseModulo
              setVal={handleSignatureGenerateDataUpdate}
              random={signatureSigningData.random}
              inverse_modulo={signatureSigningData.inverse_modulo}
              public_key_r={signatureSigningData.public_key_r}
              public_key_s={signatureSigningData.public_key_s}
            />
          </>
        );
      case 3:
        return <></>;
      case 4:
        return <></>;
      default:
        return <></>;
    }
  };

  const handleSignatureGenerateDataUpdate = (value: string, key: string) => {
    console.log("value", value);
    console.log("key", key);
    const shallowCopy = { ...signatureSigningData, [key]: value };
    //console.log("shallowCopy", shallowCopy);
    setSignatureSigningData(shallowCopy);
  };
  return (
    <div className="mx-10 mb-10 mt-10  min-h-[84vh] flex-1 md:ml-[260px] md:mr-5">
      <div className="flex  min-h-[84vh] flex-col justify-between gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="font-extralight text-[#687588]">Utility Tool</p>
          </div>
          <ECDSAGenerateHeader currentStep={step} />

          <div className="flex flex-col  gap-10">{handleRenderStep()}</div>
        </div>
        <UserActionButton
          signatureSigningData={signatureSigningData}
          step={step}
          setStep={setStep}
        />
      </div>
    </div>
  );
};

export default SignatureParent;
