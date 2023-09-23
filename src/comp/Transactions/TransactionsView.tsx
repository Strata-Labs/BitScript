import PopUpExampleMenu from "./PopUpExample";
import { isClickedModularPopUpOpen, menuOpen, modularPopUp } from "../atom";
import { useAtom, useAtomValue } from "jotai";

import ModularPopUp from "./ModularPopUp";
import { use, useCallback, useEffect, useState } from "react";
import { TxTextSection } from "./Helper";
import ModularButton from "./ModularButton";
import ErrorDisplayHex from "./ErrorDisplay";
import { useRouter } from "next/router";
import {
  TransactionFeResponse,
  TransactionItem,
} from "../../deserialization/model";
import TEST_DESERIALIZE from "../../deserialization";
import React from "react";

import dynamic from "next/dynamic";
import TransactionDetailView from "./TransactionDetailView";
import TransactionInputView from "./TransactionInputView";

export enum TransactionInputType {
  verifyingTransaction = "verifyingTransaction",
  parsingError = "parsingError",
  verified = "verified",
  fetchingTransaction = "fetchingTransaction",
  transactionNotFound = "transactionNotFound",
  found = "found",
  loadExample = "loadExample",
}

export enum TYPES_TX {
  JSON,
  HEX,
}
const TransactionsView = () => {
  const { push } = useRouter();

  const [selectedViewType, setSelectedViewType] = useState<TYPES_TX>(
    TYPES_TX.HEX
  );
  // response from lib
  const [txData, setTxData] = useState<TransactionFeResponse | null>(null);
  // user input
  const [txUserInput, setTxUserInput] = useState<string>("");
  // error from lib
  const [txInputError, setTxInputError] = useState<string>("");
  // state to determine if we should show the tx detail view
  const [showTxDetailView, setShowTxDetailView] = useState<boolean>(false);
  // state to determine the status of current tx being viewed `TransactionInputType`
  const [txInputType, setTxInputType] = useState<TransactionInputType>(
    TransactionInputType.loadExample
  );
  // this is used to determine if we should create an event listener for the text area
  const [createdEventListener, setCreatedEventListener] =
    useState<boolean>(false);
  // state to determine if we should create a event listener for tx detail view
  const [
    createdEventListenerTxDetailView,
    setCreatedEventListenerTxDetailView,
  ] = useState<boolean>(false);
  // data to show when hover/clicked
  const [popUpData, setPopUpData] = useState<TransactionItem | null>(null);
  const [isClickedModularPopUp, setIsClickedModularPopUp] = useAtom(
    isClickedModularPopUpOpen
  );

  // testing items
  if (isClickedModularPopUp) {
    console.log("popUpData", popUpData);
  }

  const isMenuOpen = useAtomValue(menuOpen);
  const [isModularPopUpOpen, setIsModularPopUpOpen] = useAtom(modularPopUp);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (txUserInput.length > 0) {
      handleTxData();
    }
  }, [txUserInput]);

  useEffect(() => {
    // on initial load we want to check if there is a transaction in the url search params

    const urlParams = new URLSearchParams(window.location.search);

    const myParam = urlParams.get("transaction");

    // if the transaction is not empty and txUserInput is empty we can assume the had search before
    if (myParam) {
      setTxUserInput(myParam as string);
    }
  }, []);

  // this determine if we keep the pop up open after leaving hover
  // since you can't click this without hovering over first we can use this to determine if we should keep the pop up open

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
    if (txData && showTxDetailView) {
      if (!createdEventListenerTxDetailView) {
        const element2 = document.getElementById("txDetailDataTextID");
        if (element2) {
          element2.addEventListener("input", handleUserTextChange);
          setCreatedEventListener(true);
          setCreatedEventListenerTxDetailView(true);
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
      console.log("running TEST_DESERIALIZE");
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
    } catch (err: any) {
      setTxInputType(TransactionInputType.parsingError);
      setTxInputError(err.message);
      console.log("handleTxData - err", err);
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<any>) => {
    setTxUserInput(e.target.value);
  };

  const handleHover = (type: TransactionItem) => {
    if (!isClickedModularPopUp) {
      setPopUpData(type);
      setIsModularPopUpOpen(true);
    }
  };

  const handleSetDeserializedTx = () => {
    const reactElement = [];

    if (selectedViewType === TYPES_TX.HEX) {
      return txData?.hexResponse.parsedRawHex.map((hex, i) => {
        if (hex.error) {
          setTxInputError(hex.error.message);
        }

        return (
          <TxTextSection
            key={hex.rawHex + "" + i}
            transactionItem={hex}
            handleHover={handleHover}
            setIsClickedModularPopUp={setIsClickedModularPopUp}
            isClickedModularPopUp={isClickedModularPopUp}
          />
        );
      });
    }

    return [];
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
        <TransactionInputView
          txInputType={txInputType}
          txData={txData}
          handleSetDeserializedTx={handleSetDeserializedTx}
          txInputError={txInputError}
          handleTextAreaChange={handleTextAreaChange}
          txUserInput={txUserInput}
        />
      )}

      {showTxDetailView && txData && (
        <TransactionDetailView
          setShowTxDetailView={setShowTxDetailView}
          txUserInput={txUserInput}
          txData={txData}
          selectedViewType={selectedViewType}
          setSelectedViewType={setSelectedViewType}
          txInputType={txInputType}
          txInputError={txInputError}
          setTxInputError={setTxInputError}
          handleSetDeserializedTx={handleSetDeserializedTx}
        />
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
