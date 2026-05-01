import {
	FaHome,
	FaMapMarkerAlt,
	FaEuroSign,
	FaHandshake,
} from "react-icons/fa";
import "./About.css";

const About = () => {
	return (
		<div className="about-page">
			<section className="hero-about">
				<div className="container">
					<div className="hero-content">
						<h1 className="hero-title">Sobre esta casa</h1>
						<p className="hero-subtitle">
							Este espacio es de la familia y lo usamos para organizarnos con
							amigos y familiares. La idea es que todo sea claro, cercano y fácil
							de gestionar para todos.
						</p>
					</div>
				</div>
			</section>

			<section className="features-section">
				<div className="container">
					<h2 className="section-title">Lo importante, sin rodeos</h2>
					<div className="features-grid">
						<div className="feature-card">
							<FaHome className="feature-card-icon" />
							<h3>Ambiente familiar</h3>
							<p>
								Pensado para gente cercana, con un trato directo y de confianza.
							</p>
						</div>
						<div className="feature-card">
							<FaMapMarkerAlt className="feature-card-icon" />
							<h3>Ubicación cómoda</h3>
							<p>
								Buena conexión y servicios cerca para que todo sea práctico.
							</p>
						</div>
						<div className="feature-card">
							<FaEuroSign className="feature-card-icon" />
							<h3>Precio único</h3>
							<p>
								10€ por noche en ambos apartamentos.
							</p>
						</div>
						<div className="feature-card">
							<FaHandshake className="feature-card-icon" />
							<h3>Gestión sencilla</h3>
							<p>
								Miráis fechas, nos escribís y lo dejamos confirmado sin pasos
								complicados.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="apartments-info-section">
				<div className="container">
					<h2 className="section-title">Apartamentos</h2>
					<div className="apartments-info-grid">
						<div className="about-apartment-card">
							<h3>Apartamento Interior - Salida Jardín</h3>
							<p>
								Espacio tranquilo y cómodo, ideal para descansar y estar a gusto.
							</p>
							<ul>
								<li>2 dormitorios</li>
								<li>1 baño completo</li>
								<li>Acceso directo al jardín</li>
								<li>Cocina completamente equipada</li>
							</ul>
						</div>
						<div className="about-apartment-card">
							<h3>Apartamento Jardín - Vista Exterior</h3>
							<p>
								Muy luminoso, con buena sensación de amplitud y ambiente relajado.
							</p>
							<ul>
								<li>2 dormitorios</li>
								<li>1 baño completo</li>
								<li>Vistas al jardín</li>
								<li>Amplio salón-comedor</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default About;
