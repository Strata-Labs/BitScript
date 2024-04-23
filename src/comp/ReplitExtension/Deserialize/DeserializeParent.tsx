import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export enum BTC_ENV {
  MAINNET = "MAINNET",
  TESTNET = "TESTNET",
}

export enum TransactionInputType {
  verifyingTransaction = "verifyingTransaction",
  parsingError = "parsingError",
  verified = "verified",
  fetchingTransaction = "fetchingTransaction",
  transactionNotFound = "transactionNotFound",
  found = "found",
  loadExample = "loadExample",
}

export enum DESERIALIZED_TYPE {
  TX_ID,
  TX_HEX,
  SCRIPT_HEX,
}

export enum DESERIALIZED_VIEW {
  TX_INFO,
  SCRIPT_INFO,
}

export type SigScriptData = {
  knownScript: SCRIPTS_PAGE_PROPS;
  deserializeData: TransactionItem[];
  length: number;
};

type ScriptDataError = {
  status: boolean;
  script: string;
  errorReason?: string;
};
/*  
 - Deserialize Parent should take care of
 1) the shared state between the parent and it's children
 2) handle which views to show and provide the data needed to show these views
 3) any api logic which data by the children depend on 
*/

// the imports are going have to be updated
import {
  TransactionFeResponse,
  TransactionItem,
} from "@/deserialization/model";

// imports that won't need to be updated
import DeserializeTxInput from "./DeserializeTxInput";
import TEST_DESERIALIZE from "@/deserialization";
import DeserializedHandler from "./DeserializedHandler";
import { modularPopUp } from "../atoms";
import { useAtom } from "jotai";

import ScriptDeserializeParent from "./ScriptDeserialize/ScriptDeserializeParent";
import {
  parseScript,
  parseScriptForKnownScript,
} from "@/deserialization/helpers";
import { getOpcodeByHex } from "@/corelibrary/op_code";
import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import { SCRIPTS_LIST } from "@/utils/SCRIPTS";

const DeserializeParent = () => {
  /*
   * state
   */
  // The transaction data returned from api
  const [txData, setTxData] = useState<TransactionFeResponse | null>(null);
  // Btc network
  const [network, setNetwork] = useState(BTC_ENV.MAINNET);

  // User input
  const [txUserInput, setTxUserInput] = useState<string>(
    "6a473044022036e009b2c4bf06a03919be775bfea845e9759dbd1f2c08239dd9bcf823a7dec9022020a89a82321edb8762da785b0c7f780a761872ce155f11f41895f56c9e7b10fd012102a41bcfb1f97d893a9b58d369edfc38cae5b029b77d8679e71550a2cae03395b4"
  );
  // Error from api lib
  const [txInputError, setTxInputError] = useState<string>("");
  // State to determine if we should show the tx detail view
  const [showTxDetailView, setShowTxDetailView] = useState<boolean>(false);
  // State to determine the status of current tx being viewed `TransactionInputType`

  const [txInputType, setTxInputType] = useState<TransactionInputType>(
    TransactionInputType.loadExample
  );

  // state that handles the script data
  const [sigScriptData, setSigScriptData] = useState<SigScriptData | null>(
    null
  );
  // state that handles the script data error
  const [scriptDataError, setScriptDataError] =
    useState<ScriptDataError | null>(null);

  // state that handles the script data view
  const [showScriptDetailView, setShowScriptDetailView] =
    useState<boolean>(false);

  // state that handles which view to show based on the DESERIALIZED_TYPE
  /*
   * we are showing 2 possible deserialized views
   * * Tx information
   * * Script information
   * The two views are determined from 3 possible input types
   * * TX_ID (Tx information)
   * * TX_HEX (Tx information)
   * * SCRIPT_HEX (Script information)
   */
  const [deserializedType, setDeserializedType] =
    useState<DESERIALIZED_TYPE | null>(null);
  const [deserializedView, setDeserializedView] = useState<DESERIALIZED_VIEW>(
    DESERIALIZED_VIEW.TX_INFO
  );

  // data to show when hover/clicked
  const [popUpData, setPopUpData] = useState<TransactionItem | null>(null);

  const [isModularPopUpOpen, setIsModularPopUpOpen] = useAtom(modularPopUp);

  useEffect(() => {
    if (txUserInput.length > 0) {
      console.log("useEffect for txUserInput ran");

      handleWhatWereFetching();
    } else {
      setTxInputType(TransactionInputType.loadExample);
    }
  }, [txUserInput]);

  const tempSigScriptHandler = async () => {
    console.log("is this runnign");
    // check if the inputData is less 256 characters

    if (txUserInput.length > 256) {
      const err = {
        status: false,
        script: "",
        errorReason: "The imputed data exceeded script length limitations",
      };
      setScriptDataError(err);
      return;
    }
    /*
     * okay so here are our assumption about the sigScript input / unlocking script
     * * right now does not support witness data
     * * we can assume it's a script if the length does not exceed 256 characters
     * * we are only going to show script that we're recognized from our funcs `parseScriptForKnownScript`
     */

    // lets start
    // we can assume the first two characters are are the length of the script
    const lengthHex = txUserInput.substring(0, 2);
    console.log("lengthHex", lengthHex);
    // convert hex to decimal to get the length of the script
    const length = parseInt(lengthHex, 16) * 2;

    console.log("length", length);
    if (length > 256) {
      const err = {
        status: false,
        script: "",
        errorReason: "Op code length exceeded 256 character",
      };
      setScriptDataError(err);
      return;
    }
    // script without the length
    const scriptSig = txUserInput;
    console.log("scriptSig", scriptSig);

    const foundSigScriptType = parseScriptForKnownScript(scriptSig, true);
    // look for scripts that we know in SCRIPTS_LIST
    const SCR = SCRIPTS_LIST.find(
      (_script) => _script.shortHand === foundSigScriptType
    );

    if (SCR === undefined) {
      console.log("script not found");
      const err = {
        status: false,
        script: "",
        errorReason: "Script not recognized",
      };
      setScriptDataError(err);
      return;
    }
    console.log("parsedScript", foundSigScriptType);

    // we need to get the first op code for the func
    const firstOP = getOpcodeByHex(scriptSig.slice(0, 2))!;

    console.log("firstOP", firstOP);

    // now we can call parseScript
    const parsedScript = parseScript(scriptSig, firstOP.number, length);

    console.log("parsedScript", parsedScript);

    // set the state
    setTxInputType(TransactionInputType.verified);
    setSigScriptData({
      knownScript: SCR,
      deserializeData: parsedScript,
      length: length,
    });
    setDeserializedView(DESERIALIZED_VIEW.SCRIPT_INFO);
    setShowScriptDetailView(true);
  };

  const handleWhatWereFetching = () => {
    // set the state that we're fetching data
    setTxInputType(TransactionInputType.fetchingTransaction);

    // for the time being if the tx is 64 char we're going to assume it's a txId
    if (txUserInput.length === 64) {
      setDeserializedType(DESERIALIZED_TYPE.TX_ID);
      handleTxData();
    } else {
      // now we have two possible options
      // * txHex
      // * scriptHex

      // if the text is less than 256 chars than we can assume it's a script
      if (txUserInput.length <= 256) {
        setDeserializedType(DESERIALIZED_TYPE.SCRIPT_HEX);
        tempSigScriptHandler();
      } else {
        setDeserializedType(DESERIALIZED_TYPE.TX_HEX);
        handleTxData();
      }
    }
  };
  const handleTxData = async () => {
    try {
      // for the time being we're only going to handle fetching transaction based on the user inputing a txId or hexTx
      // set the input type to fetching
      setTxInputType(TransactionInputType.fetchingTransaction);

      console.log("txUserInput - env", network);
      const res = await TEST_DESERIALIZE(txUserInput, network);

      if (res) {
        //handleSetDeserializedTx();

        // wait 3 seconds before setting the txData
        setTxData(res);
        setTxInputType(TransactionInputType.verified);
        setDeserializedView(DESERIALIZED_VIEW.TX_INFO);
        setTimeout(() => {
          setShowTxDetailView(true);
        }, 3000);
      }
    } catch (err: any) {
      console.log("handleTxData - err", err);
      setTxInputType(TransactionInputType.parsingError);
      setTxInputError(err.message);
    }
  };

  console.log("txUserInput", txUserInput);
  console.log("txData", txData);

  return (
    <div
      style={{
        minHeight: "92vh",
        paddingLeft: "240px",
      }}
      className="min-height-[92vh] flex h-full w-full flex-col gap-4 overflow-auto bg-white"
    >
      {
        // DeserializeTxInput will always be shown
      }
      <div className="flex h-full w-full flex-col gap-4">
        <DeserializeTxInput
          setTxUserInput={setTxUserInput}
          txUserInput={txUserInput}
          txData={txData}
        />
        <AnimatePresence>
          {showScriptDetailView && sigScriptData !== null && (
            <ScriptDeserializeParent sigScriptData={sigScriptData} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {txData !== null && showTxDetailView && (
            <DeserializedHandler
              txData={txData}
              deserializedType={deserializedType}
              deserializedView={deserializedView}
              txInputType={txInputType}
              txInputError={txInputError}
              popUpData={popUpData}
              setIsModularPopUpOpen={setIsModularPopUpOpen}
              setTxInputError={setTxInputError}
              setPopUpData={setPopUpData}
              isModularPopUpOpen={isModularPopUpOpen}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DeserializeParent;
