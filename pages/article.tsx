import SearchView from "@/comp/SearchView/SearchView";
import { activeSearchView } from "@/comp/atom";
import { useAtom } from "jotai";
import ArticleView from "@/comp/Tutorials/ArticleView";
import { BitcoinBasicsTutorials } from "@/utils/TUTORIALS";

export default function TEMP() {
  const [showSearchView] = useAtom(activeSearchView);

  return (
    <div>
      {showSearchView ? (
        <SearchView />
      ) : (
        <ArticleView {...BitcoinBasicsTutorials[0]} />
      )}
    </div>
  );
}
