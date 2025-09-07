import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { BiMenu, BiX } from "react-icons/bi";
import "./Navbar.css";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="navbar">
			<div className="navbar-inner">
				<div className="container navbar-container">
					{/* Logo */}
					<Link to="/" className="navbar-logo">
						<FaHome className="navbar-logo-icon" />
						<span className="navbar-logo-text">Apartamentos Lisle</span>
					</Link>

					{/* Navigation Links - Desktop */}
					<nav className="navbar-nav">
						<Link to="/" className="nav-link">
							Inicio
						</Link>
						<Link to="/about" className="nav-link">
							Sobre nosotros
						</Link>
						<Link to="/contact" className="nav-link">
							Contacto
						</Link>
					</nav>

					{/* Contact Info - Desktop */}
					<div className="navbar-contact">
						<a href="tel:+34123456789" className="contact-link">
							<FaPhone /> +34 123 456 789
						</a>
						<a
							href="https://wa.me/34123456789"
							className="contact-link whatsapp"
							target="_blank"
							rel="noopener noreferrer">
							<FaWhatsapp /> WhatsApp
						</a>
					</div>

					{/* Mobile Menu Button */}
					<button
						className="mobile-menu-btn"
						onClick={() => setIsMenuOpen(!isMenuOpen)}>
						{isMenuOpen ? <BiX size={24} /> : <BiMenu size={24} />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="mobile-menu">
					<nav className="mobile-nav">
						<Link
							to="/"
							className="mobile-nav-link"
							onClick={() => setIsMenuOpen(false)}>
							Inicio
						</Link>
						<Link
							to="/about"
							className="mobile-nav-link"
							onClick={() => setIsMenuOpen(false)}>
							Sobre nosotros
						</Link>
						<Link
							to="/contact"
							className="mobile-nav-link"
							onClick={() => setIsMenuOpen(false)}>
							Contacto
						</Link>
					</nav>
					<div className="mobile-contact">
						<a href="tel:+34123456789" className="mobile-contact-link">
							<FaPhone /> +34 123 456 789
						</a>
						<a
							href="mailto:reservas@apartamentoslisle.com"
							className="mobile-contact-link">
							<FaEnvelope /> reservas@apartamentoslisle.com
						</a>
						<a
							href="https://wa.me/34123456789"
							className="mobile-contact-link"
							target="_blank"
							rel="noopener noreferrer">
							<FaWhatsapp /> WhatsApp
						</a>
					</div>
				</div>
			)}
		</header>
	);
};

export default Navbar;
