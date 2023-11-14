import LandingView from "@/comp/LandingPage/LandingView";
import LandingPage from "@/comp/MainPage/LandingPage";
import SearchView from "@/comp/SearchView/SearchView";
import { activeSearchView, menuOpen } from "@/comp/atom";
import { useAtom } from "jotai";

export default function TEMP() {
  const [isMenuOpen, setMenuOpen] = useAtom(menuOpen);

  if (isMenuOpen === true) {
    return null;
  }

  return <div>{<LandingPage />}</div>;
}
