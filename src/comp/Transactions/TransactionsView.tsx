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
import { useEffect, useState } from "react";
import {
  ModularPopUpDataProps,
  TxTextSection,
  TxTextSectionType,
} from "./Helper";
import ModularButton from "./ModularButton";
import ErrorDisplayHex from "./ErrorDisplay";

const TransactionsView = () => {
  const [txData, setTxData] = useState<TxData | null>(null);
  const [popUpData, setPopUpData] = useState<ModularPopUpDataProps | null>(
    null
  );
  useEffect(() => {
    handleTxData();
  }, []);

  const isMenuOpen = useAtomValue(menuOpen);
  const [isExamplePopUpOpen, setIsExamplePopUpOpen] = useAtom(popUpExampleOpen);
  const [isModularPopUpOpen, setIsModularPopUpOpen] = useAtom(modularPopUp);
  const [inputIsRawHex, setInputIsRawHex] = useAtom(isRawHex);
  const [inputIsTxId, setInputIsTxId] = useAtom(isTxId);
  const [inputIsRawHexAndState, setInputIsRawHexAndState] =
    useAtom(isRawHexAndState);
  const [inputIsTxIdAndState, setInputIsTxIdAndState] = useAtom(isTxIdAndState);

  const handleTxData = async () => {
    try {
      const res = await TEST_DESERIALIZE();

      if (res) {
        setTxData(res);
      }
    } catch (err) {
      console.log("handleTxData - err", err);
    }
  };

  console.log("txData", txData);
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

  const handleSetDeserializedTx = () => {
    return (
      <p>
        <TxTextSection
          text={txData?.version}
          type={TxTextSectionType.version}
          setIsModularPopUpOpen={setIsModularPopUpOpen}
          handleHover={handleHover}
        />
        <TxTextSection
          text={txData?.inputCount}
          type={TxTextSectionType.inputCount}
          setIsModularPopUpOpen={setIsModularPopUpOpen}
          handleHover={handleHover}
        />
        {txData?.inputs?.map((input, index) => {
          return (
            <>
              <TxTextSection
                text={input.txid}
                type={TxTextSectionType.inputTxId}
                setIsModularPopUpOpen={setIsModularPopUpOpen}
                handleHover={handleHover}
                inputIndex={index}
              />
              <TxTextSection
                text={input.vout}
                type={TxTextSectionType.inputVout}
                setIsModularPopUpOpen={setIsModularPopUpOpen}
                handleHover={handleHover}
                inputIndex={index}
              />
              <TxTextSection
                text={input.sigScriptSize}
                type={TxTextSectionType.inputScriptSigSize}
                setIsModularPopUpOpen={setIsModularPopUpOpen}
                handleHover={handleHover}
                inputIndex={index}
              />
              <TxTextSection
                text={input.sigScript}
                type={TxTextSectionType.inputScriptSig}
                setIsModularPopUpOpen={setIsModularPopUpOpen}
                handleHover={handleHover}
                inputIndex={index}
              />
              <TxTextSection
                text={input.sequence}
                type={TxTextSectionType.inputSequence}
                setIsModularPopUpOpen={setIsModularPopUpOpen}
                handleHover={handleHover}
                inputIndex={index}
              />
            </>
          );
        })}
        <TxTextSection
          text={txData?.outputCount}
          type={TxTextSectionType.outputCount}
          setIsModularPopUpOpen={setIsModularPopUpOpen}
          handleHover={handleHover}
        />
        <TxTextSection
          text={txData?.outputCount}
          type={TxTextSectionType.outputCount}
          setIsModularPopUpOpen={setIsModularPopUpOpen}
          handleHover={handleHover}
        />
        {txData?.outputs?.map((output, index) => {
          return (
            <>
              <TxTextSection
                text={output.amount}
                type={TxTextSectionType.outputAmount}
                setIsModularPopUpOpen={setIsModularPopUpOpen}
                handleHover={handleHover}
                inputIndex={index}
              />
              <TxTextSection
                text={output.pubKeySize}
                type={TxTextSectionType.outputPubKeySize}
                setIsModularPopUpOpen={setIsModularPopUpOpen}
                handleHover={handleHover}
                inputIndex={index}
              />
              <TxTextSection
                text={output.pubKeyScript}
                type={TxTextSectionType.outputPubKeyScript}
                setIsModularPopUpOpen={setIsModularPopUpOpen}
                handleHover={handleHover}
                inputIndex={index}
              />
            </>
          );
        })}
        {txData?.witnesses?.map((witness, index) => {
          return (
            <>
              <TxTextSection
                text={witness.witnessNumElements}
                type={TxTextSectionType.witnessSize}
                setIsModularPopUpOpen={setIsModularPopUpOpen}
                handleHover={handleHover}
                inputIndex={index}
              />
              {witness.witnessElements.map((witnessElement, index) => {
                return (
                  <>
                    <TxTextSection
                      text={witnessElement.elementSize}
                      type={TxTextSectionType.witnessElementSize}
                      setIsModularPopUpOpen={setIsModularPopUpOpen}
                      handleHover={handleHover}
                      inputIndex={index}
                    />
                    <TxTextSection
                      text={witnessElement.elementValue}
                      type={TxTextSectionType.witnessElementSize}
                      setIsModularPopUpOpen={setIsModularPopUpOpen}
                      handleHover={handleHover}
                      inputIndex={index}
                    />
                  </>
                );
              })}
            </>
          );
        })}
        <TxTextSection
          text={txData?.locktime}
          type={TxTextSectionType.lockTimeValue}
          setIsModularPopUpOpen={setIsModularPopUpOpen}
          handleHover={handleHover}
        />
      </p>
    );
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
            <ModularButton />
          </div>
          {txData ? (
            <div
              style={{
                whiteSpace: "pre-wrap",
              }}
              className="mt-5 flex min-h-[240px] w-full flex-col items-start gap-0  overflow-hidden  break-all rounded-2xl bg-[#F0F0F0] p-8 pt-2 "
            >
              {inputIsTxIdAndState === "2" && inputIsTxId && (
                <div className="font-semibold text-[#E92544]">
                  transaction not found - are you sure it’s in the right format?
                </div>
              )}
              {inputIsRawHexAndState === "2" && inputIsRawHex && (
                <ErrorDisplayHex />
              )}
              {handleSetDeserializedTx()}
            </div>
          ) : (
            <input
              placeholder="paste in a raw hex, json, transaction ID, or  load an example above"
              className="mt-5 h-[240px] w-full rounded-2xl bg-[#F0F0F0] p-10"
            ></input>
          )}

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
              Summary={"Segregates the witness from the main transaction block"}
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

          {isModularPopUpOpen && popUpData && (
            <ModularPopUp
              Title={popUpData.Title}
              Value={popUpData.Value}
              Content1={popUpData.Content}
              Content2={popUpData.Content2}
              Content3={popUpData.Content3}
              dataIndex={popUpData.dataIndex}
              linkPath={""}
              position={isSmallScreen ? "60%" : "70%"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsView;
