import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Casa familiar en Lisle</h3>
            <p className="footer-lead">
              Un espacio de la familia que compartimos con amigos para escapadas tranquilas.
              Uso interno, sencillo y fácil de gestionar.
            </p>
            <div className="footer-social compact">
              <a
                href="https://wa.me/34123456789"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribir por WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Atajos</h3>
            <ul>
              <li><a href="/#apartamentos">Apartamentos</a></li>
              <li><a href="/#disponibilidad">Disponibilidad</a></li>
              <li><a href="/#como-llegar">Cómo llegar</a></li>
              <li><a href="/#guia-local">Guía local</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Sobre la estancia</h3>
            <ul>
              <li>Precio: 10€ / noche</li>
              <li>Reserva directa por contacto</li>
              <li>Parking gratuito</li>
              <li>Pensado para amigos y familia</li>
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
                <FaMapMarkerAlt style={{ marginRight: "8px" }} />
                Lisle, Francia
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Casa familiar Lisle. Hecha para organizar escapadas entre los nuestros.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;