import ScriptContent from "@/comp/scripts/p2pkh";
import LandingView from "@/comp/LandingPage/LandingView";
import SearchView from "@/comp/SearchView/SearchView";
import { activeSearchView } from "@/comp/atom";
import { useAtom } from "jotai";

export default function TEMP() {
  const [showSearchView] = useAtom(activeSearchView);

  return <>{showSearchView ? <SearchView /> : <ScriptContent />}</>;
}
