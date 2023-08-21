import SearchView from "@/comp/SearchView/SearchView";
import { activeSearchView } from "@/comp/atom";
import OpCodesPage from "@/comp/opCodes/OpCodesPage";
import { useAtom } from "jotai";

export default function TEMP() {
  const [showSearchView] = useAtom(activeSearchView);

  return <div>{showSearchView ? <SearchView /> : <OpCodesPage />}</div>;
}
