import React from "react";
import {
	FaMapMarkerAlt,
	FaSubway,
	FaBus,
	FaCar,
	FaUtensils,
	FaShoppingCart,
	FaHospital,
	FaGraduationCap,
	FaTree,
	FaWalking,
} from "react-icons/fa";
import "./AreaInfo.css";

const AreaInfo = () => {
	const nearbyPlaces = [
		{
			category: "Transporte",
			icon: <FaSubway />,
			places: [
				{
					name: "Estación de Metro Línea 3",
					distance: "5 min caminando",
					description: "Acceso directo al centro de la ciudad",
				},
				{
					name: "Parada de Autobús",
					distance: "2 min caminando",
					description: "Múltiples líneas urbanas",
				},
				{
					name: "Estación de Tren",
					distance: "15 min caminando",
					description: "Conexiones regionales",
				},
			],
		},
		{
			category: "Restaurantes y Cafeterías",
			icon: <FaUtensils />,
			places: [
				{
					name: "Restaurante La Plaza",
					distance: "3 min caminando",
					description: "Cocina tradicional local",
				},
				{
					name: "Café Central",
					distance: "5 min caminando",
					description: "Desayunos y meriendas",
				},
				{
					name: "Pizzería Roma",
					distance: "7 min caminando",
					description: "Comida italiana auténtica",
				},
			],
		},
		{
			category: "Compras y Servicios",
			icon: <FaShoppingCart />,
			places: [
				{
					name: "Supermercado Día",
					distance: "4 min caminando",
					description: "Productos básicos y frescos",
				},
				{
					name: "Farmacia San José",
					distance: "3 min caminando",
					description: "Servicios farmacéuticos 24h",
				},
				{
					name: "Centro Comercial Plaza",
					distance: "10 min caminando",
					description: "Tiendas, cine y restaurantes",
				},
			],
		},
		{
			category: "Ocio y Naturaleza",
			icon: <FaTree />,
			places: [
				{
					name: "Parque del Retiro",
					distance: "12 min caminando",
					description: "Amplio parque con zonas verdes",
				},
				{
					name: "Polideportivo Municipal",
					distance: "10 min caminando",
					description: "Instalaciones deportivas públicas",
				},
				{
					name: "Cine Multicines",
					distance: "8 min caminando",
					description: "Últimos estrenos y películas",
				},
			],
		},
	];

	const transportInfo = [
		{
			icon: <FaWalking />,
			title: "A pie",
			description: "Zona muy caminable con todo lo necesario cerca",
		},
		{
			icon: <FaBus />,
			title: "Transporte público",
			description: "Excelente conexión con toda la ciudad",
		},
		{
			icon: <FaCar />,
			title: "En coche",
			description: "Parking gratuito disponible para huéspedes",
		},
	];

	return (
		<div className="area-info">
			<div className="area-header">
				<h2>
					<FaMapMarkerAlt /> Ubicación y Zona
				</h2>
				<p>
					Nuestros apartamentos están ubicados en una zona tranquila y bien
					conectada, con fácil acceso a todos los servicios que puedas necesitar
					durante tu estancia.
				</p>
			</div>

			<div className="transport-section">
				<h3>Cómo moverse</h3>
				<div className="transport-grid">
					{transportInfo.map((transport, index) => (
						<div key={index} className="transport-card">
							<div className="transport-icon">{transport.icon}</div>
							<h4>{transport.title}</h4>
							<p>{transport.description}</p>
						</div>
					))}
				</div>
			</div>

			<div className="nearby-section">
				<h3>Qué hay cerca</h3>
				<div className="nearby-grid">
					{nearbyPlaces.map((category, index) => (
						<div key={index} className="category-card">
							<div className="category-header">
								<div className="category-icon">{category.icon}</div>
								<h4>{category.category}</h4>
							</div>
							<div className="places-list">
								{category.places.map((place, placeIndex) => (
									<div key={placeIndex} className="place-item">
										<div className="place-info">
											<h5>{place.name}</h5>
											<p className="place-description">{place.description}</p>
										</div>
										<div className="place-distance">{place.distance}</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default AreaInfo;
