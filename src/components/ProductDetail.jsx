import { useState, useEffect } from 'react';
import { Star, ShoppingCart, Truck, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const ProductDetail = ({ allProducts = [] }) => {
  const { id } = useParams();
  const [imagenActiva, setImagenActiva] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [producto, setProducto] = useState(null);
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    if (allProducts && allProducts.length > 0 && id) {
      const productId = parseInt(id, 10);

      const foundProduct = allProducts.find(
        (p) => (p.product_id || p.id) === productId
      );

      if (foundProduct) {
        // Galería de imágenes (soporta image_url, img1, img2, etc.)
        const imgs = [
          foundProduct.image_url || foundProduct.img1 || foundProduct.image,
          foundProduct.img2,
          foundProduct.img3,
          foundProduct.img4,
        ].filter(Boolean);

        // Lectura real de stock desde la API backend
        const stockActual = Number(
          foundProduct.stock ?? foundProduct.stock_quantity ?? foundProduct.quantity ?? 0
        );

        const precioActual = Number(foundProduct.price || foundProduct.precio || 0);
        const precioOriginal = foundProduct.oldPrice || foundProduct.original_price
          ? Number(foundProduct.oldPrice || foundProduct.original_price)
          : null;

        const transformedProduct = {
          id: foundProduct.product_id || foundProduct.id,
          nombre: foundProduct.name || foundProduct.nombre || 'Producto',
          precio: precioActual,
          precioAnterior: precioOriginal,
          descuento: foundProduct.discount || (precioOriginal && precioOriginal > precioActual
            ? Math.round(((precioOriginal - precioActual) / precioOriginal) * 100)
            : 0),
          rating: foundProduct.rating || null,
          reviews: foundProduct.reviews_count || 0,
          categoria:
            foundProduct.category?.name ||
            foundProduct.category_name ||
            foundProduct.category ||
            'General',
          presentacion: foundProduct.content_info || foundProduct.unit || null,
          conservacion: foundProduct.storage || null,
          descripcion:
            foundProduct.description ||
            'Sin descripción detallada disponible para este producto.',
          stock: stockActual,
          agotado: stockActual <= 0,
          imagenes: imgs.length > 0 ? imgs : ['https://via.placeholder.com/400?text=Sin+Imagen'],
        };

        setProducto(transformedProduct);
        setImagenActiva(0);
        setCantidad(1);

        // Relacionados dentro de la misma categoría o lista
        const relacionados = allProducts
          .filter((p) => (p.product_id || p.id) !== productId)
          .slice(0, 4);
        setProductosRelacionados(relacionados);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [allProducts, id]);

  const handleAddToCart = (itemToAdd = producto, qty = cantidad) => {
    if (itemToAdd && !itemToAdd.agotado) {
      addToCart(itemToAdd, qty);
      alert(`${qty} ${itemToAdd.nombre} agregado(s) al carrito! 🛒`);
    }
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={
          i < Math.round(rating)
            ? 'fill-amber-400 text-amber-400'
            : 'fill-gray-200 text-gray-200'
        }
      />
    ));
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-12 text-center text-gray-500 font-semibold">
        Cargando detalle del producto...
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="max-w-6xl mx-auto p-12 text-center space-y-4">
        <h2 className="text-2xl font-bold text-red-500">
          ⚠️ Producto no encontrado
        </h2>
        <Link to="/" className="text-purple-700 underline font-medium">
          ← Volver a la tienda
        </Link>
      </div>
    );
  }

  const prod = producto;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 text-slate-800 bg-white">
      {/* 1. BREADCRUMB */}
      <nav className="text-xs text-gray-400 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:underline">
          Inicio
        </Link>
        <span>›</span>
        <span className="text-gray-600 font-medium">{prod.categoria}</span>
      </nav>

      {/* 2. GALERÍA Y DETALLE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-16">
        {/* GALERÍA */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#FAF9F5] rounded-3xl p-6 flex items-center justify-center min-h-[380px] border border-gray-100 relative">
            {prod.agotado && (
              <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Agotado
              </span>
            )}
            <img
              src={prod.imagenes[imagenActiva]}
              alt={prod.nombre}
              className={`max-h-80 w-auto object-contain drop-shadow-sm transition-all duration-300 ${
                prod.agotado ? 'opacity-50 grayscale' : ''
              }`}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400?text=Imagen+No+Disponible';
              }}
            />
          </div>

          {/* Miniaturas */}
          {prod.imagenes.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {prod.imagenes.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setImagenActiva(idx)}
                  className={`w-16 h-16 rounded-xl border-2 overflow-hidden flex-shrink-0 bg-white p-1 transition ${
                    imagenActiva === idx
                      ? 'border-purple-600 ring-2 ring-purple-100'
                      : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Vista ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INFORMACIÓN DEL PRODUCTO */}
        <div className="flex flex-col gap-3">
          <span className="text-[11px] font-black tracking-widest text-purple-700 uppercase">
            {prod.categoria}
          </span>

          <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
            {prod.nombre}
          </h1>

          {/* Reseñas (Solo si existen) */}
          {prod.rating && (
            <div className="flex items-center gap-2 text-xs mb-1">
              <div className="flex gap-0.5">{renderStars(prod.rating)}</div>
              <span className="font-bold text-slate-800">{prod.rating}</span>
              {prod.reviews > 0 && (
                <span className="text-gray-400">({prod.reviews} reseñas)</span>
              )}
            </div>
          )}

          {/* CAJA DE PRECIO Y ACCIÓN */}
          <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100 flex flex-col gap-3 mt-1">
            {prod.descuento > 0 && prod.precioAnterior && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 line-through font-medium">
                  S/. {prod.precioAnterior.toFixed(2)}
                </span>
                <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  {prod.descuento}% OFF
                </span>
              </div>
            )}

            <div className="text-3xl font-black text-slate-900">
              S/. {prod.precio.toFixed(2)}
            </div>

            {prod.presentacion && (
              <p className="text-xs text-gray-500 font-medium">
                Presentación: {prod.presentacion}
              </p>
            )}

            {/* Estado de Stock */}
            <div className="flex items-center gap-2 text-xs font-semibold">
              {prod.agotado ? (
                <span className="flex items-center gap-1.5 text-red-600 font-bold">
                  <AlertTriangle size={14} /> Producto Agotado
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  En Stock ({prod.stock} disponibles)
                </span>
              )}
            </div>

            {/* Selector de cantidad y Botón */}
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center border border-gray-200 bg-white rounded-xl">
                <button
                  disabled={prod.agotado || cantidad <= 1}
                  onClick={() => setCantidad((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-gray-500 font-bold hover:bg-gray-100 rounded-l-xl transition disabled:opacity-30"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-bold text-gray-800 min-w-[28px] text-center">
                  {prod.agotado ? 0 : cantidad}
                </span>
                <button
                  disabled={prod.agotado || cantidad >= prod.stock}
                  onClick={() => setCantidad((q) => Math.min(prod.stock, q + 1))}
                  className="px-3 py-1.5 text-gray-500 font-bold hover:bg-gray-100 rounded-r-xl transition disabled:opacity-30"
                >
                  +
                </button>
              </div>

              <button
                disabled={prod.agotado}
                onClick={() => handleAddToCart(prod, cantidad)}
                className={`flex-1 font-bold py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 text-xs shadow-md ${
                  prod.agotado
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                    : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-100'
                }`}
              >
                <ShoppingCart size={16} />
                {prod.agotado ? 'Producto Agotado' : 'Agregar al carrito'}
              </button>
            </div>
          </div>

          {/* BENEFICIOS */}
          <div className="flex flex-col gap-3 mt-3 text-xs text-gray-600">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-700">
                <Truck size={18} />
              </div>
              <div>
                <p className="font-bold text-slate-800">Entrega garantizada</p>
                <p className="text-[11px] text-gray-400">
                  Envíos según cobertura de entrega
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-700">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="font-bold text-slate-800">Garantía de calidad</p>
                <p className="text-[11px] text-gray-400">
                  Producto verificado y empacado de origen
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DESCRIPCIÓN Y ESPECIFICACIONES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-100 pt-10 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-5 bg-purple-700 rounded-full"></div>
            <h2 className="text-base font-bold text-slate-900">
              Descripción del producto
            </h2>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed">
            {prod.descripcion}
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-4">
            Especificaciones Técnicas
          </h2>
          <div className="flex flex-col text-xs gap-1">
            <div className="flex justify-between py-2.5 px-3 bg-gray-50 rounded-lg">
              <span className="text-gray-500 font-medium">Categoría:</span>
              <span className="font-semibold text-slate-800">
                {prod.categoria}
              </span>
            </div>
            {prod.presentacion && (
              <div className="flex justify-between py-2.5 px-3">
                <span className="text-gray-500 font-medium">Presentación:</span>
                <span className="font-semibold text-slate-800">
                  {prod.presentacion}
                </span>
              </div>
            )}
            {prod.conservacion && (
              <div className="flex justify-between py-2.5 px-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500 font-medium">Conservación:</span>
                <span className="font-semibold text-slate-800">
                  {prod.conservacion}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. PRODUCTOS RELACIONADOS */}
      {productosRelacionados.length > 0 && (
        <div className="border-t border-gray-100 pt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black italic tracking-wider uppercase text-slate-900">
              PRODUCTOS <span className="text-purple-700">RELACIONADOS</span>
            </h2>
            <Link
              to="/"
              className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1"
            >
              Ver todos →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {productosRelacionados.map((rel) => {
              const relId = rel.product_id || rel.id;
              const relImage =
                rel.image_url || rel.img1 || rel.image || 'https://via.placeholder.com/150';
              const relPrice = Number(rel.price || rel.precio || 0);

              return (
                <div
                  key={relId}
                  className="bg-white rounded-2xl border border-gray-100 p-3 flex flex-col justify-between hover:shadow-md transition"
                >
                  <div>
                    <div className="bg-[#FAF9F5] rounded-xl h-36 flex items-center justify-center p-2 mb-3">
                      <img
                        src={relImage}
                        alt={rel.name || rel.nombre}
                        className="max-h-28 object-contain"
                      />
                    </div>
                    <span className="text-[10px] text-purple-700 font-bold uppercase">
                      {rel.category_name || rel.category?.name || 'General'}
                    </span>
                    <Link to={`/producto/${relId}`}>
                      <h3 className="font-bold text-slate-800 text-xs hover:text-purple-700 transition line-clamp-1 mt-0.5">
                        {rel.name || rel.nombre}
                      </h3>
                    </Link>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-black text-slate-900">
                      S/. {relPrice.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(rel, 1)}
                      className="w-7 h-7 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg flex items-center justify-center text-sm shadow-sm transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;