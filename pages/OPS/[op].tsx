import { useRouter } from "next/router";
import OpCodeView from "@/comp/opCodes/OpCodeView";
import OpCodesPage from "@/comp/opCodes/OpCodesPage";
import { OP_CODES } from "@/utils/OPS";
import { useAtom } from "jotai";
import { activeSearchView } from "@/comp/atom";
import SearchView from "@/comp/SearchView/SearchView";

export default function opCodePagesHandler() {
  const router = useRouter();
  const { op } = router.query;

  const [showSearchView] = useAtom(activeSearchView);

  if (showSearchView) {
    return <SearchView />;
  }

  if (op) {
    // find the op code based on the query
    const OP = OP_CODES.find((opCode) => opCode.name === op);
    if (OP) {
      return <OpCodeView {...OP} />;
    } else {
      return <OpCodesPage />;
    }
  } else {
    return <OpCodesPage />;
  }
}
