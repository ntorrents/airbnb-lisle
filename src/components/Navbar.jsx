import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPhone, FaWhatsapp } from "react-icons/fa";
import { BiMenu, BiX } from "react-icons/bi";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <FaHome className="navbar-logo-icon" />
          <span className="navbar-logo-text">Apartamentos Lisle</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="navbar-nav">
          <a href="/#apartamentos" className="nav-link">Apartamentos</a>
          <a href="/#disponibilidad" className="nav-link">Disponibilidad</a>
          <a href="/#como-llegar" className="nav-link">Cómo llegar</a>
          <a href="/#guia-local" className="nav-link">Guía local</a>
          <Link to="/about" className="nav-link">
            Sobre nosotros
          </Link>
        </nav>

        {/* Contact buttons - Desktop */}
        <div className="navbar-contact">
          <a href="tel:+34123456789" className="contact-btn phone">
            <FaPhone /> Llamar
          </a>
          <a
            href="https://wa.me/34123456789"
            className="contact-btn whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp /> WhatsApp
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <BiX size={24} /> : <BiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            <a href="/#apartamentos" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Apartamentos</a>
            <a href="/#disponibilidad" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Disponibilidad</a>
            <a href="/#como-llegar" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Cómo llegar</a>
            <a href="/#guia-local" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Guía local</a>
            <Link to="/about" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Sobre nosotros</Link>
          </nav>
          
          <div className="mobile-contact">
            <a href="tel:+34123456789" className="mobile-contact-btn">
              <FaPhone /> +34 123 456 789
            </a>
            <a
              href="https://wa.me/34123456789"
              className="mobile-contact-btn whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;