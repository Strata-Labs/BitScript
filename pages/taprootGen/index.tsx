import SearchView from "@/comp/SearchView/SearchView";
import { activeSearchView, menuOpen } from "@/comp/atom";
import { useAtom } from "jotai";

import MerkleTreeNodes from "@/comp/TaprootTools/MerkleTreeNodes";

import TaprootToolView from "@/comp/TaprootGen/TaprootToolView";
import TaprootParent from "@/comp/TaprootGen/TaprootParent";
export default function Page() {

  // return <TaprootToolView />;
  return <TaprootParent />;
}
