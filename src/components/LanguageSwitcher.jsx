import { useLanguage } from "../i18n/LanguageContext";
import "./LanguageSwitcher.css";

const LanguageSwitcher = ({ compact = false }) => {
  const { locale, setLocale, locales, t } = useLanguage();

  return (
    <div className={`lang ${compact ? "lang--compact" : ""}`} role="group" aria-label={t("nav.lang")}>
      {locales.map((item) => (
        <button
          key={item.code}
          type="button"
          className={`lang__btn ${locale === item.code ? "is-active" : ""}`}
          onClick={() => setLocale(item.code)}
          aria-pressed={locale === item.code}
          title={item.label}
        >
          {item.short}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
