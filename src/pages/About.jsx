import React from "react";
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
			{/* Hero Section */}
			<section className="hero-about">
				<div className="container">
					<div className="hero-content">
						<h1 className="hero-title">Nuestra historia</h1>
						<p className="hero-subtitle">
							Somos una familia que ha decidido compartir nuestros dos hermosos
							apartamentos con amigos y familiares. Ubicados en una zona
							privilegiada, estos espacios han sido cuidadosamente preparados
							para ofrecer una experiencia cómoda y acogedora.
						</p>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="features-section">
				<div className="container">
					<h2 className="section-title">
						¿Por qué elegir nuestros apartamentos?
					</h2>
					<div className="features-grid">
						<div className="feature-card">
							<FaHome className="feature-card-icon" />
							<h3>Ambiente Familiar</h3>
							<p>
								Espacios diseñados con amor y atención al detalle para que te
								sientas como en casa.
							</p>
						</div>
						<div className="feature-card">
							<FaMapMarkerAlt className="feature-card-icon" />
							<h3>Ubicación Privilegiada</h3>
							<p>
								En el centro de la ciudad, cerca de transporte público,
								restaurantes y lugares de interés.
							</p>
						</div>
						<div className="feature-card">
							<FaEuroSign className="feature-card-icon" />
							<h3>Precio Simbólico</h3>
							<p>
								Solo 10€ por noche, un precio simbólico para cubrir gastos
								básicos de mantenimiento.
							</p>
						</div>
						<div className="feature-card">
							<FaHandshake className="feature-card-icon" />
							<h3>Trato Personal</h3>
							<p>
								Atención directa y personalizada. Conocemos a nuestros huéspedes
								personalmente.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Apartments Info Section */}
			<section className="apartments-info-section">
				<div className="container">
					<h2 className="section-title">Nuestros Apartamentos</h2>
					<div className="apartments-info-grid">
						<div className="about-apartment-card">
							<h3>Apartamento Interior - Salida Jardín</h3>
							<p>
								Un acogedor espacio interior con acceso directo a un hermoso
								jardín privado. Perfecto para quienes buscan tranquilidad y un
								contacto directo con la naturaleza en pleno centro urbano.
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
								Apartamento con vistas al exterior y conexión con el jardín.
								Ideal para familias o grupos que valoran el espacio y la
								luminosidad natural.
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

			{/* Philosophy Section */}
			<section className="philosophy-section">
				<div className="container">
					<h2 className="section-title">Nuestra Filosofía</h2>
					<p className="philosophy-text">
						Creemos en la hospitalidad auténtica y en crear conexiones genuinas.
						Nuestros apartamentos no son solo un lugar donde dormir, sino un
						hogar temporal donde crear recuerdos especiales. Cada detalle ha
						sido pensado para que tu estancia sea memorable y confortable.
					</p>
				</div>
			</section>
		</div>
	);
};

export default About;
