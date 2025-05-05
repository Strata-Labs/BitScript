import { classNames } from "@/utils";
import { useEffect, useState } from "react";
import ReactFlow from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const MerkleTreeNodes = () => {
  const [validTree, setValidTree] = useState(false);
  // [width, height]
  const [merkleFlowDimensions, setMerkleFlowDimensions] = useState([0, 0]);

  useEffect(() => {
    if (merkleFlowDimensions[0] === 0) {
      getWidthHeightMerkleNode();
    }
  }, []);
  const getWidthHeightMerkleNode = () => {
    // fetch the width and height of the merkle-flow div
    const merkleFlow = document.getElementById("merkle-flow");
    if (merkleFlow) {
      const width = merkleFlow.offsetWidth;
      const height = merkleFlow.offsetHeight;
      setMerkleFlowDimensions([width, height]);
    }
  };

  return (
    <div
      style={{
        minHeight: "92vh",
        paddingLeft: "240px",
      }}
      className="min-height-[92vh] flex h-full w-full flex-col gap-4 overflow-auto"
    >
      <div className="flex flex-1 flex-col gap-4 bg-[#f8f8f8] p-12">
        <p className=" text-[20px] font-semibold text-[#0C071D]">
          Script Summary
        </p>
        <div className="flex  flex-1 flex-col rounded-3xl bg-[#EEEEEE]">
          <div className="flex w-full flex-row justify-between px-12 py-6">
            <div className="flex flex-row gap-2">
              <p className="text-[16px] font-bold text-[#0C071D]">
                Merkle Tree Visualizer
              </p>
              <p className="text-[13px] font-normal text-[#0C071D]">
                smt = TapTweak(PubKey, MerkleTree)
              </p>
            </div>
            <div>
              <p className="text-[13px] font-normal text-[#0C071D]">tap leaf</p>
            </div>
          </div>
          <div className="h-[1px] w-full bg-[#aeaeae]" />
          <div id="merkle-flow" className="flex-1">
            <div
              style={{
                height: merkleFlowDimensions[1] + "px",
                width: merkleFlowDimensions[0] + "px",
              }}
            >
              <ReactFlow nodes={initialNodes} edges={initialEdges} />
            </div>
          </div>
        </div>
        <div className="px-12">
          <button
            className={classNames(
              "flex h-[72px] w-full cursor-pointer items-center justify-between rounded-full px-6 shadow-md transition-all ",
              validTree ? "bg-[#0C071D]" : "bg-[#cacad9]"
            )}
          >
            <p
              className={classNames(
                "mr-5 text-[20px]  font-thin tracking-wider text-white  md:mr-10",
                validTree ? "gradient-text" : "text-white"
              )}
            >
              Generating Transaction Command...Create at least{" "}
              <span className="font-bold"> one input </span> &{" "}
              <span className="font-bold">one output</span>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MerkleTreeNodes;
