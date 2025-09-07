import React from "react";
import "./About.css";

const About = () => {
	return (
		<div className="about-page">
			<div className="container">
				<div className="about-header">
					<h1>Acerca de Nosotros</h1>
					<p className="about-subtitle">
						Bienvenidos a nuestros apartamentos familiares en el corazón de la
						ciudad
					</p>
				</div>

				<div className="about-content">
					<div className="about-section">
						<h2>Nuestra Historia</h2>
						<p>
							Somos una familia que ha decidido compartir nuestros dos hermosos
							apartamentos con amigos y familiares. Ubicados en una zona
							privilegiada de la ciudad, estos espacios han sido cuidadosamente
							preparados para ofrecer una experiencia cómoda y acogedora.
						</p>
					</div>

					<div className="about-section">
						<h2>¿Por Qué Elegir Nuestros Apartamentos?</h2>
						<div className="features-grid">
							<div className="feature-item">
								<div className="feature-icon">🏠</div>
								<h3>Ambiente Familiar</h3>
								<p>
									Espacios diseñados con amor y atención al detalle para que te
									sientas como en casa.
								</p>
							</div>
							<div className="feature-item">
								<div className="feature-icon">📍</div>
								<h3>Ubicación Privilegiada</h3>
								<p>
									En el centro de la ciudad, cerca de transporte público,
									restaurantes y lugares de interés.
								</p>
							</div>
							<div className="feature-item">
								<div className="feature-icon">💰</div>
								<h3>Precio Simbólico</h3>
								<p>
									Solo 10€ por noche, un precio simbólico para cubrir gastos
									básicos de mantenimiento.
								</p>
							</div>
							<div className="feature-item">
								<div className="feature-icon">🤝</div>
								<h3>Trato Personal</h3>
								<p>
									Atención directa y personalizada. Conocemos a nuestros
									huéspedes personalmente.
								</p>
							</div>
						</div>
					</div>

					<div className="about-section">
						<h2>Nuestros Apartamentos</h2>
						<div className="apartments-info">
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

					<div className="about-section">
						<h2>Filosofía</h2>
						<p>
							Creemos en la hospitalidad auténtica y en crear conexiones
							genuinas. Nuestros apartamentos no son solo un lugar donde dormir,
							sino un hogar temporal donde crear recuerdos especiales. Cada
							detalle ha sido pensado para que tu estancia sea memorable y
							confortable.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
