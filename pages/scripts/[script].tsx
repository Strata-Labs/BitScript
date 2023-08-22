import { useRouter } from "next/router";
import P2pkh from "@/comp/scripts/p2pkh";
import ScriptsPage from "@/comp/scripts/ScriptsPage";
import { SCRIPTS_LIST } from "@/utils/SCRIPTS";

export default function scriptPagesHandler() {
  const routerScripts = useRouter();
  const { script } = routerScripts.query;

  if (script) {
    console.log("script", script);

    // find the script based on the query
    const SCR = SCRIPTS_LIST.find(
      (_script) => _script.scriptDescription === script
    );
    console.log(SCR);
    if (SCR) {
      console.log("go here");
      return <P2pkh {...SCR} />;
    } else {
      return <ScriptsPage />;
    }
  } else {
    return <ScriptsPage />;
  }
}
