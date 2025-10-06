import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react"; // flechas y estrella

import '../styles/ShopByDepartments.css'

const productsData = {
  milk: [
    {
      id: 1,
      name: "Vplab Protein Cookies Choco Chips (Pack of 6)",
      price: 15.0,
      oldPrice: 20.0,
      discount: "25%",
      img1: "/img/Protein_Cookie_2.png",
      img2: "/img/Protein_Cookie_1.png",
      rating: 4,
      details: "150 g",
      status: "sale",
    },
    {
      id: 2,
      name: "Vanilla Cleansing Cheese Cake Bomb Cosmetics",
      price: 17.0,
      oldPrice: 20.0,
      discount: "15%",
      img1: "/img/Betty_Cake1.png",
      img2: "/img/Betty_Cake2.png",
      rating: 5,
      details: "20 g",
      status: "sale",
    },
    {
      id: 3,
      name: "Multi Millet Strawberry Pancake Back & Go",
      price: 50.0,
      img1: "/img/Bake_Go1.png",
      img2: "/img/Bake_Go2.png",
      rating: 4,
      details: "2 kg",
      status: "",
    },
    {
      id: 4,
      name: "Monterra Jumbo California Walnuts in Shell 1 kg",
      price: 10.0,
      img1: "/img/Monterra1.png",
      img2: "/img/Monterra2.png",
      rating: 3,
      details: "45 g",
      status: "sold out",
    },
    {
      id: 5,
      name: "Corny Muesly Bar Chocolate",
      price: 10.0,
      img1: "/img/milk4-front.png",
      img2: "/img/milk4-back.png",
      rating: 3,
      details: "45 g",
      status: "sold out",
    },
    {
      id: 6,
      name: "Corny Muesly Bar Chocolate",
      price: 10.0,
      img1: "/img/milk4-front.png",
      img2: "/img/milk4-back.png",
      rating: 3,
      details: "45 g",
      status: "sold out",
    },
  ],
  vegetables: [
    {
      id: 7,
      name: "Fresh Tomato Pack",
      price: 10.0,
      img1: "/img/veg1-front.png",
      img2: "/img/veg1-back.png",
      rating: 4,
      details: "1 kg",
      status: "sale",
    },
    {
      id: 8,
      name: "Green Lettuce Bunch",
      price: 7.5,
      img1: "/img/veg2-front.png",
      img2: "/img/veg2-back.png",
      rating: 5,
      details: "1 bunch",
      status: "",
    },
    {
      id: 9,
      name: "Fresh Tomato Pack",
      price: 10.0,
      img1: "/img/veg1-front.png",
      img2: "/img/veg1-back.png",
      rating: 4,
      details: "1 kg",
      status: "sale",
    },    
    {
      id: 10,
      name: "Fresh Tomato Pack",
      price: 10.0,
      img1: "/img/veg1-front.png",
      img2: "/img/veg1-back.png",
      rating: 4,
      details: "1 kg",
      status: "sale",
    },
    {
      id: 11,
      name: "Fresh Tomato Pack",
      price: 10.0,
      img1: "/img/veg1-front.png",
      img2: "/img/veg1-back.png",
      rating: 4,
      details: "1 kg",
      status: "sale",
    },
    {
      id: 12,
      name: "Fresh Tomato Pack",
      price: 10.0,
      img1: "/img/veg1-front.png",
      img2: "/img/veg1-back.png",
      rating: 4,
      details: "1 kg",
      status: "sale",
    },
  ],
  bakery: [
    {
      id: 13,
      name: "Cake World Chocolate Toast",
      price: 32.0,
      oldPrice: 45.0,
      discount: "29%",
      img1: "/img/bakery1-front.png",
      img2: "/img/bakery1-back.png",
      rating: 5,
      details: "Slice",
      status: "sale",
    },
    {
      id: 14,
      name: "Croissant Pack (6 pcs)",
      price: 12.0,
      img1: "/img/bakery2-front.png",
      img2: "/img/bakery2-back.png",
      rating: 4,
      details: "6 pcs",
      status: "",
    },
    {
      id: 15,
      name: "Croissant Pack (6 pcs)",
      price: 12.0,
      img1: "/img/bakery2-front.png",
      img2: "/img/bakery2-back.png",
      rating: 4,
      details: "6 pcs",
      status: "",
    },
    {
      id: 16,
      name: "Croissant Pack (6 pcs)",
      price: 12.0,
      img1: "/img/bakery2-front.png",
      img2: "/img/bakery2-back.png",
      rating: 4,
      details: "6 pcs",
      status: "",
    },
    {
      id: 17,
      name: "Croissant Pack (6 pcs)",
      price: 12.0,
      img1: "/img/bakery2-front.png",
      img2: "/img/bakery2-back.png",
      rating: 4,
      details: "6 pcs",
      status: "",
    },
    {
      id: 18,
      name: "Croissant Pack (6 pcs)",
      price: 12.0,
      img1: "/img/bakery2-front.png",
      img2: "/img/bakery2-back.png",
      rating: 4,
      details: "6 pcs",
      status: "",
    },   
  ],
};

export default function ProductCarousel() {
  const [activeCategory, setActiveCategory] = useState("milk");
  const scrollRef = useRef(null);

  const categories = [
    { key: "milk", label: "Milk Items" },
    { key: "vegetables", label: "Vegetables" },
    { key: "bakery", label: "Bakery" },
  ];

  // Scroll que centra cada card por click
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cards = Array.from(container.children);
    if (!cards.length) return;

    const gap = 24; // coincide con "gap-6" en Tailwind (6*4px)
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
        Shop by Departments
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
          {productsData[activeCategory].map((product) => (
            <article
              key={product.id}
              className="min-w-[70%] sm:min-w-[250px] sm:max-w-[250px] rounded-2xl overflow-hidden shadow-sm group p-4 bg-white relative flex-shrink-0"
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
                      className={i < (product.rating || 0) ? "text-yellow-400" : "text-gray-300"}
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

                {/* Botón Add to Cart */}
                <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600">
                  Add to Cart
                </button>
              </div>
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
