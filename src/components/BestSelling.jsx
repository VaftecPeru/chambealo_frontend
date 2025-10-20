import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react"; 
import '../styles/ShopByDepartments.css'

// Todos los productos en un solo arreglo
const products = [
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
    id: 6,
    name: "Croissant Pack (6 pcs)",
    price: 12.0,
    img1: "/img/bakery2-front.png",
    img2: "/img/bakery2-back.png",
    rating: 4,
    details: "6 pcs",
    status: "",
  },
];

// Función para obtener o crear endTime persistente en localStorage
const getProductEndTime = (productId) => {
  const key = `productEndTime_${productId}`;
  const stored = localStorage.getItem(key);
  if (stored) return parseInt(stored, 10);
  const endTime = Date.now() + 48 * 60 * 60 * 1000; // 48 horas
  localStorage.setItem(key, endTime);
  return endTime;
};

function CountdownTimer({ productId }) {
  const [timeLeft, setTimeLeft] = useState(getProductEndTime(productId) - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getProductEndTime(productId) - Date.now();
      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [productId]);

  const formatTime = ms => {
    if (ms <= 0) return "00h:00m:00s";
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2,"0")}h:${minutes.toString().padStart(2,"0")}m:${seconds.toString().padStart(2,"0")}s`;
  };

  return (
    <span className="absolute top-3 right-3 bg-yellow-400 text-black text-xs px-2 py-1 rounded z-20 font-semibold">
      {formatTime(timeLeft)}
    </span>
  );
}

export default function ProductCarousel() {
  const scrollRef = useRef(null);

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Título */}
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
        Productos más Vendidos
      </h2>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 z-10 hidden sm:flex"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-2 sm:px-8"
          style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
        >
          {products.map((product) => (
            <article
              key={product.id}
              className="min-w-[70%] sm:min-w-[250px] sm:max-w-[250px] rounded-2xl overflow-hidden shadow-sm group p-4 bg-white relative flex-shrink-0"
            >
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

                <CountdownTimer productId={product.id} />

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

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {product.name}
                </h3>

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

                {product.details && (
                  <p className="text-gray-500 text-sm mt-1">{product.details}</p>
                )}

                <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600">
                  Agregar Compra
                </button>
              </div>
            </article>
          ))}
        </div>

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
