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
  Base58Output,
  Bech32Output,
  Bech32mOutput,
} from "./FormatterViews";
import bs58 from "bs58";
import { bech32, bech32m } from "bech32";
import { hexToBytes, bytesToHex } from "@noble/hashes/utils";
import { sha256 } from "@noble/hashes/sha256";

// type values should always live outside of the component
export type ConversionResult = {
  Binary: string;
  Decimal: string;
  Hexadecimal: string;
  Bytes: string;
  String: string;
  Base58: string;
  Bech32: string;
  Bech32m: string;
  error?: string;
};

export interface OutputVisibility {
  binary: boolean;
  bytes: boolean;
  hex: boolean;
  decimal: boolean;
  string: boolean;
  base58: boolean;
  bech32: boolean;
  bech32m: boolean;
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
  const [showBase58CopyMessage, setShowBase58CopyMessage] = useState(false);
  const [showBech32CopyMessage, setShowBech32CopyMessage] = useState(false);
  const [showBech32mCopyMessage, setShowBech32mCopyMessage] = useState(false);
  const [outputVisibility, setOutputVisibility] = useState<OutputVisibility>({
    binary: false,
    bytes: false,
    hex: true,
    decimal: false,
    string: false,
    base58: false,
    bech32: false,
    bech32m: false,
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
    const isValidHexadecimal = (val: string) => /^[0-9A-Fa-f\s]+$/.test(val);
    const isValidBytes = (val: string) => /^[0-9\s]+$/.test(val);
    const isValidString = (val: string) => typeof val === "string";
    const isValidBase58 = (val: string) =>
      /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/.test(
        val
      );
    const isValidBech32 = (val: string) =>
      /^(bc|tb|bcrt)1[023456789acdefghjklmnpqrstuvwxyz]+$/.test(val);
    const isValidBech32m = (val: string) =>
      /^(bc|tb|bcrt)1p[023456789acdefghjklmnpqrstuvwxyz]+$/.test(val);

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
      case "Base58":
        if (!isValidBase58(value)) error = "Invalid Base58 input";
        break;
      case "Bech32":
        if (!isValidBech32(value)) error = "Invalid Bech32 input";
        break;
      case "Bech32m":
        if (!isValidBech32m(value)) error = "Invalid Bech32m input";
        break;
    }

    if (error) {
      return {
        Binary: "",
        Decimal: "",
        Hexadecimal: "",
        Bytes: "",
        String: "",
        Base58: "",
        Bech32: "",
        Bech32m: "",
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

        // Add Base58, Bech32, and Bech32m conversions
        let base58FromBinary = "";
        let bech32FromBinary = "";
        let bech32mFromBinary = "";

        try {
          // Convert binary to hex first
          base58FromBinary = hexToBase58(hexFromBinary);

          // Convert to Bech32 and Bech32m without length restrictions
          bech32FromBinary = hexToBech32(hexFromBinary);
          bech32mFromBinary = hexToBech32m(hexFromBinary);
        } catch (e) {
          // If conversion fails, leave them empty
        }

        return {
          Binary: chunks.join(" "),
          Decimal: decFromBinary,
          Hexadecimal: hexFromBinary,
          Bytes: bytesFromBinary,
          String: stringFromBinary,
          Base58: base58FromBinary,
          Bech32: bech32FromBinary,
          Bech32m: bech32mFromBinary,
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

        // Add Base58, Bech32, and Bech32m conversions
        let base58FromBytes = "";
        let bech32FromBytes = "";
        let bech32mFromBytes = "";

        try {
          // Convert bytes to hex first
          const bytesAsNumbers = bytes.map((byte) => parseInt(byte, 10));
          const hexFromBytes = bytesToHex(new Uint8Array(bytesAsNumbers));
          base58FromBytes = hexToBase58(hexFromBytes);

          // Convert to Bech32 and Bech32m without length restrictions
          bech32FromBytes = hexToBech32(hexFromBytes);
          bech32mFromBytes = hexToBech32m(hexFromBytes);
        } catch (e) {
          // If conversion fails, leave them empty
        }

        return {
          Binary: binaryFromBytes,
          Decimal: decimalFromBytes,
          Hexadecimal: hexFromBytes,
          Bytes: bytes.join(" "),
          String: stringFromBytes,
          Base58: base58FromBytes,
          Bech32: bech32FromBytes,
          Bech32m: bech32mFromBytes,
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

        // Add Base58, Bech32, and Bech32m conversions
        let base58FromDec = "";
        let bech32FromDec = "";
        let bech32mFromDec = "";

        try {
          base58FromDec = hexToBase58(hexFromDec);

          // Convert to Bech32 and Bech32m without length restrictions
          bech32FromDec = hexToBech32(hexFromDec);
          bech32mFromDec = hexToBech32m(hexFromDec);
        } catch (e) {
          // If conversion fails, leave them empty
        }

        return {
          Binary: binaryChunks.join(" "),
          Decimal: value,
          Hexadecimal: hexFromDec,
          Bytes: bytesFromDec,
          String: stringFromDec,
          Base58: base58FromDec,
          Bech32: bech32FromDec,
          Bech32m: bech32mFromDec,
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

        // Add Base58, Bech32, and Bech32m conversions
        let base58FromHex = "";
        let bech32FromHex = "";
        let bech32mFromHex = "";

        try {
          base58FromHex = hexToBase58(value);

          // Convert to Bech32 and Bech32m without length restrictions
          bech32FromHex = hexToBech32(value);
          bech32mFromHex = hexToBech32m(value);
        } catch (e) {
          // If conversion fails, leave them empty
        }

        return {
          Binary: binFromHex,
          Decimal: parseInt(value, 16).toString(10),
          Hexadecimal: value.replace(/(.{2})/g, "$1 ").trim(),
          Bytes: bytesFromHex,
          String: String.fromCharCode(
            ...byteArray.map((byte) => parseInt(byte, 10))
          ),
          Base58: base58FromHex,
          Bech32: bech32FromHex,
          Bech32m: bech32mFromHex,
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

        // Add Base58, Bech32, and Bech32m conversions
        let base58FromString = "";
        let bech32FromString = "";
        let bech32mFromString = "";

        try {
          // Convert string to hex first
          const bytesAsUint8Array = new TextEncoder().encode(value);
          const hexFromString = bytesToHex(bytesAsUint8Array);
          base58FromString = hexToBase58(hexFromString);

          // Convert to Bech32 and Bech32m without length restrictions
          bech32FromString = hexToBech32(hexFromString);
          bech32mFromString = hexToBech32m(hexFromString);
        } catch (e) {
          // If conversion fails, leave them empty
        }

        return {
          Binary: binFromString,
          Decimal: decFromString,
          Hexadecimal: hexFromString,
          Bytes: bytesFromString,
          String: value,
          Base58: base58FromString,
          Bech32: bech32FromString,
          Bech32m: bech32mFromString,
        };
      case "Base58":
        if (!isValidBase58(value)) {
          return {
            Binary: "",
            Decimal: "",
            Hexadecimal: "",
            Bytes: "",
            String: "",
            Base58: value,
            Bech32: "",
            Bech32m: "",
            error: "Invalid Base58 input",
          };
        }

        try {
          // Convert Base58 to hex
          const hex = base58ToHex(value);

          // Convert hex to other formats
          const bytes = hexToBytes(hex);
          const bytesStr = Array.from(bytes).join(" ");

          // Try to convert to string if possible
          let stringValue = "";
          try {
            stringValue = new TextDecoder().decode(bytes);
          } catch (e) {
            // If it's not valid UTF-8, leave it empty
          }

          // Convert to decimal (big integer)
          const decimal = BigInt("0x" + hex).toString();

          // Convert to binary
          const binary = Array.from(bytes)
            .map((byte) => byte.toString(2).padStart(8, "0"))
            .join(" ");

          // Convert to Bech32 and Bech32m without length restrictions
          let bech32Value = "";
          let bech32mValue = "";

          try {
            bech32Value = hexToBech32(hex);
            bech32mValue = hexToBech32m(hex);
          } catch (e) {
            // If conversion fails, leave them empty
          }

          return {
            Binary: binary,
            Decimal: decimal,
            Hexadecimal: hex,
            Bytes: bytesStr,
            String: stringValue,
            Base58: value,
            Bech32: bech32Value,
            Bech32m: bech32mValue,
          };
        } catch (error) {
          return {
            Binary: "",
            Decimal: "",
            Hexadecimal: "",
            Bytes: "",
            String: "",
            Base58: value,
            Bech32: "",
            Bech32m: "",
            error: "Error converting Base58",
          };
        }
      case "Bech32":
        if (!isValidBech32(value)) {
          return {
            Binary: "",
            Decimal: "",
            Hexadecimal: "",
            Bytes: "",
            String: "",
            Base58: "",
            Bech32: value,
            Bech32m: "",
            error: "Invalid Bech32 input",
          };
        }

        try {
          // Convert Bech32 to hex
          const hex = bech32ToHex(value);

          // Convert hex to other formats
          const bytes = hexToBytes(hex);
          const bytesStr = Array.from(bytes).join(" ");

          // Try to convert to string if possible
          let stringValue = "";
          try {
            stringValue = new TextDecoder().decode(bytes);
          } catch (e) {
            // If it's not valid UTF-8, leave it empty
          }

          // Convert to decimal (big integer)
          const decimal = BigInt("0x" + hex).toString();

          // Convert to binary
          const binary = Array.from(bytes)
            .map((byte) => byte.toString(2).padStart(8, "0"))
            .join(" ");

          // Convert to Base58 and Bech32m
          let base58Value = "";
          let bech32mValue = "";
          try {
            base58Value = hexToBase58(hex);
            bech32mValue = hexToBech32m(hex);
          } catch (e) {
            // If conversion fails, leave it empty
          }

          return {
            Binary: binary,
            Decimal: decimal,
            Hexadecimal: hex,
            Bytes: bytesStr,
            String: stringValue,
            Base58: base58Value,
            Bech32: value,
            Bech32m: bech32mValue,
          };
        } catch (error) {
          return {
            Binary: "",
            Decimal: "",
            Hexadecimal: "",
            Bytes: "",
            String: "",
            Base58: "",
            Bech32: value,
            Bech32m: "",
            error: "Error converting Bech32",
          };
        }
      case "Bech32m":
        if (!isValidBech32m(value)) {
          return {
            Binary: "",
            Decimal: "",
            Hexadecimal: "",
            Bytes: "",
            String: "",
            Base58: "",
            Bech32: "",
            Bech32m: value,
            error: "Invalid Bech32m input",
          };
        }

        try {
          // Convert Bech32m to hex
          const hex = bech32mToHex(value);

          // Convert hex to other formats
          const bytes = hexToBytes(hex);
          const bytesStr = Array.from(bytes).join(" ");

          // Try to convert to string if possible
          let stringValue = "";
          try {
            stringValue = new TextDecoder().decode(bytes);
          } catch (e) {
            // If it's not valid UTF-8, leave it empty
          }

          // Convert to decimal (big integer)
          const decimal = BigInt("0x" + hex).toString();

          // Convert to binary
          const binary = Array.from(bytes)
            .map((byte) => byte.toString(2).padStart(8, "0"))
            .join(" ");

          // Convert to Base58 and Bech32
          let base58Value = "";
          let bech32Value = "";
          try {
            base58Value = hexToBase58(hex);
            bech32Value = hexToBech32(hex);
          } catch (e) {
            // If conversion fails, leave it empty
          }

          return {
            Binary: binary,
            Decimal: decimal,
            Hexadecimal: hex,
            Bytes: bytesStr,
            String: stringValue,
            Base58: base58Value,
            Bech32: bech32Value,
            Bech32m: value,
          };
        } catch (error) {
          return {
            Binary: "",
            Decimal: "",
            Hexadecimal: "",
            Bytes: "",
            String: "",
            Base58: "",
            Bech32: "",
            Bech32m: value,
            error: "Error converting Bech32m",
          };
        }
      default:
        return {
          Binary: "",
          Decimal: "",
          Hexadecimal: "",
          Bytes: "",
          String: "",
          Base58: "",
          Bech32: "",
          Bech32m: "",
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

  // Helper functions for Base58, Bech32, and Bech32m conversions
  const hexToBase58 = (hex: string): string => {
    try {
      // Remove 0x prefix if present
      const cleanHex = hex.startsWith("0x") ? hex.slice(2) : hex;
      // Convert hex to bytes
      const bytes = hexToBytes(cleanHex);
      // Encode to Base58
      return bs58.encode(bytes);
    } catch (error) {
      return "";
    }
  };

  const base58ToHex = (base58Str: string): string => {
    try {
      // Decode Base58 to bytes
      const bytes = bs58.decode(base58Str);
      // Convert bytes to hex
      return bytesToHex(bytes);
    } catch (error) {
      return "";
    }
  };

  const hexToBech32 = (hex: string, hrp: string = "bc"): string => {
    try {
      // Remove 0x prefix if present
      const cleanHex = hex.startsWith("0x") ? hex.slice(2) : hex;
      // Convert hex to bytes
      const bytes = hexToBytes(cleanHex);
      // Convert bytes to words
      const words = bech32.toWords(bytes);
      // Encode to Bech32 with version 0 (for P2WPKH/P2WSH)
      return bech32.encode(hrp, [0, ...words]);
    } catch (error) {
      return "";
    }
  };

  const bech32ToHex = (bech32Str: string): string => {
    try {
      // Decode Bech32
      const decoded = bech32.decode(bech32Str);
      // Convert words to bytes (skip the first word which is the version)
      const bytes = bech32.fromWords(decoded.words.slice(1));
      // Convert bytes to hex
      return bytesToHex(new Uint8Array(bytes));
    } catch (error) {
      return "";
    }
  };

  const hexToBech32m = (hex: string, hrp: string = "bc"): string => {
    try {
      // Remove 0x prefix if present
      const cleanHex = hex.startsWith("0x") ? hex.slice(2) : hex;
      // Convert hex to bytes
      const bytes = hexToBytes(cleanHex);
      // Convert bytes to words
      const words = bech32m.toWords(bytes);
      // Encode to Bech32m with version 1 (for P2TR)
      return bech32m.encode(hrp, [1, ...words]);
    } catch (error) {
      return "";
    }
  };

  const bech32mToHex = (bech32mStr: string): string => {
    try {
      // Decode Bech32m
      const decoded = bech32m.decode(bech32mStr);
      // Convert words to bytes (skip the first word which is the version)
      const bytes = bech32m.fromWords(decoded.words.slice(1));
      // Convert bytes to hex
      return bytesToHex(new Uint8Array(bytes));
    } catch (error) {
      return "";
    }
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
          <div className="mt-2 flex w-full flex-row overflow-x-auto whitespace-nowrap rounded-full bg-[#F3F3F3] p-2 md:mt-0">
            <div className="flex flex-row justify-center">
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
              <button
                className={`flex h-[30px] w-[80px] items-center justify-center rounded-full  text-[10px] font-extralight md:w-[120px] md:text-[14px] ${
                  type === "Base58"
                    ? "bg-[#0C071D] text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setType("Base58")}
              >
                Base58
              </button>
              <button
                className={`flex h-[30px] w-[80px] items-center justify-center rounded-full  text-[10px] font-extralight md:w-[120px] md:text-[14px] ${
                  type === "Bech32"
                    ? "bg-[#0C071D] text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setType("Bech32")}
              >
                Bech32
              </button>
              <button
                className={`flex h-[30px] w-[80px] items-center justify-center rounded-full  text-[10px] font-extralight md:w-[120px] md:text-[14px] ${
                  type === "Bech32m"
                    ? "bg-[#0C071D] text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setType("Bech32m")}
              >
                Bech32m
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

          {type !== "Decimal" && (
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

          {type !== "String" && (
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

          {type !== "Base58" && (
            <Base58Output
              convertedValues={convertedValues}
              outputVisibility={outputVisibility}
              toggleVisibility={toggleVisibility}
              setShowBase58CopyMessage={setShowBase58CopyMessage}
              showBase58CopyMessage={showBase58CopyMessage}
              value={value}
              handleCopy={handleCopy}
            />
          )}

          {type !== "Bech32" && (
            <Bech32Output
              convertedValues={convertedValues}
              outputVisibility={outputVisibility}
              toggleVisibility={toggleVisibility}
              setShowBech32CopyMessage={setShowBech32CopyMessage}
              showBech32CopyMessage={showBech32CopyMessage}
              value={value}
              handleCopy={handleCopy}
            />
          )}

          {type !== "Bech32m" && (
            <Bech32mOutput
              convertedValues={convertedValues}
              outputVisibility={outputVisibility}
              toggleVisibility={toggleVisibility}
              setShowBech32mCopyMessage={setShowBech32mCopyMessage}
              showBech32mCopyMessage={showBech32mCopyMessage}
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
