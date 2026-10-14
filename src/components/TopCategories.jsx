import { useNavigate } from 'react-router-dom';
import '../styles/TopCategories.css';

const categories = [
  { name: "Lácteos", image: "/img/Protein_Cookie_2.png" },
  { name: "Vegetales", image: "/img/Monterra1.png" },
  { name: "Panadería", image: "/img/CakeWorld.png" },
  { name: "Frutos Secos", image: "/img/Monterra1.png" },
  { name: "Galletas", image: "/img/Protein_Cookie_2.png" },
];

export default function TopCategories() {
  const navigate = useNavigate();

  return (
    <section className="top-categories-section w-full overflow-x-hidden px-4 sm:px-6">
      <div className="top-categories-header flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold">Categorías Principales</h2>
        <button 
          onClick={() => navigate('/OurStore')}
          className="top-categories-link text-xs sm:text-sm font-semibold"
        >
          Ver todas
        </button>
      </div>

      {/* Grid adaptable con scroll horizontal fluido en 360px para evitar que se salgan */}
      <div className="top-categories-grid flex gap-3 overflow-x-auto sm:grid sm:grid-cols-5 pb-2 no-scrollbar w-full">
        {categories.map(({ name, image }) => (
          <div
            key={name}
            onClick={() => navigate(`/OurStore?category=${encodeURIComponent(name)}`)}
            className="top-category-card shrink-0 w-28 sm:w-auto text-center cursor-pointer"
          >
            <div className="category-icon-wrapper flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
              <img 
                src={image} 
                alt={name}
                className="category-icon w-12 h-12 object-contain" 
              />
            </div>
            <span className="category-name block text-xs font-medium text-gray-700 mt-2">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}