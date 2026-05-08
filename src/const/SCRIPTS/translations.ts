import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";

// Per-locale script translations, keyed by the English script's `shortHand`
// (e.g. "P2PK", "P2PKH"). To add a new translation:
//   1. Create a sibling file like `p2pk.fr.ts` that exports the translated
//      SCRIPTS_PAGE_PROPS (the simplest pattern is to spread the English
//      script and override fields; see p2pk.fr.ts).
//   2. Import it below and register it under its locale by `shortHand`.
// Missing translations fall back to English automatically.
//
// Keep `shortHand`, `linkPath`, `image`, `exampleLink`, `STACK_DATA`, and
// `codeBlocks` code values identical to the English version so URLs, assets,
// and the animation logic stay stable across locales.

import { P2PKFr } from "./p2pk.fr";
import { P2PKHFr } from "./p2pkh.fr";
import { P2SHFr } from "./P2SH.fr";
import { P2TRKPFr } from "./P2TRKeyPath.fr";
import { P2WPKHFr } from "./P2WPKH.fr";
import { P2WSHFr } from "./P2WSH.fr";
import { P2SHTLFr } from "./p2shTimelock.fr";
import { P2SHHLFr } from "./p2shHashLock.fr";

type LocaleScriptRegistry = Record<string, SCRIPTS_PAGE_PROPS>;

const fr: LocaleScriptRegistry = {
  P2PK: P2PKFr,
  P2PKH: P2PKHFr,
  P2SH: P2SHFr,
  "P2TR-KP": P2TRKPFr,
  P2WPKH: P2WPKHFr,
  P2WSH: P2WSHFr,
  "P2SH-TL": P2SHTLFr,
  "P2SH-HL": P2SHHLFr,
};

const es: LocaleScriptRegistry = {
  // coworker: add Spanish script entries here, e.g.
  // P2PK: P2PKEs,
};

const scriptsByLocale: Record<string, LocaleScriptRegistry> = { fr, es };

export function getLocalizedScript(
  english: SCRIPTS_PAGE_PROPS,
  locale: string | undefined
): SCRIPTS_PAGE_PROPS {
  if (!locale || locale === "en") return english;
  return scriptsByLocale[locale]?.[english.shortHand] ?? english;
}
