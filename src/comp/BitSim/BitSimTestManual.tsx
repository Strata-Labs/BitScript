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
  onClick?: () => void;
  disable?: boolean;
};

const SettingsInput = ({
  value,
  setValue,
  label,
  placeholder,
  valid,
  onClick,
  disable,
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
          className="text-md relative h-14 w-full rounded-full border border-black px-8 text-black"
        />

        <div
          style={{
            right: "45px",
            top: "15%",
          }}
          className="absolute flex  flex-col justify-center "
        >
          <button onClick={onClick} disabled={disable}>
            <CheckCircleIcon
              className={classNames(
                "h-10 w-10 ",
                valid ? "text-dark-orange" : "text-gray-300"
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
const BitSimTestManual = () => {
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [description, setDescription] = useState("");
  const [validDescription, setValidDescription] = useState(false);
  const [blockHeight, setBlockHeight] = useState("");
  const [validBlockHeight, setValidBlockHeight] = useState(false);
  const [step, setStep] = useState("1");
  const [testCategory, setTestCategory] = useState("");
  const [validTestCategory, setValidTestCategory] = useState(false);
  const [categoryProperty, setCategoryProperty] = useState("");
  const [validCategoryProperty, setValidCategoryProperty] = useState(false);
  const [who, setWho] = useState("");
  const [validWho, setValidWho] = useState(false);
  const [howMuch, setHowMuch] = useState("");
  const [validHowMuch, setValidHowMuch] = useState(false);
  const [toWho, setToWho] = useState("");
  const [validToWho, setValidToWho] = useState(false);

  const incrementStep = () => {
    const newStep = String(Number(step) + 1);
    setStep(newStep);
  };

  useEffect(() => {
    console.log("name", name.length);
    if (name !== "") {
      setValidName(true);
    } else {
      setValidName(false);
    }
  }, [name]);

  useEffect(() => {
    console.log("blockHeight", blockHeight.length);
    if (blockHeight !== "") {
      setValidBlockHeight(true);
    } else {
      setValidBlockHeight(false);
    }
  }, [blockHeight]);

  useEffect(() => {
    console.log("testCategory", testCategory.length);
    if (testCategory !== "") {
      setValidTestCategory(true);
    } else {
      setValidTestCategory(false);
    }
  }, [testCategory]);

  useEffect(() => {
    console.log("categoryProperty", categoryProperty.length);
    if (categoryProperty !== "") {
      setValidCategoryProperty(true);
    } else {
      setValidCategoryProperty(false);
    }
  }, [categoryProperty]);

  useEffect(() => {
    console.log("description", description);
    if (description !== "") {
      setValidDescription(true);
    } else {
      setValidDescription(false);
    }
  }, [description]);

  useEffect(() => {
    console.log("who", who);
    if (who !== "") {
      setValidWho(true);
    } else {
      setValidWho(false);
    }
  }, [who]);

  useEffect(() => {
    console.log("how much", howMuch);
    if (howMuch !== "") {
      setValidHowMuch(true);
    } else {
      setValidHowMuch(false);
    }
  }, [howMuch]);

  useEffect(() => {
    console.log("to who", toWho);
    if (toWho !== "") {
      setValidToWho(true);
    } else {
      setValidToWho(false);
    }
  }, [toWho]);

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
            <p className=" text-[20px] font-semibold text-[#0C071D] md:mt-10 md:text-[20px]">
              Manual Test
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-10 px-8">
        <div className="flex w-full flex-col rounded-2xl bg-white px-6 py-8">
          <div className="flex flex-row items-center justify-between">
            <p className=" text-[20px] font-semibold text-[#0C071D]  md:text-[28px]">
              Test Name
            </p>
          </div>

          <div className="mt-2 flex w-full flex-col gap-10">
            <SettingsInput
              value={name}
              setValue={setName}
              label="Give a decriptive name for this test"
              placeholder="type in a test name here..."
              valid={validName}
            />
          </div>
        </div>
        {(step === "2" || step === "3" || step === "4") && (
          <div
            className={classNames(
              "flex h-[72px] w-full items-center justify-between rounded-full px-6  ",
              "cursor-pointer bg-[#0C071D] "
            )}
          >
            <p className="mr-5 text-[20px] font-extralight tracking-wider text-white  md:mr-10">
              when is this triggered?{" "}
              <span className="font-bold">Block {blockHeight}</span>
            </p>
            <CheckCircleIcon
              className={classNames("h-10 w-10 ", "text-dark-orange")}
            />
          </div>
        )}
        {(step === "3" || step === "4") && (
          <div
            className={classNames(
              "flex h-[72px] w-full items-center justify-between rounded-full px-6  ",
              "cursor-pointer bg-[#0C071D] "
            )}
          >
            <p className="mr-5 text-[20px] font-extralight tracking-wider text-white  md:mr-10">
              what is tested here?{" "}
              <span className="font-bold">{testCategory}</span>
            </p>
            <CheckCircleIcon
              className={classNames("h-10 w-10 ", "text-dark-orange")}
            />
          </div>
        )}
        {step === "4" && (
          <div
            className={classNames(
              "flex h-[72px] w-full items-center justify-between rounded-full px-6  ",
              "cursor-pointer bg-[#0C071D] "
            )}
          >
            <p className="mr-5 text-[20px] font-extralight tracking-wider text-white  md:mr-10">
              what is the expected value?{" "}
              <span className="font-bold">
                {who} Transfers {howMuch} BTC To {toWho}
              </span>
            </p>
            <CheckCircleIcon
              className={classNames("h-10 w-10 ", "text-dark-orange")}
            />
          </div>
        )}
        <div className="flex w-full items-center justify-center">
          <div className="flex  w-[649px] flex-col items-center justify-between rounded-[20px] border border-dark-orange bg-white">
            {step === "1" && (
              <>
                <div className="mt-5 flex w-full flex-row justify-between font-semibold text-black">
                  <p className="ml-5">When Is This Triggered?</p>
                  <p className="mr-5 text-dark-orange">1/3</p>
                </div>
                <div className="flex w-full flex-col">
                  <div className="mx-5 mb-5">
                    <SettingsInput
                      value={blockHeight}
                      setValue={setBlockHeight}
                      label="Block height"
                      placeholder="type in an integer (1,2,3...)"
                      valid={validBlockHeight}
                      onClick={incrementStep}
                      disable={!validBlockHeight}
                    />
                  </div>
                </div>
              </>
            )}
            {step === "2" && (
              <>
                <div className="mt-5 flex w-full flex-row justify-between font-semibold text-black">
                  <p className="ml-5">What Type Of Test Is This?</p>
                  <p className="mr-5 text-dark-orange">2/3</p>
                </div>
                <div className="flex w-full flex-col">
                  <div className="mx-5 mb-5">
                    <div className="mt-5"></div>
                    <SettingsInput
                      value={testCategory}
                      setValue={setTestCategory}
                      label="Test Category"
                      placeholder="Type in category or use drop-down to view options"
                      valid={validTestCategory && validCategoryProperty}
                      onClick={incrementStep}
                      disable={!validTestCategory || !validCategoryProperty}
                    />
                    <div className="mt-5"></div>
                    <SettingsInput
                      value={categoryProperty}
                      setValue={setCategoryProperty}
                      label="Category Property"
                      placeholder="Type in a property or use drop-down to view options"
                      valid={validTestCategory && validCategoryProperty}
                      onClick={incrementStep}
                      disable={!validTestCategory || !validCategoryProperty}
                    />
                  </div>
                </div>
              </>
            )}
            {step === "3" && (
              <>
                <div className="mt-5 flex w-full flex-row justify-between font-semibold text-black">
                  <p className="ml-5">What Is The Expected Value?</p>
                  <p className="mr-5 text-dark-orange">3/3</p>
                </div>
                <div className="flex w-full flex-col">
                  <div className="mx-5 mb-5">
                    <div className="mt-5"></div>
                    <SettingsInput
                      value={who}
                      setValue={setWho}
                      label="Who is transferring?"
                      placeholder="Type in a wallet name or use drop-down to view options"
                      valid={validWho && validHowMuch && validToWho}
                      onClick={incrementStep}
                      disable={!validWho || !validHowMuch || !validToWho}
                    />
                    <div className="mt-5"></div>
                    <SettingsInput
                      value={howMuch}
                      setValue={setHowMuch}
                      label="How much BTC?"
                      placeholder="Type in a btc amount in sats"
                      valid={validWho && validHowMuch && validToWho}
                      onClick={incrementStep}
                      disable={!validWho || !validHowMuch || !validToWho}
                    />
                    <div className="mt-5"></div>
                    <SettingsInput
                      value={toWho}
                      setValue={setToWho}
                      label="To who?"
                      placeholder="Type in a wallet name or use drop-down to view options"
                      valid={validWho && validHowMuch && validToWho}
                      onClick={incrementStep}
                      disable={!validWho || !validHowMuch || !validToWho}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <button
          className={classNames(
            "flex h-[72px] w-full cursor-pointer items-center justify-between rounded-full px-6",
            step === "4" ? "bg-[#0C071D]" : "bg-[#111827]"
          )}
        >
          <p
            className={`${
              step === "4" ? "gradient-text font-bold" : "italic text-white"
            } mr-5 text-[20px]  tracking-wider md:mr-10`}
          >
            {step === "4" ? "Confirm New Test" : "Generating SmartGen Test..."}
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

export default BitSimTestManual;
