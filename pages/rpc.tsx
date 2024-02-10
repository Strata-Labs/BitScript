import RpcListView from "@/comp/RPC/RpcListView";

import { useAtom } from "jotai";
import { activeSearchView, menuOpen } from "@/comp/atom";
import SearchView from "@/comp/SearchView/SearchView";
import RpcMainView, { RPC_METHODS } from "@/comp/RPC/rpcMainView";

export default function TEMP() {
  const [showSearchView] = useAtom(activeSearchView);
  const [isMenuOpen, setMenuOpen] = useAtom(menuOpen);

  if (isMenuOpen === true) {
    return null;
  }

  return <div>{showSearchView ? <SearchView /> : <RpcListView />}</div>;
}
