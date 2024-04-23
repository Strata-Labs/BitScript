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

type RpcMainViewProps = {
  method: RPCFunctionParams;
};

export default function RpcMainView({ method }: RpcMainViewProps) {
  const [tab, setTab] = useState("mainnet");
  const setShowMainView = useSetAtom(showRpcMainView);

  const onTabChange = (value: string) => {
    console.log(" this is the value: ", value);
    setTab(value);
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
          defaultValue="hex"
          className="text-md h-fit w-48 rounded-full border-none bg-gray-100"
        >
          <TabsList className="grid h-fit w-48 grid-cols-2 border-none px-1 py-1">
            <TabsTrigger value="mainnet">mainnet</TabsTrigger>
            <TabsTrigger value="testnet"> testnet</TabsTrigger>
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
    </div>
  );
}
