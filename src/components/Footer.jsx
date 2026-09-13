import { Link } from "react-router-dom";
import { useCms } from "../cms/CmsContext";
import { useLanguage } from "../i18n/LanguageContext";
import "./Footer.css";

const Footer = () => {
  const { t } = useLanguage();
  const { site } = useCms();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__brand">{site.brand}</p>
          <p className="footer__meta">
            {site.location}
            <br />
            {t("site.distance")} · {site.pricePerNight}
            {t("footer.perNight")}
          </p>
        </div>
        <div className="footer__links">
          <Link to="/#apartamentos">{t("footer.apartments")}</Link>
          <Link to="/#disponibilidad">{t("footer.availability")}</Link>
          <Link to="/#casa">{t("footer.house")}</Link>
          <Link to="/#notas">{t("footer.notes")}</Link>
          <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
            {t("footer.map")}
          </a>
        </div>
        <p className="footer__note">
          {t("footer.note")}{" "}
          <Link to="/admin/login" className="footer__admin">
            Família
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
