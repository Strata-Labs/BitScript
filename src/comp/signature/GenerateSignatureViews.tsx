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

export const InitalView = () => {};
