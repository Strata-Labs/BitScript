import { useState } from "react";
import { TextInput, TextSection } from "./SignatureParent";

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
        isActive={random.length === 32 ? true : false}
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
      />
    </>
  );
};

export const CollectPlainTextHashMessage = () => {
  const [inputData, setInputData] = useState("");

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
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
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
        val={[""]}
        isActive={[true]}
      />
    </>
  );
};
