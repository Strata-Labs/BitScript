import PopUpExampleMenu from "./PopUpExample";
import {
  TxTextSectionHoverScriptAtom,
  isClickedModularPopUpOpen,
  menuOpen,
  modularPopUp,
  queriesRemainingAtom,
  showTimerPopUpAtom,
  timeRemainingAtom,
  userAtom,
  userSignedIn,
} from "../atom";
import { useAtom, useAtomValue } from "jotai";
import { atom } from "jotai";
import Image from "next/image";

import ModularPopUp from "./ModularPopUp";
import { useCallback, useEffect, useState } from "react";
import { TxTextSection, TxTextSectionType, hexToBytes } from "./Helper";

import router, { useRouter } from "next/router";
import {
  InputScriptSigItem,
  TransactionFeResponse,
  TransactionItem,
} from "../../deserialization/model";
import TEST_DESERIALIZE, { BTC_ENV } from "../../deserialization";
import React from "react";

import dynamic from "next/dynamic";
import TransactionDetailView from "./TransactionDetailView";
import TransactionInputView from "./TransactionInputView";
import { usePlausible } from "next-plausible";
import { AnimatePresence, motion } from "framer-motion";
import { trpc } from "../../utils/trpc";
import TimerPopUp from "./TimerPopUp";
import { ScriptData } from "@/corelibrary/scriptdata";
import { ArrowsPointingInIcon } from "@heroicons/react/20/solid";

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

export const inscriptionModalAtom = atom<boolean>(false);

const TransactionsView = () => {
  const [showTimerPopUp, setShowTimerPopUp] = useAtom(showTimerPopUpAtom);
  const [userIp, setUserIp] = useState("");
  const [queriesRemaining, setQueriesRemaining] = useAtom(queriesRemainingAtom);
  const [cooldownEnd, setCooldownEnd] = useState<string | null>(null);
  const [env, _setEnv] = useState(BTC_ENV.MAINNET);

  const [showInscriptionModal, setShowInscriptionModal] =
    useAtom(inscriptionModalAtom);

  const [timeRemaining, setTimeRemaining] = useAtom(timeRemainingAtom);
  const fetchOrAddIPAddress = trpc.fetchOrAddIPAddress.useMutation();
  const fetchOrAddUserQuery = trpc.fetchOrAddUserQuery.useMutation();
  const updateQueryCountForIPAddress =
    trpc.updateQueryCountForIPAddress.useMutation();
  const updateUserQueryCount = trpc.updateUserQueryCount.useMutation();

  const [isUserSignedIn, setIsUserSignedIn] = useAtom(userSignedIn);
  const [user, setUser] = useAtom(userAtom);

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

  const setEnv = (env: BTC_ENV) => {
    console.log("setEnv ran", env);
    if (txUserInput.length > 0) {
      push({
        //pathname: "/transactions",
        query: { transaction: txUserInput, env },
      });
    } else {
      push({
        //pathname: "/transactions",
        query: { env },
      });
    }
    localStorage.setItem("env", env);
    _setEnv(env);
  };

  if (isClickedModularPopUp) {
    console.log("popUpData", popUpData);
  }

  const handleClickOutside = useCallback(
    (event: any) => {
      // check if we have a pop up open
      if (popUpData && isClickedModularPopUp && !isModularPopUpOpen) {
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
      console.log("useEffect for txUserInput ran");
      plausible("Input transaction ID");

      handleTxData();
    } else {
      setTxInputType(TransactionInputType.loadExample);
    }
  }, [txUserInput]);

  useEffect(() => {
    // on initial load we want to check if there is a transaction in the url search params

    const urlParams = new URLSearchParams(window.location.search);

    const myParam = urlParams.get("transaction");
    const envParam = urlParams.get("env");

    if (envParam) {
      console.log("envParam", envParam);
      if (envParam === "MAINNET") {
        setEnv(BTC_ENV.MAINNET);
      } else {
        setEnv(BTC_ENV.TESTNET);
      }
    }
    // if the transaction is not empty and txUserInput is empty we can assume the had search before
    if (myParam) {
      console.log("myParam", myParam);
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
        query: { transaction: txUserInput, env },

        //query: { transaction: txUserInput, env },
      });

      console.log("txUserInput - env", env);
      const res = await TEST_DESERIALIZE(txUserInput, env);
      if (res) {
        //handleSetDeserializedTx();

        // wait 3 seconds before setting the txData
        setTxData(res);
        setIsClickedModularPopUp(false);
        setTxInputType(TransactionInputType.verified);
        plausible("verified tx");

        userEvent.mutate({
          action: "Transaction Detail ",
          entry: txUserInput,
          uri: router.asPath,
        });

        setTimeout(() => {
          setShowTxDetailView(true);
        }, 3000);

        handleSubtractQueryCount(userIp);
        if (user && user.id !== undefined) {
          handleSubtractUserQueryCount(user.id);
        }
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

  const handleIPAddress = (ipAddress: string) => {
    if (!isUserSignedIn) {
      fetchOrAddIPAddress.mutate(
        { ipAddress },
        {
          onSuccess: (data) => {
            // Handle successful response
            // Set the Queries Remaining value to the queryCount field
            setQueriesRemaining(data.queryCount);
            setCooldownEnd(data.cooldownEnd ?? null);

            // If cooldownEnd is not null, set showTimerPopUp to true
            if (data.cooldownEnd) {
              setShowTimerPopUp(true);
            }
          },
          onError: (error) => {
            // Handle error case
            console.error("Error handling IP Address:", error);
          },
        }
      );
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isUserSignedIn) {
        fetch("/api/get-ip")
          .then((res) => res.json())
          .then((data) => {
            setUserIp(data.ip);
            handleIPAddress(data.ip);
          })
          .catch((error) => console.error("Error fetching IP:", error));
      }
    }, 3000); // 5000 milliseconds delay (5 seconds)

    return () => clearTimeout(timeoutId); // Clean up the timeout
  }, [isUserSignedIn]);

  const handleSubtractQueryCount = (ipAddress: string) => {
    if (!isUserSignedIn) {
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
    }
  };

  const handleUserQuery = (userId: number) => {
    if (isUserSignedIn) {
      fetchOrAddUserQuery.mutate(
        { userId },
        {
          onSuccess: (data) => {
            setQueriesRemaining(data.queryCount);
            setCooldownEnd(data.cooldownEnd ?? null);

            if (data.cooldownEnd) {
              setShowTimerPopUp(true);
            }
          },
          onError: (error) => {
            console.error("Error handling User Query:", error);
          },
        }
      );
    }
  };

  useEffect(() => {
    if (isUserSignedIn && user?.id !== undefined) {
      handleUserQuery(user.id);
    }
  }, [isUserSignedIn, user]);

  const handleSubtractUserQueryCount = (userId: number) => {
    if (isUserSignedIn) {
      updateUserQueryCount.mutate(
        { userId },
        {
          onSuccess: (data) => {
            setQueriesRemaining(data.queryCount);
          },
          onError: (error) => {
            console.error("Error updating user query count:", error);
          },
        }
      );
    }
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

  useEffect(() => {
    // Function to check the path and update state
    const checkPathAndUpdateState = () => {
      const pathDoesNotMatch = !router.pathname.startsWith("/transactions");
      if (pathDoesNotMatch) {
        setShowTimerPopUp(false);
      }
    };

    // Run the check on initial render
    checkPathAndUpdateState();

    // Add event listener for route change
    router.events.on("routeChangeComplete", checkPathAndUpdateState);

    // Remove event listener on cleanup
    return () => {
      router.events.off("routeChangeComplete", checkPathAndUpdateState);
    };
  }, [router]);

  const renderInscriptionData = () => {
    if (popUpData) {
      if (popUpData.item.title === "Inscription Data") {
        // inscription data can be multi things for the time being it can either be html, svg image or json

        // okay so this is janky but we're going have to loop through the hex res and find any item that has a title that holds the string "mime type"
        // their potentially could be more than 1 so we're going have to find the one that is closes and before our current index
        const mimeItems = txData?.hexResponse.parsedRawHex.filter((item, i) => {
          const includeMimeTitle = item.item.title.includes("MIME Type:");

          if (includeMimeTitle) {
            if (popUpData.dataItemIndex) {
              if (i < popUpData.dataItemIndex) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }

            return true;
          } else {
            return false;
          }
        });

        // get the last item in the array since it'll be the closest to our current index (which is our data)
        const mimeItem = mimeItems?.[mimeItems.length - 1];
        //console.log("mimeItem", mimeItem);

        // now we get the data type from the title
        const mimeType = mimeItem?.item.title.split(":")[1].trim();
        //console.log("mimeType", mimeType);

        if (mimeType) {
          if (mimeType.includes("text/plain")) {
            // return the text as html

            //const jsonItems = JSON.parse(props.item.value);
            return (
              <p className="mx-5 mt-3 text-lg text-dark-orange">
                {popUpData.item.value}
              </p>
            );
          } else if (mimeType === "image/svg+xml") {
            const scriptdataItem = ScriptData.fromHex(popUpData.item.value);
            //console.log("scriptdataItem", scriptdataItem);

            const svg = scriptdataItem.dataString;
            //console.log("svg", svg);
            // dangerouslySetInnerHTML={{ __html: svg }}

            const urlPath = "https://ordinals.com/";

            // find every instance of a url path and append urlPath to the beginning of it
            const newSvg = popUpData.item.value.replace(
              /href="\//g,
              `href="${urlPath}`
            );

            // remove the last character from the string
            const _newSvg = newSvg.slice(0, -1);
            //console.log("_newSvg", _newSvg);
            const blob = new Blob([_newSvg], { type: "text/html" });
            const url = URL.createObjectURL(blob);

            return (
              <div
                onClick={() => setShowInscriptionModal(true)}
                className="flex w-full flex-row items-center justify-center"
                style={{
                  backgroundImage: `url(https://bitscript-git-stage-setteam.vercel.app/images/inscriptionBackground.png)`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "100%",
                }}
              >
                <iframe
                  src={url}
                  sandbox="allow-scripts"
                  style={{ width: "300px", height: "300px", border: "none" }}
                ></iframe>
              </div>
            );
          } else if (mimeType === "image/png") {
            // Convert hex to bytes
            const byteData = hexToBytes(popUpData.rawHex);

            // Create a blob from the byte data
            const blob = new Blob([byteData], { type: "image/png" });

            // Create a URL for the blob
            const imageUrl = URL.createObjectURL(blob);

            return (
              <div
                style={{
                  backgroundImage: `url(https://bitscript-git-stage-setteam.vercel.app/images/inscriptionBackground.png)`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "100%",
                }}
                className="w-full"
              >
                <div className="w-1/2">
                  <Image
                    src={imageUrl}
                    alt={popUpData.item.title}
                    width={300}
                    height={300}
                  />
                </div>
              </div>
            );
          }
        }
        return null;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  const renderValue = () => {
    if (popUpData) {
      const { type, value } = popUpData.item;
      if (
        type === TxTextSectionType.outputPubKeySize ||
        type === TxTextSectionType.witnessElementSize ||
        type === TxTextSectionType.opCode ||
        type === TxTextSectionType.inputScriptSigSize ||
        type === TxTextSectionType.inputSequence ||
        type === TxTextSectionType.lockTimeValue
      ) {
        return value;
      } else {
        return value.length > 8
          ? value.slice(0, 8) + "..." + value.slice(-8)
          : value;
      }
    }
  };

  return (
    <div
      className={` min-h-[85vh] overflow-hidden bg-primary-gray ${
        isMenuOpen ? "hidden" : "block"
      }`}
    >
      {showTimerPopUp && <TimerPopUp />}
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
          env={env}
          setEnv={setEnv}
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
      <AnimatePresence>
        {showInscriptionModal && (
          <motion.div
            initial={{ x: "0", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
            onClick={() => setShowInscriptionModal(false)}
            className="fixed inset-0 z-[1000] grid h-full w-full cursor-pointer  overflow-y-scroll bg-slate-100/10 p-10 backdrop-blur md:ml-[220px]"
          >
            <motion.div
              initial={{ scale: 0, rotate: "0deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              style={{
                width: "calc(100% - 220px)",
              }}
              className="relative  flex h-[90vh]   cursor-default flex-col items-center rounded-[20px]  bg-white    text-[#0C071D] shadow-xl "
            >
              <div className="flex h-full w-full  items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                <div className="px-4 pb-4">
                  <div className="mx-5 mt-5 flex flex-row justify-between">
                    <div className="flex flex-row items-center justify-center gap-x-1">
                      <p className="text-[28px] font-semibold text-[#0C071D]">
                        {popUpData ? popUpData.item.title : ""}
                      </p>
                    </div>
                    <div className="flex flex-row items-center">
                      <p className=" overflow-hidden truncate text-[28px] font-semibold text-[#F79327]">
                        {renderValue()}
                      </p>

                      <div
                        onClick={() => setShowInscriptionModal(false)}
                        className=" ml-3 cursor-pointer rounded-full border-2 border-dark-orange p-1"
                      >
                        <ArrowsPointingInIcon className="h-6 w-6 text-dark-orange" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <hr className="mx-5 mt-3 h-0.5 flex-1 bg-[#F79327]" />
                  </div>
                  <p className="mx-5 mt-3 text-lg text-[#0C071D]">
                    {popUpData ? popUpData.item.description : ""}
                  </p>
                </div>
                {renderInscriptionData()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
