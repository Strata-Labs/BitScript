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

export enum TYPES_TX {
  JSON,
  HEX,
  LIST,
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
/*  
 - Deserialize Parent should take care of
 1) the shared state between the parent and it's children
 2) handle which views to show and provide the data needed to show these views
 3) any api logic which data by the children depend on 
*/

// the imports are going have to be updated
import { TransactionFeResponse } from "@/deserialization/model";

// imports that won't need to be updated
import DeserializeTxInput from "./DeserializeTxInput";
import TEST_DESERIALIZE from "@/deserialization";
import DeserializedHandler from "./DeserializedHandler";

const DeserializeParent = () => {
  /*
   * state
   */
  // The transaction data returned from api
  const [txData, setTxData] = useState<TransactionFeResponse | null>(null);
  // Btc network
  const [network, setNetwork] = useState(BTC_ENV.MAINNET);

  // Control the view type of transaction detail
  const [selectedViewType, setSelectedViewType] = useState<TYPES_TX>(
    TYPES_TX.HEX
  );
  // User input
  const [txUserInput, setTxUserInput] = useState<string>("");
  // Error from api lib
  const [txInputError, setTxInputError] = useState<string>("");
  // State to determine if we should show the tx detail view
  const [showTxDetailView, setShowTxDetailView] = useState<boolean>(false);
  // State to determine the status of current tx being viewed `TransactionInputType`
  const [txInputType, setTxInputType] = useState<TransactionInputType>(
    TransactionInputType.loadExample
  );

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

  useEffect(() => {
    if (txUserInput.length > 0) {
      console.log("useEffect for txUserInput ran");

      handleTxData();
    } else {
      setTxInputType(TransactionInputType.loadExample);
    }
  }, [txUserInput]);

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
      className="min-height-[92vh] flex h-full w-full flex-col gap-4 overflow-auto"
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
          {true && (
            <DeserializedHandler
              //txData={txData}
              deserializedType={deserializedType}
              deserializedView={deserializedView}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DeserializeParent;
