import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { baseProducts } from "./products"; //Importamos los productos reales
import { useCart } from "../contexts/CartContext";

import '../styles/ShopByDepartments.css';

// Categorías mapeadas a los productos reales
const getProductsByCategory = (categoryKey) => {
  const categoryMap = {
    milk: ["Lácteos", "Snacks", "Postres"],
    vegetables: ["Vegetales", "Frutas"], 
    bakery: ["Panadería", "Galletas", "Pasteles"]
  };

  return baseProducts.filter(product => 
    categoryMap[categoryKey]?.includes(product.category) || 
    categoryMap[categoryKey]?.includes(product.type)
  );
};

export default function ProductCarousel() {
  const [activeCategory, setActiveCategory] = useState("milk");
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ✅ Hook del carrito

  const categories = [
    { key: "milk", label: "Lácteos" },
    { key: "vegetables", label: "Vegetales" },
    { key: "bakery", label: "Panadería" },
  ];

  // Obtener productos filtrados por categoría
  const filteredProducts = getProductsByCategory(activeCategory);

  // Función para redirigir al detalle del producto
  const handleProductClick = (productId) => {
    navigate(`/producto/${productId}`); // ✅ CORREGIDO: usa "/producto/" no "/product/"
  };

  // ✅ Función para agregar al carrito
  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1); // ✅ Agrega 1 unidad al carrito
    alert(`"${product.name}" agregado al carrito! 🛒`);
  };

  // Scroll que centra cada card por click
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cards = Array.from(container.children);
    if (!cards.length) return;

    const gap = 24;
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

  const handleCategory = (key) => {
    setActiveCategory(key);
    if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Título */}
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
        Comprar por Categorías
      </h2>

      {/* Botones de categoría */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleCategory(key)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              activeCategory === key
                ? "bg-purple-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Carrusel con flechas */}
      <div className="relative">
        {/* Flecha izquierda */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 z-10 hidden sm:flex"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        {/* Contenedor scrollable */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-2 sm:px-8"
          style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
        >
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="min-w-[70%] sm:min-w-[250px] sm:max-w-[250px] rounded-2xl overflow-hidden shadow-sm group p-4 bg-white relative flex-shrink-0 cursor-pointer transition-transform hover:scale-105 hover:shadow-md"
            >
              {/* Contenido clickeable para ir al detalle */}
              <div 
                onClick={() => handleProductClick(product.id)}
                className="cursor-pointer"
              >
                {/* Imagen + Badge */}
                <div className="relative w-full h-44 flex justify-center items-center overflow-hidden rounded-lg">
                  {product.status && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-20">
                      {product.status === "sale"
                        ? "Sale"
                        : product.status === "sold out"
                        ? "Sold out"
                        : product.status}
                    </span>
                  )}
                  <img
                    src={product.img1}
                    alt={product.name}
                    className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <img
                    src={product.img2}
                    alt={product.name + " alt"}
                    className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  />
                </div>

                {/* Contenido inferior */}
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Estrellas */}
                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < (product.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-2">({product.rating || 0})</span>
                  </div>

                  {/* Precio y descuento */}
                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    {product.oldPrice && (
                      <span className="line-through text-gray-400 text-sm">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-lg font-bold text-red-600">${product.price.toFixed(2)}</span>
                    {product.discount && (
                      <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
                        {product.discount}
                      </span>
                    )}
                  </div>

                  {/* Detalles */}
                  {product.details && (
                    <p className="text-gray-500 text-sm mt-1">{product.details}</p>
                  )}
                </div>
              </div>

              {/* Botón Agregar Compra - SEPARADO */}
              <button 
                className="mt-4 w-full bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition-colors"
                onClick={(e) => handleAddToCart(e, product)}
              >
                Agregar compra
              </button>
            </article>
          ))}
        </div>

        {/* Flecha derecha */}
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 z-10 hidden sm:flex"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
}