import { classNames } from "@/utils";
import { useState } from "react";
import { SettingsInput } from "../../CreateBitSim";
import { BTC_ENV } from "@/deserialization";
import { CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

import InputSetup from "./InputSetup";

enum TRANSACTION_TYPE {
  import = "import",
  random = "random",
}

type RadioSectionType = {
  active: boolean;
  handleSelect: (radioKey: string) => void;
  title: string;
  radioKey: string;
};

export const RadiosSection = ({
  title,
  handleSelect,
  active,
  radioKey,
}: RadioSectionType) => {
  return (
    <div
      onClick={() => handleSelect(radioKey)}
      className="flex cursor-pointer flex-row items-center justify-start gap-2"
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-dark-orange">
        {active && <CheckIcon className="h-6 w-6 font-bold text-dark-orange" />}
      </div>
      <p className="text-[20px] font-normal text-[#0C071D]  ">{title}</p>
    </div>
  );
};

type RadioSettings = {
  [key: string]: boolean;
  create_new_wallet: boolean;
  create_new_utxo: boolean;
};

const GenerateTransaction = () => {
  const [transactionType, setTransactionType] = useState<TRANSACTION_TYPE>(
    TRANSACTION_TYPE.import
  );

  const [radioSettings, setRadioSettings] = useState<RadioSettings>({
    create_new_wallet: false,
    create_new_utxo: false,
  });

  const [txId, setTxId] = useState<string>("");

  const [env, setEnv] = useState(BTC_ENV.MAINNET);

  const handleSetTxIdValue = (value: string) => {
    setTxId(value);
  };

  const handleRadioSelect = (key: string) => {
    setRadioSettings((prev) => {
      return {
        ...prev,
        [key]: !prev[key],
      };
    });
  };
  return (
    <div
      style={{
        //minHeight: "calc(100vh - 110px)",
        minHeight: "92vh",
        paddingLeft: "240px",
      }}
      className="min-height-[92vh] flex h-full w-full flex-col gap-4 overflow-auto"
    >
      <div className="flex flex-col gap-10 p-8">
        <div className="flex flex-row">
          <p className=" text-[20px] font-semibold text-[#0C071D]  md:text-[32px]">
            Transaction Type
          </p>
        </div>
        <div className="flex h-20 w-full flex-row items-center justify-center rounded-full bg-white">
          <div
            onClick={() => setTransactionType(TRANSACTION_TYPE.import)}
            className="flex h-full w-1/3 cursor-pointer flex-col items-center"
          >
            <div className="flex h-full flex-col items-center justify-center">
              <p
                className={classNames(
                  "text-xl font-semibold text-[#000000]",
                  transactionType === TRANSACTION_TYPE.import
                    ? "font-bold"
                    : "font-thin"
                )}
              >
                Import
              </p>
            </div>

            {transactionType === TRANSACTION_TYPE.import && (
              <div className="h-2 w-full rounded-full bg-dark-orange" />
            )}
          </div>
          <div
            onClick={() => setTransactionType(TRANSACTION_TYPE.random)}
            className="flex h-full w-1/3 cursor-pointer flex-col items-center"
          >
            <div className="flex h-full flex-col items-center justify-center">
              <p
                className={classNames(
                  "text-xl font-semibold text-[#000000]",
                  transactionType === TRANSACTION_TYPE.random
                    ? "font-bold"
                    : "font-thin"
                )}
              >
                Random
              </p>
            </div>

            {transactionType === TRANSACTION_TYPE.random && (
              <div className="h-2 w-full rounded-full bg-dark-orange" />
            )}
          </div>
        </div>
        <div className="flex w-full flex-col gap-10 rounded-xl bg-white p-10">
          <p className=" text-[20px]  font-semibold text-[#0C071D]  md:text-[36px]">
            Import Transaction
          </p>
          <div className="flex w-full flex-row items-end gap-2 ">
            <div className="flex-1 ">
              <SettingsInput
                valid={true}
                label="TXID"
                placeholder="Enter the TXID"
                value={txId}
                setValue={handleSetTxIdValue}
              />
            </div>
            <div className="flex flex-row items-center">
              <button
                className={`rounded-l-full border-2 border-solid border-black px-5 py-3 text-xl ${
                  env === BTC_ENV.MAINNET
                    ? "bg-[#110B24] "
                    : "bg-transparent text-black"
                }`}
                onClick={() => setEnv(BTC_ENV.MAINNET)}
              >
                Mainnet
              </button>
              <button
                className={`rounded-r-full border-2 border-solid border-black px-5 py-3 text-xl ${
                  env === BTC_ENV.TESTNET
                    ? "bg-[#110B24]"
                    : " bg-transparent text-black"
                }`}
                onClick={() => setEnv(BTC_ENV.TESTNET)}
              >
                Testnet
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[18px]  text-[#6C5E70]">Import Settings</p>
            <div className="flex flex-row gap-4 py-4">
              <RadiosSection
                title="Create new wallet if necessary"
                active={radioSettings.create_new_wallet}
                handleSelect={handleRadioSelect}
                radioKey="create_new_wallet"
              />
              <RadiosSection
                title="Create New UTXO if necessary"
                active={radioSettings.create_new_utxo}
                handleSelect={handleRadioSelect}
                radioKey="create_new_utxo"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row items-center gap-2  ">
          <div className="h-1 flex-1 rounded-full bg-dark-orange" />
          <p className="text-md text-dark-orange">or</p>
          <div className="h-1 flex-1 rounded-full bg-dark-orange" />
        </div>
        <Link href="/bitsim/commands/transactions/customtransaction" passHref>
          <button
            className={classNames(
              "flex h-[72px] w-full items-center justify-between rounded-full px-6 shadow-md  ",
              "cursor-pointer bg-white "
            )}
          >
            <p className="mr-5 text-[20px] font-bold tracking-wider text-black  md:mr-10">
              Generate a <span className="font-bold">Custom</span> Transaction
            </p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GenerateTransaction;
