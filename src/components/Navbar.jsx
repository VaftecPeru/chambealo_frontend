import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  Trash2, 
  X, 
  Menu, 
  ChevronDown, 
  PhoneCall, 
  Zap 
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { totalProductsRaw } from './products';

const Navbar = () => {
  const {
    cartItems,
    getCartItemsCount,
    getCartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const cartRef = useRef(null);
  const searchRef = useRef(null);
  const categoriesRef = useRef(null);
  const navigate = useNavigate();

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setIsCategoriesOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Búsqueda en vivo de productos
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const filtered = totalProductsRaw
        .filter(
          (product) =>
            product.name?.toLowerCase().includes(query) ||
            product.category?.toLowerCase().includes(query) ||
            product.brand?.toLowerCase().includes(query)
        )
        .slice(0, 8);

      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const handleProductClick = (productId) => {
    navigate(`/producto/${productId}`);
    setSearchQuery('');
    setShowResults(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowResults(false);
      navigate(`/OurStore?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="w-full select-none">
      {/* 1. CABECERA AMARILLA */}
      <div className="bg-[#ffda00] py-3.5 px-4 sm:px-6 lg:px-8 border-b border-yellow-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center">
            <img
              src="/img/logo_chambealo1.png"
              alt="Logo Chambealo"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Buscador Unificado con Botón Naranja */}
          <div className="hidden md:flex flex-1 max-w-2xl relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="w-full flex items-center">
              <div className="relative w-full flex items-center bg-white rounded-full pl-4 pr-1 py-1 shadow-sm border border-gray-200">
                <Search className="h-5 w-5 text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery && setShowResults(true)}
                  className="w-full bg-transparent text-gray-800 placeholder-gray-400 text-sm focus:outline-none"
                  placeholder="Buscar productos, marcas, categorías..."
                />
                <button
                  type="submit"
                  className="bg-[#ff4e00] hover:bg-[#e04500] text-white font-bold px-6 py-2 rounded-full flex items-center gap-1.5 transition-colors text-sm shrink-0"
                >
                  <Search size={16} />
                  <span>Buscar</span>
                </button>
              </div>
            </form>

            {/* Resultados flotantes de búsqueda */}
            {showResults && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <button
                      type="button"
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="flex items-center gap-3 w-full p-3 text-left hover:bg-purple-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <img
                        src={product.img1}
                        alt={product.name}
                        className="w-12 h-12 object-contain rounded-lg border border-gray-200 bg-white"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 text-sm truncate">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-500">{product.category}</span>
                          <span className="text-xs font-bold text-red-600">
                            S/ {Number(product.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-gray-500">
                    No se encontraron productos coincidentes.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bloque Soporte y Carrito */}
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* Soporte */}
            <div className="hidden lg:flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-700 shadow-sm">
                <PhoneCall size={18} />
              </div>
              <div className="leading-tight">
                <span className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                  Soporte
                </span>
                <span className="block text-sm font-extrabold text-black">
                  (01) 456-7890
                </span>
              </div>
            </div>

            {/* Carrito apuntando a /cart */}
            <div
              className="relative"
              ref={cartRef}
              onMouseEnter={() => setIsCartOpen(true)}
              onMouseLeave={() => setIsCartOpen(false)}
            >
              <Link 
                to="/cart" 
                onClick={() => setIsCartOpen(false)}
                className="flex items-center gap-3 group"
              >
                <div className="relative w-11 h-11 rounded-full bg-white flex items-center justify-center text-gray-800 shadow-sm group-hover:scale-105 transition-transform">
                  <ShoppingCart size={22} />
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[11px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#ffda00]">
                    {getCartItemsCount()}
                  </span>
                </div>
                <div className="hidden sm:block leading-tight">
                  <span className="block text-xs text-gray-700 font-medium">Carrito</span>
                  <span className="block text-sm font-bold text-black">
                    S/ {Number(getCartTotal()).toFixed(2)}
                  </span>
                </div>
              </Link>

              {/* Mini Carrito Flotante */}
              {isCartOpen && (
                <div className="absolute right-0 top-full pt-2 w-80 sm:w-96 z-50">
                  <div className="bg-white border border-gray-100 rounded-3xl shadow-2xl p-5 text-gray-800">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                      <h3 className="font-bold text-base text-[#3a085c]">
                        Mi Carrito ({getCartItemsCount()})
                      </h3>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="max-h-72 overflow-y-auto space-y-4 pr-1">
                      {cartItems.length === 0 ? (
                        <p className="text-center text-gray-400 py-6 text-sm">
                          Tu carrito está vacío
                        </p>
                      ) : (
                        cartItems.map((item) => (
                          <div key={item.id} className="flex gap-3 items-center">
                            <img
                              src={item.image || item.img1}
                              alt={item.name}
                              className="w-14 h-14 object-contain rounded-xl border border-gray-100 p-1"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-gray-800 truncate">
                                {item.name}
                              </p>
                              <p className="text-xs font-bold text-[#670cb7] mt-0.5">
                                S/ {Number(item.price).toFixed(2)}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <button
                                  onClick={() => decreaseQuantity(item.id)}
                                  className="w-5 h-5 rounded bg-gray-100 text-gray-600 font-bold text-xs"
                                >
                                  -
                                </button>
                                <span className="text-xs font-medium">{item.quantity}</span>
                                <button
                                  onClick={() => increaseQuantity(item.id)}
                                  className="w-5 h-5 rounded bg-gray-100 text-gray-600 font-bold text-xs"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-300 hover:text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="border-t border-gray-100 mt-4 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs text-gray-500 font-medium">Total:</span>
                        <span className="text-lg font-black text-[#670cb7]">
                          S/ {Number(getCartTotal()).toFixed(2)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          to="/cart"
                          onClick={() => setIsCartOpen(false)}
                          className="text-center py-2.5 text-xs font-bold text-[#670cb7] border border-[#670cb7] rounded-full hover:bg-purple-50"
                        >
                          Ver Carrito
                        </Link>
                        <Link
                          to="/checkout"
                          onClick={() => setIsCartOpen(false)}
                          className="text-center py-2.5 text-xs font-bold text-white bg-[#ff4e00] rounded-full hover:bg-[#e04500]"
                        >
                          Pagar Ahora
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* 2. BARRA INFERIOR BLANCA CON CATEGORÍAS FIGMA */}
      <nav className="bg-white border-b border-gray-200 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            <div className="flex items-center gap-8">
              {/* Botón Morado Categorías */}
              <div className="relative" ref={categoriesRef}>
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="bg-[#670cb7] hover:bg-[#530a96] text-white px-5 py-2 rounded-xl flex items-center gap-2.5 font-bold text-sm transition-colors shadow-sm"
                >
                  <Menu size={18} />
                  <span>Categorías</span>
                  <ChevronDown size={16} />
                </button>

                {isCategoriesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                    <Link
                      to="/OurStore?category=Herramientas"
                      onClick={() => setIsCategoriesOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 font-medium"
                    >
                      Herramientas
                    </Link>
                    <Link
                      to="/OurStore?category=Construccion"
                      onClick={() => setIsCategoriesOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 font-medium"
                    >
                      Construcción
                    </Link>
                    <Link
                      to="/OurStore?category=Pinturas"
                      onClick={() => setIsCategoriesOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 font-medium"
                    >
                      Pinturas
                    </Link>
                  </div>
                )}
              </div>

              {/* Links Principales */}
              <div className="flex items-center gap-6">
                <Link
                  to="/"
                  className="text-sm font-bold text-gray-800 hover:text-[#670cb7] transition-colors"
                >
                  Inicio
                </Link>
                <Link
                  to="/OurStore"
                  className="text-sm font-bold text-gray-800 hover:text-[#670cb7] transition-colors"
                >
                  Tienda
                </Link>
                <Link
                  to="/OurStore?filter=ofertas"
                  className="text-sm font-bold text-gray-800 hover:text-[#670cb7] transition-colors flex items-center gap-1.5"
                >
                  <span>Mejores ofertas</span>
                  <span className="bg-[#10b981] text-white text-[10px] font-black px-1.5 py-0.5 rounded-md uppercase">
                    OFERTA
                  </span>
                </Link>
                <div className="flex items-center gap-1 text-sm font-bold text-gray-800 hover:text-[#670cb7] cursor-pointer">
                  <span>Novedades</span>
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>

            {/* Link Destacado */}
            <Link
              to="/OurStore?filter=destacado"
              className="flex items-center gap-1.5 text-sm font-bold text-gray-800 hover:text-[#ff4e00] transition-colors"
            >
              <Zap size={16} className="text-[#ff4e00] fill-current" />
              <span>Lo Último</span>
              <span className="bg-[#ff4e00] text-white text-[10px] font-black px-1.5 py-0.5 rounded-md uppercase">
                DESTACADO
              </span>
            </Link>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;