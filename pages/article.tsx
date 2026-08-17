import SearchView from "@/comp/SearchView/SearchView";
import { activeSearchView, menuOpen } from "@/comp/atom";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import ArticleView from "@/comp/Tutorials/ArticleView";
import { getLocalizedArticle } from "@/const/Articles/translations";

import { BitcoinBasics } from "@/utils/TUTORIALS";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function TEMP() {
  const [showSearchView] = useAtom(activeSearchView);
  const [isMenuOpen, setMenuOpen] = useAtom(menuOpen);
  const router = useRouter();

  if (isMenuOpen === true) {
    return null;
  }

  const article = getLocalizedArticle(BitcoinBasics[0], router.locale);

  return (
    <div>{showSearchView ? <SearchView /> : <ArticleView {...article} />}</div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", [
      "common",
      "nav",
      "lessons",
      "landing",
      "profile",
    ])),
  },
});
