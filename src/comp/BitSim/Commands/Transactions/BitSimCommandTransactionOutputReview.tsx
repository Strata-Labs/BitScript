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

type SettingInput2 = {
  value: string;
  setValue: (value: string) => void;
  value2: string;
  setValue2: (value: string) => void;
  value3: string;
  setValue3: (value: string) => void;
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
        <label className="text-[16px] font-light text-[#0C071D]">{label}</label>
      </p>
      <div className="relative w-full">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="relative  h-14 w-full rounded-full border bg-dark-purple px-8 text-lg text-white"
        />

        <div
          style={{
            right: "45px",
            top: "15%",
          }}
          className="absolute flex  flex-col justify-center "
        ></div>
      </div>
    </div>
  );
};

const SettingsInput2 = ({
  value,
  setValue,
  value2,
  setValue2,
  value3,
  setValue3,
  label,
  placeholder,
  valid,
}: SettingInput2) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex h-[43px] flex-row items-center justify-between bg-[#FAFAFA] text-dark-purple">
        <div className="ml-5 flex flex-row items-center">
          <p>PubKey Type</p>
          <p className="ml-[190px]">Description</p>
        </div>
        <div className="mr-5 flex flex-row items-center">
          <p className="mr-[50px]">Autosign</p>
          <p>Select</p>
        </div>
      </div>
      <div className="relative w-full">
        <div className="relative flex h-14 w-full flex-row items-center justify-between rounded-full border bg-dark-purple px-2 text-lg text-white">
          <div className="flex w-full">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              className=" h-12 rounded-full bg-transparent  px-8 text-lg text-white outline-none"
            />
            <input
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              placeholder={placeholder}
              className=" h-12 w-full rounded-full bg-transparent px-8 text-lg text-white outline-none"
            />
          </div>
          <div className="flex items-center">
            <input
              value={value3}
              onChange={(e) => setValue3(e.target.value)}
              placeholder={placeholder}
              className=" mr-16 h-12 w-[50px] rounded-full bg-transparent px-2 text-lg text-white outline-none"
            />
            <button
              className="mr-10 flex h-[16px] w-[16px] items-center justify-center rounded-sm border border-dark-orange"
              onClick={handleCheckboxChange}
            >
              {isChecked && <span className="text-dark-orange">&#10003;</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BitSimCommandTransactionsOutputReview = () => {
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [description, setDescription] = useState("");
  const [validDescription, setValidDescription] = useState(false);
  const [selectedBlockType, setSelectedBlockType] = useState("empty");
  const [pubKeyType, setPubKeyType] = useState("");
  const [description2, setDescription2] = useState("");
  const [autosign, setAutosign] = useState("");

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
          <div className="mt-10 flex items-center">
            <Link href={"/bitsim/commands/transactions"}>
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-180"
              >
                <path
                  d="M7.99986 16.4583C8.15986 16.4583 8.31988 16.3975 8.44155 16.275L14.2749 10.4417C14.519 10.1975 14.519 9.80164 14.2749 9.55747L8.44155 3.72414C8.19738 3.47997 7.80152 3.47997 7.55735 3.72414C7.31319 3.96831 7.31319 4.36417 7.55735 4.60834L12.949 9.99998L7.55735 15.3916C7.31319 15.6358 7.31319 16.0317 7.55735 16.2758C7.67985 16.3975 7.83986 16.4583 7.99986 16.4583Z"
                  fill="#25314C"
                  stroke="#25314C"
                />
              </svg>
            </Link>

            <p className=" text-[20px] font-semibold text-[#0C071D] md:mt-0 md:text-[20px]">
              Output 0
            </p>
            <p className="ml-2 text-[#0C071D]">Details</p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-10 px-8">
        <div className="flex w-full flex-col rounded-2xl bg-white px-6 py-8">
          <div className="flex flex-row items-center justify-between">
            <p className=" text-[20px] font-semibold text-[#0C071D]  md:text-[28px]">
              Amount
            </p>
            <p className="text-[#0C071D]">
              <span className="font-semibold">0.21500000</span> available in
              inputs
            </p>
          </div>
          <div className="mt-2 flex w-full flex-col gap-10">
            <SettingsInput
              value={name}
              setValue={setName}
              label="How much BTC is transferred in this output?"
              placeholder=""
              valid={validName}
            />
          </div>
        </div>
        <div className="flex w-full flex-col rounded-2xl bg-white px-6 py-8">
          <div className="flex flex-row items-center justify-between">
            <p className=" text-[20px] font-semibold text-[#0C071D]  md:text-[28px]">
              Output PubKey Type
            </p>
          </div>
          <div className="mt-2 flex w-full flex-col gap-10">
            <SettingsInput2
              value={pubKeyType}
              setValue={setPubKeyType}
              value2={description2}
              setValue2={setDescription2}
              value3={autosign}
              setValue3={setAutosign}
              label=""
              placeholder=""
              valid={validName}
            />
          </div>
        </div>
        <button
          className={classNames(
            "flex h-[72px] w-full items-center justify-between rounded-full px-6  ",
            "cursor-pointer bg-[#0C071D] "
          )}
        >
          <p className="gradient-text mr-5 text-[20px] font-semibold tracking-wider md:mr-10">
            Confirm Output (0)
          </p>
          <CheckCircleIcon
            className={classNames(
              "h-10 w-10 ",
              "text-dark-orange",
              true ? "text-gray-300" : "text-dark-orange"
            )}
          />
        </button>
      </div>
    </div>
  );
};

export default BitSimCommandTransactionsOutputReview;
