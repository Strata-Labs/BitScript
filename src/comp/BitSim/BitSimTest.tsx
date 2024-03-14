import { classNames } from "@/utils";
import { CheckCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

type SettingInput = {
  value: string;
  setValue: (value: string) => void;
  label: string;
  placeholder: string;
  valid: boolean;
};

const SettingsInput = ({
  value,
  setValue,
  label,
  placeholder,
  valid,
}: SettingInput) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <p>
        <label className="text-[16px] font-semibold text-[#0C071D]">
          {label}
        </label>
      </p>
      <div className="relative w-full">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="relative  h-14 w-full rounded-full border border-black px-8 text-lg text-black"
        />

        <div
          style={{
            right: "45px",
            top: "15%",
          }}
          className="absolute flex  flex-col justify-center "
        >
          <CheckCircleIcon
            className={classNames(
              "h-10 w-10 ",
              valid ? "text-dark-orange" : "text-gray-300"
            )}
          />
        </div>
      </div>
    </div>
  );
};
const BitSimTest = () => {
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [description, setDescription] = useState("");
  const [validDescription, setValidDescription] = useState(false);

  interface Test {
    linkPath?: string;
    name?: string;
    shortDescription?: string;
    type?: string;
    property?: string;
    value?: string;
    passed?: string;
  }

  const Tests: Test[] = [
    // {
    //   linkPath: "string",
    //   name: "string",
    //   shortDescription: "string",
    //   type: "string",
    //   property: "string",
    //   value: "string",
    //   passed: "true",
    // },
    // {
    //   linkPath: "string",
    //   name: "string",
    //   shortDescription: "string",
    //   type: "string",
    //   property: "string",
    //   value: "string",
    //   passed: "true",
    // },
    // {
    //   linkPath: "string",
    //   name: "string",
    //   shortDescription: "string",
    //   type: "string",
    //   property: "string",
    //   value: "string",
    //   passed: "true",
    // },
  ];

  useEffect(() => {
    console.log("name", name.length);
    if (name !== "") {
      setValidName(true);
    } else {
      setValidName(false);
    }
  }, [name]);

  useEffect(() => {
    console.log("description", description);
    if (description !== "") {
      setValidDescription(true);
    } else {
      setValidDescription(false);
    }
  }, [description]);

  console.log("validName", validName);
  console.log("validDescription", validDescription);
  return (
    <div
      style={{
        //minHeight: "calc(100vh - 110px)",

        paddingLeft: "240px",
      }}
      className="flex h-full w-full flex-col gap-4 overflow-auto"
    >
      <div className=" flex w-full flex-col justify-between px-8 ">
        <div className="flex items-center md:flex-row">
          {/* Title and Description */}
          <div className="flex">
            <p className=" text-[20px] font-semibold text-[#0C071D] md:mt-0 md:text-[20px]">
              Tests
            </p>
            {/* <p className="ml-[8px] mt-[22px] text-[12px] font-extralight text-[#687588] md:mt-2 md:text-[18px]">
            {`(${opCode} | ${hex})`}
          </p> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start px-8 ">
        <p className="text-[16px] font-extralight text-[#6C5E70] ">
          Below are all of the chained commands that’ll run when the button
          above is clicked. Once ran, you’ll be able to inspect each block &
          transaction by opening up the mempool explorer seen above.
        </p>
      </div>
      <div className="flex w-full flex-col gap-10 px-8">
        <div className="flex w-full flex-col rounded-2xl bg-white px-6 py-8">
          <div className="flex flex-row items-center justify-between">
            <p className=" text-[20px] font-semibold text-[#0C071D]  md:text-[28px]">
              Previous Run Summary
            </p>
            <p className="text-[22px] font-extralight text-black">
              no tests written yet...
            </p>
          </div>
          <p className="font-extralight italic text-black">
            last ran <span className="font-bold">n/a</span>
          </p>

          <div className="mt-2 flex w-full flex-col gap-10">
            <SettingsInput
              value={name}
              setValue={setName}
              label=""
              placeholder=""
              valid={validName}
            />
          </div>
        </div>
        <div className="flex w-full flex-col rounded-2xl bg-white px-4 py-8">
          <div className="flex flex-row items-center justify-between">
            <p className="ml-2 mt-[17px] text-[20px] font-semibold text-[#0C071D] md:ml-4 md:mt-0 md:text-[28px]">
              Queued Tests
            </p>
          </div>
          <div className="overflow-hidden overflow-x-auto">
            <table className="w-full table-auto">
              <colgroup>
                <col style={{ width: "20%" }} />
                <col style={{ width: "50%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
              </colgroup>
              {/* Titles */}
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
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                  >
                    type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                  >
                    property
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                  >
                    value
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                  >
                    passed
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                  ></th>
                </tr>
              </thead>
              {/* Information */}
              <tbody>
                {Tests.length === 0 ? (
                  <tr>
                    <td className=" pt-5 text-sm text-[#0C071D] sm:pl-3">
                      Write first test{" "}
                      <span className="text-dark-orange">below</span>...
                    </td>
                  </tr>
                ) : (
                  Tests.map((test, row) => (
                    <tr
                      key={row}
                      className={` border-b border-[#E9EAEC] ${
                        row % 2 === 0 ? "hover-row-white" : "hover-row-grayish"
                      }`}
                    >
                      <td className=" text-sm text-[#0C071D] sm:pl-3">
                        <Link
                          href={test.linkPath || "#"}
                          className="block h-full w-full items-center py-4 pl-4 pr-3"
                          target="_blank"
                        >
                          {test.name}
                        </Link>
                      </td>
                      <td
                        className="flex items-center overflow-hidden  text-sm font-light text-[#0C071D]"
                        style={{
                          maxHeight: "3.5em",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        <Link
                          href={test.linkPath || "#"}
                          className="block h-full w-full items-center px-3 py-2"
                          target="_blank"
                        >
                          {test.shortDescription}
                        </Link>
                      </td>
                      <td className="text-sm font-light text-[#0C071D]">
                        <Link
                          href={test.linkPath || "#"}
                          className="block h-full w-full items-center px-3 py-4"
                          target="_blank"
                        >
                          {test.type}
                        </Link>
                      </td>

                      <td className="text-sm font-light text-[#0C071D]">
                        <Link
                          href={test.linkPath || "#"}
                          className="block h-full w-full items-center px-3 py-4"
                          target="_blank"
                        >
                          {test.property}
                        </Link>
                      </td>
                      <td className="text-sm font-light text-[#0C071D]">
                        <Link
                          href={test.linkPath || "#"}
                          className="block h-full w-full items-center px-3 py-4"
                          target="_blank"
                        >
                          {test.value}
                        </Link>
                      </td>
                      <td className=" text-sm font-light text-[#0C071D]">
                        <Link
                          href={test.linkPath || "#"}
                          className="block h-full w-full items-center px-3 py-4"
                          target="_blank"
                        >
                          {test.passed}
                        </Link>
                      </td>
                      <td className=" text-sm text-[#0C071D]">
                        <Link
                          href={test.linkPath || "#"}
                          className="block h-full w-full items-center px-3 py-4"
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Link href={"/bitsim/test/manual"} passHref>
          <button
            className={classNames(
              "flex h-[72px] w-full items-center justify-between rounded-full px-6  ",
              "cursor-pointer bg-[#0C071D] "
            )}
          >
            <p className="gradient-text mr-5 text-[20px] font-bold tracking-wider  md:mr-10">
              Add New Test
            </p>
            <CheckCircleIcon
              className={classNames(
                "h-10 w-10 ",
                "text-dark-orange",
                true ? "text-gray-300" : "text-dark-orange"
              )}
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BitSimTest;
