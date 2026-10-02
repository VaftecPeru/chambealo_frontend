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
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Scroll horizontal en Mobile */}
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:hidden pb-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.link)}
            className="flex-none w-80 sm:w-96 rounded-2xl overflow-hidden group snap-start cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
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
            className="w-full rounded-2xl overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
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
