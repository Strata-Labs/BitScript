import React from "react";
import OpCodeContainer from "./OpCodeContainer";
import { ScriptViewListProps } from "./OpCodesViewList";

const ScriptViewGrid = ({ OP_CODES }: ScriptViewListProps) => {
  return (
    <div className="flex flex-col md:ml-[230px] md:flex-row md:flex-wrap">
      {OP_CODES.map((opCode) => {
        return (
          <div className="mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4">
            <OpCodeContainer
              opCodeDescription={opCode.name}
              summary={opCode.info}
              category={opCode.category}
              type={opCode.type}
              linkPath={opCode.linkPath}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ScriptViewGrid;
