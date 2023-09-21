import Link from "next/link";
import TransactionContainer from "./TransactionContainer";
import PopUpExampleMenu from "./PopUpExample";
import {
  isClickedModularPopUpOpen,
  isRawHex,
  isRawHexAndState,
  isTxId,
  isTxIdAndState,
  isVersion,
  menuOpen,
  modularPopUp,
  popUpExampleOpen,
} from "../atom";
import { useAtom, useAtomValue } from "jotai";

import ModularPopUp from "./ModularPopUp";
import { use, useCallback, useEffect, useState } from "react";
import {
  ModularPopUpDataProps,
  TxTextSection,
  TxTextSectionType,
  UnserializedText,
} from "./Helper";
import ModularButton from "./ModularButton";
import ErrorDisplayHex from "./ErrorDisplay";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import {
  TransactionFeResponse,
  TransactionItem,
} from "../../deserialization/model";
import TEST_DESERIALIZE from "../../deserialization";
import React from "react";
import { classNames, satsToBtc } from "@/utils";
import { ScriptTagMin } from "./PopUpSections/ScriptSig";
import dynamic from "next/dynamic";

export enum TransactionInputType {
  verifyingTransaction = "verifyingTransaction",
  parsingError = "parsingError",
  verified = "verified",
  fetchingTransaction = "fetchingTransaction",
  transactionNotFound = "transactionNotFound",
  found = "found",
  loadExample = "loadExample",
}

const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

enum TYPES_TX {
  JSON,
  HEX,
}
const TransactionsView = () => {
  const [whichVersion, setWhichVersion] = useAtom(isVersion);
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const [selectedViewType, setSelectedViewType] = useState<TYPES_TX>(
    TYPES_TX.HEX
  );

  const [txData, setTxData] = useState<TransactionFeResponse | null>(null);
  const [txUserInput, setTxUserInput] = useState<string>("");
  const [txInputError, setTxInputError] = useState<string>("");

  const [showTxDetailView, setShowTxDetailView] = useState<boolean>(false);

  const [txInputType, setTxInputType] = useState<TransactionInputType>(
    TransactionInputType.loadExample
  );

  const [createdEventListener, setCreatedEventListener] =
    useState<boolean>(false);

  // data to show when hover/clicked
  const [popUpData, setPopUpData] = useState<TransactionItem | null>(null);
  console.log("data", popUpData);

  useEffect(() => {
    // on initial load we want to check if there is a transaction in the url search params

    const urlParams = new URLSearchParams(window.location.search);
    console.log("urlParams", urlParams);
    const myParam = urlParams.get("transaction");
    console.log("myParam", myParam);

    // if the transaction is not empty and txUserInput is empty we can assume the had search before
    if (myParam) {
      setTxUserInput(myParam as string);
    }
  }, []);
  // const [selectedPopUpData, setSelectedPopUpData] =  useState<ModularPopUpDataProps | null>(
  //   null
  // );
  // this determine if we keep the pop up open after leaving hover
  // since you can't click this without hovering over first we can use this to determine if we should keep the pop up open
  const [isClickedModularPopUp, setIsClickedModularPopUp] = useAtom(
    isClickedModularPopUpOpen
  );

  const isMenuOpen = useAtomValue(menuOpen);

  const [isModularPopUpOpen, setIsModularPopUpOpen] = useAtom(modularPopUp);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    if (typeof window !== "undefined") {
      setIsSmallScreen(window.innerWidth <= 768);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);
  useEffect(() => {
    if (txUserInput.length > 0) {
      handleTxData();
    }
  }, [txUserInput]);

  useEffect(() => {
    if (txData && txInputType !== TransactionInputType.fetchingTransaction) {
      if (!createdEventListener) {
        const element = document.getElementById("txDataTextID") as any;
        if (element) {
          console.log("element", element);
          element.addEventListener("input", handleUserTextChange);
          setCreatedEventListener(true);
        }
      }
    }
    // if (txData === null && createdEventListener) {
    //   const element = document.getElementById("txDataTextID") as any;
    //   element.removeEventListener("input", handleUserTextChange);
    // }
  }, [txData]);

  const handleUserTextChange = useCallback((event: any) => {
    // select all the elements with class name deserializeText
    const elements = document.getElementsByClassName("deserializeText");

    // get all the text in the order that they appear
    const text = Array.from(elements).map((element) => {
      return element.innerHTML;
    });

    // append all the text together
    const textString = text.join("");

    if (text.length === 0) {
      setTxInputType(TransactionInputType.loadExample);
      setTxData(null);
    } else {
      setTxUserInput(textString);
    }
  }, []);

  const handleTxData = async () => {
    try {
      // set the input type to fetching
      setTxInputType(TransactionInputType.fetchingTransaction);

      push({
        pathname: "/transactions",
        query: { transaction: txUserInput },
      });
      const res = await TEST_DESERIALIZE(txUserInput);

      if (res) {
        if (selectedViewType === TYPES_TX.HEX) {
          //handleSetDeserializedTx();
          console.log("txData", res);
          setTxData(res);

          console.log("txData", res);
          // wait 3 seconds before setting the txData
          setTxData(res);
          setTxInputType(TransactionInputType.verified);
          setTimeout(() => {
            setShowTxDetailView(true);
          }, 3000);
        }
        /*
        if (res.error) {
          setTxInputType(TransactionInputType.parsingError);
          console.log("res.error", res.error);
          setTxInputError(res.error.message);
        } else {
          setTxInputType(TransactionInputType.verified);
        }
      }
      if (res && res.error === undefined) {
        console.log("txData", res);
        // wait 3 seconds before setting the txData
        setTxData(res);
        setTimeout(() => {
          setShowTxDetailView(true);
        }, 3000);
    
      */
      }
    } catch (err) {
      setTxInputType(TransactionInputType.parsingError);
      console.log("handleTxData - err", err);
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<any>) => {
    setTxUserInput(e.target.value);
  };

  const handleSetDeserializedTx = () => {
    const reactElement = [];

    if (selectedViewType === TYPES_TX.HEX) {
      return txData?.hexResponse.parsedRawHex.map((hex) => {
        if (hex.error) {
          setTxInputError(hex.error.message);
        }

        return (
          <TxTextSection
            transactionItem={hex}
            handleHover={handleHover}
            setIsClickedModularPopUp={setIsClickedModularPopUp}
            isClickedModularPopUp={isClickedModularPopUp}
          />
        );
      });
    }

    return [];

    // based on the length of total text we can determine what part of the tx was not able to be parsed
    // const totalTextLength = totalText.length;
    // console.log("totalTextLength", totalTextLength);
    // console.log("txData?.hash", txData?.hash.length);

    // const unCheckedTxText = txData?.hash.slice(totalTextLength);
    // console.log("unCheckedTxText", unCheckedTxText);

    // if (unCheckedTxText) {
    //   //reactElement.push(<UnserializedText text={unCheckedTxText} />);
    // }
    // console.log("totalText", totalText);

    // if (txData?.hash === "" && txData.txId) {
    //   reactElement.push(<UnserializedText text={txData.txId} />);
    // }
    // return reactElement;
  };

  const handleHover = (type: TransactionItem) => {
    if (!isClickedModularPopUp) {
      setPopUpData(type);
      setIsModularPopUpOpen(true);
    }
  };

  const renderTransactionTags = () => {
    let tags: any = [];

    txData?.hexResponse.knownScripts.forEach((script) => {
      tags.push(<ScriptTagMin link={`/scripts/${script}`} text={script} />);
    });

    if (txData?.hexResponse.txType) {
      console.log("txData?.hexResponse.txType", txData?.hexResponse.txType);
      tags.push(<ScriptTagMin text={txData?.hexResponse.txType} />);
    }
    console.log("tags", tags);
    return tags;
  };
  return (
    <div
      className={`min-h-[85vh] overflow-hidden bg-primary-gray ${
        isMenuOpen ? "hidden" : "block"
      }`}
    >
      <div className="ml-[200px]">
        <PopUpExampleMenu />
      </div>
      {!showTxDetailView && (
        <>
          <div className="flex flex-col md:ml-[250px] md:mr-[20px]">
            <div className="ml-5 mt-5 font-extralight text-[#6C5E70] md:mt-0">
              <p>Transactions</p>
            </div>
            <div className="mx-5 mt-2 font-light text-[#6C5E70]">
              <p>
                A Bitcoin transaction describes the flow of Bitcoin. Ultimately,
                a Bitcoin block is just many verified transactions & the
                blockchain itself is just a linked list of these blocks -{" "}
                <span className="font-bold">
                  {" "}
                  which makes transactions the crux of Bitcoin.
                </span>{" "}
              </p>
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

              <div className="mt-5 flex flex-col justify-between md:flex-row">
                <p className="text-[30px] font-semibold text-[#0C071D] md:text-[38px]">
                  Deserialize A Transaction
                </p>
                <ModularButton txInputType={txInputType} />
              </div>
              {txData ? (
                <div
                  style={{
                    whiteSpace: "pre-wrap",
                  }}
                  className="mt-5 flex min-h-[240px] w-full min-w-[1403px] flex-col items-start gap-0 overflow-hidden  break-all rounded-2xl bg-[#F0F0F0] p-8 pt-2 "
                >
                  {txInputType === TransactionInputType.transactionNotFound && (
                    <div className="font-semibold text-[#E92544]">
                      transaction not found - are you sure it’s in the right
                      format?
                    </div>
                  )}
                  {txInputType === TransactionInputType.parsingError && (
                    <ErrorDisplayHex text={txInputError} />
                  )}
                  <div id="txDataTextID" contentEditable>
                    {handleSetDeserializedTx()}
                  </div>
                </div>
              ) : (
                <textarea
                  onChange={handleTextAreaChange}
                  placeholder="paste in a raw hex, json, transaction ID, or  load an example above"
                  className="mt-5 h-[240px] w-full rounded-2xl bg-[#F0F0F0] p-10"
                ></textarea>
              )}
              {txData === null && (
                <>
                  <div className="mt-5 flex flex-row items-center">
                    <hr className=" h-0.5 flex-1 bg-[#6C5E70]" />
                    <span className="mx-10 text-[#6C5E70]">or</span>
                    <hr className=" h-0.5 flex-1 bg-[#6C5E70]" />
                  </div>
                  <p className="mt-5 text-[30px] font-semibold text-[#0C071D] md:text-[38px]">
                    Serialize A Transaction
                  </p>
                  <div className="mb-5 mt-5 flex flex-col justify-between md:flex-row md:flex-wrap">
                    <TransactionContainer
                      Title={"TapRoot"}
                      linkPath={""}
                      Summary={
                        "Enhanced script privacy & flexibility using Schnorr & MAST"
                      }
                      Bips={"BIP340, BIP341, BIP342"}
                      ComingSoon={"TapRoot coming soon..."}
                    />
                    <TransactionContainer
                      Title={"SegWit"}
                      linkPath={""}
                      Summary={
                        "Segregates the witness from the main transaction block"
                      }
                      Bips={"BIP340, BIP341, BIP342"}
                      ComingSoon={"SegWit coming soon..."}
                    />
                    <TransactionContainer
                      Title={"Legacy"}
                      linkPath={""}
                      Summary={"The original way to create a transaction"}
                      Bips={"BIP13, BIP16, BIP30, BIP34"}
                      ComingSoon={"Legacy coming soon..."}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {showTxDetailView && txData && (
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
                  <span className="font-bold">
                    {txData.hexResponse.numInputs}
                  </span>
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
                  <span className="font-bold">
                    {txData.hexResponse.numInputs}
                  </span>
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
              className=" ml-4   flex min-h-[240px] w-full min-w-[1393px] flex-col items-start gap-0 overflow-hidden  break-all rounded-2xl bg-[#F0F0F0]  py-4 "
            >
              <div className="flex w-full flex-row items-center justify-between px-8">
                <p className="text-lg font-semibold text-[#0C071D] ">
                  {selectedViewType === TYPES_TX.JSON ? (
                    "JSON Format"
                  ) : (
                    <>
                      Hexadecimal Format <span>(hover to review)</span>
                    </>
                  )}
                  Hexadecimal Format
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
                <ErrorDisplayHex text={txInputError} />
              )}
              <div id="txDataTextID" className="px-8 " contentEditable>
                {selectedViewType === TYPES_TX.JSON ? (
                  <DynamicReactJson src={txData.jsonResponse} />
                ) : (
                  handleSetDeserializedTx()
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {(isModularPopUpOpen || isClickedModularPopUp) && popUpData && (
        <ModularPopUp
          popUpData={popUpData}
          position={
            isClickedModularPopUp ? "2" : isModularPopUpOpen ? "4" : "9"
          }
        />
      )}
    </div>
  );
};

export default TransactionsView;
