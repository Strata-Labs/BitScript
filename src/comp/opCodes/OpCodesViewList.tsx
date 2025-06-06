import Link from "next/link";
import React from "react";
import OpCodesViewListSmallScreens from "./OpCodeViewListBlockSmallScreens";
import { OP_CODE_PAGE_PROPS } from "./OpCodeView";

export type OpCodesViewListProps = {
  OP_CODES: OP_CODE_PAGE_PROPS[];
};
const OpCodesViewList = ({ OP_CODES }: OpCodesViewListProps) => {
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
                      ScriptName
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
                      Output
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      Types
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    ></th>
                  </tr>
                </thead>
                {/* Information */}
                <tbody>
                  {OP_CODES.map((script, row) => (
                    <tr
                      key={row}
                      className={` border-b border-[#E9EAEC] ${
                        row % 2 === 0 ? "hover-row-white" : "hover-row-grayish"
                      }`}
                    >
                      <td className=" text-sm text-[#0C071D] sm:pl-3">
                        <Link
                          href={script.linkPath}
                          className="block h-full w-full items-center py-4 pl-4 pr-3"
                          target="_blank"
                        >
                          {script.name}
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
                          className="block h-full w-full items-center px-3 py-2"
                          target="_blank"
                        >
                          {script.shortDescription}
                        </Link>
                      </td>
                      <td className="text-sm font-light text-[#0C071D]">
                        <Link
                          href={script.linkPath}
                          className="block h-full w-full items-center px-3 py-4"
                          target="_blank"
                        >
                          {script.inputNum}
                        </Link>
                      </td>

                      <td className="text-sm font-light text-[#0C071D]">
                        <Link
                          href={script.linkPath}
                          className="block h-full w-full items-center px-3 py-4"
                          target="_blank"
                        >
                          {script.returnNum}
                        </Link>
                      </td>
                      <td className="text-sm font-light text-[#0C071D]">
                        <Link
                          href={script.linkPath}
                          className="block h-full w-full items-center px-3 py-4"
                          target="_blank"
                        >
                          {script.category}
                        </Link>
                      </td>
                      <td className=" text-sm font-light text-[#0C071D]">
                        <Link
                          href={script.linkPath}
                          className="block h-full w-full items-center px-3 py-4"
                          target="_blank"
                        >
                          {script.type}
                        </Link>
                      </td>
                      <td className=" text-sm text-[#0C071D]">
                        <Link
                          href={script.linkPath}
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-10 mb-5 flex flex-col items-center justify-center md:hidden">
        {OP_CODES.map((d, i) => {
          return (
            <div>
              <OpCodesViewListSmallScreens
                OP_Code={d.name}
                description={d.visualProps.description}
                input={d.input}
                output={d.output}
                category={d.category}
                type={d.type}
                linkPath={d.linkPath}
                image={d.opImage}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OpCodesViewList;
