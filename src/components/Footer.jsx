import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Apartamentos Lisle</h3>
            <p style={{ color: '#717171', lineHeight: '1.6', marginBottom: '20px' }}>
              Tu hogar lejos de casa. Dos acogedores apartamentos en el corazón de Lisle, 
              perfectos para familia y amigos.
            </p>
            <div className="footer-social">
              <a href="https://facebook.com" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Enlaces rápidos</h3>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/about">Sobre nosotros</Link></li>
              <li><Link to="/contact">Contacto</Link></li>
              <li><a href="#apartments">Ver apartamentos</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Información</h3>
            <ul>
              <li><a href="#pricing">Precios</a></li>
              <li><a href="#amenities">Comodidades</a></li>
              <li><a href="#location">Ubicación</a></li>
              <li><a href="#policies">Políticas</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contacto</h3>
            <ul>
              <li>
                <a href="tel:+34123456789">
                  <FaPhone style={{ marginRight: '8px' }} />
                  +34 123 456 789
                </a>
              </li>
              <li>
                <a href="mailto:info@apartamentoslisle.com">
                  <FaEnvelope style={{ marginRight: '8px' }} />
                  info@apartamentoslisle.com
                </a>
              </li>
              <li style={{ color: '#717171', marginTop: '12px' }}>
                Lisle, Francia
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Apartamentos Lisle. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;