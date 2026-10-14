import { useNavigate } from "react-router-dom";
import '../styles/MainCard2.css';

// Importación de las imágenes desde src/assets/
import fotoHogar from '../assets/foto_ofertas_para_tu_hogar.png';
import fotoSeleccionados from '../assets/foto_de_productos_seleccionados.png';

export default function MainCards2() {
  const navigate = useNavigate();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Banner 1: Ofertas para tu hogar */}
        <div 
          className="maincards2-card card-hogar relative overflow-hidden rounded-3xl p-6 sm:p-8 min-h-[220px] sm:min-h-[260px] flex flex-col justify-center bg-cover bg-center shadow-sm cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
          style={{ backgroundImage: `url(${fotoHogar})` }}
          onClick={() => navigate("/OurStore")}
        >
          <div className="maincards2-overlay dark-overlay absolute inset-0 bg-black/40 z-0"></div>

          <div className="maincards2-content relative z-10 max-w-[280px] sm:max-w-xs">
            <span className="inline-block bg-yellow-400 text-slate-900 text-[11px] sm:text-xs font-black px-3 py-1 rounded-full uppercase mb-2 shadow-sm">
              Hasta 40% OFF
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-2">
              Ofertas para tu hogar
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 mb-4 font-medium">
              Productos esenciales para hacer tu día más fácil.
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/OurStore");
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition shadow-md"
            >
              Ver más
            </button>
          </div>
        </div>

        {/* Banner 2: Productos seleccionados */}
        <div 
          className="maincards2-card card-seleccionados relative overflow-hidden rounded-3xl p-6 sm:p-8 min-h-[220px] sm:min-h-[260px] flex flex-col justify-center bg-cover bg-center shadow-sm cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
          style={{ backgroundImage: `url(${fotoSeleccionados})` }}
          onClick={() => navigate("/OurStore")}
        >
          <div className="maincards2-overlay light-overlay absolute inset-0 bg-white/60 z-0"></div>

          <div className="maincards2-content relative z-10 max-w-[280px] sm:max-w-xs">
            <span className="inline-block bg-purple-600 text-white text-[11px] sm:text-xs font-black px-3 py-1 rounded-full uppercase mb-2 shadow-sm">
              Solo por esta semana
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-purple-900 leading-tight mb-2">
              Productos seleccionados
            </h2>
            <p className="text-xs sm:text-sm text-purple-800 mb-4 font-medium">
              Encuentra tus favoritos a precios especiales.
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/OurStore");
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition shadow-md"
            >
              Ver más
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}