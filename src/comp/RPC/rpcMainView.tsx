import { RPCFunctionParams } from "@/const/RPC";
import RpcLeftColumn from "./rpcLeftColumn";
import RpcRightColumn from "./rpcRightColumn";
import RpcTopRight from "./rpcTopRight";
import CustomHead from "@/comp/CustomHead";

type RpcMainViewProps = {
  method: RPCFunctionParams;
};
const RpcMainView = ({ method }: RpcMainViewProps) => {
  return (
    <div className="h-screen md:ml-[240px]">
      <CustomHead
        meta={{ title: method.method, description: method.description }}
      />
      <div className="flex h-full w-full flex-col md:flex-row">
        <RpcLeftColumn method={method} />
        <div className="mt-5 flex h-full w-full flex-col md:ml-5 md:mt-0">
          <RpcRightColumn method={method} />
        </div>
      </div>
    </div>
  );
};

export default RpcMainView;
