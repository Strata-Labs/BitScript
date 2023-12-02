import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import React from "react";
import { UserHistory, userHistoryAtom, userSignedIn } from "../atom";
import { trpc } from "@/utils/trpc";

// const PROFILE_LIST: any[] = [
//   {
//     Action: "Reviewed OP",
//     Entry: "OP_CheckLockTimeVerify",
//     Date: "Oct. 10th - 3:51 pm",
//     linkPath: "",
//   },
// ];

const PROFILE_LIST: any[] = [];

const ProfileList = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useAtom(userSignedIn);

  const [userHistory, setUserHistory] = useAtom(userHistoryAtom);

  trpc.fetchUserHistory.useQuery(undefined, {
    refetchOnMount: true,
    enabled: isUserSignedIn,
    onSuccess: (data) => {
      if (data !== undefined) {
        const filteredData = data.filter((d) => {
          return {
            id: d.id,
            createdAt: new Date(d.createdAt),
            userId: d.userId,
            metadata: d.metadata,
          } as UserHistory;
        });
        setUserHistory(filteredData as any);
      }
    },
  });

  if (userHistory.length === 0) {
    return (
      <div>
        <div>
          <div className="hidden w-full px-4 sm:px-6 md:flex lg:px-1">
            <div className="mb-10 mt-8 w-full overflow-hidden rounded-lg bg-white">
              <div className="w-full px-4 py-2">
                <div className="w-full overflow-hidden overflow-x-auto">
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
                  </table>
                </div>

                <div className="my-[200px] flex h-full w-full flex-col items-center justify-center bg-white text-[28px]">
                  <svg
                    width="96"
                    height="96"
                    viewBox="0 0 96 96"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M68 13.2C52.4 4.4 33.2 7.2 20.4 19.2V12C20.4 9.6 18.8 8 16.4 8C14 8 12.4 9.6 12.4 12V30C12.4 32.4 14 34 16.4 34H34.4C36.8 34 38.4 32.4 38.4 30C38.4 27.6 36.8 26 34.4 26H24.8C30.8 19.6 39.2 16 48 16C65.6 16 80 30.4 80 48C80 65.6 65.6 80 48 80C30.4 80 16 65.6 16 48C16 45.6 14.4 44 12 44C9.6 44 8 45.6 8 48C8 70 26 88 48 88C62.4 88 75.6 80.4 82.8 68C93.6 48.8 87.2 24.4 68 13.2ZM48 32C45.6 32 44 33.6 44 36V48C44 50.4 45.6 52 48 52H56C58.4 52 60 50.4 60 48C60 45.6 58.4 44 56 44H52V36C52 33.6 50.4 32 48 32Z"
                      fill="#F79327"
                    />
                  </svg>

                  <p className="font-bold text-black">No history yet!</p>
                  <p className="text-center font-extralight text-black md:mx-[50px] lg:mx-[10px] xl:mx-[450px]">
                    Head over to op codes, scripts, or transactions & come back
                    later
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="hidden w-full px-4 sm:px-6 md:flex lg:px-1">
        <div className="mb-10 mt-8 w-full overflow-hidden rounded-lg bg-white">
          <div className="w-full px-4 py-2">
            <div className="w-full overflow-hidden overflow-x-auto">
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
                  {userHistory.map((script, row) => (
                    <tr
                      key={row}
                      className={` border-b border-[#E9EAEC] ${
                        row % 2 === 0 ? "hover-row-white" : "hover-row-grayish"
                      }`}
                    >
                      <td className=" truncate text-sm text-[#0C071D]">
                        <Link
                          href={script.metadata?.uri || ""}
                          className="block h-full w-full items-center truncate py-4 pl-4 pr-3"
                          target="_blank"
                        >
                          {script.metadata?.action}
                        </Link>
                      </td>
                      <td className="min-width-[10px] truncate text-sm font-light text-[#0C071D]">
                        <Link
                          href={script.metadata?.uri || ""}
                          className="block w-full truncate px-3 py-4"
                        >
                          {script.metadata?.entry}
                        </Link>
                      </td>

                      <td className=" truncate text-sm font-light text-[#0C071D]">
                        <Link
                          href={script.metadata?.uri || ""}
                          target="_blank"
                          className="block h-full w-full items-center truncate px-3 py-4"
                        >
                          {new Date(script.createdAt).toLocaleString()}
                        </Link>
                      </td>
                      <td className=" text-sm text-[#0C071D]">
                        <Link
                          href={script.metadata?.uri || ""}
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

export default ProfileList;
