import { useRef, useState, useEffect } from "react";

const SandboxFormatter = () => {
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

  type ConversionResult = {
    Binary: string;
    Decimal: string;
    Hexadecimal: string;
    Bytes: string;
    String: string;
    error?: string;
  };

  const getConversions = (value: string, type: string): ConversionResult => {
    let error: string | undefined;

    const isValidBinary = (val: string) => /^[01\s]+$/.test(val);
    const isValidDecimal = (val: string) => /^\d+$/.test(val);
    const isValidHexadecimal = (val: string) => /^[0-9A-Fa-f\s]+$/.test(val);
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

  const reverseByteOrder = (value: string): string => {
    const chunks = value.split(" ").reverse().join(" ");
    return chunks;
  };

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

  const BinaryOutput = () => {
    const displayValue =
      binaryBL === "Little" && convertedValues
        ? reverseByteOrder(convertedValues.Binary)
        : convertedValues?.Binary;
    return (
      <>
        <div className="mt-5 flex flex-row items-center justify-between">
          <p className="font-bold text-white">Binary</p>
          <div className="flex w-full flex-row justify-end">
            <textarea
              className="relative h-[40px] w-full cursor-pointer rounded-full bg-transparent p-2 text-right text-[#6C5E70] outline-none"
              placeholder="waiting for input..."
              value={value ? displayValue : ""}
              readOnly
            ></textarea>
            <button
              onClick={() => handleCopy(displayValue, setShowBinaryCopyMessage)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.3125 17.125H7.02083C5.20667 17.125 4.20833 16.1267 4.20833 14.3125V7.02083C4.20833 5.20667 5.20667 4.20833 7.02083 4.20833H14.3125C16.1267 4.20833 17.125 5.20667 17.125 7.02083V14.3125C17.125 16.1267 16.1267 17.125 14.3125 17.125ZM7.02083 5.45833C5.91083 5.45833 5.45833 5.91083 5.45833 7.02083V14.3125C5.45833 15.4225 5.91083 15.875 7.02083 15.875H14.3125C15.4225 15.875 15.875 15.4225 15.875 14.3125V7.02083C15.875 5.91083 15.4225 5.45833 14.3125 5.45833H7.02083ZM2.125 11.5V3.6875C2.125 2.5775 2.5775 2.125 3.6875 2.125H11.5C11.845 2.125 12.125 1.845 12.125 1.5C12.125 1.155 11.845 0.875 11.5 0.875H3.6875C1.87333 0.875 0.875 1.87333 0.875 3.6875V11.5C0.875 11.845 1.155 12.125 1.5 12.125C1.845 12.125 2.125 11.845 2.125 11.5Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>

        {value && showBinaryCopyMessage && (
          <div className=" mt-2 text-[8px] text-white">Copied to Clipboard</div>
        )}
      </>
    );
  };

  const BytesOutput = () => {
    const displayValue =
      bytesBL === "Little" && convertedValues
        ? reverseByteOrder(convertedValues.Bytes)
        : convertedValues?.Bytes;
    return (
      <>
        <div className="mt-5 flex flex-row items-center justify-between">
          <p className="font-bold text-white">Bytes</p>
          <div className="flex w-full flex-row justify-end">
            <textarea
              className="relative h-[40px] w-full cursor-pointer rounded-full bg-transparent p-2 text-right text-[#6C5E70] outline-none"
              placeholder="waiting for input..."
              value={value ? displayValue : ""}
              readOnly
            ></textarea>
            <button
              onClick={() => handleCopy(displayValue, setShowBytesCopyMessage)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.3125 17.125H7.02083C5.20667 17.125 4.20833 16.1267 4.20833 14.3125V7.02083C4.20833 5.20667 5.20667 4.20833 7.02083 4.20833H14.3125C16.1267 4.20833 17.125 5.20667 17.125 7.02083V14.3125C17.125 16.1267 16.1267 17.125 14.3125 17.125ZM7.02083 5.45833C5.91083 5.45833 5.45833 5.91083 5.45833 7.02083V14.3125C5.45833 15.4225 5.91083 15.875 7.02083 15.875H14.3125C15.4225 15.875 15.875 15.4225 15.875 14.3125V7.02083C15.875 5.91083 15.4225 5.45833 14.3125 5.45833H7.02083ZM2.125 11.5V3.6875C2.125 2.5775 2.5775 2.125 3.6875 2.125H11.5C11.845 2.125 12.125 1.845 12.125 1.5C12.125 1.155 11.845 0.875 11.5 0.875H3.6875C1.87333 0.875 0.875 1.87333 0.875 3.6875V11.5C0.875 11.845 1.155 12.125 1.5 12.125C1.845 12.125 2.125 11.845 2.125 11.5Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>

        {value && showBytesCopyMessage && (
          <div className=" mt-2 text-[8px] text-white">Copied to Clipboard</div>
        )}
      </>
    );
  };

  const HexOutput = () => {
    const displayValue =
      hexBL === "Little" && convertedValues
        ? reverseByteOrder(convertedValues.Hexadecimal)
        : convertedValues?.Hexadecimal;
    return (
      <>
        <div className="mt-5 flex flex-row items-center justify-between">
          <p className="font-bold text-white">Hexadecimal</p>
          <div className="flex w-full flex-row justify-end">
            <textarea
              className="relative h-[40px] w-full cursor-pointer rounded-full bg-transparent p-2 text-right text-[#6C5E70] outline-none"
              placeholder="waiting for input..."
              value={value ? displayValue : ""}
              readOnly
            ></textarea>
            <button
              onClick={() => handleCopy(displayValue, setShowHexCopyMessage)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.3125 17.125H7.02083C5.20667 17.125 4.20833 16.1267 4.20833 14.3125V7.02083C4.20833 5.20667 5.20667 4.20833 7.02083 4.20833H14.3125C16.1267 4.20833 17.125 5.20667 17.125 7.02083V14.3125C17.125 16.1267 16.1267 17.125 14.3125 17.125ZM7.02083 5.45833C5.91083 5.45833 5.45833 5.91083 5.45833 7.02083V14.3125C5.45833 15.4225 5.91083 15.875 7.02083 15.875H14.3125C15.4225 15.875 15.875 15.4225 15.875 14.3125V7.02083C15.875 5.91083 15.4225 5.45833 14.3125 5.45833H7.02083ZM2.125 11.5V3.6875C2.125 2.5775 2.5775 2.125 3.6875 2.125H11.5C11.845 2.125 12.125 1.845 12.125 1.5C12.125 1.155 11.845 0.875 11.5 0.875H3.6875C1.87333 0.875 0.875 1.87333 0.875 3.6875V11.5C0.875 11.845 1.155 12.125 1.5 12.125C1.845 12.125 2.125 11.845 2.125 11.5Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>

        {value && showHexCopyMessage && (
          <div className=" mt-2 text-[8px] text-white">Copied to Clipboard</div>
        )}
      </>
    );
  };

  const DecimalOutput = () => {
    return (
      <>
        <div className="mt-5 flex flex-row items-center justify-between">
          <p className="font-bold text-white">Decimal</p>
          <div className="flex w-full flex-row justify-end">
            <textarea
              className="relative h-[40px] w-full cursor-pointer rounded-full bg-transparent p-2 text-right text-[#6C5E70] outline-none"
              placeholder="waiting for input..."
              value={value && convertedValues ? convertedValues.Decimal : ""}
              readOnly
            ></textarea>
            <button
              onClick={() =>
                handleCopy(
                  convertedValues ? convertedValues.Decimal : "",
                  setShowDecimalCopyMessage
                )
              }
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.3125 17.125H7.02083C5.20667 17.125 4.20833 16.1267 4.20833 14.3125V7.02083C4.20833 5.20667 5.20667 4.20833 7.02083 4.20833H14.3125C16.1267 4.20833 17.125 5.20667 17.125 7.02083V14.3125C17.125 16.1267 16.1267 17.125 14.3125 17.125ZM7.02083 5.45833C5.91083 5.45833 5.45833 5.91083 5.45833 7.02083V14.3125C5.45833 15.4225 5.91083 15.875 7.02083 15.875H14.3125C15.4225 15.875 15.875 15.4225 15.875 14.3125V7.02083C15.875 5.91083 15.4225 5.45833 14.3125 5.45833H7.02083ZM2.125 11.5V3.6875C2.125 2.5775 2.5775 2.125 3.6875 2.125H11.5C11.845 2.125 12.125 1.845 12.125 1.5C12.125 1.155 11.845 0.875 11.5 0.875H3.6875C1.87333 0.875 0.875 1.87333 0.875 3.6875V11.5C0.875 11.845 1.155 12.125 1.5 12.125C1.845 12.125 2.125 11.845 2.125 11.5Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>

        {value && showDecimalCopyMessage && (
          <div className=" mt-2 text-[8px] text-white">Copied to Clipboard</div>
        )}
      </>
    );
  };

  const StringOutput = () => {
    return (
      <>
        <div className="mt-5 flex flex-row items-center justify-between">
          <p className="font-bold text-white">String</p>
          <div className="flex w-full flex-row justify-end">
            <textarea
              className="relative h-[40px] cursor-pointer rounded-full bg-transparent p-2 text-right text-[#6C5E70] outline-none"
              placeholder="waiting for input..."
              value={value && convertedValues ? convertedValues.String : ""}
              readOnly
            ></textarea>
            <button
              onClick={() =>
                handleCopy(
                  convertedValues ? convertedValues.String : "",
                  setShowStringCopyMessage
                )
              }
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.3125 17.125H7.02083C5.20667 17.125 4.20833 16.1267 4.20833 14.3125V7.02083C4.20833 5.20667 5.20667 4.20833 7.02083 4.20833H14.3125C16.1267 4.20833 17.125 5.20667 17.125 7.02083V14.3125C17.125 16.1267 16.1267 17.125 14.3125 17.125ZM7.02083 5.45833C5.91083 5.45833 5.45833 5.91083 5.45833 7.02083V14.3125C5.45833 15.4225 5.91083 15.875 7.02083 15.875H14.3125C15.4225 15.875 15.875 15.4225 15.875 14.3125V7.02083C15.875 5.91083 15.4225 5.45833 14.3125 5.45833H7.02083ZM2.125 11.5V3.6875C2.125 2.5775 2.5775 2.125 3.6875 2.125H11.5C11.845 2.125 12.125 1.845 12.125 1.5C12.125 1.155 11.845 0.875 11.5 0.875H3.6875C1.87333 0.875 0.875 1.87333 0.875 3.6875V11.5C0.875 11.845 1.155 12.125 1.5 12.125C1.845 12.125 2.125 11.845 2.125 11.5Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
        {value && showStringCopyMessage && (
          <div className=" mt-2 text-[8px] text-white">Copied to Clipboard</div>
        )}
      </>
    );
  };

  return (
    <div className="mx-5 mb-10 mt-5 ">
      <div className="flex flex-col">
        <p className="text-white">Data To Convert</p>
        <div className="mt-5 flex flex-col  items-center justify-between md:flex-row">
          <div className="flex w-full flex-row justify-center">
            <div className="flex flex-row justify-center rounded-full bg-[#F3F3F3] p-1">
              <button
                className={`flex h-[30px] w-[80px] items-center justify-center rounded-full text-[10px] font-extralight ${
                  type === "Binary"
                    ? "bg-[#0C071D] text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setType("Binary")}
              >
                Binary
              </button>
              <button
                className={`flex h-[30px] w-[80px] items-center justify-center rounded-full  text-[10px] font-extralight ${
                  type === "Bytes"
                    ? "bg-[#0C071D] text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setType("Bytes")}
              >
                Bytes
              </button>
              <button
                className={`flex h-[30px] w-[80px] items-center justify-center rounded-full  text-[10px] font-extralight  ${
                  type === "Hexadecimal"
                    ? "bg-[#0C071D] text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setType("Hexadecimal")}
              >
                Hexadecimal
              </button>
              <button
                className={`flex h-[30px] w-[80px] items-center justify-center rounded-full  text-[10px] font-extralight ${
                  type === "Decimal"
                    ? "bg-[#0C071D] text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setType("Decimal")}
              >
                Decimal
              </button>
              <button
                className={`flex h-[30px] w-[80px] items-center justify-center rounded-full  text-[10px] font-extralight ${
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
            className="mt-5  h-[40px] w-full rounded-full bg-[#201B31] px-5 pt-2 text-white outline-none"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => {
              const inputValue = e.target.value;
              const sanitizedValue =
                type === "String" ? inputValue : inputValue.replace(/\s+/g, "");
              setValue(sanitizedValue);
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
              className="text-[12px]"
            >
              Type | paste <strong>{type}</strong> to cast to other formats...
            </span>
          )}
        </div>

        {type === "Binary" && (
          <>
            <BytesOutput />
            <HexOutput />
            <DecimalOutput />
            <StringOutput />
          </>
        )}
        {type === "Bytes" && (
          <>
            <BinaryOutput />
            <HexOutput />
            <DecimalOutput />
            <StringOutput />
          </>
        )}
        {type === "Hexadecimal" && (
          <>
            <BinaryOutput />
            <BytesOutput />
            <DecimalOutput />
            <StringOutput />
          </>
        )}
        {type === "Decimal" && (
          <>
            <BinaryOutput />
            <BytesOutput />
            <HexOutput />
            <StringOutput />
          </>
        )}
        {type === "String" && (
          <>
            <BinaryOutput />
            <BytesOutput />
            <HexOutput />
            <DecimalOutput />
          </>
        )}
      </div>
    </div>
  );
};

export default SandboxFormatter;
