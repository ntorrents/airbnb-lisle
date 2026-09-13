import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LOCALE, LOCALES, STORAGE_KEY, localeTags } from "./config";
import { getByPath, interpolate } from "./utils";
import { useCms } from "../cms/CmsContext";
import { applyCmsToDict } from "../cms/content";
import ca from "./locales/ca";
import es from "./locales/es";
import fr from "./locales/fr";

const catalogs = { ca, es, fr };

const LanguageContext = createContext(null);

const readStoredLocale = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && catalogs[stored]) return stored;
  } catch {
    /* ignore */
  }
  return DEFAULT_LOCALE;
};

export const LanguageProvider = ({ children }) => {
  const { cms } = useCms();
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE);

  useEffect(() => {
    setLocaleState(readStoredLocale());
  }, []);

  useEffect(() => {
    const base = catalogs[locale] || catalogs[DEFAULT_LOCALE];
    const dict = applyCmsToDict(base, cms, locale);
    document.documentElement.lang = locale;
    document.title = dict.meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", dict.meta.description);
  }, [locale, cms]);

  const setLocale = (next) => {
    if (!catalogs[next]) return;
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const value = useMemo(() => {
    const base = catalogs[locale] || catalogs[DEFAULT_LOCALE];
    const dict = applyCmsToDict(base, cms, locale);

    const t = (path, vars) => {
      const raw = getByPath(dict, path);
      if (raw == null) return path;
      return interpolate(raw, vars);
    };

    return {
      locale,
      setLocale,
      locales: LOCALES,
      localeTag: localeTags[locale] || "ca-ES",
      t,
      dict,
    };
  }, [locale, cms]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
