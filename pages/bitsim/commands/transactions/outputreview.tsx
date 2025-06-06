import BitSimCommandTransactionsOutputReview from "@/comp/BitSim/Commands/Transactions/BitSimCommandTransactionOutputReview";
import LeafView from "@/comp/BitSim/Commands/Transactions/LeafView";
import SearchView from "@/comp/SearchView/SearchView";
import { activeSearchView, menuOpen } from "@/comp/atom";
import { useAtom } from "jotai";

export default function BitSimCommandBlocks() {
  const [showSearchView] = useAtom(activeSearchView);
  const [isMenuOpen, setMenuOpen] = useAtom(menuOpen);

  if (isMenuOpen === true) {
    return null;
  }

  return (
    <div>
      {showSearchView ? (
        <SearchView />
      ) : (
        // <BitSimCommandTransactionsOutputReview />
        <LeafView />
      )}
    </div>
  );
}
