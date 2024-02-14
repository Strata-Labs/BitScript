import { useState } from "react";
import RpcBottomRight from "./rpcBottomRight";
import RpcTopRight from "./rpcTopRight";
import { trpc } from "@/utils/trpc";
import { RPCFunctionParams } from "@/const/RPC";

type RpcRightColumnProps = {
  method: RPCFunctionParams;
};

const RpcRightColumn = ({ method }: RpcRightColumnProps) => {
  const [rpcRes, setRpcRes] = useState<any>(null);

  return (
    <div className="flex h-full w-full flex-col bg-[#FAFAFA]">
      <RpcTopRight setRpcRes={setRpcRes} method={method} />
      <RpcBottomRight rpcRes={rpcRes} method={method} />
    </div>
  );
};

export default RpcRightColumn;
