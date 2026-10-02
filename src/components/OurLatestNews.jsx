import { Bell, Star } from "lucide-react";
import '../styles/OurLatestNews.css';

export default function OurLatestNews() {
  return (
    <section className="latestnews-container">
      {/* Encabezado con la barra morada de Figma */}
      <div className="latestnews-header">
        <span className="latestnews-bar"></span>
        <h2 className="latestnews-title">Novedades y Comentarios</h2>
      </div>

      {/* Grilla de 3 Tarjetas */}
      <div className="latestnews-grid">
        
        {/* Tarjeta 1: Julio Vega */}
        <article className="latestnews-card">
          <div>
            <div className="latestnews-user-header">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                alt="Julio Vega"
                className="latestnews-avatar"
              />
              <h3 className="latestnews-user-name">Julio Vega</h3>
            </div>
            <p className="latestnews-comment">
              "Las verduras llegaron súper frescas hoy. ¡Excelente calidad!"
            </p>
          </div>

          <div className="latestnews-stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="star-active" />
            ))}
          </div>
        </article>

        {/* Tarjeta 2: Notificación - Nuevo Producto */}
        <article className="latestnews-card notification-card">
          <div className="decorative-purple-circle"></div>

          <div>
            <div className="latestnews-user-header">
              <div className="latestnews-bell-icon">
                <Bell size={18} className="bell-svg" />
              </div>
              <h3 className="latestnews-user-name">Nuevo Producto</h3>
            </div>
            <p className="latestnews-comment notification-text">
              Pan artesanal de masa madre disponible todos los martes.
            </p>
          </div>

          <div className="latestnews-time">
            <span className="green-dot"></span>
            <span>Publicado hace 2 horas</span>
          </div>
        </article>

        {/* Tarjeta 3: José Vega */}
        <article className="latestnews-card">
          <div>
            <div className="latestnews-user-header">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                alt="José Vega"
                className="latestnews-avatar"
              />
              <h3 className="latestnews-user-name">José Vega</h3>
            </div>
            <p className="latestnews-comment">
              "Me encanta la nueva sección orgánica, muy variada y saludable."
            </p>
          </div>

          <div className="latestnews-stars">
            {Array.from({ length: 4 }).map((_, i) => (
              <Star key={i} size={16} className="star-active" />
            ))}
            <Star size={16} className="star-half" />
          </div>
        </article>

      </div>
    </section>
  );
}