import { useAtomValue, useSetAtom } from "jotai";
import { showRpcMainView } from "../../atoms";
import { RPCFunctionParams } from "../../lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";
import { Tabs, TabsList, TabsTrigger } from "../ui/Tab";
import { useState } from "react";
import { InputParams } from "./rpcInput";
import RpcResult from "./rpcResult";

type RpcMainViewProps = {
  method: RPCFunctionParams;
};
enum NETWORK {
  MAINNET = "MAINNET",
  TESTNET = "TESTNET",
}

export default function RpcMainView({ method }: RpcMainViewProps) {
  const [tab, setTab] = useState("MAINNET");
  const setShowMainView = useSetAtom(showRpcMainView);
  const [rpcParams, setRpcParams] = useState<
    Map<number, string | number | boolean>
  >(new Map());
  const [rpcRes, setRpcRes] = useState<any>(null);

  const onTabChange = (value: string) => {
    console.log(" this is the value: ", value);
    setTab(value);
  };

  const handleRPCCall = async () => {
    try {
    // get the rpc params
    // convert map into array of values

    // get the length of the hash
    const len = rpcParams.size;

    // we must assume that if there are more than 2 inputs the first two are either required or have a default value that must be pushed

    console.log(rpcParams.get(1));

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

    console.log("this is the paramsRes: ", paramsRes);

    if (tab === NETWORK.MAINNET) {
      const header = new Headers();
      header.append("Content-Type", "application/json");
      // header.append("access-control-allow-origin", "*");
      const raw = JSON.stringify({
        method: method.method,
        params: paramsRes,
      });

      const requestOptions = {
        method: "POST",
        headers: header,
        body: raw,
      };

      console.log("this is the request options: ", requestOptions);
      const response = await fetch(
        "https://bitscript-git-stage-setteam.vercel.app/api/handleReplitRPC",
        requestOptions, 
      );

      console.log(" this is the response:  ", response)

      const data = await response.json();
      console.log("this is the data: ", data);
      setRpcRes(data);
    } else {
      //handle the testnet rpc call
    }
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleUpdateParent = (
    key: number,
    value: string | number | boolean
  ) => {
    console.log("dhandleUpdateParent ", key, value);
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
  return (
    <div className="flex h-full w-full flex-col items-center px-5">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-end" onClick={() => setShowMainView(false)}>
          <div className="cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              rotate="180deg"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2  mt-[7px] md:ml-0"
            >
              <g transform="rotate(180 12 12)">
                <path
                  d="M8.99978 19.7498C8.80778 19.7498 8.61575 19.6768 8.46975 19.5298C8.17675 19.2368 8.17675 18.7618 8.46975 18.4688L14.9397 11.9988L8.46975 5.52883C8.17675 5.23583 8.17675 4.7608 8.46975 4.4678C8.76275 4.1748 9.23779 4.1748 9.53079 4.4678L16.5308 11.4678C16.8238 11.7608 16.8238 12.2358 16.5308 12.5288L9.53079 19.5288C9.38379 19.6768 9.19178 19.7498 8.99978 19.7498Z"
                  fill="#F79327"
                />
              </g>
            </svg>
          </div>
          <p className=" text-xl font-bold">{method.method} </p>
        </div>

        <Tabs
          value={tab}
          onValueChange={onTabChange}
          defaultValue="MAINNET"
          className="text-md h-fit w-48 rounded-full border-none bg-gray-100"
        >
          <TabsList className="grid h-fit w-48 grid-cols-2 border-none px-1 py-1">
            <TabsTrigger value="MAINNET">mainnet</TabsTrigger>
            <TabsTrigger value="TESTNET"> testnet</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="ml-6 mt-3 w-full pr-4">
        <Accordion type="single" defaultValue="item-1" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-semibold">
              Description
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              {method.description}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div
        id="inputparams-container"
        className="flex h-full w-full flex-col gap-4 rounded-lg pt-4"
      >
        {method.inputs.map((input, index) => {
          return (
            <InputParams
              key={"inputparams" + index}
              index={index}
              handleUpdateParent={handleUpdateParent}
              handleRemoveKey={handleRemoveKey}
              {...input}
            />
          );
        })}
      </div>

      <div className="h-full w-full">
        <RpcResult
          method={method}
          rpcRes={rpcRes}
          handleRpcRun={handleRPCCall}
        />
      </div>
    </div>
  );
}
