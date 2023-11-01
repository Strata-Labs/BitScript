import SearchView from "@/comp/SearchView/SearchView";
import { activeSearchView } from "@/comp/atom";
import { useAtom } from "jotai";
import Profile from "@/comp/Profile/Profile";

export default function TEMP() {
  const [showSearchView] = useAtom(activeSearchView);

  return <div>{showSearchView ? <SearchView /> : <Profile />}</div>;
}
