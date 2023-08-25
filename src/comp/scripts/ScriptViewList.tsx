import Link from "next/link";
import React from "react";
import ScriptBlockList from "./ScriptsBlockList";
import { SCRIPTS_PAGE_PROPS } from "./ScriptView";

export type ScriptsViewListProps = {
  SCRIPTS_LIST: SCRIPTS_PAGE_PROPS[];
};

// const ScriptViewList = () => {
const ScriptsViewList = ({ SCRIPTS_LIST }: ScriptsViewListProps) => {
  return (
    <div>
      <div className="ml-[240px] hidden px-4 sm:px-6 md:flex lg:px-8">
        <div className="mb-10 mt-8 w-screen min-w-[1140px] overflow-hidden rounded-lg bg-white">
          <div className="px-4 py-2">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "50%" }} />
                  <col style={{ width: "10%" }} />
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
                      ScriptName
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      Summary
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      Introduced
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      InUse?
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      #ofOPs
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {SCRIPTS_LIST.map((script, row) => (
                    <tr
                      key={row}
                      className={` border-b border-[#E9EAEC] ${
                        row % 2 === 0 ? "hover-row-white" : "hover-row-grayish"
                      }`}
                    >
                      <td className="py-4 pl-4 pr-3 text-sm text-[#0C071D] sm:pl-3">
                        <Link href={script.linkPath}>
                          {script.scriptDescription}
                        </Link>
                      </td>
                      <td className="px-3 py-4 text-sm font-light text-[#0C071D]">
                        <Link href={script.linkPath}>
                          {script.shortSummary}
                        </Link>
                      </td>

                      <td className="px-3 py-4 text-sm font-light text-[#0C071D]">
                        <Link href={script.linkPath}>
                          {script.introduction}
                        </Link>
                      </td>
                      <td className="px-3 py-4 text-sm font-light text-[#0C071D]">
                        <Link href={script.linkPath}>
                          {script.inUse ? "Yes" : "No"}
                        </Link>
                      </td>
                      <td className="px-3 py-4 text-sm font-light text-[#0C071D]">
                        <Link href={script.linkPath}>{script.numberOfOps}</Link>
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
      <div className="mb-5 mt-5 flex flex-col items-center justify-center md:hidden">
        {SCRIPTS_LIST.map((d, i) => {
          return (
            <div>
              <ScriptBlockList
                scriptNameTitle={d.name}
                scriptCompleteName={d.completeName}
                scriptShortName={d.scriptDescription}
                summary={d.shortSummary}
                introduced={d.introduction}
                inUse={d.inUse}
                numberOfOPs={d.numberOfOps}
                linkPath={d.linkPath}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScriptsViewList;
