import { useRouter } from "next/router";
import P2pkh from "@/comp/scripts/p2pkh";
import ScriptsPage from "@/comp/scripts/ScriptsPage";
import { SCRIPTS_LIST } from "@/utils/SCRIPTS";

export default function scriptPagesHandler() {
  const routerScripts = useRouter();
  const { scr } = routerScripts.query;

  if (scr) {
    // find the op code based on the query
    const SCR = SCRIPTS_LIST.find((script) => script.name === scr);
    if (SCR) {
      return <P2pkh {...SCR} />;
    } else {
      return <ScriptsPage />;
    }
  } else {
    return <ScriptsPage />;
  }
}
