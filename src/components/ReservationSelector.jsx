import { useState } from "react";
import {
	FaCalendarAlt,
	FaUsers,
	FaArrowRight,
	FaBed,
	FaBath,
	FaRulerCombined,
} from "react-icons/fa";
import {
	checkAvailability,
	getAllApartments,
} from "../services/apartmentService";
import "./ReservationSelector.css";

const ReservationSelector = ({ onContinue }) => {
	const [checkInDate, setCheckInDate] = useState("");
	const [checkOutDate, setCheckOutDate] = useState("");
	const [guests, setGuests] = useState(1);
	const [selectedOption, setSelectedOption] = useState(null); // 'single' o 'both'
	const [selectedApartment, setSelectedApartment] = useState(null);
	const [availableApartments, setAvailableApartments] = useState([]);
	const [showOptions, setShowOptions] = useState(false);
	const [error, setError] = useState("");

	// Validar fechas y buscar disponibilidad
	const handleSearch = () => {
		// Resetear errores y selecciones previas
		setError("");
		setSelectedOption(null);
		setSelectedApartment(null);

		// Validar que se hayan ingresado ambas fechas
		if (!checkInDate || !checkOutDate) {
			setError("Por favor, selecciona las fechas de entrada y salida.");
			return;
		}

		// Convertir strings a objetos Date
		const checkIn = new Date(checkInDate);
		const checkOut = new Date(checkOutDate);

		// Validar que la fecha de salida sea posterior a la de entrada
		if (checkOut <= checkIn) {
			setError("La fecha de salida debe ser posterior a la fecha de entrada.");
			return;
		}

		// Validar que la fecha de entrada sea hoy o posterior
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		if (checkIn < today) {
			setError("La fecha de entrada no puede ser anterior a hoy.");
			return;
		}

		// Validar número de huéspedes
		if (guests < 1) {
			setError("Debe haber al menos 1 huésped.");
			return;
		}

		// Obtener todos los apartamentos
		const allApartments = getAllApartments();

		// Verificar disponibilidad para cada apartamento
		const available = allApartments.filter((apt) => {
			// Verificar si el apartamento tiene capacidad para los huéspedes
			if (apt.maxGuests < guests) {
				return false;
			}

			// Verificar disponibilidad en las fechas seleccionadas
			return checkAvailability(apt.id, checkInDate, checkOutDate);
		});

		if (available.length === 0) {
			setError(
				"Lo sentimos, no hay apartamentos disponibles para las fechas y número de huéspedes seleccionados."
			);
			return;
		}

		// Guardar apartamentos disponibles y mostrar opciones
		setAvailableApartments(available);
		setShowOptions(true);
	};

	// Seleccionar opción (un apartamento o ambos)
	const handleSelectOption = (option, apartment = null) => {
		setSelectedOption(option);
		setSelectedApartment(apartment);
	};

	// Continuar con la reserva
	const handleContinue = () => {
		if (selectedOption === "single" && selectedApartment) {
			// Pasar el apartamento seleccionado y las fechas al componente padre
			onContinue({
				apartment: selectedApartment,
				checkInDate,
				checkOutDate,
				guests,
			});
		} else if (selectedOption === "both") {
			// Pasar ambos apartamentos y las fechas al componente padre
			onContinue({
				apartment: "both",
				apartments: availableApartments,
				checkInDate,
				checkOutDate,
				guests,
			});
		}
	};

	// Calcular si ambos apartamentos están disponibles
	const bothAvailable = availableApartments.length === 2;

	// Obtener la fecha mínima (hoy) para el selector de fechas
	const today = new Date().toISOString().split("T")[0];

	return (
		<div className="reservation-selector-container">
			<div className="reservation-selector">
				<h2 className="reservation-title">Reserva tu estancia</h2>

				{/* Formulario de búsqueda */}
				<div className="search-form">
					<div className="date-inputs">
						<div className="date-input-group">
							<label htmlFor="check-in">
								<FaCalendarAlt /> Llegada
							</label>
							<input
								id="check-in"
								type="date"
								className="date-input"
								value={checkInDate}
								onChange={(e) => setCheckInDate(e.target.value)}
								min={today}
							/>
						</div>

						<div className="date-input-group">
							<label htmlFor="check-out">
								<FaCalendarAlt /> Salida
							</label>
							<input
								id="check-out"
								type="date"
								className="date-input"
								value={checkOutDate}
								onChange={(e) => setCheckOutDate(e.target.value)}
								min={checkInDate || today}
							/>
						</div>
					</div>

					<div className="guests-input">
						<label>
							<FaUsers /> Huéspedes
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
								onClick={() => setGuests((prev) => Math.min(8, prev + 1))}
								disabled={guests >= 8}>
								+
							</button>
						</div>
					</div>

					<button className="search-button" onClick={handleSearch}>
						Buscar disponibilidad
					</button>
				</div>

				{/* Mensaje de error */}
				{error && <div className="error-message">{error}</div>}

				{/* Opciones de apartamentos */}
				{showOptions && availableApartments.length > 0 && (
					<div className="apartment-options">
						<h3 className="options-title">Apartamentos disponibles</h3>

						<div className="options-container">
							{/* Opción de apartamento individual */}
							<div
								className={`option-card ${
									selectedOption === "single" ? "selected" : ""
								}`}
								onClick={() => handleSelectOption("single")}>
								<div className="option-header">
									<h4>Apartamento individual</h4>
									<span className="option-badge">Recomendado</span>
								</div>
								<p className="option-description">
									Selecciona uno de nuestros apartamentos para tu estancia. Cada
									apartamento está completamente equipado y ofrece una
									experiencia única.
								</p>

								<div className="apartment-selection">
									{availableApartments.map((apt) => (
										<div
											key={apt.id}
											className={`apartment-choice ${
												selectedOption === "single" &&
												selectedApartment?.id === apt.id
													? "selected"
													: ""
											}`}
											onClick={(e) => {
												e.stopPropagation();
												handleSelectOption("single", apt);
											}}>
											<div className="apartment-choice-image">
												<img src={apt.image} alt={apt.name} />
											</div>
											<div className="apartment-choice-details">
												<h5>{apt.name}</h5>
												<div className="apartment-specs">
													<span>
														<FaBed /> {apt.bedrooms}
													</span>
													<span>
														<FaBath /> {apt.bathrooms}
													</span>
													<span>
														<FaRulerCombined /> {apt.size} m²
													</span>
												</div>
												<div className="apartment-price">
													{apt.price}€ / noche
												</div>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Opción de ambos apartamentos (solo si ambos están disponibles) */}
							{bothAvailable && (
								<div
									className={`option-card ${
										selectedOption === "both" ? "selected" : ""
									}`}
									onClick={() => handleSelectOption("both")}>
									<div className="option-header">
										<h4>Ambos apartamentos</h4>
										<span className="option-badge special">
											Oferta especial
										</span>
									</div>
									<p className="option-description">
										¿Vienes con familia o amigos? Reserva ambos apartamentos
										adyacentes y disfruta de más espacio y privacidad con un
										descuento especial.
									</p>

									<div className="both-apartments-info">
										<div className="both-apartments-details">
											<div className="both-spec">
												<span className="spec-value">
													{availableApartments.reduce(
														(sum, apt) => sum + apt.bedrooms,
														0
													)}
												</span>
												<span className="spec-label">Dormitorios</span>
											</div>
											<div className="both-spec">
												<span className="spec-value">
													{availableApartments.reduce(
														(sum, apt) => sum + apt.bathrooms,
														0
													)}
												</span>
												<span className="spec-label">Baños</span>
											</div>
											<div className="both-spec">
												<span className="spec-value">
													{availableApartments.reduce(
														(sum, apt) => sum + apt.size,
														0
													)}{" "}
													m²
												</span>
												<span className="spec-label">Superficie</span>
											</div>
											<div className="both-spec">
												<span className="spec-value">
													{availableApartments.reduce(
														(sum, apt) => sum + apt.maxGuests,
														0
													)}
												</span>
												<span className="spec-label">Huéspedes máx.</span>
											</div>
										</div>

										<div className="both-price">
											<span className="original-price">
												{availableApartments.reduce(
													(sum, apt) => sum + apt.price,
													0
												)}
												€ / noche
											</span>
											<span className="discounted-price">
												{Math.round(
													availableApartments.reduce(
														(sum, apt) => sum + apt.price,
														0
													) * 0.9
												)}
												€ / noche
											</span>
											<div>10% de descuento</div>
										</div>
									</div>
								</div>
							)}
						</div>

						<button
							className="continue-button"
							onClick={handleContinue}
							disabled={
								!selectedOption ||
								(selectedOption === "single" && !selectedApartment)
							}>
							Continuar con la reserva <FaArrowRight />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ReservationSelector;
