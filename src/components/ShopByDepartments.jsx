import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/productService";
import { useCart } from "../contexts/CartContext";
import '../styles/ShopByDepartments.css';

export default function ShopByDepartments() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    getProducts()
      .then((data) => {
        const productList = Array.isArray(data)
          ? data
          : data && Array.isArray(data.products)
            ? data.products
            : [];
        setProducts(productList);
      })
      .catch((err) => console.error("Error al obtener productos en ShopByDepartments:", err))
      .finally(() => setLoading(false));
  }, []);

  // Filtra dinámicamente los productos recibidos del backend
  const filteredProducts = products.filter((product) => {
    const catObj = product.category;
    const rawCat = typeof catObj === 'object' && catObj !== null ? catObj.name : catObj;
    const cat = (rawCat || "").toLowerCase();
    
    const name = (product.name || product.nombre || "").toLowerCase();

    switch (activeCategory) {
      case "lacteos":
        return cat.includes("lácteo") || cat.includes("lacteo") || cat.includes("leche");
      case "vegetales":
        return cat.includes("vegetal") || cat.includes("verdura") || cat.includes("fruta");
      case "panaderia":
        return cat.includes("panad") || cat.includes("pan") || cat.includes("pastel");
      case "frutos_secos":
        return cat.includes("fruto") || cat.includes("seco") || cat.includes("nueces") || name.includes("nueces");
      case "galletas":
        return cat.includes("galleta") || cat.includes("snack");
      default:
        return cat.includes(activeCategory);
    }
  });

  const checkScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    const maxScroll = scrollWidth - clientWidth;
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
    <section className="shop-departments-section w-full max-w-7xl mx-auto px-4 sm:px-6 my-8">
      {/* Cabecera alineada: Título a la izquierda, Píldoras a la derecha en Desktop */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3a085c]">Comprar por Categorías</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Frescura y calidad directamente a tu mesa</p>
        </div>

        {/* Contenedor de botones restaurado a los estilos del diseño */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 no-scrollbar bg-gray-100/80 p-1.5 rounded-full border border-gray-200/60 self-start md:self-auto">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 shrink-0 ${
                activeCategory === key
                  ? "bg-[#670cb7] text-white shadow-md scale-105"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="carousel-wrapper relative">
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
          className="carousel-track flex gap-4 overflow-x-auto scroll-smooth pb-4"
        >
          {loading ? (
            <div className="empty-category-message w-full text-center py-8">
              <p>Cargando categorías...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const productId = product.product_id || product.id;
              const name = product.name || product.nombre || 'Producto';
              const price = Number(product.price || 0).toFixed(2);
              const oldPrice = product.original_price || product.oldPrice;
              const image = product.image_url || product.img1 || product.image || "https://via.placeholder.com/200";

              return (
                <article key={productId} className="dept-product-card shrink-0 w-[240px] sm:w-[260px]">
                  <div onClick={() => handleProductClick(productId)}>
                    <div className="dept-card-image-wrapper">
                      <div className="dept-badges-container">
                        <span className="badge-venta">VENTA</span>
                        {product.discount && (
                          <span className="badge-discount">{product.discount}</span>
                        )}
                      </div>
                      <img
                        src={image}
                        alt={name}
                        className="dept-card-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/200?text=Sin+Imagen";
                        }}
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
                      <span className="reviews-count">({product.reviews || product.rating || 5})</span>
                    </div>

                    <h3 className="product-title">{name}</h3>
                    <p className="product-content">
                      {product.details || "Producto disponible"}
                    </p>

                    <div className="price-row">
                      <span className="current-price">S/. {price}</span>
                      {oldPrice && (
                        <span className="old-price">S/. {Number(oldPrice).toFixed(2)}</span>
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
              );
            })
          ) : (
            <div className="empty-category-message w-full text-center py-8">
              <p>No se encontraron productos en esta categoría.</p>
            </div>
          )}
        </div>

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