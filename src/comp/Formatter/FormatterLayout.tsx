import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import {
  BinaryOutput,
  BytesOutput,
  DecimalOutput,
  HexOutput,
  StringOutput,
} from "./FormatterViews";

// type values should always live outside of the component
export type ConversionResult = {
  Binary: string;
  Decimal: string;
  Hexadecimal: string;
  Bytes: string;
  String: string;
  error?: string;
};

export interface OutputVisibility {
  binary: boolean;
  bytes: boolean;
  hex: boolean;
  decimal: boolean;
  string: boolean;
  [key: string]: boolean;
}
export const reverseByteOrder = (value: string): string => {
  const chunks = value.split(" ").reverse().join(" ");
  return chunks;
};

const Formatter = () => {
  const [type, setType] = useState("Binary");
  const [binaryBL, setBinaryBL] = useState("Big");
  const [bytesBL, setBytesBL] = useState("Big");
  const [hexBL, setHexBL] = useState("Big");
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [convertedValues, setConvertedValues] =
    useState<ConversionResult | null>(null);
  const [showBinaryCopyMessage, setShowBinaryCopyMessage] = useState(false);
  const [showBytesCopyMessage, setShowBytesCopyMessage] = useState(false);
  const [showHexCopyMessage, setShowHexCopyMessage] = useState(false);
  const [showDecimalCopyMessage, setShowDecimalCopyMessage] = useState(false);
  const [showStringCopyMessage, setShowStringCopyMessage] = useState(false);
  const [outputVisibility, setOutputVisibility] = useState<OutputVisibility>({
    binary: false,
    bytes: false,
    hex: false,
    decimal: false,
    string: false,
  });
  const [animateBinary, setAnimateBinary] = useState(false);

  const toggleVisibility = (outputType: keyof OutputVisibility) => {
    setOutputVisibility((prev) => ({
      ...prev,
      [outputType]: !prev[outputType],
    }));
  };

  const getConversions = (value: string, type: string): ConversionResult => {
    let error: string | undefined;

    const isValidBinary = (val: string) => /^[01\s]+$/.test(val);
    const isValidDecimal = (val: string) => /^\d+$/.test(val);
    // const isValidHexadecimal = (val: string) => /^[0-9A-Fa-f\s]+$/.test(val);
    const isValidHexadecimal = (val: string) =>
      /^(0x)?[0-9A-Fa-f\s]+$/.test(val);
    const isValidBytes = (val: string) => /^[0-9\s]+$/.test(val);
    const isValidString = (val: string) => typeof val === "string";

    switch (type) {
      case "Binary":
        if (!isValidBinary(value)) error = "Invalid binary input";
        break;
      case "Decimal":
        if (!isValidDecimal(value)) error = "Invalid decimal input";
        break;
      case "Hexadecimal":
        if (!isValidHexadecimal(value)) error = "Invalid hexadecimal input";
        break;
      case "Bytes":
        if (!isValidBytes(value)) error = "Invalid bytes input";
        break;
      case "String":
        if (!isValidString(value)) error = "Invalid string input";
        break;
    }

    if (error) {
      return {
        Binary: "",
        Decimal: "",
        Hexadecimal: "",
        Bytes: "",
        String: "",
        error,
      };
    }
    switch (type) {
      case "Binary":
        // Split the binary into 8-bit chunks.
        let chunks = value.match(/.{1,8}/g) || [];

        // Convert each 8-bit chunk into decimal.
        let bytesFromBinary = chunks
          .map((chunk) => parseInt(chunk, 2).toString())
          .join(" ");

        // Convert the entire binary string into decimal.
        let decFromBinary = parseInt(value, 2).toString(10);

        // Convert the entire binary string into hexadecimal and ensure it's in uppercase.
        let hexValue = parseInt(value, 2).toString(16).toUpperCase();

        // Pad with a leading zero if the length is odd
        if (hexValue.length % 2 !== 0) {
          hexValue = "0" + hexValue;
        }

        // Split the hexadecimal string into pairs of two characters, handling the possibility of null
        let hexMatches = hexValue.match(/.{1,2}/g);
        let hexFromBinary = hexMatches ? hexMatches.join(" ") : "";

        // Convert each 8-bit chunk into its respective character.
        let stringFromBinary = chunks
          .map((chunk) => String.fromCharCode(parseInt(chunk, 2)))
          .join("");

        return {
          Binary: chunks.join(" "),
          Decimal: decFromBinary,
          Hexadecimal: hexFromBinary,
          Bytes: bytesFromBinary,
          String: stringFromBinary,
        };
      case "Bytes":
        let position = 0;
        let bytes = [];
        while (position < value.length) {
          // Try to grab 3 characters, if possible
          let byte = value.substring(position, position + 3);

          // If the value exceeds 255 or the remaining length is less than 3, reduce the byte length
          while (
            parseInt(byte) > 255 ||
            byte.length > value.length - position
          ) {
            byte = byte.substring(0, byte.length - 1);
          }

          bytes.push(byte);
          position += byte.length;
        }
        console.log("Parsed bytes:", bytes);

        // Convert bytes to respective formats
        let stringFromBytes = bytes
          .map((byte) => String.fromCharCode(parseInt(byte, 10)))
          .join("");
        console.log("Converted String:", stringFromBytes);

        let hexFromBytes = bytes
          .map((byte) =>
            parseInt(byte, 10).toString(16).toUpperCase().padStart(2, "0")
          )
          .join(" ");
        console.log("Converted Hex:", hexFromBytes);

        let binaryChunksFromBytes = bytes.map((byte) =>
          parseInt(byte, 10).toString(2).padStart(8, "0")
        );
        let binaryFromBytes = binaryChunksFromBytes.join(" ");
        console.log("Converted Binary:", binaryFromBytes);

        let decimalFromBytes = parseInt(binaryFromBytes, 2).toString(10);
        console.log("Converted Decimal:", decimalFromBytes);

        return {
          Binary: binaryFromBytes,
          Decimal: decimalFromBytes,
          Hexadecimal: hexFromBytes,
          Bytes: bytes.join(" "),
          String: stringFromBytes,
        };

      case "Decimal":
        // Convert decimal to binary
        let binFromDec = parseInt(value, 10).toString(2).padStart(32, "0");

        // Split the binary into 8-bit chunks
        let binaryChunks = binFromDec.match(/.{1,8}/g) || [];

        // Convert binary chunks to their respective characters, decimals, and hex
        let stringFromDec = binaryChunks
          .map((chunk) => String.fromCharCode(parseInt(chunk, 2)))
          .join("");
        let bytesFromDec = binaryChunks
          .map((chunk) => parseInt(chunk, 2).toString())
          .join(" ");
        let hexFromDec = binaryChunks
          .map((chunk) => parseInt(chunk, 2).toString(16).toUpperCase())
          .join(" ");

        return {
          Binary: binaryChunks.join(" "),
          Decimal: value,
          Hexadecimal: hexFromDec,
          Bytes: bytesFromDec,
          String: stringFromDec,
        };

      case "Hexadecimal":
        let binFromHexArray = [];
        let byteArray = [];

        for (let i = 0; i < value.length; i += 2) {
          let hexChunk = value.substring(i, i + 2);
          let binChunk = parseInt(hexChunk, 16).toString(2).padStart(8, "0");
          binFromHexArray.push(binChunk);
          byteArray.push(parseInt(hexChunk, 16).toString());
        }

        let binFromHex = binFromHexArray.join(" ");
        let bytesFromHex = byteArray.join(" ");

        return {
          Binary: binFromHex,
          Decimal: parseInt(value, 16).toString(10),
          Hexadecimal: value.replace(/(.{2})/g, "$1 ").trim(),
          Bytes: bytesFromHex,
          String: String.fromCharCode(
            ...byteArray.map((byte) => parseInt(byte, 10))
          ),
        };
      case "String":
        let binArray = value
          .split("")
          .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"));

        let binFromString = binArray.join(" ");

        let decFromString = parseInt(binArray.join(""), 2).toString(10);

        let hexFromString = value
          .split("")
          .map((char) => char.charCodeAt(0).toString(16).toUpperCase())
          .join(" ");

        let bytesFromString = value
          .split("")
          .map((char) => char.charCodeAt(0).toString())
          .join(" ");

        return {
          Binary: binFromString,
          Decimal: decFromString,
          Hexadecimal: hexFromString,
          Bytes: bytesFromString,
          String: value,
        };
      default:
        return {
          Binary: "",
          Decimal: "",
          Hexadecimal: "",
          Bytes: "",
          String: "",
        };
    }
  };

  useEffect(() => {
    const result = getConversions(value, type);

    if (result.error) {
      setError(result.error);
      setConvertedValues(null);
    } else {
      setError(null);
      setConvertedValues(result);
    }
  }, [value, type]);

  const handleCopy = (
    valueToCopy?: string,
    callback?: (value: boolean) => void
  ) => {
    if (!valueToCopy) {
      return;
    }
    console.log("handleCopy called with value:", valueToCopy);

    navigator.clipboard
      .writeText(valueToCopy)
      .then(() => {
        console.log("Text copied to clipboard");

        // Show the "Copied to Clipboard" message
        if (callback) {
          callback(true);
        }

        // Auto-hide the message after 2 seconds
        setTimeout(() => {
          if (callback) {
            callback(false);
          }
        }, 2000);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <div className="mx-10 mb-10 mt-10 md:ml-[260px] md:mr-5">
      <div className="flex flex-col">
        <p className="font-extralight text-[#687588]">Utility Tool</p>
        <div className="mt-5 flex flex-col  items-center justify-between md:flex-row">
          <p className="font-bold text-black">
            Data{" "}
            <span className="ml-1 font-extralight text-black">(input)</span>
          </p>
          <div className="flex flex-row">
            <div className="mt-2 flex flex-row rounded-full bg-[#F3F3F3] p-2 md:mt-0">
              <button
                className={`flex h-[30px] w-[80px] items-center justify-center rounded-full text-[10px] font-extralight md:w-[120px] md:text-[14px] ${
                  type === "Binary"
                    ? "bg-[#0C071D] text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setType("Binary")}
              >
                Binary
              </button>
              <button
                className={`flex h-[30px] w-[80px] items-center justify-center rounded-full  text-[10px] font-extralight md:w-[120px] md:text-[14px] ${
                  type === "Bytes"
                    ? "bg-[#0C071D] text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setType("Bytes")}
              >
                Bytes
              </button>
              <button
                className={`flex h-[30px] w-[80px] items-center justify-center rounded-full  text-[10px] font-extralight md:w-[120px] md:text-[14px] ${
                  type === "Hexadecimal"
                    ? "bg-[#0C071D] text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setType("Hexadecimal")}
              >
                Hexadecimal
              </button>
              <button
                className={`flex h-[30px] w-[80px] items-center justify-center rounded-full  text-[10px] font-extralight md:w-[120px] md:text-[14px] ${
                  type === "Decimal"
                    ? "bg-[#0C071D] text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setType("Decimal")}
              >
                Decimal
              </button>
              <button
                className={`flex h-[30px] w-[80px] items-center justify-center rounded-full  text-[10px] font-extralight md:w-[120px] md:text-[14px] ${
                  type === "String"
                    ? "bg-[#0C071D] text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setType("String")}
              >
                String
              </button>
            </div>
          </div>
        </div>
        {value !== "" && error && <p className="mt-2 text-red-500 ">{error}</p>}
        <div style={{ position: "relative" }}>
          <textarea
            className="mt-5 h-[72px] w-full rounded-full bg-black p-6 text-white outline-none"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => {
              const inputValue = e.target.value;
              const sanitizedValue =
                type === "String" ? inputValue : inputValue.replace(/\s+/g, "");
              setValue(sanitizedValue);
              setOutputVisibility({
                binary: true,
                bytes: true,
                hex: true,
                decimal: true,
                string: true,
              });
            }}
            value={value}
            ref={textAreaRef}
          ></textarea>

          {!value && !focused && (
            <span
              style={{
                position: "absolute",
                top: "55%",
                left: "20px",
                transform: "translateY(-50%)",
                color: "white",
                cursor: "text",
              }}
              onClick={() => textAreaRef.current && textAreaRef.current.focus()}
              className="text-[12px] md:text-[16px]"
            >
              Type | paste <strong>{type}</strong> to cast to other formats...
            </span>
          )}
        </div>

        <div className="mt-5 rounded-full border-[4px] border-[#F79327]"></div>

        <>
          <BinaryOutput
            convertedValues={convertedValues}
            outputVisibility={outputVisibility}
            toggleVisibility={toggleVisibility}
            setShowBinaryCopyMessage={setShowBinaryCopyMessage}
            showBinaryCopyMessage={showBinaryCopyMessage}
            value={value}
            handleCopy={handleCopy}
            binaryBL={binaryBL}
            setBinaryBL={setBinaryBL}
          />
          {type !== "Bytes" && (
            <BytesOutput
              convertedValues={convertedValues}
              outputVisibility={outputVisibility}
              toggleVisibility={toggleVisibility}
              setShowBytesCopyMessage={setShowBytesCopyMessage}
              showBytesCopyMessage={showBytesCopyMessage}
              value={value}
              handleCopy={handleCopy}
              bytesBL={bytesBL}
              setBytesBL={setBytesBL}
            />
          )}

          {type !== "Hexadecimal" && (
            <HexOutput
              convertedValues={convertedValues}
              outputVisibility={outputVisibility}
              toggleVisibility={toggleVisibility}
              setShowHexCopyMessage={setShowHexCopyMessage}
              showHexCopyMessage={showHexCopyMessage}
              value={value}
              handleCopy={handleCopy}
              hexBL={hexBL}
              setHexBL={setHexBL}
            />
          )}

          {type !== "Decimal" && type !== "String" && (
            <DecimalOutput
              convertedValues={convertedValues}
              outputVisibility={outputVisibility}
              toggleVisibility={toggleVisibility}
              setShowDecimalCopyMessage={setShowDecimalCopyMessage}
              showDecimalCopyMessage={showDecimalCopyMessage}
              value={value}
              handleCopy={handleCopy}
            />
          )}

          {type !== "String" && type !== "Decimal" && type !== "Binary" && (
            <StringOutput
              convertedValues={convertedValues}
              outputVisibility={outputVisibility}
              toggleVisibility={toggleVisibility}
              setShowStringCopyMessage={setShowStringCopyMessage}
              showStringCopyMessage={showStringCopyMessage}
              value={value}
              handleCopy={handleCopy}
            />
          )}
        </>
      </div>
    </div>
  );
};

export default Formatter;
