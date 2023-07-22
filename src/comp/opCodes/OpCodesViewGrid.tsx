import React from "react";
import OpCodeContainer from "./OpCodeContainer";

const ScriptViewGrid = () => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap md:ml-[230px]">
      <div className="mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4">
        <OpCodeContainer
          opCodeDescription="OP_Dup"
          summary="Duplicates the top item in the stack"
          category="Stack"
          type="Push"
          linkPath="/OPS/OP_DUP"
        />
      </div>
      <div className="mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4">
        <OpCodeContainer
          opCodeDescription="OP_Equal"
          summary="Returns 1 if the inputs are exactly equal, 0 otherwise."
          category="Constant"
          type="Pop & Push"
          linkPath=""
        />
      </div>
      <div className="mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4">
        <OpCodeContainer
          opCodeDescription="OP_Equal"
          summary="Returns 1 if the inputs are exactly equal, 0 otherwise."
          category="Constant"
          type="Pop & Push"
          linkPath=""
        />
      </div>
      <div className="mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4">
        <OpCodeContainer
          opCodeDescription="OP_Equal"
          summary="Returns 1 if the inputs are exactly equal, 0 otherwise."
          category="Constant"
          type="Pop & Push"
          linkPath=""
        />
      </div>
      <div className="mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4">
        <OpCodeContainer
          opCodeDescription="OP_Equal"
          summary="Returns 1 if the inputs are exactly equal, 0 otherwise."
          category="Constant"
          type="Pop & Push"
          linkPath=""
        />
      </div>
      <div className="mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4">
        <OpCodeContainer
          opCodeDescription="OP_Equal"
          summary="Returns 1 if the inputs are exactly equal, 0 otherwise."
          category="Constant"
          type="Pop & Push"
          linkPath=""
        />
      </div>
    </div>
  );
};

export default ScriptViewGrid;
