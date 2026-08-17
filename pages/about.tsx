import SearchView from "@/comp/SearchView/SearchView";
import { activeSearchView, menuOpen } from "@/comp/atom";
import { useAtom } from "jotai";
import About from "@/comp/About/About";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", [
      "common",
      "nav",
      "about",
      "landing",
      "profile",
    ])),
  },
});

export default function TEMP() {
  const [showSearchView] = useAtom(activeSearchView);
  const [isMenuOpen, setMenuOpen] = useAtom(menuOpen);

  if (isMenuOpen === true) {
    return null;
  }

  return <div>{showSearchView ? <SearchView /> : <About />}</div>;
}
