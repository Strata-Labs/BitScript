import BitSimCommandBlock from "@/comp/BitSim/Commands/BitSimCommandBlock";
import SearchView from "@/comp/SearchView/SearchView";
import { activeSearchView, menuOpen } from "@/comp/atom";
import { useAtom } from "jotai";

export default function BitSimCommandBlocks() {
  const [showSearchView] = useAtom(activeSearchView);
  const [isMenuOpen, setMenuOpen] = useAtom(menuOpen);

  if (isMenuOpen === true) {
    return null;
  }

  return <div>{showSearchView ? <SearchView /> : <BitSimCommandBlock />}</div>;
}
