import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import "./AvailabilityCalendar.css";

const AvailabilityCalendar = ({ apartment, onClose }) => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDates, setSelectedDates] = useState([]);
	
	// Función para obtener el mes siguiente
	const getNextMonth = (date) => {
		const nextMonth = new Date(date);
		nextMonth.setMonth(date.getMonth() + 1);
		return nextMonth;
	};

	// Días ocupados simulados (en una aplicación real, esto vendría de una API)
	const occupiedDates = [
		new Date(2024, 11, 15), // 15 diciembre 2024
		new Date(2024, 11, 16), // 16 diciembre 2024
		new Date(2024, 11, 22), // 22 diciembre 2024
		new Date(2024, 11, 23), // 23 diciembre 2024
		new Date(2024, 11, 24), // 24 diciembre 2024
		new Date(2024, 11, 25), // 25 diciembre 2024
		new Date(2024, 11, 31), // 31 diciembre 2024
		new Date(2025, 0, 1), // 1 enero 2025
		new Date(2025, 0, 6), // 6 enero 2025
		new Date(2025, 0, 12), // 12 enero 2025
		new Date(2025, 0, 13), // 13 enero 2025
	];

	const monthNames = [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre",
	];

	const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

	const getDaysInMonth = (date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = firstDay.getDay();

		const days = [];

		// Días vacíos al inicio del mes
		for (let i = 0; i < startingDayOfWeek; i++) {
			days.push(null);
		}

		// Días del mes
		for (let day = 1; day <= daysInMonth; day++) {
			days.push(new Date(year, month, day));
		}

		return days;
	};

	const isDateOccupied = (date) => {
		if (!date) return false;
		return occupiedDates.some(
			(occupiedDate) => occupiedDate.toDateString() === date.toDateString()
		);
	};

	const isDateSelected = (date) => {
		if (!date) return false;
		return selectedDates.some(
			(selectedDate) => selectedDate.toDateString() === date.toDateString()
		);
	};

	const isDateInPast = (date) => {
		if (!date) return false;
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return date < today;
	};

	const handleDateClick = (date) => {
		if (!date || isDateOccupied(date) || isDateInPast(date)) return;

		const isSelected = isDateSelected(date);
		if (isSelected) {
			setSelectedDates(
				selectedDates.filter((d) => d.toDateString() !== date.toDateString())
			);
		} else {
			setSelectedDates([...selectedDates, date]);
		}
	};

	const navigateMonth = (direction) => {
		const newDate = new Date(currentDate);
		newDate.setMonth(currentDate.getMonth() + direction);
		setCurrentDate(newDate);
	};



const renderCalendarMonth = (date, monthIndex) => {
		const days = getDaysInMonth(date);
		
		return (
			<div className="month-calendar" key={monthIndex}>
				<div className="month-header">
					<h3>{monthNames[date.getMonth()]} {date.getFullYear()}</h3>
				</div>
				
				<div className="calendar-grid">
					<div className="day-headers">
						{dayNames.map((day) => (
							<div key={day} className="day-header">
								{day.charAt(0)}
							</div>
						))}
					</div>

					<div className="days-grid">
						{days.map((date, index) => {
							const isOccupied = isDateOccupied(date);
							const isSelected = isDateSelected(date);
							const isPast = isDateInPast(date);

							return (
								<div
									key={index}
									className={`day-cell ${!date ? "empty" : ""} ${
										isOccupied ? "occupied" : ""
									} ${isSelected ? "selected" : ""} ${isPast ? "past" : ""} ${
										date && !isOccupied && !isPast ? "available" : ""
									}`}
									onClick={() => handleDateClick(date)}>
									{date ? date.getDate() : ""}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="calendar-overlay">
			<div className="calendar-modal">
				<div className="calendar-header">
					<h2>{selectedDates.length > 0 ? `${selectedDates.length} noches` : "2 noches"} en {apartment.name}</h2>
					<button className="close-btn" onClick={onClose}>
						<FaTimes />
					</button>
				</div>

				<div className="calendar-main-content">
					{/* Sección izquierda - Calendarios */}
					<div className="calendar-left">
						<div className="calendar-navigation">
							<button onClick={() => navigateMonth(-1)} className="nav-btn">
								<FaChevronLeft />
							</button>
							<button onClick={() => navigateMonth(1)} className="nav-btn">
								<FaChevronRight />
							</button>
						</div>
						
						<div className="months-container">
							{renderCalendarMonth(currentDate, 0)}
							{renderCalendarMonth(getNextMonth(currentDate), 1)}
						</div>
						
						<div className="calendar-legend">
							<div className="legend-item">
								<div className="legend-color available"></div>
								<span>Disponible</span>
							</div>
							<div className="legend-item">
								<div className="legend-color occupied"></div>
								<span>Ocupado</span>
							</div>
							<div className="legend-item">
								<div className="legend-color selected"></div>
								<span>Seleccionado</span>
							</div>
						</div>
						
						<div className="clear-dates">
							<button onClick={() => setSelectedDates([])} className="clear-btn">
								Borrar fechas
							</button>
						</div>
					</div>

					{/* Sección derecha - Información del apartamento */}
					<div className="calendar-right">
						<div className="apartment-info">
							<div className="apartment-header">
								<h3>{apartment.name}</h3>
								<div className="price-info">
									<span className="price-amount">10 €</span>
									<span className="price-period">por noche</span>
								</div>
							</div>
							
							<div className="apartment-amenities">
								<h4>Comodidades incluidas</h4>
								<div className="amenities-list">
									<div className="amenity-item">
										<span className="amenity-icon">📺</span>
										<span>Televisión</span>
									</div>
									<div className="amenity-item">
										<span className="amenity-icon">🌐</span>
										<span>WiFi gratuito</span>
									</div>
									<div className="amenity-item">
										<span className="amenity-icon">🅿️</span>
										<span>Aparcamiento</span>
									</div>
									<div className="amenity-item">
										<span className="amenity-icon">🏠</span>
										<span>Cocina completa</span>
									</div>
								</div>
							</div>
							
							<div className="date-selection">
								<h4>Selecciona tus fechas</h4>
								<div className="selected-dates-info">
									{selectedDates.length === 0 ? (
										<p className="no-dates">Selecciona fechas en el calendario</p>
									) : (
										<div className="dates-summary">
											<div className="date-range">
												<span className="date-label">Entrada:</span>
												<span className="date-value">
													{selectedDates[0].toLocaleDateString('es-ES', { 
														weekday: 'short', 
														day: 'numeric', 
														month: 'short' 
													})}
												</span>
											</div>
											{selectedDates.length > 1 && (
												<div className="date-range">
													<span className="date-label">Salida:</span>
													<span className="date-value">
														{selectedDates[selectedDates.length - 1].toLocaleDateString('es-ES', { 
															weekday: 'short', 
															day: 'numeric', 
															month: 'short' 
														})}
													</span>
												</div>
											)}
											<div className="nights-count">
												<span>{selectedDates.length} noche{selectedDates.length !== 1 ? 's' : ''} seleccionada{selectedDates.length !== 1 ? 's' : ''}</span>
											</div>
										</div>
									)}
								</div>
							</div>
							
							{selectedDates.length > 0 && (
								<div className="price-calculator">
									<h4>Resumen del precio</h4>
									<div className="calculation">
										<div className="calc-row">
											<span>10 € × {selectedDates.length} noche{selectedDates.length !== 1 ? 's' : ''}</span>
											<span>{10 * selectedDates.length} €</span>
										</div>
										<div className="calc-row">
											<span>Gastos de limpieza</span>
											<span>15 €</span>
										</div>
										<div className="calc-row total">
											<span>Total</span>
											<span>{(10 * selectedDates.length) + 15} €</span>
										</div>
									</div>
									
									<button className="book-now-btn">
										Reservar ahora
									</button>
								</div>
							)}
							
							<div className="contact-info">
								<p>¿Tienes preguntas?</p>
								<div className="contact-methods">
									<a href="tel:+34123456789" className="contact-link">
										📞 Llamar
									</a>
									<a href="https://wa.me/34123456789" className="contact-link" target="_blank" rel="noopener noreferrer">
										💬 WhatsApp
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AvailabilityCalendar;
