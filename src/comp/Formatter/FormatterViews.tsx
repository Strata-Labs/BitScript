import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ConversionResult,
  OutputVisibility,
  reverseByteOrder,
} from "./FormatterLayout";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

type BinaryOutputProps = {
  binaryBL: string;
  setBinaryBL: (value: string) => void;
  convertedValues: ConversionResult | null;
  outputVisibility: OutputVisibility;
  value: string;
  showBinaryCopyMessage: boolean;
  setShowBinaryCopyMessage: (value: boolean) => void;
  toggleVisibility: (key: keyof OutputVisibility) => void;
  handleCopy: (
    value: string,
    setShowCopyMessage: (value: boolean) => void
  ) => void;
};

export const BinaryOutput = ({
  convertedValues,
  outputVisibility,
  toggleVisibility,
  setShowBinaryCopyMessage,
  handleCopy,
  showBinaryCopyMessage,
  value,
  binaryBL,
  setBinaryBL,
}: BinaryOutputProps) => {
  const displayValue =
    binaryBL === "Little" && convertedValues
      ? reverseByteOrder(convertedValues.Binary)
      : convertedValues?.Binary;

  return (
    <>
      <div className="mt-5 flex flex-row items-start justify-between">
        <div className="flex flex-row items-center">
          <p className="w-[120px] font-bold text-black">Binary</p>
          <button
            className=" ml-2 flex items-center justify-center rounded-xl px-2 py-1 text-[16px] font-extralight text-[#0C071D]"
            onClick={() => {
              toggleVisibility("binary");
            }}
          >
            <FontAwesomeIcon
              icon={outputVisibility.binary ? faEyeSlash : faEye}
            />
          </button>
        </div>

        {outputVisibility.binary && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-row rounded-full bg-[#F3F3F3] p-2">
              <button
                className={`flex h-[30px] w-[120px] items-center justify-center rounded-full text-[14px] font-extralight ${
                  binaryBL === "Big"
                    ? "bg-[#0C071D] text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setBinaryBL("Big")}
              >
                BE
              </button>
              <button
                className={`flex h-[30px] w-[120px] items-center justify-center rounded-full text-[14px] font-extralight ${
                  binaryBL === "Little"
                    ? "bg-[#0C071D] text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setBinaryBL("Little")}
              >
                LE
              </button>
            </div>
          </motion.div>
        )}
      </div>
      <div
        className={`w-full ${
          outputVisibility.binary ? "binary-slide-down" : "binary-slide-up"
        }`}
      >
        {outputVisibility.binary && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <textarea
              className="mt-5 h-[72px] w-full cursor-pointer rounded-full bg-[#F3F3F3] py-6 pl-6 pr-16 text-black outline-none"
              placeholder="waiting for input..."
              value={value ? displayValue : ""}
              readOnly
              onClick={() =>
                handleCopy(displayValue || "", setShowBinaryCopyMessage)
              }
            ></textarea>
          </motion.div>
        )}
      </div>

      {value && showBinaryCopyMessage && (
        <div className=" mt-2 text-[8px] text-black">Copied to Clipboard</div>
      )}
    </>
  );
};

type BytesOutputProps = {
  bytesBL: string;
  setBytesBL: (value: string) => void;
  convertedValues: ConversionResult | null;
  outputVisibility: OutputVisibility;
  value: string;
  showBytesCopyMessage: boolean;
  setShowBytesCopyMessage: (value: boolean) => void;
  toggleVisibility: (key: keyof OutputVisibility) => void;
  handleCopy: (
    value: string,
    setShowCopyMessage: (value: boolean) => void
  ) => void;
};

export const BytesOutput = ({
  convertedValues,
  outputVisibility,
  toggleVisibility,
  setShowBytesCopyMessage,
  handleCopy,
  showBytesCopyMessage,
  value,
  bytesBL,
  setBytesBL,
}: BytesOutputProps) => {
  const displayValue =
    bytesBL === "Little" && convertedValues
      ? reverseByteOrder(convertedValues.Bytes)
      : convertedValues?.Bytes;

  return (
    <>
      <div className="mt-5 flex flex-row items-start justify-between">
        <div className="flex flex-row items-center">
          <p className="w-[120px] font-bold text-black">Bytes</p>
          <button
            className=" ml-2 flex items-center justify-center rounded-xl px-2 py-1 text-[16px] font-extralight text-[#0C071D]"
            onClick={() => toggleVisibility("bytes")}
          >
            <FontAwesomeIcon
              icon={outputVisibility.bytes ? faEyeSlash : faEye}
            />
          </button>
        </div>

        {outputVisibility.bytes && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-row rounded-full bg-[#F3F3F3] p-2">
              <button
                className={`flex h-[30px] w-[120px] items-center justify-center rounded-full text-[14px] font-extralight ${
                  bytesBL === "Big"
                    ? "bg-[#0C071D] text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setBytesBL("Big")}
              >
                BE
              </button>
              <button
                className={`flex h-[30px] w-[120px] items-center justify-center rounded-full text-[14px] font-extralight ${
                  bytesBL === "Little"
                    ? "bg-[#0C071D] text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setBytesBL("Little")}
              >
                LE
              </button>
            </div>
          </motion.div>
        )}
      </div>
      <div
        className={` w-full ${
          outputVisibility.bytes ? "bytes-slide-down" : "bytes-slide-up"
        }`}
      >
        {outputVisibility.bytes && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <textarea
              className="relative mt-5 h-[72px] w-full cursor-pointer rounded-full bg-[#F3F3F3] p-6 text-black outline-none"
              placeholder="waiting for input..."
              value={value ? displayValue : ""}
              readOnly
              onClick={() =>
                handleCopy(displayValue || "", setShowBytesCopyMessage)
              }
            ></textarea>
          </motion.div>
        )}
      </div>

      {value && showBytesCopyMessage && (
        <div className=" mt-2 text-[8px] text-black">Copied to Clipboard</div>
      )}
    </>
  );
};

type HexOutputProps = {
  hexBL: string;
  setHexBL: (value: string) => void;
  convertedValues: ConversionResult | null;
  outputVisibility: OutputVisibility;
  value: string;
  showHexCopyMessage: boolean;
  setShowHexCopyMessage: (value: boolean) => void;
  toggleVisibility: (key: keyof OutputVisibility) => void;
  handleCopy: (
    value: string,
    setShowCopyMessage: (value: boolean) => void
  ) => void;
};

export const HexOutput = ({
  convertedValues,
  outputVisibility,
  toggleVisibility,
  setShowHexCopyMessage,
  handleCopy,
  showHexCopyMessage,
  value,
  hexBL,
  setHexBL,
}: HexOutputProps) => {
  const displayValue =
    hexBL === "Little" && convertedValues
      ? reverseByteOrder(convertedValues.Hexadecimal)
      : convertedValues?.Hexadecimal;
  return (
    <>
      <div className="mt-5 flex flex-row items-start justify-between">
        <div className="flex flex-row items-center">
          <p className="w-[120px] font-bold text-black">Hexadecimal</p>
          <button
            className=" ml-2 flex items-center justify-center rounded-xl px-2 py-1 text-[16px] font-extralight text-[#0C071D]"
            onClick={() => toggleVisibility("hex")}
          >
            <FontAwesomeIcon icon={outputVisibility.hex ? faEyeSlash : faEye} />
          </button>
        </div>

        {outputVisibility.hex && (
          <div className="flex flex-row rounded-full bg-[#F3F3F3] p-2">
            <button
              className={`flex h-[30px] w-[120px] items-center justify-center rounded-full text-[14px] font-extralight ${
                hexBL === "Big"
                  ? "bg-[#0C071D] text-white"
                  : "bg-transparent text-black"
              }`}
              onClick={() => setHexBL("Big")}
            >
              BE
            </button>
            <button
              className={`flex h-[30px] w-[120px] items-center justify-center rounded-full text-[14px] font-extralight ${
                hexBL === "Little"
                  ? "bg-[#0C071D] text-white"
                  : "bg-transparent text-black"
              }`}
              onClick={() => setHexBL("Little")}
            >
              LE
            </button>
          </div>
        )}
      </div>

      <div
        className={` w-full ${
          outputVisibility.hex ? "hex-slide-down" : "hex-slide-up"
        }`}
      >
        {outputVisibility.hex && (
          <textarea
            className="relative mt-5 h-[72px] w-full cursor-pointer rounded-full bg-[#F3F3F3] p-6 text-black outline-none"
            placeholder="waiting for input..."
            value={value ? displayValue : ""}
            readOnly
            onClick={() =>
              handleCopy(displayValue || "", setShowHexCopyMessage)
            }
          ></textarea>
        )}
      </div>

      {value && showHexCopyMessage && (
        <div className=" mt-2 text-[8px] text-black">Copied to Clipboard</div>
      )}
    </>
  );
};

type DecimalOutputProps = {
  convertedValues: ConversionResult | null;
  outputVisibility: OutputVisibility;
  value: string;
  showDecimalCopyMessage: boolean;
  setShowDecimalCopyMessage: (value: boolean) => void;
  toggleVisibility: (key: keyof OutputVisibility) => void;
  handleCopy: (
    value: string,
    setShowCopyMessage: (value: boolean) => void
  ) => void;
};

export const DecimalOutput = ({
  convertedValues,
  outputVisibility,
  toggleVisibility,
  setShowDecimalCopyMessage,
  handleCopy,
  showDecimalCopyMessage,
  value,
}: DecimalOutputProps) => {
  const displayValue = convertedValues ? convertedValues.Decimal : "";

  return (
    <>
      <div className="mt-5 flex flex-row items-start justify-between">
        <div className="flex flex-row items-center">
          <p className="w-[120px] font-bold text-black">Decimal</p>
          <button
            className=" ml-2 flex items-center justify-center rounded-xl px-2 py-1 text-[16px] font-extralight text-[#0C071D]"
            onClick={() => toggleVisibility("decimal")}
          >
            <FontAwesomeIcon
              icon={outputVisibility.decimal ? faEyeSlash : faEye}
            />
          </button>
        </div>
      </div>

      <div
        className={`w-full ${
          outputVisibility.decimal ? "decimal-slide-down" : "decimal-slide-up"
        }`}
      >
        {outputVisibility.decimal && (
          <textarea
            className="relative mt-5 h-[72px] w-full cursor-pointer rounded-full bg-[#F3F3F3] p-6 text-black outline-none"
            placeholder="waiting for input..."
            value={value && displayValue}
            readOnly
            onClick={() => handleCopy(displayValue, setShowDecimalCopyMessage)}
          ></textarea>
        )}
      </div>

      {value && showDecimalCopyMessage && (
        <div className=" mt-2 text-[8px] text-black">Copied to Clipboard</div>
      )}
    </>
  );
};

type StringOutputProps = {
  convertedValues: ConversionResult | null;
  outputVisibility: OutputVisibility;
  toggleVisibility: (key: keyof OutputVisibility) => void;
  setShowStringCopyMessage: (value: boolean) => void;
  showStringCopyMessage: boolean;
  value: string;
  handleCopy: (
    value: string,
    setShowCopyMessage: (value: boolean) => void
  ) => void;
};
export const StringOutput = ({
  convertedValues,
  outputVisibility,
  toggleVisibility,
  setShowStringCopyMessage,
  handleCopy,
  showStringCopyMessage,
  value,
}: StringOutputProps) => {
  const displayValue = convertedValues ? convertedValues.String : "";

  return (
    <>
      <div className="mt-5 flex flex-row items-start justify-between">
        <div className="flex flex-row items-center">
          <p className="w-[120px] font-bold text-black">String</p>
          <button
            className=" ml-2 flex items-center justify-center rounded-xl px-2 py-1 text-[16px] font-extralight text-[#0C071D]"
            onClick={() => toggleVisibility("string")}
          >
            <FontAwesomeIcon
              icon={outputVisibility.string ? faEyeSlash : faEye}
            />
          </button>
        </div>
      </div>
      <div
        className={` w-full ${
          outputVisibility.string ? "string-slide-down" : "string-slide-up"
        }`}
      >
        {outputVisibility.string && (
          <textarea
            className="relative mt-5 h-[72px] w-full cursor-pointer rounded-full bg-[#F3F3F3] p-6 text-black outline-none"
            placeholder="waiting for input..."
            value={value && displayValue}
            readOnly
            onClick={() => handleCopy(displayValue, setShowStringCopyMessage)}
          ></textarea>
        )}
      </div>

      {value && showStringCopyMessage && (
        <div className=" mt-2 text-[8px] text-black">Copied to Clipboard</div>
      )}
    </>
  );
};

// Base58 Output Component
type Base58OutputProps = {
  convertedValues: ConversionResult | null;
  outputVisibility: OutputVisibility;
  value: string;
  showBase58CopyMessage: boolean;
  setShowBase58CopyMessage: (value: boolean) => void;
  toggleVisibility: (key: keyof OutputVisibility) => void;
  handleCopy: (
    value: string,
    setShowCopyMessage: (value: boolean) => void
  ) => void;
};

export const Base58Output = ({
  convertedValues,
  outputVisibility,
  toggleVisibility,
  setShowBase58CopyMessage,
  handleCopy,
  showBase58CopyMessage,
  value,
}: Base58OutputProps) => {
  return (
    <>
      <div className="mt-5 flex flex-row items-start justify-between">
        <div className="flex flex-row items-center">
          <h1 className="text-[16px] font-bold text-[#0C071D] md:text-[20px]">
            Base58
          </h1>
          <div
            className="ml-2 cursor-pointer"
            onClick={() => toggleVisibility("base58")}
          >
            <FontAwesomeIcon
              icon={outputVisibility.base58 ? faEye : faEyeSlash}
              className="text-[#0C071D]"
            />
          </div>
        </div>
      </div>
      {outputVisibility.base58 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2 overflow-hidden rounded-lg bg-[#F5F5F5] p-4"
          onDoubleClick={() =>
            handleCopy(convertedValues?.Base58 || "", setShowBase58CopyMessage)
          }
        >
          <p className="break-all text-[12px] text-[#0C071D] md:text-[16px]">
            {convertedValues?.Base58 || ""}
          </p>
          {value && showBase58CopyMessage && (
            <div className="mt-2 text-[8px] text-black">
              Copied to Clipboard
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};

// Bech32 Output Component
type Bech32OutputProps = {
  convertedValues: ConversionResult | null;
  outputVisibility: OutputVisibility;
  value: string;
  showBech32CopyMessage: boolean;
  setShowBech32CopyMessage: (value: boolean) => void;
  toggleVisibility: (key: keyof OutputVisibility) => void;
  handleCopy: (
    value: string,
    setShowCopyMessage: (value: boolean) => void
  ) => void;
};

export const Bech32Output = ({
  convertedValues,
  outputVisibility,
  toggleVisibility,
  setShowBech32CopyMessage,
  handleCopy,
  showBech32CopyMessage,
  value,
}: Bech32OutputProps) => {
  return (
    <>
      <div className="mt-5 flex flex-row items-start justify-between">
        <div className="flex flex-row items-center">
          <h1 className="text-[16px] font-bold text-[#0C071D] md:text-[20px]">
            Bech32
          </h1>
          <div
            className="ml-2 cursor-pointer"
            onClick={() => toggleVisibility("bech32")}
          >
            <FontAwesomeIcon
              icon={outputVisibility.bech32 ? faEye : faEyeSlash}
              className="text-[#0C071D]"
            />
          </div>
        </div>
      </div>
      {outputVisibility.bech32 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2 overflow-hidden rounded-lg bg-[#F5F5F5] p-4"
          onDoubleClick={() =>
            handleCopy(convertedValues?.Bech32 || "", setShowBech32CopyMessage)
          }
        >
          <p className="break-all text-[12px] text-[#0C071D] md:text-[16px]">
            {convertedValues?.Bech32 || ""}
          </p>
          {value && showBech32CopyMessage && (
            <div className="mt-2 text-[8px] text-black">
              Copied to Clipboard
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};

// Bech32m Output Component
type Bech32mOutputProps = {
  convertedValues: ConversionResult | null;
  outputVisibility: OutputVisibility;
  value: string;
  showBech32mCopyMessage: boolean;
  setShowBech32mCopyMessage: (value: boolean) => void;
  toggleVisibility: (key: keyof OutputVisibility) => void;
  handleCopy: (
    value: string,
    setShowCopyMessage: (value: boolean) => void
  ) => void;
};

export const Bech32mOutput = ({
  convertedValues,
  outputVisibility,
  toggleVisibility,
  setShowBech32mCopyMessage,
  handleCopy,
  showBech32mCopyMessage,
  value,
}: Bech32mOutputProps) => {
  return (
    <>
      <div className="mt-5 flex flex-row items-start justify-between">
        <div className="flex flex-row items-center">
          <h1 className="text-[16px] font-bold text-[#0C071D] md:text-[20px]">
            Bech32m
          </h1>
          <div
            className="ml-2 cursor-pointer"
            onClick={() => toggleVisibility("bech32m")}
          >
            <FontAwesomeIcon
              icon={outputVisibility.bech32m ? faEye : faEyeSlash}
              className="text-[#0C071D]"
            />
          </div>
        </div>
      </div>
      {outputVisibility.bech32m && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2 overflow-hidden rounded-lg bg-[#F5F5F5] p-4"
          onDoubleClick={() =>
            handleCopy(
              convertedValues?.Bech32m || "",
              setShowBech32mCopyMessage
            )
          }
        >
          <p className="break-all text-[12px] text-[#0C071D] md:text-[16px]">
            {convertedValues?.Bech32m || ""}
          </p>
          {value && showBech32mCopyMessage && (
            <div className="mt-2 text-[8px] text-black">
              Copied to Clipboard
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};
