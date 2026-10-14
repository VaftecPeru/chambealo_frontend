import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react';
import '../styles/Footer.css';

export default function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="chambealo-footer">
      <div className="footer-main-container">
        
        {/* Columna 1: Logo de Chambealo, Descripción y Redes Sociales */}
        <div className="footer-col footer-brand">
          <Link to="/" className="footer-logo">
            <img 
              src="/img/logo_chambealo1.png" 
              alt="Chambealo Logo" 
              className="footer-logo-img" 
              onError={(e) => {
                // Fallback si la ruta difiere
                e.target.onerror = null;
                e.target.src = "/logo.png";
              }}
            />
          </Link>
          <p className="footer-description">
            Encuentra tus productos favoritos en un solo lugar. Calidad, variedad y ofertas pensadas para ti.
          </p>
          <div className="footer-socials">
            <a href="#facebook" className="social-icon" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="#instagram" className="social-icon" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="#whatsapp" className="social-icon" aria-label="WhatsApp">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        {/* Columna 2: Comprar (Sin punto morado) */}
        <div className="footer-col">
          <h3 className="footer-title">Comprar</h3>
          <ul className="footer-links">
            <li><Link to="/OurStore">Tienda</Link></li>
            <li><Link to="/OurStore">Categorías</Link></li>
            <li><Link to="/OurStore">Más vendidos</Link></li>
            <li><Link to="/OurStore">Ofertas</Link></li>
          </ul>
        </div>

        {/* Columna 3: Ayuda (Sin punto morado) */}
        <div className="footer-col">
          <h3 className="footer-title">Ayuda</h3>
          <ul className="footer-links">
            <li><a href="#faq">Preguntas frecuentes</a></li>
            <li><a href="#envios">Envíos</a></li>
            <li><a href="#devoluciones">Cambios y devoluciones</a></li>
            <li><a href="#terminos">Términos y condiciones</a></li>
          </ul>
        </div>

        {/* Columna 4: Contacto (Sin punto morado) */}
        <div className="footer-col">
          <h3 className="footer-title">Contacto</h3>
          <ul className="footer-contact-list">
            <li>
              <Phone size={18} className="icon-yellow" />
              <span>+51 987654321</span>
            </li>
            <li>
              <Mail size={18} className="icon-yellow" />
              <span>hola@chambealo.com</span>
            </li>
            <li className="contact-item-align-top">
              <Clock size={18} className="icon-yellow" />
              <div>
                <span>Lun - Vie</span>
                <span className="contact-subtext">9:00 am - 6:00 pm</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Columna 5: Tarjeta de Suscripción */}
        <div className="footer-col footer-card-col">
          <div className="footer-subscribe-card">
            <h3 className="card-title">¡Sé parte de nosotros!</h3>
            <p className="card-description">
              Recibe ofertas exclusivas y consejos de expertos directamente en tu bandeja.
            </p>
            <form onSubmit={handleSubscribe} className="card-form">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                required
                className="card-input"
              />
              <button type="submit" className="card-btn">
                Suscribirme
              </button>
            </form>
          </div>
        </div>

      </div>

      <div className="footer-divider"></div>

      {/* Sección Inferior: Pagos Seguros y Copyright */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="payments-section">
            <span className="payments-label">PAGOS SEGUROS</span>
            <div className="payment-badges">
              <span className="payment-badge">VISA</span>
              <span className="payment-badge">MC</span>
              <span className="payment-badge">PayPal</span>
            </div>
          </div>
          <p className="copyright-text">
            © 2026 <strong>Chambealo</strong>. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}