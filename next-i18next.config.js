// To add a new language: add its code to `locales` below and create a matching
// folder under `public/locales/<code>/`. No other config changes needed.
const path = require("path");

/** @type {import('next-i18next').UserConfig} */
const config = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "fr"],
    localeDetection: false,
  },
  localePath: path.resolve("./public/locales"),
  reloadOnPrerender: process.env.NODE_ENV === "development",
};

module.exports = config;
