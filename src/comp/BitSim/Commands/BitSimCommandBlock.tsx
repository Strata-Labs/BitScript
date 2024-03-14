import { classNames } from "@/utils";
import { CheckCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { COMMANDS, commandAtoms } from "../BitSimAtoms";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

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

const BitSimCommandBlock = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [description, setDescription] = useState("");
  const [validDescription, setValidDescription] = useState(false);
  const [selectedBlockType, setSelectedBlockType] = useState("empty");

  const [commands, setCommands] = useAtom(commandAtoms);

  const handleAddBlockCommand = () => {
    const blockParams = {
      address: "faucet",
      blocks: parseInt(name),
    };

    const command = {
      title: "Generate Blocks",
      blocksLength: parseInt(name),
      data: blockParams,
      type: COMMANDS.mineSomeBlocks,
      label: `(${name} random blocks)`,
    };

    setCommands([...commands, command]);
    router.push("/bitsim/commands");
  };
  function renderContentBasedOnBlockType(type: any) {
    switch (type) {
      case "custom":
        return (
          <>
            <div className="flex w-full flex-col rounded-2xl bg-white px-6 py-8">
              <div className="flex flex-row items-center justify-between">
                <p className=" text-[20px] font-semibold text-[#0C071D]  md:text-[28px]">
                  Custom Block Draft
                </p>
              </div>
              <div className="mt-2 flex w-full flex-col gap-10">
                <SettingsInput
                  value={name}
                  setValue={setName}
                  label="Instance Name"
                  placeholder=""
                  valid={validName}
                />
                <SettingsInput
                  value={name}
                  setValue={setName}
                  label="Instance Description"
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
              <p className="mr-5 text-[20px] font-light italic tracking-wider  text-gray-500 md:mr-10">
                Generating SmartGen Command...
              </p>
              <CheckCircleIcon
                className={classNames(
                  "h-10 w-10 ",
                  "text-dark-orange",
                  true ? "text-gray-300" : "text-dark-orange"
                )}
              />
            </button>
          </>
        );
      case "empty":
        return (
          <>
            <div className="flex w-full flex-col rounded-2xl bg-white px-6 py-8">
              <div className="flex flex-row items-center justify-between">
                <p className=" text-[20px] font-semibold text-[#0C071D]  md:text-[28px]">
                  Empty Block(s) Draft
                </p>
              </div>
              <div className="mt-2 flex w-full flex-col gap-10">
                <SettingsInput
                  value={name}
                  setValue={setName}
                  label="# of Empty Blocks"
                  placeholder="Type in an integer (1,2,3..)"
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
              <p className="mr-5 text-[20px] font-light italic tracking-wider  text-gray-500 md:mr-10">
                Generating SmartGen Command...
              </p>
              <CheckCircleIcon
                className={classNames(
                  "h-10 w-10 ",
                  "text-dark-orange",
                  true ? "text-gray-300" : "text-dark-orange"
                )}
              />
            </button>
          </>
        );
      case "random":
        return (
          <>
            <div className="flex w-full flex-col rounded-2xl bg-white px-6 py-8">
              <div className="flex flex-row items-center justify-between">
                <p className=" text-[20px] font-semibold text-[#0C071D]  md:text-[28px]">
                  Random Block(s) Draft
                </p>
              </div>
              <div className="mt-2 flex w-full flex-col gap-10">
                <SettingsInput
                  value={name}
                  setValue={setName}
                  label="# of Random Blocks"
                  placeholder="Type in an integer (1,2,3..)"
                  valid={validName}
                />
              </div>
            </div>
            <button
              onClick={() => handleAddBlockCommand()}
              className={classNames(
                "flex h-[72px] w-full items-center justify-between rounded-full px-6  ",
                "cursor-pointer bg-[#0C071D] "
              )}
            >
              <p
                className={classNames(
                  "mr-5 text-[20px] font-light italic tracking-wider  text-gray-500 md:mr-10",
                  name.length > 0 && "gradient-text"
                )}
              >
                Generating SmartGen Command...
              </p>
              <CheckCircleIcon
                className={classNames(
                  "h-10 w-10 ",
                  "text-dark-orange",
                  name.length == 0 ? "text-gray-300" : "text-dark-orange"
                )}
              />
            </button>
          </>
        );
      default:
        return (
          <div>
            {/* Fallback content if no match */}
            <p>No block type selected.</p>
          </div>
        );
    }
  }

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
          <div className="mt-10 flex">
            <p className=" text-[20px] font-semibold text-[#0C071D] md:mt-0 md:text-[20px]">
              Block Type
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-10 px-8">
        <div className="flex h-[64px] w-full flex-row justify-between rounded-2xl bg-white">
          <div className="mx-[150px] flex w-full justify-between">
            <button
              className={`ml-2 mt-[17px] h-full w-full text-[20px] ${
                selectedBlockType === "custom"
                  ? " border-b-[5px] border-dark-orange font-bold"
                  : "font-light"
              } text-[#0C071D] md:ml-0 md:mt-0`}
              onClick={() => setSelectedBlockType("custom")}
            >
              Custom
            </button>
            <button
              className={`ml-2 mt-[17px] h-[] w-full text-[20px] ${
                selectedBlockType === "empty"
                  ? " border-b-[5px] border-dark-orange font-bold"
                  : "font-light"
              } text-[#0C071D] md:ml-0 md:mt-0`}
              onClick={() => setSelectedBlockType("empty")}
            >
              Empty
            </button>
            <button
              className={`ml-2 mt-[17px] h-full w-full text-[20px] ${
                selectedBlockType === "random"
                  ? " border-b-[5px] border-dark-orange font-bold"
                  : "font-light"
              } text-[#0C071D] md:ml-0 md:mt-0`}
              onClick={() => setSelectedBlockType("random")}
            >
              Random
            </button>
          </div>
        </div>
        {renderContentBasedOnBlockType(selectedBlockType)}
      </div>
    </div>
  );
};

export default BitSimCommandBlock;
