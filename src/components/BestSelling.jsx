
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { getProducts } from "../services/productService";
import { getPricing, getRating, getStockInfo } from "../utils/catalog";
import '../styles/BestSelling.css';

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
        <h2 className="bestselling-title">Productos destacados</h2>
        <p className="bestselling-subtitle">Elige entre los productos disponibles en nuestro catálogo</p>
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
              const { price, oldPrice, percent } = getPricing(product);
              const rating = getRating(product);
              const stock = getStockInfo(product);
              const image = product.image_url || product.img1 || product.image || "https://via.placeholder.com/200";

              return (
                <article
                  key={productId}
                  onClick={() => handleProductClick(productId)}
                  className="bestselling-card"
                >
                  <div className="bestselling-card-content">
                    <div className="bestselling-img-box">
                      {stock.soldOut ? (
                        <span className="bestselling-badge-sale">Agotado</span>
                      ) : (
                        percent > 0 && (
                          <span className="bestselling-badge-sale">-{percent}%</span>
                        )
                      )}

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

                    {rating !== null && (
                      <div className="bestselling-stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={15}
                            className={i < Math.round(rating) ? "star-active" : "star-inactive"}
                          />
                        ))}
                      </div>
                    )}

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
                    className="bestselling-add-btn disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={stock.soldOut}
                  >
                    {stock.soldOut ? "Agotado" : "Agregar al carrito"}
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
