import { TransactionFeResponse } from "@/deserialization/model";
import ModularButton from "./ModularButton";
import { TransactionInputType } from "./TransactionsView";
import ErrorDisplayHex from "./ErrorDisplay";

type TransactionInputViewProps = {
  txInputType: TransactionInputType;
  txData: TransactionFeResponse | null;
  handleSetDeserializedTx: () => any;
  txInputError: string;
  handleTextAreaChange: (e: React.ChangeEvent<any>) => void;
  txUserInput: string;
  showTxDetailView: boolean;
};

const TransactionInputView = ({
  txInputType,
  txData,
  handleSetDeserializedTx,
  txInputError,
  txUserInput,
  handleTextAreaChange,
  showTxDetailView,
}: TransactionInputViewProps) => {
  return (
    <>
      <div className="flex flex-col md:ml-[250px] md:mr-[20px]">
        <div className="ml-5 mt-5 font-extralight text-[#6C5E70] md:mt-0">
          <p>Transactions</p>
        </div>
        <div className=" mx-5 mt-2 font-light text-[#6C5E70]">
          <div className="hidden md:block">
            <p>
              A Bitcoin transaction describes the flow of Bitcoin. Ultimately, a
              Bitcoin block is just many verified transactions & the blockchain
              itself is just a linked list of these blocks -{" "}
              <span className="font-bold">
                {" "}
                which makes transactions the crux of Bitcoin.
              </span>{" "}
            </p>
            <span className="mt-5">
              <p>
                Below are two tools to{" "}
                <span className="font-semibold text-[#F79327]">
                  read/deserialize/parse
                </span>{" "}
                or to{" "}
                <span className="font-semibold text-[#F79327]">
                  write/serialize/create
                </span>{" "}
                a transaction.
              </p>
            </span>
          </div>
          <div className="mt-2  flex  flex-row items-center justify-between md:mt-5 md:flex-row">
            <p className="text-lg font-semibold text-[#0C071D] md:text-2xl md:text-[38px]">
              Deserialize A Transaction
            </p>
            <ModularButton txInputType={txInputType} />
          </div>
          {showTxDetailView ? (
            <div
              style={{
                whiteSpace: "pre-wrap",
              }}
              className="mt-5 flex min-h-[240px] w-full min-w-[1403px] flex-col items-start gap-0 overflow-hidden  break-all rounded-2xl bg-[#F0F0F0] p-8 pt-2 "
            >
              {txInputType === TransactionInputType.transactionNotFound && (
                <div className="font-semibold text-[#E92544]">
                  transaction not found - are you sure it’s in the right format?
                </div>
              )}
              {txInputType === TransactionInputType.parsingError && (
                <ErrorDisplayHex text={txInputError} />
              )}
              <div
                id="txDataTextID"
                suppressContentEditableWarning={true}
                contentEditable
              >
                {handleSetDeserializedTx()}
              </div>
            </div>
          ) : (
            <>
              {txInputType === TransactionInputType.parsingError && (
                <div className="pl-2 pt-2">
                  <ErrorDisplayHex text={txInputError} />
                </div>
              )}
              <textarea
                onChange={handleTextAreaChange}
                placeholder="paste in a raw hex, json, transaction ID, or  load an example above"
                className="mt-5 h-[70vh] w-full rounded-2xl border border-transparent bg-[#F0F0F0] px-8 py-4 md:h-[240px] md:p-10"
                value={txUserInput}
              ></textarea>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default TransactionInputView;
