import { useRouter } from "next/router";

import RpcListView from "@/comp/RPC/RpcListView";

import { useAtom } from "jotai";
import { activeSearchView } from "@/comp/atom";
import SearchView from "@/comp/SearchView/SearchView";
import RpcMainView,  from "@/comp/RPC/rpcMainView";
import { RPC_METHODS } from "@/const/RPC";

export default function rpcPagesHandler() {
  const router = useRouter();
  const { rpc } = router.query;

  console.log("rpc", rpc);
  const [showSearchView] = useAtom(activeSearchView);

  if (showSearchView) {
    return <SearchView />;
  }

  if (rpc) {
    // find the op code based on the query
    const RPC_DATA = RPC_METHODS.find((rpcMethod) => rpcMethod.method === rpc);
    if (RPC_DATA) {
      return <RpcMainView method={RPC_DATA} />;
    } else {
      return <RpcListView />;
    }
  } else {
    return <RpcListView />;
  }
}
