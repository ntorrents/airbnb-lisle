import { useState } from "react";
import {
	FaBed,
	FaBath,
	FaRulerCombined,
	FaUsers,
	FaWifi,
	FaUtensils,
	FaSnowflake,
	FaTv,
	FaEye,
	FaCar,
	FaStar,
	FaHeart,
} from "react-icons/fa";
import {
	MdOutlineElevator,
	MdOutlineLocalLaundryService,
} from "react-icons/md";
import { getAllApartments } from "../services/apartmentService";
import AreaInfo from "./AreaInfo";
import AvailabilityCalendar from "./AvailabilityCalendar";
import "./ApartmentShowcase.css";

const ApartmentShowcase = () => {
	const apartments = getAllApartments();
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedApartment, setSelectedApartment] = useState(null);

	const getFeatureIcon = (feature) => {
		const iconMap = {
			"WiFi de alta velocidad": <FaWifi />,
			"Cocina completamente equipada": <FaUtensils />,
			"Aire acondicionado": <FaSnowflake />,
			"Smart TV": <FaTv />,
			Lavadora: <MdOutlineLocalLaundryService />,
			"Balcón con vistas": <FaEye />,
			Ascensor: <MdOutlineElevator />,
			"Parking gratuito": <FaCar />,
			Terraza: <FaEye />,
		};
		return iconMap[feature] || <FaEye />;
	};

	return (
		<div className="apartment-showcase">
			<div className="showcase-header">
				<h1>Apartamentos Lisle</h1>
				<p className="showcase-subtitle">
					Dos acogedores apartamentos en el corazón de la ciudad, perfectos para
					amigos y familiares. Cada uno por solo 10€ la noche.
				</p>
			</div>

			<div className="apartments-grid">
				{apartments.map((apartment) => (
					<div key={apartment.id} className="apartment-card">
						<div className="apartment-image">
							<img src={apartment.image} alt={apartment.name} />
							<button className="favorite-btn">
								<FaHeart />
							</button>
						</div>

						<div className="apartment-content">
							<div className="apartment-header">
								<div className="apartment-title">
									<h3 className="apartment-name">{apartment.name}</h3>
									<div className="apartment-rating">
										<FaStar className="star-icon" />
										<span>4.9</span>
									</div>
								</div>
								<p className="apartment-type">Apartamento completo</p>
							</div>

							<div className="apartment-specs">
								<span className="spec-item">
									{apartment.maxGuests} huéspedes
								</span>
								<span className="spec-divider">·</span>
								<span className="spec-item">
									{apartment.bedrooms} dormitorios
								</span>
								<span className="spec-divider">·</span>
								<span className="spec-item">
									{apartment.bathrooms} baño
								</span>
							</div>

							<div className="apartment-features">
								<div className="features-list">
									{apartment.features.slice(0, 4).map((feature, index) => (
										<span key={index} className="feature-item">
											{getFeatureIcon(feature)}
											{feature}
										</span>
									))}
									{apartment.features.length > 4 && (
										<span className="more-features">
											+{apartment.features.length - 4} más
										</span>
									)}
								</div>
							</div>

							<div className="apartment-pricing">
								<div className="price-info">
									<span className="price">{apartment.price}€</span>
									<span className="price-period">noche</span>
								</div>
							</div>

							<button
								className="view-details-btn"
								onClick={() => {
									setSelectedApartment(apartment);
									setShowCalendar(true);
								}}>
								Ver disponibilidad
							</button>
						</div>
					</div>
				))}
			</div>

			<div className="info-section">
				<div className="info-card">
					<h3>Información importante</h3>
					<ul>
						<li>Precio: 10€ por noche por apartamento</li>
						<li>Reservas por contacto directo (no online)</li>
						<li>Ideal para estancias de fin de semana o vacaciones</li>
						<li>Ambos apartamentos pueden reservarse juntos</li>
						<li>Limpieza incluida en el precio</li>
					</ul>
				</div>
			</div>

			<div className="how-to-get-section">
				<div className="container">
					<h3>Cómo llegar</h3>
					<div className="directions-content">
						<div className="directions-info">
							<div className="direction-item">
								<h4>🚗 En coche</h4>
								<p>
									Desde el centro de la ciudad, toma la Avenida Principal hacia
									el norte. Gira a la derecha en la Calle Mayor y continúa hasta
									llegar a nuestros apartamentos. Parking gratuito disponible.
								</p>
							</div>
							<div className="direction-item">
								<h4>🚇 En transporte público</h4>
								<p>
									Metro: Línea 3 hasta estación "Plaza Central" (5 min
									caminando). Autobús: Líneas 15, 23 y 45 con parada en "Calle
									Mayor" (2 min caminando).
								</p>
							</div>
							<div className="direction-item">
								<h4>✈️ Desde el aeropuerto</h4>
								<p>
									Taxi: 25 minutos aproximadamente. Metro: Línea 8 hasta "Nuevos
									Ministerios", transbordo a Línea 3 hasta "Plaza Central" (45
									min total).
								</p>
							</div>
						</div>
						<div className="map-container">
							<div className="map-placeholder">
								<div className="map-content">
									<h4>📍 Ubicación</h4>
									<p>
										<strong>Calle Mayor, 123</strong>
										<br />
										28001 Madrid, España
									</p>
									<div className="map-visual">
										<div className="map-pin">📍</div>
										<div className="map-roads"></div>
									</div>
									<p className="map-note">
										Mapa interactivo disponible al contactarnos
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<AreaInfo />

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

export default ApartmentShowcase;
