const bannerData = [
  {
    id: 1,
    bgColor: "bg-blue-100",
    discountText: "Up to 45% OFF",
    title: "Don't Miss Out on Tasty Grocery Deals!",
    buttonText: "View More",
    imgSrc: "/img/CerealBar1.png",
  },
  {
    id: 2,
    bgColor: "bg-yellow-50",
    discountText: "Flat 15% OFF",
    title: (
      <>
        Fruits Juice Delicious Tasty<br /> from Farm
      </>
    ),
    buttonText: "View More",
    imgSrc: "/img/CerealBar2.png",
  },
];

export default function BannerCards() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Contenedor responsive: grid en md+, scroll horizontal en sm */}
      <div className="md:grid md:grid-cols-2 md:gap-6 flex gap-4 overflow-x-auto md:overflow-visible scrollbar-hide">
        {bannerData.map((banner) => (
          <div
            key={banner.id}
            className={`${banner.bgColor} rounded-xl flex-shrink-0 md:flex md:flex-row flex-col items-center p-6 gap-4 w-80 md:w-auto`}
          >
            {/* Texto */}
            <div className="flex flex-col gap-2 md:gap-4 w-full md:max-w-[60%]">
              <span className="text-sm md:text-base font-medium text-violet-600">
                {banner.discountText}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                {banner.title}
              </h2>
              {/* Botón centrado solo en móviles */}
              <button className="mt-2 bg-orange-500 text-white px-4 md:px-5 py-2 rounded-full font-semibold hover:bg-violet-500 w-fit md:self-start self-center">
                {banner.buttonText}
              </button>
            </div>

            {/* Imagen */}
            <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
              <img
                src={banner.imgSrc}
                alt={banner.title}
                className="w-32 md:w-48 h-32 md:h-48 object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
