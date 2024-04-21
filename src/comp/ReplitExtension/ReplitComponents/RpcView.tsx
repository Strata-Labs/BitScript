import Link from "next/link";
// remove this and then put it in the constants library so as to further divide the elements better
import { RPCFunctionParams, RPC_METHODS } from "@/const/RPC";

enum ViewType {
  LIST = "LIST",
  GRID = "GRID",
}

export const RpcListView = () => {
  return (
    <div>
      {/* Md screens and larger list */}
      <div className="hidden px-4 sm:px-6 md:flex lg:px-8">
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
                      className="px-3 w-fit py-3.5 text-left text-sm font-light text-[#687588]"
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
                        key={i}
                        className={` border-b border-[#E9EAEC] ${
                          i % 2 === 0 ? "hover-row-white" : "hover-row-grayish"
                        }`}
                      >
                        <td className=" text-sm font-bold text-[#0C071D] sm:pl-3">
                          <Link
                            href={rpc.linkPath}
                            className="block h-full w-full items-center py-4 pl-4 pr-3"
                            target="_blank"
                          >
                            {rpc.method}
                          </Link>
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
                          <Link
                            href={rpc.linkPath}
                            className="block h-full w-full items-center py-4 pl-4 pr-3"
                            target="_blank"
                          >
                            {rpc.summary}
                          </Link>
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
