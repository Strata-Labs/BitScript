import Image from "next/image";
import TapRootGenParnetIcon from "@/../public/TapRootGenParnetIcon.svg";
import { NodeProps, Handle, Position } from "react-flow-renderer";
import { cutAtFirstFullStop } from "../utils/helpers";
import { useAtom, useSetAtom } from "jotai";
import {
  activeTaprootComponent,
  currentScriptTemplate,
  selectedTaprootNode,
  TaprootNodes,
} from "@/comp/atom";
import { SCRIPT_OUTPUT_TEMPLATES } from "../TEMPLATE_GEN_DATA";
import { TaprootGenComponents } from "../types";

// Custom node component for child nodes
export const ChildNode = ({ data }: NodeProps) => {
  const [taprootNode, setTaprootNode] = useAtom(TaprootNodes);
  const setCurrentScriptTemplate = useSetAtom(currentScriptTemplate);
  const setSelectedTaprootNode = useSetAtom(selectedTaprootNode);
  const setTaprootComponent = useSetAtom(activeTaprootComponent);
  console.log("this is the node data: ", JSON.stringify(data, null, 2));
  const handleOnSelect = () => {
    // filter the taproot node by the id
    // then pass the node to the template component
    // then navigate to the template component
    const foundScriptTemplate = SCRIPT_OUTPUT_TEMPLATES.find(
      (template) => template.outputType === data.outputType
    );
    const foundTaprootNode = taprootNode.find((node) => node.id === data.id);

    if (foundScriptTemplate && foundTaprootNode) {
      // then set all the necessary atoms
      console.log("call this");
      setSelectedTaprootNode(foundTaprootNode);
      setCurrentScriptTemplate(foundScriptTemplate);
      setTaprootComponent(TaprootGenComponents.TapLeafTemplateView);
    }
  };
  return (
    <div className="flex flex-col items-center" onClick={handleOnSelect}>
      <div className="flex h-20 w-20 flex-row items-center justify-center rounded-full bg-dark-orange p-4">
        <div className="relative">
          <Image
            src={TapRootGenParnetIcon}
            height={40}
            width={40}
            alt="TapRootGenParnetIcon"
          />
          <div
            className="flex h-[25px] w-[25px] flex-col items-start justify-center bg-dark-orange px-2 py-1"
            style={{
              position: "absolute",
              bottom: "0px",
              right: "-4px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {` ${data.letterId}`}
          </div>
        </div>

        <Handle
          style={{
            opacity: 0,
          }}
          type="target"
          position={Position.Top}
        />
      </div>
      <div className="flex  w-72 max-w-md flex-col rounded-2xl bg-lighter-dark-purple pb-3 ">
        <div className="flex flex-row items-center justify-center rounded-full bg-[#29243A] px-4 py-2">
          <div className="flex w-full flex-row items-center justify-center rounded-full bg-lighter-dark-purple py-2">
            <div
              style={{ fontWeight: "bold", color: "white" }}
              className="overflow-hidden overflow-x-visible text-ellipsis whitespace-nowrap px-2 text-white"
            >
              {data.value}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-full px-3 py-2">
          <div className="flex items-center justify-between">
            <p className="overflow-hidden overflow-x-visible text-ellipsis whitespace-nowrap px-2 text-white">
              {data.title}
            </p>
            <p className="overflow-hidden overflow-x-visible text-ellipsis whitespace-nowrap px-2 text-xs text-white">
              {data.outputType}
            </p>
          </div>
        </div>

        <div className="px-5  py-2">
          <p className="text-white">{cutAtFirstFullStop(data.description)}</p>
        </div>

        <div className="flex w-full items-center justify-center gap-2 px-4 py-2">
          <div className="w-1/2 flex-col text-xs ">
            <p className="text-white">Version</p>
            <div className="flex w-24  rounded-full bg-[#29243A] p-2">
              <div
                style={{ fontWeight: "bold", color: "white" }}
                className="overflow-hidden overflow-x-visible text-ellipsis whitespace-nowrap"
              >
                {"0xc0"}
              </div>
            </div>
          </div>
          <div className="w-1/2 flex-col text-xs">
            <p className="text-white">Script Size</p>
            <div className="flex w-24  rounded-full bg-[#29243A] p-2">
              <div
                style={{ fontWeight: "bold", color: "white" }}
                className="overflow-hidden overflow-x-visible text-ellipsis whitespace-nowrap"
              >
                0x{data.size}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-row items-center justify-center rounded-full bg-[#29243A] px-4 py-2">
          <div className="flex flex-row items-center justify-center rounded-full bg-lighter-dark-purple px-2 py-2">
            <div style={{ fontWeight: "bold", color: "white" }}>
              {data.ogData}
            </div>
          </div>
        </div> */}

        <div className="w-full flex-col px-4 py-2 text-xs">
          <p className="flex items-center text-white">
            <span className="mr-2">&lt;&gt;</span>Script
          </p>

          <div className="flex w-full  rounded-full bg-[#29243A] p-2">
            <div
              style={{ fontWeight: "bold", color: "white" }}
              className="overflow-hidden overflow-x-visible text-ellipsis whitespace-nowrap"
            >
              {data.value}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
