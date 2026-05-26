import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";

// Per-locale article translations, keyed by the English article's `title`.
// To add a new translation:
//   1. Create a sibling file like `ECDSAGeneration.fr.ts` that exports the
//      translated ArticleViewProps (the simplest pattern is to spread the
//      English article and override fields; see ECDSAGeneration.fr.ts).
//   2. Import it below and register it under its locale by English title.
// Missing translations fall back to English automatically.

import { ECDSAGenerationFr } from "./ECDSAGeneration.fr";
import { ECDSAVerificationFr } from "./ecdsaVerification.fr";
import { ECDSADerFormatFr } from "./ecdsaDerFormat.fr";
import { ATaleOfTwoPathsFr } from "./ataleoftwopaths.fr";
import { FormattingWitnessScriptFr } from "./formattingwitnessscript.fr";
import { FromKeysToWalletsFr } from "./fromKeysToWallets.fr";
import { GeneratingTaprootPubKeyFr } from "./generatingATaprootOutput.fr";
import { GeneratingTaprootPubKey2Fr } from "./generatingTaprootPubkey2.fr";
import { MerkleTreeReviewFr } from "./merkletreereview.fr";
import { VMFFr } from "./vmf.fr";
import { WhatsInAnInputAnywaysFr } from "./whatsinaninputanyways.fr";
import { WhyTaprootFr } from "./whytaproot.fr";

type LocaleArticleRegistry = Record<string, ArticleViewProps>;

const fr: LocaleArticleRegistry = {
  "ECDSA Generation": ECDSAGenerationFr,
  "ECDSA Verification": ECDSAVerificationFr,
  "ECDSA DER Format": ECDSADerFormatFr,
  "A Tale of Two Paths": ATaleOfTwoPathsFr,
  "Formatting Witness Script": FormattingWitnessScriptFr,
  "From Keys To Wallets": FromKeysToWalletsFr,
  "Generating A Taproot PubKey (Pt. I)": GeneratingTaprootPubKeyFr,
  "Generating A Taproot PubKey (Pt. II)": GeneratingTaprootPubKey2Fr,
  "Merkle Tree Review": MerkleTreeReviewFr,
  "Version, Marker, Field - Configuring and Identifying A SegWit Transaction":
    VMFFr,
  "What's In An Input Anyways": WhatsInAnInputAnywaysFr,
  "Why Taproot": WhyTaprootFr,
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
