import React from "react";
import OpCodeContainer from "./OpCodeContainer";
import { OpCodesViewListProps } from "./OpCodesViewList";
import { useAtomValue } from "jotai";
import { menuOpen } from "../atom";

const OpCodeViewGrid = ({ OP_CODES }: OpCodesViewListProps) => {
  const isMenuOpen = useAtomValue(menuOpen);

  if (isMenuOpen) {
    // Menu is open, hide the component
    return null;
  }
  return (
    <div className="flex flex-col md:ml-[230px] md:flex-row md:flex-wrap">
      {OP_CODES.map((opCode) => {
        console.log("opCode", opCode);
        return (
          <div className="mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4">
            <OpCodeContainer
              opCodeDescription={opCode.name}
              summary={opCode.visualProps.description}
              category={opCode.category}
              type={opCode.type}
              linkPath={opCode.linkPath}
              imageTile={opCode.tileImage}
            />
          </div>
        );
      })}
    </div>
  );
};

export default OpCodeViewGrid;
