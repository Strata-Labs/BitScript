import { useRef, useState, useEffect } from "react";

const Formatter = () => {
  const [type, setType] = useState("Binary");
  const [bytesBL, setBytesBL] = useState("Big");
  const [hexBL, setHexBL] = useState("Big");
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [convertedValues, setConvertedValues] = useState({
    Binary: "",
    Bytes: "",
    Hexadecimal: "",
    Decimal: "",
    String: "",
  });

  console.log("values", value);

  const getConversions = (
    value: string,
    type: string
  ): {
    Binary: string;
    Decimal: string;
    Hexadecimal: string;
    Bytes: string;
    String: string;
  } => {
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

        // Convert the entire binary string into hexadecimal.
        let hexFromBinary = parseInt(value, 2).toString(16).toUpperCase();

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
      // Split the input by spaces to get each byte
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
          .join("");
        console.log("Converted Hex:", hexFromBytes);

        let binaryChunksFromBytes = bytes.map((byte) =>
          parseInt(byte, 10).toString(2).padStart(8, "0")
        );
        let binaryFromBytes = binaryChunksFromBytes.join("");
        console.log("Converted Binary:", binaryFromBytes);

        let decimalFromBytes = parseInt(binaryFromBytes, 2).toString(10);
        console.log("Converted Decimal:", decimalFromBytes);

        return {
          Binary: binaryFromBytes,
          Decimal: decimalFromBytes,
          Hexadecimal: hexFromBytes,
          Bytes: value,
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
          .join("");
        let hexFromDec = binaryChunks
          .map((chunk) => parseInt(chunk, 2).toString(16).toUpperCase())
          .join("");

        return {
          Binary: binFromDec,
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
          Hexadecimal: value,
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
    setConvertedValues(getConversions(value, type));
  }, [value, type]);

  return (
    <div className="mx-10 mb-10 mt-10 md:ml-[260px] md:mr-5">
      <div className="flex flex-col">
        <p className="font-extralight text-[#687588]">Utility Tool</p>
        <div className="mt-5 flex flex-row items-center justify-between">
          <p className="font-bold text-black">
            Data{" "}
            <span className="ml-1 font-extralight text-black">(input)</span>
          </p>
          <div className="flex flex-row">
            <div className="flex flex-row rounded-full bg-[#F3F3F3] p-2">
              <button
                className={`flex h-[30px] w-[120px] items-center justify-center rounded-full text-[14px] font-extralight ${
                  type === "Binary"
                    ? "bg-[#0C071D] text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setType("Binary")}
              >
                Binary
              </button>
              <button
                className={`flex h-[30px] w-[120px] items-center justify-center rounded-full text-[14px] font-extralight ${
                  type === "Bytes"
                    ? "bg-[#0C071D] text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setType("Bytes")}
              >
                Bytes
              </button>
              <button
                className={`flex h-[30px] w-[120px] items-center justify-center rounded-full text-[14px] font-extralight ${
                  type === "Hexadecimal"
                    ? "bg-[#0C071D] text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setType("Hexadecimal")}
              >
                Hexadecimal
              </button>
              <button
                className={`flex h-[30px] w-[120px] items-center justify-center rounded-full text-[14px] font-extralight ${
                  type === "Decimal"
                    ? "bg-[#0C071D] text-white"
                    : "bg-transparent text-black"
                }`}
                onClick={() => setType("Decimal")}
              >
                Decimal
              </button>
              <button
                className={`flex h-[30px] w-[120px] items-center justify-center rounded-full text-[14px] font-extralight ${
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
        <div style={{ position: "relative" }}>
          <textarea
            className="mt-5 h-[72px] w-full rounded-full bg-black p-6 text-white outline-none"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => setValue(e.target.value)}
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
            >
              Type | paste <strong>{type}</strong> to cast to other formats...
            </span>
          )}
        </div>
        <div className="mt-5 rounded-full border-[4px] border-[#F79327]"></div>
        <div className="mt-5 flex flex-row items-center justify-between">
          <p className="font-bold text-black">
            {type === "Bytes" ? "Binary" : "Bytes"}
          </p>

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
        </div>
        <textarea
          className="mt-5 h-[72px] rounded-full bg-[#F3F3F3] p-6 text-black outline-none"
          placeholder="waiting for input..."
          value={
            value
              ? type === "Bytes"
                ? convertedValues.Binary
                : convertedValues.Bytes
              : ""
          }
          readOnly
        ></textarea>
        <div className="mt-5 flex flex-row items-center justify-between">
          <p className="font-bold text-black">
            {type === "Hexadecimal" ? "Binary" : "Hexadecimal"}
          </p>
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
        </div>
        <textarea
          className="mt-5 h-[72px] rounded-full bg-[#F3F3F3] p-6 text-black outline-none"
          placeholder="waiting for input..."
          value={
            value
              ? type === "Hexadecimal"
                ? convertedValues.Binary
                : convertedValues.Hexadecimal
              : ""
          }
          readOnly
        ></textarea>

        <div className="mt-5 flex flex-row items-center justify-between">
          <p className="font-bold text-black">
            {type === "Decimal" ? "Binary" : "Decimal"}
          </p>
        </div>
        <textarea
          className="mt-5 h-[72px] rounded-full bg-[#F3F3F3] p-6 text-black outline-none"
          placeholder="waiting for input..."
          value={
            value
              ? type === "Decimal"
                ? convertedValues.Binary
                : convertedValues.Decimal
              : ""
          }
          readOnly
        ></textarea>

        <div className="mt-5 flex flex-row items-center justify-between">
          <p className="font-bold text-black">
            {type === "String" ? "Binary" : "String"}
          </p>
        </div>
        <textarea
          className="mt-5 h-[72px] rounded-full bg-[#F3F3F3] p-6 text-black outline-none"
          placeholder="waiting for input..."
          value={
            value
              ? type === "String"
                ? convertedValues.Binary
                : convertedValues.String
              : ""
          }
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default Formatter;
