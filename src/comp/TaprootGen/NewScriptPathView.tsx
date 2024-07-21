import { classNames } from "@/utils";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Address, Script, Signer, Tap, Tx } from "@cmdcode/tapscript";
import * as secp256k1 from "@noble/secp256k1";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import TaprootGenScriptGenIcon from "@/../public/TaprootGenScriptGenIcon.svg";
import TapRootGenParnetIcon from "@/../public/TapRootGenParnetIcon.svg";

import { SCRIPT_OUTPUT_TEMPLATES } from "./TEMPLATE_GEN_DATA";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  NodeProps,
  Handle,
  Position,
  EdgeProps,
  Edge,
} from "react-flow-renderer";

import "reactflow/dist/style.css";

import { MerkleTree } from "./BinaryTree";

import TemplateOutputGen from "./TemplateOutputGen";

enum TapLeafState {
  ADDING,
  EDITING,
  NONE,
}

import SelectTapLeaf from "./SelectTapLeaf";
import { OUTPUT_TYPE, SCRIPT_OUTPUT_TYPE } from "./TemplateOutputGen";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  activeTaprootComponent,
  globalMerkelRoot,
  internalPublicKey,
  TaprootNodes,
  taprootOutputKey,
} from "../atom";
import { NewMerkleTree } from "./newBinaryTree";
import { Input } from "./UI/input";
import { Taproot } from "./taprootTree";
import { getBezierPath } from "reactflow";
import { TaprootGenComponents } from "./TaprootParent";
// cusotm edge
interface CustomEdgeProps {
  edge: Edge;
}

//TODO:
// 1. always display the input field in the top
// 2. then you can grab the node Data from the script

function cutAtFirstFullStop(text: string) {
  const fullStopIndex = text.indexOf(".");

  if (fullStopIndex !== -1) {
    return text.substring(0, fullStopIndex + 1);
  }
  return text;
}

const CustomEdge = (props: EdgeProps) => {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } =
    props;
  const midY = (sourceY + targetY) / 2;

  const midX = (sourceX + targetX) / 2;

  const path = `
    M ${sourceX} ${sourceY}
    L ${sourceX} ${sourceY + 20}
    L ${midX} ${sourceY + 20}
    L ${midX} ${targetY - 20}
    L ${targetX} ${targetY - 20}
    L ${targetX} ${targetY}
  `;

  return (
    <path
      className="react-flow__edge-path"
      d={path}
      style={{
        fill: "none",
        stroke: "#6C5E70",
        strokeWidth: 2,
        strokeDasharray: "5,5",
      }}
    />
  );
};
const CustomEdge2 = (props: EdgeProps) => {
  const { sourceX, sourceY, targetX, targetY } = props;

  // Calculate the midpoint between source and target
  const midX = (sourceX + targetX) / 2;

  // Create the path for a stepped edge
  const path = `
    M ${sourceX},${sourceY}
    L ${midX},${sourceY}
    L ${midX},${targetY}
    L ${targetX},${targetY}
  `;
  return (
    <g>
      <path
        className="react-flow__edge-path"
        d={`M${sourceX},${sourceY}L${targetX},${targetY}`}
        style={{
          fill: "none",
          stroke: "#6C5E70", // Light gray color
          strokeWidth: 2,
          strokeDasharray: "5,5", // Dashed line
        }}
      />
    </g>
  );
};
// Custom node component for parent nodes
const ParentNode = (props: NodeProps) => {
  console.log("props", props);
  const { data } = props;

  const lengthOfLetterId = data.letterId.length;

  // make 4 differnet ca
  // we need to dynmically handle the size of the text for the id cause that will overflow so fast
  return (
    <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-dark-orange p-4">
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
          }}
        >
          <p className="text-[12px] font-bold text-white">
            {` ${data.letterId}`}
          </p>
        </div>
      </div>

      <Handle
        style={{
          opacity: 0,
        }}
        type="target"
        position={Position.Top}
      />
      {/* <div style={{ fontWeight: "bold", color: "#111827" }}>
        {data.label.slice(0, 4) + "..." + data.label.slice(-4)}
      </div> */}
      <Handle
        style={{
          opacity: 0,
        }}
        type="source"
        position={Position.Bottom}
      />
    </div>
  );
};

// Custom node component for child nodes
const ChildNode = ({ data }: NodeProps) => {
  return (
    <div className="flex flex-col items-center">
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
              className="overflow-hidden overflow-x-visible text-ellipsis whitespace-nowrap px-2"
            >
              {data.value}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-full px-3 py-2">
          <div className="flex items-center justify-between">
            <p className="overflow-hidden overflow-x-visible text-ellipsis whitespace-nowrap px-2">
              {data.title}
            </p>
            <p className="overflow-hidden overflow-x-visible text-ellipsis whitespace-nowrap px-2 text-xs">
              {data.outputType}
            </p>
          </div>
        </div>

        <div className="px-5  py-2">
          <p>{cutAtFirstFullStop(data.description)}</p>
        </div>

        <div className="flex w-full items-center justify-center gap-2 px-4 py-2">
          <div className="w-1/2 flex-col text-xs ">
            <p>Version</p>
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
            <p>Script Size</p>
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
          <p className="flex items-center">
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

const nodeTypes = {
  parentNode: ParentNode,
  childNode: ChildNode,
};

const edgeTypes = {
  bitEdge: CustomEdge,
};

const NewScriptPathview = () => {
  const [userScripts, setUserScripts] = useState<string[]>([]);

  const [userTweakedKey, setUserTweakedKey] = useState("");

  const [showTapLeafSelection, setShowTapLeafSelection] = useState(false);

  // state for showing template script view
  const [showScriptSandbox, setShowScriptSandbox] = useState(false);

  // Current selected template script
  const [scriptTemplate, setScriptTemplate] =
    useState<SCRIPT_OUTPUT_TYPE | null>(null);

  const [tapLeafState, setTapLeafState] = useState(TapLeafState.NONE);

  const [validKey, setValidKey] = useState(false);
  const [merkelRoot, setMerkelRoot] = useState("");

  // [width, height]
  const [merkleFlowDimensions, setMerkleFlowDimensions] = useState([0, 0]);

  const [edges, setEdges] = useState<any[]>([]);
  const [nodes, setNodes] = useState<any[]>([]);

  //global state
  const [tapLeaves, setTapLeaves] = useAtom(TaprootNodes);
  const taprootInternalPubKey = useAtomValue(internalPublicKey);
  const setGlobalMerkelRoot = useSetAtom(globalMerkelRoot);
  const [taprootComponent, setTaprootcomponent] = useAtom(
    activeTaprootComponent
  );
  const [taprootOutput, setTaprootOutput] = useAtom(taprootOutputKey);
  /* 
    1) user enters a TagHash(TapTweak) | Internal Public Key | Merkle Root
    2) text pop up appears saying to hit enter when done to move forward
    3) the selection of taproot outputs view is shown
  */

  // we need a useEffect that will listen to the user hitting enter

  // need a event listener for the enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setUserHitsEnter();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (merkleFlowDimensions[0] === 0) {
      getWidthHeightMerkleNode();
    }
  }, []);

  useEffect(() => {
    // calcualte nodes and edges based on screen size
    if (merkleFlowDimensions[0] !== 0 && tapLeaves.length > 0) {
      calculateNodesAndEdges();
    }
  }, [merkleFlowDimensions, userScripts]);
  const getWidthHeightMerkleNode = () => {
    // fetch the width and height of the merkle-flow div
    const merkleFlow = document.getElementById("merkle-flow");
    if (merkleFlow) {
      const width = merkleFlow.offsetWidth;
      const height = merkleFlow.offsetHeight;
      setMerkleFlowDimensions([width, height]);
    }
  };

  // handle the enter key event
  const setUserHitsEnter = () => {
    //add a new tapleaf
    setTaprootcomponent(TaprootGenComponents.TapLeafSelectionPage);
  };

  useEffect(() => {
    // check if valid
    checkIfValid();
  }, [userTweakedKey]);

  const checkIfValid = () => {
    // if key length is more than 2 charachters then it is valid

    if (userTweakedKey.length > 2) {
      if (!validKey) setValidKey(true);
    } else {
      if (tapLeafState === TapLeafState.ADDING) {
        setTapLeafState(TapLeafState.NONE);
      }
      setValidKey(false);
    }
  };

  console.log("tapLeafState", tapLeafState);
  console.log("validKey", validKey);

  const calculateNodesAndEdges = async () => {
    console.log("userScripts", userScripts);
    const merkelTree = new NewMerkleTree(tapLeaves);

    // get the merkel root and then display it in the input field

    const tapData = new Taproot(tapLeaves, taprootInternalPubKey);
    const merkelRoot = tapData.getMerkelRoot();
    const outputKey = tapData.getTaprootTweakedPubKey();
    console.log("this is the output Key: ", outputKey);
    setTaprootOutput(outputKey);
    console.log("this is the merkelRoot: ", merkelRoot);
    setMerkelRoot(merkelRoot);
    setGlobalMerkelRoot(merkelRoot);
    //save this to the state variable

    const flowNodesAndThings = merkelTree.toReactFlowNodes(
      merkleFlowDimensions[0],
      merkleFlowDimensions[1]
    );

    setNodes(flowNodesAndThings.nodes);
    setEdges(flowNodesAndThings.edges);
  };

  const addTabLeaf = (leaf: string, type: OUTPUT_TYPE) => {
    // add the leaf to the list
    // should be added with it's index at the end

    // get the length of current scripts
    const index = userScripts.length + 1;
    setUserScripts([...userScripts, `${leaf}:${index}`]);

    // hide the tapleaf selection
    setShowTapLeafSelection(false);
    setTapLeafState(TapLeafState.NONE);

    // find the script template of id type

    const foundScriptTemplate = SCRIPT_OUTPUT_TEMPLATES.find(
      (template) => template.outputType === type
    );

    if (foundScriptTemplate) {
      // set the script template
      setScriptTemplate(foundScriptTemplate);

      // show the script template
      setShowScriptSandbox(true);
    }
  };

  const handleExitScriptTemplate = () => {
    // revert back scriptTemplate to null
    setScriptTemplate(null);

    // hide the script template
    setShowScriptSandbox(false);
  };
  return (
    <div
      style={{
        //minHeight: "calc(100vh - 110px)",
        minHeight: "92vh",
        // paddingLeft: "240px",
      }}
      className=" flex h-full w-full flex-col gap-4 overflow-auto bg-dark-purple"
    >
      <div className="mx-auto grid w-full max-w-4xl  items-center gap-1 text-sm">
        <div className="flex w-full justify-between">
          <label>ScriptPath Tweak</label>
          <p>
            <span>{tapLeaves.length} </span>
            {tapLeaves.length === 1 ? "Tapleaf" : "Tapleafs"}
          </p>
        </div>
        <Input
          // disabled={true}
          value={merkelRoot}
          name="merkel-root"
          id="merkel-root"
          className="w-full"
        />
        <p>
          press
          <span className="text-dark-orange"> enter </span>
          to add a new tapleaf
        </p>
      </div>
      <div id="merkle-flow" className="flex-1">
        <div
          style={{
            height: merkleFlowDimensions[1] + "px",
            width: merkleFlowDimensions[0] * 1.2 + "px",
          }}
          className="mx-auto"
        >
          <ReactFlow
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
          >
            {/* <Controls /> */}
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default NewScriptPathview;
