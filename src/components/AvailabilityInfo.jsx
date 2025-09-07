import { useState, useEffect } from "react";
import {
	FaCalendarAlt,
	FaUsers,
	FaPhone,
	FaEnvelope,
	FaWhatsapp,
	FaCheckCircle,
	FaTimesCircle,
} from "react-icons/fa";
import { checkAvailability } from "../services/apartmentService";
import "./AvailabilityInfo.css";

const AvailabilityInfo = ({ apartmentId, price }) => {
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [guests, setGuests] = useState(1);
	const [isAvailable, setIsAvailable] = useState(null);
	const [nights, setNights] = useState(0);

	// Verificar disponibilidad cuando cambian las fechas
	useEffect(() => {
		if (checkIn && checkOut) {
			const checkInDate = new Date(checkIn);
			const checkOutDate = new Date(checkOut);

			if (checkOutDate > checkInDate) {
				const available = checkAvailability(apartmentId, checkIn, checkOut);
				setIsAvailable(available);

				const nightsCount = Math.ceil(
					(checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
				);
				setNights(nightsCount);
			} else {
				setIsAvailable(false);
				setNights(0);
			}
		} else {
			setIsAvailable(null);
			setNights(0);
		}
	}, [checkIn, checkOut, apartmentId]);

	// Obtener la fecha mínima (hoy)
	const today = new Date().toISOString().split("T")[0];

	const totalCost = nights * price;

	return (
		<div className="availability-info">
			<div className="availability-card">
				<div className="price-display">
					<span className="price-amount">{price}€</span>
					<span className="price-period">por noche</span>
				</div>

				<div className="date-selection">
					<div className="date-input-group">
						<label htmlFor="checkin-date">
							<FaCalendarAlt /> Fecha de llegada
						</label>
						<input
							id="checkin-date"
							type="date"
							value={checkIn}
							onChange={(e) => setCheckIn(e.target.value)}
							min={today}
							className="date-input"
						/>
					</div>

					<div className="date-input-group">
						<label htmlFor="checkout-date">
							<FaCalendarAlt /> Fecha de salida
						</label>
						<input
							id="checkout-date"
							type="date"
							value={checkOut}
							onChange={(e) => setCheckOut(e.target.value)}
							min={checkIn || today}
							className="date-input"
						/>
					</div>
				</div>

				<div className="guests-selection">
					<label>
						<FaUsers /> Número de huéspedes
					</label>
					<div className="guests-control">
						<button
							className="guest-btn"
							onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
							disabled={guests <= 1}>
							-
						</button>
						<span className="guests-count">{guests}</span>
						<button
							className="guest-btn"
							onClick={() => setGuests((prev) => Math.min(4, prev + 1))}
							disabled={guests >= 4}>
							+
						</button>
					</div>
				</div>

				{checkIn && checkOut && (
					<div className="availability-result">
						{isAvailable ? (
							<div className="available-message">
								<FaCheckCircle className="available-icon" />
								<div>
									<h4>¡Disponible!</h4>
									<p>
										{nights} noche{nights !== 1 ? "s" : ""} • Total: {totalCost}
										€
									</p>
								</div>
							</div>
						) : (
							<div className="unavailable-message">
								<FaTimesCircle className="unavailable-icon" />
								<div>
									<h4>No disponible</h4>
									<p>Estas fechas ya están ocupadas</p>
								</div>
							</div>
						)}
					</div>
				)}

				<div className="contact-info">
					<h4>Para reservar, contáctanos:</h4>
					<div className="contact-methods">
						<a href="tel:+34123456789" className="contact-method phone">
							<FaPhone />
							<span>+34 123 456 789</span>
						</a>
						<a
							href="mailto:reservas@apartamentoslisle.com"
							className="contact-method email">
							<FaEnvelope />
							<span>reservas@apartamentoslisle.com</span>
						</a>
						<a
							href="https://wa.me/34123456789"
							className="contact-method whatsapp"
							target="_blank"
							rel="noopener noreferrer">
							<FaWhatsapp />
							<span>WhatsApp</span>
						</a>
					</div>
				</div>

				<div className="booking-note">
					<p>
						<strong>Nota:</strong> Las reservas se gestionan de forma personal.
						Contáctanos para confirmar disponibilidad y realizar tu reserva.
					</p>
				</div>
			</div>

			<div className="info-highlights">
				<h4>Información importante</h4>
				<ul>
					<li>Precio especial para amigos y familiares</li>
					<li>Check-in flexible (coordinado por teléfono)</li>
					<li>Limpieza incluida en el precio</li>
					<li>Parking gratuito disponible</li>
					<li>WiFi de alta velocidad incluido</li>
				</ul>
			</div>
		</div>
	);
};

export default AvailabilityInfo;
