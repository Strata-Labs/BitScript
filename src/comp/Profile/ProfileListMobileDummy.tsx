import Link from "next/link";
import React from "react";

const PROFILE_LIST = [
  {
    Action: "Reviewed OP",
    Entry: "OP_CheckLockTimeVerify",
    Date: "Oct. 10th - 3:51 pm",
    linkPath: "",
  },
  {
    Action: "Reviewed Script",
    Entry: "P2PKH (pay-to-public-key-hash)",
    Date: "Oct. 10th - 3:51 pm",
    linkPath: "",
  },
  {
    Action: "Deserialized",
    Entry: "c9d4d95c4706fbd49bdc681d0c246cb6097830d",
    Date: "Oct. 10th - 3:51 pm",
    linkPath: "",
  },
  {
    Action: "Deserialized",
    Entry: "01000000000104c9d4d95c4706fbd49bdc681d",
    Date: "Oct. 10th - 3:51 pm",
    linkPath: "",
  },
  {
    Action: "Reviewed OP",
    Entry: "OP_Add",
    Date: "Oct. 10th - 3:51 pm",
    linkPath: "",
  },
  {
    Action: "Hashed256",
    Entry: "“Testing our new hash256 tool”",
    Date: "Oct. 10th - 3:51 pm",
    linkPath: "",
  },
  {
    Action: "Reviewed Script",
    Entry: "P2TR (pay-to-taproot)",
    Date: "Oct. 10th - 3:51 pm",
    linkPath: "",
  },
  {
    Action: "Reviewed OP",
    Entry: "OP_CheckSig",
    Date: "Oct. 10th - 3:51 pm",
    linkPath: "",
  },
  {
    Action: "Reviewed OP",
    Entry: "OP_CheckLockTimeVerify",
    Date: "Oct. 10th - 3:51 pm",
    linkPath: "",
  },
  {
    Action: "Reviewed OP",
    Entry: "OP_CheckLockTimeVerify",
    Date: "Oct. 10th - 3:51 pm",
    linkPath: "",
  },
];

const ProfileListMobileDummy = () => {
  return (
    <div>
      <div className="flex md:hidden">
        <div className="mb-10 mt-8 overflow-hidden rounded-lg bg-white">
          <div className="px-4 py-2">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "50%" }} />
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "5%" }} />
                </colgroup>
                <thead>
                  <tr className="bg-[#FAFAFA]">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-light text-[#687588] sm:pl-3"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      Entry
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {PROFILE_LIST.map((script, row) => (
                    <tr
                      key={row}
                      className={` border-b border-[#E9EAEC] ${
                        row % 2 === 0 ? "hover-row-white" : "hover-row-grayish"
                      }`}
                    >
                      <td className=" truncate text-sm text-[#0C071D]">
                        <Link
                          href={script.linkPath}
                          className="block h-full w-full items-center truncate py-4 pl-4 pr-3"
                          target="_blank"
                        >
                          {script.Action}
                        </Link>
                      </td>
                      <td className="truncate text-sm font-light text-[#0C071D]">
                        <Link
                          href={script.linkPath}
                          className="block w-full truncate px-3 py-4"
                        >
                          {script.Entry}
                        </Link>
                      </td>

                      <td className=" truncate text-sm font-light text-[#0C071D]">
                        <Link
                          href={script.linkPath}
                          target="_blank"
                          className="block h-full w-full items-center truncate px-3 py-4"
                        >
                          {script.Date}
                        </Link>
                      </td>
                      <td className=" text-sm text-[#0C071D]">
                        <Link
                          href={script.linkPath}
                          className=" block h-full w-full items-center px-3 py-4"
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
    </div>
  );
};

export default ProfileListMobileDummy;
