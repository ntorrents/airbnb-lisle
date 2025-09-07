import React from "react";
import "./Contact.css";

const Contact = () => {
	return (
		<div className="contact-page">
			<div className="container">
				<div className="contact-header">
					<h1>Contacto</h1>
					<p className="contact-subtitle">
						¿Interesado en nuestros apartamentos? ¡Ponte en contacto con
						nosotros!
					</p>
				</div>

				<div className="contact-content">
					<div className="contact-info">
						<h2>Información de Contacto</h2>
						<p>
							Nos encanta conocer a nuestros futuros huéspedes personalmente.
							Puedes contactarnos a través de cualquiera de estos medios:
						</p>

						<div className="contact-methods">
							<div className="contact-method">
								<div className="contact-icon">📞</div>
								<div className="contact-details">
									<h3>Teléfono</h3>
									<p>+34 123 456 789</p>
									<span className="contact-note">
										Disponible de 9:00 a 21:00
									</span>
								</div>
							</div>

							<div className="contact-method">
								<div className="contact-icon">📧</div>
								<div className="contact-details">
									<h3>Email</h3>
									<p>apartamentos@ejemplo.com</p>
									<span className="contact-note">Respuesta en 24 horas</span>
								</div>
							</div>

							<div className="contact-method whatsapp">
								<div className="contact-icon">💬</div>
								<div className="contact-details">
									<h3>WhatsApp</h3>
									<p>+34 123 456 789</p>
									<span className="contact-note">Respuesta inmediata</span>
								</div>
							</div>
						</div>
					</div>

					<div className="booking-process">
						<h2>Proceso de Reserva</h2>
						<div className="process-steps">
							<div className="step">
								<div className="step-number">1</div>
								<div className="step-content">
									<h3>Contacto Inicial</h3>
									<p>Ponte en contacto con nosotros por tu medio preferido</p>
								</div>
							</div>

							<div className="step">
								<div className="step-number">2</div>
								<div className="step-content">
									<h3>Consulta de Disponibilidad</h3>
									<p>Te confirmamos la disponibilidad para tus fechas</p>
								</div>
							</div>

							<div className="step">
								<div className="step-number">3</div>
								<div className="step-content">
									<h3>Confirmación Personal</h3>
									<p>Acordamos los detalles de tu estancia</p>
								</div>
							</div>

							<div className="step">
								<div className="step-number">4</div>
								<div className="step-content">
									<h3>¡Disfruta tu Estancia!</h3>
									<p>Te recibimos y te ayudamos con todo lo que necesites</p>
								</div>
							</div>
						</div>
					</div>

					<div className="important-info">
						<h2>Información Importante</h2>
						<div className="info-grid">
							<div className="info-item">
								<h3>💰 Precio</h3>
								<p>10€ por noche por apartamento</p>
							</div>

							<div className="info-item">
								<h3>👥 Capacidad</h3>
								<p>Hasta 4 personas por apartamento</p>
							</div>

							<div className="info-item">
								<h3>🕐 Check-in</h3>
								<p>Flexible, coordinamos contigo</p>
							</div>

							<div className="info-item">
								<h3>🧹 Limpieza</h3>
								<p>Incluida en el precio</p>
							</div>

							<div className="info-item">
								<h3>🚗 Parking</h3>
								<p>Disponible en la zona</p>
							</div>

							<div className="info-item">
								<h3>🐕 Mascotas</h3>
								<p>Consultar disponibilidad</p>
							</div>
						</div>
					</div>

					<div className="location-info">
						<h2>Ubicación</h2>
						<p>
							Nuestros apartamentos están ubicados en el centro de la ciudad,
							con fácil acceso a transporte público, restaurantes, tiendas y
							principales lugares de interés.
						</p>

						<div className="location-highlights">
							<div className="highlight">
								<span className="highlight-icon">🚇</span>
								<span>Metro a 5 minutos</span>
							</div>
							<div className="highlight">
								<span className="highlight-icon">🍽️</span>
								<span>Restaurantes cercanos</span>
							</div>
							<div className="highlight">
								<span className="highlight-icon">🛒</span>
								<span>Supermercados a 2 minutos</span>
							</div>
							<div className="highlight">
								<span className="highlight-icon">🏛️</span>
								<span>Centro histórico a 10 minutos</span>
							</div>
						</div>
					</div>

					<div className="contact-cta">
						<h2>¿Listo para tu Estancia?</h2>
						<p>
							No dudes en contactarnos para cualquier consulta. ¡Estaremos
							encantados de recibirte!
						</p>
						<div className="cta-buttons">
							<a href="tel:+34123456789" className="cta-button phone">
								📞 Llamar Ahora
							</a>
							<a
								href="https://wa.me/34123456789"
								className="cta-button whatsapp"
								target="_blank"
								rel="noopener noreferrer">
								💬 WhatsApp
							</a>
							<a
								href="mailto:apartamentos@ejemplo.com"
								className="cta-button email">
								📧 Enviar Email
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
