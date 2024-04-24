import { RPCFunctionParams } from "../../lib/utils";

type RpcBottomRightProps = {
  rpcRes: null | any;
  method: RPCFunctionParams;
  handleRpcRun: () => void;
};
const RpcResult = ({ method, rpcRes, handleRpcRun }: RpcBottomRightProps) => {
  return (
    <div className="mt-8 h-full w-full">
      {/* General container */}
      <div className="flex h-full justify-center w-full flex-col">
      {/* button */}
        <button onClick={handleRpcRun} className="flex md:w-3/4 mx-auto w-full items-center justify-center gap-2 rounded-full bg-black px-2 py-4 text-lg text-white ">
          <span>
            <img src="/rpc.svg" alt="" />
          </span>

          <p className="gradient-text">run</p>
        </button>
        {/* divider */}
        <div className="mt-6 h-1 w-full rounded-full bg-dark-orange "></div>

        <textarea
          className="mx-5 my-5 h-full cursor-pointer rounded-[32px] bg-[#F3F3F3] py-6 pl-6 pr-16 text-black outline-none"
          placeholder="hex:  Returns the hash of the best (tip) block in the longest blockchain"
          readOnly
          value={rpcRes ? JSON.stringify(rpcRes, null, 2) : ""}
        ></textarea>
      </div>
    </div>
  );
};

export default RpcResult;
