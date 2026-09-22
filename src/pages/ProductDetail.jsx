import { useState, useEffect } from 'react';
import { Star, ShoppingCart, Truck, ShieldCheck, ZoomIn } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const ProductDetail = ({ allProducts = [] }) => {
  const { id } = useParams();
  const [imagenActiva, setImagenActiva] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [producto, setProducto] = useState(null);
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para el efecto Lupa / Zoom
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: '50%', y: '50%' });

  const { addToCart } = useCart();

  useEffect(() => {
    // Sube al inicio de la página al cambiar de producto
    window.scrollTo(0, 0);

    if (allProducts && allProducts.length > 0 && id) {
      const currentId = Number(id);

      // Buscar el producto actual asegurando comparación numérica
      const foundProduct = allProducts.find(
        (p) => Number(p.product_id || p.id) === currentId
      );

      if (foundProduct) {
        const imgs = [
          foundProduct.image_url || foundProduct.img1 || foundProduct.image,
          foundProduct.img2,
          foundProduct.img3,
          foundProduct.img4,
        ].filter(Boolean);

        // Lee el número de stock del backend o usa 15 como valor por defecto
        const unidadesStock = Number(
          foundProduct.stock ??
          foundProduct.stock_quantity ??
          foundProduct.quantity ??
          15
        );

        const transformedProduct = {
          id: Number(foundProduct.product_id || foundProduct.id),
          nombre: foundProduct.name || foundProduct.nombre || 'Producto',
          precio: Number(foundProduct.price || foundProduct.precio || 0),
          precioAnterior: Number(
            foundProduct.oldPrice ||
              foundProduct.original_price ||
              (foundProduct.price || 0) * 1.2
          ),
          descuento: foundProduct.discount || 20,
          rating: foundProduct.rating || 4.8,
          reviews: foundProduct.reviews_count || foundProduct.reviews || 45,
          categoria:
            foundProduct.category?.name ||
            foundProduct.category_name ||
            foundProduct.category ||
            'General',
          presentacion: foundProduct.content_info || '1 Litro',
          conservacion: foundProduct.storage || 'Mantener refrigerado',
          descripcion:
            foundProduct.description ||
            'Descripción del producto no disponible.',
          // Muestra las unidades exactas en lugar de "In stock"
          disponibilidad: unidadesStock > 0 ? `${unidadesStock} unidades` : 'Agotado',
          imagenes: imgs.length > 0 ? imgs : ['https://via.placeholder.com/400'],
        };

        setProducto(transformedProduct);
        setImagenActiva(0);
        setCantidad(1);

        // 1. Excluir el producto actual convirtiendo ambos IDs a Number
        const otrosProductos = allProducts.filter(
          (p) => Number(p.product_id || p.id) !== currentId
        );

        // 2. Filtrar y eliminar duplicados por nombre
        const productosSinDuplicados = otrosProductos.filter(
          (prod, index, self) =>
            index ===
            self.findIndex(
              (t) => (t.name || t.nombre) === (prod.name || prod.nombre)
            )
        );

        // 3. Priorizar mostrar productos de la misma categoría
        const deMismaCategoria = productosSinDuplicados.filter(
          (p) =>
            (p.category_name || p.category?.name || p.category) ===
            transformedProduct.categoria
        );

        const listaFinalRelacionados =
          deMismaCategoria.length > 0 ? deMismaCategoria : productosSinDuplicados;

        setProductosRelacionados(listaFinalRelacionados.slice(0, 4));
      }
    }
    setLoading(false);
  }, [allProducts, id]);

  // Manejador del movimiento del mouse sobre la imagen para calcular la lupa
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x: `${x}%`, y: `${y}%` });
  };

  const handleAddToCart = (itemToAdd = producto, qty = cantidad) => {
    if (itemToAdd) {
      addToCart(itemToAdd, qty);
      alert(`${qty} ${itemToAdd.nombre || itemToAdd.name} agregado(s) al carrito! 🛒`);
    }
  };

  const renderStars = (rating) => {
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
        <Link to="/OurStore" className="text-purple-700 underline font-medium">
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
        <Link to="/OurStore" className="hover:underline">
          Tienda
        </Link>
        <span>›</span>
        <span className="text-gray-600 font-medium">{prod.categoria}</span>
      </nav>

      {/* 2. SECCIÓN SUPERIOR: GALERÍA Y COMPRA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-16">
        <div className="flex flex-col gap-4">
          {/* CONTENEDOR DE LA IMAGEN PRINCIPAL CON LUPA Y ZOOM */}
          <div
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            className="relative bg-[#FAF9F5] rounded-3xl p-6 flex items-center justify-center min-h-[380px] border border-gray-100 overflow-hidden cursor-zoom-in group"
          >
            {/* Ícono de Lupa flotante */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-purple-700 shadow-md pointer-events-none z-10 transition-transform duration-200 group-hover:scale-110">
              <ZoomIn size={18} />
            </div>

            <img
              src={prod.imagenes[imagenActiva]}
              alt={prod.nombre}
              style={{
                transformOrigin: `${zoomPos.x} ${zoomPos.y}`,
              }}
              className={`max-h-80 w-auto object-contain drop-shadow-sm transition-transform duration-150 ease-out ${
                isZoomed ? 'scale-[1.8]' : 'scale-100'
              }`}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400?text=Imagen+No+Disponible';
              }}
            />
          </div>

          {/* MINIATURAS */}
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
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[11px] font-black tracking-widest text-purple-700 uppercase">
            {prod.categoria}
          </span>

          <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
            {prod.nombre}
          </h1>

          <div className="flex items-center gap-2 text-xs mb-1">
            <div className="flex gap-0.5">{renderStars(prod.rating)}</div>
            <span className="font-bold text-slate-800">{prod.rating}</span>
            <span className="text-gray-400">({prod.reviews} opiniones)</span>
          </div>

          <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100 flex flex-col gap-3 mt-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 line-through font-medium">
                S/. {prod.precioAnterior.toFixed(2)}
              </span>
              <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                {prod.descuento}% OFF
              </span>
            </div>

            <div className="text-3xl font-black text-slate-900">
              S/. {prod.precio.toFixed(2)}
            </div>

            <p className="text-xs text-gray-500 font-medium">
              Presentación: {prod.presentacion}
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Stock: {prod.disponibilidad}
            </div>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center border border-gray-200 bg-white rounded-xl">
                <button
                  onClick={() => setCantidad((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-gray-500 font-bold hover:bg-gray-100 rounded-l-xl transition"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-bold text-gray-800 min-w-[28px] text-center">
                  {cantidad}
                </span>
                <button
                  onClick={() => setCantidad((q) => q + 1)}
                  className="px-3 py-1.5 text-gray-500 font-bold hover:bg-gray-100 rounded-r-xl transition"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(prod, cantidad)}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 text-xs shadow-md shadow-orange-100"
              >
                <ShoppingCart size={16} />
                Agregar al carrito
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-3 text-xs text-gray-600">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-700">
                <Truck size={18} />
              </div>
              <div>
                <p className="font-bold text-slate-800">Entrega rápida</p>
                <p className="text-[11px] text-gray-400">
                  Disponible según cobertura
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-700">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="font-bold text-slate-800">Producto Fresco</p>
                <p className="text-[11px] text-gray-400">
                  Mantener refrigerado de 2°C a 4°C
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DESCRIPCIÓN Y ESPECIFICACIONES TÉCNICAS */}
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
              <span className="text-gray-500 font-medium">Presentación:</span>
              <span className="font-semibold text-slate-800">
                {prod.presentacion}
              </span>
            </div>
            <div className="flex justify-between py-2.5 px-3">
              <span className="text-gray-500 font-medium">Conservación:</span>
              <span className="font-semibold text-slate-800">
                {prod.conservacion}
              </span>
            </div>
            <div className="flex justify-between py-2.5 px-3 bg-gray-50 rounded-lg">
              <span className="text-gray-500 font-medium">Categoría:</span>
              <span className="font-semibold text-slate-800">
                {prod.categoria}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. PRODUCTOS RELACIONADOS (SOLO EXISTENTES) */}
      {productosRelacionados.length > 0 && (
        <div className="border-t border-gray-100 pt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black italic tracking-wider uppercase text-slate-900">
              PRODUCTOS <span className="text-purple-700">RELACIONADOS</span>
            </h2>
            <Link
              to="/OurStore"
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
              const relCategory =
                rel.category_name || rel.category?.name || rel.category || 'GENERAL';

              return (
                <div
                  key={relId}
                  className="bg-white rounded-2xl border border-gray-100 p-3 flex flex-col justify-between hover:shadow-md transition"
                >
                  <div>
                    {/* Clic en la imagen lleva a su vista de detalle */}
                    <Link to={`/producto/${relId}`}>
                      <div className="bg-[#FAF9F5] rounded-xl h-36 flex items-center justify-center p-2 mb-3 cursor-pointer">
                        <img
                          src={relImage}
                          alt={rel.name || rel.nombre}
                          className="max-h-28 object-contain hover:scale-105 transition-transform"
                        />
                      </div>
                    </Link>

                    <span className="text-[10px] text-purple-700 font-bold uppercase">
                      {relCategory}
                    </span>

                    {/* Clic en el nombre lleva a su vista de detalle */}
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