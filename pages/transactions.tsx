import SearchView from "@/comp/SearchView/SearchView";
import TransactionsView from "@/comp/Transactions/TransactionsView";
import { activeSearchView } from "@/comp/atom";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

export default function TEMP() {
  const [showSearchView] = useAtom(activeSearchView);

  const routerScripts = useRouter();
  const { transaction } = routerScripts.query;

  return <div>{showSearchView ? <SearchView /> : <TransactionsView />}</div>;
}
