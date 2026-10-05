import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { getProducts } from '../services/productService';
import '../styles/OurProducts.css';

export default function OurProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProducts()
      .then((data) => {
        const productList = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
            ? data.products
            : [];

        // Consumimos únicamente los productos provenientes de la API
        setProducts(productList);
      })
      .catch((err) => {
        console.error('Error al obtener productos desde la API:', err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="ourproducts-loading">
        Cargando productos...
      </div>
    );
  }

  // Tomamos los primeros 9 productos devueltos por el backend
  const displayProducts = products.slice(0, 9);

  return (
    <section className="ourproducts-container">
      {/* Título en Morado con subrayado Amarillo */}
      <div className="ourproducts-header">
        <h2 className="ourproducts-title">No te pierdas nuestros productos</h2>
        <div className="ourproducts-title-line"></div>
      </div>

      {/* Grilla 3x3 de tarjetas consumiendo solo el backend */}
      {displayProducts.length > 0 ? (
        <div className="ourproducts-grid">
          {displayProducts.map((product) => {
            const productId = product.product_id || product.id;
            const categoryName = (
              typeof product.category === 'object' 
                ? product.category?.name 
                : product.category || "GENERAL"
            ).toUpperCase();
            const discountText = product.discount || (product.oldPrice || product.original_price ? "-15%" : null);
            const ratingVal = product.rating || 4.5;
            const currentPrice = Number(product.price || 0).toFixed(2);
            const oldPriceVal = product.oldPrice || product.original_price;

            return (
              <Link
                key={productId}
                to={`/producto/${productId}`}
                className="ourproducts-card"
              >
                {/* Contenedor de Imagen con Badge */}
                <div className="ourproducts-img-box">
                  {discountText && (
                    <span className="ourproducts-badge">{discountText}</span>
                  )}
                  <img
                    src={product.image_url || product.img1 || "https://via.placeholder.com/200"}
                    alt={product.name}
                    className="ourproducts-img"
                  />
                </div>

                {/* Información del Producto */}
                <div className="ourproducts-info">
                  <span className="ourproducts-category">{categoryName}</span>
                  <h3 className="ourproducts-name">{product.name}</h3>

                  {/* Rating con estrellas */}
                  <div className="ourproducts-rating">
                    <div className="ourproducts-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.floor(ratingVal) ? "star-active" : "star-inactive"}
                        />
                      ))}
                    </div>
                    <span className="ourproducts-rating-num">({ratingVal})</span>
                  </div>

                  {/* Precios (Anterior y Actual) */}
                  <div className="ourproducts-price-box">
                    {oldPriceVal && (
                      <span className="ourproducts-old-price">
                        S/. {Number(oldPriceVal).toFixed(2)}
                      </span>
                    )}
                    <span className="ourproducts-current-price">
                      S/. {currentPrice}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="empty-category-message">
          {error 
            ? "No se pudo conectar con el catálogo del servidor." 
            : "No hay productos disponibles actualmente en el servidor."}
        </div>
      )}

      {/* Botón Naranja Inferior Redondeado */}
      <div className="ourproducts-footer">
        <Link to="/OurStore" className="ourproducts-btn">
          Ver más
        </Link>
      </div>
    </section>
  );
}