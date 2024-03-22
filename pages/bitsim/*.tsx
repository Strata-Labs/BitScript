import SearchView from "@/comp/SearchView/SearchView";
import { activeSearchView, menuOpen } from "@/comp/atom";
import { useAtom } from "jotai";
import ArticleView from "@/comp/Tutorials/ArticleView";

import { BitcoinBasics } from "@/utils/TUTORIALS";
import BitSimHome from "@/comp/BitSimHome";

export default function TEMP() {
  const [showSearchView] = useAtom(activeSearchView);
  const [isMenuOpen, setMenuOpen] = useAtom(menuOpen);

  if (isMenuOpen === true) {
    return null;
  }

  return <div>{showSearchView ? <SearchView /> : <BitSimHome />}</div>;
}
