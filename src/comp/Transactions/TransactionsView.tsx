import PopUpExampleMenu from "./PopUpExample";
import {
  TxTextSectionHoverScriptAtom,
  isClickedModularPopUpOpen,
  menuOpen,
  modularPopUp,
  queriesRemainingAtom,
  timeRemainingAtom,
  userSignedIn,
} from "../atom";
import { useAtom, useAtomValue } from "jotai";
import { atom } from "jotai";

import ModularPopUp from "./ModularPopUp";
import { useCallback, useEffect, useState } from "react";
import { TxTextSection, TxTextSectionType } from "./Helper";

import router, { useRouter } from "next/router";
import {
  InputScriptSigItem,
  TransactionFeResponse,
  TransactionItem,
} from "../../deserialization/model";
import TEST_DESERIALIZE from "../../deserialization";
import React from "react";

import dynamic from "next/dynamic";
import TransactionDetailView from "./TransactionDetailView";
import TransactionInputView from "./TransactionInputView";
import { usePlausible } from "next-plausible";
import { AnimatePresence, motion } from "framer-motion";
import { trpc } from "../../utils/trpc";
import TimerPopUp from "./TimerPopUp";

export enum TransactionInputType {
  verifyingTransaction = "verifyingTransaction",
  parsingError = "parsingError",
  verified = "verified",
  fetchingTransaction = "fetchingTransaction",
  transactionNotFound = "transactionNotFound",
  found = "found",
  loadExample = "loadExample",
}

export const txDataAtom = atom<TransactionFeResponse | null>(null);
export const knownScriptsAtom = atom<KnownScript[]>([]);

export enum TYPES_TX {
  JSON,
  HEX,
  LIST,
}

type KnownScript = {
  script: string;
  range: number[];
};

const TransactionsView = () => {
  const [userIp, setUserIp] = useState("");
  console.log("THIS IS THE USERS IP", userIp);
  const [queriesRemaining, setQueriesRemaining] = useAtom(queriesRemainingAtom);
  console.log("UPDATED QUERIES ATOM", queriesRemaining);
  const [cooldownEnd, setCooldownEnd] = useState<string | null>(null);
  console.log("COOLDOWNEND", cooldownEnd);
  const [timeRemaining, setTimeRemaining] = useAtom(timeRemainingAtom);
  console.log("timeRemaining", timeRemaining);
  const fetchOrAddIPAddress = trpc.fetchOrAddIPAddress.useMutation();
  const updateQueryCountForIPAddress =
    trpc.updateQueryCountForIPAddress.useMutation();

  const [isUserSignedIn, setIsUserSignedIn] = useAtom(userSignedIn);

  const userEvent = trpc.createHistoryEvent.useMutation();

  const { push } = useRouter();

  const plausible = usePlausible();

  // state //

  // control the view type of transaction detail
  const [selectedViewType, setSelectedViewType] = useState<TYPES_TX>(
    TYPES_TX.HEX
  );

  // keep track of y position?
  const [screenYPosition, setScreenYPosition] = useState<number | null>(null);

  //mobile helper

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // response from lib

  const [txData, setTxData] = useAtom(txDataAtom);

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

  // Atom //
  const [isClickedModularPopUp, setIsClickedModularPopUp] = useAtom(
    isClickedModularPopUpOpen
  );

  // to know the range of the known scripts
  const [knownScriptRange, setKnowScriptRange] = useAtom(knownScriptsAtom);

  // testing items

  const isMenuOpen = useAtomValue(menuOpen);
  const [isModularPopUpOpen, setIsModularPopUpOpen] = useAtom(modularPopUp);

  const [txTextSectionHoverScript, setTxTextSectionHoverScript] = useAtom(
    TxTextSectionHoverScriptAtom
  );

  if (isClickedModularPopUp) {
    console.log("popUpData", popUpData);
  }

  const handleClickOutside = useCallback(
    (event: any) => {
      console.log("does ths run", popUpData);
      // check if we have a pop up open
      if (popUpData && isClickedModularPopUp && !isModularPopUpOpen) {
        console.log("should close the pope up");
        // close the pop up
        setPopUpData(null);
        setTxTextSectionHoverScript([]);
        setIsClickedModularPopUp(false);
      }
    },
    [popUpData, isClickedModularPopUp, isModularPopUpOpen]
  );

  useEffect(() => {
    // add a event listner for mouse clicks on the document
    document.addEventListener("click", handleClickOutside);
    // Cleanup: remove the event listener when the component is unmounted or when handleClickOutside changes
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (txUserInput.length > 0) {
      plausible("Input transaction ID");
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
      if (window.innerWidth <= 768) {
        setSelectedViewType(TYPES_TX.LIST);
      }
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
    findRangeOfKnowScripts();
  }, [txData]);

  const findRangeOfKnowScripts = () => {
    /*
     we must loop through the txData and find all the known scripts
     - this could be from a sigScript
     - this could be from a pubKeyScript
      - this could be from a witness element
    */
    const knownScripts: KnownScript[] = [];

    let checkScriptLength = "";
    let totalScriptLength = "";
    let startIndex = 0;

    let knownScript = "";
    txData?.hexResponse.parsedRawHex.forEach((txItem, i) => {
      // check if the script is type that indicate script

      // if a knowscript is currently up that means we're in the middle of a script and need  to complete the search
      if (knownScript !== "") {
        checkScriptLength = checkScriptLength + txItem.rawHex;

        if (checkScriptLength.length === totalScriptLength.length) {
          // we have found the end of the script

          knownScripts.push({
            script: knownScript,
            range: [startIndex, i],
          });
          knownScript = "";
          startIndex = 0;

          totalScriptLength = "";
          checkScriptLength = "";
        } else {
          // we have not found the end of the script
        }
      } else {
        const type = txItem.item.type;
        if (
          type === TxTextSectionType.inputScriptSig ||
          type === TxTextSectionType.outputPubKeyScript ||
          type === TxTextSectionType.witnessElementSize
        ) {
          const item = txItem.item as InputScriptSigItem;

          if (item.knownScript) {
            knownScript = item.knownScript;
            startIndex = i;
            totalScriptLength = item.value;
            checkScriptLength = txItem.rawHex;
          }
        }
      }
    });

    console.log("knownScripts", knownScripts);
    setKnowScriptRange(knownScripts);
  };
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
        //handleSetDeserializedTx();

        setTxData(res);

        // wait 3 seconds before setting the txData
        setTxData(res);
        setIsClickedModularPopUp(false);
        setTxInputType(TransactionInputType.verified);
        plausible("verified tx");

        userEvent.mutate({
          action: "Reviewed Op ",
          entry: txUserInput,
          uri: router.asPath,
        });

        setTimeout(() => {
          setShowTxDetailView(true);
        }, 3000);

        console.log("updating query count");

        handleSubtractQueryCount(userIp);

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
      console.log("handleTxData - err", err);
      setTxInputType(TransactionInputType.parsingError);
      setTxInputError(err.message);
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<any>) => {
    setTxUserInput(e.target.value);
  };

  const handleHover = (type: TransactionItem, e: React.MouseEvent) => {
    if (!isClickedModularPopUp) {
      setScreenYPosition(e.screenY + 600);
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
            dataItemIndex={i}
          />
        );
      });
    }

    return [];
  };

  const handleClickBackFromTransactionDetailView = () => {
    // when a user clicks back we want to reset to our empty state
    setTxData(null);
    setTxUserInput("");
    setShowTxDetailView(false);
    setTxInputType(TransactionInputType.loadExample);
    setPopUpData(null);
  };
  /*
    need a handler return the right position of the detail element
    - is it mobile 
    - what view are we in [list or hex]
    - what data item is showing (op_code, script_sig, etc)
    
  */
  const handleModularPopUpPosition = () => {
    // if the view is in hex we want to show the pop up 200 pixels below the user mouse position
    if (selectedViewType === TYPES_TX.HEX) {
      // get the current mouse position
      const mousePosition = screenYPosition;

      return 10 + "px";
    }

    const val =
      isClickedModularPopUp || isModularPopUpOpen
        ? `${screenYPosition}px`
        : `${screenYPosition}px`;

    return val;
    /*
    
    console.log("val", val);

    return val;
    */
  };

  const handleIPAddress = (ipAddress: string) => {
    fetchOrAddIPAddress.mutate(
      { ipAddress },
      {
        onSuccess: (data) => {
          // Handle successful response
          console.log("IP Address data:", data);
          // Set the Queries Remaining value to the queryCount field
          setQueriesRemaining(data.queryCount);
          setCooldownEnd(data.cooldownEnd ?? null);
        },
        onError: (error) => {
          // Handle error case
          console.error("Error handling IP Address:", error);
        },
      }
    );
  };

  useEffect(() => {
    if (!isUserSignedIn) {
      fetch("/api/get-ip")
        .then((res) => res.json())
        .then((data) => {
          setUserIp(data.ip);
          handleIPAddress(data.ip);
        })
        .catch((error) => console.error("Error fetching IP:", error));
    }
  }, []);

  const handleSubtractQueryCount = (ipAddress: string) => {
    updateQueryCountForIPAddress.mutate(
      { ipAddress },
      {
        onSuccess: (data) => {
          // Handle successful response
          console.log("Updated IP Address data:", data);
          setQueriesRemaining(data.queryCount);
        },
        onError: (error) => {
          // Handle error case
          console.error("Error updating query count:", error);
        },
      }
    );
  };

  useEffect(() => {
    let intervalId: any;

    if (cooldownEnd) {
      const updateRemainingTime = () => {
        const endTime = new Date(cooldownEnd).getTime();
        const currentTime = new Date().getTime();
        const remaining = endTime - currentTime;

        if (remaining <= 0) {
          clearInterval(intervalId);
          setTimeRemaining(null);
        } else {
          setTimeRemaining(remaining);
        }
      };

      updateRemainingTime(); // Update immediately
      intervalId = setInterval(updateRemainingTime, 1000); // Update every second
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [cooldownEnd]);

  return (
    <div
      className={` min-h-[85vh] overflow-hidden bg-primary-gray ${
        isMenuOpen ? "hidden" : "block"
      }`}
    >
      {queriesRemaining === 0 && <TimerPopUp />}
      <div className="md:ml-[200px]">
        <PopUpExampleMenu setTxUserInput={setTxUserInput} />
      </div>
      {!showTxDetailView && (
        <TransactionInputView
          showTxDetailView={showTxDetailView}
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
          setIsModularPopUpOpen={setIsModularPopUpOpen}
          txUserInput={txUserInput}
          txData={txData}
          selectedViewType={selectedViewType}
          setSelectedViewType={setSelectedViewType}
          txInputType={txInputType}
          txInputError={txInputError}
          setTxInputError={setTxInputError}
          handleSetDeserializedTx={handleSetDeserializedTx}
          popUpData={popUpData}
          setPopUpData={setPopUpData}
          handleClickBackFromTransactionDetailView={
            handleClickBackFromTransactionDetailView
          }
        />
      )}
      <AnimatePresence key="modularPopUp">
        {(isModularPopUpOpen || isClickedModularPopUp) && popUpData ? (
          <motion.div
            key={"inital"}
            initial={{ scale: 1, y: 300 }}
            animate={{ scale: 1, y: "10px" }}
            exit={{ scale: 0, y: 300 }}
            onClick={() => setIsClickedModularPopUp(false)}
            className=" inset-0 z-40 grid cursor-pointer place-items-center overflow-y-scroll  md:mb-10 md:ml-[270px] md:mr-[24px]"
            style={{
              display:
                (isModularPopUpOpen || isClickedModularPopUp) && popUpData
                  ? "grid"
                  : "none",
            }}
          >
            <ModularPopUp key={popUpData.rawHex} popUpData={popUpData} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default TransactionsView;
