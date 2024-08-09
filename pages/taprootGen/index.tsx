import SearchView from "@/comp/SearchView/SearchView";
import { activeSearchView, menuOpen } from "@/comp/atom";
import { useAtom } from "jotai";

import MerkleTreeNodes from "@/comp/TaprootTools/MerkleTreeNodes";

import TaprootGenParent from "@/comp/TaprootGen/TaprootGenParent";
import TaprootToolView from "@/comp/TaprootGen/TaprootToolView";
export default function Page() {
  return <TaprootToolView />;
}
