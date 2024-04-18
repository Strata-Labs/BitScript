import { ConversionResult } from "../types";

export const getConversions = (
  value: string,
  type: string
): ConversionResult => {
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
        while (parseInt(byte) > 255 || byte.length > value.length - position) {
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

export const reverseByteOrder = (value: string): string => {
  const chunks = value.split(" ").reverse().join(" ");
  return chunks;
};
