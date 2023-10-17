import { useAtom } from "jotai";
import Link from "next/link";
import { hashingAlgorithm } from "../atom";
import { Hashing_List } from "@/utils/HASHES";

const HashingAlgorithm = () => {
  const [algorithm, setAlgorithm] = useAtom(hashingAlgorithm);
  const selectedAlgorithmInfo = Hashing_List.find(
    (script) => script.Name === algorithm
  );
  return (
    <div className="text-black md:ml-[260px] md:mr-5 md:mt-10">
      {/* Left pointing icon link */}
      <div className="flex flex-col ">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <Link className="cursor-pointer" href={"/hashCalculator"}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                rotate="180deg"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 mt-[17px] md:ml-0 md:mt-[7px]"
              >
                <g transform="rotate(180 12 12)">
                  <path
                    d="M8.99978 19.7498C8.80778 19.7498 8.61575 19.6768 8.46975 19.5298C8.17675 19.2368 8.17675 18.7618 8.46975 18.4688L14.9397 11.9988L8.46975 5.52883C8.17675 5.23583 8.17675 4.7608 8.46975 4.4678C8.76275 4.1748 9.23779 4.1748 9.53079 4.4678L16.5308 11.4678C16.8238 11.7608 16.8238 12.2358 16.5308 12.5288L9.53079 19.5288C9.38379 19.6768 9.19178 19.7498 8.99978 19.7498Z"
                    fill="#F79327"
                  />
                </g>
              </svg>
            </Link>
            <p className="ml-5 text-[28px]">Hash Algorithms</p>
          </div>
          <div className="text-[20px] font-extralight">
            updating algorithm...
          </div>
        </div>
        <div className="mt-10 font-extralight">
          Below are the hash algorithms used in Bitcoin development &
          cryptography. The card below is active, update by selecting a row
          below.
        </div>
        <div className="mt-5 flex flex-col rounded-2xl bg-black p-4">
          <div className="flex flex-row justify-between">
            <p className="font-semibold text-[#F79327]">
              {selectedAlgorithmInfo ? selectedAlgorithmInfo.Name : ""}
            </p>
            <div className="flex flex-row text-white">
              {" "}
              <p className="font-extralight">returns</p>
              <p className="ml-1 font-semibold">
                {selectedAlgorithmInfo ? selectedAlgorithmInfo.Returns : ""}
              </p>
            </div>
          </div>
          <div>
            <p className="mt-10 text-white">
              <span className="font-semibold">
                {selectedAlgorithmInfo ? selectedAlgorithmInfo.Name : ""}
              </span>{" "}
              {selectedAlgorithmInfo ? selectedAlgorithmInfo.BigDesc : ""}
            </p>
          </div>
          <div className="mt-10 flex flex-row justify-start">
            <div className="mx-1 rounded-full border border-white px-4 py-2 text-white">
              <p>{selectedAlgorithmInfo ? selectedAlgorithmInfo.Op : ""}</p>
            </div>
            <div className="mx-1 rounded-full border border-white px-4 py-2 text-white">
              <p>{selectedAlgorithmInfo ? selectedAlgorithmInfo.Script : ""}</p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="mb-10 mt-8 overflow-hidden rounded-lg bg-white">
            <div className="px-4 py-2">
              <div className="overflow-hidden overflow-x-auto">
                <table className="w-full table-auto">
                  <colgroup>
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "40%" }} />
                    <col style={{ width: "20%" }} />
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
                        Algorithm
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
                        Returns
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                      >
                        OP
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                      >
                        Scripts
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Hashing_List.map((script, row) => (
                      <tr
                        key={row}
                        className={` border-b border-[#E9EAEC] ${
                          row % 2 === 0
                            ? "hover-row-white"
                            : "hover-row-grayish"
                        }`}
                      >
                        <td className="left-align text-sm text-[#0C071D]">
                          <button
                            className="block h-full w-full items-center py-4 pl-4 pr-3"
                            onClick={() => setAlgorithm(script.Name)}
                          >
                            {script.Name}
                          </button>
                        </td>
                        <td className=" text-sm font-light text-[#0C071D]">
                          <button
                            className="block h-full w-full items-center py-4 pl-4 pr-3"
                            onClick={() => setAlgorithm(script.Name)}
                          >
                            {script.Desc}
                          </button>
                        </td>

                        <td className=" text-sm font-light text-[#0C071D]">
                          <button
                            className="block h-full w-full items-center py-4 pl-4 pr-3"
                            onClick={() => setAlgorithm(script.Name)}
                          >
                            {script.Returns}
                          </button>
                        </td>
                        <td className=" text-sm font-light text-[#0C071D]">
                          <button
                            className="block h-full w-full items-center py-4 pl-4 pr-3"
                            onClick={() => setAlgorithm(script.Name)}
                          >
                            {script.Op}
                          </button>
                        </td>
                        <td className=" text-sm font-light text-[#0C071D]">
                          <button
                            className="block h-full w-full items-center py-4 pl-4 pr-3"
                            onClick={() => setAlgorithm(script.Name)}
                          >
                            {script.Script}
                          </button>
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
    </div>
  );
};

export default HashingAlgorithm;
