import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import HouseGuide from "../components/HouseGuide";
import NotesWall from "../components/NotesWall";
import SectionReveal from "../components/SectionReveal";
import { useCms } from "../cms/CmsContext";
import { localizeApartment } from "../i18n/utils";
import { useLanguage } from "../i18n/LanguageContext";
import "./Home.css";

const Home = () => {
  const { t, dict } = useLanguage();
  const { apartmentsBase, site } = useCms();
  const apartments = useMemo(
    () => apartmentsBase.map((apt) => localizeApartment(apt, dict)),
    [apartmentsBase, dict]
  );
  const [calendarKey, setCalendarKey] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);

  const openCalendar = (apartment) => {
    setSelectedApartment(apartment);
    setShowCalendar(true);
  };

  return (
    <div className="home">
      <section id="inicio" className="hero">
        <div className="hero__volets" aria-hidden="true">
          <div className="hero__shutter hero__shutter--left" />
          <div className="hero__shutter hero__shutter--right" />
        </div>

        <div className="hero__media">
          <img
            src="https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1800&q=80"
            alt=""
          />
          <div className="hero__veil" />
        </div>

        <div className="hero__content container">
          <p className="hero__place">{site.locationShort}</p>
          <h1 className="hero__brand">{site.brand}</h1>
          <p className="hero__tagline">{t("site.tagline")}</p>
          <div className="hero__actions">
            <a className="btn btn-primary" href="#disponibilidad">
              {t("home.seeDates")}
            </a>
            <a className="btn btn-ghost" href="#notas">
              {t("home.ourNotes")}
            </a>
          </div>
        </div>
      </section>

      <SectionReveal id="apartamentos" className="section apartments">
        <div className="container">
          <p className="section-kicker">{t("home.aptKicker")}</p>
          <h2 className="section-title">{t("home.aptTitle")}</h2>
          <p className="section-intro">
            {t("home.aptIntro", { price: site.pricePerNight })}
          </p>

          <div className="apt-grid">
            {apartments.map((apartment, index) => (
              <article
                key={apartment.id}
                className={`apt-card ${index % 2 === 1 ? "apt-card--flip" : ""}`}
              >
                <Link
                  to={`/apto/${apartment.id}`}
                  className="apt-card__image"
                  aria-label={t("home.seePhotosOf", { name: apartment.name })}
                >
                  <img src={apartment.image} alt={apartment.name} loading="lazy" />
                  <span className="apt-card__photos">
                    {apartment.photos?.length || 0} {t("home.photos")}
                  </span>
                </Link>
                <div className="apt-card__body">
                  <p className="apt-card__sub">{apartment.subtitle}</p>
                  <h3>
                    <Link to={`/apto/${apartment.id}`}>{apartment.name}</Link>
                  </h3>
                  <p className="apt-card__desc">{apartment.description}</p>
                  <ul className="apt-card__meta">
                    <li>
                      {apartment.bedrooms} {t("home.beds")}
                    </li>
                    <li>
                      {apartment.bathrooms} {t("home.bath")}
                    </li>
                    <li>{apartment.size} m²</li>
                    <li>{t("home.upTo", { n: apartment.maxGuests })}</li>
                  </ul>
                  <ul className="apt-card__features">
                    {apartment.featureLabels.slice(0, 5).map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <div className="apt-card__actions">
                    <Link to={`/apto/${apartment.id}`} className="btn btn-ghost">
                      {t("home.seePhotos")}
                    </Link>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => openCalendar(apartment)}
                    >
                      {t("home.dates")}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal id="disponibilidad" className="section availability">
        <div className="container">
          <p className="section-kicker">{t("home.availKicker")}</p>
          <h2 className="section-title">{t("home.availTitle")}</h2>
          <p className="section-intro">{t("home.availIntro")}</p>

          <div className="avail-grid">
            {apartments.map((apartment) => (
              <button
                key={`${apartment.id}-${calendarKey}`}
                type="button"
                className="avail-card"
                onClick={() => openCalendar(apartment)}
              >
                <span className="avail-card__name">{apartment.name}</span>
                <span className="avail-card__sub">{apartment.subtitle}</span>
                <span className="avail-card__cta">{t("home.openCalendar")}</span>
              </button>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal id="casa" className="section casa">
        <div className="container">
          <HouseGuide />
        </div>
      </SectionReveal>

      <SectionReveal id="notas" className="section notas-section">
        <NotesWall />
      </SectionReveal>

      <SectionReveal id="contacto" className="section contact">
        <div className="container contact__panel">
          <p className="section-kicker">{t("home.contactKicker")}</p>
          <h2 className="section-title">{t("home.contactTitle")}</h2>
          <p className="section-intro">{t("home.contactIntro")}</p>
          <div className="contact__actions">
            <a
              className="btn btn-whatsapp"
              href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                t("home.waInterest", { brand: site.brand })
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("home.writeWhatsapp")}
            </a>
            <a className="btn btn-ghost" href={`tel:${site.phone}`}>
              {t("home.call")}
            </a>
          </div>
          <p className="contact__meta">
            {site.location} · {t("site.distance")}
          </p>
        </div>
      </SectionReveal>

      {showCalendar && selectedApartment && (
        <AvailabilityCalendar
          key={`${selectedApartment.id}-${calendarKey}`}
          apartment={selectedApartment}
          onClose={() => {
            setShowCalendar(false);
            setCalendarKey((k) => k + 1);
          }}
        />
      )}
    </div>
  );
};

export default Home;
