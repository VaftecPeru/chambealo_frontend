import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    desktop: "/img/banner_chambealo.jpg",
    mobile: "/img/banner_chambealo.jpg"
  },
  {
    desktop: "/img/banner2.png", 
    mobile: "/img/banner2.png"
  },
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
      {/* Contenedor de imágenes - se adapta automáticamente */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <picture>
              <source media="(min-width: 768px)" srcSet={image.desktop} />
              <source media="(max-width: 767px)" srcSet={image.mobile} />
              <img
                src={image.desktop}
                alt={`Slide ${index}`}
                className="w-full h-auto object-contain"
              />
            </picture>
          </div>
        ))}
      </div>

      {/* Botón Izquierda */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 md:p-3 rounded-full hover:bg-black/70 transition z-10"
        aria-label="Imagen anterior"
      >
        <ChevronLeft size={20} className="md:w-7 md:h-7" />
      </button>

      {/* Botón Derecha */}
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 md:p-3 rounded-full hover:bg-black/70 transition z-10"
        aria-label="Siguiente imagen"
      >
        <ChevronRight size={20} className="md:w-7 md:h-7" />
      </button>

      {/* Indicadores de posición */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              index === current ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}