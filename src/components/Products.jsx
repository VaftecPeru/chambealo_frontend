import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";
import { useCart } from "../contexts/CartContext";

// Auxiliar para normalizar el nombre de categoría independientemente de si viene como String u Objeto desde la API
function getCategoryName(category) {
  if (!category) return "";
  if (typeof category === "object") return category.name || "";
  return category;
}

function applyFilters(products, filters) {
  return products.filter((p) => {
    const pPrice = Number(p.price || 0);
    const pInStock = p.inStock !== undefined ? p.inStock : (p.stock === undefined || p.stock > 0);
    const pCategory = getCategoryName(p.category);

    if (filters.availability && !pInStock) return false;
    if (typeof filters.priceMin === "number" && filters.priceMin > 0) {
      if (pPrice < filters.priceMin) return false;
    }
    if (typeof filters.priceMax === "number" && filters.priceMax > 0) {
      if (pPrice > filters.priceMax) return false;
    }
    if (filters.categories && filters.categories.size > 0) {
      if (!filters.categories.has(pCategory)) return false;
    }
    if (filters.types && filters.types.size > 0) {
      if (!filters.types.has(p.type)) return false;
    }
    if (filters.brands && filters.brands.size > 0) {
      if (!filters.brands.has(p.brand)) return false;
    }
    if (filters.weights && filters.weights.size > 0) {
      if (!filters.weights.has(p.weight)) return false;
    }
    if (filters.tags && filters.tags.size > 0) {
      const hasTag = (p.tags || []).some((t) => filters.tags.has(t));
      if (!hasTag) return false;
    }
    return true;
  });
}

function getUniqueOptions(products) {
  const setCat = new Set();
  const setType = new Set();
  const setBrand = new Set();
  const setWeight = new Set();
  const setTags = new Set();

  products.forEach((p) => {
    const catName = getCategoryName(p.category);
    if (catName) setCat.add(catName);
    if (p.type) setType.add(p.type);
    if (p.brand) setBrand.add(p.brand);
    if (p.weight) setWeight.add(p.weight);
    (p.tags || []).forEach((t) => setTags.add(t));
  });

  return {
    categories: Array.from(setCat).sort((a, b) => a.localeCompare(b)),
    types: Array.from(setType).sort((a, b) => a.localeCompare(b)),
    brands: Array.from(setBrand).sort((a, b) => a.localeCompare(b)),
    weights: Array.from(setWeight).sort((a, b) => a.localeCompare(b)),
    tags: Array.from(setTags).sort((a, b) => a.localeCompare(b)),
  };
}

function getCountsByGroup(filteredProducts, allOptions) {
  const counts = {
    categories: {},
    types: {},
    brands: {},
    weights: {},
    tags: {},
  };

  (allOptions.categories || []).forEach((name) => {
    counts.categories[name] = filteredProducts.filter((p) => getCategoryName(p.category) === name).length;
  });
  (allOptions.types || []).forEach((name) => {
    counts.types[name] = filteredProducts.filter((p) => p.type === name).length;
  });
  (allOptions.brands || []).forEach((name) => {
    counts.brands[name] = filteredProducts.filter((p) => p.brand === name).length;
  });
  (allOptions.weights || []).forEach((name) => {
    counts.weights[name] = filteredProducts.filter((p) => p.weight === name).length;
  });
  (allOptions.tags || []).forEach((name) => {
    counts.tags[name] = filteredProducts.filter((p) => (p.tags || []).includes(name)).length;
  });

  return counts;
}

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("Destacados");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const productsPerPage = 20;

  const [appliedFilters, setAppliedFilters] = useState({
    categories: new Set(),
    types: new Set(),
    brands: new Set(),
    weights: new Set(),
    tags: new Set(),
    priceMin: 0,
    priceMax: 0,
    availability: false,
  });

  const [openSections, setOpenSections] = useState({
    availability: true,
    category: true,
    productType: true,
    moreFilters: true,
    brand: true,
    price: true,
    weight: true,
  });

  const [showMore, setShowMore] = useState({
    category: false,
    productType: false,
    moreFilters: false,
    brand: false,
  });

  const { addToCart } = useCart();

  // Carga de productos desde el backend (API)
  useEffect(() => {
    getProducts()
      .then((data) => {
        const productList = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
            ? data.products
            : [];
        setAllProducts(productList);
      })
      .catch((err) => {
        console.error("Error al cargar productos de la API:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const allOptions = useMemo(() => getUniqueOptions(allProducts), [allProducts]);

  const filteredProducts = useMemo(() => {
    return applyFilters(allProducts, appliedFilters);
  }, [allProducts, appliedFilters]);

  const counts = useMemo(() => getCountsByGroup(filteredProducts, allOptions), [filteredProducts, allOptions]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortOption) {
      case "Más vendidos":
        return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "Orden alfabético A-Z":
        return list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      case "Orden alfabético Z-A":
        return list.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
      case "Precio de mayor a menor":
        return list.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
      case "Precio de menor a mayor":
        return list.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
      default:
        return list;
    }
  }, [filteredProducts, sortOption]);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, sortOption]);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    alert(`"${product.name}" agregado al carrito! 🛒`);
  };

  const toggleOption = (group, option) => {
    setAppliedFilters((prev) => {
      const copy = {
        ...prev,
        [group]: new Set(prev[group]),
      };
      if (copy[group].has(option)) copy[group].delete(option);
      else copy[group].add(option);
      return copy;
    });
    setCurrentPage(1);
  };

  const toggleAvailability = () => {
    setAppliedFilters((prev) => ({ ...prev, availability: !prev.availability }));
    setCurrentPage(1);
  };

  const setPriceRange = (min, max) => {
    setAppliedFilters((prev) => ({ ...prev, priceMin: min || 0, priceMax: max || 0 }));
    setCurrentPage(1);
  };

  const toggleSection = (sec) => setOpenSections((p) => ({ ...p, [sec]: !p[sec] }));
  const toggleShowMore = (sec) => setShowMore((p) => ({ ...p, [sec]: !p[sec] }));

  const resetFilters = () => {
    setAppliedFilters({
      categories: new Set(),
      types: new Set(),
      brands: new Set(),
      weights: new Set(),
      tags: new Set(),
      priceMin: 0,
      priceMax: 0,
      availability: false,
    });
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="w-full text-center py-20 text-gray-600 font-medium">
        Cargando catálogo de productos...
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* SIDEBAR DESKTOP */}
          <aside className="hidden lg:block lg:w-72 flex-shrink-0">
            <div>
              <Filter
                allOptions={allOptions}
                counts={counts}
                appliedFilters={appliedFilters}
                onToggleOption={toggleOption}
                onPriceChange={setPriceRange}
                onToggleAvailability={toggleAvailability}
                openSections={openSections}
                toggleSection={toggleSection}
                showMore={showMore}
                toggleShowMore={toggleShowMore}
              />

              <button
                onClick={resetFilters}
                className="w-full mt-4 bg-gray-100 text-gray-800 py-2 rounded-md hover:bg-gray-200 transition"
              >
                Limpiar filtros
              </button>
            </div>
          </aside>

          {/* BOTÓN FILTROS MÓVIL */}
          <div className="lg:hidden fixed bottom-4 right-4 z-50">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
              {showMobileFilters ? "Cerrar Filtros" : "🔍 Filtros"}
            </button>
          </div>

          {/* SIDEBAR MÓVIL */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowMobileFilters(false)}>
              <div 
                className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Filtros</h2>
                    <button 
                      onClick={() => setShowMobileFilters(false)}
                      className="text-2xl"
                    >
                      ×
                    </button>
                  </div>
                  
                  <Filter
                    allOptions={allOptions}
                    counts={counts}
                    appliedFilters={appliedFilters}
                    onToggleOption={toggleOption}
                    onPriceChange={setPriceRange}
                    onToggleAvailability={toggleAvailability}
                    openSections={openSections}
                    toggleSection={toggleSection}
                    showMore={showMore}
                    toggleShowMore={toggleShowMore}
                  />

                  <button
                    onClick={resetFilters}
                    className="w-full mt-4 bg-gray-100 text-gray-800 py-2 rounded-md"
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CONTENIDO PRINCIPAL */}
          <main className="flex-1 min-w-0">
            {/* BARRA SUPERIOR */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 border-2 border-violet-200 rounded-lg w-full p-4 bg-white">
              <div className="flex items-center gap-2">
                <span className="text-violet-500 font-medium">
                  🏅 {sortedProducts.length}
                </span>
                <span className="text-gray-700 font-medium">Productos</span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <label className="text-violet-500 font-medium whitespace-nowrap">
                  🏅 Ordenar por:
                </label>
                <select
                  value={sortOption}
                  onChange={(e) => {
                    setSortOption(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full sm:w-auto border border-violet-200 bg-white rounded-md px-3 py-2 text-sky-800 focus:outline-none focus:ring-2 focus:ring-violet-300"
                >
                  <option>Destacados</option>
                  <option>Más vendidos</option>
                  <option>Orden alfabético A-Z</option>
                  <option>Orden alfabético Z-A</option>
                  <option>Precio de mayor a menor</option>
                  <option>Precio de menor a mayor</option>
                </select>
              </div>
            </div>

            {/* GRID DE PRODUCTOS */}
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {currentProducts.map((product) => {
                  const productId = product.product_id || product.id;
                  const mainImg = product.image_url || product.img1 || "https://via.placeholder.com/200";
                  const hoverImg = product.img2 || mainImg;
                  const priceVal = Number(product.price || 0);
                  const oldPriceVal = product.oldPrice || product.original_price;
                  const discountText = product.discount || (oldPriceVal ? "-15%" : null);
                  const ratingVal = product.rating || 0;

                  return (
                    <Link to={`/producto/${productId}`} key={productId}>
                      <article
                        className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group p-4 bg-white relative"
                      >
                        <div className="relative w-full h-40 sm:h-44 flex justify-center items-center overflow-hidden rounded-lg">
                          {product.status && (
                            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-20">
                              {product.status === "sale" ? "Sale" : product.status === "sold out" ? "Sold out" : product.status}
                            </span>
                          )}
                          <img
                            src={mainImg}
                            alt={product.name}
                            className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                          />
                          <img
                            src={hoverImg}
                            alt={(product.name || "") + " alt"}
                            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                          />
                        </div>

                        <div className="mt-4">
                          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem]">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-1 mt-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < ratingVal ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-2">({ratingVal})</span>
                          </div>

                          <div className="mt-3 flex items-center gap-2 flex-wrap">
                            {oldPriceVal && (
                              <span className="line-through text-gray-400 text-sm">
                                S/. {Number(oldPriceVal).toFixed(2)}
                              </span>
                            )}
                            <span className="text-lg font-bold text-red-600">
                              S/. {priceVal.toFixed(2)}
                            </span>
                            {discountText && (
                              <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
                                {discountText}
                              </span>
                            )}
                          </div>

                          {product.details && (
                            <p className="text-gray-500 text-sm mt-1">{product.details}</p>
                          )}

                          <button 
                            className="mt-4 w-full bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition"
                            onClick={(e) => handleAddToCart(e, product)}
                          >
                            Agregar Compra
                          </button>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-600 text-lg">
                  {error 
                    ? "No se pudo conectar con el catálogo del servidor." 
                    : "No hay productos disponibles con los filtros aplicados."}
                </p>
              </div>
            )}

            {/* PAGINACIÓN */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded transition ${
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
            )}
          </main>
        </div>
      </div>
    </div>
  );
}