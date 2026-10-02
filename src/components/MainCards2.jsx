import { useNavigate } from "react-router-dom";
import '../styles/MainCard2.css';

// Importación de las imágenes desde src/assets/
import fotoHogar from '../assets/foto_ofertas_para_tu_hogar.png';
import fotoSeleccionados from '../assets/foto_de_productos_seleccionados.png';

export default function MainCards2() {
  const navigate = useNavigate();

  return (
    <section className="maincards2-container">
      <div className="maincards2-grid">
        
        {/* Banner 1: Ofertas para tu hogar */}
        <div 
          className="maincards2-card card-hogar"
          style={{ backgroundImage: `url(${fotoHogar})` }}
        >
          <div className="maincards2-overlay dark-overlay"></div>

          <div className="maincards2-content">
            <span className="maincards2-tag tag-yellow">Hasta 40% OFF</span>
            <h2 className="maincards2-title text-white">Ofertas para tu hogar</h2>
            <p className="maincards2-description text-gray">
              Productos esenciales para hacer tu día más fácil.
            </p>
            <button
              onClick={() => navigate("/OurStore")}
              className="maincards2-btn"
            >
              Ver más
            </button>
          </div>
        </div>

        {/* Banner 2: Productos seleccionados */}
        <div 
          className="maincards2-card card-seleccionados"
          style={{ backgroundImage: `url(${fotoSeleccionados})` }}
        >
          <div className="maincards2-overlay light-overlay"></div>

          <div className="maincards2-content">
            <span className="maincards2-tag tag-purple">Solo por esta semana</span>
            <h2 className="maincards2-title text-purple">Productos seleccionados</h2>
            <p className="maincards2-description text-purple-dark">
              Encuentra tus favoritos a precios especiales.
            </p>
            <button
              onClick={() => navigate("/OurStore")}
              className="maincards2-btn"
            >
              Ver más
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}