import '../styles/TopCategories.css'; 

const categories = [
  { name: "Vegetales", image: "/img/VegetalesIcon.png" },
  { name: "Frutas", image: "/img/FrutasIcon.png" },
  { name: "Carne", image: "/img/CarneIcon.png" },
  { name: "Lácteos", image: "/img/LacteosIcon.png" },
  { name: "Bebidas", image: "/img/BebidasIcon.png" },
  { name: "Panadería", image: "/img/PanaderiaIcon.png" },
  { name: "Tostadas", image: "/img/TostadasIcon.png" },
];

export default function Categories() {
  return (
    <div className="mt-10 px-4">
      {/* Título centrado */}
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
        Categorías Principales
      </h2>

      {/* Contenedor scroll horizontal centrado */}
      <div className="overflow-x-auto no-scrollbar px-4 justify-center">
        <div className="w-max mx-auto flex gap-6">
          {categories.map(({ name, image }) => {
            return (
              <div
                key={name}
                className="flex flex-col items-center justify-center min-w-[10rem] w-40 h-32 bg-gray-50 rounded-xl shadow-sm cursor-pointer transition-transform duration-500 hover:[transform:rotateY(180deg)]"
              >
                    <img 
                      src={image} 
                      alt={name}
                      className="w-15 h-15 object-contain" 
                    />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
