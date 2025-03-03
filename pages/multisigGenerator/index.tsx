import SearchView from "@/comp/SearchView/SearchView";
import { activeSearchView, menuOpen } from "@/comp/atom";
import { useAtom } from "jotai";
import MultisigGeneratorParent from "@/comp/MultisigGenerator";

export default function Page() {
  const [showSearchView] = useAtom(activeSearchView);
  const [isMenuOpen, setMenuOpen] = useAtom(menuOpen);

  if (isMenuOpen === true) {
    return null;
  }

  return (
    <div>{showSearchView ? <SearchView /> : <MultisigGeneratorParent />}</div>
  );
}
