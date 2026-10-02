import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { baseProducts } from "./products";
import '../styles/BestSelling.css';

const getProductEndTime = (productId) => {
  const key = `productEndTime_${productId}`;
  const stored = localStorage.getItem(key);
  if (stored) return parseInt(stored, 10);
  const endTime = Date.now() + 48 * 60 * 60 * 1000;
  localStorage.setItem(key, endTime);
  return endTime;
};

function CountdownTimer({ productId }) {
  const [timeLeft, setTimeLeft] = useState(getProductEndTime(productId) - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getProductEndTime(productId) - Date.now();
      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [productId]);

  const formatTime = ms => {
    if (ms <= 0) return "00h:00m:00s";
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2,"0")}h:${minutes.toString().padStart(2,"0")}m:${seconds.toString().padStart(2,"0")}s`;
  };

  return (
    <span className="bestselling-timer">
      {formatTime(timeLeft)}
    </span>
  );
}

export default function BestSelling() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Mantenemos tus productos sin eliminar ninguno
  const products = baseProducts.filter(
    (product) => product.status === "sale" || product.rating >= 4
  );

  const handleProductClick = (productId) => {
    navigate(`/producto/${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1);
    alert(`"${product.name}" agregado al carrito! 🛒`);
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cards = Array.from(container.children);
    if (!cards.length) return;

    const gap = 20;
    const cardWidth = cards[0].offsetWidth + gap;
    const scrollLeft = container.scrollLeft;

    let targetIndex;
    if (direction === "right") {
      targetIndex = Math.round(scrollLeft / cardWidth) + 1;
      if (targetIndex >= cards.length) targetIndex = cards.length - 1;
    } else {
      targetIndex = Math.round(scrollLeft / cardWidth) - 1;
      if (targetIndex < 0) targetIndex = 0;
    }

    const targetScroll = targetIndex * cardWidth;
    container.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  return (
    <section className="bestselling-container">
      {/* Título y subtítulo exactos de Figma */}
      <div className="bestselling-header">
        <h2 className="bestselling-title">Productos más vendidos</h2>
        <p className="bestselling-subtitle">Top ventas en base a usuarios reales</p>
      </div>

      <div className="bestselling-carousel-wrapper">
        <button
          onClick={() => scroll("left")}
          aria-label="Anterior"
          className="bestselling-nav-btn prev"
        >
          <ChevronLeft className="icon" />
        </button>

        <div ref={scrollRef} className="bestselling-track">
          {products.map((product) => (
            <article
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="bestselling-card"
            >
              <div className="bestselling-card-content">
                {/* Contenedor de Imagen */}
                <div className="bestselling-img-box">
                  <span className="bestselling-badge-sale">
                    {product.discount || "-15%"}
                  </span>

                  <CountdownTimer productId={product.id} />

                  <img
                    src={product.img1}
                    alt={product.name}
                    className="bestselling-img img-primary"
                  />

                  {product.img2 && (
                    <img
                      src={product.img2}
                      alt={product.name + " alt"}
                      className="bestselling-img img-hover"
                    />
                  )}
                </div>

                {/* Estrellas amarillas */}
                <div className="bestselling-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className={i < (product.rating || 5) ? "star-active" : "star-inactive"}
                    />
                  ))}
                </div>

                {/* Título en Morado */}
                <h3 className="bestselling-product-title">{product.name}</h3>

                {/* Precio en Naranja */}
                <div className="bestselling-price-box">
                  {product.oldPrice && (
                    <span className="bestselling-old-price">
                      S/ {Number(product.oldPrice).toFixed(2)}
                    </span>
                  )}
                  <span className="bestselling-current-price">
                    S/ {Number(product.price).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Botón Naranja Figma */}
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="bestselling-add-btn"
              >
                Agregar al carrito
              </button>
            </article>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          aria-label="Siguiente"
          className="bestselling-nav-btn next"
        >
          <ChevronRight className="icon" />
        </button>
      </div>
    </section>
  );
}