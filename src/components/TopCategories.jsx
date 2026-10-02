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
    <section className="top-categories-section">
      <div className="top-categories-header">
        <h2>Categorías Principales</h2>
        <button 
          onClick={() => navigate('/OurStore')}
          className="top-categories-link"
        >
          Ver todas
        </button>
      </div>

      <div className="top-categories-grid">
        {categories.map(({ name, image }) => (
          <div
            key={name}
            onClick={() => navigate(`/OurStore?category=${encodeURIComponent(name)}`)}
            className="top-category-card"
          >
            <div className="category-icon-wrapper">
              <img 
                src={image} 
                alt={name}
                className="category-icon" 
              />
            </div>
            <span className="category-name">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}