import siteDefaults from "../data/site.json";
import { useCms } from "../cms/CmsContext";
import { useLanguage } from "../i18n/LanguageContext";
import "./HouseGuide.css";

const HouseGuide = () => {
  const { t, dict } = useLanguage();
  const { site } = useCms();
  const sections = dict.guide.sections;

  return (
    <div className="guide">
      <div className="guide__header">
        <p className="section-kicker">{t("guide.kicker")}</p>
        <h2 className="section-title">{t("guide.title")}</h2>
        <p className="section-intro">{t("guide.intro")}</p>
      </div>

      <div className="guide__grid">
        {sections.map((section, index) => (
          <article key={section.id} className="guide__card">
            <span className="guide__index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{section.title}</h3>
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="guide__links">
        <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
          {t("guide.maps")}
        </a>
        <a
          href={site.links?.ter || siteDefaults.links.ter}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("guide.ter")}
        </a>
        <a
          href={site.links?.tourism || siteDefaults.links.tourism}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("guide.tourism")}
        </a>
      </div>
    </div>
  );
};

export default HouseGuide;
