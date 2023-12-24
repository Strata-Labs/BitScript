import { useEffect, useState } from "react";
import { EDCSA_STEPS } from "./const";

import { classNames, useIsMobile, useWindowSize } from "@/utils";
import { CheckIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { isValid } from "zod";
import ECDSAGenerateHeader from "./ECDSAHeader";
import SignaturePastSteps from "./SignaturePastSteps";
import UserActionButton from "./UserActionButton";
import {
  CollectInverseModulo,
  CollectPrivateSigningKey,
  CollectRandomGen,
} from "./GenerateSignatureViews";

enum SIGNATURE_ACTION {
  SIGN,
  VERIFY,
}

export enum MESSAGE_TYPE {
  PLAIN_TEXT,
  TRANSACTION,
}

export type SIGNATURE_SIGN_DATA = {
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

export type TextInput = {
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

export const TextInput = ({
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
          className={classNames(
            "h-full w-full bg-transparent outline-none",
            isActive ? "text-dark-orange" : "text-black"
          )}
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
export const TextSection = ({
  title,
  subTitle,
  val,
  isActive,
}: TextSection) => {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-row items-center">
        <p className="text-[20px] font-semibold">
          {title} <span className="ml-1 text-[20px] font-thin">{subTitle}</span>
        </p>
      </div>
      <div className="lg:flex-no-wrap flex flex-row flex-wrap gap-2">
        {val.map((d, i) => {
          const isActiveItem = isActive[i];

          return (
            <div className="flex min-h-[5rem] flex-1 flex-row  items-center rounded-[32px] bg-[#E0E0E0] px-6 py-2">
              <p
                className={classNames(
                  "text-[20px] font-semibold",
                  isActiveItem && "text-dark-orange"
                )}
              >
                {d}
              </p>
            </div>
          );
        })}
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
      signing_key:
        "0xef235aacf90d9f4aadd8c92e4b2562e1d9eb97f0df9ba3b508258739cb013db2",
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
        return (
          <>
            <CollectPrivateSigningKey
              setVal={handleSignatureGenerateDataUpdate}
              signing_key={signatureSigningData.signing_key}
            />
          </>
        );
      case 4:
        return <></>;
      default:
        return <></>;
    }
  };

  const handleSignatureGenerateDataUpdate = (value: string, key: string) => {
    const shallowCopy = { ...signatureSigningData, [key]: value };
    //console.log("shallowCopy", shallowCopy);
    setSignatureSigningData(shallowCopy);
  };
  return (
    <div className="mx-10 mb-10 mt-10  min-h-[84vh] flex-1 md:ml-[260px] md:mr-5">
      <div className="flex  min-h-[84vh] flex-col justify-between gap-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <p className="font-extralight text-[#687588]">Utility Tool</p>
          </div>
          <ECDSAGenerateHeader currentStep={step} />
          <SignaturePastSteps step={step} setStep={setStep} />
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
