import React from "react";
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
			{/* Hero Section */}
			<section className="hero-contact">
				<div className="container">
					<div className="hero-content">
						<h1 className="hero-title">Ponte en Contacto</h1>
						<p className="hero-subtitle">
							Nos encanta conocer a nuestros futuros huéspedes. Si tienes
							cualquier pregunta o quieres reservar, no dudes en contactarnos.
						</p>
					</div>
				</div>
			</section>

			{/* Contact Methods Section */}
			<section className="contact-methods-section">
				<div className="container">
					<h2 className="section-title">Nuestros Canales de Contacto</h2>
					<div className="contact-grid">
						<div className="contact-card">
							<FaPhone className="contact-card-icon" />
							<h3>Teléfono</h3>
							<p>+34 123 456 789</p>
							<a href="tel:+34123456789" className="btn btn-secondary">
								Llamar ahora
							</a>
						</div>

						<div className="contact-card">
							<FaEnvelope className="contact-card-icon" />
							<h3>Email</h3>
							<p>info@apartamentoslisle.com</p>
							<a
								href="mailto:info@apartamentoslisle.com"
								className="btn btn-secondary">
								Enviar Email
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
								Chatear ahora
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Booking Process Section */}
			<section className="booking-process-section">
				<div className="container">
					<h2 className="section-title">Proceso de Reserva Sencillo</h2>
					<div className="process-steps-grid">
						<div className="step-card">
							<div className="step-number">1</div>
							<h3>Contacto Inicial</h3>
							<p>Ponte en contacto con nosotros por tu medio preferido.</p>
						</div>
						<div className="step-card">
							<div className="step-number">2</div>
							<h3>Consulta</h3>
							<p>Te confirmamos la disponibilidad para tus fechas.</p>
						</div>
						<div className="step-card">
							<div className="step-number">3</div>
							<h3>Confirmación</h3>
							<p>Acordamos los detalles finales de tu estancia.</p>
						</div>
						<div className="step-card">
							<div className="step-number">4</div>
							<h3>¡A Disfrutar!</h3>
							<p>Te recibimos y te ayudamos con lo que necesites.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Location Section */}
			<section className="location-section-contact">
				<div className="container location-card">
					<div className="location-content">
						<FaMapMarkerAlt className="location-icon" />
						<h2 className="section-title">Ubicación Privilegiada</h2>
						<p className="location-text">
							Nuestros apartamentos están en el corazón de Lisle, con fácil
							acceso a transporte público, restaurantes, tiendas y los
							principales lugares de interés. Todo lo que necesitas, a solo unos
							pasos.
						</p>
						<button
							className="btn btn-primary"
							onClick={() => (window.location.href = "/")}>
							Explorar Apartamentos
						</button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Contact;
