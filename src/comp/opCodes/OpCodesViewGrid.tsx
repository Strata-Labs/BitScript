import React from "react";
import OpCodeContainer from "./OpCodeContainer";

const ScriptViewGrid = () => {
  return (
    <div className="flex flex-col md:ml-[230px] md:flex-row md:flex-wrap">
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
          opCodeDescription="OP_HASH160"
          summary="Hashes the top item on the stack using the SHA-256 and RIPEMD-160 algorithms."
          category="Constant"
          type="Pop & Push"
          linkPath="/OPS/OP_HASH160"
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
