import { RPCFunctionParams } from "../../lib/utils";
import { RPC_METHODS } from "../../lib/rpcMethod";
import { useSetAtom } from "jotai";
import { RpcMethod, showRpcMainView } from "../../atoms";

export const RpcListView = () => {
  const setRpcMethod = useSetAtom(RpcMethod);
  const setShowMainView = useSetAtom(showRpcMainView);

  return (
    <div>
      {/* Md screens and larger list */}
      <div className="px-4 sm:px-6 md:flex lg:px-8">
        <div className="w-full overflow-hidden ">
          <div>
            <div className="overflow-hidden overflow-x-auto">
              <table className="w-full table-auto">
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "50%" }} />
                </colgroup>
                {/* Titles */}
                <thead>
                  <tr className="bg-[#FAFAFA]">
                    <th
                      scope="col"
                      className="flex items-center gap-4 py-3.5 pl-4 pr-3 text-left text-sm font-light text-[#687588] sm:pl-3"
                    >
                      <span>Command</span>
                      <img src="/drop-down.svg" alt="" />
                    </th>
                    <th
                      scope="col"
                      className="w-fit px-3 py-3.5 text-left text-sm font-light text-[#687588]"
                    >
                      <div className="flex items-center gap-4 ">
                        Summary
                        <img src="/drop-down.svg" alt="" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {RPC_METHODS.map((rpc: RPCFunctionParams, i) => {
                    return (
                      <tr
                        onClick={() => {
                          setRpcMethod(rpc.method);
                          setShowMainView(true);
                        }}
                        key={i}
                        className={` border-b border-[#E9EAEC] ${
                          i % 2 === 0 ? "hover-row-white" : "hover-row-grayish"
                        }`}
                      >
                        <td className=" text-sm font-bold text-[#0C071D] sm:pl-3">
                          <p className="block h-full w-full items-center py-4 pl-4 pr-3">
                            {rpc.method}
                          </p>
                        </td>
                        <td
                          className="flex h-fit items-center overflow-hidden  text-xs font-light text-[#0C071D]"
                          style={{
                            // maxHeight: "5em",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          <p className="block h-full w-full items-center py-4 pl-4 pr-3">
                            {rpc.summary}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RpcListView;
