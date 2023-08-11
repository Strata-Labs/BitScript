import { useAtom } from "jotai";
import React from "react";
import Link from "next/link";
import { OP_CODES } from "@/utils/OPS";
import { OP_CODE } from "../OpCodesAnimations";
import { searchQuery } from "../atom";

const SearchView = () => {
  const [theSearchQuery] = useAtom(searchQuery);
  const OpCodeList = OP_CODES;
  // Convert the search query to lowercase
  const lowercaseSearchQuery = theSearchQuery.toLowerCase();

  // Filter the OpCodeList based on the case-insensitive search query
  const filteredOpCodeList = OpCodeList.filter((script) =>
    JSON.stringify(script).toLowerCase().includes(lowercaseSearchQuery)
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
                    <p className="font-semibold transition-all duration-500 ease-in-out group-hover:text-white">
                      {script.name}
                      <span className="ml-2 font-thin transition-all duration-500 ease-in-out group-hover:text-white">
                        {script.longName}
                      </span>
                    </p>
                    <p className="mr-5 flex h-[27px] w-[72px] items-center justify-center rounded-full bg-[#F4F4F4] text-xs font-thin">
                      {script.generalType}
                    </p>
                  </div>
                  <div className="flex w-full">
                    <p className="mx-5 mt-3 text-sm font-thin transition-all duration-500 ease-in-out group-hover:text-white">
                      {script.visualProps.description}
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
                  <col style={{ width: "50%" }} />
                  <col style={{ width: "10%" }} />
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
                    >
                      Example
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOpCodeList.map((script, index) => (
                    <tr
                      key={index}
                      className={`hover-row ${
                        index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
                      }`}
                    >
                      <td className="py-4 pl-4 pr-3 text-sm text-[#0C071D] sm:pl-3">
                        <Link href={script.linkPath}>{script.name}</Link>
                      </td>
                      <td className="px-3 py-4 text-sm font-light text-[#0C071D]">
                        <Link href={script.linkPath}>{script.generalType}</Link>
                      </td>
                      <td className="px-3 py-4 text-sm font-light text-[#0C071D]">
                        <Link href={script.linkPath}>
                          {script.visualProps.description}
                        </Link>
                      </td>
                      <td className="px-3 py-4 text-sm font-light text-[#0C071D]">
                        <Link href={script.linkPath}>{script.example}</Link>
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
