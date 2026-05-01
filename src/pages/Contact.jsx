import {
	FaPhone,
	FaEnvelope,
	FaWhatsapp,
	FaMapMarkerAlt,
} from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
	return (
		<div className="contact-page">
			<section className="hero-contact">
				<div className="container">
					<div className="hero-content">
						<h1 className="hero-title">Contacto directo</h1>
						<p className="hero-subtitle">
							Página interna para familia y amigos. Si os cuadran las fechas,
							escribidnos y lo organizamos rápido.
						</p>
					</div>
				</div>
			</section>

			<section className="contact-methods-section">
				<div className="container">
					<h2 className="section-title">Canales de contacto</h2>
					<div className="contact-grid">
						<div className="contact-card">
							<FaPhone className="contact-card-icon" />
							<h3>Teléfono</h3>
							<p>+34 123 456 789</p>
							<a href="tel:+34123456789" className="btn btn-secondary">
								Llamar
							</a>
						</div>

						<div className="contact-card">
							<FaEnvelope className="contact-card-icon" />
							<h3>Email</h3>
							<p>info@apartamentoslisle.com</p>
							<a
								href="mailto:info@apartamentoslisle.com"
								className="btn btn-secondary">
								Enviar email
							</a>
						</div>

						<div className="contact-card">
							<FaWhatsapp className="contact-card-icon" />
							<h3>WhatsApp</h3>
							<p>+34 123 456 789</p>
							<a
								href="https://wa.me/34123456789"
								target="_blank"
								rel="noopener noreferrer"
								className="btn btn-secondary">
								Abrir WhatsApp
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className="booking-process-section">
				<div className="container">
					<h2 className="section-title">Cómo lo hacemos</h2>
					<div className="process-steps-grid">
						<div className="step-card">
							<div className="step-number">1</div>
							<h3>Nos escribís</h3>
							<p>Por teléfono, WhatsApp o email.</p>
						</div>
						<div className="step-card">
							<div className="step-number">2</div>
							<h3>Confirmamos fechas</h3>
							<p>Revisamos disponibilidad con vosotros.</p>
						</div>
						<div className="step-card">
							<div className="step-number">3</div>
							<h3>Cerramos detalles</h3>
							<p>Os pasamos todo lo necesario para entrar.</p>
						</div>
						<div className="step-card">
							<div className="step-number">4</div>
							<h3>Disfrutar</h3>
							<p>Precio único de 10€ por noche.</p>
						</div>
					</div>
				</div>
			</section>

			<section className="location-section-contact">
				<div className="container location-card">
					<div className="location-content">
						<FaMapMarkerAlt className="location-icon" />
						<h2 className="section-title">Ubicación</h2>
						<p className="location-text">
							Estamos en Lisle, en una zona tranquila y cómoda para moverse.
							Si lo necesitáis, os pasamos ruta y recomendaciones por WhatsApp.
						</p>
						<button
							className="btn btn-primary"
							onClick={() => (window.location.href = "/")}>
							Volver al inicio
						</button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Contact;
