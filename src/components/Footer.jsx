import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container">
				<div className="footer-grid">
					<div>
						<h3 className="footer-heading">Acerca del apartamento</h3>
						<ul className="footer-list">
							<li>
								<Link to="/about" className="footer-link">
									Sobre nosotros
								</Link>
							</li>
							<li>
								<Link to="/features" className="footer-link">
									Características
								</Link>
							</li>
							<li>
								<Link to="/neighborhood" className="footer-link">
									El vecindario
								</Link>
							</li>
							<li>
								<Link to="/rules" className="footer-link">
									Reglas de la casa
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="footer-heading">Servicios</h3>
						<ul className="footer-list">
							<li>
								<Link to="/amenities" className="footer-link">
									Comodidades
								</Link>
							</li>
							<li>
								<Link to="/transportation" className="footer-link">
									Transporte
								</Link>
							</li>
							<li>
								<Link to="/nearby" className="footer-link">
									Lugares cercanos
								</Link>
							</li>
							<li>
								<Link to="/activities" className="footer-link">
									Actividades
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="footer-heading">Reservas</h3>
						<ul className="footer-list">
							<li>
								<Link to="/availability" className="footer-link">
									Disponibilidad
								</Link>
							</li>
							<li>
								<Link to="/booking" className="footer-link">
									Cómo reservar
								</Link>
							</li>
							<li>
								<Link to="/cancellation" className="footer-link">
									Política de cancelación
								</Link>
							</li>
							<li>
								<Link to="/faq" className="footer-link">
									Preguntas frecuentes
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="footer-heading">Contacto</h3>
						<ul className="footer-list">
							<li>
								<Link to="/contact" className="footer-link">
									Contáctanos
								</Link>
							</li>
							<li>
								<a
									href="mailto:info@apartamentolisle.com"
									className="footer-link">
									info@apartamentolisle.com
								</a>
							</li>
							<li>
								<a href="tel:+34600000000" className="footer-link">
									+34 600 000 000
								</a>
							</li>
							<li className="footer-social">
								<a
									href="https://facebook.com"
									target="_blank"
									rel="noopener noreferrer"
									className="footer-social-link">
									<FaFacebook size={20} />
								</a>
								<a
									href="https://twitter.com"
									target="_blank"
									rel="noopener noreferrer"
									className="footer-social-link">
									<FaTwitter size={20} />
								</a>
								<a
									href="https://instagram.com"
									target="_blank"
									rel="noopener noreferrer"
									className="footer-social-link">
									<FaInstagram size={20} />
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="footer-bottom">
					<p>
						&copy; {new Date().getFullYear()} Apartamento en Lisle. Todos los
						derechos reservados.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
