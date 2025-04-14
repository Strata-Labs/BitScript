import { useEffect, useRef, useState } from "react";
import { trpc } from "@/utils/trpc";
import { classNames } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";

import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { MethodInputs, PARAMETER_TYPE, RPCFunctionParams } from "@/const/RPC";
import { useAtom, useAtomValue } from "jotai";
import { paymentAtom, queryTrackerAtom, userAtom } from "../atom";

import TimerRPCPopUp from "../TimerRPCPopUp";

type RpcTopRightProps = {
  method: RPCFunctionParams;
  setRpcRes: (res: any) => void;
};

enum NETWORK {
  MAINNET = "MAINNET",
  TESTNET = "TESTNET",
}

const RpcTopRight = ({ method, setRpcRes }: RpcTopRightProps) => {
  const [rpcParams, setRpcParams] = useState<
    Map<number, string | number | boolean>
  >(new Map());
  const btcRPC = trpc.fetchBTCRPC.useMutation();

  const [network, setNetwork] = useState(NETWORK.MAINNET);

  const [queryTracker, setQueryTracking] = useAtom(queryTrackerAtom);
  const user = useAtomValue(userAtom);
  const payment = useAtomValue(paymentAtom);

  const handleQueryAction = trpc.handleUserQueryTracking.useMutation();

  const [showTimerPopUp, setShowTimerPopUp] = useState(false);

  useEffect(() => {
    if (queryTracker) {
      if (
        queryTracker.rpcQueryCount === 0 &&
        queryTracker.rpcQueryCooldownEnd
      ) {
        // check if the cooldown has ended
        const now = new Date();
        const cooldownEnd = new Date(queryTracker.rpcQueryCooldownEnd);
        if (now < cooldownEnd) {
          // if the cooldown has ended, we can reset the query count
          setShowTimerPopUp(true);
        }
      }
    }
  }, [queryTracker]);
  trpc.fetchAddressQueryTracking.useQuery(undefined, {
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setQueryTracking(data as any);
    },
  });

  useEffect(() => {
    const tings = new Map();
    method.inputs.forEach((input, index) => {
      if (input.defaultValue) {
        tings.set(index, input.defaultValue);
      }
    });

    setRpcParams((prev) => {
      return tings;
    });
  }, []);

  const handleRPCCall = async () => {
    try {
      if (queryTracker && queryTracker.rpcQueryCount > 0) {
        // plausible events here

        // get the rpc params
        // convert map into array of values

        // get the length of the hash
        const len = rpcParams.size;

        // we must assume that if there are more than 2 inputs the first two are either required or have a default value that must be pushed


        const paramsRes: any[] = [];
        // i can't assume the user will input the params in the right order so i have to loop by index
        for (let i = 0; i < len; i++) {
          if (rpcParams.has(i) !== false) {
            const value = rpcParams.get(i);
            if (value) {
              paramsRes.push(value);
            }
          }
        }

        if (network === NETWORK.MAINNET) {
          const res = await btcRPC.mutateAsync({
            method: method.method,
            params: paramsRes,
          });
          setRpcRes(res);
        } else {
          btcRPC.mutateAsync({
            method: method.method,
            params: [],
          });
        }

        if (payment) {
          if (payment.accountTier === "ADVANCED_ALICE") {
            return;
          }
        }
        const queryTracker = await handleQueryAction.mutateAsync({
          method: "RPC",
        });

        if (queryTracker) {
          setQueryTracking(queryTracker as any);
        }
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleUpdateParent = (
    key: number,
    value: string | number | boolean
  ) => {
    setRpcParams((prev) => {
      const newMap = new Map(prev);
      newMap.set(key, value);

      return newMap;
    });
  };

  const handleRemoveKey = (key: number) => {
    //
    // remove the value form the map
    setRpcParams((prev) => {
      const newMap = new Map(prev);
      newMap.delete(key);
      return newMap;
    });
  };

  const handleDisplayRequiredInputs = () => {
    // get the total required inputs length

    let reqInputs: number[] = [];

    method.inputs.forEach((d, i) => {
      if (d.required && d.required === true) reqInputs.push(i);
    });

    // check if the index in each of the required inputs is in the rpcParams
    // based on the difference, we can tell how many inputs are remaining
    const remainingInputs =
      reqInputs.length - reqInputs.filter((d) => rpcParams.has(d)).length;

    const mapping: { [key: number]: string } = {
      0: "zero",
      1: "one",
      2: "two",
      3: "three",
      4: "four",
    };

    return mapping[remainingInputs];
  };
  return (
    <div className="w-full">
      <AnimatePresence>
        {showTimerPopUp && queryTracker && queryTracker.rpcQueryCooldownEnd && (
          <TimerRPCPopUp
            setShowTimerPopUp={setShowTimerPopUp}
            timeRemaining={queryTracker.rpcQueryCooldownEnd}
          />
        )}
      </AnimatePresence>
      {/* General container */}
      <div className="flex flex-col">
        {/* Title and Main and Test Buttons*/}
        <div className="mx-5 mt-5 flex items-center justify-between">
          <p className="text-[20px] font-bold text-[#0C071D]">Request</p>
          <div className="flex h-[42px] w-[222px] flex-row items-center justify-between rounded-full bg-[#F3F3F3]">
            <button
              className={`ml-1 h-[30px] w-[100px] rounded-full ${
                network === NETWORK.MAINNET
                  ? "bg-[#0C071D] text-white"
                  : "text-[#0C071D]"
              }`}
              onClick={() => setNetwork(NETWORK.MAINNET)}
            >
              mainnet
            </button>
            <button
              className={`mr-1 h-[30px] w-[100px] rounded-full ${
                network === NETWORK.TESTNET
                  ? "bg-[#0C071D] text-white"
                  : "text-[#0C071D]"
              }`}
              onClick={() => setNetwork(NETWORK.TESTNET)}
            >
              testnet
            </button>
          </div>
        </div>
        {/* Method Type and Run button */}
        <div className="mx-5 mt-10 flex items-center justify-between">
          <div className="flex-ro flex h-[72px] w-full items-center justify-start rounded-full bg-[#0C071D] text-white">
            <div className="ml-6 flex flex-col">
              <p className="text-[12px] font-extralight">method</p>
              <p className="text-[20px] font-semibold">{method.method}</p>
            </div>
            {
              // if there are inputs, then show the number of inputs
              method.inputs.map((d, i) => {
                const has = rpcParams.has(i);
                const isRequired = d.required;

                const status = isRequired ? "Required" : "Optional";

                return (
                  <div
                    key={"methodinputs-info-" + i}
                    className="ml-6 flex max-w-[25%] flex-col justify-start  overflow-hidden truncate"
                  >
                    <div className="flex flex-row items-center gap-2">
                      <div
                        className={classNames(
                          "h-[6px] w-[6px] rounded-full",
                          has ? "bg-dark-orange" : "bg-gray-400"
                        )}
                      />
                      <p
                        className={classNames(
                          "text-[12px] font-extralight",
                          has && "text-dark-orange"
                        )}
                      >
                        {d.method}
                      </p>
                    </div>
                    <p
                      className={classNames(
                        "text-[16px]  ",
                        has
                          ? "font-semibold text-white"
                          : "font-normal italic text-gray-400"
                      )}
                    >
                      {has ? `${rpcParams.get(i)}` : status}
                    </p>
                  </div>
                );
              })
            }
          </div>
          {method.callable == true && (
            <div>
              <button
                onClick={handleRPCCall}
                disabled={
                  queryTracker && queryTracker.rpcQueryCount > 0 ? false : true
                }
                className={classNames(
                  "ml-3 flex h-[72px] w-[100px] items-center justify-between rounded-full  md:w-[145px]",
                  queryTracker && queryTracker.rpcQueryCount > 0
                    ? "cursor-pointer bg-[#0C071D] "
                    : "cursor-not-allowed bg-[#BBADEB]"
                )}
              >
                <div className="ml-5 md:ml-10">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="gradient-svg"
                  >
                    <path
                      d="M7.08333 4.95025C7.97281 4.44629 8.97768 4.1814 10 4.1814C11.0223 4.1814 12.0272 4.44629 12.9167 4.95025C13.0118 5.00535 13.1169 5.04109 13.2258 5.05541C13.3348 5.06973 13.4456 5.06235 13.5517 5.03369C13.6578 5.00503 13.7572 4.95566 13.8441 4.88842C13.9311 4.82119 14.0039 4.73741 14.0583 4.64192C14.167 4.45057 14.1955 4.22402 14.1378 4.0117C14.08 3.79938 13.9406 3.61852 13.75 3.50859C12.6061 2.86154 11.3142 2.52148 10 2.52148C8.68577 2.52148 7.39391 2.86154 6.25 3.50859C6.05939 3.61852 5.92 3.79938 5.86223 4.0117C5.80447 4.22402 5.83302 4.45057 5.94167 4.64192C5.99611 4.73741 6.0689 4.82119 6.15586 4.88842C6.24282 4.95566 6.34221 5.00503 6.44833 5.03369C6.55445 5.06235 6.66519 5.06973 6.77417 5.05541C6.88315 5.04109 6.98822 5.00535 7.08333 4.95025ZM15.35 9.34192C15.2634 9.13818 15.1632 8.94051 15.05 8.75025C14.9928 8.65641 14.9176 8.5748 14.8287 8.51014C14.7399 8.44547 14.6391 8.39902 14.5322 8.37346C14.4253 8.3479 14.3144 8.34374 14.2059 8.36121C14.0974 8.37868 13.9935 8.41744 13.9 8.47525C13.7128 8.59072 13.5788 8.77555 13.5272 8.98942C13.4757 9.20329 13.5109 9.42886 13.625 9.61692C13.7538 9.83901 13.8599 10.0735 13.9417 10.3169C13.9893 10.4601 14.0749 10.5877 14.1894 10.686C14.3039 10.7844 14.4429 10.8498 14.5917 10.8753C15.1715 10.9753 15.6976 11.2767 16.0771 11.7263C16.4567 12.176 16.6654 12.7451 16.6667 13.3336C16.6667 13.9966 16.4033 14.6325 15.9344 15.1014C15.4656 15.5702 14.8297 15.8336 14.1667 15.8336H4.71667C4.37668 15.7813 4.06121 15.625 3.81354 15.3863C3.56587 15.1476 3.39813 14.8381 3.33333 14.5003C3.28328 14.2553 3.28898 14.0022 3.35 13.7598C3.41103 13.5173 3.52583 13.2917 3.68589 13.0996C3.84595 12.9075 4.04717 12.7539 4.27465 12.6502C4.50213 12.5464 4.75003 12.4952 5 12.5003C5.22101 12.5003 5.43298 12.4125 5.58926 12.2562C5.74554 12.0999 5.83333 11.8879 5.83333 11.6669C5.83166 10.9379 6.02439 10.2216 6.39167 9.59192C6.44677 9.49681 6.4825 9.39174 6.49682 9.28275C6.51114 9.17377 6.50376 9.06303 6.4751 8.95692C6.44644 8.8508 6.39707 8.7514 6.32984 8.66445C6.2626 8.57749 6.17882 8.5047 6.08333 8.45025C5.89199 8.34161 5.66544 8.31306 5.45311 8.37082C5.24079 8.42858 5.05993 8.56798 4.95 8.75859C4.55974 9.42296 4.31014 10.1604 4.21667 10.9253C3.52137 11.0946 2.89902 11.4832 2.44167 12.0336C2.05267 12.4904 1.79418 13.0437 1.69347 13.6352C1.59276 14.2267 1.65356 14.8344 1.86946 15.3942C2.08536 15.954 2.44835 16.4451 2.92014 16.8158C3.39192 17.1865 3.95501 17.4229 4.55 17.5003H4.65833H14.1667C15.1661 17.4975 16.1313 17.1356 16.8862 16.4805C17.641 15.8254 18.1352 14.9208 18.2787 13.9317C18.4222 12.9426 18.2053 11.9349 17.6677 11.0923C17.1301 10.2498 16.3075 9.62852 15.35 9.34192ZM12.3917 7.50025C12.3917 7.50025 12.3917 7.50025 12.3917 7.45025C12.4349 7.39963 12.4713 7.34361 12.5 7.28359C12.5789 7.078 12.5733 6.84953 12.4843 6.64809C12.3953 6.44666 12.2302 6.28865 12.025 6.20859C11.5589 6.03554 11.0708 5.92894 10.575 5.89192C10.4917 5.89192 10.4083 5.89192 10.325 5.89192C10.1003 5.87524 9.87469 5.87524 9.65 5.89192C9.56395 5.88747 9.47772 5.88747 9.39167 5.89192C8.89587 5.92894 8.40776 6.03554 7.94167 6.20859C7.74255 6.29497 7.585 6.45563 7.50251 6.65639C7.42003 6.85715 7.41913 7.08217 7.5 7.28359C7.52839 7.33933 7.56187 7.39233 7.6 7.44192C7.59724 7.47241 7.59724 7.50309 7.6 7.53359C7.65514 7.62838 7.72844 7.71136 7.81571 7.77777C7.90298 7.84418 8.0025 7.89271 8.10856 7.92058C8.21462 7.94845 8.32514 7.95511 8.43378 7.94018C8.54243 7.92526 8.64705 7.88903 8.74167 7.83359C9.12382 7.62049 9.55411 7.50863 9.99167 7.50863C10.4292 7.50863 10.8595 7.62049 11.2417 7.83359C11.3386 7.88902 11.4458 7.9244 11.5567 7.93762C11.6676 7.95084 11.78 7.94163 11.8873 7.91054C11.9946 7.87944 12.0945 7.8271 12.1811 7.75662C12.2678 7.68613 12.3394 7.59895 12.3917 7.50025ZM9.16667 10.0003C9.16667 10.1651 9.21554 10.3262 9.30711 10.4632C9.39868 10.6003 9.52883 10.7071 9.6811 10.7702C9.83337 10.8332 10.0009 10.8497 10.1626 10.8176C10.3242 10.7854 10.4727 10.7061 10.5893 10.5895C10.7058 10.473 10.7852 10.3245 10.8173 10.1628C10.8495 10.0012 10.833 9.83362 10.7699 9.68135C10.7068 9.52908 10.6 9.39893 10.463 9.30736C10.3259 9.21579 10.1648 9.16692 10 9.16692C9.77899 9.16692 9.56703 9.25472 9.41075 9.411C9.25447 9.56728 9.16667 9.77924 9.16667 10.0003Z"
                      fill="white"
                      stroke-width="0.5"
                    />
                  </svg>
                </div>
                <p className="gradient-text mr-5 text-[20px] font-light md:mr-10">
                  run
                </p>
              </button>
            </div>
          )}
        </div>
        {/* Inputs */}
        <div className="flex flex-col px-6 ">
          <div className="flex w-full items-center justify-between">
            <p className="mt-5 text-xl font-thin text-[#0C071D]">
              Inputs
              {method.inputs.length > 0 ? (
                <span className="pl-1 font-normal">{`(${method.inputs.length})`}</span>
              ) : null}
            </p>
            {method.inputs.filter((d, i) => d.required).length > 0 && (
              <p className="mt-5 text-xl font-thin italic text-dark-orange ">
                <span className="font-semibold">
                  {" "}
                  {handleDisplayRequiredInputs()}{" "}
                </span>{" "}
                required input remaining...
              </p>
            )}
          </div>
          <div
            id="inputparams-container"
            className="flex w-full flex-col gap-0 pt-4"
          >
            {method.inputs.map((input, index) => {
              const inputLength = method.inputs.length;
              const showBottomBorder =
                inputLength > 1 && index !== inputLength - 1;

              const isLastItem = index === inputLength - 1;
              const isFirstItem = index === 0;
              return (
                <InputParams
                  key={"inputparams" + index}
                  index={index}
                  handleUpdateParent={handleUpdateParent}
                  handleRemoveKey={handleRemoveKey}
                  showBottomBorder={showBottomBorder}
                  inputsLength={method.inputs.length - 1}
                  isLastItem={isLastItem}
                  isFirstItem={isFirstItem}
                  {...input}
                />
              );
            })}
          </div>
        </div>
        {/* Orange Line */}
        <div className="mx-5 mt-10 h-[6px] bg-[#F79327]"></div>
      </div>
    </div>
  );
};

export default RpcTopRight;

type InputParamsProps = MethodInputs & {
  handleUpdateParent: (index: number, value: string | number | boolean) => void;
  handleRemoveKey: (index: number) => void;
  index: number;
  showBottomBorder: boolean;
  isLastItem: boolean;
  isFirstItem: boolean;
  inputsLength: number;
};
const InputParams = ({
  handleUpdateParent,
  description,
  index,
  method,
  required,
  type,
  defaultValue,
  handleRemoveKey,
  showBottomBorder,
  isLastItem,
  isFirstItem,
  inputsLength,
  enumValues,
}: InputParamsProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [focused, setFocused] = useState(false);

  const [err, setErr] = useState<null | string>(null);

  const [value, setValue] = useState("");
  const [parsedValue, setParsedValue] = useState<
    string | number | boolean | null
  >(null);

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      //setValue(defaultValue.toString());
      setParsedValue(defaultValue);
      setIsValid(true);
    }
  }, []);
  useEffect(() => {
    if (isValid) {
      if (parsedValue !== null) {
        handleUpdateParent(index, parsedValue);
      }
    } else {
      if (defaultValue !== undefined) {
        handleUpdateParent(index, defaultValue);
      } else {
        handleRemoveKey(index);
      }
    }
  }, [isValid, parsedValue]);

  // create a useEffect that will get the width of the parent container container so that way i can ensure the text area is the same width
  // as the parent container

  useEffect(() => {
    // get the width of element by id inputparams-container
    const container = document.getElementById("inputparams-container");
    if (container && textAreaRef.current) {
      const width = container.offsetWidth;

      textAreaRef.current.style.width = `${width}px`;
    }
  }, []);
  const handleBooleanChange = (value: boolean) => {
    setParsedValue(value);
    //setValue(value.toString());
    setIsValid(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    if (type === PARAMETER_TYPE.string) {
      // if the value is string then it's almost always valid
      setValue(inputValue);
      handleUpdateParent(index, inputValue);
      setParsedValue(inputValue);
      if (isValid === false) {
        setIsValid(true);
      }
    } else if (type === PARAMETER_TYPE.number) {
      if (inputValue.match(/^[0-9]*$/)) {
        const parsedValue = parseInt(inputValue);
        setParsedValue(parsedValue);

        setValue(inputValue);

        handleUpdateParent(index, parsedValue);
        if (err) {
          setErr(null);
        }
        if (isValid === false) {
          setIsValid(true);
        }
      } else {
        setErr("Only numbers are allowed");
        setValue(inputValue);
        if (true) {
          setIsValid(false);
        }
      }
    } else if (type === PARAMETER_TYPE.three) {
      // ensure input is a number and it's less than 3 but more than 0
      if (
        inputValue.match(/^[0-9]*$/) &&
        parseInt(inputValue) <= 3 &&
        parseInt(inputValue) > 0
      ) {
        const parsedValue = parseInt(inputValue);
        setParsedValue(parsedValue);

        setValue(inputValue);

        handleUpdateParent(index, parsedValue);
        if (err) {
          setErr(null);
        }
        if (isValid === false) {
          setIsValid(true);
        }
      } else {
        setErr("Only numbers are allowed and it must be less than 3");
        setValue(inputValue);
        if (true) {
          setIsValid(false);
        }
      }
    }
  };

  const handleSelectEnum = (index: number) => {
    if (enumValues) {
      setParsedValue(enumValues[index]);
      setIsValid(true);
    }
  };
  const firstItemBorder =
    inputsLength >= 1
      ? "rounded-tl-[40px] rounded-tr-[40px]"
      : "rounded-tl-full rounded-tr-full";
  const lastItemBorder =
    inputsLength >= 1
      ? "rounded-bl-[40px] rounded-br-[40px]"
      : "rounded-bl-full rounded-br-full";
  return (
    <div
      className={classNames(
        "flex w-full  bg-[#F3F3F3]",
        isFirstItem && firstItemBorder,
        isLastItem && lastItemBorder
      )}
      style={{ position: "relative" }}
    >
      <textarea
        className={classNames(
          " no-outline h-[72px] w-full   resize-y bg-transparent py-5 pl-10 pr-16 text-lg text-black ",
          isFirstItem && firstItemBorder,
          isLastItem && lastItemBorder
        )}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={handleChange}
        value={value}
        disabled={
          type === PARAMETER_TYPE.boolean || type === PARAMETER_TYPE.enum
        }
        ref={textAreaRef}
      ></textarea>

      {showBottomBorder && (
        <div
          style={{
            position: "absolute",
            bottom: "2px",
            width: "95%",
            height: "2px",
            transform: "translateX(3%)",
            backgroundColor: "rgb(156 163 175)",
          }}
        ></div>
      )}
      <AnimatePresence>
        {!value && !focused && (
          <motion.span
            key="input-param-span-1"
            initial={{ x: "0", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
            style={{
              position: "absolute",
              top: "30%",
              left: "40px",
              transform: "translateY(-50%)",
              color: "black",
              cursor: "text",
            }}
            onClick={() =>
              type === PARAMETER_TYPE.boolean
                ? null
                : textAreaRef.current && textAreaRef.current.focus()
            }
            className="text-[12px] md:text-[16px]"
          >
            <strong>{method}</strong>{" "}
            {required ? (
              <>
                {" "}
                <strong className="text-italic text-xs">(required)</strong>{" "}
                {" - "}{" "}
              </>
            ) : (
              " "
            )}
            {description}
          </motion.span>
        )}
        {err !== null && value !== "" && (
          <span
            key="input-param-span-2"
            style={{
              position: "absolute",
              top: "40%",
              right: "40px",
              transform: "translateY(-50%)",
              color: "red",
              cursor: "text",
            }}
            className="text-[12px] md:text-[16px]"
          >
            <strong>{err}</strong>{" "}
          </span>
        )}
        {type === PARAMETER_TYPE.boolean && (
          <motion.div
            key="input-param-div-3"
            style={{
              position: "absolute",

              right: "100px",
            }}
            className="absolute flex h-full flex-col justify-center text-[12px] md:text-[16px]"
          >
            <div className="flex h-[42px] w-[222px] flex-row items-center justify-between rounded-full bg-[#F3F3F3]">
              <button
                className={`ml-1 h-[30px] w-[100px] rounded-full border-2 border-[#0C071D] ${
                  parsedValue === true
                    ? "bg-[#0C071D] text-white"
                    : "bg-white text-[#0C071D]"
                }`}
                onClick={() => handleBooleanChange(true)}
              >
                TRUE
              </button>
              <button
                className={`mr-1 h-[30px] w-[100px] rounded-full border-2 border-[#0C071D] ${
                  parsedValue === false
                    ? "bg-[#0C071D] text-white"
                    : "bg-white text-[#0C071D]"
                }`}
                onClick={() => handleBooleanChange(false)}
              >
                FALSE
              </button>
            </div>
          </motion.div>
        )}

        {type === PARAMETER_TYPE.enum && (
          <motion.div
            key="input-param-div-4"
            style={{
              position: "absolute",

              right: "100px",
            }}
            className="absolute flex h-full flex-col justify-center text-[12px] md:text-[16px]"
          >
            <div className="flex h-[42px]  flex-row items-center justify-between rounded-full bg-[#F3F3F3]">
              {enumValues &&
                enumValues.map((d, i) => {
                  return (
                    <button
                      key={"enum" + i}
                      onClick={() => handleSelectEnum(i)}
                      className={`ml-1 h-[30px] rounded-full border-2 border-[#0C071D] px-4 ${
                        parsedValue === d
                          ? "bg-[#0C071D] text-white"
                          : "bg-white text-[#0C071D]"
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
            </div>
          </motion.div>
        )}

        {isValid && parsedValue !== null && err == null && (
          <motion.div
            key="input-param-div-5"
            initial={{ x: "0", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
            style={{
              right: "45px",
            }}
            className="absolute flex h-full flex-col justify-center text-[12px] md:text-[16px]"
          >
            <CheckCircleIcon className="h-10 w-10 text-dark-orange" />
          </motion.div>
        )}
        {required && !isValid && (
          <motion.div
            key="input-param-div-6"
            initial={{ x: "0", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
            style={{
              right: "45px",
            }}
            className="absolute flex h-full flex-col justify-center text-[12px] md:text-[16px]"
          >
            <div
              className={classNames(
                "h-8 w-8 rounded-full border-2 border-dark-orange transition-all ",
                isValid && "bg-dark-orange"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
