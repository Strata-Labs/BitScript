import { useRouter } from "next/router";
import { BitcoinBasics } from "@/utils/TUTORIALS";
import Tutorials from "../lessons";
import { useAtom } from "jotai";
import { activeSearchView } from "@/comp/atom";
import SearchView from "@/comp/SearchView/SearchView";
import ArticleView from "@/comp/Tutorials/ArticleView";
import { getLocalizedArticle } from "@/const/Articles/translations";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const LessonPageHandler = () => {
  const router = useRouter();
  const { lesson } = router.query;

  const [showSearchView] = useAtom(activeSearchView);

  if (showSearchView) {
    return <SearchView />;
  }

  if (typeof lesson !== "string") {
    return <Tutorials />;
  }

  const decodedLesson = decodeURIComponent(lesson as string);

  // This has 2 checks for backwards compatibility with the previous lesson links
  const foundLesson = BitcoinBasics.find((tutorial) => {
    return (
      tutorial.shortHandTitle === `/lessons/${decodedLesson}` ||
      tutorial.title === decodedLesson
    );
  });

  if (!foundLesson) return <Tutorials />;

  const localizedLesson = getLocalizedArticle(foundLesson, router.locale);

  return <ArticleView {...localizedLesson} />;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", [
      "common",
      "nav",
      "lessons",
    ])),
  },
});

export default LessonPageHandler;
