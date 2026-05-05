import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";

// Per-locale article translations, keyed by the English article's `title`.
// To add a new translation:
//   1. Create a sibling file like `ECDSAGeneration.fr.ts` that exports the
//      translated ArticleViewProps (the simplest pattern is to spread the
//      English article and override fields; see ECDSAGeneration.fr.ts).
//   2. Import it below and register it under its locale by English title.
// Missing translations fall back to English automatically.

import { ECDSAGenerationFr } from "./ECDSAGeneration.fr";

type LocaleArticleRegistry = Record<string, ArticleViewProps>;

const fr: LocaleArticleRegistry = {
  "ECDSA Generation": ECDSAGenerationFr,
};

const es: LocaleArticleRegistry = {
  // coworker: add Spanish article entries here, e.g.
  // "ECDSA Generation": ECDSAGenerationEs,
};

const articlesByLocale: Record<string, LocaleArticleRegistry> = { fr, es };

export function getLocalizedArticle(
  english: ArticleViewProps,
  locale: string | undefined
): ArticleViewProps {
  if (!locale || locale === "en") return english;
  return articlesByLocale[locale]?.[english.title] ?? english;
}
