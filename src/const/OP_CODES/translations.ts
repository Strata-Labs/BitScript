import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";

// Per-locale opcode translations, keyed by the English opcode's `name`
// (e.g. "OP_DUP", "OP_HASH160"). To add a new translation:
//   1. Create a sibling file like `DUP.fr.ts` that exports the translated
//      OP_CODE_PAGE_PROPS (the simplest pattern is to spread the English
//      opcode and override fields; see DUP.fr.ts).
//   2. Import it below and register it under its locale by `name`.
// Missing translations fall back to English automatically.
//
// Keep `name`, `opCode`, `hex`, `linkPath`, `tileImage`, `generalType`,
// `inputNum`, `returnNum`, and `visualProps.stackSteps`/`failureSteps`
// identical to the English version so URLs, assets, and the animation logic
// stay stable across locales.

import { OP_DUPFr } from "./DUP.fr";

type LocaleOpCodeRegistry = Record<string, OP_CODE_PAGE_PROPS>;

const fr: LocaleOpCodeRegistry = {
  OP_DUP: OP_DUPFr,
};

const es: LocaleOpCodeRegistry = {
  // coworker: add Spanish opcode entries here, e.g.
  // OP_DUP: OP_DUPEs,
};

const opCodesByLocale: Record<string, LocaleOpCodeRegistry> = { fr, es };

export function getLocalizedOpCode(
  english: OP_CODE_PAGE_PROPS,
  locale: string | undefined
): OP_CODE_PAGE_PROPS {
  if (!locale || locale === "en") return english;
  return opCodesByLocale[locale]?.[english.name] ?? english;
}
