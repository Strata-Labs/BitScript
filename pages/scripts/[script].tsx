import { useRouter } from "next/router";
import ScriptView from "@/comp/scripts/ScriptView";
import ScriptsPage from "@/comp/scripts/ScriptsPage";
import { SCRIPTS_LIST } from "@/utils/SCRIPTS";
import { activeSearchView } from "@/comp/atom";
import { useAtom } from "jotai";
import SearchView from "@/comp/SearchView/SearchView";

export default function scriptPagesHandler() {
  const routerScripts = useRouter();
  const { script } = routerScripts.query;
  const [showSearchView] = useAtom(activeSearchView);

  if (showSearchView) {
    return <SearchView />;
  }

  if (script) {
    // find the script based on the query
    const SCR = SCRIPTS_LIST.find((_script) => _script.shortHand === script);
    // console.log(SCR);
    if (SCR) {
      return <ScriptView {...SCR} />;
    } else {
      return <ScriptsPage />;
    }
  } else {
    return <ScriptsPage />;
  }
}
