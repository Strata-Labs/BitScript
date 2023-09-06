import SearchView from "@/comp/SearchView/SearchView";
import TransactionsView from "@/comp/Transactions/TransactionsView";
import { activeSearchView } from "@/comp/atom";
import { useAtom } from "jotai";

export default function TEMP() {
  const [showSearchView] = useAtom(activeSearchView);

  return <div>{showSearchView ? <SearchView /> : <TransactionsView />}</div>;
}
