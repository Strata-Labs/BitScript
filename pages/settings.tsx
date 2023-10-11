import SearchView from "@/comp/SearchView/SearchView";
import Settings from "@/comp/Settings/Settings";
import { activeSearchView } from "@/comp/atom";
import { useAtom } from "jotai";

export default function TEMP() {
  const [showSearchView] = useAtom(activeSearchView);

  return <div>{showSearchView ? <SearchView /> : <Settings />}</div>;
}
