import { useState, useEffect } from "react";
import { checkAvailability, createBooking } from "../services/apartmentService";
import "./BookingCalendar.css";

const BookingCalendar = ({
	apartmentId,
	price,
	initialCheckIn,
	initialCheckOut,
	initialGuests,
}) => {
	const [checkIn, setCheckIn] = useState(initialCheckIn || "");
	const [checkOut, setCheckOut] = useState(initialCheckOut || "");
	const [guests, setGuests] = useState(initialGuests || 1);
	const [isAvailable, setIsAvailable] = useState(null);
	const [totalPrice, setTotalPrice] = useState(0);
	const [bookingStatus, setBookingStatus] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	// Calcular el precio total cuando cambian las fechas o el número de huéspedes
	useEffect(() => {
		if (checkIn && checkOut) {
			const start = new Date(checkIn);
			const end = new Date(checkOut);
			const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

			if (nights > 0) {
				// Precio base por noche * número de noches
				const basePrice = price * nights;

				// Tarifa de limpieza (fija)
				const cleaningFee = 35;

				// Tarifa de servicio (porcentaje del precio base)
				const serviceFee = basePrice * 0.12;

				// Precio total
				const total = basePrice + cleaningFee + serviceFee;

				setTotalPrice(total);
			}
		}
	}, [checkIn, checkOut, guests, price]);

	// Verificar disponibilidad cuando cambian las fechas
	useEffect(() => {
		if (checkIn && checkOut) {
			const checkInDate = new Date(checkIn);
			const checkOutDate = new Date(checkOut);

			if (checkOutDate > checkInDate) {
				const available = checkAvailability(apartmentId, checkIn, checkOut);
				setIsAvailable(available);
			} else {
				setIsAvailable(false);
			}
		} else {
			setIsAvailable(null);
		}
	}, [checkIn, checkOut, apartmentId]);

	const handleReservation = () => {
		if (!checkIn || !checkOut || guests < 1) {
			setBookingStatus({
				success: false,
				message: "Por favor, completa todos los campos",
			});
			return;
		}

		setIsLoading(true);

		// Crear objeto de reserva
		const booking = {
			checkIn,
			checkOut,
			guests,
			totalPrice,
		};

		// Llamar al servicio para crear la reserva
		const result = createBooking(apartmentId, booking);

		setBookingStatus(result);
		setIsLoading(false);

		// Si la reserva fue exitosa, limpiar el formulario
		if (result.success) {
			setCheckIn("");
			setCheckOut("");
			setGuests(1);
		}
	};

	// Obtener la fecha mínima (hoy) para el selector de fechas
	const today = new Date().toISOString().split("T")[0];

	return (
		<div className="booking-calendar">
			<h3 className="booking-title">
				${price} <span className="booking-night">noche</span>
			</h3>

			<div className="date-inputs">
				<div className="date-input-group">
					<label htmlFor="check-in">Llegada</label>
					<input
						id="check-in"
						type="date"
						value={checkIn}
						min={today}
						onChange={(e) => setCheckIn(e.target.value)}
						className="date-input"
					/>
				</div>

				<div className="date-input-group">
					<label htmlFor="check-out">Salida</label>
					<input
						id="check-out"
						type="date"
						value={checkOut}
						min={checkIn || today}
						onChange={(e) => setCheckOut(e.target.value)}
						className="date-input"
					/>
				</div>
			</div>

			<div className="guests-input">
				<label htmlFor="guests">Huéspedes</label>
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
						onClick={() => setGuests((prev) => prev + 1)}>
						+
					</button>
				</div>
			</div>

			{isAvailable !== null && (
				<div
					className={`availability-message ${
						isAvailable ? "available" : "unavailable"
					}`}>
					{isAvailable ? "✓ Fechas disponibles" : "✗ Fechas no disponibles"}
				</div>
			)}

			{checkIn && checkOut && totalPrice > 0 && (
				<div className="price-breakdown">
					<div className="price-row">
						<span>
							${price} x{" "}
							{Math.ceil(
								(new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
							)}{" "}
							noches
						</span>
						<span>
							$
							{price *
								Math.ceil(
									(new Date(checkOut) - new Date(checkIn)) /
										(1000 * 60 * 60 * 24)
								)}
						</span>
					</div>
					<div className="price-row">
						<span>Tarifa de limpieza</span>
						<span>$35</span>
					</div>
					<div className="price-row">
						<span>Tarifa de servicio</span>
						<span>
							$
							{Math.round(
								price *
									Math.ceil(
										(new Date(checkOut) - new Date(checkIn)) /
											(1000 * 60 * 60 * 24)
									) *
									0.12
							)}
						</span>
					</div>
					<div className="price-total">
						<span>Total</span>
						<span>${Math.round(totalPrice)}</span>
					</div>
				</div>
			)}

			<button
				className="reserve-button"
				onClick={handleReservation}
				disabled={!isAvailable || isLoading}>
				{isLoading ? "Procesando..." : "Reservar"}
			</button>

			{bookingStatus && (
				<div
					className={`booking-status ${
						bookingStatus.success ? "success" : "error"
					}`}>
					{bookingStatus.message ||
						(bookingStatus.success
							? "¡Reserva confirmada!"
							: "Error al procesar la reserva")}
				</div>
			)}
		</div>
	);
};

export default BookingCalendar;
