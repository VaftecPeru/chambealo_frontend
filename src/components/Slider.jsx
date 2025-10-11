import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/img/banner_chambealo.jpg",
  "/img/banner2.png",
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // ✅ Auto-slide cada 5s
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-8xl mx-auto overflow-hidden rounded-2xl shadow-lg">
      {/* Imágenes */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            className="w-full flex-shrink-0 object-cover h-[550px]"
          />
        ))}
      </div>

      {/* Botón Izquierda */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Botón Derecha */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
}
