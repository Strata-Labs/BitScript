import { useState } from "react";
import { TextInput, TextSection } from "./SignatureParent";
import { motion, AnimatePresence } from "framer-motion";
import { classNames } from "@/utils";
import { CheckIcon } from "@heroicons/react/20/solid";
import CryptoJS from "crypto-js";

type CollectRandomGen = {
  setVal: (value: string, key: string) => void;
  random: string;
};
export const CollectRandomGen = ({ setVal, random }: CollectRandomGen) => {
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
        isActive={random.length === 64 ? true : false}
        showRandom
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
export const CollectInverseModulo = ({
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
        subTitle="(k^-1)"
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

type CollectPrivateSigningKey = {
  setVal: (value: string, key: string) => void;
  signing_key: string;
};

export const CollectPrivateSigningKey = ({
  signing_key,
  setVal,
}: CollectPrivateSigningKey) => {
  return (
    <>
      <TextInput
        keyName="signing_key"
        title="Private Signing Key "
        subTitle="(e)"
        label="Signing Key"
        placeHolder="For experimenting, do *not* provide a real private key hex, press the random button"
        infoId="random-key"
        setVal={setVal}
        val={signing_key}
        isActive={true}
        showRandom
      />
    </>
  );
};

type CollectPlainTextHashMessage = {
  setVal: (value: string, key: string) => void;
  plain_text_message: string;
};
export const CollectPlainTextHashMessage = ({
  setVal,
  plain_text_message,
}: CollectPlainTextHashMessage) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleGenerateHash160 = (msg: string) => {
    // create hash160 from string
    if (msg === "") return;
    const sha256 = CryptoJS.SHA256(msg).toString();

    const hash160 = CryptoJS.RIPEMD160(sha256).toString();

    setVal(hash160, "plain_text_message");
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);

    handleGenerateHash160(value);
  };

  return (
    <>
      <div className="flex flex-row items-center">
        <p className="text-[20px] font-semibold">
          Plaintext Message{" "}
          <span className="ml-1 text-[20px] font-thin">(m)</span>
        </p>
      </div>

      <div className="flex  w-full flex-row items-center rounded-[32px] bg-[#E0E0E0] ">
        <textarea
          className="z-10 mt-5 h-[204px] w-full rounded-3xl bg-[#e0e0e0] p-5 text-black outline-none"
          placeholder="paste | type a hexadecimal value to hash"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
        ></textarea>
      </div>
      <div className="z-10  flex h-[64px] w-full items-center justify-between rounded-full bg-black p-5">
        <div className="flex ">
          <img src="/fingerprint.svg" alt="" />

          <p className="ml-2 font-bold text-white">HASH256</p>
        </div>
      </div>
      <TextSection
        title="Hashed Message"
        subTitle="(H(m))"
        val={[plain_text_message]}
        isActive={[true]}
      />
    </>
  );
};

const stepsThing = [
  "1. Provide Transaction ID",
  "2. Decide SigHash Flag",
  "3. Select Signing Data",
];

export type BitCoinTxCollection = {
  infoId?: string;
  val: string;
  setVal: (value: string, key: string) => void;
  keyName: string;
};

enum NETWORK {
  MAINNET = "MAINNET",
  TESTNET = "TESTNET",
}
const BitCoinTxCollection = ({ val, setVal, keyName }: BitCoinTxCollection) => {
  const [network, setNetwork] = useState<NETWORK>(NETWORK.MAINNET);

  const handleInputChange = (value: string) => {
    setVal(value, keyName);
  };
  return (
    <div className="flex h-16 w-full flex-row items-center gap-2 py-2">
      <input
        type="text"
        placeholder={"paste in 32-byte TXID..."}
        className={classNames(
          "h-full w-full  rounded-[32px]  bg-[#E0E0E0] px-6  outline-none",
          "text-black"
        )}
        value={val}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <div className="flex   rounded-full bg-[#E0E0E0] px-5 py-1 text-[14px] font-extralight">
        <button
          className={` h-10 rounded-full px-5 py-1 ${
            network === NETWORK.MAINNET
              ? "bg-[#110B24] text-white "
              : "bg-transparent"
          }`}
          onClick={() => setNetwork(NETWORK.MAINNET)}
        >
          Mainnet
        </button>
        <button
          className={`h-10   rounded-full px-5 py-1 ${
            network === NETWORK.TESTNET
              ? "bg-[#110B24] text-white "
              : "bg-transparent"
          }`}
          onClick={() => setNetwork(NETWORK.TESTNET)}
        >
          Testnet
        </button>
      </div>
    </div>
  );
};
type BitcoinTxSignatureCollection = {
  setVal: (value: string, key: string) => void;
  transaction_id: string;
  sig_hash_flag: string;
  signing_data: string;
};
export const BitcoinTxSignatureCollection = ({
  setVal,
  transaction_id,
  sig_hash_flag,
  signing_data,
}: BitcoinTxSignatureCollection) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const [openStep, setOpenStep] = useState<number>(0);

  const renderView = (step: number) => {
    if (step === 0) {
      return (
        <BitCoinTxCollection
          keyName="transaction_id"
          setVal={setVal}
          val={transaction_id}
        />
      );
    }
  };
  return (
    <div className="flex flex-col rounded-xl bg-[#ffffff] p-6 py-6">
      {stepsThing.map((d, i) => {
        const showBottomBorder = i !== stepsThing.length - 1;

        const hasBeenCompleted = completedSteps.includes(i);

        const isOpen = openStep === i;

        return (
          <div
            onClick={() => setOpenStep(i)}
            className={classNames(
              "flex flex-col     py-4",
              showBottomBorder && "border-b border-[#E0E0E0]"
            )}
          >
            <div
              className={classNames(
                "flex flex-row items-center justify-between  "
              )}
            >
              <p className="text-[20px] font-semibold">{d}</p>
              <div
                className={classNames(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 ",
                  hasBeenCompleted ? "border-dark-orange" : "border-gray-500"
                )}
              >
                <CheckIcon
                  className={classNames(
                    "h-6 w-6 font-bold ",
                    hasBeenCompleted ? "text-dark-orange" : "text-gray-500"
                  )}
                />
              </div>
            </div>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.section
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  {renderView(i)}
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export const ViewSignature = () => {
  return (
    <>
      <TextSection
        title="Digital Signature "
        subTitle="(r,s) format"
        val={[
          "0x20ac1738868dc57ecdd956da17af8f7a3a1a7249",
          "0x20ac1738868dc57ecdd956da17af8f7a3a1a7249",
        ]}
        isActive={[false, true]}
      />
      <TextSection
        title="Digital Signature "
        subTitle="DER format"
        val={["0x20ac1738868dc57ecdd956da17af8f7a3a1a7249"]}
        isActive={[true]}
      />
    </>
  );
};
