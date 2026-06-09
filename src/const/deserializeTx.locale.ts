import * as en from "./deserializeTx";
import * as fr from "./deserializeTx.fr";
import * as es from "./deserializeTx.es";

// Per-locale transaction-field data. English is the fallback.
// To add a language: create a sibling file (e.g. `deserializeTx.es.ts`)
// exporting the same consts, import it, and add it to the map below.
//   import * as es from "./deserializeTx.es";
//   const byLocale = { fr, es };
const byLocale: Record<string, typeof en> = { fr, es };

export const getTxData = (locale?: string) =>
  (locale && byLocale[locale]) || en;
