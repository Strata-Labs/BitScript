import { useState } from "react";
import ViewButtons from "../ViewButtons";
import RprcGridView from "./RpcGridView";

//import { RPCFunctionParams, RPC_METHODS } from "./rpcMainView";
import Link from "next/link";
import { RPCFunctionParams, RPC_METHODS } from "@/const/RPC";

enum ViewType {
  LIST = "LIST",
  GRID = "GRID",
}

const RpcListView = () => {
  return (
    <div>
      {/* Md screens and larger list */}
      <div className="ml-[240px] hidden px-4 sm:px-6 md:flex lg:px-8">
        <div className="mb-10 mt-8 w-screen min-w-[1140px] overflow-hidden rounded-lg bg-white">
          <div className="px-4 py-2">
            <div className="overflow-hidden overflow-x-auto">
              <table className="w-full table-auto">
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "50%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                </colgroup>
                {/* Titles */}
                <thead>
                  <tr className="bg-[#FAFAFA]">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-light text-[#687588] sm:pl-3"
                    >
                      RPC
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      Input(s)
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      Category
                    </th>
                    {/* <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      Callable
                    </th> */}
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {RPC_METHODS.map((rpc: RPCFunctionParams, i) => {
                    return (
                      <tr
                        key={i}
                        className={` border-b border-[#E9EAEC] ${
                          i % 2 === 0 ? "hover-row-white" : "hover-row-grayish"
                        }`}
                      >
                        <td className=" text-md font-bold text-[#0C071D] sm:pl-3">
                          <Link
                            href={rpc.linkPath}
                            className="block h-full w-full items-center py-4 pl-4 pr-3"
                            target="_blank"
                          >
                            {rpc.method}
                          </Link>
                        </td>
                        <td
                          className="flex items-center overflow-hidden  text-sm font-light text-[#0C071D]"
                          style={{
                            maxHeight: "3.5em",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          <Link
                            href={rpc.linkPath}
                            className="block h-full w-full items-center py-4 pl-4 pr-3"
                            target="_blank"
                          >
                            {rpc.summary}
                          </Link>
                        </td>
                        <td className=" text-sm text-[#0C071D] sm:pl-3">
                          <Link
                            href={rpc.linkPath}
                            className="block h-full w-full items-center py-4 pl-4 pr-3"
                            target="_blank"
                          >
                            {rpc.inputs.length}
                          </Link>
                        </td>
                        <td className=" text-sm text-[#0C071D] sm:pl-3">
                          <Link
                            href={rpc.linkPath}
                            className="block h-full w-full items-center py-4 pl-4 pr-3"
                            target="_blank"
                          >
                            {rpc.category || "N/A"}
                          </Link>
                        </td>
                        {/*
                        <td className=" text-sm text-[#0C071D] sm:pl-3">
                          <Link
                            href={rpc.linkPath}
                            className="block h-full w-full items-center py-4 pl-4 pr-3"
                            target="_blank"
                          >
                            {
                            rpc.callable ? (
                              <>
                                <div className="">
                                  <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 20 20"
                                    fill="black"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="rpcIconView"
                                  >
                                    <path
                                      d="M7.08333 4.95025C7.97281 4.44629 8.97768 4.1814 10 4.1814C11.0223 4.1814 12.0272 4.44629 12.9167 4.95025C13.0118 5.00535 13.1169 5.04109 13.2258 5.05541C13.3348 5.06973 13.4456 5.06235 13.5517 5.03369C13.6578 5.00503 13.7572 4.95566 13.8441 4.88842C13.9311 4.82119 14.0039 4.73741 14.0583 4.64192C14.167 4.45057 14.1955 4.22402 14.1378 4.0117C14.08 3.79938 13.9406 3.61852 13.75 3.50859C12.6061 2.86154 11.3142 2.52148 10 2.52148C8.68577 2.52148 7.39391 2.86154 6.25 3.50859C6.05939 3.61852 5.92 3.79938 5.86223 4.0117C5.80447 4.22402 5.83302 4.45057 5.94167 4.64192C5.99611 4.73741 6.0689 4.82119 6.15586 4.88842C6.24282 4.95566 6.34221 5.00503 6.44833 5.03369C6.55445 5.06235 6.66519 5.06973 6.77417 5.05541C6.88315 5.04109 6.98822 5.00535 7.08333 4.95025ZM15.35 9.34192C15.2634 9.13818 15.1632 8.94051 15.05 8.75025C14.9928 8.65641 14.9176 8.5748 14.8287 8.51014C14.7399 8.44547 14.6391 8.39902 14.5322 8.37346C14.4253 8.3479 14.3144 8.34374 14.2059 8.36121C14.0974 8.37868 13.9935 8.41744 13.9 8.47525C13.7128 8.59072 13.5788 8.77555 13.5272 8.98942C13.4757 9.20329 13.5109 9.42886 13.625 9.61692C13.7538 9.83901 13.8599 10.0735 13.9417 10.3169C13.9893 10.4601 14.0749 10.5877 14.1894 10.686C14.3039 10.7844 14.4429 10.8498 14.5917 10.8753C15.1715 10.9753 15.6976 11.2767 16.0771 11.7263C16.4567 12.176 16.6654 12.7451 16.6667 13.3336C16.6667 13.9966 16.4033 14.6325 15.9344 15.1014C15.4656 15.5702 14.8297 15.8336 14.1667 15.8336H4.71667C4.37668 15.7813 4.06121 15.625 3.81354 15.3863C3.56587 15.1476 3.39813 14.8381 3.33333 14.5003C3.28328 14.2553 3.28898 14.0022 3.35 13.7598C3.41103 13.5173 3.52583 13.2917 3.68589 13.0996C3.84595 12.9075 4.04717 12.7539 4.27465 12.6502C4.50213 12.5464 4.75003 12.4952 5 12.5003C5.22101 12.5003 5.43298 12.4125 5.58926 12.2562C5.74554 12.0999 5.83333 11.8879 5.83333 11.6669C5.83166 10.9379 6.02439 10.2216 6.39167 9.59192C6.44677 9.49681 6.4825 9.39174 6.49682 9.28275C6.51114 9.17377 6.50376 9.06303 6.4751 8.95692C6.44644 8.8508 6.39707 8.7514 6.32984 8.66445C6.2626 8.57749 6.17882 8.5047 6.08333 8.45025C5.89199 8.34161 5.66544 8.31306 5.45311 8.37082C5.24079 8.42858 5.05993 8.56798 4.95 8.75859C4.55974 9.42296 4.31014 10.1604 4.21667 10.9253C3.52137 11.0946 2.89902 11.4832 2.44167 12.0336C2.05267 12.4904 1.79418 13.0437 1.69347 13.6352C1.59276 14.2267 1.65356 14.8344 1.86946 15.3942C2.08536 15.954 2.44835 16.4451 2.92014 16.8158C3.39192 17.1865 3.95501 17.4229 4.55 17.5003H4.65833H14.1667C15.1661 17.4975 16.1313 17.1356 16.8862 16.4805C17.641 15.8254 18.1352 14.9208 18.2787 13.9317C18.4222 12.9426 18.2053 11.9349 17.6677 11.0923C17.1301 10.2498 16.3075 9.62852 15.35 9.34192ZM12.3917 7.50025C12.3917 7.50025 12.3917 7.50025 12.3917 7.45025C12.4349 7.39963 12.4713 7.34361 12.5 7.28359C12.5789 7.078 12.5733 6.84953 12.4843 6.64809C12.3953 6.44666 12.2302 6.28865 12.025 6.20859C11.5589 6.03554 11.0708 5.92894 10.575 5.89192C10.4917 5.89192 10.4083 5.89192 10.325 5.89192C10.1003 5.87524 9.87469 5.87524 9.65 5.89192C9.56395 5.88747 9.47772 5.88747 9.39167 5.89192C8.89587 5.92894 8.40776 6.03554 7.94167 6.20859C7.74255 6.29497 7.585 6.45563 7.50251 6.65639C7.42003 6.85715 7.41913 7.08217 7.5 7.28359C7.52839 7.33933 7.56187 7.39233 7.6 7.44192C7.59724 7.47241 7.59724 7.50309 7.6 7.53359C7.65514 7.62838 7.72844 7.71136 7.81571 7.77777C7.90298 7.84418 8.0025 7.89271 8.10856 7.92058C8.21462 7.94845 8.32514 7.95511 8.43378 7.94018C8.54243 7.92526 8.64705 7.88903 8.74167 7.83359C9.12382 7.62049 9.55411 7.50863 9.99167 7.50863C10.4292 7.50863 10.8595 7.62049 11.2417 7.83359C11.3386 7.88902 11.4458 7.9244 11.5567 7.93762C11.6676 7.95084 11.78 7.94163 11.8873 7.91054C11.9946 7.87944 12.0945 7.8271 12.1811 7.75662C12.2678 7.68613 12.3394 7.59895 12.3917 7.50025ZM9.16667 10.0003C9.16667 10.1651 9.21554 10.3262 9.30711 10.4632C9.39868 10.6003 9.52883 10.7071 9.6811 10.7702C9.83337 10.8332 10.0009 10.8497 10.1626 10.8176C10.3242 10.7854 10.4727 10.7061 10.5893 10.5895C10.7058 10.473 10.7852 10.3245 10.8173 10.1628C10.8495 10.0012 10.833 9.83362 10.7699 9.68135C10.7068 9.52908 10.6 9.39893 10.463 9.30736C10.3259 9.21579 10.1648 9.16692 10 9.16692C9.77899 9.16692 9.56703 9.25472 9.41075 9.411C9.25447 9.56728 9.16667 9.77924 9.16667 10.0003Z"
                                      fill="black"
                                      stroke-width="0.5"
                                    />
                                  </svg>
                                </div>
                              </>
                            ) : (
                              "No"
                            )}
                          </Link>
                        </td>
                            */}
                        <td className=" text-sm text-[#0C071D]">
                          <Link
                            href={rpc.linkPath}
                            className="block h-full w-full items-center px-3 py-4"
                            target="_blank"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.99978 19.7498C8.80778 19.7498 8.61575 19.6768 8.46975 19.5298C8.17675 19.2368 8.17675 18.7618 8.46975 18.4688L14.9397 11.9988L8.46975 5.52883C8.17675 5.23583 8.17675 4.7608 8.46975 4.4678C8.76275 4.1748 9.23779 4.1748 9.53079 4.4678L16.5308 11.4678C16.8238 11.7608 16.8238 12.2358 16.5308 12.5288L9.53079 19.5288C9.38379 19.6768 9.19178 19.7498 8.99978 19.7498Z"
                                fill="#F79327"
                              />
                            </svg>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RpcListView;
