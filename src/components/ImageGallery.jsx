import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaExpand } from "react-icons/fa";
import "./ImageGallery.css";

const ImageGallery = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [showFullGallery, setShowFullGallery] = useState(false);

	// Si no hay imágenes, mostrar placeholders
	const defaultImages = [
		{
			url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
			alt: "Sala de estar con sofá y ventanas grandes",
		},
		{
			url: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc",
			alt: "Cocina moderna con isla",
		},
		{
			url: "https://images.unsplash.com/photo-1540518614846-7eded433c457",
			alt: "Dormitorio principal con cama king",
		},
		{
			url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
			alt: "Baño con ducha de cristal",
		},
		{
			url: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0",
			alt: "Balcón con vistas a la ciudad",
		},
	];

	const displayImages = images || defaultImages;

	const nextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
		);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? displayImages.length - 1 : prevIndex - 1
		);
	};

	const goToSlide = (index) => {
		setCurrentIndex(index);
	};

	return (
		<div className="gallery-container">
			{/* Vista principal */}
			{!showFullGallery ? (
				<div className="gallery-container">
					<div className="gallery-grid">
						{/* Imagen principal */}
						<div className="main-image-container">
							<img
								src={displayImages[0].url}
								alt={displayImages[0].alt}
								className="gallery-image"
							/>
						</div>

						{/* Grid de imágenes secundarias */}
						<div className="secondary-images-grid">
							{displayImages.slice(1, 5).map((image, index) => (
								<div key={index} className="image-container">
									<img
										src={image.url}
										alt={image.alt}
										className="gallery-image"
									/>
								</div>
							))}
						</div>

						{/* Botón para ver todas las fotos */}
						<button
							onClick={() => setShowFullGallery(true)}
							className="view-all-button">
							<FaExpand />
							Ver todas las fotos
						</button>
					</div>
				</div>
			) : (
				/* Vista de galería completa */
				<div className="full-gallery">
					<div className="gallery-header">
						<button
							onClick={() => setShowFullGallery(false)}
							className="gallery-close-button">
							Cerrar
						</button>
						<div className="gallery-counter">
							{currentIndex + 1} / {displayImages.length}
						</div>
						<div></div> {/* Espacio vacío para mantener el centrado */}
					</div>

					<div className="gallery-main-view">
						<img
							src={displayImages[currentIndex].url}
							alt={displayImages[currentIndex].alt}
							className="full-image"
						/>

						{/* Botones de navegación */}
						<button onClick={prevSlide} className="nav-button prev-button">
							<FaArrowLeft size={20} />
						</button>

						<button onClick={nextSlide} className="nav-button next-button">
							<FaArrowRight size={20} />
						</button>
					</div>

					{/* Miniaturas */}
					<div className="thumbnails-container">
						<div className="thumbnails-scroll">
							{displayImages.map((image, index) => (
								<div
									key={index}
									onClick={() => goToSlide(index)}
									className={`thumbnail ${
										index === currentIndex ? "active" : ""
									}`}>
									<img
										src={image.url}
										alt={image.alt}
										className="thumbnail-image"
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ImageGallery;
