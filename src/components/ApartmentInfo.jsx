import {
	FaStar,
	FaMapMarkerAlt,
	FaBed,
	FaBath,
	FaUsers,
	FaHome,
} from "react-icons/fa";
import "./ApartmentInfo.css";

const ApartmentInfo = ({ apartment }) => {
	// Datos por defecto en caso de que no se proporcione un apartamento
	const apartmentData = apartment || {
		id: "default",
		name: "Apartamento moderno con vistas increíbles",
		location: "Lisle, Francia",
		rating: 4.9,
		reviews: 124,
		host: "Carlos",
		hostSince: "Anfitrión desde 2018",
		hostImage: "https://randomuser.me/api/portraits/men/32.jpg",
		bedrooms: 2,
		beds: 2,
		bathrooms: 1,
		maxGuests: 4,
		size: 85, // metros cuadrados
		description:
			"Disfruta de este hermoso apartamento completamente renovado en el corazón de Lisle. Con vistas panorámicas, este espacio luminoso y acogedor es perfecto para familias o grupos de amigos que buscan explorar la ciudad. A pocos minutos a pie de restaurantes, tiendas y transporte público.",
		features: [
			"Ubicación céntrica",
			"Vistas panorámicas",
			"Recientemente renovado",
			"Cocina totalmente equipada",
			"WiFi de alta velocidad",
			"Smart TV con Netflix",
		],
	};

	return (
		<section className="apartment-section">
			<div className="container">
				<div className="apartment-header">
					<div>
						<h1 className="apartment-title">{apartmentData.name}</h1>
						<div className="apartment-location">
							<FaMapMarkerAlt className="location-icon" />
							<span>{apartmentData.location}</span>
						</div>
					</div>

					<div className="apartment-meta">
						<div className="apartment-rating">
							<FaStar className="rating-icon" />
							<span className="rating-value">{apartmentData.rating}</span>
							<span className="rating-separator">·</span>
							<span className="rating-reviews">
								{apartmentData.reviews || 0} reseñas
							</span>
						</div>

						<div className="host-info">
							<img
								src={apartmentData.hostImage}
								alt={`Anfitrión ${apartmentData.host}`}
								className="host-image"
							/>
							<div>
								<p className="host-name">{apartmentData.host}</p>
								<p className="host-since">{apartmentData.hostSince}</p>
							</div>
						</div>
					</div>
				</div>

				<div className="apartment-features">
					<div className="features-grid">
						<div className="feature-item">
							<FaBed className="feature-icon" size={20} />
							<div>
								<p className="feature-title">
									{apartmentData.bedrooms} dormitorio
									{apartmentData.bedrooms !== 1 ? "s" : ""}
								</p>
								<p className="feature-subtitle">
									{apartmentData.beds || apartmentData.bedrooms} cama
									{(apartmentData.beds || apartmentData.bedrooms) !== 1
										? "s"
										: ""}
								</p>
							</div>
						</div>

						<div className="feature-item">
							<FaBath className="feature-icon" size={20} />
							<div>
								<p className="feature-title">
									{apartmentData.bathrooms} baño
									{apartmentData.bathrooms > 1 ? "s" : ""}
								</p>
								<p className="feature-subtitle">Toallas incluidas</p>
							</div>
						</div>

						<div className="feature-item">
							<FaUsers className="feature-icon" size={20} />
							<div>
								<p className="feature-title">
									Hasta {apartmentData.maxGuests} huéspedes
								</p>
								<p className="feature-subtitle">Ideal para familias</p>
							</div>
						</div>

						<div className="feature-item">
							<FaHome className="feature-icon" size={20} />
							<div>
								<p className="feature-title">{apartmentData.size} m²</p>
								<p className="feature-subtitle">Amplio y luminoso</p>
							</div>
						</div>
					</div>
				</div>

				<div className="apartment-description">
					<h2 className="description-title">Acerca de este espacio</h2>
					<p className="description-text">{apartmentData.description}</p>

					<h3 className="highlights-title">Lo que este lugar ofrece:</h3>
					<div className="highlights-grid">
						{(apartmentData.features || []).map((highlight, index) => (
							<div key={index} className="highlight-item">
								<div className="highlight-dot"></div>
								<span>{highlight}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ApartmentInfo;
