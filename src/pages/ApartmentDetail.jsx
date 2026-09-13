import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import PhotoGallery from "../components/PhotoGallery";
import { useCms } from "../cms/CmsContext";
import { localizeApartment } from "../i18n/utils";
import { useLanguage } from "../i18n/LanguageContext";
import "./ApartmentDetail.css";

const ApartmentDetail = () => {
  const { id } = useParams();
  const { t, dict } = useLanguage();
  const { apartmentsBase, site } = useCms();
  const apartment = useMemo(() => {
    const base = apartmentsBase.find((apt) => apt.id === id);
    return localizeApartment(base, dict);
  }, [apartmentsBase, dict, id]);
  const [showCalendar, setShowCalendar] = useState(false);

  if (!apartment) {
    return (
      <div className="apt-detail container">
        <p>{t("detail.notFound")}</p>
        <Link to="/#apartamentos" className="btn btn-primary">
          {t("detail.back")}
        </Link>
      </div>
    );
  }

  return (
    <div className="apt-detail">
      <div className="container apt-detail__top">
        <Link to="/#apartamentos" className="apt-detail__back">
          {t("detail.back")}
        </Link>
        <p className="apt-detail__sub">{apartment.subtitle}</p>
        <h1>{apartment.name}</h1>
        <p className="apt-detail__desc">{apartment.description}</p>
      </div>

      <div className="container apt-detail__layout">
        <PhotoGallery photos={apartment.photos} title={apartment.name} />

        <aside className="apt-detail__side">
          <ul className="apt-detail__meta">
            <li>
              <strong>{apartment.bedrooms}</strong> {t("detail.bedrooms")}
            </li>
            <li>
              <strong>{apartment.bathrooms}</strong> {t("detail.bathroom")}
            </li>
            <li>
              <strong>{apartment.size}</strong> m²
            </li>
            <li>
              {t("detail.upTo")} <strong>{apartment.maxGuests}</strong>{" "}
              {t("detail.people")}
            </li>
            <li>
              <strong>{apartment.price}€</strong> {t("detail.perNight")}
            </li>
          </ul>

          <ul className="apt-detail__features">
            {apartment.featureLabels.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowCalendar(true)}
          >
            {t("detail.seeAvailability")}
          </button>
          <a
            className="btn btn-whatsapp"
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
              t("detail.waInterest", { name: apartment.name })
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </aside>
      </div>

      {showCalendar && (
        <AvailabilityCalendar
          apartment={apartment}
          onClose={() => setShowCalendar(false)}
        />
      )}
    </div>
  );
};

export default ApartmentDetail;
