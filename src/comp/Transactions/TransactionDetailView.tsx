import ErrorDisplayHex from "./ErrorDisplay";
import { useAtom, useAtomValue } from "jotai";

import {
  TransactionFeResponse,
  TransactionItem,
} from "../../deserialization/model";
import React, { Fragment, useState } from "react";
import { classNames, satsToBtc, screenSizeAtom } from "@/utils";
import { ScriptTagMin } from "./PopUpSections/ScriptSig";
import dynamic from "next/dynamic";
import { Dialog, Transition } from "@headlessui/react";

import { KnownScript } from "@/deserialization/helpers";
import { TYPES_TX, TransactionInputType } from "./TransactionsView";
import { TxTextSectionType } from "./Helper";
import MobileTxDetail from "./MobileTxDetail";

import { isClickedModularPopUpOpen } from "../atom";

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
  popUpData: TransactionItem | null;
  setPopUpData: (data: TransactionItem | null) => void;
  setIsModularPopUpOpen: (status: boolean) => void;
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
  popUpData,
  setPopUpData,
  setIsModularPopUpOpen,
}: TransactionDetailViewProps) => {
  const [open, setOpen] = useState(false);

  const screenSize = useAtomValue(screenSizeAtom);

  const [isClickedModularPopUp, setIsClickedModularPopUp] = useAtom(
    isClickedModularPopUpOpen
  );

  const isMobile = screenSize.width < 640;

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

  const renderView = () => {
    if (selectedViewType === TYPES_TX.JSON) {
      return <DynamicReactJson src={txData.jsonResponse} />;
    } else if (selectedViewType === TYPES_TX.HEX) {
      return handleSetDeserializedTx();
    } else {
      return renderListView();
    }
  };

  const handleClickTableItem = (data: TransactionItem) => {
    // setIsClickedModularPopUp(false);
    setPopUpData(data);

    if (!isMobile) {
      setIsClickedModularPopUp(!isClickedModularPopUp);
    } else {
      setOpen(true);
    }
  };

  // on desktop hover should work the same as hex view
  const handleListChildHover = (data: TransactionItem) => {
    console.log("isMobile", isMobile);
    if (!isMobile) {
      setPopUpData(data);
      setIsModularPopUpOpen(true);
    }
  };

  const handleListChildMouseLeave = () => {
    if (!isMobile) {
      setIsModularPopUpOpen(false);
    }
  };
  const renderListView = () => {
    return (
      <table className="mb-4 min-w-full border-separate border-spacing-0">
        <thead></thead>
        <tbody className="">
          {txData?.hexResponse.parsedRawHex.map((hex, i) => {
            //TxTextSectionType
            const isLongValue = hex.item.value.length > 8;

            const isSelected =
              `${hex.item.title}-${hex.item.value}` ===
              `${popUpData?.item.title}-${popUpData?.item.value}`;

            return (
              <div
                className={classNames(
                  "relative  flex flex-1 cursor-pointer flex-col justify-between px-4 transition-all md:px-8",
                  isLongValue ? "min-y-[70px] py-2 " : "h-[70px]",
                  isSelected ? "bg-white" : ""
                )}
                onMouseEnter={() => handleListChildHover(hex)}
                onMouseLeave={() => handleListChildMouseLeave()}
                onClick={() => handleClickTableItem(hex)}
              >
                <div
                  className={classNames(
                    "absolute left-0 top-0 h-full w-2 rounded-l-md  transition",
                    isSelected ? "bg-dark-orange" : "bg-transparent"
                  )}
                />
                <div className="flex flex-1 flex-row items-center">
                  <div className="flex-1 py-2">
                    <p className="text-md font-bold text-black">
                      {hex.item.title}
                    </p>
                  </div>
                  {!isLongValue && (
                    <div className="flex-1">
                      <p
                        className={classNames(
                          "text-lg ",
                          isSelected ? "text-dark-orange" : "text-black"
                        )}
                      >
                        {hex.item.value}
                      </p>
                    </div>
                  )}
                </div>
                {isLongValue && (
                  <div className="py-2 pb-4">
                    <p
                      className={classNames(
                        "text-lg ",
                        isSelected ? "text-dark-orange" : "text-black"
                      )}
                    >
                      {hex.item.value}
                    </p>
                  </div>
                )}
                {!isSelected && <div className="h-[2px] w-full bg-gray-200" />}
              </div>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <Transition.Root show={popUpData !== null && open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white px-8 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <MobileTxDetail popUpData={popUpData} closePopUp={setOpen} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="ml-5 flex flex-col pr-8 md:ml-[250px] md:mr-[20px] ">
        <div className="ml-5 mt-5 flex w-full  flex-col items-start justify-between pr-5 font-extralight text-[#6C5E70] md:mt-0 md:flex-row md:items-center">
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
              >
                <g transform="rotate(180 12 12)">
                  <path
                    d="M8.99978 19.7498C8.80778 19.7498 8.61575 19.6768 8.46975 19.5298C8.17675 19.2368 8.17675 18.7618 8.46975 18.4688L14.9397 11.9988L8.46975 5.52883C8.17675 5.23583 8.17675 4.7608 8.46975 4.4678C8.76275 4.1748 9.23779 4.1748 9.53079 4.4678L16.5308 11.4678C16.8238 11.7608 16.8238 12.2358 16.5308 12.5288L9.53079 19.5288C9.38379 19.6768 9.19178 19.7498 8.99978 19.7498Z"
                    fill="#F79327"
                  />
                </g>
              </svg>
            </a>

            <p className="text-xl font-semibold text-[#0C071D] md:text-[24px]">
              {txUserInput.slice(0, 8) + "..."}
              {txUserInput.slice(-8)}
            </p>
          </div>

          <div className="flex flex-row items-center gap-x-2 py-2 pl-2 md:py-0 md:pl-0 ">
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
            {!isMobile && (
              <>
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
              </>
            )}
          </div>
        </div>
        <div className="ml-4 flex flex-row flex-wrap items-center gap-x-4 gap-y-2 py-2 ">
          {renderTransactionTags()}
        </div>
        <div className="ml-4 md:hidden">
          <p className="py-2 text-xl font-thin">tap to review</p>
        </div>
        <div
          style={{
            whiteSpace: "pre-wrap",
          }}
          className=" ml-4   flex min-h-[240px] w-full flex-col items-start gap-0 overflow-hidden break-all  rounded-2xl border bg-[#F0F0F0]  py-4 "
        >
          <div className="hidden w-full flex-row items-center justify-between px-8 md:flex">
            <p className="text-lg font-semibold text-[#0C071D] ">
              {selectedViewType === TYPES_TX.JSON ? (
                "JSON Format"
              ) : (
                <>
                  {selectedViewType === TYPES_TX.HEX
                    ? "  Hexadecimal Format"
                    : "List View"}{" "}
                  <span className="hidden font-extralight md:block">
                    (hover to review, click to freeze)
                  </span>
                </>
              )}
            </p>
            <div className="hidden flex-row md:flex">
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
                  onClick={() => setSelectedViewType(TYPES_TX.LIST)}
                  className={classNames(
                    "relative inline-flex items-center  px-3 py-2 text-xs font-semibold ring-1 ring-inset ",
                    selectedViewType === TYPES_TX.LIST
                      ? "bg-black text-white"
                      : " bg-white  text-gray-900 ring-gray-300 hover:bg-gray-50 focus:z-10"
                  )}
                >
                  List
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
            className=" my-4 hidden w-full md:block"
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
            className={classNames(
              "!outline-none",
              selectedViewType !== TYPES_TX.LIST ? "px-4  md:px-8" : ""
            )}
            suppressContentEditableWarning={true}
            contentEditable={selectedViewType !== TYPES_TX.LIST}
          >
            {renderView()}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionDetailView;
