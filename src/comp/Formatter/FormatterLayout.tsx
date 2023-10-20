import { useRef, useState } from "react";

const Formatter = () => {
  const [type, setType] = useState("Binary");
  const [bytesBL, setBytesBL] = useState("Big");
  const [hexBL, setHexBL] = useState("Big");
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

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
        ></textarea>
        <div className="mt-5 flex flex-row items-center justify-between">
          <p className="font-bold text-black">
            {type === "Decimal" ? "Binary" : "Decimal"}
          </p>
        </div>
        <textarea
          className="mt-5 h-[72px] rounded-full bg-[#F3F3F3] p-6 text-black outline-none"
          placeholder="waiting for input..."
        ></textarea>
        <div className="mt-5 flex flex-row items-center justify-between">
          <p className="font-bold text-black">
            {type === "String" ? "Binary" : "String"}
          </p>
        </div>
        <textarea
          className="mt-5 h-[72px] rounded-full bg-[#F3F3F3] p-6 text-black outline-none"
          placeholder="waiting for input..."
        ></textarea>
      </div>
    </div>
  );
};

export default Formatter;
