import { Link } from 'react-router-dom';

export const ProductCard = ({ product }) => {
  if (!product) return null;

  // Extraemos las propiedades con fallbacks por si la API o los datos estáticos usan nombres distintos
  const {
    product_id,
    id,
    name,
    nombre,
    content_info = 'Contenido: 1 Litro',
    price,
    precio,
    original_price,
    discount,
    image_url,
    image,
    img1,
    img,
    rating = 5,
    reviews_count = 45,
    is_sale = true
  } = product;

  // Priorizamos el ID devuelto por la base de datos o el objeto
  const productId = product_id || id;

  // Nombre del producto con fallback
  const displayTitle = name || nombre || 'Producto';

  // Imagen con fallback multi-campo
  const displayImage =
    image_url ||
    image ||
    img1 ||
    img ||
    'https://via.placeholder.com/150?text=Sin+Imagen';

  // Precio numérico seguro
  const displayPrice = Number(price ?? precio ?? 0);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        {/* Contenedor Imagen + Badges */}
        <Link to={`/producto/${productId}`}>
          <div className="relative bg-[#FAF9F5] rounded-2xl overflow-hidden h-48 mb-3 flex items-center justify-center p-3 cursor-pointer">
            <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 items-start">
              {is_sale && (
                <span className="bg-[#FF5700] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                  VENTA
                </span>
              )}
              {discount && (
                <span className="bg-[#5C068C] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  -{discount}%
                </span>
              )}
            </div>

            <img
              src={displayImage}
              alt={displayTitle}
              className="max-h-36 w-full object-contain hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // Si la URL falla o da 404, reemplaza por imagen por defecto sin romper el diseño
                e.target.src = 'https://via.placeholder.com/150?text=Sin+Imagen';
              }}
            />
          </div>
        </Link>

        {/* Estrellas y Conteo */}
        <div className="flex items-center gap-1.5 mb-1">
          <div className="text-amber-400 text-xs flex">
            {'★'.repeat(Math.round(rating))}
          </div>
          <span className="text-xs text-gray-400 font-medium">({reviews_count})</span>
        </div>

        {/* Título */}
        <Link to={`/producto/${productId}`}>
          <h3 className="font-bold text-gray-900 text-base hover:text-[#5C068C] transition line-clamp-1">
            {displayTitle}
          </h3>
        </Link>

        {/* Detalle o Contenido */}
        {content_info && (
          <p className="text-xs text-gray-400 mt-0.5 font-normal">{content_info}</p>
        )}

        {/* Precios */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-xl font-black text-[#FF5700]">
            S/. {displayPrice.toFixed(2)}
          </span>
          {original_price && (
            <span className="text-xs text-gray-400 line-through">
              S/. {Number(original_price).toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Botón Agregar al Carrito */}
      <button className="w-full mt-4 bg-[#FF5700] hover:bg-[#e04d00] text-white font-bold py-3 rounded-2xl transition flex items-center justify-center gap-2 text-sm shadow-md shadow-orange-100">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
          />
        </svg>
        Agregar al carrito
      </button>
    </div>
  );
};