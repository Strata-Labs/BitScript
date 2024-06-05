import { classNames } from "@/utils";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import TaprootGenScriptGenIcon from "@/../public/TaprootGenScriptGenIcon.svg";
import TapRootGenParnetIcon from "@/../public/TapRootGenParnetIcon.svg";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  NodeProps,
  Handle,
  Position,
} from "react-flow-renderer";

import "reactflow/dist/style.css";

import "reactflow/dist/style.css";

import { MerkleTree } from "./BinaryTree";

enum TapLeafState {
  ADDING,
  EDITING,
  NONE,
}

import SelectTapLeaf from "./SelectTapLeaf";

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

      <Handle type="target" position={Position.Top} />
      {/* <div style={{ fontWeight: "bold", color: "#111827" }}>
        {data.label.slice(0, 4) + "..." + data.label.slice(-4)}
      </div> */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

// Custom node component for child nodes
const ChildNode = ({ data }: NodeProps) => {
  return (
    <div className="flex flex-col items-center ">
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

        <Handle type="target" position={Position.Top} />
      </div>
      <div className="flex flex-col rounded-2xl bg-lighter-dark-purple ">
        <div className="flex flex-row items-center justify-center rounded-full bg-[#29243A] px-4 py-2">
          <div className="flex flex-row items-center justify-center rounded-full bg-lighter-dark-purple px-2 py-2">
            <div style={{ fontWeight: "bold", color: "white" }}>
              {data.label.slice(0, 4) + "..." + data.label.slice(-4)}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center rounded-full px-4 py-2">
          <div style={{ fontWeight: "bold", color: "white" }}>Output type</div>
        </div>
        <div className="flex flex-row items-center justify-center rounded-full bg-[#29243A] px-4 py-2">
          <div className="flex flex-row items-center justify-center rounded-full bg-lighter-dark-purple px-2 py-2">
            <div style={{ fontWeight: "bold", color: "white" }}>
              {data.ogData}
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

const TaprootGenParent = () => {
  const [userScripts, setUserScripts] = useState<string[]>([]);

  const [userTweakedKey, setUserTweakedKey] = useState("");

  const [showTapLeafSelection, setShowTapLeafSelection] = useState(false);

  const [tapLeafState, setTapLeafState] = useState(TapLeafState.NONE);

  const [validKey, setValidKey] = useState(false);

  // [width, height]
  const [merkleFlowDimensions, setMerkleFlowDimensions] = useState([0, 0]);

  const [edges, setEdges] = useState<any[]>([]);
  const [nodes, setNodes] = useState<any[]>([]);
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
    if (merkleFlowDimensions[0] !== 0) {
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
    console.log("setUserHitsEnter");
    console.log("tapLeafState", tapLeafState);
    // the point of this is to handle adding a new tapleaf
    /*
      their will be multi steps to adding a tap leaf and enter is only needed when
      - we are not already adding a tapleaf
      - we are editing a tapleaf
    */
    if (tapLeafState === TapLeafState.NONE) {
      // change to add state
      setTapLeafState(TapLeafState.ADDING);
    } else {
      console.log("user hit enter userTweakedKey", userTweakedKey);
      // do nothing
      // if the user is already adding a tapleaf and hit enter with text already in the input lets add it to the list and hide the input things

      if (tapLeafState === TapLeafState.ADDING) {
        // ensure input field is not empty
        if (userTweakedKey.length > 2) {
          // add the userTweakedKey to the list
          setUserScripts([...userScripts, userTweakedKey]);
          // clear the input field
          setUserTweakedKey("");
          // hide the input field
          setTapLeafState(TapLeafState.NONE);
        }
      }
    }
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

  const calculateNodesAndEdges = () => {
    const TEST_DATA = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const merkleTree = new MerkleTree(TEST_DATA);

    console.log("merkleTree", merkleTree);
    const flowNodesAndThings = merkleTree.toReactFlowNodes(
      merkleFlowDimensions[0],
      merkleFlowDimensions[1]
    );

    setNodes(flowNodesAndThings.nodes);
    setEdges(flowNodesAndThings.edges);
  };

  console.log("nodes", nodes);
  console.log("edges", edges);
  return (
    <div
      style={{
        //minHeight: "calc(100vh - 110px)",
        minHeight: "92vh",
        paddingLeft: "240px",
      }}
      className=" flex h-full w-full flex-col gap-4 overflow-auto bg-dark-purple"
    >
      <div className="flex flex-col items-center px-12 ">
        <InputHandler
          setUserTweakedKey={setUserTweakedKey}
          userTweakedKey={userTweakedKey}
        />
      </div>
      <AnimatePresence>
        {tapLeafState === TapLeafState.ADDING && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="flex flex-col items-center px-12 "
          >
            <SelectTapLeaf />
          </motion.div>
        )}
      </AnimatePresence>
      <div id="merkle-flow" className="flex-1">
        <div
          style={{
            height: merkleFlowDimensions[1] + "px",
            width: merkleFlowDimensions[0] + "px",
          }}
        >
          <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges}>
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default TaprootGenParent;

type InputHandlerProps = {
  userTweakedKey: string;
  setUserTweakedKey: (value: string) => void;
};
const InputHandler = (props: InputHandlerProps) => {
  const { userTweakedKey, setUserTweakedKey } = props;

  const placeHolder = "Script Path Tweak";
  return (
    <div
      style={{
        maxWidth: "1200px",
      }}
      className="flex w-full  flex-col items-center gap-2 pt-32"
    >
      <div className="flex w-full items-center justify-between">
        <p>
          <label className="text-[20px] font-semibold text-white">
            {placeHolder}
          </label>
        </p>
        <p className="text-[16px] font-thin text-white">...missing</p>
      </div>
      <div className="flex w-full flex-col items-center">
        <div className="relative w-full">
          <input
            value={userTweakedKey}
            onChange={(e) => setUserTweakedKey(e.target.value)}
            placeholder={placeHolder}
            className="relative h-16 w-full rounded-full border-2 border-dark-orange bg-dark-purple px-8 text-2xl text-white"
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
                userTweakedKey ? "text-dark-orange" : "text-gray-300"
              )}
            />
          </div>
        </div>
        <div className="relative flex w-full flex-row items-center justify-center">
          {
            // if user input is not empty then show the text
          }
          <div
            style={{
              width: "100px",
              height: "70px",
              borderRadius: "0 0 25% 25%",
            }}
            className="flex h-24 w-24 flex-col items-center justify-center  bg-[#f79327]"
          >
            <Image
              src={TaprootGenScriptGenIcon}
              height={40}
              width={40}
              alt="TaprootGenScriptGenIcon"
            />
          </div>
          {userTweakedKey && (
            <p
              className="absolute left-0 
            text-[20px] font-normal text-white"
            >
              hit <span className="text-dark-orange">enter</span> to add a new
              tapleaf
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
