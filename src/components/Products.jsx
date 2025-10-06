import { useState, useEffect } from "react";
import { Star } from "lucide-react";

// Productos originales para repetir
const baseProducts = [
  {
    id: 1,
    name: "Vplab Protein Cookies Choco Chips (Pack of 6)",
    price: 15.0,
    oldPrice: 20.0,
    discount: "25%",
    img1: "/img/Protein_Cookie_2.png",
    img2: "/img/Protein_Cookie_1.png",
    rating: 4,
    details: "150 g",
    status: "sale",
  },
  {
    id: 2,
    name: "Vanilla Cleansing Cheese Cake Bomb Cosmetics",
    price: 17.0,
    oldPrice: 20.0,
    discount: "15%",
    img1: "/img/Betty_Cake1.png",
    img2: "/img/Betty_Cake2.png",
    rating: 5,
    details: "20 g",
    status: "sale",
  },
  {
    id: 3,
    name: "Multi Millet Strawberry Pancake Back & Go",
    price: 50.0,
    img1: "/img/Bake_Go1.png",
    img2: "/img/Bake_Go2.png",
    rating: 4,
    details: "2 kg",
    status: "",
  },
  {
    id: 4,
    name: "Monterra Jumbo California Walnuts in Shell 1 kg",
    price: 10.0,
    img1: "/img/Monterra1.png",
    img2: "/img/Monterra2.png",
    rating: 3,
    details: "45 g",
    status: "sold out",
  },
  {
    id: 5,
    name: "Cake World Chocolate Toast",
    price: 32.0,
    oldPrice: 45.0,
    discount: "29%",
    img1: "/img/bakery1-front.png",
    img2: "/img/bakery1-back.png",
    rating: 5,
    details: "Slice",
    status: "sale",
  },
  {
    id: 6,
    name: "Croissant Pack (6 pcs)",
    price: 12.0,
    img1: "/img/bakery2-front.png",
    img2: "/img/bakery2-back.png",
    rating: 4,
    details: "6 pcs",
    status: "",
  },
];

// Aquí estamos creando los productos, por ahora seran 50
const totalProducts = Array.from({ length: 50 }, (_, i) => {
  const base = baseProducts[i % baseProducts.length];
  return { ...base, id: i + 1 };
});

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const totalPages = Math.ceil(totalProducts.length / productsPerPage);

    useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = totalProducts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* ---- NAV SUPERIOR ---- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center mb-6 gap-20 border-2 border-violet-200 rounded-md w-fit mx-auto p-2">
        {/* Contador de productos */}  
          <span className="text-gray-700 font-medium text-violet-500">
            🏅{totalProducts.length} 
            <span className="text-gray-700 font-medium text-violet-500 ml-2">
              Products
            </span>
          </span>     

        {/* Short by + ComboBox */}
        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-medium gap 20 text-violet-500">🏅Short by:</label>
          <select className="border border-violet-200 bg-white rounded-md px-2 py-1 text-sky-800 focus:outline-none">
            <option>Featured</option>
            <option>Best Selling</option>
            <option>Alphabet order A</option>
            <option>Alphabet order Z</option>
            <option>Price high to low</option>
            <option>Price low to high</option>
            <option>Date old to new</option>
            <option>Date new to old</option>
          </select>
        </div>
      </div>

      {/* ---- GRID DE PRODUCTOS ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <article
            key={product.id}
            className="rounded-2xl overflow-hidden shadow-sm group p-4 bg-white relative"
          >
            <div className="relative w-full h-44 flex justify-center items-center overflow-hidden rounded-lg">
              {product.status && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-20">
                  {product.status === "sale"
                    ? "Sale"
                    : product.status === "sold out"
                    ? "Sold out"
                    : product.status}
                </span>
              )}

              <img
                src={product.img1}
                alt={product.name}
                className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
              />
              <img
                src={product.img2}
                alt={product.name + " alt"}
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                {product.name}
              </h3>

              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < (product.rating || 0) ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-2">({product.rating || 0})</span>
              </div>

              <div className="mt-3 flex items-center gap-2 flex-wrap">
                {product.oldPrice && (
                  <span className="line-through text-gray-400 text-sm">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-lg font-bold text-red-600">
                  ${product.price.toFixed(2)}
                </span>
                {product.discount && (
                  <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
                    {product.discount}
                  </span>
                )}
              </div>

              {product.details && (
                <p className="text-gray-500 text-sm mt-1">{product.details}</p>
              )}

              <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600">
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* ---- PAGINACIÓN ---- */}
      <div className="flex justify-center items-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
