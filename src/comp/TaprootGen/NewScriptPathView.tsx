import { useEffect, useState } from "react";
import ReactFlow, { Edge } from "react-flow-renderer";
import "reactflow/dist/style.css";
import { TaprootGenComponents } from "./types";
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
import { CustomEdge } from "./components/CustomEdge";
import { ParentNode } from "./components/ParentNode";
import { ChildNode } from "./components/ChildNode";
// cusotm edge
interface CustomEdgeProps {
  edge: Edge;
}
const nodeTypes = {
  parentNode: ParentNode,
  childNode: ChildNode,
};
const edgeTypes = {
  bitEdge: CustomEdge,
};

const NewScriptPathview = () => {
  const [userScripts, setUserScripts] = useState<string[]>([]);

  // state for showing template script view
  const [showScriptSandbox, setShowScriptSandbox] = useState(false);
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

  const calculateNodesAndEdges = async () => {
    console.log("userScripts", userScripts);
    const merkelTree = new NewMerkleTree(tapLeaves);
    // const testingInternalPubKey =
    //   "a1633cafcc01ebfb6d78e39f687a1f0995c62fc95f51ead10a02ee0be551b5dc";
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
