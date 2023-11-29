import SearchView from "@/comp/SearchView/SearchView";
import TimerPopUp from "@/comp/Transactions/TimerPopUp";
import TransactionsView from "@/comp/Transactions/TransactionsView";
import { activeSearchView, menuOpen, showTimerPopUpAtom } from "@/comp/atom";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

export default function TEMP() {
  const [showSearchView] = useAtom(activeSearchView);
  const [isMenuOpen, setMenuOpen] = useAtom(menuOpen);
  const [showTimerPopUp, setShowTimerPopUp] = useAtom(showTimerPopUpAtom);

  if (isMenuOpen === true) {
    return null;
  }

  const routerScripts = useRouter();
  const { transaction } = routerScripts.query;

  return (
    <div>
      {" "}
      {showTimerPopUp && <TimerPopUp />}
      {showSearchView ? <SearchView /> : <TransactionsView />}
    </div>
  );
}
