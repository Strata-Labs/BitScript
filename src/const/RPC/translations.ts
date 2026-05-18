import { RPC_METHODS, RPCFunctionParams } from "../RPC";

// Per-locale RPC translations, keyed by the English RPC's `method` name
// (e.g. "abandontransaction"). To add a new translation:
//   1. Create a sibling file like `abandontransaction.fr.ts` that exports
//      the translated RPCFunctionParams (the simplest pattern is to look up
//      the English record and spread it; see abandontransaction.fr.ts).
//   2. Import it below and register it under its locale by `method`.
// Missing translations fall back to English automatically.
//
// Keep `method`, `linkPath`, `callable`, each input's `method` (param name),
// `type`, `defaultValue`, and `enumValues` identical to the English version
// so URLs, RPC param wiring, and call payloads stay stable across locales.

import { abandontransactionFr } from "./abandontransaction.fr";

type LocaleRPCRegistry = Record<string, RPCFunctionParams>;

const fr: LocaleRPCRegistry = {
  abandontransaction: abandontransactionFr,
};

const es: LocaleRPCRegistry = {
  // coworker: add Spanish RPC entries here, e.g.
  // abandontransaction: abandontransactionEs,
};

const rpcsByLocale: Record<string, LocaleRPCRegistry> = { fr, es };

export function getLocalizedRPC(
  english: RPCFunctionParams,
  locale: string | undefined
): RPCFunctionParams {
  if (!locale || locale === "en") return english;
  return rpcsByLocale[locale]?.[english.method] ?? english;
}

export function getEnglishRPC(method: string): RPCFunctionParams | undefined {
  return RPC_METHODS.find((m) => m.method === method);
}
