import { classNames } from "@/utils";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { sum } from "d3";
import Link from "next/link";
import { string } from "zod";

type BitSimTable = {
  name: string;
  summary: string;
  createdAt: Date;
  numberBlocks: number;
  numberCommands: number;
  numberOfTests: number;
  keyIndex: number;
  linkPath: string;
  eventCount: number;
};
const BitSimTbleRow = ({
  name,
  summary,
  createdAt,
  numberBlocks,
  numberCommands,
  numberOfTests,
  keyIndex,
  linkPath,
  eventCount,
}: BitSimTable) => {
  return (
    <tr
      key={keyIndex}
      className={` border-b border-[#E9EAEC] ${
        keyIndex % 2 === 0 ? "hover-row-white" : "hover-row-grayish"
      }`}
    >
      <td className=" text-md font-normal text-[#0C071D] sm:pl-3">
        <Link
          href={linkPath}
          className="block h-full w-full items-center py-4 pl-4 pr-3"
          target="_blank"
        >
          {name}
        </Link>
      </td>
      <td className=" text-md font-normal text-[#0C071D] ">
        <Link
          href={linkPath}
          className="block h-full w-full items-center py-4 pl-4 pr-3"
          target="_blank"
        >
          {summary}
        </Link>
      </td>
      <td className=" text-md font-normal text-[#0C071D] ">
        <Link
          href={linkPath}
          className="block h-full w-full items-center py-4 pl-4 pr-3"
          target="_blank"
        >
          {createdAt.toLocaleDateString()}
        </Link>
      </td>
      <td className=" text-md font-normal text-[#0C071D] ">
        <Link
          href={linkPath}
          className="block h-full w-full items-center py-4 pl-4 pr-3"
          target="_blank"
        >
          {eventCount}
        </Link>
      </td>
      <td className=" text-md font-normal text-[#0C071D] ">
        <Link
          href={linkPath}
          className="block h-full w-full items-center py-4 pl-4 pr-3"
          target="_blank"
        >
          {numberBlocks}
        </Link>
      </td>
      <td className=" text-md font-normal text-[#0C071D] ">
        <Link
          href={linkPath}
          className="block h-full w-full items-center py-4 pl-4 pr-3"
          target="_blank"
        >
          {numberCommands}
        </Link>
      </td>
      <td className=" text-md font-normal text-[#0C071D] ">
        <Link
          href={linkPath}
          className="block h-full w-full items-center py-4 pl-4 pr-3"
          target="_blank"
        >
          {numberOfTests}
        </Link>
      </td>
    </tr>
  );
};

const BITSIM_MOCK_DATA = [
  {
    name: "BitSim RegTest",
    summary: "A new instance of BitSim RegTest",
    createdAt: new Date(),
    // random number bw 1-100
    numberBlocks: 344,
    numberCommands: 23,
    numberOfTests: 12,
    eventCount: 234,
    linkPath: "/bitsim/commands",
  },
];
const BitSim = () => {
  return (
    <div className="mx-10 mb-10 mt-10 md:ml-[260px] md:mr-5">
      <div className="flex flex-col">
        <p className="mr text-[20px] font-semibold text-[#0C071D] md:ml-0 md:text-[18px] lg:text-[40px]">
          BitSim
        </p>
        <p className="mt-6 font-normal  text-[#0C071D] md:mr-[170px]  md:text-xl">
          Bitcoin Simulated is a RegTest testing suite for you to write custom
          commands & unit tests, either from our UI or through our CLI tool.
          Click below to{" "}
          <span className="text-dark-orange">start a new instance</span> or{" "}
          <span className="text-dark-orange">open a saved instance.</span>
        </p>
      </div>

      <div className="mb-10 mt-8 w-full overflow-hidden rounded-lg bg-white">
        <div className="px-4 py-2">
          <div className="overflow-hidden overflow-x-auto">
            <table className="w-full table-auto">
              <colgroup>
                <col style={{ width: "20%" }} />
                <col style={{ width: "30%" }} />
                <col style={{ width: "10%" }} />
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
                    Instance
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
                    Created
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                  >
                    Edited
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                  >
                    # Blocks
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                  >
                    # Commands
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                  >
                    # Tests
                  </th>
                </tr>
              </thead>
              <tbody>
                {BITSIM_MOCK_DATA.map((data, index) => {
                  return (
                    <BitSimTbleRow
                      keyIndex={index}
                      name={data.name}
                      summary={data.summary}
                      createdAt={data.createdAt}
                      numberBlocks={data.numberBlocks}
                      numberCommands={data.numberCommands}
                      numberOfTests={data.numberOfTests}
                      linkPath="/"
                      eventCount={data.eventCount}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="my-4 h-1 w-full rounded-full bg-dark-orange" />
      <button
        className={classNames(
          "flex h-[72px] w-full items-center justify-between rounded-full pl-6  ",
          "cursor-pointer bg-[#0C071D] "
        )}
      >
        <p className="gradient-text mr-5 text-[20px] font-bold tracking-wider  md:mr-10">
          Start new BitSim Instance
        </p>
        <PlusCircleIcon className="mr-5 h-10 w-10 text-dark-orange" />
      </button>
    </div>
  );
};

export default BitSim;
