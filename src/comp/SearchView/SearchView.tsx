import { useAtom } from "jotai";
import React from "react";
import { searchResults, Searches } from "../atom";
import Link from "next/link";

const SearchView = () => {
  const [theSearchResults, setTheSearchResults] = useAtom(searchResults);
  return (
    <div className="ml-[240px]">
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
                {theSearchResults.map((searchItem: Searches, index: number) => (
                  <tr
                    key={index}
                    className={`hover-row ${
                      index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
                    }`}
                  >
                    <td className="py-4 pl-4 pr-3 text-sm text-[#0C071D] sm:pl-3">
                      {searchItem.name}
                    </td>
                    <td className="px-3 py-4 text-sm font-light text-[#0C071D]">
                      {searchItem.type}
                    </td>
                    <td className="px-3 py-4 text-sm font-light text-[#0C071D]">
                      {searchItem.description}
                    </td>
                    <td className="px-3 py-4 text-sm font-light text-[#0C071D]">
                      {searchItem.example}
                    </td>
                    <td className="px-3 py-4 text-sm text-[#0C071D]">
                      <Link
                        href={searchItem.link}
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
  );
};

export default SearchView;
