import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function SaleCarousel({ products = [] }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cards = Array.from(container.children);
    if (!cards.length) return;

    const gap = 24; // coincide con gap-6 (6*4px)
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

    container.scrollTo({ left: targetIndex * cardWidth, behavior: "smooth" });
  };

  return (
    <div>
      {/* Flecha izquierda */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 z-10 hidden sm:flex"
        aria-label="scroll left"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>

      {/* Contenedor scrollable */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-2 sm:px-8"
        style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
      >
        {products.map((p) => (
          <article
            key={p.id}
            className="min-w-[70%] sm:min-w-[250px] sm:max-w-[250px] rounded-2xl overflow-hidden shadow-sm group p-4 bg-violet-50 relative flex-shrink-0"
          >
            {/* Imagen + Badge */}
            <div className="relative w-full h-44 flex justify-center items-center overflow-hidden rounded-lg">
              {p.status && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-20">
                  {p.status === "sale" ? "Sale" : p.status === "sold out" ? "Sold out" : p.status}
                </span>
              )}
              <img
                src={p.img1}
                alt={p.name}
                className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
              />
              <img
                src={p.img2}
                alt={p.name + " alt"}
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
            </div>

            {/* Contenido inferior */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{p.name}</h3>

              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < (p.rating || 0) ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-2">({p.rating || 0})</span>
              </div>

              <div className="mt-3 flex items-center gap-2 flex-wrap">
                {p.oldPrice && (
                  <span className="line-through text-gray-400 text-sm">
                    ${p.oldPrice?.toFixed(2)}
                  </span>
                )}
                <span className="text-lg font-bold text-red-600">${p.price.toFixed(2)}</span>
                {p.discount && (
                  <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
                    {p.discount}
                  </span>
                )}
              </div>

              {/* Botón Agregar al carrito */}
              <button
                onClick={() => {
                  /* aquí llama a tu función de añadir al carrito, por ejemplo: addToCart(p) */
                  console.log("Agregar al carrito:", p.id);
                }}
                className="mt-4 w-full bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition"
                aria-label={`Agregar ${p.name} al carrito`}
              >
                Agregar al carrito
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Flecha derecha */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 z-10 hidden sm:flex"
        aria-label="scroll right"
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  );
}
