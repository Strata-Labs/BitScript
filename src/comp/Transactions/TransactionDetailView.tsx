import ErrorDisplayHex from "./ErrorDisplay";

import { TransactionFeResponse } from "../../deserialization/model";
import React from "react";
import { classNames, satsToBtc } from "@/utils";
import { ScriptTagMin } from "./PopUpSections/ScriptSig";
import dynamic from "next/dynamic";

import { KnownScript } from "@/deserialization/helpers";
import { TYPES_TX, TransactionInputType } from "./TransactionsView";

const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

type TransactionDetailViewProps = {
  setShowTxDetailView: (show: boolean) => void;
  txUserInput: string;
  txData: TransactionFeResponse;
  selectedViewType: TYPES_TX;
  setSelectedViewType: (type: TYPES_TX) => void;
  txInputType: TransactionInputType;
  txInputError: string;
  setTxInputError: (error: string) => void;
  handleSetDeserializedTx: () => any;
};
const TransactionDetailView = ({
  setShowTxDetailView,
  txUserInput,
  txData,
  selectedViewType,
  setSelectedViewType,
  txInputType,
  txInputError,
  setTxInputError,
  handleSetDeserializedTx,
}: TransactionDetailViewProps) => {
  const renderTransactionTags = () => {
    let tags: any = [];

    // Create a frequency map
    const frequencyMap: { [key: string]: number } = {};
    txData?.hexResponse.knownScripts.forEach((script) => {
      if (script !== KnownScript.NONE) {
        frequencyMap[script] = (frequencyMap[script] || 0) + 1;
      }
    });

    // Use the frequency map to render tags
    Object.keys(frequencyMap).forEach((script) => {
      const count = frequencyMap[script];

      if (txData?.hexResponse.txType) {
        tags.push(<ScriptTagMin text={txData?.hexResponse.txType} />);
      }

      const displayText = count > 1 ? `x${count} ${script}` : script;
      tags.push(
        <ScriptTagMin link={`/scripts/${script}`} text={displayText} />
      );
    });

    return tags;
  };

  return (
    <>
      <div className="ml-5 flex flex-col pr-8 md:ml-[250px] md:mr-[20px] ">
        <div className="ml-5 mt-5 flex w-full flex-row items-center justify-between pr-5 font-extralight text-[#6C5E70] md:mt-0">
          <div className="flex flex-row items-center gap-x-2">
            <a
              className="cursor-pointer"
              onClick={() => setShowTxDetailView(false)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                rotate="180deg"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2  md:ml-0"
              >
                <g transform="rotate(180 12 12)">
                  <path
                    d="M8.99978 19.7498C8.80778 19.7498 8.61575 19.6768 8.46975 19.5298C8.17675 19.2368 8.17675 18.7618 8.46975 18.4688L14.9397 11.9988L8.46975 5.52883C8.17675 5.23583 8.17675 4.7608 8.46975 4.4678C8.76275 4.1748 9.23779 4.1748 9.53079 4.4678L16.5308 11.4678C16.8238 11.7608 16.8238 12.2358 16.5308 12.5288L9.53079 19.5288C9.38379 19.6768 9.19178 19.7498 8.99978 19.7498Z"
                    fill="#F79327"
                  />
                </g>
              </svg>
            </a>

            <p className="text-[16px] font-semibold text-[#0C071D] md:text-[24px]">
              {txUserInput.slice(0, 8) + "..."}
              {txUserInput.slice(-8)}
            </p>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <p className="text-lg  text-[#0C071D] ">
              Inputs{" "}
              <span className="font-bold">{txData.hexResponse.numInputs}</span>
            </p>
            <div
              style={{
                width: "2px",
                height: "20px",
                background: "black",
              }}
            />
            <p className="text-lg  text-[#0C071D] ">
              Outputs{" "}
              <span className="font-bold">{txData.hexResponse.numInputs}</span>
            </p>
            <div
              style={{
                width: "2px",
                height: "20px",
                background: "black",
              }}
            />
            <p className="text-lg  text-[#0C071D] ">
              BTC{" "}
              <span className="font-bold">
                {satsToBtc(txData.hexResponse.totalBitcoin)}
              </span>
            </p>
          </div>
        </div>
        <div className="ml-4 flex flex-row flex-wrap items-center gap-x-4 gap-y-2 py-2 ">
          {renderTransactionTags()}
        </div>
        <div
          style={{
            whiteSpace: "pre-wrap",
          }}
          className=" ml-4   flex min-h-[240px] w-full min-w-[1393px] flex-col items-start gap-0 overflow-hidden  break-all rounded-2xl border  bg-[#F0F0F0] py-4"
        >
          <div className="flex w-full flex-row items-center justify-between px-8">
            <p className="text-lg font-semibold text-[#0C071D] ">
              {selectedViewType === TYPES_TX.JSON ? (
                "JSON Format"
              ) : (
                <>
                  Hexadecimal Format{" "}
                  <span className="font-extralight">
                    (hover to review, click to freeze)
                  </span>
                </>
              )}
            </p>
            <div className="flex flex-row">
              <span className="isolate inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => setSelectedViewType(TYPES_TX.HEX)}
                  className={classNames(
                    "relative inline-flex items-center rounded-l-lg  px-3 py-2 text-xs font-semibold ring-1 ring-inset ",
                    selectedViewType === TYPES_TX.HEX
                      ? "bg-black text-white"
                      : " bg-white  text-gray-900 ring-gray-300 hover:bg-gray-50 focus:z-10"
                  )}
                >
                  Hex
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedViewType(TYPES_TX.JSON)}
                  className={classNames(
                    "relative inline-flex items-center rounded-r-lg  px-3 py-2 text-xs font-semibold ring-1 ring-inset ",
                    selectedViewType === TYPES_TX.JSON
                      ? "bg-black text-white"
                      : " bg-white  text-gray-900 ring-gray-300 hover:bg-gray-50 focus:z-10"
                  )}
                >
                  JSON
                </button>
              </span>
            </div>
          </div>
          <div
            style={{
              height: "1px",
              backgroundColor: "#cccccc",
            }}
            className=" my-4 w-full"
          />
          {txInputType === TransactionInputType.transactionNotFound && (
            <div className="font-semibold text-[#E92544]">
              transaction not found - are you sure it’s in the right format?
            </div>
          )}
          {txInputType === TransactionInputType.parsingError && (
            <div className="pb-2 pl-8">
              <ErrorDisplayHex text={txInputError} />
            </div>
          )}
          <div
            id="txDetailDataTextID"
            className="px-8 !outline-none"
            suppressContentEditableWarning={true}
            contentEditable
          >
            {selectedViewType === TYPES_TX.JSON ? (
              <DynamicReactJson src={txData.jsonResponse} />
            ) : (
              handleSetDeserializedTx()
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionDetailView;
