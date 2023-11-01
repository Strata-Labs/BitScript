import { useAtom } from "jotai";
import { popUpExampleOpen } from "../atom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { TransactionInputType } from "./TransactionsView";

type ModularButtonProps = {
  txInputType: TransactionInputType;
};
const ModularButton = ({ txInputType }: ModularButtonProps) => {
  const [isExamplePopUpOpen, setIsExamplePopUpOpen] = useAtom(popUpExampleOpen);

  let buttonContent = null;

  const renderButtonType = () => {
    let buttonContent = null;

    switch (txInputType) {
      case TransactionInputType.fetchingTransaction:
        buttonContent = (
          <>
            <div className="mt-2 flex h-[26.5px] w-[160px] flex-row items-center justify-start rounded-full bg-[#F0F0F0] p-4 md:mt-0 md:h-[53px] md:w-[218px]">
              <div className="loading-spinner">
                <FontAwesomeIcon icon={faSpinner} spin />
              </div>
              <p className="E92544 ml-5 text-[20px] text-sm font-extralight">
                verifying transaction
              </p>
            </div>
          </>
        );
        break;
      case TransactionInputType.parsingError:
        buttonContent = (
          <>
            <div className="mt-2 flex w-40  flex-row items-center justify-start rounded-lg p-2 ring-1 ring-[#e92544] md:mt-0 md:h-[53px] md:w-[218px] md:p-4">
              <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-red-200">
                <svg
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.500488"
                    y="1.4444"
                    width="2.04265"
                    height="16.3412"
                    rx="1.02133"
                    transform="rotate(-45 0.500488 1.4444)"
                    fill="#E92544"
                  />
                  <rect
                    x="12.0547"
                    y="0.00012207"
                    width="2.04265"
                    height="16.3412"
                    rx="1.02133"
                    transform="rotate(45 12.0547 0.00012207)"
                    fill="#E92544"
                  />
                </svg>
              </div>
              <p className="ml-3 text-sm font-semibold text-[#E92544]">
                parsing error!
              </p>
            </div>
          </>
        );
        break;
      case TransactionInputType.verified:
        buttonContent = (
          <>
            <div className="mt-2 flex h-[26.5px] w-[160px] flex-row items-center justify-start rounded-full bg-[#F0F0F0] p-4 md:mt-0 md:h-[53px] md:w-[160px]">
              <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-green-200">
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.7 1.20002C13.3 0.800024 12.7 0.800024 12.3 1.20002L4.8 8.70002L1.7 5.60003C1.3 5.20003 0.7 5.20003 0.3 5.60003C-0.1 6.00003 -0.1 6.60002 0.3 7.00002L4.1 10.8C4.3 11 4.5 11.1 4.8 11.1C5.1 11.1 5.3 11 5.5 10.8L13.7 2.60002C14.1 2.20002 14.1 1.60002 13.7 1.20002Z"
                    fill="#51D321"
                  />
                </svg>
              </div>
              <p className="ml-5 text-[20px] font-semibold text-[#51D321]">
                verified
              </p>
            </div>
          </>
        );
        break;
      case TransactionInputType.transactionNotFound:
        buttonContent = (
          <>
            <div className="mt-2 flex h-[26.5px] w-[160px] flex-row items-center justify-start rounded-full bg-[#F0F0F0] p-4 md:mt-0 md:h-[53px] md:w-[190px]">
              <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-red-200">
                <svg
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.500488"
                    y="1.4444"
                    width="2.04265"
                    height="16.3412"
                    rx="1.02133"
                    transform="rotate(-45 0.500488 1.4444)"
                    fill="#E92544"
                  />
                  <rect
                    x="12.0547"
                    y="0.00012207"
                    width="2.04265"
                    height="16.3412"
                    rx="1.02133"
                    transform="rotate(45 12.0547 0.00012207)"
                    fill="#E92544"
                  />
                </svg>
              </div>
              <p className="ml-5 text-[20px] font-semibold text-[#E92544]">
                not found!
              </p>
            </div>
          </>
        );
        break;
      case TransactionInputType.fetchingTransaction:
        buttonContent = (
          <>
            <>
              <div className="mt-2 flex h-[26.5px] w-[160px] flex-row items-center justify-start rounded-full bg-[#F0F0F0] p-4 md:mt-0 md:h-[53px] md:w-[228px]">
                <div className="loading-spinner">
                  <FontAwesomeIcon icon={faSpinner} spin />
                </div>
                <p className="E92544 ml-5 text-[20px] text-sm font-extralight">
                  fetching transaction...
                </p>
              </div>
            </>
          </>
        );
        break;
      case TransactionInputType.found:
        buttonContent = (
          <>
            <div className="mt-2 flex h-[26.5px] w-[160px] flex-row items-center justify-start rounded-full bg-[#F0F0F0] p-4 md:mt-0 md:h-[53px] md:w-[150px]">
              <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-green-200">
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.7 1.20002C13.3 0.800024 12.7 0.800024 12.3 1.20002L4.8 8.70002L1.7 5.60003C1.3 5.20003 0.7 5.20003 0.3 5.60003C-0.1 6.00003 -0.1 6.60002 0.3 7.00002L4.1 10.8C4.3 11 4.5 11.1 4.8 11.1C5.1 11.1 5.3 11 5.5 10.8L13.7 2.60002C14.1 2.20002 14.1 1.60002 13.7 1.20002Z"
                    fill="#51D321"
                  />
                </svg>
              </div>
              <p className="ml-5 text-[20px] font-semibold text-[#51D321]">
                found!
              </p>
            </div>
          </>
        );
        break;
      case TransactionInputType.loadExample:
        buttonContent = (
          <>
            <button
              onClick={() => setIsExamplePopUpOpen(true)}
              className="mt-2 flex h-[26.5px] w-[160px] flex-row items-center justify-start rounded-full bg-[#0C071D] p-4 md:mt-0 md:h-[53px] md:w-[218px]"
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 16.5C6.80222 16.5 6.60888 16.5586 6.44443 16.6685C6.27998 16.7784 6.15181 16.9346 6.07612 17.1173C6.00043 17.3 5.98063 17.5011 6.01921 17.6951C6.0578 17.8891 6.15304 18.0673 6.29289 18.2071C6.43275 18.347 6.61093 18.4422 6.80491 18.4808C6.99889 18.5194 7.19996 18.4996 7.38268 18.4239C7.56541 18.3482 7.72159 18.22 7.83147 18.0556C7.94135 17.8911 8 17.6978 8 17.5C8 17.2348 7.89464 16.9804 7.70711 16.7929C7.51957 16.6054 7.26522 16.5 7 16.5ZM19.06 12.5L20.29 11.27C20.8518 10.7075 21.1674 9.945 21.1674 9.15C21.1674 8.355 20.8518 7.5925 20.29 7.03L17.46 4.21C16.8975 3.6482 16.135 3.33264 15.34 3.33264C14.545 3.33264 13.7825 3.6482 13.22 4.21L12 5.44C11.9843 4.65479 11.6613 3.90706 11.1004 3.35736C10.5395 2.80766 9.78536 2.49984 9 2.5H5C4.20435 2.5 3.44129 2.81607 2.87868 3.37868C2.31607 3.94129 2 4.70435 2 5.5V19.5C2 20.2956 2.31607 21.0587 2.87868 21.6213C3.44129 22.1839 4.20435 22.5 5 22.5H19C19.7956 22.5 20.5587 22.1839 21.1213 21.6213C21.6839 21.0587 22 20.2956 22 19.5V15.5C22.0002 14.7146 21.6923 13.9605 21.1426 13.3996C20.5929 12.8387 19.8452 12.5157 19.06 12.5ZM10 19.5C10 19.7652 9.89464 20.0196 9.70711 20.2071C9.51957 20.3946 9.26522 20.5 9 20.5H5C4.73478 20.5 4.48043 20.3946 4.29289 20.2071C4.10536 20.0196 4 19.7652 4 19.5V5.5C4 5.23478 4.10536 4.98043 4.29289 4.79289C4.48043 4.60536 4.73478 4.5 5 4.5H9C9.26522 4.5 9.51957 4.60536 9.70711 4.79289C9.89464 4.98043 10 5.23478 10 5.5V19.5ZM12 8.26L14.64 5.62C14.8274 5.43375 15.0808 5.32921 15.345 5.32921C15.6092 5.32921 15.8626 5.43375 16.05 5.62L18.88 8.5C19.0662 8.68736 19.1708 8.94081 19.1708 9.205C19.1708 9.46919 19.0662 9.72264 18.88 9.91L16 12.79L12 16.74V8.26ZM20 19.5C20 19.7652 19.8946 20.0196 19.7071 20.2071C19.5196 20.3946 19.2652 20.5 19 20.5H11.82C11.9226 20.2036 11.9799 19.8935 11.99 19.58L17.07 14.5H19C19.2652 14.5 19.5196 14.6054 19.7071 14.7929C19.8946 14.9804 20 15.2348 20 15.5V19.5Z" />
              </svg>
              <p className="gradient-text ml-3  text-xs font-bold md:ml-7 md:text-lg">
                Examples
              </p>
            </button>
          </>
        );
    }
    return buttonContent;
  };
  return <div>{renderButtonType()}</div>;
};

export default ModularButton;
