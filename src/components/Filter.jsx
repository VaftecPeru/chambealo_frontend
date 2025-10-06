import { useState } from "react";

const Filter = () => {
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

  const [checkboxes, setCheckboxes] = useState({});

  const [price, setPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCheckbox = (name) => {
    setCheckboxes((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const categories = [
    "Bakery (6)",
    "Beverages (4)",
    "Candy & Chocolate (1)",
    "Cheese (1)",
    "Chicken Feed (1)",
    "Coffee & Tea Saucers (1)",
    "Coffee Cakes (1)",
    "Cookies (3)",
    "Cream Cheese (1)",
    "Food Items (27)",
    "Fresh & Frozen Fruits (3)",
    "Fresh & Frozen Vegetables (2)",
    "Fruit Mixes (1)",
    "Fruits & Vegetables (6)",
    "Grains, Rice & Cereal (1)",
    "Honey (1)",
    "Ice Cream Cones (1)",
    "Ice Cream Syrup (1)",
    "Milk (1)",
    "Powdered Beverage Mixes (1)",
    "Prepared Foods (1)",
    "Seafood (1)",
    "Snack Foods (1)",
    "Soda (1)",
    "Stone Fruits (1)",
    "Vegetable Dip (3)",
    "Vegetable Mixes (1)",
  ];

  const productTypes = [
    "Beverages (1)",
    "Biscuits (3)",
    "Cake (1)",
    "Cheese (1)",
    "Chiken (1)",
    "Chocolate (1)",
    "Coffee & Tea (1)",
    "Coldrinks (1)",
    "Cookies (2)",
    "Creams (1)",
    "Food (3)",
    "Fruits (3)",
    "Grains (1)",
    "Honey (1)",
    "Ice Cream (2)",
    "Milk (1)",
    "Poweder (1)",
    "Sea Food (1)",
    "Toast (1)",
    "Vegetable (3)",
    "Vegetables (3)",
    "Wings (1)",
  ];

  const moreFilters = [
    "Almonds Honey (2)",
    "Bevrages (4)",
    "Biscuits (4)",
    "Cakes (1)",
    "Cheese (1)",
    "Chiken (1)",
    "Chocolates (2)",
    "Coffee (1)",
    "Coldrinks (1)",
    "Cookies (11)",
    "Creams (3)",
    "Dryfruits (1)",
    "Food (19)",
    "Fruits (2)",
    "Ice Creams (2)",
    "Juice (1)",
    "Milk (1)",
    "Poweder (1)",
    "Sea Food (3)",
    "Tea (1)",
    "Toast (4)",
    "Vegetables (7)",
  ];

  const brands = [
    "7 Days (1)",
    "Agama (1)",
    "Aruma (1)",
    "Bake & Go (1)",
    "Belvita (1)",
    "Betty,s Cake (1)",
    "Blue Diamond (1)",
    "Corny (1)",
    "Fanta (1)",
    "Fridays (1)",
    "Fruits (3)",
    "Grains (1)",
    "Jacobs (1)",
    "Kinder Joy (1)",
    "Komo (1)",
    "Kopobka (1)",
    "Monterra (1)",
    "Pranky (3)",
    "Valio (1)",
    "Vegetable (2)",
    "Vegetables (4)",
    "Vplub (2)",
    "Xapnkn (1)",
    "Yleva (2)",
  ];

  const weights = [
    "100gm (9)",
    "250gm (12)",
    "500gm (20)",
    "1kg (14)",
    "2kg (5)",
    "3kg (2)",
  ];

  return (
    <div className="w-72 p-4 bg-white border border-gray-200 rounded-md shadow-md space-y-4">
      <h2 className="text-xl font-semibold mb-2">Filter</h2>

      {/* Availability */}
      <div>
        <button
          className="w-full text-left font-medium text-gray-700 hover:text-blue-600 flex justify-between items-center"
          onClick={() => toggleSection("availability")}
        >
          Availability
          <span>{openSections.availability ? "-" : "+"}</span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            openSections.availability ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {["In stock (32)", "Out of stock (2)"].map((item) => (
            <label key={item} className="flex items-center space-x-2 px-2 py-1">
              <input
                type="checkbox"
                checked={checkboxes[item] || false}
                onChange={() => toggleCheckbox(item)}
              />
              <span className="text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <button
          className="w-full text-left font-medium text-gray-700 hover:text-blue-600 flex justify-between items-center"
          onClick={() => toggleSection("category")}
        >
          Category
          <span>{openSections.category ? "-" : "+"}</span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            openSections.category ? "max-h-none opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {categories
            .slice(0, showMore.category ? categories.length : 10)
            .map((item) => (
              <label key={item} className="flex items-center space-x-2 px-2 py-1">
                <input
                  type="checkbox"
                  checked={checkboxes[item] || false}
                  onChange={() => toggleCheckbox(item)}
                />
                <span className="text-gray-700">{item}</span>
              </label>
            ))}
          <button
            className="text-blue-600 text-sm mt-1 px-2"
            onClick={() =>
              setShowMore((prev) => ({ ...prev, category: !prev.category }))
            }
          >
            {showMore.category ? "Show less" : "Show more"}
          </button>
        </div>
      </div>

      {/* Product Type */}
      <div>
        <button
          className="w-full text-left font-medium text-gray-700 hover:text-blue-600 flex justify-between items-center"
          onClick={() => toggleSection("productType")}
        >
          Product type
          <span>{openSections.productType ? "-" : "+"}</span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            openSections.productType ? "max-h-none opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {productTypes
            .slice(0, showMore.productType ? productTypes.length : 10)
            .map((item) => (
              <label key={item} className="flex items-center space-x-2 px-2 py-1">
                <input
                  type="checkbox"
                  checked={checkboxes[item] || false}
                  onChange={() => toggleCheckbox(item)}
                />
                <span className="text-gray-700">{item}</span>
              </label>
            ))}
          <button
            className="text-blue-600 text-sm mt-1 px-2"
            onClick={() =>
              setShowMore((prev) => ({ ...prev, productType: !prev.productType }))
            }
          >
            {showMore.productType ? "Show less" : "Show more"}
          </button>
        </div>
      </div>

      {/* More filters */}
      <div>
        <button
          className="w-full text-left font-medium text-gray-700 hover:text-blue-600 flex justify-between items-center"
          onClick={() => toggleSection("moreFilters")}
        >
          More filters
          <span>{openSections.moreFilters ? "-" : "+"}</span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            openSections.moreFilters ? "max-h-none opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {moreFilters
            .slice(0, showMore.moreFilters ? moreFilters.length : 10)
            .map((item) => (
              <label key={item} className="flex items-center space-x-2 px-2 py-1">
                <input
                  type="checkbox"
                  checked={checkboxes[item] || false}
                  onChange={() => toggleCheckbox(item)}
                />
                <span className="text-gray-700">{item}</span>
              </label>
            ))}
          <button
            className="text-blue-600 text-sm mt-1 px-2"
            onClick={() =>
              setShowMore((prev) => ({ ...prev, moreFilters: !prev.moreFilters }))
            }
          >
            {showMore.moreFilters ? "Show less" : "Show more"}
          </button>
        </div>
      </div>

      {/* Brand */}
      <div>
        <button
          className="w-full text-left font-medium text-gray-700 hover:text-blue-600 flex justify-between items-center"
          onClick={() => toggleSection("brand")}
        >
          Brand
          <span>{openSections.brand ? "-" : "+"}</span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            openSections.brand ? "max-h-none opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {brands
            .slice(0, showMore.brand ? brands.length : 10)
            .map((item) => (
              <label key={item} className="flex items-center space-x-2 px-2 py-1">
                <input
                  type="checkbox"
                  checked={checkboxes[item] || false}
                  onChange={() => toggleCheckbox(item)}
                />
                <span className="text-gray-700">{item}</span>
              </label>
            ))}
          <button
            className="text-blue-600 text-sm mt-1 px-2"
            onClick={() =>
              setShowMore((prev) => ({ ...prev, brand: !prev.brand }))
            }
          >
            {showMore.brand ? "Show less" : "Show more"}
          </button>
        </div>
      </div>

      {/* Price */}
      <div>
        <button
          className="w-full text-left font-medium text-gray-700 hover:text-blue-600 flex justify-between items-center"
          onClick={() => toggleSection("price")}
        >
          Price
          <span>{openSections.price ? "-" : "+"}</span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 flex flex-col space-y-2 mt-2 ${
            openSections.price ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex items-center space-x-2">
            <span className="font-semibold">$</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 w-20 text-center"
              placeholder="Min"
            />
            <span>to</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 w-20 text-center"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Weight */}
      <div>
        <button
          className="w-full text-left font-medium text-gray-700 hover:text-blue-600 flex justify-between items-center"
          onClick={() => toggleSection("weight")}
        >
          Weight
          <span>{openSections.weight ? "-" : "+"}</span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            openSections.weight ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {weights.map((item) => (
            <label key={item} className="flex items-center space-x-2 px-2 py-1">
              <input
                type="checkbox"
                checked={checkboxes[item] || false}
                onChange={() => toggleCheckbox(item)}
              />
              <span className="text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
