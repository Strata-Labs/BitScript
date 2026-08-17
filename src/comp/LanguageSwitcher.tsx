import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  fr: "FR",
  es: "ES",
};

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { locales, locale, pathname, asPath, query } = router;

  if (!locales || locales.length < 2) return null;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    router.push({ pathname, query }, asPath, { locale: nextLocale });
  };

  return (
    <div className="mt-auto px-4 pb-6 pt-4">
      <label className="block text-[10px] uppercase tracking-wider text-white/50 mb-1">
        {t("language_label")}
      </label>
      <select
        aria-label={t("language_label")}
        value={locale}
        onChange={handleChange}
        className="w-full h-9 rounded-md bg-[#1A1330] px-3 text-sm text-white focus:outline-none border border-white/20 hover:border-[#F79327] transition-colors"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {LOCALE_LABELS[loc] ?? loc.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
