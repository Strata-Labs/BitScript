import Link from "next/link";
import React from "react";
import { OP_CODE_PAGE_PROPS } from "../opCodes/OP_Dup";

export type OpCodesViewListProps = {
  OP_CODES: OP_CODE_PAGE_PROPS[];
};

const OpCodesViewListLandingView = ({ OP_CODES }: OpCodesViewListProps) => {
  return (
    <div className="">
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
                {OP_CODES.map((opCode, row) => (
                  <tr
                    key={row}
                    className={` border-b border-[#E9EAEC] ${
                      row % 2 === 0 ? "hover-row-white" : "hover-row"
                    }`}
                  >
                    <td className="py-4 pl-4 pr-3 text-sm text-[#0C071D]">
                      <Link href={opCode.linkPath}>{opCode.name}</Link>
                    </td>
                    <td
                      className="flex items-center overflow-hidden px-3 py-2 text-sm font-light text-[#0C071D]"
                      style={{
                        maxHeight: "3.5em",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      <Link href={opCode.linkPath}>{opCode.info}</Link>
                    </td>
                    <td className="px-3 py-4 text-sm text-[#0C071D]">
                      <Link
                        href={opCode.linkPath}
                        className="-ml-[15px] flex items-center"
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

export default OpCodesViewListLandingView;
