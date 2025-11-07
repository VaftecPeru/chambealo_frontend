export default function PromoCards() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Scroll horizontal en mobile */}
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:hidden">
        {/* Card 1 */}
        <div className="flex-none w-100 h-[250px] rounded-2xl overflow-hidden group snap-start relative">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 bg-right"
            style={{ backgroundImage: "url('/img/piezagráfica1.png')" }}
          ></div>
          <div className="absolute inset-0"></div>
          <div className="relative p-6 flex flex-col justify-between h-full">
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex-none w-100 h-[250px] rounded-2xl overflow-hidden group snap-start relative">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 bg-right"
            style={{ backgroundImage: "url('/img/piezagráfica2.png')" }}
          ></div>
          <div className="absolute inset-0"></div>
          <div className="relative p-6 flex flex-col justify-between h-full">
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex-none w-100 h-[250px] rounded-2xl overflow-hidden group snap-start relative">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 bg-right"
            style={{ backgroundImage: "url('/img/piezagráfica3.png')" }}
          ></div>
          <div className="absolute inset-0"></div>
          <div className="relative p-6 flex flex-col justify-between h-full">
          </div>
        </div>
      </div>

      {/* Grid en desktop */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
        {/* Repetimos las mismas cards aquí */}
        <div className="card relative w-full h-[250px] rounded-2xl overflow-hidden group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-102 bg-right"
            style={{ backgroundImage: "url('/img/piezagráfica1.png')" }}
          ></div>
          <div className="absolute inset-0"></div>
          <div className="relative p-6 flex flex-col justify-between h-full">
          </div>
        </div>
        <div className="card relative w-full h-[250px] rounded-2xl overflow-hidden group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-102 bg-right"
            style={{ backgroundImage: "url('/img/piezagráfica2.png')" }}
          ></div>
          <div className="absolute inset-0"></div>
          <div className="relative p-6 flex flex-col justify-between h-full">
          </div>
        </div>
        <div className="card relative w-full h-[250px] rounded-2xl overflow-hidden group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-102 bg-right"
            style={{ backgroundImage: "url('/img/piezagráfica3.png')" }}
          ></div>
          <div className="absolute inset-0"></div>
          <div className="relative p-6 flex flex-col justify-between h-full">
          </div>
        </div>
      </div>
    </div>
  )
}
