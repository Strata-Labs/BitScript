import React from "react";
import ScriptContainer from "./ScriptContainer";
import { ScriptsViewListProps } from "./ScriptViewList";
import { useAtomValue } from "jotai";
import { menuOpen } from "../atom";

// const ScriptViewGrid = () => {
const ScriptViewGrid = ({ SCRIPTS_LIST }: ScriptsViewListProps) => {
  const isMenuOpen = useAtomValue(menuOpen);

  if (isMenuOpen) {
    // Menu is open, hide the component
    return null;
  }

  return (
    <div className="flex flex-col md:ml-[230px] md:flex-row md:flex-wrap">
      {SCRIPTS_LIST.map((script, index) => {
        return (
          <div key={index} className="mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4">
            <ScriptContainer
              longHand={script.longHand}
              shortHand={script.shortHand}
              shortDescription={script.shortDescription}
              introduction={script.introduction}
              inUse={script.inUse}
              numberOfOPs={script.numberOfOps}
              linkPath={script.linkPath}
              image={script.image}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ScriptViewGrid;
