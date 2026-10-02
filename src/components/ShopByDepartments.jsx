import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { baseProducts } from "./products";
import { useCart } from "../contexts/CartContext";
import '../styles/ShopByDepartments.css';

export default function ShopByDepartments() {
  const [activeCategory, setActiveCategory] = useState("lacteos");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeDot, setActiveDot] = useState(0);

  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const categories = [
    { key: "lacteos", label: "Lácteos" },
    { key: "vegetales", label: "Vegetales" },
    { key: "panaderia", label: "Panadería" },
    { key: "frutos_secos", label: "Frutos Secos" },
    { key: "galletas", label: "Galletas" },
  ];

  // Filtra de forma flexible sobre baseProducts
  const filteredProducts = baseProducts.filter((product) => {
    const cat = (product.category || "").toLowerCase();
    const type = (product.type || "").toLowerCase();
    const name = (product.name || "").toLowerCase();

    switch (activeCategory) {
      case "lacteos":
        return cat.includes("lácteo") || cat.includes("lacteo") || type.includes("lacteo") || cat.includes("leche");
      case "vegetales":
        return cat.includes("vegetal") || cat.includes("verdura") || cat.includes("fruta");
      case "panaderia":
        return cat.includes("panad") || cat.includes("pan") || cat.includes("pastel") || type.includes("pan");
      case "frutos_secos":
        return cat.includes("fruto") || cat.includes("seco") || cat.includes("nueces") || name.includes("nueces");
      case "galletas":
        return cat.includes("galleta") || cat.includes("snack") || type.includes("galleta");
      default:
        return cat.includes(activeCategory);
    }
  });

  // Evalúa si se requiere scroll y actualiza la posición de las flechas y puntos
  const checkScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    const maxScroll = scrollWidth - clientWidth;
    
    // Si no sobrepasa el ancho visible, no hay scroll posible
    const hasOverflow = maxScroll > 10;
    
    setCanScrollLeft(hasOverflow && scrollLeft > 10);
    setCanScrollRight(hasOverflow && scrollLeft < maxScroll - 10);

    if (hasOverflow && maxScroll > 0) {
      const ratio = scrollLeft / maxScroll;
      if (ratio < 0.33) setActiveDot(0);
      else if (ratio < 0.66) setActiveDot(1);
      else setActiveDot(2);
    } else {
      setActiveDot(0);
    }
  };

  useEffect(() => {
    checkScrollState();
    window.addEventListener("resize", checkScrollState);
    return () => window.removeEventListener("resize", checkScrollState);
  }, [filteredProducts, activeCategory]);

  const handleProductClick = (productId) => {
    navigate(`/producto/${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
    setTimeout(checkScrollState, 150);
  };

  const isScrollable = canScrollLeft || canScrollRight;

  return (
    <section className="shop-departments-section">
      {/* Encabezado y Pestañas */}
      <div className="departments-header">
        <div>
          <h2 className="departments-title">Comprar por Categorías</h2>
          <p className="departments-subtitle">Frescura y calidad directamente a tu mesa</p>
        </div>

        <div className="pills-container">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`pill-btn ${activeCategory === key ? "active" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Carrusel */}
      <div className="carousel-wrapper">
        {/* Flecha Izquierda (Sólo si hay elementos ocultos a la izquierda) */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            aria-label="Anterior"
            className="carousel-nav-btn left"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div 
          ref={scrollRef} 
          onScroll={checkScrollState}
          className="carousel-track"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <article key={product.id} className="dept-product-card">
                <div onClick={() => handleProductClick(product.id)}>
                  <div className="dept-card-image-wrapper">
                    <div className="dept-badges-container">
                      <span className="badge-venta">VENTA</span>
                      {product.discount && (
                        <span className="badge-discount">{product.discount}</span>
                      )}
                    </div>
                    <img
                      src={product.img1 || product.image}
                      alt={product.name}
                      className="dept-card-image"
                    />
                  </div>

                  <div className="rating-row">
                    <div className="stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < (product.rating || 5) ? "star-active" : "star-inactive"}
                        />
                      ))}
                    </div>
                    <span className="reviews-count">({product.reviews || product.rating || 12})</span>
                  </div>

                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-content">
                    {product.details || product.content || "Contenido: 1 Litro"}
                  </p>

                  <div className="price-row">
                    <span className="current-price">S/. {Number(product.price).toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="old-price">S/. {Number(product.oldPrice).toFixed(2)}</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="dept-add-cart-btn"
                >
                  <ShoppingCart size={18} />
                  <span>Agregar al carrito</span>
                </button>
              </article>
            ))
          ) : (
            <div className="empty-category-message">
              <p>No se encontraron productos en esta categoría.</p>
            </div>
          )}
        </div>

        {/* Flecha Derecha (Sólo si hay elementos ocultos a la derecha) */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            aria-label="Siguiente"
            className="carousel-nav-btn right"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {/* Puntos Indicadores (Sólo se muestran si realmente se puede scrollear) */}
      {isScrollable && (
        <div className="dots-indicators">
          <span className={`dot ${activeDot === 0 ? "active" : ""}`}></span>
          <span className={`dot ${activeDot === 1 ? "active" : ""}`}></span>
          <span className={`dot ${activeDot === 2 ? "active" : ""}`}></span>
        </div>
      )}
    </section>
  );
}