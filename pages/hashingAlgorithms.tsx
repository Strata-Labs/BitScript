import SearchView from "@/comp/SearchView/SearchView";
import { activeSearchView } from "@/comp/atom";
import { useAtom } from "jotai";
import HashingAlgorithm from "@/comp/HashingCalculator/HashingAlgorithms";

export default function TEMP() {
  const [showSearchView] = useAtom(activeSearchView);

  return <div>{showSearchView ? <SearchView /> : <HashingAlgorithm />}</div>;
}
