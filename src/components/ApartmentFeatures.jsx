import {
	FaWifi,
	FaParking,
	FaTv,
	FaSwimmingPool,
	FaUtensils,
	FaSnowflake,
	FaShower,
	FaWater,
	FaHotTub,
	FaFireExtinguisher,
	FaFirstAid,
} from "react-icons/fa";
import {
	MdOutlineLocalLaundryService,
	MdOutlineSecurity,
	MdOutlineElevator,
	MdOutlineBalcony,
	MdPets,
	MdOutlineCleaningServices,
} from "react-icons/md";
import { useState } from "react";
import "./ApartmentFeatures.css";

const ApartmentFeatures = () => {
	const [activeCategory, setActiveCategory] = useState("all");

	const categories = [
		{ id: "all", name: "Todos" },
		{ id: "essential", name: "Esenciales" },
		{ id: "comfort", name: "Comodidad" },
		{ id: "location", name: "Ubicación" },
		{ id: "safety", name: "Seguridad" },
	];

	const features = [
		{
			icon: <FaWifi size={24} />,
			name: "WiFi de alta velocidad",
			description: "Conexión a internet de fibra óptica 300Mbps",
			category: "essential",
		},
		{
			icon: <FaParking size={24} />,
			name: "Estacionamiento",
			description: "Estacionamiento gratuito en las instalaciones",
			category: "location",
		},
		{
			icon: <FaTv size={24} />,
			name: "Smart TV 4K",
			description: "Smart TV con Netflix, Prime Video y Disney+",
			category: "comfort",
		},
		{
			icon: <FaSwimmingPool size={24} />,
			name: "Piscina",
			description: "Acceso a piscina comunitaria climatizada",
			category: "comfort",
		},
		{
			icon: <FaUtensils size={24} />,
			name: "Cocina equipada",
			description: "Cocina completa con electrodomésticos modernos",
			category: "essential",
		},
		{
			icon: <FaSnowflake size={24} />,
			name: "Aire acondicionado",
			description: "Climatización en todas las habitaciones",
			category: "comfort",
		},
		{
			icon: <MdOutlineLocalLaundryService size={24} />,
			name: "Lavadora y secadora",
			description: "Equipos de última generación disponibles",
			category: "essential",
		},
		{
			icon: <MdOutlineSecurity size={24} />,
			name: "Seguridad 24h",
			description: "Vigilancia y seguridad las 24 horas",
			category: "safety",
		},
		{
			icon: <MdOutlineElevator size={24} />,
			name: "Ascensor",
			description: "Fácil acceso con ascensor moderno",
			category: "essential",
		},
		{
			icon: <MdOutlineBalcony size={24} />,
			name: "Balcón privado",
			description: "Balcón amueblado con vistas panorámicas",
			category: "comfort",
		},
		{
			icon: <FaShower size={24} />,
			name: "Ducha de hidromasaje",
			description: "Baño completo con ducha de hidromasaje",
			category: "comfort",
		},
		{
			icon: <FaWater size={24} />,
			name: "Cerca de la playa",
			description: "A 10 minutos caminando de la playa",
			category: "location",
		},
		{
			icon: <MdPets size={24} />,
			name: "Admite mascotas",
			description: "Alojamiento pet-friendly con restricciones",
			category: "comfort",
		},
		{
			icon: <MdOutlineCleaningServices size={24} />,
			name: "Limpieza premium",
			description: "Limpieza profesional antes de cada estancia",
			category: "essential",
		},
		{
			icon: <FaHotTub size={24} />,
			name: "Jacuzzi comunitario",
			description: "Acceso a jacuzzi en la terraza del edificio",
			category: "comfort",
		},
		{
			icon: <FaFireExtinguisher size={24} />,
			name: "Extintor y alarmas",
			description: "Equipamiento de seguridad contra incendios",
			category: "safety",
		},
		{
			icon: <FaFirstAid size={24} />,
			name: "Botiquín",
			description: "Botiquín de primeros auxilios disponible",
			category: "safety",
		},
	];

	const filteredFeatures =
		activeCategory === "all"
			? features
			: features.filter((feature) => feature.category === activeCategory);

	return (
		<section className="features-section">
			<div className="container">
				<h2 className="features-title">Lo que ofrece este alojamiento</h2>

				<div className="features-categories">
					{categories.map((category) => (
						<button
							key={category.id}
							className={`category-button ${
								activeCategory === category.id ? "active" : ""
							}`}
							onClick={() => setActiveCategory(category.id)}>
							{category.name}
						</button>
					))}
				</div>

				<div className="features-grid">
					{filteredFeatures.map((feature, index) => (
						<div key={index} className="feature-card">
							<div className="feature-icon">{feature.icon}</div>
							<h3 className="feature-name">{feature.name}</h3>
							<p className="feature-description">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ApartmentFeatures;
