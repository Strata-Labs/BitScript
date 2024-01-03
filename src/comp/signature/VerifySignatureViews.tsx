import { classNames } from "@/utils";
import { useState } from "react";
import { TextInput } from "./SignatureParent";

enum SIG_FORMAT {
  "DER" = "DER",
  "RS" = "RS",
}

type VerifySignatureViews = {
  signature_r: string;
  signature_s: string;
  message_hash: string;
  public_key: string;
  setVal: (value: string, key: string) => void;
  signature_der: string;
};
export const VerifySignatureViews = ({
  signature_r,
  signature_s,
  signature_der,
  message_hash,
  public_key,
  setVal,
}: VerifySignatureViews) => {
  const val = "";
  const handleInputChange = (value: string) => {
    setVal(value, "signature_der");
  };

  const handleRSFomratChang = (value: string, R: boolean) => {
    if (R) {
      setVal(value, "signature_r");
    } else {
      setVal(value, "signature_s");
    }
  };

  const [sigFormat, setSigFormat] = useState(SIG_FORMAT.RS);

  return (
    <>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <p className="text-[20px] font-semibold">
            Signature{" "}
            <span className="ml-1 text-[20px] font-thin">
              {`(${sigFormat === SIG_FORMAT.DER ? "DER" : "r,s"}) format`}
            </span>
          </p>

          <div className="w-fit">
            <div className="flex  rounded-full bg-[#F3F3F3] p-2  text-[14px] font-extralight">
              <button
                className={` h-10 rounded-full px-6 py-1 ${
                  sigFormat === SIG_FORMAT.RS
                    ? "bg-[#0C071D] text-white "
                    : "bg-transparent"
                }`}
                onClick={() => setSigFormat(SIG_FORMAT.RS)}
              >
                (r,s)
              </button>
              <button
                className={`h-10   rounded-full px-5 py-1 ${
                  sigFormat === SIG_FORMAT.DER
                    ? "bg-[#0C071D] text-white "
                    : "bg-transparent"
                }`}
                onClick={() => setSigFormat(SIG_FORMAT.DER)}
              >
                DER
              </button>
            </div>
          </div>
        </div>
        {sigFormat === SIG_FORMAT.RS ? (
          <div className="lg:flex-no-wrap flex flex-row flex-wrap gap-2">
            <div className="flex min-h-[5rem] flex-1 flex-row  items-center rounded-[32px] bg-[#E0E0E0] px-6 py-2">
              <input
                type="text"
                placeholder={""}
                className={classNames(
                  "h-full w-full bg-transparent outline-none",
                  false ? "text-dark-orange" : "text-black"
                )}
                value={signature_r}
                onChange={(e) => handleRSFomratChang(e.target.value, true)}
              />
            </div>
            <div className="flex min-h-[5rem] flex-1 flex-row  items-center rounded-[32px] bg-[#E0E0E0] px-6 py-2">
              <input
                type="text"
                placeholder={""}
                className={classNames(
                  "h-full w-full bg-transparent outline-none",
                  false ? "text-dark-orange" : "text-black"
                )}
                value={signature_s}
                onChange={(e) => handleRSFomratChang(e.target.value, false)}
              />
            </div>
          </div>
        ) : (
          <div className="flex h-16 w-full flex-row items-center rounded-[32px] bg-[#E0E0E0] px-6 py-2">
            <input
              type="text"
              placeholder={""}
              className={classNames(
                "h-full w-full bg-transparent outline-none",
                false ? "text-dark-orange" : "text-black"
              )}
              value={signature_der}
              onChange={(e) => handleInputChange(e.target.value)}
            />
          </div>
        )}

        {/* <div className="flex h-16 w-full flex-row items-center rounded-[32px] bg-[#E0E0E0] px-6 py-2">
          <input
            type="text"
            placeholder={""}
            className={classNames(
              "h-full w-full bg-transparent outline-none",
              false ? "text-dark-orange" : "text-black"
            )}
            value={val}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div> */}
      </div>
      <TextInput
        keyName="message_hash"
        title="Message Hash #"
        subTitle="(H(m))"
        label="Message Hash "
        placeHolder=""
        infoId="random-key"
        setVal={setVal}
        val={message_hash}
        isActive={true}
      />
      <TextInput
        keyName="public_key"
        title="Public Key #"
        subTitle="(p)"
        label="Public Key"
        placeHolder=""
        infoId="random-key"
        setVal={setVal}
        val={public_key}
        isActive={true}
      />
    </>
  );
};
