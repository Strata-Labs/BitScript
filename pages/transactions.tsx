import SearchView from "@/comp/SearchView/SearchView";
import TransactionsView from "@/comp/Transactions/TransactionsView";
import { activeSearchView, menuOpen } from "@/comp/atom";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function TEMP() {
  const [showSearchView] = useAtom(activeSearchView);
  const [isMenuOpen, setMenuOpen] = useAtom(menuOpen);

  if (isMenuOpen === true) {
    return null;
  }

  const routerScripts = useRouter();
  const { transaction } = routerScripts.query;

  return <div>{showSearchView ? <SearchView /> : <TransactionsView />}</div>;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", [
      "common",
      "nav",
      "transactions",
      "landing",
      "profile",
    ])),
  },
});
