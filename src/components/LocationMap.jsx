import {
	FaMapMarkerAlt,
	FaCompass,
	FaWalking,
	FaSubway,
	FaBus,
	FaTrain,
	FaCar,
	FaBicycle,
	FaStore,
	FaUtensils,
	FaTree,
	FaShieldAlt,
} from "react-icons/fa";
import "./LocationMap.css";

const LocationMap = () => {
	return (
		<section className="location-section">
			<div className="location-container">
				<h2 className="location-title">Ubicación</h2>

				<div className="map-container">
					{/* Aquí normalmente iría un componente de mapa real como Google Maps o Mapbox */}
					<div className="map-placeholder">
						<FaMapMarkerAlt className="map-marker" />
						<p className="map-location">Lisle, Francia</p>
						<p className="map-note">
							Mapa interactivo no disponible en la vista previa
						</p>
					</div>
				</div>

				<div className="info-grid">
					<div className="info-card">
						<h3 className="info-title">
							<FaCompass className="info-title-icon" />
							El vecindario
						</h3>
						<p className="info-description">
							El apartamento está ubicado en una zona tranquila y segura, pero a
							la vez céntrica. Disfrutarás de la tranquilidad por la noche y de
							la cercanía a todos los servicios durante el día.
						</p>
						<div className="info-list">
							<div className="info-item">
								<FaSubway className="info-item-icon" />
								<span className="info-item-text">
									A 5 minutos a pie de la estación de metro
								</span>
							</div>
							<div className="info-item">
								<FaStore className="info-item-icon" />
								<span className="info-item-text">
									A 10 minutos a pie del centro comercial
								</span>
							</div>
							<div className="info-item">
								<FaUtensils className="info-item-icon" />
								<span className="info-item-text">
									Numerosos restaurantes y cafeterías en un radio de 500m
								</span>
							</div>
							<div className="info-item">
								<FaTree className="info-item-icon" />
								<span className="info-item-text">
									Parque público a 3 minutos caminando
								</span>
							</div>
							<div className="info-item">
								<FaShieldAlt className="info-item-icon" />
								<span className="info-item-text">
									Zona segura y vigilada las 24 horas
								</span>
							</div>
						</div>
					</div>

					<div className="info-card">
						<h3 className="info-title">
							<FaWalking className="info-title-icon" />
							Cómo moverse
						</h3>
						<p className="info-description">
							La ubicación es ideal para explorar la ciudad, ya sea a pie, en
							transporte público o en vehículo propio. Conecta fácilmente con
							los principales puntos de interés de Lisle.
						</p>
						<div className="info-list">
							<div className="info-item">
								<FaSubway className="info-item-icon" />
								<span className="info-item-text">
									Estación de metro Lisle Central a 400m
								</span>
							</div>
							<div className="info-item">
								<FaBus className="info-item-icon" />
								<span className="info-item-text">
									Parada de autobús en la puerta del edificio (líneas 14, 27 y
									32)
								</span>
							</div>
							<div className="info-item">
								<FaTrain className="info-item-icon" />
								<span className="info-item-text">
									Estación de tren a 15 minutos caminando
								</span>
							</div>
							<div className="info-item">
								<FaCar className="info-item-icon" />
								<span className="info-item-text">
									Aparcamiento gratuito en las instalaciones
								</span>
							</div>
							<div className="info-item">
								<FaBicycle className="info-item-icon" />
								<span className="info-item-text">
									Servicio de alquiler de bicicletas a 200m
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LocationMap;
