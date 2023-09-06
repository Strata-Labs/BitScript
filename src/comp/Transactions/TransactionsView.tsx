import Link from "next/link";
import TransactionContainer from "./TransactionContainer";
import PopUpExampleMenu from "./PopUpExample";
import { menuOpen, popUpExampleOpen } from "../atom";
import { useAtom, useAtomValue } from "jotai";

const TransactionsView = () => {
  const isMenuOpen = useAtomValue(menuOpen);
  const [isExamplePopUpOpen, setIsExamplePopUpOpen] = useAtom(popUpExampleOpen);
  return (
    <div
      className={`min-h-screen bg-primary-gray ${
        isMenuOpen ? "hidden" : "block"
      }`}
    >
      <div className="ml-[200px]">
        <PopUpExampleMenu />
      </div>
      <div className="flex flex-col md:ml-[250px]">
        <div className="ml-5 mt-5 font-extralight text-[#6C5E70] md:mt-0">
          <p>Transactions</p>
        </div>
        <div className="mx-5 mt-2 font-light text-[#6C5E70]">
          <p>
            A Bitcoin transaction describes the flow of Bitcoin. Ultimately, a
            Bitcoin block is just many verified transactions & the blockchain
            itself is just a linked list of these blocks -{" "}
            <span className="font-bold">
              {" "}
              which makes transactions the crux of Bitcoin.
            </span>{" "}
            <div className="mt-5">
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
            </div>
          </p>
          <div className="mt-5 flex flex-col justify-between md:flex-row">
            <p className="text-[30px] font-semibold text-[#0C071D] md:text-[38px]">
              Deserialize A Transaction
            </p>
            <button
              onClick={() => setIsExamplePopUpOpen(true)}
              className="mt-2 flex h-[26.5px] w-[160px] flex-row items-center justify-start rounded-full bg-[#F0F0F0] p-4 md:mt-0 md:h-[53px] md:w-[218px]"
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 16.5C6.80222 16.5 6.60888 16.5586 6.44443 16.6685C6.27998 16.7784 6.15181 16.9346 6.07612 17.1173C6.00043 17.3 5.98063 17.5011 6.01921 17.6951C6.0578 17.8891 6.15304 18.0673 6.29289 18.2071C6.43275 18.347 6.61093 18.4422 6.80491 18.4808C6.99889 18.5194 7.19996 18.4996 7.38268 18.4239C7.56541 18.3482 7.72159 18.22 7.83147 18.0556C7.94135 17.8911 8 17.6978 8 17.5C8 17.2348 7.89464 16.9804 7.70711 16.7929C7.51957 16.6054 7.26522 16.5 7 16.5ZM19.06 12.5L20.29 11.27C20.8518 10.7075 21.1674 9.945 21.1674 9.15C21.1674 8.355 20.8518 7.5925 20.29 7.03L17.46 4.21C16.8975 3.6482 16.135 3.33264 15.34 3.33264C14.545 3.33264 13.7825 3.6482 13.22 4.21L12 5.44C11.9843 4.65479 11.6613 3.90706 11.1004 3.35736C10.5395 2.80766 9.78536 2.49984 9 2.5H5C4.20435 2.5 3.44129 2.81607 2.87868 3.37868C2.31607 3.94129 2 4.70435 2 5.5V19.5C2 20.2956 2.31607 21.0587 2.87868 21.6213C3.44129 22.1839 4.20435 22.5 5 22.5H19C19.7956 22.5 20.5587 22.1839 21.1213 21.6213C21.6839 21.0587 22 20.2956 22 19.5V15.5C22.0002 14.7146 21.6923 13.9605 21.1426 13.3996C20.5929 12.8387 19.8452 12.5157 19.06 12.5ZM10 19.5C10 19.7652 9.89464 20.0196 9.70711 20.2071C9.51957 20.3946 9.26522 20.5 9 20.5H5C4.73478 20.5 4.48043 20.3946 4.29289 20.2071C4.10536 20.0196 4 19.7652 4 19.5V5.5C4 5.23478 4.10536 4.98043 4.29289 4.79289C4.48043 4.60536 4.73478 4.5 5 4.5H9C9.26522 4.5 9.51957 4.60536 9.70711 4.79289C9.89464 4.98043 10 5.23478 10 5.5V19.5ZM12 8.26L14.64 5.62C14.8274 5.43375 15.0808 5.32921 15.345 5.32921C15.6092 5.32921 15.8626 5.43375 16.05 5.62L18.88 8.5C19.0662 8.68736 19.1708 8.94081 19.1708 9.205C19.1708 9.46919 19.0662 9.72264 18.88 9.91L16 12.79L12 16.74V8.26ZM20 19.5C20 19.7652 19.8946 20.0196 19.7071 20.2071C19.5196 20.3946 19.2652 20.5 19 20.5H11.82C11.9226 20.2036 11.9799 19.8935 11.99 19.58L17.07 14.5H19C19.2652 14.5 19.5196 14.6054 19.7071 14.7929C19.8946 14.9804 20 15.2348 20 15.5V19.5Z"
                  fill="#6C5E70"
                />
              </svg>
              <p className="ml-3 text-xs font-extralight md:ml-7 md:text-lg">
                Load Example
              </p>
            </button>
          </div>
          <input
            placeholder="paste in a raw hex, json, transaction ID, or  load an example above"
            className="mt-5 h-[240px] w-full rounded-2xl bg-[#F0F0F0] p-10"
          ></input>
          <div className="mt-5 flex flex-row items-center">
            <hr className=" h-0.5 flex-1 bg-[#6C5E70]" />
            <span className="mx-10 text-[#6C5E70]">or</span>
            <hr className=" h-0.5 flex-1 bg-[#6C5E70]" />
          </div>
          <p className="mt-5 text-[30px] font-semibold text-[#0C071D] md:text-[38px]">
            Serialize A Transaction
          </p>
          <div className="mt-5 flex flex-row justify-between">
            <TransactionContainer />
            <TransactionContainer />
            <TransactionContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsView;
