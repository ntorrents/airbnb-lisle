import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageGallery from "../components/ImageGallery";
import ApartmentInfo from "../components/ApartmentInfo";
import ApartmentFeatures from "../components/ApartmentFeatures";
import LocationMap from "../components/LocationMap";
import AvailabilityInfo from "../components/AvailabilityInfo";
import { getAllApartments } from "../services/apartmentService";
import "./Home.css";

const ApartmentDetails = ({ apartment, onBack }) => {
	const [selectedApartment, setSelectedApartment] = useState(
		apartment || getAllApartments()[0]
	);

	// Si no se proporciona un apartamento, usar el primero de la lista
	useEffect(() => {
		if (!apartment) {
			setSelectedApartment(getAllApartments()[0]);
		} else {
			setSelectedApartment(apartment);
		}
	}, [apartment]);

	return (
		<div className="home-container">
			<Navbar />

			<main className="home-main">
				<div className="container">
					<button
						className="back-button"
						onClick={onBack}
						style={{
							display: "flex",
							alignItems: "center",
							gap: "8px",
							background: "transparent",
							border: "none",
							padding: "10px 0",
							color: "#FF385C",
							fontWeight: "600",
							cursor: "pointer",
							marginBottom: "20px",
						}}>
						<FaArrowLeft /> Volver a la selección
					</button>
				</div>
				<div className="container gallery-container">
					<ImageGallery />
				</div>

				<div className="container">
					<div className="content-grid">
						<div className="main-content">
							<ApartmentInfo apartment={selectedApartment} />
						</div>

						<div className="sidebar">
							<AvailabilityInfo
								apartmentId={selectedApartment.id}
								price={selectedApartment.price}
							/>
						</div>
					</div>
				</div>

				<ApartmentFeatures />
				<LocationMap />
			</main>

			<Footer />
		</div>
	);
};

export default ApartmentDetails;
