import React from "react";
import { INPUT_COUNT_DATA } from "../../../const/deserializeTx";
import { CountItem } from "../../../deserialization/model";
import Link from "next/link";

export const SIZE_DETAILS = [
  {
    size: "2 bytes",
    rules: "<= fc | 252",
    examples: "01, 99, FA",
    description: "Only 2 bytes, no prefix",
  },
  {
    size: "6 bytes",
    rules: "<= ffff | 65535",
    examples: "FD9999",
    description: "fd + 2 bytes (in little-endian).",
  },
  {
    size: "8 bytes",
    rules: "<= ffffffff | 4294...",
    examples: "FE99999999",
    description: "fe + 4 bytes (in little-endian).",
  },
  {
    size: "10 bytes",
    rules: "<= ffffffffffffffff",
    examples: "FF999999...",
    description: "ff + 8 bytes (in little-endian).",
  },
];
const InputCount = (props: CountItem) => {
  return (
    <>
      <p className="mx-5 mt-3 text-lg text-[#0C071D]">
        The input count field tells us the total number of inputs that were used
        to fetch & unlock the Bitcoin spent in this transaction. It’s stored as
        a VarInt.
      </p>
      <div className="mx-4 mt-6 overflow-hidden  ring-1 ring-black  sm:rounded-lg">
        <table className="min-w-full divide-y divide-[#F79327]">
          <thead className="">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-2xl font-bold text-gray-900 sm:pl-6"
              >
                Size
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-2xl font-bold text-gray-900 sm:pl-6"
              >
                Rule
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-2xl font-bold text-gray-900 sm:pl-6"
              >
                Example
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-2xl font-bold text-gray-900 sm:pl-6"
              >
                Description
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className=" bg-white">
            {SIZE_DETAILS.map((deet, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-lg  text-black sm:pl-6">
                  {deet.size}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-lg text-black">
                  {deet.rules}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-lg text-black">
                  {deet.examples}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-lg text-black">
                  {deet.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mx-5 mt-5 text-lg text-[#0C071D]">
        With our input count, we know how many inputs we expect in the upcoming
        hex, recall that each input requires the following fields: TXID, VOUT,
        ScriptSigSize, ScriptSig, & Sequence.
      </p>
    </>
  );
};

export default InputCount;

export const OutPutCount = (props: CountItem) => {
  return (
    <>
      <p className="mx-5 mt-3 text-lg text-[#0C071D]">
        The output count field tells us the total number of outputs that were
        used to assign & lock the inputs spent. Like most items of varying size,
        it’s stored according to VarInt rules:
      </p>
      <div className="mx-4 mt-6 overflow-hidden  ring-1 ring-black  sm:rounded-lg">
        <table className="min-w-full divide-y divide-[#F79327]">
          <thead className="">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-2xl font-bold text-gray-900 sm:pl-6"
              >
                Size
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-2xl font-bold text-gray-900 sm:pl-6"
              >
                Rule
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-2xl font-bold text-gray-900 sm:pl-6"
              >
                Example
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-2xl font-bold text-gray-900 sm:pl-6"
              >
                Description
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className=" bg-white">
            {SIZE_DETAILS.map((deet, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-lg  text-black sm:pl-6">
                  {deet.size}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-lg text-black">
                  {deet.rules}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-lg text-black">
                  {deet.examples}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-lg text-black">
                  {deet.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mx-5 mt-5 text-lg text-[#0C071D]">
        With our output count, we know how many outputs we expect in the
        upcoming hex, recall that each output requires the following fields:
        Amount, PubKeySize, & PubKey.
      </p>
    </>
  );
};
