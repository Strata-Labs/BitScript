import Link from "next/link";
import TransactionContainer from "./TransactionContainer";
import PopUpExampleMenu from "./PopUpExample";
import {
  isRawHex,
  isRawHexAndState,
  isTxId,
  isTxIdAndState,
  menuOpen,
  modularPopUp,
  popUpExampleOpen,
} from "../atom";
import { useAtom, useAtomValue } from "jotai";

import TEST_DESERIALIZE, { TxData } from "@/deserialization";

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

export enum TransactionInputType {
  verifyingTransaction = "verifyingTransaction",
  parsingError = "parsingError",
  verified = "verified",
  fetchingTransaction = "fetchingTransaction",
  transactionNotFound = "transactionNotFound",
  found = "found",
  loadExample = "loadExample",
}
const TransactionsView = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const [txData, setTxData] = useState<TxData | null>(null);
  const [txUserInput, setTxUserInput] = useState<string>("");
  const [txInputError, setTxInputError] = useState<string>("");

  const [txInputType, setTxInputType] = useState<TransactionInputType>(
    TransactionInputType.loadExample
  );

  const [createdEventListener, setCreatedEventListener] =
    useState<boolean>(false);

  // data to show when hover/clicked
  const [popUpData, setPopUpData] = useState<ModularPopUpDataProps | null>(
    null
  );

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
  const [isClickedModularPopUp, setIsClickedModularPopUp] =
    useState<boolean>(false);

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
    console.log("elements", elements);

    // get all the text in the order that they appear
    const text = Array.from(elements).map((element) => {
      console.log("element", element);
      return element.innerHTML;
    });

    // append all the text together
    const textString = text.join("");

    console.log("text", text);

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
        if (res.error) {
          setTxInputType(TransactionInputType.parsingError);
          console.log("res.error", res.error);
          setTxInputError(res.error.message);
        } else {
          setTxInputType(TransactionInputType.verified);
        }
      }
      if (res) {
        console.log("txData", res);

        setTxData(res);
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

    let totalText = "";
    if (txData?.version) {
      totalText += txData?.version;
      console.log("totalText sdf", totalText);
      reactElement.push(
        <TxTextSection
          text={txData?.version}
          type={TxTextSectionType.version}
          handleHover={handleHover}
          setIsClickedModularPopUp={setIsClickedModularPopUp}
          isClickedModularPopUp={isClickedModularPopUp}
        />
      );
    }

    if (txData?.marker) {
      totalText += txData?.marker;

      reactElement.push(
        <TxTextSection
          text={txData?.marker}
          type={TxTextSectionType.marker}
          handleHover={handleHover}
          setIsClickedModularPopUp={setIsClickedModularPopUp}
          isClickedModularPopUp={isClickedModularPopUp}
        />
      );
    }
    if (txData?.flag) {
      totalText += txData?.flag;

      reactElement.push(
        <TxTextSection
          text={txData?.flag}
          type={TxTextSectionType.flag}
          handleHover={handleHover}
          setIsClickedModularPopUp={setIsClickedModularPopUp}
          isClickedModularPopUp={isClickedModularPopUp}
        />
      );
    }

    if (txData?.inputCount) {
      totalText += txData?.inputCount;
      reactElement.push(
        <TxTextSection
          text={txData?.inputCount}
          type={TxTextSectionType.inputCount}
          handleHover={handleHover}
          setIsClickedModularPopUp={setIsClickedModularPopUp}
          isClickedModularPopUp={isClickedModularPopUp}
        />
      );
    }

    if (txData?.inputs) {
      txData.inputs.forEach((input, index) => {
        totalText += input.txid;
        totalText += input.vout;
        totalText += input.sigScriptSize;
        totalText += input.sigScript;
        totalText += input.sequence;
        reactElement.push(
          <>
            <TxTextSection
              text={input.txid}
              type={TxTextSectionType.inputTxId}
              handleHover={handleHover}
              inputIndex={index}
              setIsClickedModularPopUp={setIsClickedModularPopUp}
              isClickedModularPopUp={isClickedModularPopUp}
            />
            <TxTextSection
              text={input.vout}
              type={TxTextSectionType.inputVout}
              handleHover={handleHover}
              inputIndex={index}
              setIsClickedModularPopUp={setIsClickedModularPopUp}
              isClickedModularPopUp={isClickedModularPopUp}
            />
            <TxTextSection
              text={input.sigScriptSize}
              type={TxTextSectionType.inputScriptSigSize}
              handleHover={handleHover}
              inputIndex={index}
              setIsClickedModularPopUp={setIsClickedModularPopUp}
              isClickedModularPopUp={isClickedModularPopUp}
            />
            <TxTextSection
              text={input.sigScript}
              type={TxTextSectionType.inputScriptSig}
              handleHover={handleHover}
              inputIndex={index}
              setIsClickedModularPopUp={setIsClickedModularPopUp}
              isClickedModularPopUp={isClickedModularPopUp}
            />
            <TxTextSection
              text={input.sequence}
              type={TxTextSectionType.inputSequence}
              handleHover={handleHover}
              inputIndex={index}
              setIsClickedModularPopUp={setIsClickedModularPopUp}
              isClickedModularPopUp={isClickedModularPopUp}
            />
          </>
        );
      });
    }

    if (txData?.outputCount) {
      totalText += txData.outputCount;
      reactElement.push(
        <TxTextSection
          text={txData?.outputCount}
          type={TxTextSectionType.outputCount}
          handleHover={handleHover}
          setIsClickedModularPopUp={setIsClickedModularPopUp}
          isClickedModularPopUp={isClickedModularPopUp}
        />
      );
    }

    if (txData?.outputs) {
      txData.outputs.forEach((output, index) => {
        totalText += output.amount + "";
        totalText += output.pubKeySize;
        totalText += output.pubKeyScript;
        reactElement.push(
          <>
            <TxTextSection
              text={output.amount}
              type={TxTextSectionType.outputAmount}
              handleHover={handleHover}
              inputIndex={index}
              setIsClickedModularPopUp={setIsClickedModularPopUp}
              isClickedModularPopUp={isClickedModularPopUp}
            />
            <TxTextSection
              text={output.pubKeySize}
              type={TxTextSectionType.outputPubKeySize}
              handleHover={handleHover}
              inputIndex={index}
              setIsClickedModularPopUp={setIsClickedModularPopUp}
              isClickedModularPopUp={isClickedModularPopUp}
            />
            <TxTextSection
              text={output.pubKeyScript}
              type={TxTextSectionType.outputPubKeyScript}
              handleHover={handleHover}
              inputIndex={index}
              setIsClickedModularPopUp={setIsClickedModularPopUp}
              isClickedModularPopUp={isClickedModularPopUp}
            />
          </>
        );
      });
    }

    if (txData?.witnesses) {
      txData.witnesses.forEach((witness, index) => {
        totalText += witness.witnessNumElements + "";
        reactElement.push(
          <>
            <TxTextSection
              text={witness.witnessNumElements}
              type={TxTextSectionType.witnessSize}
              handleHover={handleHover}
              inputIndex={index}
              setIsClickedModularPopUp={setIsClickedModularPopUp}
              isClickedModularPopUp={isClickedModularPopUp}
            />
            {witness.witnessElements.map((witnessElement, index) => {
              totalText += witnessElement.elementSize;
              totalText += witnessElement.elementValue;
              return (
                <>
                  <TxTextSection
                    text={witnessElement.elementSize}
                    type={TxTextSectionType.witnessElementSize}
                    handleHover={handleHover}
                    inputIndex={index}
                    setIsClickedModularPopUp={setIsClickedModularPopUp}
                    isClickedModularPopUp={isClickedModularPopUp}
                  />
                  <TxTextSection
                    text={witnessElement.elementValue}
                    type={TxTextSectionType.witnessElementSize}
                    handleHover={handleHover}
                    inputIndex={index}
                    setIsClickedModularPopUp={setIsClickedModularPopUp}
                    isClickedModularPopUp={isClickedModularPopUp}
                  />
                </>
              );
            })}
          </>
        );
      });
    }

    if (txData?.locktime) {
      totalText += txData.locktime;
      reactElement.push(
        <TxTextSection
          text={txData?.locktime}
          type={TxTextSectionType.lockTimeValue}
          handleHover={handleHover}
          setIsClickedModularPopUp={setIsClickedModularPopUp}
          isClickedModularPopUp={isClickedModularPopUp}
        />
      );
    }

    // based on the length of total text we can determine what part of the tx was not able to be parsed
    const totalTextLength = totalText.length;
    console.log("totalTextLength", totalTextLength);
    console.log("txData?.hash", txData?.hash.length);

    const unCheckedTxText = txData?.hash.slice(totalTextLength);
    console.log("unCheckedTxText", unCheckedTxText);

    if (unCheckedTxText) {
      //reactElement.push(<UnserializedText text={unCheckedTxText} />);
    }
    console.log("totalText", totalText);

    if (txData?.hash === "" && txData.txId) {
      reactElement.push(<UnserializedText text={txData.txId} />);
    }
    return reactElement;
  };

  const handleHover = (type: ModularPopUpDataProps) => {
    setPopUpData(type);
    setIsModularPopUpOpen(true);
  };

  return (
    <div
      className={`min-h-screen bg-primary-gray ${
        isMenuOpen ? "hidden" : "block"
      }`}
    >
      <div className="ml-[200px]">
        <PopUpExampleMenu />
      </div>
      <div className="flex flex-col md:ml-[250px] md:mr-[20px]">
        <div className="ml-5 mt-5 font-extralight text-[#6C5E70] md:mt-0">
          <p>Transactions</p>
        </div>
        <div className="mx-5 mt-2 font-light text-[#6C5E70]">
          <p>
            A Bitcoin transaction describes the flow of Bitcoin. Ultimately, a
            Bitcoin block is just many verified transactions & the blockchain
            itself is just a linked list of these blocks -{" "}
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
              className="mt-5 flex min-h-[240px] w-full flex-col items-start gap-0  overflow-hidden  break-all rounded-2xl bg-[#F0F0F0] p-8 pt-2 "
            >
              {txInputType === TransactionInputType.transactionNotFound && (
                <div className="font-semibold text-[#E92544]">
                  transaction not found - are you sure it’s in the right format?
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

          {(isModularPopUpOpen || isClickedModularPopUp) && popUpData && (
            <ModularPopUp
              Title={popUpData.Title}
              Value={popUpData.Value + ""}
              txTextSectionType={popUpData.txTextSectionType}
              position={isClickedModularPopUp ? "40%" : "90%"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsView;
