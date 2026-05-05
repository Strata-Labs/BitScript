// Extracts t("...") calls from the codebase into per-locale JSON files.
// Run via: yarn i18n:extract
//
// What this does:
//   - Scans all .ts/.tsx in pages/ and src/ for t() calls
//   - Writes/updates public/locales/<LOCALE>/<NAMESPACE>.json
//   - Adds new keys with empty string values (so untranslated keys are
//     visually obvious in non-English locales)
//   - Existing translations are preserved — never overwrites your work

/** @type {import('i18next-parser').UserConfig} */
module.exports = {
  locales: ["en", "fr", "es"],
  output: "public/locales/$LOCALE/$NAMESPACE.json",
  input: [
    "pages/**/*.{ts,tsx}",
    "src/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],

  // We use snake_case full keys, no nested objects (cleaner diffs).
  keySeparator: false,
  namespaceSeparator: false,

  defaultNamespace: "common",

  // Leave the source (English) value as-is, but seed other locales with "".
  // Translators see "" and know it needs work.
  defaultValue: function (locale, namespace, key, value) {
    return locale === "en" ? value || "" : "";
  },

  // Don't generate `*_old.json` files when keys are removed.
  createOldCatalogs: false,

  // Keep keys that no longer appear in source — review manually before
  // deleting. Set to true once you have a clean baseline.
  keepRemoved: true,

  sort: true,
  verbose: false,

  // i18next plural suffixes — supports `key_one`, `key_other`, etc.
  pluralSeparator: "_",

  failOnWarnings: false,
};
