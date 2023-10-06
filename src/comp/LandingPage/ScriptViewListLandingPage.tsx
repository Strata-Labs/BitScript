import Link from "next/link";
import React from "react";
import { SCRIPTS_PAGE_PROPS } from "../scripts/ScriptView";

export type ScriptsViewListProps = {
  SCRIPTS_LIST: SCRIPTS_PAGE_PROPS[];
};

const ScriptsViewListLandingView = ({ SCRIPTS_LIST }: ScriptsViewListProps) => {
  return (
    <div className="-mt-5">
      <div className="w-screen px-2">
        <div className="w-full px-4 py-2">
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto">
              <colgroup>
                <col style={{ width: "30%" }} />
                <col style={{ width: "70%" }} />
                <col style={{ width: "10%" }} />
              </colgroup>
              <tbody>
                {SCRIPTS_LIST.map((script, row) => (
                  <tr
                    key={row}
                    className={` border-b border-[#E9EAEC] ${
                      row % 2 === 0 ? "hover-row-white" : "hover-row"
                    }`}
                  >
                    <td className=" text-sm text-[#0C071D]">
                      <Link
                        href={script.linkPath}
                        target="_blank"
                        className="block h-full w-full py-4 pl-3"
                      >
                        <p>{script.shortHand}</p>
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
                        href={script.linkPath}
                        target="_blank"
                        className="block h-full w-full px-2 py-2"
                      >
                        <p>{script.shortDescription}</p>
                      </Link>
                    </td>
                    <td className=" text-sm text-[#0C071D]">
                      <Link
                        href={script.linkPath}
                        className="block h-full w-full items-center px-2 py-4"
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptsViewListLandingView;
