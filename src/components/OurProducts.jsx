import { Link } from "react-router-dom";

export default function OurProducts() {
  // Data sin img2
  const productsData = {
    milk: [
      {
        id: 1,
        name: "Vplab Protein Cookies Choco Chips (Pack of 6)",
        price: 15.0,
        oldPrice: 20.0,
        discount: "25%",
        img1: "/img/Protein_Cookie_2.png",
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
        rating: 5,
        details: "20 g",
        status: "sale",
      },
      {
        id: 3,
        name: "Multi Millet Strawberry Pancake Back & Go",
        price: 50.0,
        img1: "/img/Bake_Go1.png",
        rating: 4,
        details: "2 kg",
        status: "",
      },
    ],
    vegetables: [
      {
        id: 4,
        name: "Fresh Tomato Pack",
        price: 10.0,
        img1: "/img/Bake_Go1.png",
        rating: 4,
        details: "1 kg",
        status: "sale",
      },
      {
        id: 5,
        name: "Green Lettuce Bunch",
        price: 7.5,
        img1: "/img/Monterra1.png",
        rating: 5,
        details: "1 bunch",
        status: "",
      },
      {
        id: 6,
        name: "Fresh Tomato Pack",
        price: 10.0,
        img1: "/img/CerealBar2.png",
        rating: 4,
        details: "1 kg",
        status: "sale",
      },
    ],
    bakery: [
      {
        id: 7,
        name: "Cake World Chocolate Toast",
        price: 32.0,
        oldPrice: 45.0,
        discount: "29%",
        img1: "/img/Monterra1.png",
        rating: 5,
        details: "Slice",
        status: "sale",
      },
      {
        id: 8,
        name: "Croissant Pack (6 pcs)",
        price: 12.0,
        img1: "/img/Protein_Cookie_2.png",
        rating: 4,
        details: "6 pcs",
        status: "",
      },
      {
        id: 9,
        name: "Croissant Pack (6 pcs)",
        price: 12.0,
        img1: "/img/Betty_Cake1.png",
        rating: 4,
        details: "6 pcs",
        status: "",
      },
    ],
  };

  const allProducts = [
    ...productsData.milk,
    ...productsData.vegetables,
    ...productsData.bakery,
  ].slice(0, 9);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-10">
        No te pierdas nuestros Productos
      </h2>

      {/* GRID de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {allProducts.map((product) => (
          <div key={product.id} className="flex items-center gap-4 p-4">
            {/* Imagen con borde y hover */}
            <div className="relative w-30 h-30 flex-shrink-0 rounded-xl shadow-sm bg-white flex items-center justify-center overflow-hidden">
              {/* Badge Sale si aplica */}
              {product.status === "sale" && (
                <span className="absolute bottom-1 left-1 text-red-500 text-[10px] font-semibold">
                  Sale
                </span>
              )}

              {/* Imagen con zoom solo en hover */}
              <img
                src={product.img1}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                {product.name}
              </h3>

              {/* Estrellas */}
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < (product.rating || 0)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Precio */}
              <div className="mt-2 flex items-center gap-2">
                {product.oldPrice && (
                  <span className="line-through text-gray-400 text-sm">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-lg font-bold text-red-600">
                  ${product.price.toFixed(2)}
                </span>
                {product.discount && (
                    <span className="bg-purple-600 text-white text-xs font-semibold px-1.5 py-1 rounded-md">
                    {product.discount}
                    </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón View All */}
      <div className="flex justify-center mt-10">
        <Link to="/OurStore">
        <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600">
          Ver más
        </button>
        </Link>
      </div>
    </div>
  );
}
