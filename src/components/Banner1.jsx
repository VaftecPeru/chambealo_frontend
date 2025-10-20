export default function Banner() {
  return (
    <div className="max-w-7xl mx-auto bg-pink-50 rounded-xl overflow-hidden flex flex-col sm:flex-row items-center justify-between p-6 sm:p-10 gap-6">
      
      {/* Imagen izquierda */}
      <div className="flex-1 flex justify-center sm:justify-start">
        <img
          src="/img/CerealBar1.png"
          alt="Left Product"
          className="h-48 object-contain"
        />
      </div>

      {/* Texto central */}
      <div className="flex-1 text-center sm:text-center">
        <p className="text-sm text-violet-600 mb-2">Hasta un 35% de descuento</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Deliciosas comidas de <br /> los más vendidos <br /> de la India
        </h2>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-violet-600 transition">
          Ver más &rarr;
        </button>
      </div>

      {/* Imagen derecha */}
      <div className="flex-1 flex justify-center sm:justify-end">
        <img
          src="/img/CerealBar2.png"
          alt="Right Product"
          className="h-48 object-contain"
        />
      </div>
    </div>
  );
}