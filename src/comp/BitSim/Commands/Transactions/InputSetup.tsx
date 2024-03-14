import { AnimatePresence, motion } from "framer-motion";
import { classNames } from "@/utils";
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { SettingsInput } from "../../CreateBitSim";
import { RadiosSection } from "./TransactionGenerate";

const InputUTXOMOCkData = [
  {
    owner: "Alice",
    pubKeyType: "P2PKH",
    txId: "ofa3bse",
    vout: 2,
    btc: "0.023",
    autoSign: false,
    select: false,
    utxoIndex: 1,
  },
  {
    owner: "Boib",
    pubKeyType: "P2PKH",
    txId: "ofa3bse",
    vout: 5,
    btc: "0.023",
    autoSign: false,
    select: false,
    utxoIndex: 1,
  },
];
type InputUTXORowType = {
  owner: string;
  utxoIndex: number;
  pubKeyType: string;
  txId: string;
  vout: number;
  btc: string;
  autoSign: boolean;
  select: boolean;
  keyIndex: number;
};

type RadioSettingsInputRow = {
  [key: string]: boolean;
  select: boolean;
  auto_sign: boolean;
};

const InputUTXORow = (props: InputUTXORowType) => {
  const {
    owner,
    utxoIndex,
    pubKeyType,
    txId,
    vout,
    btc,
    autoSign,
    select,
    keyIndex,
  } = props;

  const [radioSettings, setRadioSettings] = useState<RadioSettingsInputRow>({
    select: false,
    auto_sign: false,
  });

  const handleRadioSelect = (key: string) => {
    setRadioSettings((prev) => {
      return {
        ...prev,
        [key]: !prev[key],
      };
    });
  };

  return (
    <tr
      key={keyIndex}
      className={` border-b border-[#E9EAEC] ${
        keyIndex % 2 === 0 ? "hover-row-white" : "hover-row-grayish"
      }`}
    >
      <td className="text-md py-3.5 pl-5 pr-3 font-normal  text-[#0C071D] ">
        {utxoIndex}
      </td>
      <td className="text-md py-3.5 pl-5  pr-3 font-normal text-[#0C071D] ">
        {owner}
      </td>
      <td className="text-md py-3.5 pl-5  pr-3 font-normal text-[#0C071D] ">
        {pubKeyType}
      </td>
      <td className="text-md py-3.5 pl-5  pr-3 font-normal text-[#0C071D] ">
        {txId}
      </td>
      <td className="text-md py-3.5 pl-5  pr-3 font-normal text-[#0C071D] ">
        {vout}
      </td>
      <td className="text-md py-3.5 pl-5  pr-3 font-normal text-[#0C071D] ">
        {btc}
      </td>
      <td className="text-md py-3.5 pl-5  pr-3 font-normal text-[#0C071D] ">
        <RadiosSection
          title=""
          active={radioSettings.select}
          handleSelect={handleRadioSelect}
          radioKey="select"
        />
      </td>
      <td className="text-md py-3.5 pl-5  pr-3 font-normal text-[#0C071D] ">
        <RadiosSection
          title=""
          active={radioSettings.auto_sign}
          handleSelect={handleRadioSelect}
          radioKey="auto_sign"
        />
      </td>
    </tr>
  );
};
type InputSetupType = {
  setShowOverlay: (value: boolean) => void;
  showOverlay: boolean;
};

type RadioSettings = {
  [key: string]: boolean;
  automatic_utxo_collection: boolean;
  automatic_signed_when_collected: boolean;
};

const InputSetup = ({ setShowOverlay, showOverlay }: InputSetupType) => {
  const [whoIsFunding, setWhoIsFunding] = useState<string>("");
  const [howMuchBtc, setHowMuchBtc] = useState<string>("0");

  const [radioSettings, setRadioSettings] = useState<RadioSettings>({
    automatic_utxo_collection: false,
    automatic_signed_when_collected: false,
  });

  const handleRadioSelect = (key: string) => {
    setRadioSettings((prev) => {
      return {
        ...prev,
        [key]: !prev[key],
      };
    });
  };

  const handleSaveButtonClick = () => {
    setShowOverlay(false);
  };
  return (
    <motion.div
      initial={{ x: "0", opacity: 0 }}
      animate={{ x: "0", opacity: 1 }}
      onClick={() => setShowOverlay(false)}
      className="fixed inset-0 z-50 grid cursor-pointer place-items-center overflow-y-scroll bg-slate-100/10 backdrop-blur md:ml-[240px]"
    >
      <motion.div
        initial={{ scale: 0, rotate: "0deg" }}
        animate={{ scale: 1, rotate: "0deg" }}
        exit={{ scale: 0, rotate: "0deg" }}
        onClick={(e) => e.stopPropagation()}
        className="relative m-auto flex  w-3/4  flex-col items-center rounded-[20px] bg-[#f9f9f9] p-8 px-10 text-[#0C071D] shadow-xl   "
      >
        <div className="flex w-full  flex-col gap-8 p-1">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-1">
              <ChevronLeftIcon className="h-10 w-10 text-[#0C071D]  " />
              <p className=" text-[26px]  font-normal  text-[#0C071D]">
                Input Setup
              </p>
            </div>
            <div className="w-60">
              <button
                onClick={() => handleSaveButtonClick()}
                className={classNames(
                  "flex h-[60px] w-full items-center justify-between rounded-full pl-6  ",
                  "cursor-pointer bg-[#0C071D] "
                )}
              >
                <p className="gradient-text mr-5 text-[16px] font-bold tracking-wider  ">
                  Confirm Setup
                </p>
                <CheckCircleIcon className="mr-5 h-10 w-10 text-dark-orange" />
              </button>
            </div>
          </div>
          <div className="flex w-full flex-col  gap-4 rounded-xl bg-white px-4 py-6">
            <p className=" text-[28px]  font-normal  text-[#0C071D]">
              Input(s) Details
            </p>
            <div className="flex flex-col gap-4">
              <SettingsInput
                valid={whoIsFunding.length > 0}
                label="Who’s funding this transaction?"
                placeholder="Type in or select a wallet such as “Alice”"
                value={whoIsFunding}
                setValue={setWhoIsFunding}
              />
              <SettingsInput
                valid={howMuchBtc.length > 0}
                label="How much BTC is transferred in this transaction?"
                placeholder="Type in an integer (1,2,3...)"
                value={howMuchBtc}
                setValue={setHowMuchBtc}
              />
            </div>
            <div className="flex flex-row gap-4 py-4">
              <RadiosSection
                title="Automatic UTXO/coin selection"
                active={radioSettings.automatic_utxo_collection}
                handleSelect={handleRadioSelect}
                radioKey="automatic_utxo_collection"
              />
              <RadiosSection
                title="Automatic Sign When Selected (if possible)"
                active={radioSettings.automatic_signed_when_collected}
                handleSelect={handleRadioSelect}
                radioKey="automatic_signed_when_collected"
              />
            </div>
          </div>
          <div className="flex w-full flex-col  gap-4 rounded-xl bg-[#fafafafa] px-4 py-6">
            <p className=" text-[28px]  font-normal  text-[#0C071D]">UTXO</p>
            <div className="w-full  overflow-hidden overflow-x-auto">
              <table className="w-full table-auto">
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                </colgroup>
                <thead>
                  <tr className="bg-[#FAFAFA]">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-light text-[#687588] sm:pl-3"
                    >
                      UTXO Index
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      Owner
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      PubKey Type
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      TXID
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      VOUT
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      BTC
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      Auto Sign
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      Select
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {InputUTXOMOCkData.map((data, index) => {
                    return (
                      <InputUTXORow
                        keyIndex={index}
                        {...data}
                        utxoIndex={index + 1}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InputSetup;
