import { useEffect, useState } from "react";
import { isValidBitcoinTxId } from "../util";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import TEST_DESERIALIZE from "@/deserialization";
import { useAtom } from "jotai";
import { sandBoxPopUpOpen } from "@/comp/atom";

type ImportScriptProps = {
  setFetchShowing: (fetchShowing: boolean) => void;
  mainNetTestNet: string;
  setMainNetTestNet: (mainNetTestNet: string) => void;
  editorRef: React.MutableRefObject<any>;
};

type TxInProps = {
  txId: string;
  unlockingScript: string;
  vout: number;
};

const ImportScript = ({
  setFetchShowing,
  mainNetTestNet,
  setMainNetTestNet,
  editorRef,
}: ImportScriptProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isSandBoxPopUpOpen, setIsSandBoxPopUpOpen] = useAtom(sandBoxPopUpOpen);

  const [userTransactionId, setUserTransactionId] = useState(
    "c9d4d95c4706fbd49bdc681d0c246cb6097830d9a4abfa4680117af706a2a5a0"
  );

  const [error, setError] = useState("");

  const [txIns, setTxIns] = useState<TxInProps[]>([]);

  // handle updating the userTransactionId state when user types in the input
  const handleUserTransactionIdChange = (e: React.ChangeEvent<any>) => {
    setUserTransactionId(e.target.value);
  };

  useEffect(() => {
    if (isFetching === false && userTransactionId.length > 63) {
      fetchTx();
    }
  }, [userTransactionId]);

  const fetchTx = async () => {
    const validBTCAddress = isValidBitcoinTxId(userTransactionId);
    if (!validBTCAddress) {
      setError("Invalid Transaction ID");
      return;
    }
    setIsFetching(true);
    const res = await TEST_DESERIALIZE(userTransactionId);
    if (res) {
      setIsFetching(false);
      console.log("res it", res);
      // loop through all the txIns and
      /* 
        1) get their txId
        2) get their vout
        3) get their unlocking script
          - this is going be going through each item in the array
      */

      const numInputs = res.hexResponse.numInputs;

      const hexArr = res.hexResponse.parsedRawHex;

      const txIns: TxInProps[] = [];

      for (let i = 0; i < numInputs; i++) {
        const lockingScriptTxIxIndex = hexArr.findIndex(
          (hex) => hex.item.title === `TXID (input ${i + 1})`
        );

        if (lockingScriptTxIxIndex) {
          const lockingScriptTxIx = hexArr[lockingScriptTxIxIndex];
          console.log("lockingScriptTxIx ", lockingScriptTxIx);
          // we know the vout for this input is the next index
          const voutTxIndex = hexArr[lockingScriptTxIxIndex + 1];

          // now we need to get the unlocking script in a way our user can understand

          // get the total size of the script
          const sigScriptSize = hexArr[lockingScriptTxIxIndex + 3];
          const sigScriptStartIndex = lockingScriptTxIxIndex + 3;

          const sigScriptSizeValue = sigScriptSize.item.value;

          // get the range of index for the sigScript
          // we know where it starts

          let scriptCheck = sigScriptSize.rawHex;

          const filterCheck = hexArr.filter((hex, index) => {
            if (index > sigScriptStartIndex) {
              scriptCheck = scriptCheck + hex.rawHex;
              if (scriptCheck.length <= sigScriptSizeValue.length) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          });

          console.log("filterCheck", filterCheck);
          // convert to a single string of data
          const scriptString = filterCheck.reduce((acc, curr) => {
            if (curr.item.type === "opCode") {
              // get the opcode from the title
              const opCode = curr.item.title;

              // get the text inside of "()" within the title

              const text = opCode.match(/\(([^)]+)\)/);
              console.log("text ", text);
              if (text) {
                return acc + " " + text[1];
              }
            } else if (curr.item.type === "pushedData") {
              return acc + " " + ("0x" + curr.item.value || "");
            } else {
              return acc;
            }

            return acc;
          }, "");

          // convert
          console.log("scriptString", scriptString);
          // convert lil indian to big indian ( :D if jesus ever see this lol )
          const voutBE = voutTxIndex.item.value.substring(0, 2);
          // remove any leading 0 from the vout

          const txId = lockingScriptTxIx as any;
          const fack = txId.item.bigEndian;

          const txIn: TxInProps = {
            txId: fack,
            unlockingScript: scriptString,
            vout: parseInt(voutBE),
          };

          txIns.push(txIn);
        }
      }
      console.log("txIns ", txIns);
      setTxIns(txIns);
    }
  };

  const handleOutputSelection = async (txIn: TxInProps) => {
    try {
      const res = await TEST_DESERIALIZE(txIn.txId);

      if (res) {
        console.log("handleOutputSelection res ", res);
        // so close to the logic of the unlocking script that it hurts to rewrite but not close enough
        // get the index the locking script starts at
        // get the

        const hexArr = res.hexResponse.parsedRawHex;

        // find the output with the right vout;
        const lockingScriptIndex = hexArr.findIndex((hex) => {
          return hex.item.title === `ScriptPubKey (output ${txIn.vout})`;
        });

        if (lockingScriptIndex) {
          console.log("lockingScriptIndex", lockingScriptIndex);
          const lockingScript = hexArr[lockingScriptIndex];

          console.log("lockingScript", lockingScript);

          let lockingScriptCheck = lockingScript.rawHex;

          const filterCheck = hexArr.filter((hex, index) => {
            if (index > lockingScriptIndex) {
              lockingScriptCheck = lockingScriptCheck + hex.rawHex;
              if (
                lockingScriptCheck.length <= lockingScript.item.value.length
              ) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          });
          console.log("unlocking - filterCheck", filterCheck);

          const lockingScriptString = filterCheck.reduce((acc, curr) => {
            if (curr.item.type === "opCode") {
              // get the opcode from the title
              const opCode = curr.item.title;

              // get the text inside of "()" within the title

              const text = opCode.match(/\(([^)]+)\)/);
              console.log("text ", text);
              if (text) {
                return acc + " " + text[1];
              }
            } else if (curr.item.type === "pushedData") {
              return acc + " " + ("0x" + curr.item.value || "");
            } else if (curr.item.type === "segwitVersion") {
              if (curr.item.value === "00 hex | 0 opcode") {
                return acc;
              } else {
                return acc + " 01";
              }
            } else {
              return acc;
            }

            return acc;
          }, "");

          console.log("lockingScriptString", lockingScriptString);

          buildTotalScriptToImport(lockingScriptString, txIn.unlockingScript);
        } else {
          console.log("could not find the locking script ");
          return null;
        }
      } else {
        console.log("error ", error);
        return null;
      }
    } catch (error) {
      console.log("error ", error);
      return null;
    }
  };

  const buildTotalScriptToImport = (
    lockingScript: string,
    unlockingScript: string
  ) => {
    let script = "//lockscript/scriptpubkey";
    // replace all the " " with "\n" in locking script
    const lockingScriptArr = lockingScript.split(" ");
    const lockingScriptArrWithNewLines = lockingScriptArr.map((script) => {
      return script + "\n";
    });
    const lockingScriptString = lockingScriptArrWithNewLines.join("");
    script = script + lockingScriptString;

    script = script + "\n  \n //unlockscript/scriptsig ";

    //replace all the " " with "\n" in unlocking script
    const unlockingScriptArr = unlockingScript.split(" ");
    const unlockingScriptArrWithNewLines = unlockingScriptArr.map((script) => {
      return script + "\n";
    });
    const unlockingScriptString = unlockingScriptArrWithNewLines.join("");
    script = script + unlockingScriptString;

    console.log("script ", script);
    const model = editorRef.current?.getModel();

    if (model) {
      model.setValue(script);
      setIsSandBoxPopUpOpen(false);
    }
  };

  return (
    <>
      <button
        className="absolute left-2 top-2 rounded-full bg-[#242034] p-2"
        onClick={() => setFetchShowing(false)}
      >
        {" "}
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: "rotate(180deg)" }}
        >
          <path
            d="M7.99986 16.4583C8.15986 16.4583 8.31988 16.3975 8.44155 16.275L14.2749 10.4417C14.519 10.1975 14.519 9.80164 14.2749 9.55747L8.44155 3.72414C8.19738 3.47997 7.80152 3.47997 7.55735 3.72414C7.31319 3.96831 7.31319 4.36417 7.55735 4.60834L12.949 9.99998L7.55735 15.3916C7.31319 15.6358 7.31319 16.0317 7.55735 16.2758C7.67985 16.3975 7.83986 16.4583 7.99986 16.4583Z"
            fill="#fff"
          />
        </svg>
      </button>

      <h3 className="mb-2 ml-[20px] mr-[20px] mt-5 text-center text-[18px] font-bold md:ml-[120px] md:mr-[120px] md:text-[28px]">
        Fetch UTXO
      </h3>
      <p className="font-extralight">
        start by providing a mined transaction ID
      </p>
      <div className="mt-5 h-[0.5px] w-full border-b border-[#F79327] "></div>
      <div className="mt-10 flex w-full flex-row items-center justify-between">
        <p className="font-extralight">1. Fetch Transaction Outputs</p>
        <div className="flex rounded-full bg-[#29243A] px-5 py-1 text-[14px] font-extralight">
          <button
            className={`rounded-full  px-5 py-1 ${
              mainNetTestNet === "Main" ? "bg-[#110B24] " : "bg-transparent"
            }`}
            onClick={() => setMainNetTestNet("Main")}
          >
            Mainnet
          </button>
          <button
            className={`rounded-full  px-5 py-1 ${
              mainNetTestNet === "Test" ? "bg-[#110B24]" : "bg-transparent"
            }`}
            onClick={() => setMainNetTestNet("Test")}
          >
            Testnet
          </button>
        </div>
      </div>

      <div className="relative mt-5 w-full">
        <input
          onChange={handleUserTransactionIdChange}
          value={userTransactionId}
          className="w-full rounded-full border border-[#F79327] bg-transparent px-4 py-2 pl-8 outline-none"
          placeholder="paste in 32-byte TXID..."
        ></input>
        {/* Checkmark */}
        {/* Hidden at the beginning and showing when fetch is successful */}
        <svg
          width="23"
          height="22"
          viewBox="0 0 23 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-2 top-2 hidden"
        >
          <path
            d="M11.5 0.25C5.572 0.25 0.75 5.073 0.75 11C0.75 16.927 5.572 21.75 11.5 21.75C17.428 21.75 22.25 16.927 22.25 11C22.25 5.073 17.428 0.25 11.5 0.25ZM11.5 20.25C6.399 20.25 2.25 16.101 2.25 11C2.25 5.899 6.399 1.75 11.5 1.75C16.601 1.75 20.75 5.899 20.75 11C20.75 16.101 16.601 20.25 11.5 20.25ZM15.53 8.13599C15.823 8.42899 15.823 8.90402 15.53 9.19702L10.863 13.864C10.717 14.01 10.525 14.084 10.333 14.084C10.141 14.084 9.94901 14.011 9.80301 13.864L7.47 11.531C7.177 11.238 7.177 10.763 7.47 10.47C7.763 10.177 8.23801 10.177 8.53101 10.47L10.334 12.273L14.47 8.13702C14.763 7.84402 15.237 7.84399 15.53 8.13599Z"
            fill="#5DDE44"
          />
        </svg>
      </div>

      <p className="mt-10 flex w-full items-start text-left font-extralight">
        2. Select Output PubKeyScript
      </p>
      {txIns.map((txIn, index) => {
        return (
          <div
            onClick={() => handleOutputSelection(txIn)}
            key={index}
            className="mt-5 flex h-10 w-full  cursor-pointer  flex-row  items-center justify-between rounded-full bg-[#292439] px-6 py-2 outline-none transition-all hover:bg-[#514771]"
          >
            <div className="flex flex-row items-center gap-4">
              <p className="text-[16px] font-extralight">{txIn.vout}</p>
              <p className="text-[16px] font-extralight">
                {
                  // trim after 24 characters
                  txIn.txId.substring(0, 64)
                }
              </p>
            </div>
            <ChevronRightIcon className="h-7 w-7 text-dark-orange" />
          </div>
        );
      })}

      {/* If fetch UTXO Successful */}
      {/* {outputPubKeyScript.map((i, index) => (
      <button className="mt-3 flex w-full flex-row items-center justify-between rounded-full bg-[#0C071D] px-3 py-2 font-extralight text-[#EEEEEE]">
        <p className="ml-1">
          {index} <span className="ml-5">{i.id}</span>
        </p>
        <div className="flex flex-row items-center text-[14px]">
          <p className="mr-3 rounded-full bg-[#231C33] px-3 py-1">
            {i.type}
          </p>
          <svg
            width="10"
            height="23"
            viewBox="0 0 14 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.939325 3.06153C0.353681 2.47589 0.353395 1.52656 0.938472 0.940565C1.23149 0.645737 1.6171 0.499969 1.99958 0.499969C2.38244 0.499969 2.76772 0.645947 3.06169 0.941551C3.0619 0.941771 3.06212 0.941992 3.06234 0.942211L12.3945 10.2743C12.9804 10.8603 12.9804 11.8102 12.3945 12.3962L3.06114 21.7295C2.47522 22.3154 1.52525 22.3154 0.939325 21.7295C0.353396 21.1436 0.353396 20.1936 0.939325 19.6077L9.2124 11.3346L0.939325 3.06153Z"
              fill="#F79327"
            />
          </svg>
        </div>
      </button>
    ))} */}
    </>
  );
};

export default ImportScript;
