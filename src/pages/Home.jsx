import { useState } from "react";
import {
  FaHeart,
  FaBed,
  FaBath,
  FaUsers,
  FaCalendarAlt,
  FaWhatsapp,
  FaPhone,
  FaRoute,
  FaMapMarkedAlt,
  FaHome,
  FaEuroSign,
  FaTree,
  FaTrain,
  FaCarSide,
  FaCheckCircle,
} from "react-icons/fa";
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
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <p className="hero-kicker">Casa de vacaciones familiar</p>
            <h1 className="hero-title">Una escapada entre amigos, sin postureo y sin complicaciones</h1>
            <p className="hero-subtitle">
              Estos apartamentos son de la familia y los compartimos con amigos para que puedan
              disfrutar unos días en Lisle. El objetivo no es hacer negocio, sino cubrir gastos
              básicos y que todo el mundo tenga una experiencia cómoda.
            </p>
            <div className="hero-pills">
              <span className="hero-highlight">
                <FaEuroSign />
                Precio simbólico: ~10€ por noche
              </span>
              <span className="hero-highlight soft">
                <FaHeart />
                Prioridad a familia y amigos
              </span>
            </div>
            <button
              className="btn btn-primary"
              onClick={() =>
                document.getElementById("disponibilidad").scrollIntoView({ behavior: "smooth" })
              }
            >
              <FaCalendarAlt />
              Ver disponibilidad actual
            </button>
          </div>
        </div>
      </section>

      <section className="quick-facts-section">
        <div className="container">
          <div className="quick-facts-grid">
            <article className="quick-fact-card">
              <FaHome className="quick-fact-icon" />
              <h3>2 apartamentos</h3>
              <p>En el mismo edificio, prácticos para grupos o dos familias.</p>
            </article>
            <article className="quick-fact-card">
              <FaEuroSign className="quick-fact-icon" />
              <h3>Coste simbólico</h3>
              <p>Aproximadamente 10€/noche para mantenimiento y suministros.</p>
            </article>
            <article className="quick-fact-card">
              <FaCheckCircle className="quick-fact-icon" />
              <h3>Gestión sencilla</h3>
              <p>Miráis calendario, elegís fechas y nos escribís por WhatsApp.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="apartamentos" className="apartments-section">
        <div className="container">
          <h2 className="section-title">Los apartamentos</h2>
          <p className="section-subtitle">
            Espacios pensados para estar a gusto durante unos días de vacaciones.
          </p>
          <div className="apartments-grid">
            {apartments.map((apartment) => (
              <article
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
                      {apartment.bathrooms} baño{apartment.bathrooms > 1 ? "s" : ""}
                    </div>
                    <div className="feature">
                      <FaUsers className="feature-icon" />
                      Hasta {apartment.maxGuests} huéspedes
                    </div>
                  </div>
                  
                  <div className="apartment-footer">
                    <div className="rating">
                      <FaCheckCircle className="rating-star" />
                      Ideal para estancias tranquilas
                    </div>
                    <button className="btn btn-secondary">
                      Abrir calendario
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="disponibilidad" className="features-section">
        <div className="container">
          <h2 className="section-title">Disponibilidad transparente</h2>
          <p className="section-subtitle">
            Marcamos los días en los que vamos nosotros para que el calendario esté siempre claro.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <FaCalendarAlt className="feature-card-icon" />
              <h3>Calendario siempre visible</h3>
              <p>Consulta disponibilidad real antes de escribirnos y evita idas y vueltas.</p>
            </div>
            <div className="feature-card">
              <FaEuroSign className="feature-card-icon" />
              <h3>Precio justo y simple</h3>
              <p>Un precio simbólico para cubrir gastos, sin lógica de plataforma turística.</p>
            </div>
            <div className="feature-card">
              <FaWhatsapp className="feature-card-icon" />
              <h3>Reserva directa</h3>
              <p>Si te cuadran las fechas, nos avisas por WhatsApp o teléfono y listo.</p>
            </div>
            <div className="feature-card">
              <FaUsers className="feature-card-icon" />
              <h3>Uso familiar/amigos</h3>
              <p>Pensado para gente cercana que busca una estancia cómoda y sin ruido.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="como-llegar" className="travel-section">
        <div className="container">
          <h2 className="section-title">Cómo llegar</h2>
          <div className="travel-grid">
            <article className="travel-card">
              <h3><FaTrain /> Llegada en transporte público</h3>
              <ul>
                <li>Tren hasta Lille y conexión local a Lisle.</li>
                <li>Desde la estación, trayecto corto en bus/taxi.</li>
                <li>Podemos enviarte la ruta exacta por WhatsApp.</li>
              </ul>
            </article>
            <article className="travel-card">
              <h3><FaCarSide /> Llegada en coche</h3>
              <ul>
                <li>Acceso sencillo por carretera principal.</li>
                <li>Zona tranquila para entrar y descargar equipaje.</li>
                <li>Parking gratuito incluido en la estancia.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="guia-local" className="local-guide-section">
        <div className="container">
          <h2 className="section-title">Guía local rápida</h2>
          <div className="guide-grid">
            <article className="guide-card">
              <h3><FaMapMarkedAlt /> Qué hay en el pueblo</h3>
              <ul>
                <li>Panaderías, cafeterías y restaurantes cercanos.</li>
                <li>Mercado local y tiendas básicas para el día a día.</li>
                <li>Paseos agradables por zonas verdes.</li>
              </ul>
            </article>
            <article className="guide-card">
              <h3><FaRoute /> Pueblos y sitios cercanos</h3>
              <ul>
                <li>Lille (ambiente urbano, cultura y restaurantes).</li>
                <li>Ypres (historia y arquitectura).</li>
                <li>Gante y Brujas para excursiones de un día.</li>
              </ul>
            </article>
            <article className="guide-card">
              <h3><FaTree /> Planes recomendados</h3>
              <ul>
                <li>Día tranquilo: paseo + terraza + cena local.</li>
                <li>Plan familiar: parque y ruta corta por la zona.</li>
                <li>Escapada cultural de día y vuelta a descansar.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">¿Te cuadran las fechas?</h2>
          <p className="cta-subtitle">
            Escríbenos y te contamos disponibilidad final, cómo entrar al apartamento y
            recomendaciones personalizadas según los días que vengas.
          </p>
          <div className="cta-buttons">
            <a href="https://wa.me/34123456789" className="cta-btn" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
              WhatsApp
            </a>
            <a href="tel:+34123456789" className="cta-btn secondary">
              <FaPhone />
              Llamarnos
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