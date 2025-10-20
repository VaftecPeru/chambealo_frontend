import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function OurLatestNews() {
  const newsData = [
    {
      id: 1,
      img: "/img/estratosfera.png",
      date: "July 5, 2024",
      author: "Seenu Rawat",
      title: "9 Content Marketing Trends You Need to Follow in 2024",
      link: "#",
    },
    {
      id: 2,
      img: "/img/paisaje.jpg",
      date: "June 22, 2024",
      author: "Sarah Miller",
      title: "How to Boost Engagement with Social Media Campaigns",
      link: "#",
    },
    {
      id: 3,
      img: "/img/montaña.jpg",
      date: "May 10, 2024",
      author: "John Carter",
      title: "Email Marketing Strategies for Better Conversion Rates",
      link: "#",
    },
    {
      id: 4,
      img: "/img/paisaje.jpg",
      date: "April 18, 2024",
      author: "Emily Davis",
      title: "Top SEO Tips to Improve Your Google Rankings",
      link: "#",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-10">
        Últimas Novedades
      </h2>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={30}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {newsData.map((news) => (
          <SwiperSlide key={news.id}>
            <div className="bg-white rounded-2xl overflow-hidden">
              {/* Imagen */}
              <img
                src={news.img}
                alt={news.title}
                className="w-full h-56 object-cover"
              />

              {/* Contenido */}
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">
                  {news.date} • {news.author}
                </p>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                  {news.title}
                </h3>
                <a
                  href={news.link}
                  className="text-orange-500 font-medium hover:underline"
                >
                  Leer más →
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
