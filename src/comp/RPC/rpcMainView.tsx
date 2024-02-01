import RpcLeftColumn from "./rpcLeftColumn";
import RpcRightColumn from "./rpcRightColumn";
import RpcTopRight from "./rpcTopRight";

const RpcMainView = () => {
  return (
    <div className="h-screen md:ml-[240px]">
      <div className="flex h-full w-full flex-col md:flex-row">
        <RpcLeftColumn />
        <div className="mt-5 flex h-full w-full flex-col md:ml-5 md:mt-0">
          <RpcRightColumn />
        </div>
      </div>
    </div>
  );
};

export default RpcMainView;
