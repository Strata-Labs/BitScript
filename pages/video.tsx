import SearchView from "@/comp/SearchView/SearchView";
import { activeSearchView } from "@/comp/atom";
import { useAtom } from "jotai";
import VideoView from "@/comp/Tutorials/VideoView";

export default function TEMP() {
  const [showSearchView] = useAtom(activeSearchView);

  return <div>{showSearchView ? <SearchView /> : <VideoView />}</div>;
}
