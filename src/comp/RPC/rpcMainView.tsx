import RpcLeftColumn from "./rpcLeftColumn";
import RpcRightColumn from "./rpcRightColumn";
import RpcTopRight from "./rpcTopRight";

export type MethodInputs = {
  method: string;
  description: string;
};

export type RPCFunctionParms = {
  method: string;
  description: string;
  inputs: MethodInputs[];
};

const METHODS: RPCFunctionParms[] = [
  {
    method: "getbestblockhash",
    description:
      "Returns the hash of the best (tip) block in the longest blockchain.",
    inputs: [],
  },
];
const RpcMainView = () => {
  return (
    <div className="h-screen md:ml-[240px]">
      <div className="flex h-full w-full flex-col md:flex-row">
        <RpcLeftColumn method={METHODS[0]} />
        <div className="mt-5 flex h-full w-full flex-col md:ml-5 md:mt-0">
          <RpcRightColumn method={METHODS[0]} />
        </div>
      </div>
    </div>
  );
};

export default RpcMainView;
