
export default function Filter({
  allOptions,       // { categories, types, brands, weights, tags? }
  counts,           // { categories: {name:count}, types: {...}, brands: {...}, weights: {...}, tags? }
  appliedFilters,   // { categories: Set, types: Set, brands: Set, weights: Set, tags:Set, priceMin, priceMax, availability }
  onToggleOption,   // function(group, option)
  onPriceChange,    // function(min, max)
  onToggleAvailability, // function()
  openSections = {},    // <-- fallback para evitar errores
  toggleSection,
  showMore = {},        // <-- fallback para evitar errores
  toggleShowMore,
}) {
  const {
    categories = [],
    types = [],
    brands = [],
    weights = [],
    tags = [], // <-- por si usas tags
  } = allOptions || {};

  const {
    categories: selCategories = new Set(),
    types: selTypes = new Set(),
    brands: selBrands = new Set(),
    weights: selWeights = new Set(),
    tags: selTags = new Set(),
    priceMin = "",
    priceMax = "",
    availability = false,
  } = appliedFilters || {};

  const isChecked = (group, name) => {
    if (group === "categories") return selCategories.has(name);
    if (group === "types") return selTypes.has(name);
    if (group === "brands") return selBrands.has(name);
    if (group === "weights") return selWeights.has(name);
    if (group === "tags") return selTags.has(name);
    return false;
  };

  const renderOptionLabel = (group, name) => {
    const c = (counts && counts[group] && counts[group][name]) || 0;
    return `${name} (${c})`;
  };

  return (
    <div className="w-72 p-4 bg-white border border-gray-200 rounded-md shadow-md space-y-4">
      <h2 className="text-xl font-semibold mb-2">Filtro</h2>

      {/* Disponibilidad */}
      <div>
        <button
          className="w-full text-left font-medium text-gray-700 hover:text-blue-600 flex justify-between items-center"
          onClick={() => toggleSection("availability")}
        >
          Disponibilidad
          <span>{openSections?.availability ? "-" : "+"}</span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            openSections?.availability ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <label className="flex items-center space-x-2 px-2 py-1">
            <input
              type="checkbox"
              checked={availability}
              onChange={() => onToggleAvailability()}
            />
            <span className="text-gray-700">En stock</span>
          </label>
        </div>
      </div>

      {/* Categorías */}
      <div>
        <button
          className="w-full text-left font-medium text-gray-700 hover:text-blue-600 flex justify-between items-center"
          onClick={() => toggleSection("category")}
        >
          Categoría
          <span>{openSections?.category ? "-" : "+"}</span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            openSections?.category ? "max-h-none opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {categories
            .slice(0, showMore?.category ? categories.length : 10)
            .map((name) => (
              <label key={name} className="flex items-center space-x-2 px-2 py-1">
                <input
                  type="checkbox"
                  checked={isChecked("categories", name)}
                  onChange={() => onToggleOption("categories", name)}
                />
                <span className="text-gray-700">{renderOptionLabel("categories", name)}</span>
              </label>
            ))}

          {categories.length > 10 && (
            <button
              className="text-blue-600 text-sm mt-1 px-2"
              onClick={() => toggleShowMore("category")}
            >
              {showMore?.category ? "Mostrar menos" : "Mostrar más"}
            </button>
          )}
        </div>
      </div>

      {/* Tipo de producto */}
      <div>
        <button
          className="w-full text-left font-medium text-gray-700 hover:text-blue-600 flex justify-between items-center"
          onClick={() => toggleSection("productType")}
        >
          Tipo de Producto
          <span>{openSections?.productType ? "-" : "+"}</span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            openSections?.productType ? "max-h-none opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {types
            .slice(0, showMore?.productType ? types.length : 10)
            .map((name) => (
              <label key={name} className="flex items-center space-x-2 px-2 py-1">
                <input
                  type="checkbox"
                  checked={isChecked("types", name)}
                  onChange={() => onToggleOption("types", name)}
                />
                <span className="text-gray-700">{renderOptionLabel("types", name)}</span>
              </label>
            ))}

          {types.length > 10 && (
            <button
              className="text-blue-600 text-sm mt-1 px-2"
              onClick={() => toggleShowMore("productType")}
            >
              {showMore?.productType ? "Mostrar menos" : "Mostrar más"}
            </button>
          )}
        </div>
      </div>

      {/* Más filtros (tags) */}
      <div>
        <button
          className="w-full text-left font-medium text-gray-700 hover:text-blue-600 flex justify-between items-center"
          onClick={() => toggleSection("moreFilters")}
        >
          Más Filtros
          <span>{openSections?.moreFilters ? "-" : "+"}</span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            openSections?.moreFilters ? "max-h-none opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {tags.slice(0, showMore?.moreFilters ? tags.length : 10).map((name) => (
            <label key={name} className="flex items-center space-x-2 px-2 py-1">
              <input
                type="checkbox"
                checked={isChecked("tags", name)}
                onChange={() => onToggleOption("tags", name)}
              />
              <span className="text-gray-700">{renderOptionLabel("tags", name)}</span>
            </label>
          ))}

          {tags.length > 10 && (
            <button
              className="text-blue-600 text-sm mt-1 px-2"
              onClick={() => toggleShowMore("moreFilters")}
            >
              {showMore?.moreFilters ? "Mostrar menos" : "Mostrar más"}
            </button>
          )}
        </div>
      </div>

      {/* Marca */}
      <div>
        <button
          className="w-full text-left font-medium text-gray-700 hover:text-blue-600 flex justify-between items-center"
          onClick={() => toggleSection("brand")}
        >
          Marca
          <span>{openSections?.brand ? "-" : "+"}</span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            openSections?.brand ? "max-h-none opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {brands
            .slice(0, showMore?.brand ? brands.length : 10)
            .map((name) => (
              <label key={name} className="flex items-center space-x-2 px-2 py-1">
                <input
                  type="checkbox"
                  checked={isChecked("brands", name)}
                  onChange={() => onToggleOption("brands", name)}
                />
                <span className="text-gray-700">{renderOptionLabel("brands", name)}</span>
              </label>
            ))}

          {brands.length > 10 && (
            <button
              className="text-blue-600 text-sm mt-1 px-2"
              onClick={() => toggleShowMore("brand")}
            >
              {showMore?.brand ? "Mostrar menos" : "Mostrar más"}
            </button>
          )}
        </div>
      </div>

      {/* Precio */}
      <div>
        <button
          className="w-full text-left font-medium text-gray-700 hover:text-blue-600 flex justify-between items-center"
          onClick={() => toggleSection("price")}
        >
          Precio
          <span>{openSections?.price ? "-" : "+"}</span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 flex flex-col space-y-2 mt-2 ${
            openSections?.price ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex items-center space-x-2">
            <span className="font-semibold">$</span>
            <input
              type="number"
              value={priceMin || ""}
              onChange={(e) => onPriceChange(Number(e.target.value) || 0, priceMax || 0)}
              className="border border-gray-300 rounded px-2 py-1 w-20 text-center"
              placeholder="Min"
            />
            <span>hasta</span>
            <input
              type="number"
              value={priceMax || ""}
              onChange={(e) => onPriceChange(priceMin || 0, Number(e.target.value) || 0)}
              className="border border-gray-300 rounded px-2 py-1 w-20 text-center"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Peso */}
      <div>
        <button
          className="w-full text-left font-medium text-gray-700 hover:text-blue-600 flex justify-between items-center"
          onClick={() => toggleSection("weight")}
        >
          Peso
          <span>{openSections?.weight ? "-" : "+"}</span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            openSections?.weight ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {weights.map((name) => (
            <label key={name} className="flex items-center space-x-2 px-2 py-1">
              <input
                type="checkbox"
                checked={isChecked("weights", name)}
                onChange={() => onToggleOption("weights", name)}
              />
              <span className="text-gray-700">{renderOptionLabel("weights", name)}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
