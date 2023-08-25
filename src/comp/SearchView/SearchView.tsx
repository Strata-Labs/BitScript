import { useAtom } from "jotai";
import React from "react";
import Link from "next/link";
import { OP_CODES } from "@/utils/OPS";
import { OP_CODE } from "../../OPS_ANIMATION_LIB";
import { searchQuery } from "../atom";
import { SCRIPTS_LIST } from "@/utils/SCRIPTS";

const SearchView = () => {
  const [theSearchQuery] = useAtom(searchQuery);
  const OpCodeList = OP_CODES;
  const ScriptList = SCRIPTS_LIST;
  // Convert the search query to lowercase
  const lowercaseSearchQuery = theSearchQuery.toLowerCase();

  // Filter the OpCodeList based on the case-insensitive search query
  const filteredOpCodeList = OpCodeList.filter((script) =>
    JSON.stringify(script).toLowerCase().includes(lowercaseSearchQuery)
  );

  const filteredScriptList = ScriptList.filter((script_s) =>
    JSON.stringify(script_s).toLowerCase().includes(lowercaseSearchQuery)
  );

  let rowNumber = 0;

  return (
    <div className="h-screen w-screen bg-[#F8F8F8]">
      {/* Mobile View */}
      <div className="flex h-screen w-screen flex-col md:hidden">
        <div className="h-screen w-full">
          <div className="mx-2 mt-10">
            <div className="rounded-x h-[775px] w-full p-5">
              {filteredOpCodeList.map((script, index) => (
                <Link
                  key={index}
                  className="group mb-4 flex h-[125px] w-full flex-col rounded-2xl bg-white from-[#100F20] to-[#321B3A]  transition-all duration-500 ease-in-out hover:-translate-y-1 hover:bg-gradient-to-b"
                  href={script.linkPath}
                >
                  <div className="ml-5 mt-5 flex items-center justify-between">
                    <p className="font-semibold text-black transition-all duration-500 ease-in-out group-hover:text-white">
                      {script.name}
                      <span className="ml-2 font-thin text-black transition-all duration-500 ease-in-out group-hover:text-white">
                        {script.longName}
                      </span>
                    </p>
                    <p className="mr-5 flex h-[27px] w-[72px] items-center justify-center rounded-full bg-[#F4F4F4] text-xs font-thin text-black">
                      {script.generalType}
                    </p>
                  </div>
                  <div className="flex w-full">
                    <p className="mx-5 mt-3 text-sm font-thin text-black transition-all duration-500  ease-in-out group-hover:text-white">
                      {script.visualProps.description}
                    </p>
                  </div>
                </Link>
              ))}
              {filteredScriptList.map((script_s, index) => (
                <Link
                  key={index}
                  className="group mb-4 flex h-[125px] w-full flex-col rounded-2xl bg-white from-[#100F20] to-[#321B3A]  transition-all duration-500 ease-in-out hover:-translate-y-1 hover:bg-gradient-to-b"
                  href={script_s.linkPath}
                >
                  <div className="ml-5 mt-5 flex items-center justify-between">
                    <p className="font-semibold text-black transition-all duration-500 ease-in-out group-hover:text-white">
                      {script_s.scriptDescription}
                      <span className="ml-2 font-thin text-black transition-all duration-500 ease-in-out group-hover:text-white">
                        {script_s.completeName}
                      </span>
                    </p>
                    <p className="mr-5 flex h-[27px] w-[72px] items-center justify-center rounded-full bg-[#F4F4F4] text-xs font-thin text-black">
                      {script_s.generalType}
                    </p>
                  </div>
                  <div className="flex w-full">
                    <p className="mx-5 mt-3 text-sm font-thin text-black transition-all duration-500  ease-in-out group-hover:text-white">
                      {script_s.shortSummary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Desktop View */}
      <div className="ml-[240px] hidden md:block">
        <div className="h-screen w-full">
          <div className="mx-10 mt-10">
            <div className="h-[775px] w-full rounded-xl bg-white p-5">
              <table className="w-full table-auto">
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "60%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                </colgroup>
                <thead>
                  <tr className="bg-[#FAFAFA]">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-light text-[#687588] sm:pl-3"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      Type
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
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOpCodeList.map((script, row) => (
                    <tr
                      key={row}
                      className={` border-b border-[#E9EAEC] ${
                        row % 2 === 0 ? "hover-row-white" : "hover-row-grayish"
                      }`}
                    >
                      <td className="py-4 pl-4 pr-3 text-sm text-[#0C071D] sm:pl-3">
                        <Link href={script.linkPath}>{script.name}</Link>
                      </td>
                      <td className="px-3 py-4 text-sm font-light text-[#0C071D]">
                        <Link href={script.linkPath}>{script.generalType}</Link>
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
                        <Link href={script.linkPath}>
                          {script.visualProps.description}
                        </Link>
                      </td>
                      <td className="px-3 py-4 text-sm text-[#0C071D]">
                        <Link
                          href={script.linkPath}
                          className="flex items-center"
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
                  {filteredScriptList.map((script_s, row) => (
                    <tr
                      key={row}
                      className={` border-b border-[#E9EAEC] ${
                        row % 2 === 0 ? "hover-row-white" : "hover-row-grayish"
                      }`}
                    >
                      <td
                        className="flex items-center overflow-hidden px-3 py-2 text-sm font-light text-[#0C071D]"
                        style={{
                          maxHeight: "3.5em",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        <Link href={script_s.linkPath}>
                          {script_s.scriptDescription}{" "}
                          <span className="font-extralight">
                            {"-"} {script_s.completeName}
                          </span>
                        </Link>
                      </td>
                      <td className="px-3 py-4 text-sm font-light text-[#0C071D]">
                        <Link href={script_s.linkPath}>
                          {script_s.generalType}
                        </Link>
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
                        <Link href={script_s.linkPath}>
                          {script_s.shortSummary}
                        </Link>
                      </td>
                      <td className="px-3 py-4 text-sm text-[#0C071D]">
                        <Link
                          href={script_s.linkPath}
                          className="flex items-center"
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
    </div>
  );
};

export default SearchView;
