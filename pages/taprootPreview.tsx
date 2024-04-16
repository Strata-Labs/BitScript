import SearchView from "@/comp/SearchView/SearchView";
import { activeSearchView, menuOpen } from "@/comp/atom";
import { useAtom } from "jotai";
import HashedKey from "@/comp/Data Fields/HashedKey";
import FeaturePreview from "@/comp/FeaturePreview";
import DeserializeParent from "@/comp/ReplitExtension/Deserialize/DeserializeParent";

export default function page() {
  const [showSearchView] = useAtom(activeSearchView);
  const [isMenuOpen, setMenuOpen] = useAtom(menuOpen);

  if (isMenuOpen === true) {
    return null;
  }

  return <div>{showSearchView ? <SearchView /> : <DeserializeParent />}</div>;
}
