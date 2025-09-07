import { useState } from "react";
import "./ApartmentSelector.css";

const ApartmentSelector = ({ onSelectApartment }) => {
	const [selectedApartment, setSelectedApartment] = useState("apt1");

	const apartments = {
		apt1: {
			id: "apt1",
			name: "Apartamento Lisle - Vista Ciudad",
			image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
			description:
				"Apartamento moderno con vistas panorámicas a la ciudad. Ideal para parejas o pequeñas familias.",
			price: 95,
			bedrooms: 2,
			bathrooms: 1,
			size: 85,
			maxGuests: 4,
		},
		apt2: {
			id: "apt2",
			name: "Apartamento Lisle - Vista Jardín",
			image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0",
			description:
				"Apartamento tranquilo con vistas al jardín interior. Perfecto para una estancia relajante.",
			price: 85,
			bedrooms: 1,
			bathrooms: 1,
			size: 65,
			maxGuests: 3,
		},
	};

	const handleSelectApartment = (aptId) => {
		setSelectedApartment(aptId);
		onSelectApartment(apartments[aptId]);
	};

	return (
		<div className="apartment-selector">
			<h2 className="selector-title">Elige tu apartamento</h2>
			<p className="selector-subtitle">
				Tenemos dos opciones disponibles en la misma ubicación
			</p>

			<div className="apartments-container">
				{Object.values(apartments).map((apt) => (
					<div
						key={apt.id}
						className={`apartment-option ${
							selectedApartment === apt.id ? "selected" : ""
						}`}
						onClick={() => handleSelectApartment(apt.id)}>
						<div className="apartment-image-container">
							<img src={apt.image} alt={apt.name} className="apartment-image" />
							{selectedApartment === apt.id && (
								<div className="selected-badge">Seleccionado</div>
							)}
						</div>

						<div className="apartment-details">
							<h3 className="apartment-name">{apt.name}</h3>
							<p className="apartment-description">{apt.description}</p>

							<div className="apartment-specs">
								<div className="spec-item">
									<span className="spec-value">{apt.bedrooms}</span>
									<span className="spec-label">
										Dormitorio{apt.bedrooms !== 1 ? "s" : ""}
									</span>
								</div>

								<div className="spec-item">
									<span className="spec-value">{apt.bathrooms}</span>
									<span className="spec-label">
										Baño{apt.bathrooms !== 1 ? "s" : ""}
									</span>
								</div>

								<div className="spec-item">
									<span className="spec-value">{apt.size}</span>
									<span className="spec-label">m²</span>
								</div>

								<div className="spec-item">
									<span className="spec-value">{apt.maxGuests}</span>
									<span className="spec-label">Huéspedes</span>
								</div>
							</div>

							<div className="apartment-price">
								<span className="price-value">${apt.price}</span>
								<span className="price-period">/ noche</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ApartmentSelector;
