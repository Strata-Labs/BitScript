import { useRouter } from "next/router";
import { BitcoinBasicsTutorials } from "@/utils/TUTORIALS";
import Tutorials from "../tutorials";

import { useAtom } from "jotai";
import { activeSearchView } from "@/comp/atom";
import SearchView from "@/comp/SearchView/SearchView";
import ArticleView from "@/comp/Tutorials/ArticleView";

const LessonPageHandler = () => {
  const router = useRouter();
  const { lesson } = router.query;

  const [showSearchView] = useAtom(activeSearchView);

  if (showSearchView) {
    return <SearchView />;
  }

  if (lesson) {
    const foundLesson = BitcoinBasicsTutorials.find(
      (tutorial) => tutorial.title === lesson
    );

    if (foundLesson) {
      return <ArticleView {...foundLesson} />;
    } else {
      return <Tutorials />;
    }
  } else {
    return <Tutorials />;
  }
};

export default LessonPageHandler;
