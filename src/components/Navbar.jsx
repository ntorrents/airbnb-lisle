import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useCms } from "../cms/CmsContext";
import { useLanguage } from "../i18n/LanguageContext";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const { site } = useCms();

  const links = [
    { href: "/#apartamentos", label: t("nav.apartments") },
    { href: "/#disponibilidad", label: t("nav.dates") },
    { href: "/#casa", label: t("nav.house") },
    { href: "/#notas", label: t("nav.notes") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const close = () => setOpen(false);

  return (
    <header
      className={`nav ${scrolled || location.pathname !== "/" ? "nav--scrolled" : ""}`}
    >
      <div className="nav__inner container">
        <Link to="/" className="nav__brand" onClick={close}>
          {site.brand}
        </Link>

        <div className="nav__tools">
          <LanguageSwitcher />
          <button
            className={`nav__toggle ${open ? "nav__toggle--open" : ""}`}
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>

        <nav className={`nav__links ${open ? "nav__links--open" : ""}`}>
          {links.map((link) => (
            <Link key={link.href} to={link.href} onClick={close}>
              {link.label}
            </Link>
          ))}
          <a
            className="nav__cta"
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
              t("home.waInterest", { brand: site.brand })
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            {t("nav.whatsapp")}
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
