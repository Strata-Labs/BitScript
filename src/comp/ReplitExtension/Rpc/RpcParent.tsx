import PageShell from "../ReplitComponents/PageShell";
import RpcListView from "../ReplitComponents/rpc/RpcListView";
import { useAtomValue } from "jotai";
import { RpcMethod, showRpcMainView } from "../atoms";
import { RPC_METHODS } from "../lib/rpcMethod";
import RpcMainView from "../ReplitComponents/rpc/RpcMainView";
import { motion } from "framer-motion";

export default function RpcParent() {
  const method = useAtomValue(RpcMethod);
  const showMainView = useAtomValue(showRpcMainView);

  //TODO: handle cases where it doesn't find a match
  const RPC_DATA = RPC_METHODS.find((rpcMethod) => rpcMethod.method == method);

  return (
    <PageShell>
      {showMainView ? (
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.5, type: "spring", damping: 20 }}
          key="originalComponent"
        >
          <RpcMainView method={RPC_DATA!} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          key="newComponent"
        >
          <div className="flex w-full items-center justify-between px-5">
            <p className="text-2xl font-semibold">RPC</p>
            <div className="flex h-10 w-24 items-center justify-between rounded-full bg-[#0C071D] px-3 py-2 text-white  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                />
              </svg>
              <p className="text-sm font-bold">A-Z</p>
            </div>
          </div>
          <RpcListView />
        </motion.div>
      )}
    </PageShell>
  );
}
