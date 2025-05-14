import { use, useEffect, useState } from "react";
import { EDCSA_STEPS } from "./const";
import Image from "next/image";

import { classNames, useIsMobile, useWindowSize } from "@/utils";
import { CheckIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { isValid } from "zod";
import ECDSAGenerateHeader, { ECDSAVerifyHeader } from "./ECDSAHeader";
import SignaturePastSteps from "./SignaturePastSteps";
import UserActionButton from "./UserActionButton";
import {
  BitcoinTxSignatureCollection,
  CollectInverseModulo,
  CollectPlainTextHashMessage,
  CollectPrivateSigningKey,
  CollectRandomGen,
  ViewSignature,
} from "./GenerateSignatureViews";
import SelectMessageType from "./Message/SelectMessageType";

import cryptoRandomString from "crypto-random-string";

import shuffle from "@/../public/images/shuffle.svg";
import { VerifySignatureViews } from "./VerifySignatureViews";
import InfoButton from "./infoButton";
import InfoPopUp from "./infoPupUp";
import { isClickedInfoPopUpOpen } from "../atom";
import { useAtom } from "jotai";

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

export type SIGNATURE_VERIFY_DATA = {
  [key: string]: string | MESSAGE_TYPE;
  signature_der: string;
  signature_r: string;
  signature_s: string;
  message_hash: string;
  public_key: string;
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
  showRandom?: boolean;
};

export const TextInput = ({
  title,
  subTitle,
  isActive,
  placeHolder,
  val,
  setVal,
  keyName,
  showRandom,
}: TextInput) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isClickedInfoPopUp, setIsClickedInfoPopUp] = useAtom(
    isClickedInfoPopUpOpen
  );

  const isValidHexadecimal = (val: string) => /^[0-9A-Fa-f\s]+$/.test(val);

  const handleInputChange = (value: string) => {
    if (value.length <= 64) {
      // Ensure the length doesn't exceed 64 characters
      if (isValidHexadecimal(value) || value === "") {
        // Check if valid hex or empty (to allow backspace)
        setVal(value, keyName); // Update the value only if it's a valid hex
        setErrorMessage(""); // Reset error message
      } else {
        setErrorMessage("Not a Valid Hex"); // Set the error message
      }
    }
  };

  const handleRandom = () => {
    const val = cryptoRandomString({ length: 64 });
    setVal(val, keyName);
  };
  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="flex flex-row items-center justify-between">
        <p className="text-[20px] font-semibold">
          {title} <span className="ml-1 text-[20px] font-thin">{subTitle}</span>
        </p>
        {showRandom && (
          <div className="flex flex-row items-center">
            {!isClickedInfoPopUp && (
              <div
                onClick={() => handleRandom()}
                className="flex h-[48px] w-[135px] cursor-pointer flex-row items-center justify-between rounded-[50px] bg-[#F3F3F3] px-4"
              >
                <Image src={shuffle} height={16} width={23} alt="Document" />
                <p className="text-[16px] font-light text-[#0C071D]">random</p>
              </div>
            )}

            <InfoButton />
          </div>
        )}
      </div>

      <div className="flex h-16 w-full flex-row items-center rounded-[32px] bg-[#F0F0F0] px-6 py-2">
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
      <InfoPopUp />
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
  const [signatureAction, setSignatureAction] = useState(SIGNATURE_ACTION.SIGN);

  const [signatureVerifyData, setSignatureVerifyData] =
    useState<SIGNATURE_VERIFY_DATA>({
      signature_r: "",
      signature_s: "",
      signature_der: "",
      message_hash: "",
      public_key: "",
    });

  const [signatureSigningData, setSignatureSigningData] =
    useState<SIGNATURE_SIGN_DATA>({
      random:
        "ef235aacf90d9f4aadd8c92e4b2562e1d9eb97f0df9ba3b508258739cb013db2",
      inverse_modulo:
        "ef235aacf90d9f4aadd8c92e4b2562e1d9eb97f0df9ba3b508258739cb013db2",
      public_key_r: "0x19bf1b1cbfe9b861f793d3da14eb5186d",
      public_key_s: "0x109be93d21d12b5f33aded2f657392c",
      signing_key:
        "ef235aacf90d9f4aadd8c92e4b2562e1d9eb97f0df9ba3b508258739cb013db2",
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
        return <SelectMessageType setStep={setStep} />;
      case 5:
        return (
          <CollectPlainTextHashMessage
            setVal={handleSignatureGenerateDataUpdate}
            plain_text_message={signatureSigningData.plain_text_message}
          />
        );
      case 6:
        return (
          <BitcoinTxSignatureCollection
            setVal={handleSignatureGenerateDataUpdate}
            transaction_id={signatureSigningData.transaction_id}
            sig_hash_flag={signatureSigningData.sig_hash_flag}
            signing_data={signatureSigningData.signing_data}
          />
        );
      case 7:
        return <ViewSignature />;
      default:
        return <></>;
    }
  };

  const handleSignatureGenerateDataUpdate = (value: string, key: string) => {
    const shallowCopy = { ...signatureSigningData, [key]: value };
    setSignatureSigningData(shallowCopy);
  };

  const handleSignatureVerifyDataUpdate = (value: string, key: string) => {
    const shallowCopy = { ...signatureVerifyData, [key]: value };
    setSignatureVerifyData(shallowCopy);
  };
  const handleStepBack = () => {
    if (step === 6) {
      setStep(4);
    } else {
      setStep(step - 1);
    }
  };
  return (
    <div className="mx-10 mb-10 mt-10  min-h-[84vh] flex-1 md:ml-[260px] md:mr-5">
      <div className="flex  min-h-[84vh] flex-col justify-between gap-8">
        <div className="flex flex-1 flex-col gap-8">
          {step > 1 && (
            <div
              onClick={() => handleStepBack()}
              className="flex cursor-pointer flex-row items-center gap-2"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                rotate="180deg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="rotate(180 12 12)">
                  <path
                    d="M8.99978 19.7498C8.80778 19.7498 8.61575 19.6768 8.46975 19.5298C8.17675 19.2368 8.17675 18.7618 8.46975 18.4688L14.9397 11.9988L8.46975 5.52883C8.17675 5.23583 8.17675 4.7608 8.46975 4.4678C8.76275 4.1748 9.23779 4.1748 9.53079 4.4678L16.5308 11.4678C16.8238 11.7608 16.8238 12.2358 16.5308 12.5288L9.53079 19.5288C9.38379 19.6768 9.19178 19.7498 8.99978 19.7498Z"
                    fill="#F79327"
                  />
                </g>
              </svg>
              <p className="font-extralight text-[#687588]"> back</p>
            </div>
          )}

          <div className="flex flex-col">
            <p className="font-extralight text-[#687588]">Utility Tool</p>
            <div className="mt-3 flex w-full flex-row justify-between">
              <p className="text-[28px] font-semibold">Signatures</p>
              {step === 1 && (
                <div className=" flex flex-row items-center ">
                  <button className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#F3F3F3]">
                    <img src="/download file.svg" alt="download file" />
                  </button>
                  <div className="flex h-[44px] w-[230px] rounded-full bg-[#F3F3F3] p-2  text-[14px] font-extralight">
                    <button
                      className={` h-[32px] w-[108px] rounded-full px-5 py-1 ${
                        signatureAction === SIGNATURE_ACTION.SIGN
                          ? "bg-dark-orange text-white "
                          : "bg-transparent"
                      }`}
                      onClick={() => setSignatureAction(SIGNATURE_ACTION.SIGN)}
                    >
                      Generate
                    </button>
                    <button
                      className={`h-[32px] w-[108px] rounded-full px-8 py-1 ${
                        signatureAction === SIGNATURE_ACTION.VERIFY
                          ? "bg-dark-orange text-white "
                          : "bg-transparent"
                      }`}
                      onClick={() =>
                        setSignatureAction(SIGNATURE_ACTION.VERIFY)
                      }
                    >
                      Verify
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="mr-12 mt-3 flex flex-col">
              <p className="font-extralight">
                At the heart of everything Bitcoin are digital signatures. They
                verify that a private key signed a message by only revealing the
                associated public key; in BTC, the “message” (m) is the
                transaction we’re attempting to send.{" "}
                <span className="text-[#F79327]">
                  Below is a tool to Generate or Verify ECDSA signatures!
                </span>
              </p>
            </div>
          </div>

          {signatureAction === SIGNATURE_ACTION.SIGN ? (
            <ECDSAGenerateHeader currentStep={step} />
          ) : (
            <ECDSAVerifyHeader />
          )}

          {step !== 5 && step !== 6 && (
            <>
              <SignaturePastSteps step={step} setStep={setStep} />
            </>
          )}

          {signatureAction === SIGNATURE_ACTION.SIGN ? (
            <div className="flex  flex-col gap-10">{handleRenderStep()}</div>
          ) : (
            <VerifySignatureViews
              signature_r={signatureVerifyData.signature_r}
              signature_s={signatureVerifyData.signature_s}
              signature_der={signatureVerifyData.signature_der}
              message_hash={signatureVerifyData.message_hash}
              public_key={signatureVerifyData.public_key}
              setVal={handleSignatureVerifyDataUpdate}
            />
          )}
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
