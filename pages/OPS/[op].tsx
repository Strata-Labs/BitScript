import { useRouter } from "next/router";
import OpCodeView from "@/comp/opCodes/OpCodeView";
import OpCodesPage from "@/comp/opCodes/OpCodesPage";
import { OP_CODES } from "@/utils/OPS";
import { useAtom } from "jotai";
import { activeSearchView } from "@/comp/atom";
import SearchView from "@/comp/SearchView/SearchView";
import { getLocalizedOpCode } from "@/const/OP_CODES/translations";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
      const localized = getLocalizedOpCode(OP, router.locale);
      return <OpCodeView {...localized} />;
    } else {
      return <OpCodesPage />;
    }
  } else {
    return <OpCodesPage />;
  }
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", [
      "common",
      "nav",
      "opcodes",
    ])),
  },
});
