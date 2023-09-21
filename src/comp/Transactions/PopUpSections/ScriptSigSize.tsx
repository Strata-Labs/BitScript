import React from "react";
import { SIZE_DETAILS } from "./InputCount";

const ScriptSigSize = () => {
  return (
    <>
      <p className="mx-5 mt-3 text-lg text-[#0C071D]">
        The ScriptSigSize field dictates the length of the upcoming ScriptSig /
        UnlockScript. Like most items of varying size, The scriptSigSize is
        formatted according to Bitcoin VarInt rules:
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
        This length is recorded in hex & must be converted to decimal to
        correctly count upcoming chars.
      </p>
    </>
  );
};

export default ScriptSigSize;
