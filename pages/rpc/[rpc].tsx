import { useRouter } from "next/router";

import RpcListView from "@/comp/RPC/RpcListView";

import { useAtom } from "jotai";
import { activeSearchView } from "@/comp/atom";
import SearchView from "@/comp/SearchView/SearchView";
import RpcMainView from "@/comp/RPC/rpcMainView";
import { RPC_METHODS } from "@/const/RPC";
import { getLocalizedRPC } from "@/const/RPC/translations";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function rpcPagesHandler() {
  const router = useRouter();
  const { rpc } = router.query;

  const [showSearchView] = useAtom(activeSearchView);

  if (showSearchView) {
    return <SearchView />;
  }

  if (rpc) {
    // find the op code based on the query
    const RPC_DATA = RPC_METHODS.find((rpcMethod) => rpcMethod.method === rpc);
    if (RPC_DATA) {
      const localized = getLocalizedRPC(RPC_DATA, router.locale);
      return <RpcMainView method={localized} />;
    } else {
      return <RpcListView />;
    }
  } else {
    return <RpcListView />;
  }
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", [
      "common",
      "nav",
      "rpc",
      "landing",
      "profile",
    ])),
  },
});
