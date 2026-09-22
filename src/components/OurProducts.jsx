import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/productService';

export default function OurProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error al obtener productos:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center text-gray-500 font-semibold">
        Cargando productos desde Laravel...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-10">
        No te pierdas nuestros Productos
      </h2>

      {/* GRID de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.slice(0, 9).map((product) => (
          <Link
            key={product.product_id || product.id}
            to={`/producto/${product.product_id || product.id}`}
            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group cursor-pointer"
          >
            {/* Imagen con borde y hover */}
            <div className="relative w-30 h-30 flex-shrink-0 rounded-xl shadow-sm bg-white flex items-center justify-center overflow-hidden">
              {/* Badge Sale si aplica */}
              {(product.status === "sale" || product.original_price) && (
                <span className="absolute bottom-1 left-1 text-red-500 text-[10px] font-semibold">
                  Sale
                </span>
              )}

              {/* Imagen con zoom al hover */}
              <img
                src={product.image_url || product.img1 || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-purple-700 transition-colors">
                {product.name}
              </h3>

              {/* Estrellas */}
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < (product.rating || 4)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Precio */}
              <div className="mt-2 flex items-center gap-2">
                {(product.original_price || product.oldPrice) && (
                  <span className="line-through text-gray-400 text-sm">
                    S/. {Number(product.original_price || product.oldPrice).toFixed(2)}
                  </span>
                )}
                <span className="text-lg font-bold text-red-600">
                  S/. {Number(product.price || 0).toFixed(2)}
                </span>
                {product.discount && (
                  <span className="bg-purple-600 text-white text-xs font-semibold px-1.5 py-1 rounded-md">
                    {product.discount}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Botón View All */}
      <div className="flex justify-center mt-10">
        <Link to="/OurStore">
          <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors">
            Ver más
          </button>
        </Link>
      </div>
    </div>
  );
}
