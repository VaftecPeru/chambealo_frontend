export default function PromoCards() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Scroll horizontal en mobile */}
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:hidden">
        {/* Card 1 */}
        <div className="flex-none w-80 h-[250px] rounded-2xl overflow-hidden group snap-start relative">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 bg-right"
            style={{ backgroundImage: "url('/img/mainCard1.png')" }}
          ></div>
          <div className="absolute inset-0"></div>
          <div className="relative p-6 flex flex-col justify-between h-full">
            <div>
              <p className="text-sm text-purple-600 font-medium">Up to 25% OFF</p>
              <h3 className="text-xl font-bold text-gray-800 mt-2">
                Potato-based <br /> fresh juice
              </h3>
            </div>
            <button className="mt-6 bg-orange-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-orange-600 w-fit">
              View More
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex-none w-80 h-[250px] rounded-2xl overflow-hidden group snap-start relative">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 bg-right"
            style={{ backgroundImage: "url('/img/mainCard2.png')" }}
          ></div>
          <div className="absolute inset-0"></div>
          <div className="relative p-6 flex flex-col justify-between h-full">
            <div>
              <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">Flat 20% OFF</span>
              <h3 className="text-xl font-bold text-gray-800 mt-2">
                Butter Cookie <br /> & Chip
              </h3>
            </div>
            <button className="mt-6 bg-orange-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-orange-600 w-fit">
              View More
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex-none w-80 h-[250px] rounded-2xl overflow-hidden group snap-start relative">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 bg-right"
            style={{ backgroundImage: "url('/img/mainCard3.png')" }}
          ></div>
          <div className="absolute inset-0"></div>
          <div className="relative p-6 flex flex-col justify-between h-full">
            <div>
              <p className="text-sm text-blue-600 font-medium">Only this week</p>
              <h3 className="text-xl font-bold text-gray-800 mt-2">
                Shopping with us <br /> for best price
              </h3>
            </div>
            <button className="mt-6 bg-orange-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-orange-600 w-fit">
              View More
            </button>
          </div>
        </div>
      </div>

      {/* Grid en desktop */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
        {/* Puedes repetir las mismas cards o mapearlas aquí */}
        <div className="card relative w-full h-[250px] rounded-2xl overflow-hidden group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 bg-right"
            style={{ backgroundImage: "url('/img/mainCard1.png')" }}
          ></div>
          <div className="absolute inset-0"></div>
          <div className="relative p-6 flex flex-col justify-between h-full">
            <div>
              <p className="text-sm text-purple-600 font-medium">Hasta 25% de descuento</p>
              <h3 className="text-xl font-bold text-gray-800 mt-2">
                Jugo fresco a  <br /> Base de papas
              </h3>
            </div>
            <button className="mt-6 bg-orange-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-orange-600 w-fit">
              Ver más
            </button>
          </div>
        </div>
        <div className="card relative w-full h-[250px] rounded-2xl overflow-hidden group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 bg-right"
            style={{ backgroundImage: "url('/img/mainCard2.png')" }}
          ></div>
          <div className="absolute inset-0"></div>
          <div className="relative p-6 flex flex-col justify-between h-full">
            <div>
              <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">20% de descuento</span>
              <h3 className="text-xl font-bold text-gray-800 mt-2">
                Galleta de manteca <br /> & Chips
              </h3>
            </div>
            <button className="mt-6 bg-orange-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-orange-600 w-fit">
              Ver más
            </button>
          </div>
        </div>
        <div className="card relative w-full h-[250px] rounded-2xl overflow-hidden group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 bg-right"
            style={{ backgroundImage: "url('/img/mainCard3.png')" }}
          ></div>
          <div className="absolute inset-0"></div>
          <div className="relative p-6 flex flex-col justify-between h-full">
            <div>
              <p className="text-sm text-blue-600 font-medium">Solo por esta semana</p>
              <h3 className="text-xl font-bold text-gray-800 mt-2">
                Compra con nosotros <br /> Al mejor precio
              </h3>
            </div>
            <button className="mt-6 bg-orange-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-orange-600 w-fit">
              Ver más
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
