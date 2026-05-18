import RpcListView from "@/comp/RPC/RpcListView";

import { useAtom } from "jotai";
import { activeSearchView, menuOpen } from "@/comp/atom";
import SearchView from "@/comp/SearchView/SearchView";
import RpcsView from "@/comp/RPC/RpcsView";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function TEMP() {
  const [showSearchView] = useAtom(activeSearchView);
  const [isMenuOpen, setMenuOpen] = useAtom(menuOpen);

  if (isMenuOpen === true) {
    return null;
  }

  return <div>{showSearchView ? <SearchView /> : <RpcsView />}</div>;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", [
      "common",
      "nav",
      "rpc",
    ])),
  },
});
