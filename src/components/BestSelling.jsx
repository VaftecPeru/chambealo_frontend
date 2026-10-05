import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { getProducts } from "../services/productService";
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts()
      .then((data) => {
        const productList = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
            ? data.products
            : [];
        setProducts(productList);
      })
      .catch((err) => console.error("Error al obtener productos en BestSelling:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/producto/${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1);
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
      <div className="bestselling-header">
        <h2 className="bestselling-title">Productos más vendidos</h2>
        <p className="bestselling-subtitle">Top ventas en base a usuarios reales</p>
      </div>

      <div className="bestselling-carousel-wrapper">
        {products.length > 0 && (
          <button
            onClick={() => scroll("left")}
            aria-label="Anterior"
            className="bestselling-nav-btn prev"
          >
            <ChevronLeft className="icon" />
          </button>
        )}

        <div ref={scrollRef} className="bestselling-track">
          {loading ? (
            <div className="empty-category-message" style={{ width: "100%", textAlign: "center", padding: "20px 0" }}>
              <p>Cargando productos...</p>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => {
              const productId = product.product_id || product.id;
              const name = product.name || product.nombre || 'Producto';
              const price = Number(product.price || product.precio || 0);
              const oldPrice = product.original_price || product.oldPrice;
              const image = product.image_url || product.img1 || product.image || "https://via.placeholder.com/200";

              return (
                <article
                  key={productId}
                  onClick={() => handleProductClick(productId)}
                  className="bestselling-card"
                >
                  <div className="bestselling-card-content">
                    <div className="bestselling-img-box">
                      {product.discount && (
                        <span className="bestselling-badge-sale">
                          {product.discount}
                        </span>
                      )}

                      <CountdownTimer productId={productId} />

                      <img
                        src={image}
                        alt={name}
                        className="bestselling-img img-primary"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/200?text=Sin+Imagen";
                        }}
                      />
                    </div>

                    <div className="bestselling-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={15}
                          className={i < (product.rating || 5) ? "star-active" : "star-inactive"}
                        />
                      ))}
                    </div>

                    <h3 className="bestselling-product-title">{name}</h3>

                    <div className="bestselling-price-box">
                      {oldPrice && (
                        <span className="bestselling-old-price">
                          S/ {Number(oldPrice).toFixed(2)}
                        </span>
                      )}
                      <span className="bestselling-current-price">
                        S/ {price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="bestselling-add-btn"
                  >
                    Agregar al carrito
                  </button>
                </article>
              );
            })
          ) : (
            <div className="empty-category-message" style={{ width: "100%", textAlign: "center", padding: "20px 0" }}>
              <p>No hay productos disponibles actualmente en el servidor.</p>
            </div>
          )}
        </div>

        {products.length > 0 && (
          <button
            onClick={() => scroll("right")}
            aria-label="Siguiente"
            className="bestselling-nav-btn next"
          >
            <ChevronRight className="icon" />
          </button>
        )}
      </div>
    </section>
  );
}