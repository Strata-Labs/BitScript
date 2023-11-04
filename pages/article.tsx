import SearchView from "@/comp/SearchView/SearchView";
import { activeSearchView } from "@/comp/atom";
import { useAtom } from "jotai";
import ArticleView from "@/comp/Tutorials/ArticleView";
import { BitcoinBasics } from "@/utils/TUTORIALS";

export default function TEMP() {
  const [showSearchView] = useAtom(activeSearchView);

  return (
    <div>
      {showSearchView ? <SearchView /> : <ArticleView {...BitcoinBasics[0]} />}
    </div>
  );
}
