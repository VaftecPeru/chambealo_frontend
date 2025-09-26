import { Salad, Apple, Drumstick, Milk, Beer, Croissant, Sandwich } from "lucide-react"; 
import '../styles/TopCategories.css'; 

const categories = [
  { name: "Vegetables", icon: Salad },
  { name: "Fruits", icon: Apple },
  { name: "Meats", icon: Drumstick },
  { name: "Milk", icon: Milk },
  { name: "Juices", icon: Beer },
  { name: "Bakery", icon: Croissant },
  { name: "Toasts", icon: Sandwich },
];

export default function Categories() {
  return (
    <div className="mt-10 px-4">
      {/* Título centrado */}
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
        Top Categories
      </h2>

      {/* Contenedor scroll horizontal centrado */}
      <div className="overflow-x-auto no-scrollbar" style={{ paddingLeft: 'calc(12.8% - 5rem)', paddingRight: '1rem' }}>
        <div className="inline-flex justify-center gap-6">
          {categories.map(({ name, icon }) => {
            const IconComponent = icon;
            return (
              <div
                key={name}
                className="flex flex-col items-center justify-center min-w-[10rem] w-40 h-32 bg-gray-50 rounded-xl shadow-sm cursor-pointer transition-transform duration-500 hover:[transform:rotateY(180deg)]"
              >
                <IconComponent className="w-10 h-10 text-slate-700" />
                <span className="mt-2 text-slate-700 font-semibold text-sm">{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
