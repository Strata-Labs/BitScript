import {
  TransactionFeResponse,
  TransactionItem,
} from "@/deserialization/model";
import {
  DESERIALIZED_TYPE,
  DESERIALIZED_VIEW,
  TransactionInputType,
} from "./DeserializeParent";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { classNames, satsToBtc } from "@/utils";
import ErrorDisplayHex from "@/comp/Transactions/ErrorDisplay";
import { TxTextSection } from "./Helper";
import { useAtom } from "jotai";
import { isClickedModularPopUpOpen } from "../atoms";
import dynamic from "next/dynamic";
import ModularPopUp from "@/comp/Transactions/ModularPopUp";
import DeserializedListView from "./DeserilizedListView";

const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

type TxInfoHeader = {
  txData: TransactionFeResponse;
};
const TxInfoHeader = ({ txData }: TxInfoHeader) => {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-2">
        <p className="text-lg font-bold text-black">Block 58</p>
        <p className="text-md font-thin text-black">(mainnet)</p>
      </div>
      <div className="flex flex-row items-center gap-2">
        <p className="text-lg font-bold text-black">
          {txData.hexResponse.numInputs}{" "}
          <span className="text-md font-thin text-black">ins</span>
        </p>
        <p className="text-lg font-bold text-black">|</p>
        <p className="text-lg font-bold text-black">
          {txData.hexResponse.numOutputs}{" "}
          <span className="text-md font-thin text-black">outs</span>
        </p>
        <p className="text-lg font-bold text-black">|</p>
        <p className="text-lg font-bold text-black">
          {satsToBtc(txData.hexResponse.totalBitcoin)}{" "}
          <span className="text-md font-thin text-black">btc</span>
        </p>
      </div>
    </div>
  );
};

type TxViewSwitchProps = {
  selectedTxViewType: TX_VIEW;
  setSelectedTxViewType: (txViewType: TX_VIEW) => void;
};
const TxViewSwitch = ({
  selectedTxViewType,
  setSelectedTxViewType,
}: TxViewSwitchProps) => {
  const selectedHex = selectedTxViewType === TX_VIEW.HEX;
  const selectedList = selectedTxViewType === TX_VIEW.LIST;
  const selectedJson = selectedTxViewType === TX_VIEW.JSON;

  const basicButtonStyle =
    "flex h-12 flex-1 cursor-pointer items-center flex-col  border-black transition-all";

  const basicBottomBorderStyle = "h-[4px] w-16  rounded-md";

  const textBasicStyle = "text-lg transition-all ";
  return (
    <div className="flex w-full flex-row">
      <div
        onClick={() => setSelectedTxViewType(TX_VIEW.HEX)}
        className={classNames(
          basicButtonStyle,
          "rounded-l-full   border-y-2 border-l-2 ",
          selectedHex && "bg-dark-purple"
        )}
      >
        <div className="flex flex-1 flex-col items-center justify-center">
          <p
            className={classNames(
              textBasicStyle,
              selectedHex
                ? "font-bold text-dark-orange"
                : "font-thin text-black"
            )}
          >
            Hex
          </p>
        </div>
        <div
          className={classNames(
            basicBottomBorderStyle,
            selectedHex ? " bg-dark-orange" : "bg-transparent"
          )}
        />
      </div>
      <div
        onClick={() => setSelectedTxViewType(TX_VIEW.LIST)}
        className={classNames(
          basicButtonStyle,
          "border-y-2 ",
          selectedList && "bg-dark-purple"
        )}
      >
        <div className="flex flex-1 flex-col items-center justify-center">
          <p
            className={classNames(
              textBasicStyle,
              selectedList
                ? "font-bold text-dark-orange"
                : "font-thin text-black"
            )}
          >
            List
          </p>
        </div>
        <div
          className={classNames(
            basicBottomBorderStyle,
            selectedList ? " bg-dark-orange" : "bg-transparent"
          )}
        />
      </div>
      <div
        onClick={() => setSelectedTxViewType(TX_VIEW.JSON)}
        className={classNames(
          basicButtonStyle,
          "rounded-r-full border-y-2 border-r-2 ",
          selectedJson && "bg-dark-purple"
        )}
      >
        <div className="flex flex-1 flex-col items-center justify-center">
          <p
            className={classNames(
              textBasicStyle,
              selectedJson
                ? "font-bold text-dark-orange"
                : "font-thin text-black"
            )}
          >
            JSON
          </p>
        </div>
        <div
          className={classNames(
            basicBottomBorderStyle,

            selectedJson ? " bg-dark-orange" : "bg-transparent"
          )}
        />
      </div>
    </div>
  );
};

export enum TX_VIEW {
  JSON,
  HEX,
  LIST,
}

type DeserializedHandlerProps = {
  txData: TransactionFeResponse;
  deserializedType: DESERIALIZED_TYPE | null;
  deserializedView: DESERIALIZED_VIEW;
  txInputType: TransactionInputType;
  txInputError: string;
  isModularPopUpOpen: boolean;
  popUpData: TransactionItem | null;

  setIsModularPopUpOpen: (status: boolean) => void;

  setTxInputError: (error: string) => void;
  setPopUpData: (data: TransactionItem | null) => void;
};
const DeserializedHandler = ({
  //txData,
  deserializedView,
  deserializedType,
  txInputError,
  txData,
  txInputType,
  setTxInputError,
  setPopUpData,
  popUpData,
  setIsModularPopUpOpen,
  isModularPopUpOpen,
}: DeserializedHandlerProps) => {
  const [isClickedModularPopUp, setIsClickedModularPopUp] = useAtom(
    isClickedModularPopUpOpen
  );

  const [open, setOpen] = useState(false);

  // Control the view type of transaction detail
  const [selectedTxViewType, setSelectedTxViewType] = useState<TX_VIEW>(
    TX_VIEW.HEX
  );

  // keep track of y position?
  const [screenYPosition, setScreenYPosition] = useState<number | null>(null);

  const handleHover = (type: TransactionItem, e: React.MouseEvent) => {
    console.log("handleHover working on TxTextSection");
    if (!isClickedModularPopUp) {
      setScreenYPosition(e.screenY + 600);
      setPopUpData(type);
      setIsModularPopUpOpen(true);
    }
  };

  const renderView = () => {
    if (selectedTxViewType === TX_VIEW.JSON) {
      return <DynamicReactJson src={txData.jsonResponse} />;
    } else if (selectedTxViewType === TX_VIEW.HEX) {
      return handleSetDeserializedTx();
    } else {
      return renderListView();
    }
  };
  const renderListView = () => {
    return (
      <DeserializedListView
        txData={txData}
        popUpData={popUpData}
        setScreenYPosition={setScreenYPosition}
        setPopUpData={setPopUpData}
        setIsModularPopUpOpen={setIsModularPopUpOpen}
        setOpen={setOpen}
      />
    );
  };
  const handleSetDeserializedTx = () => {
    const reactElement = [];

    if (selectedTxViewType === TX_VIEW.HEX) {
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

  console.log("isModularPopUpOpen", isModularPopUpOpen);
  console.log("isClickedModularPopUp", isClickedModularPopUp);
  console.log("popUpData", popUpData);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="flex w-full flex-col items-center gap-2  px-8"
    >
      <TxInfoHeader txData={txData} />
      <TxViewSwitch
        selectedTxViewType={selectedTxViewType}
        setSelectedTxViewType={setSelectedTxViewType}
      />
      {
        // hex view
      }

      <div
        style={{
          whiteSpace: "pre-wrap",
        }}
        className={classNames(
          "flex w-full flex-col items-start gap-0 overflow-hidden overflow-y-auto  break-all rounded-b-2xl border-b  pb-4",
          selectedTxViewType === TX_VIEW.HEX ? " max-h-[450px] " : "h-full"
        )}
      >
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
          className={classNames("!outline-none")}
          suppressContentEditableWarning={true}
          contentEditable={selectedTxViewType !== TX_VIEW.LIST}
        >
          {renderView()}
        </div>
      </div>
      <AnimatePresence key="modularPopUp">
        {(isModularPopUpOpen || isClickedModularPopUp) && popUpData && (
          <motion.div
            key={"inital"}
            initial={{ scale: 1, y: 300 }}
            animate={{ scale: 1, y: "10px" }}
            exit={{ scale: 0, y: 300 }}
            onClick={() => setIsClickedModularPopUp(false)}
            className=" inset-0 z-40 grid cursor-pointer place-items-center  md:mb-10  "
            style={{
              display:
                (isModularPopUpOpen || isClickedModularPopUp) && popUpData
                  ? "grid"
                  : "none",
            }}
          >
            <ModularPopUp key={popUpData.rawHex} popUpData={popUpData} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DeserializedHandler;
