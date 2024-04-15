import { TransactionFeResponse } from "@/deserialization/model";
import { DESERIALIZED_TYPE, DESERIALIZED_VIEW } from "./DeserializeParent";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { classNames } from "@/utils";

type DeserializedHandlerProps = {
  //txData: TransactionFeResponse;
  deserializedType: DESERIALIZED_TYPE | null;
  deserializedView: DESERIALIZED_VIEW;
};

const TxInfoHeader = () => {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-2">
        <p className="text-lg font-bold text-black">Block 58</p>
        <p className="text-md font-thin text-black">(mainnet)</p>
      </div>
      <div className="flex flex-row items-center gap-2">
        <p className="text-lg font-bold text-black">
          2 <span className="text-md font-thin text-black">ins</span>
        </p>
        <p className="text-lg font-bold text-black">|</p>
        <p className="text-lg font-bold text-black">
          2 <span className="text-md font-thin text-black">outs</span>
        </p>
        <p className="text-lg font-bold text-black">|</p>
        <p className="text-lg font-bold text-black">
          amount <span className="text-md font-thin text-black">btc</span>
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

  const basicBottomBorderStyle = "h-[4px] w-16 rounded-md";

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
            selectedHex ? " bg-dark-orange" : "bg-dark-purple"
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
            selectedList ? " bg-dark-orange" : "bg-dark-purple"
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

            selectedJson ? " bg-dark-orange" : "bg-dark-purple"
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

const DeserializedHandler = ({
  //txData,
  deserializedView,
  deserializedType,
}: DeserializedHandlerProps) => {
  // Control the view type of transaction detail
  const [selectedTxViewType, setSelectedTxViewType] = useState<TX_VIEW>(
    TX_VIEW.HEX
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="flex w-full flex-col gap-2  px-8"
    >
      <TxInfoHeader />
      <TxViewSwitch
        selectedTxViewType={selectedTxViewType}
        setSelectedTxViewType={setSelectedTxViewType}
      />
    </motion.div>
  );
};

export default DeserializedHandler;
