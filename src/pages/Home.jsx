import { useState } from "react";
import { FaStar, FaBed, FaBath, FaUsers, FaWifi, FaCar, FaUtensils, FaCalendarAlt, FaWhatsapp, FaPhone } from "react-icons/fa";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import { getAllApartments } from "../services/apartmentService";
import "./Home.css";

const Home = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const apartments = getAllApartments();

  const handleBookingClick = (apartment) => {
    setSelectedApartment(apartment);
    setShowCalendar(true);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Tu hogar lejos de casa</h1>
            <p className="hero-subtitle">
              Dos acogedores apartamentos en el corazón de Lisle, perfectos para 
              familia y amigos que buscan comodidad y tranquilidad.
            </p>
            <div className="hero-highlight">
              <FaStar />
              Solo 10€ por noche
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => document.getElementById('apartments').scrollIntoView({ behavior: 'smooth' })}
            >
              <FaCalendarAlt />
              Ver disponibilidad
            </button>
          </div>
        </div>
      </section>

      {/* Apartments Section */}
      <section id="apartments" className="apartments-section">
        <div className="container">
          <h2 className="section-title">Nuestros apartamentos</h2>
          
          <div className="apartments-grid">
            {apartments.map((apartment) => (
              <div 
                key={apartment.id} 
                className="apartment-card"
                onClick={() => handleBookingClick(apartment)}
              >
                <div className="apartment-image">
                  <img src={apartment.image} alt={apartment.name} />
                  <div className="price-badge">
                    {apartment.price}€/noche
                  </div>
                </div>
                
                <div className="apartment-content">
                  <div className="apartment-header">
                    <h3 className="apartment-name">{apartment.name}</h3>
                    <p className="apartment-description">
                      {apartment.description}
                    </p>
                  </div>
                  
                  <div className="apartment-features">
                    <div className="feature">
                      <FaBed className="feature-icon" />
                      {apartment.bedrooms} dormitorios
                    </div>
                    <div className="feature">
                      <FaBath className="feature-icon" />
                      {apartment.bathrooms} baño
                    </div>
                    <div className="feature">
                      <FaUsers className="feature-icon" />
                      Hasta {apartment.maxGuests} huéspedes
                    </div>
                  </div>
                  
                  <div className="apartment-footer">
                    <div className="rating">
                      <FaStar className="rating-star" />
                      4.9 (12 reseñas)
                    </div>
                    <button className="btn btn-secondary">
                      Ver fechas
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">¿Por qué elegir nuestros apartamentos?</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <FaWifi className="feature-card-icon" />
              <h3>WiFi de alta velocidad</h3>
              <p>Conexión a internet rápida y estable para trabajo o entretenimiento</p>
            </div>
            
            <div className="feature-card">
              <FaCar className="feature-card-icon" />
              <h3>Parking gratuito</h3>
              <p>Aparcamiento disponible sin coste adicional para tu comodidad</p>
            </div>
            
            <div className="feature-card">
              <FaUtensils className="feature-card-icon" />
              <h3>Cocina equipada</h3>
              <p>Cocina completa con todos los electrodomésticos necesarios</p>
            </div>
            
            <div className="feature-card">
              <FaUsers className="feature-card-icon" />
              <h3>Ambiente familiar</h3>
              <p>Espacios diseñados para que te sientas como en casa</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">¿Listo para tu estancia?</h2>
          <p className="cta-subtitle">
            Contacta con nosotros para reservar tu apartamento. 
            Te ayudaremos con todo lo que necesites para una estancia perfecta.
          </p>
          
          <div className="cta-buttons">
            <a href="https://wa.me/34123456789" className="cta-btn" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
              WhatsApp
            </a>
            <a href="tel:+34123456789" className="cta-btn secondary">
              <FaPhone />
              Llamar ahora
            </a>
          </div>
        </div>
      </section>

      {/* Calendar Modal */}
      {showCalendar && selectedApartment && (
        <AvailabilityCalendar
          apartment={selectedApartment}
          onClose={() => {
            setShowCalendar(false);
            setSelectedApartment(null);
          }}
        />
      )}
    </div>
  );
};

export default Home;