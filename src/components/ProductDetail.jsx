import { useState, useEffect } from 'react';
import { Star, Heart, Share2, ChevronDown, ShoppingCart } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'; // ✅ Importar useCart

const ProductDetail = ({ allProducts }) => {
  const { id } = useParams();
  const [imagenActiva, setImagenActiva] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [acordeonAbierto, setAcordeonAbierto] = useState(null);
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useCart(); // ✅ Obtener addToCart del context

  useEffect(() => {
    if (allProducts && id) {
      const productId = parseInt(id);
      const foundProduct = allProducts.find(p => p.id === productId);
      
      if (foundProduct) {
        const transformedProduct = {
          id: foundProduct.id,
          nombre: foundProduct.name,
          precio: foundProduct.price,
          precioAnterior: foundProduct.oldPrice || foundProduct.price * 1.2,
          rating: foundProduct.rating,
          reviews: Math.floor(Math.random() * 100) + 1,
          sku: `SKU${foundProduct.id.toString().padStart(3, '0')}`,
          tipo: foundProduct.type,
          tags: foundProduct.tags || [],
          colecciones: [foundProduct.category, foundProduct.type, ...(foundProduct.tags || [])],
          disponibilidad: foundProduct.inStock ? "In Stock" : "Out of Stock",
          imagenes: [
            foundProduct.img1, 
            foundProduct.img2, 
            foundProduct.img1,
            foundProduct.img2
          ]
        };
        setProducto(transformedProduct);
      }
      setLoading(false);
    }
  }, [allProducts, id]);

  // ✅ Función para agregar al carrito
  const handleAddToCart = () => {
    if (producto) {
      addToCart(producto, cantidad);
      alert(`${cantidad} ${producto.nombre} agregado(s) al carrito! 🛒`);
    }
  };

  const toggleAcordeon = (index) => {
    setAcordeonAbierto(acordeonAbierto === index ? null : index);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}
      />
    ));
  };

  // Mostrar loading mientras se busca el producto
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-white">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Cargando producto...</div>
        </div>
      </div>
    );
  }

  // Si no se encuentra el producto, usar datos por defecto
  if (!producto) {
    const productoDefault = {
      id: 1,
      nombre: "Producto no encontrado",
      precio: 0.00,
      precioAnterior: 0.00,
      rating: 0,
      reviews: 0,
      sku: "SKU000",
      tipo: "No disponible",
      tags: ["No disponible"],
      colecciones: ["No disponible"],
      disponibilidad: "Out of Stock",
      imagenes: [
        "/img/placeholder.jpg",
        "/img/placeholder.jpg", 
        "/img/placeholder.jpg",
        "/img/placeholder.jpg"
      ]
    };
    
    const prod = productoDefault;

    return (
      <div className="max-w-7xl mx-auto p-6 bg-white">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12">
          <div>
            <div className="border border-gray-300 bg-white p-4 rounded mb-4">
              <div className="flex items-center justify-center" style={{minHeight: '450px'}}>
                <img
                  src={prod.imagenes[imagenActiva]}
                  alt={prod.nombre}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {prod.imagenes.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setImagenActiva(idx)}
                  className={`border rounded cursor-pointer transition ${
                    imagenActiva === idx ? 'border-gray-400' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="p-2 bg-white">
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-20 object-contain" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-blue-900 leading-tight">
              {prod.nombre}
            </h1>
            
            <div className="text-red-600 mb-4">⚠️ Producto no encontrado</div>

            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">{renderStars(prod.rating)}</div>
              <span className="text-sm text-gray-600">({prod.reviews})</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si SÍ se encontró el producto
  const prod = producto;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-12">
        <div>
          <div className="border border-gray-300 bg-white p-4 rounded mb-4">
            <div className="flex items-center justify-center" style={{minHeight: '450px'}}>
              <img
                src={prod.imagenes[imagenActiva]}
                alt={prod.nombre}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {prod.imagenes.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setImagenActiva(idx)}
                className={`border rounded cursor-pointer transition ${
                  imagenActiva === idx ? 'border-gray-400' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="p-2">
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-20 object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-blue-900 leading-tight">
            {prod.nombre}
          </h1>
          
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">{renderStars(prod.rating)}</div>
            <span className="text-sm text-gray-600">({prod.reviews})</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-400 line-through text-base">
              ${prod.precioAnterior.toFixed(2)}
            </span>
            <span className="text-2xl font-bold text-gray-900">
              ${prod.precio.toFixed(2)}
            </span>
            <span className="bg-blue-700 text-white px-2 py-0.5 text-xs font-semibold uppercase rounded">
              SALE
            </span>
            <span className="bg-purple-700 text-white px-2 py-0.5 text-xs font-semibold uppercase rounded">
              NEW
            </span>
          </div>

          <p className="text-sm text-gray-600">
            <a href="#" className="text-blue-600 underline hover:no-underline">Shipping</a> calculated at checkout.
          </p>

          <div className="border-t border-gray-200 pt-4"></div>

          <div className="space-y-2.5">
            <div className="flex text-sm">
              <span className="font-medium text-gray-700 min-w-[100px]">Type:</span>
              <span className="text-gray-600">{prod.tipo}</span>
            </div>

            <div className="flex text-sm">
              <span className="font-medium text-gray-700 min-w-[100px]">SKU:</span>
              <span className="text-gray-600">{prod.sku}</span>
            </div>

            <div className="flex text-sm">
              <span className="font-medium text-gray-700 min-w-[100px]">Tags:</span>
              <span className="text-gray-600">{prod.tags.join(', ')}</span>
            </div>

            <div className="flex text-sm">
              <span className="font-medium text-gray-700 min-w-[100px]">Collections:</span>
              <span className="text-gray-600 text-xs leading-relaxed">
                {prod.colecciones.join(', ')}
              </span>
            </div>

            <div className="flex text-sm">
              <span className="font-medium text-gray-700 min-w-[100px]">Availability:</span>
              <span className="text-green-700 font-medium">{prod.disponibilidad}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4"></div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="inline-flex border border-gray-300 rounded overflow-hidden">
              <input
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center py-2 px-3 outline-none text-sm"
                min="1"
              />
              <div className="flex flex-col border-l border-gray-300">
                <button
                  onClick={() => setCantidad(cantidad + 1)}
                  className="px-2 py-0.5 hover:bg-gray-100 border-b border-gray-300 text-xs"
                >
                  ▲
                </button>
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  className="px-2 py-0.5 hover:bg-gray-100 text-xs"
                >
                  ▼
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            {/* ✅ BOTÓN ACTUALIZADO para usar el carrito */}
            <button 
              onClick={handleAddToCart}
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 px-6 rounded text-sm flex items-center gap-2"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
            <button className="bg-purple-700 hover:bg-purple-800 text-white font-medium py-2.5 px-6 rounded text-sm">
              Buy it now
            </button>
          </div>

          <div className="flex items-center gap-6 pt-1">
            <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
              <Heart size={16} className="text-gray-600" />
              <span>Add to wishlist</span>
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
              <span>Add to compare</span>
            </button>
          </div>

          <div className="pt-2 space-y-0">
            <div className="border-t border-gray-200">
              <button
                onClick={() => toggleAcordeon(0)}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Shipping & Returns</span>
                </div>
                <ChevronDown 
                  size={20} 
                  className={`text-gray-600 transition-transform ${acordeonAbierto === 0 ? 'rotate-180' : ''}`} 
                />
              </button>
              {acordeonAbierto === 0 && (
                <div className="pb-4 text-sm text-gray-600">
                  Shipping information goes here
                </div>
              )}
            </div>

            <div className="border-t border-gray-200">
              <button
                onClick={() => toggleAcordeon(1)}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Care Instructions</span>
                </div>
                <ChevronDown 
                  size={20} 
                  className={`text-gray-600 transition-transform ${acordeonAbierto === 1 ? 'rotate-180' : ''}`} 
                />
              </button>
              {acordeonAbierto === 1 && (
                <div className="pb-4 text-sm text-gray-600">
                  Care instructions go here
                </div>
              )}
            </div>

            <div className="border-t border-gray-200">
              <button
                onClick={() => toggleAcordeon(2)}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Collapsible row</span>
                </div>
                <ChevronDown 
                  size={20} 
                  className={`text-gray-600 transition-transform ${acordeonAbierto === 2 ? 'rotate-180' : ''}`} 
                />
              </button>
              {acordeonAbierto === 2 && (
                <div className="pb-4 text-sm text-gray-600">
                  Additional content goes here
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
              <Share2 size={16} className="text-gray-600" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;