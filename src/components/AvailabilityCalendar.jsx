import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes, FaWhatsapp, FaPhone } from "react-icons/fa";
import "./AvailabilityCalendar.css";

const AvailabilityCalendar = ({ apartment, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  
  // Start week with Monday
  const getNextMonth = (date) => {
    const nextMonth = new Date(date);
    nextMonth.setMonth(date.getMonth() + 1);
    return nextMonth;
  };

  // Sample occupied dates
  const occupiedDates = [
    new Date(2024, 11, 15),
    new Date(2024, 11, 16),
    new Date(2024, 11, 22),
    new Date(2024, 11, 23),
    new Date(2024, 11, 24),
    new Date(2024, 11, 25),
    new Date(2024, 11, 31),
    new Date(2025, 0, 1),
    new Date(2025, 0, 6),
    new Date(2025, 0, 12),
    new Date(2025, 0, 13),
  ];

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Start with Monday
  const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Adjust for Monday start (0 = Sunday, 1 = Monday, etc.)
    let startingDayOfWeek = firstDay.getDay();
    startingDayOfWeek = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    const days = [];

    // Empty days at the beginning
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Days of the month
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
    return (checkIn && date.toDateString() === checkIn.toDateString()) ||
           (checkOut && date.toDateString() === checkOut.toDateString());
  };

  const isDateInRange = (date) => {
    if (!date || !checkIn || !checkOut) return false;
    return date > checkIn && date < checkOut;
  };

  const isDateInPast = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateClick = (date) => {
    if (!date || isDateOccupied(date) || isDateInPast(date)) return;

    if (!checkIn || (checkIn && checkOut)) {
      // Start new selection
      setCheckIn(date);
      setCheckOut(null);
      setSelectedDates([date]);
    } else if (checkIn && !checkOut) {
      if (date < checkIn) {
        // If selected date is before check-in, make it the new check-in
        setCheckIn(date);
        setSelectedDates([date]);
      } else {
        // Set as check-out
        setCheckOut(date);
        
        // Generate all dates in range
        const dates = [];
        const current = new Date(checkIn);
        while (current <= date) {
          dates.push(new Date(current));
          current.setDate(current.getDate() + 1);
        }
        setSelectedDates(dates);
      }
    }
  };

  const clearDates = () => {
    setCheckIn(null);
    setCheckOut(null);
    setSelectedDates([]);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const basePrice = nights * apartment.price;
    const cleaningFee = 15;
    return basePrice + cleaningFee;
  };

  const renderCalendarMonth = (date, monthIndex) => {
    const days = getDaysInMonth(date);
    
    return (
      <div className="month-calendar" key={monthIndex}>
        <div className="month-header">
          <h3 className="month-title">
            {monthNames[date.getMonth()]} {date.getFullYear()}
          </h3>
        </div>
        
        <div className="calendar-grid">
          <div className="day-headers">
            {dayNames.map((day) => (
              <div key={day} className="day-header">
                {day}
              </div>
            ))}
          </div>

          <div className="days-grid">
            {days.map((date, index) => {
              const isOccupied = isDateOccupied(date);
              const isSelected = isDateSelected(date);
              const isInRange = isDateInRange(date);
              const isPast = isDateInPast(date);

              return (
                <div
                  key={index}
                  className={`day-cell ${!date ? "empty" : ""} ${
                    isOccupied ? "occupied" : ""
                  } ${isSelected ? "selected" : ""} ${
                    isInRange ? "in-range" : ""
                  } ${isPast ? "past" : ""} ${
                    date && !isOccupied && !isPast ? "available" : ""
                  }`}
                  onClick={() => handleDateClick(date)}
                >
                  {date ? date.getDate() : ""}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const nights = calculateNights();
  const total = calculateTotal();

  return (
    <div className="calendar-overlay">
      <div className="calendar-modal">
        <div className="calendar-header">
          <h2 className="calendar-title">
            Selecciona tus fechas
          </h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="calendar-content">
          {/* Left side - Calendar */}
          <div className="calendar-left">
            <div className="calendar-navigation">
              <button 
                onClick={() => navigateMonth(-1)} 
                className="nav-btn"
                disabled={currentDate.getMonth() === new Date().getMonth() && 
                         currentDate.getFullYear() === new Date().getFullYear()}
              >
                <FaChevronLeft />
              </button>
              <button onClick={() => navigateMonth(1)} className="nav-btn">
                <FaChevronRight />
              </button>
            </div>
            
            <div className="calendar-months">
              {renderCalendarMonth(currentDate, 0)}
              {renderCalendarMonth(getNextMonth(currentDate), 1)}
            </div>
            
            <div className="calendar-legend">
              <div className="legend-item">
                <div className="legend-dot available"></div>
                <span>Disponible</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot occupied"></div>
                <span>Ocupado</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot selected"></div>
                <span>Seleccionado</span>
              </div>
            </div>
            
            {selectedDates.length > 0 && (
              <div className="clear-dates">
                <button onClick={clearDates} className="clear-btn">
                  Limpiar fechas
                </button>
              </div>
            )}
          </div>

          {/* Right side - Booking info */}
          <div className="calendar-right">
            <div className="booking-summary">
              <div className="apartment-info">
                <h3>{apartment.name}</h3>
                <div className="price-info">
                  <span className="price-amount">{apartment.price}€</span>
                  <span className="price-period">por noche</span>
                </div>
              </div>
              
              <div className="selected-dates">
                <h4>Fechas seleccionadas</h4>
                {checkIn && checkOut ? (
                  <div className="date-range">
                    <div className="date-item">
                      <span className="date-label">Entrada</span>
                      <span className="date-value">
                        {checkIn.toLocaleDateString('es-ES', { 
                          weekday: 'short', 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </span>
                    </div>
                    <div className="date-item">
                      <span className="date-label">Salida</span>
                      <span className="date-value">
                        {checkOut.toLocaleDateString('es-ES', { 
                          weekday: 'short', 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </span>
                    </div>
                    <div className="nights-info">
                      {nights} noche{nights !== 1 ? 's' : ''}
                    </div>
                  </div>
                ) : (
                  <div className="no-dates">
                    {checkIn ? 'Selecciona la fecha de salida' : 'Selecciona las fechas en el calendario'}
                  </div>
                )}
              </div>
              
              {nights > 0 && (
                <div className="price-breakdown">
                  <h4>Desglose del precio</h4>
                  <div className="price-row">
                    <span>{apartment.price}€ × {nights} noche{nights !== 1 ? 's' : ''}</span>
                    <span>{apartment.price * nights}€</span>
                  </div>
                  <div className="price-row">
                    <span>Gastos de limpieza</span>
                    <span>15€</span>
                  </div>
                  <div className="price-row total">
                    <span>Total</span>
                    <span>{total}€</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="contact-section">
              <h4>¿Listo para reservar?</h4>
              <div className="contact-info">
                <p>
                  Contacta con nosotros para confirmar tu reserva. 
                  Te ayudaremos con todos los detalles.
                </p>
              </div>
              
              <div className="contact-buttons">
                <a 
                  href={`https://wa.me/34123456789?text=Hola! Me interesa reservar ${apartment.name}${checkIn && checkOut ? ` del ${checkIn.toLocaleDateString('es-ES')} al ${checkOut.toLocaleDateString('es-ES')} (${nights} noche${nights !== 1 ? 's' : ''} - ${total}€ total)` : ''}`}
                  className="contact-btn whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp />
                  Reservar por WhatsApp
                </a>
                <a href="tel:+34123456789" className="contact-btn phone">
                  <FaPhone />
                  Llamar para reservar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;