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

export const SettingsInput = ({
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
const CreateBitSim = () => {
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [description, setDescription] = useState("");
  const [validDescription, setValidDescription] = useState(false);

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
        minHeight: "92vh",
        paddingLeft: "240px",
      }}
      className=" flex h-full w-full flex-col gap-4 overflow-auto"
    >
      <div className=" flex w-full flex-col justify-between px-8 ">
        <div className="flex items-center md:flex-row">
          {/* Left pointing icon that returns to /opCodes page */}
          <a className="cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              rotate="180deg"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-[17px] md:mt-[7px]"
            >
              <g transform="rotate(180 12 12)">
                <path
                  d="M8.99978 19.7498C8.80778 19.7498 8.61575 19.6768 8.46975 19.5298C8.17675 19.2368 8.17675 18.7618 8.46975 18.4688L14.9397 11.9988L8.46975 5.52883C8.17675 5.23583 8.17675 4.7608 8.46975 4.4678C8.76275 4.1748 9.23779 4.1748 9.53079 4.4678L16.5308 11.4678C16.8238 11.7608 16.8238 12.2358 16.5308 12.5288L9.53079 19.5288C9.38379 19.6768 9.19178 19.7498 8.99978 19.7498Z"
                  fill="#F79327"
                />
              </g>
            </svg>
          </a>
          {/* Title and Description */}
          <div className="flex">
            <p className="ml-2 text-[20px] font-semibold text-[#0C071D] md:ml-4 md:mt-0 md:text-[39px]">
              RegTest Settings
            </p>
            {/* <p className="ml-[8px] mt-[22px] text-[12px] font-extralight text-[#687588] md:mt-2 md:text-[18px]">
            {`(${opCode} | ${hex})`}
          </p> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start px-8 ">
        <p className="text-[16px] font-extralight text-[#6C5E70] ">
          Below you'll find all the customizable BitSim setup. You can always
          edit these later.
        </p>
      </div>
      <div className="flex w-full flex-col gap-10 px-8">
        <div className="flex w-full flex-col rounded-2xl bg-white px-6 py-8">
          <p className=" text-[20px] font-semibold text-[#0C071D]  md:text-[28px]">
            Main Settings
          </p>
          <div className="mt-4 flex w-full flex-col gap-10">
            <SettingsInput
              value={name}
              setValue={setName}
              label="Instance Name"
              placeholder="Name your RegTest"
              valid={validName}
            />
            <SettingsInput
              value={description}
              setValue={setDescription}
              label="Instance Description"
              placeholder="Running first test with a TapRoot"
              valid={validDescription}
            />
          </div>
        </div>
        <div className="flex w-full flex-col rounded-2xl bg-white px-4 py-8">
          <div className="flex flex-row items-center justify-between">
            <p className="ml-2 mt-[17px] text-[20px] font-semibold text-[#0C071D] md:ml-4 md:mt-0 md:text-[28px]">
              Wallet Settings
            </p>
            <div className="flex flex-row items-center gap-2">
              <p className=" text-[20px] font-thin text-[#0C071D] md:text-[24px]">
                # of Wallets <span className="font-bold"> 2</span>
              </p>
              <p className=" text-[20px] font-bold text-[#0C071D] md:text-[24px]">
                |
              </p>
              <p className=" text-[20px] font-thin text-[#0C071D] md:text-[24px]">
                starting aggregate <span className="font-bold">2.5 BTC</span>
              </p>
            </div>
          </div>
        </div>
        <Link href="/bitsim/commands">
          <button
            className={classNames(
              "flex h-[72px] w-full items-center justify-between rounded-full px-6  ",
              "cursor-pointer bg-[#0C071D] "
            )}
          >
            <p className="gradient-text mr-5 text-[20px] font-bold tracking-wider  md:mr-10">
              Start new BitSim Instance
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

export default CreateBitSim;
