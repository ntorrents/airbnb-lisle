import { useState } from "react";
import {
  FaHeart,
  FaBed,
  FaBath,
  FaUsers,
  FaCalendarAlt,
  FaWhatsapp,
  FaPhone,
  FaHome,
  FaEuroSign,
  FaCheckCircle,
  FaTrain,
  FaCarSide,
  FaMapMarkedAlt,
  FaStore,
  FaWater,
  FaLandmark,
} from "react-icons/fa";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import { getAllApartments } from "../services/apartmentService";
import FamilyDateManager from "../components/FamilyDateManager";
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
            <p className="hero-kicker">Casa de familia</p>
            <h1 className="hero-title">Un sitio sencillo para amigos y familiares</h1>
            <p className="hero-subtitle">
              Esta web es interna, pensada para que todos podáis ver rápido lo importante:
              apartamentos, disponibilidad y contacto. Sin complicaciones y sin enfoque comercial.
            </p>
            <div className="hero-pills">
              <span className="hero-highlight">
                <FaEuroSign />
                Precio único: 10€ por noche
              </span>
              <span className="hero-highlight soft">
                <FaHeart />
                Solo para gente cercana
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
              <h3>Precio claro</h3>
              <p>10€ por noche en ambos apartamentos.</p>
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
            Todo en una vista simple para elegir rápido.
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
            Calendario simple para ver fechas libres de un vistazo.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <FaCalendarAlt className="feature-card-icon" />
              <h3>Calendario siempre visible</h3>
              <p>Consulta disponibilidad real antes de escribirnos y evita idas y vueltas.</p>
            </div>
            <div className="feature-card">
              <FaEuroSign className="feature-card-icon" />
              <h3>Precio fijo</h3>
              <p>Siempre 10€ por noche, sin extras ni sorpresas.</p>
            </div>
            <div className="feature-card">
              <FaWhatsapp className="feature-card-icon" />
              <h3>Reserva directa</h3>
              <p>Si te cuadran las fechas, nos avisas por WhatsApp o teléfono y listo.</p>
            </div>
            <div className="feature-card">
              <FaUsers className="feature-card-icon" />
              <h3>Uso interno</h3>
              <p>Solo para familia y amigos, en un entorno tranquilo.</p>
            </div>
          </div>
          <FamilyDateManager />
        </div>
      </section>

      <section id="como-llegar" className="travel-section">
        <div className="container">
          <h2 className="section-title">L&apos;Isle-Jourdain (32600) en breve</h2>
          <p className="section-subtitle">
            En el Gers (Occitania), a unos 30 km de Toulouse: aproximadamente 30 minutos en coche.
            Pueblo cómodo para desconectar, con buen acceso y vida local activa.
          </p>
          <div className="travel-grid">
            <article className="travel-card">
              <h3><FaCarSide /> Llegar en coche</h3>
              <ul>
                <li>Referencia general: 30 minutos desde Toulouse.</li>
                <li>Ubicación: L&apos;Isle-Jourdain, 32600, Francia.</li>
                <li>
                  <a
                    href="https://maps.app.goo.gl/LANNci6MtjCCpLDv6"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir ubicación en Google Maps
                  </a>
                </li>
              </ul>
            </article>
            <article className="travel-card">
              <h3><FaTrain /> Llegar en tren</h3>
              <ul>
                <li>Gare de L&apos;Isle-Jourdain con TER Occitanie.</li>
                <li>Conexión habitual con Toulouse-Matabiau y Auch.</li>
                <li>
                  Trayecto orientativo a Toulouse en torno a 45-50 minutos (según horario).
                </li>
                <li>
                  <a
                    href="https://www.ter.sncf.com/occitanie/se-deplacer/horaires"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Consultar horarios TER
                  </a>
                </li>
              </ul>
            </article>
            <article className="travel-card">
              <h3><FaMapMarkedAlt /> Información oficial útil</h3>
              <ul>
                <li>
                  <a
                    href="https://www.visit-occitanie.com/es/rail-tour/gares-etapes/lisle-jourdain/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ficha de L&apos;Isle-Jourdain en Visit Occitanie
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tourisme-gascognetoulousaine.fr/decouvrir/decouvrir-nos-villages/lisle-jourdain/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Oficina de turismo local
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.mairie-islejourdain.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Web del ayuntamiento
                  </a>
                </li>
              </ul>
            </article>
          </div>

          <div className="guide-grid" style={{ marginTop: "16px" }}>
            <article className="guide-card">
              <h3><FaStore /> Plan de sábado</h3>
              <ul>
                <li>Mercado de plein vent: sábados por la mañana.</li>
                <li>Más de 130 expositores (productores, comercio y artesanía).</li>
                <li>
                  Se celebra en zona centro (Place Gambetta / Hôtel de Ville y calles cercanas).
                </li>
              </ul>
            </article>
            <article className="guide-card">
              <h3><FaWater /> Naturaleza y deporte</h3>
              <ul>
                <li>Lago y base de ocio con actividades al aire libre.</li>
                <li>Opciones citadas en turismo: paddle, pédalo y telesquí acuático.</li>
                <li>Rutas de paseo/senderismo por el entorno del valle del Save.</li>
              </ul>
            </article>
            <article className="guide-card">
              <h3><FaLandmark /> Qué ver en el pueblo</h3>
              <ul>
                <li>Museo Europeo de Arte Campanario.</li>
                <li>Casa Claude Augé y su vidriera “La Semeuse”.</li>
                <li>Centro histórico y ambiente de pueblo con servicios cerca.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">¿Te cuadran las fechas?</h2>
          <p className="cta-subtitle">
            Escríbenos directamente y lo dejamos todo confirmado por WhatsApp o teléfono.
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