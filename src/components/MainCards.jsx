import { useNavigate } from "react-router-dom";
import ropaPerroImg from "../assets/ropa_perro.png";
import limpiezaHigieneImg from "../assets/limpieza_higiene.png";
import articulosHogarImg from "../assets/articulos_hogar.png";

export default function PromoCards() {
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      alt: "Ropa para perros",
      image: ropaPerroImg,
      link: "/OurStore",
    },
    {
      id: 2,
      alt: "Limpieza e Higiene",
      image: limpiezaHigieneImg,
      link: "/OurStore",
    },
    {
      id: 3,
      alt: "Artículos del Hogar",
      image: articulosHogarImg,
      link: "/OurStore",
    },
  ];

  const handleCardClick = (link) => {
    navigate(link || "/OurStore");
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 overflow-x-hidden">
      {/* Scroll horizontal optimizado en Mobile/Tablet para evitar desbordes */}
      <div className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:hidden pb-4 px-1">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.link)}
            className="flex-none w-[280px] sm:w-80 md:w-96 rounded-2xl overflow-hidden group snap-start cursor-pointer transition-transform duration-300 hover:scale-[1.02] bg-white shadow-sm border border-gray-100 flex-shrink-0"
          >
            <img
              src={card.image}
              alt={card.alt}
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
        ))}
      </div>

      {/* Grid en Desktop */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.link)}
            className="w-full rounded-2xl overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-[1.02] shadow-sm border border-gray-100"
          >
            <img
              src={card.image}
              alt={card.alt}
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}