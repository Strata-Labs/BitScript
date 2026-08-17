import { useRouter } from "next/router";
import ScriptView from "@/comp/scripts/ScriptView";
import ScriptsPage from "@/comp/scripts/ScriptsPage";
import { SCRIPTS_LIST } from "@/utils/SCRIPTS";
import { activeSearchView } from "@/comp/atom";
import { useAtom } from "jotai";
import SearchView from "@/comp/SearchView/SearchView";
import { getLocalizedScript } from "@/const/SCRIPTS/translations";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
    if (SCR) {
      const localized = getLocalizedScript(SCR, routerScripts.locale);
      return <ScriptView {...localized} />;
    } else {
      return <ScriptsPage />;
    }
  } else {
    return <ScriptsPage />;
  }
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", [
      "common",
      "nav",
      "scripts",
      "landing",
      "profile",
    ])),
  },
});
