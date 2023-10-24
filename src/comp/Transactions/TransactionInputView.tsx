import { TransactionFeResponse } from "@/deserialization/model";
import ModularButton from "./ModularButton";
import { TransactionInputType } from "./TransactionsView";
import ErrorDisplayHex from "./ErrorDisplay";
import { useEffect, useState } from "react";

type TransactionInputViewProps = {
  txInputType: TransactionInputType;
  txData: TransactionFeResponse | null;
  handleSetDeserializedTx: () => any;
  txInputError: string;
  handleTextAreaChange: (e: React.ChangeEvent<any>) => void;
  txUserInput: string;
  showTxDetailView: boolean;
};

const TransactionInputView = ({
  txInputType,
  txData,
  handleSetDeserializedTx,
  txInputError,
  txUserInput,
  handleTextAreaChange,
  showTxDetailView,
}: TransactionInputViewProps) => {
  const [currentPath, setCurrentPath] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  const marginLeftClass =
    currentPath === "/home" ? "md:ml-[0px]" : "md:ml-[250px]";

  const textareaClass =
    currentPath === "/home"
      ? "mt-5 h-[60vh] w-full rounded-2xl border border-transparent bg-[#0C061C] px-8 py-4 md:h-[560px] md:p-10 text-white"
      : "mt-5 h-[70vh] w-full rounded-2xl border border-transparent bg-[#0C061C] px-8 py-4 md:h-[240px] md:p-10 text-white";

  return (
    <>
      <div className={`flex flex-col ${marginLeftClass} md:mr-[20px]`}>
        <div className="ml-5 mt-5 font-extralight text-[#6C5E70] md:mt-0">
          {currentPath !== "/home" && <p>Transactions</p>}
        </div>
        <div className=" mx-5 mt-2 font-light text-[#6C5E70]">
          <div className="hidden md:block">
            {currentPath !== "/home" && (
              <p>
                A Bitcoin transaction describes the flow of Bitcoin. Ultimately,
                a Bitcoin block is just many verified transactions & the
                blockchain itself is just a linked list of these blocks -
                <span className="font-bold">
                  which makes transactions the crux of Bitcoin.
                </span>
              </p>
            )}
            {currentPath !== "/home" && (
              <span className="mt-5">
                <p>
                  Below are two tools to{" "}
                  <span className="font-semibold text-[#F79327]">
                    read/deserialize/parse
                  </span>{" "}
                  or to{" "}
                  <span className="font-semibold text-[#F79327]">
                    write/serialize/create
                  </span>{" "}
                  a transaction.
                </p>
              </span>
            )}
          </div>
          <div className="mt-2  flex  flex-row items-center justify-between md:mt-5 md:flex-row">
            <p className="text-lg font-semibold text-[#0C071D] md:text-2xl md:text-[38px]">
              {currentPath !== "/home"
                ? "Deserialize A Transaction"
                : "Smart Parse a Transaction"}
            </p>
            <ModularButton txInputType={txInputType} />
          </div>
          {showTxDetailView ? (
            <div
              style={{
                whiteSpace: "pre-wrap",
              }}
              className="mt-5 flex min-h-[240px] w-full min-w-[1403px] flex-col items-start gap-0 overflow-hidden  break-all rounded-2xl bg-[#F0F0F0] p-8 pt-2 "
            >
              {txInputType === TransactionInputType.transactionNotFound && (
                <div className="font-semibold text-[#E92544]">
                  transaction not found - are you sure it’s in the right format?
                </div>
              )}
              {txInputType === TransactionInputType.parsingError && (
                <ErrorDisplayHex text={txInputError} />
              )}
              <div
                id="txDataTextID"
                suppressContentEditableWarning={true}
                contentEditable
              >
                {handleSetDeserializedTx()}
              </div>
            </div>
          ) : (
            <>
              {txInputType === TransactionInputType.parsingError && (
                <div className="pl-2 pt-2">
                  <ErrorDisplayHex text={txInputError} />
                </div>
              )}
              <div style={{ position: "relative" }}>
                <textarea
                  onChange={handleTextAreaChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={textareaClass}
                  value={txUserInput}
                ></textarea>
                {!txUserInput && !isFocused && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50px",
                      left: "30px",
                      color: "#aaa",
                      pointerEvents: "none",
                    }}
                    className="flex flex-row"
                  >
                    <svg
                      width="22"
                      height="23"
                      viewBox="0 0 22 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.53 19.97L16.689 16.129C17.973 14.606 18.75 12.643 18.75 10.5C18.75 5.675 14.825 1.75 10 1.75C5.175 1.75 1.25 5.675 1.25 10.5C1.25 15.325 5.175 19.25 10 19.25C12.143 19.25 14.106 18.473 15.629 17.189L19.47 21.03C19.616 21.176 19.808 21.25 20 21.25C20.192 21.25 20.384 21.177 20.53 21.03C20.823 20.738 20.823 20.263 20.53 19.97ZM2.75 10.5C2.75 6.502 6.002 3.25 10 3.25C13.998 3.25 17.25 6.502 17.25 10.5C17.25 14.498 13.998 17.75 10 17.75C6.002 17.75 2.75 14.498 2.75 10.5Z"
                        fill="white"
                        stroke="white"
                        stroke-width="2"
                      />
                    </svg>
                    <p className="ml-2 font-semibold text-white">
                      paste in a raw hex, json, transaction ID, or load an{" "}
                      <span className="text-[#E88A26] underline">example</span>{" "}
                      above
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default TransactionInputView;
