import RpcBottomRight from "./rpcBottomRight";
import RpcTopRight from "./rpcTopRight";

const RpcRightColumn = () => {
  return (
    <div className="flex h-full w-full flex-col bg-[#FAFAFA]">
      <RpcTopRight />
      <RpcBottomRight />
    </div>
  );
};

export default RpcRightColumn;
