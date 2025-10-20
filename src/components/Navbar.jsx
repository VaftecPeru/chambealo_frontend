import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Search, PhoneCall, ShoppingCart, Menu, ChevronDown, X } from 'lucide-react';
import SaleCarousel from './SaleCarrousel';
import { saleProducts } from './products';


const Navbar = () => {
  const [openDropdowns, setOpenDropdowns] = useState({
    bakery: false,
    chips: false,
    beverages: false,
    milk: false,
    seafood: false,
    dairy: false,
    ourStore: false,
    special: false,
    categories: false,
    topDeals: false,
    elements: false,
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = (name) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-yellow-300 shadow-sm border-b border-gray-200">
        {/* Top section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-25">
            {/* Logo */}
            <Link to="/">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center">
                    <img
                      src="/img/logo_chambealo1.png"
                      alt="Logo Chambealo"
                      className="h-12 md:max-h-30 w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </Link>

            {/* Search bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 mx-4">
              <div className="relative group w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-blue-500 group-focus-within:text-blue-500" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 bg-white text-gray-800 placeholder-gray-400 rounded-xl border border-gray-200
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            transition-all duration-300 transform
                            hover:bg-white-50 hover:shadow-md hover:border-blue-300"
                  placeholder="Buscar Productos..."
                />
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-2 md:space-x-6">
              {/* Phone - Hidden on mobile */}
              <div className="hidden md:flex items-center text-gray-700">
                <PhoneCall className="h-8 w-6 ml-5" />
                <div className="text-sm">
                  <div className="font-medium">Necesitas Ayuda?</div>
                  <div className="text-gray-800">+01 123 456 789</div>
                </div>
              </div>

              {/* Cart */}
              <div className="flex items-center">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 md:h-8 md:w-8 text-gray-700" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </div>
                <div className="ml-2 text-sm hidden md:block">
                  <div className="font-medium text-gray-700">Carrito</div>
                  <div className="text-gray-600">0,00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search bar mobile - Only visible on mobile */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 bg-white text-gray-800 placeholder-gray-400 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search for items..."
            />
          </div>
        </div>

        {/* Bottom navigation - Desktop */}
        <div className="hidden md:block bg-blue-900 text-black max-auto overflow-x-clip">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
            <div className="flex justify-between items-center w-full h-12">
              {/* Shop by Departments - Hover Dropdown */}
              <div className="flex items-center mr-8 relative group">
                <button className="flex items-center text-sm font-medium text-white hover:text-violet-400">
                  <Menu className="h-4 w-4 mr-2 text-white"/>
                  Comprar por Categorías
                  <ChevronDown className="h-4 w-4 text-white ml-1" />
                </button>

                <div className="absolute left-0 top-full mt-3 -ml-12 w-64 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden max-h-0 opacity-0 group-hover:max-h-[2000px] group-hover:opacity-100 transition-all duration-300 ease-in-out z-50">
                  <ul className="py-2">
                    <li>
                      <Link to="/OurStore" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600">
                        Tienda
                      </Link>
                    </li>
                    <li>
                      <button className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600" onClick={() => toggleDropdown('bakery')}>
                        Panadería
                        <span>{openDropdowns.bakery ? '-' : '+'}</span>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdowns.bakery ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <ul className="pl-4">
                          {["Biscuits", "Cookies", "Wafers", "Cake"].map((item, i) => (
                            <li key={i}><a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600">{item}</a></li>
                          ))}
                        </ul>
                      </div>
                    </li>
                    <li><a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600">Vegetables</a></li>
                    <li>
                      <button className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600" onClick={() => toggleDropdown('chips')}>
                        Chips / Snacks
                        <span>{openDropdowns.chips ? '-' : '+'}</span>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdowns.chips ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <ul className="pl-4">
                          {["Crackers", "Bars", "Chips", "Toast"].map((item, i) => (
                            <li key={i}><a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600">{item}</a></li>
                          ))}
                        </ul>
                      </div>
                    </li>
                    <li>
                      <button className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600" onClick={() => toggleDropdown('beverages')}>
                        Bebidas
                        <span>{openDropdowns.beverages ? '-' : '+'}</span>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdowns.beverages ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <ul className="pl-4">
                          {["Cold Drinks", "Beer Items", "Carbonated", "Plant Drinks", "Juices Items"].map((item, i) => (
                            <li key={i}><a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600">{item}</a></li>
                          ))}
                        </ul>
                      </div>
                    </li>
                    <li>
                      <button className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600" onClick={() => toggleDropdown('milk')}>
                        Lácteos
                        <span>{openDropdowns.milk ? '-' : '+'}</span>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdowns.milk ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <ul className="pl-4">
                          {["Coffe", "Cream", "Chocolate", "Milk"].map((item, i) => (
                            <li key={i}><a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600">{item}</a></li>
                          ))}
                        </ul>
                      </div>
                    </li>
                    <li>
                      <button className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600" onClick={() => toggleDropdown('seafood')}>
                        Mariscos
                        <span>{openDropdowns.seafood ? '-' : '+'}</span>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdowns.seafood ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <ul className="pl-4">
                          {["Meats", "Chiken", "Eggs", "Poultry"].map((item, i) => (
                            <li key={i}><a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600">{item}</a></li>
                          ))}
                        </ul>
                      </div>
                    </li>
                    <li><a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600">Tostadas</a></li>
                    <li>
                      <button className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600" onClick={() => toggleDropdown('dairy')}>
                        Productos Lácteos
                        <span>{openDropdowns.dairy ? '-' : '+'}</span>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdowns.dairy ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <ul className="pl-4">
                          {["Bread Items", "Ice Cream", "Butter Items", "Cookies Items", "Cheese Items"].map((item, i) => (
                            <li key={i}><a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600">{item}</a></li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Navigation items */}
              <div className="flex space-x-8 text-white">
                <Link to="/" className="text-sm font-medium hover:text-violet-400">Inicio</Link>
                
              <div className='relative group'>
                <div className="flex items-center">
                  <Link to="/OurStore" className="text-sm font-medium hover:text-violet-400 mr-1">Tienda</Link>
                  <ChevronDown className="h-4 w-4 text-white" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-screen max-w-7xl bg-white border-t border-gray-200 shadow-lg rounded-lg transition-all duration-200 z-50 scale-0 group-hover:scale-100 transform origin-top">
                  <div className="px-6 py-6 grid grid-cols-4 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3"><a href="#" className="hover:text-blue-600">Bebidas</a></h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li><a href="#" className="hover:text-blue-600">Bebidas Frías</a></li>
                        <li><a href="#" className="hover:text-blue-600">Cerveza</a></li>
                        <li><a href="#" className="hover:text-blue-600">Gaseosas</a></li>
                        <li><a href="#" className="hover:text-blue-600">Bebidas Orgánicas</a></li>
                        <li><a href="#" className="hover:text-blue-600">Jugos</a></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3"><a href="#" className="hover:text-blue-600">Productos Lácteos</a></h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li><a href="#" className="hover:text-blue-600">Panadería</a></li>
                        <li><a href="#" className="hover:text-blue-600">Helados</a></li>
                        <li><a href="#" className="hover:text-blue-600">Mantequilla</a></li>
                        <li><a href="#" className="hover:text-blue-600">Galletas</a></li>
                        <li><a href="#" className="hover:text-blue-600">Queso</a></li>
                      </ul>
                    </div>
                    <div className="flex justify-center">
                      <img src="/img/mainCard1.png" alt="Oferta 1" className="rounded-lg w-auto h-auto object-cover"/>
                    </div>
                    <div className="flex justify-center">
                      <img src="/img/mainCard2.png" alt="Oferta 2" className="rounded-lg w-auto h-auto object-cover"/>
                    </div>
                  </div>
                </div>
              </div>

                <div className='relative group'>
                  <div className="flex items-center">
                    <a href="#" className="text-sm font-medium hover:text-violet-400 mr-1">Especial</a>
                    <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full ml-1 font-medium">SALE</span>
                    <ChevronDown className="h-4 w-4 text-white ml-1" />
                  </div>
                    <div className="absolute top-full mt-3 ml-[-300px] bg-white shadow-lg rounded-lg p-4 w-[900px] z-50 scale-0 group-hover:scale-100 transform origin-top transition-all duration-200">
                      <SaleCarousel products={saleProducts} />
                    </div>
                </div>

                {/* CATEGORÍAS CON DROPDOWN */}
                <div className="relative group flex items-center">
                  <a href="#" className="text-sm font-medium hover:text-violet-400 mr-1">Categorías</a>
                  <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full ml-1 font-medium">HOT</span>
                  <ChevronDown className="h-4 w-4 text-white ml-1" />

                  {/* DROPDOWN DE CATEGORÍAS CENTRADO Y JUSTO DEBAJO */}
                  <div className="absolute top-full left-[20%] -translate-x-1/2 mt-2 w-[70vw] max-w-[1200px] bg-white border-t border-gray-200 shadow-lg transition-all duration-200 z-50 rounded-lg overflow-visible max-h-auto scale-0 group-hover:scale-100 transform origin-top">

                    <div className="px-6 py-6" style={{display: 'grid',gridTemplateColumns: '1fr 1fr 1fr 2fr'}}> {/*style={{gridTemplateColumns: '1fr 1fr 1fr 1.5fr'}} --> Esto hace que las primeras 3 columnas tengan tamaño normal y la columna "Best Selling" sea 1.5 veces más ancha.*/}

                      {/* ---------- COLUMNA 1 ---------- */}
                      <div>
                        <div className="mb-4">
                          <h3 className="text-sky-900 font-semibold mb-2">Bakery</h3>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li><a href="#" className="hover:text-blue-600">Biscuits</a></li>
                            <li><a href="#" className="hover:text-blue-600">Cookies</a></li>
                            <li><a href="#" className="hover:text-blue-600">Wafers</a></li>
                            <li><a href="#" className="hover:text-blue-600">Cake</a></li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-sky-900 font-semibold mb-2">Healthy Food</h3>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li><a href="#" className="hover:text-blue-600">Honey</a></li>
                            <li><a href="#" className="hover:text-blue-600">Vegetables</a></li>
                            <li><a href="#" className="hover:text-blue-600">Fruits</a></li>
                            <li><a href="#" className="hover:text-blue-600">Juices</a></li>
                          </ul>
                        </div>
                      </div>

                      {/* ---------- COLUMNA 2 ---------- */}
                      <div>
                        <div className="mb-4">
                          <h3 className="text-sky-900 font-semibold mb-2">Meat & Eggs</h3>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li><a href="#" className="hover:text-blue-600">Poultry</a></li>
                            <li><a href="#" className="hover:text-blue-600">Eggs</a></li>
                            <li><a href="#" className="hover:text-blue-600">Meats</a></li>
                            <li><a href="#" className="hover:text-blue-600">Chicken</a></li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-sky-900 font-semibold mb-2">Milk Items</h3>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li><a href="#" className="hover:text-blue-600">Coffee</a></li>
                            <li><a href="#" className="hover:text-blue-600">Cream</a></li>
                            <li><a href="#" className="hover:text-blue-600">Chocolate</a></li>
                            <li><a href="#" className="hover:text-blue-600">Milk</a></li>
                          </ul>
                        </div>
                      </div>

                      {/* ---------- COLUMNA 3 ---------- */}
                      <div>
                        <div className="mb-4">
                          <h3 className="text-sky-900 font-semibold mb-2">Snacks Item</h3>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li><a href="#" className="hover:text-blue-600">Crackers</a></li>
                            <li><a href="#" className="hover:text-blue-600">Bars</a></li>
                            <li><a href="#" className="hover:text-blue-600">Chips</a></li>
                            <li><a href="#" className="hover:text-blue-600">Toasts</a></li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-sky-900 font-semibold mb-2">Sea Food</h3>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li><a href="#" className="hover:text-blue-600">Meats</a></li>
                            <li><a href="#" className="hover:text-blue-600">Chicken</a></li>
                            <li><a href="#" className="hover:text-blue-600">Eggs</a></li>
                            <li><a href="#" className="hover:text-blue-600">Poultry</a></li>
                          </ul>
                        </div>
                      </div>

                      {/* ---------- COLUMNA 4: BEST SELLING ---------- */}
                      <div>
                        <h3 className="text-sky-900 font-semibold mb-3 text-center">Best Selling</h3>

                        {/* Grid 2x2 para las cards */}
                        <div className="grid grid-cols-2 gap-3">
                          
                          {/* ---------- CARD 1 ---------- */}
                          <div className="flex items-center p-2 bg-violet-50 border rounded-lg hover:shadow-md">
                            <img
                              src="/img/Bake_Go1.png"
                              alt="Producto 1"
                              className="w-16 h-20 object-cover rounded mr-3 flex-shrink-0"
                            />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500">Multi Millet Strawberry Pancake Back & Go</p>
                              <div className="mt-1 flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <span className="text-xs text-yellow-400">★</span>
                                  <span className="text-xs text-yellow-400">★</span>
                                  <span className="text-xs text-yellow-400">★</span>
                                  <span className="text-xs text-yellow-400">★</span>
                                  <span className="text-xs text-gray-300">★</span>
                                  <div className="text-sm font-bold text-red-600">$50.00</div>
                                </div> 
                              </div>
                            </div>
                          </div>

                          {/* ---------- CARD 2 ---------- */}
                          <div className="flex items-center p-2 bg-violet-50 border rounded-lg hover:shadow-md">
                            <img
                              src="/img/Betty_Cake1.png"
                              alt="Producto 2"
                              className="w-16 h-20 object-cover rounded mr-3 flex-shrink-0"
                            />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500">Vanilla Cleansing Cheese Cake Bomb Cosmetics</p>
                              <div className="mt-1 flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <span className="text-xs text-yellow-400">★</span>
                                  <span className="text-xs text-yellow-400">★</span>
                                  <span className="text-xs text-yellow-400">★</span>
                                  <span className="text-xs text-yellow-400">★</span>
                                  <span className="text-xs text-yellow-400">★</span>
                                  <div className="text-sm font-bold text-red-600">$17.00</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* ---------- CARD 3 ---------- */}
                          <div className="flex items-center p-2 bg-violet-50 border rounded-lg hover:shadow-md">
                            <img
                              src="/img/Protein_Cookie_1.png"
                              alt="Producto 3"
                              className="w-16 h-20 object-cover rounded mr-3 flex-shrink-0"
                            />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500">Vplab Protein Cookies Choco Chips (Pack of 6)</p>
                              <div className="mt-1 flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <span className="text-xs text-yellow-400">★</span>
                                  <span className="text-xs text-yellow-400">★</span>
                                  <span className="text-xs text-yellow-400">★</span>
                                  <span className="text-xs text-yellow-400">★</span>
                                  <span className="text-xs text-gray-300">★</span>
                                  <div className="text-sm font-bold text-red-600">$15.00</div>
                                </div>    
                              </div>
                            </div>
                          </div>

                          {/* ---------- CARD 4 ---------- */}
                          <div className="flex items-center p-2 bg-violet-50 border rounded-lg hover:shadow-md">
                            <img
                              src="/img/Monterra1.png"
                              alt="Producto 4"
                              className="w-16 h-20 object-cover rounded mr-3 flex-shrink-0"
                            />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500">Monterra Jumbo California Walnuts in Shell 1 kg</p>
                              <div className="mt-1 flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <span className="text-xs text-yellow-400">★</span>
                                  <span className="text-xs text-yellow-400">★</span>
                                  <span className="text-xs text-yellow-400">★</span>
                                  <span className="text-xs text-gray-300">★</span>
                                  <span className="text-xs text-gray-300">★</span>
                                  <div className="text-sm font-bold text-red-600">$10.00</div>                                 
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* TOP DEALS CON DROPDOWN */}
                <div className="relative group flex items-center">
                  <a href="#" className="text-sm font-medium hover:text-violet-400 mr-1 whitespace-nowrap">Mejores Ofertas</a>
                  <ChevronDown className="h-4 w-4 text-white" />

                {/* DROPDOWN DE TOP DEALS */}
                <div className="absolute top-full left-[-90%] -translate-x-1/2 mt-2 w-[95vw] max-w-[1100px] bg-white border-t border-gray-200 shadow-lg transition-all duration-200 z-50 rounded-lg overflow-hidden scale-0 group-hover:scale-100 transform origin-top">
                  <div className="px-4 md:px-6 py-4 md:py-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                    
                    {/* ---------- COLUMNA 1: SHOP BY ---------- */}
                    <div>
                      <h3 className="text-sky-900 font-semibold mb-3 md:mb-4 text-base md:text-lg text-center">Shop By</h3>
                      
                      {/* Grid de categorías responsive */}
                      <div className="grid grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
                        {[
                          { img: "/img/beverages-icon.png", name: "Beverages" },
                          { img: "/img/fruits-icon.png", name: "Fruits" },
                          { img: "/img/icecream-icon.png", name: "Ice Cream" },
                          { img: "/img/cream-icon.png", name: "Cream" },
                          { img: "/img/vegetables-icon.png", name: "Vegetables" },
                          { img: "/img/honey-icon.png", name: "Honey" },
                          { img: "/img/potatos-icon.png", name: "Potatos" },
                          { img: "/img/palak-icon.png", name: "Palak" }
                        ].map((item, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border border-gray-200 flex items-center justify-center mb-1 md:mb-2 hover:border-blue-500 transition-colors cursor-pointer">
                              <img src={item.img} alt={item.name} className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain" />
                            </div>
                            <p className="text-xs text-gray-700 font-medium text-center">{item.name}</p>
                          </div>
                        ))}
                      </div>

                      {/* Etiquetas de descuento */}
                      <div className="space-y-2">
                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-2 md:p-3 rounded-lg">
                          <p className="text-xs md:text-sm text-gray-700 text-center"><span className="font-semibold">Up to 25% OFF</span></p>
                        </div>
                        <div className="bg-gradient-to-r from-emerald-100 to-blue-100 p-2 md:p-3 rounded-lg">
                          <p className="text-xs text-gray-500 italic text-center">Only this week</p>
                        </div>
                      </div>
                    </div>

                    {/* ---------- COLUMNA 2: TOP RATED ---------- */}
                    <div>
                      <h3 className="text-sky-900 font-semibold mb-3 md:mb-4 text-base md:text-lg text-center">Top Rated</h3>

                      {/* Grid responsive para productos */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-h-80 overflow-y-auto">
                        {[
                          { img: "/img/Protein_Cookie_1.png", name: "Vplab Protein Cookies Choco Chips (Pack of 6)", rating: "★★★★", stars: 4, reviews: 3, price: "$40.00", discount: null },
                          { img: "/img/Betty_Cake1.png", name: "Vanilla Cleansing Cheese Cake Bomb Cosmetics", rating: "★★★★★", stars: 5, reviews: 0, price: "$70.00", discount: null },
                          { img: "/img/Bake_Go1.png", name: "Multi Millet Strawberry Pancake Back & Go", rating: "★★★★", stars: 4, reviews: 1, price: "$40.00", discount: null },
                          { img: "/img/Monterra1.png", name: "Monterra Jumbo California Walnuts in...", rating: "★★★★", stars: 4, reviews: 1, price: "$26.00", discount: { original: "$32.00", percent: "19%" } },
                          { img: "/img/milky_mist.png", name: "Milky Mist Mango Fruit Yogurt 100 g (Cup)", rating: "★★★★★", stars: 5, reviews: 0, price: "$15.00", discount: null },
                          { img: "/img/komo_cheese.png", name: "Komo Holland Hard Cheese 45% 150g Pack...", rating: "★★★★★", stars: 5, reviews: 2, price: "$15.00", discount: { original: "$20.00", percent: "25%" } }
                        ].map((product, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-violet-50 hover:bg-emerald-50 rounded-lg transition-colors border border-gray-100">
                            <img src={product.img} alt={product.name} className="w-12 h-12 md:w-14 md:h-14 object-contain flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs md:text-sm font-medium text-gray-800 mb-1 line-clamp-2">{product.name}</h4>
                              <div className="flex items-center gap-1 mb-1">
                                <span className={`text-xs ${product.stars === 5 ? 'text-yellow-400' : 'text-yellow-400'}`}>{product.rating}</span>
                                <span className="text-xs text-gray-500">({product.reviews})</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {product.discount && (
                                  <p className="text-xs text-gray-400 line-through">{product.discount.original}</p>
                                )}
                                <p className="text-sm md:text-base font-bold text-red-600">{product.price}</p>
                                {product.discount && (
                                  <span className="text-xs bg-red-100 text-red-600 px-1 py-0.5 rounded font-semibold">{product.discount.percent}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                

                <div className='relative group'>
                  <div className="flex items-center">
                    <a href="#" className="text-sm font-medium hover:text-violet-400 mr-1">Elementos</a>
                    <ChevronDown className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute -ml-6 mt-3 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50 scale-0 group-hover:scale-100 transform origin-top transition-all duration-200 font-medium text-sm">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-violet-100">Acerca de nosotros</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-violet-100">Blogs</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-violet-100">Contacto</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-violet-100">FAQs</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-violet-100">Comparar</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-violet-100">Lista</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden bg-gray-50 border-t border-gray-200 px-4 py-3">
          <button
            onClick={toggleMobileMenu}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            <Menu className="h-5 w-5 mr-2 text-gray-600" />
            Menu
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMobileMenu}
      >
        <div
          className={`fixed left-0 top-0 h-full w-[70%] bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del menú móvil */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <button onClick={toggleMobileMenu} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Contenido del menú */}
          <div className="py-4">
            {/* Shop by Departments */}
            <div className="border-b border-gray-200 pb-2 mb-2">
              <button
                className="flex justify-between items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium"
                onClick={() => toggleDropdown('shopDepartments')}
              >
                <span className="flex items-center">
                  <Menu className="h-4 w-4 mr-2" />
                  Shop by Departments
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${openDropdowns.shopDepartments ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openDropdowns.shopDepartments ? 'max-h-[2000px]' : 'max-h-0'}`}>
                <div className="pl-4 bg-gray-50">
                  <Link to="/OurStore" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Our Store</Link>
                  
                  <button className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => toggleDropdown('bakery')}>
                    Bakery
                    <span>{openDropdowns.bakery ? '-' : '+'}</span>
                  </button>
                  <div className={`overflow-hidden transition-all ${openDropdowns.bakery ? 'max-h-40' : 'max-h-0'}`}>
                    <div className="pl-4 bg-white">
                      {["Biscuits", "Cookies", "Wafers", "Cake"].map((item, i) => (
                        <a key={i} href="#" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">{item}</a>
                      ))}
                    </div>
                  </div>

                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Vegetables</a>

                  <button className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => toggleDropdown('chips')}>
                    Chips / Snacks
                    <span>{openDropdowns.chips ? '-' : '+'}</span>
                  </button>
                  <div className={`overflow-hidden transition-all ${openDropdowns.chips ? 'max-h-40' : 'max-h-0'}`}>
                    <div className="pl-4 bg-white">
                      {["Crackers", "Bars", "Chips", "Toast"].map((item, i) => (
                        <a key={i} href="#" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">{item}</a>
                      ))}
                    </div>
                  </div>

                  <button className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => toggleDropdown('beverages')}>
                    Beverages
                    <span>{openDropdowns.beverages ? '-' : '+'}</span>
                  </button>
                  <div className={`overflow-hidden transition-all ${openDropdowns.beverages ? 'max-h-60' : 'max-h-0'}`}>
                    <div className="pl-4 bg-white">
                      {["Cold Drinks", "Beer Items", "Carbonated", "Plant Drinks", "Juices Items"].map((item, i) => (
                        <a key={i} href="#" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">{item}</a>
                      ))}
                    </div>
                  </div>

                  <button className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => toggleDropdown('milk')}>
                    Milk Items
                    <span>{openDropdowns.milk ? '-' : '+'}</span>
                  </button>
                  <div className={`overflow-hidden transition-all ${openDropdowns.milk ? 'max-h-40' : 'max-h-0'}`}>
                    <div className="pl-4 bg-white">
                      {["Coffe", "Cream", "Chocolate", "Milk"].map((item, i) => (
                        <a key={i} href="#" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">{item}</a>
                      ))}
                    </div>
                  </div>

                  <button className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => toggleDropdown('seafood')}>
                    Sea food
                    <span>{openDropdowns.seafood ? '-' : '+'}</span>
                  </button>
                  <div className={`overflow-hidden transition-all ${openDropdowns.seafood ? 'max-h-40' : 'max-h-0'}`}>
                    <div className="pl-4 bg-white">
                      {["Meats", "Chiken", "Eggs", "Poultry"].map((item, i) => (
                        <a key={i} href="#" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">{item}</a>
                      ))}
                    </div>
                  </div>

                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Toast</a>

                  <button className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => toggleDropdown('dairy')}>
                    Dairy Items
                    <span>{openDropdowns.dairy ? '-' : '+'}</span>
                  </button>
                  <div className={`overflow-hidden transition-all ${openDropdowns.dairy ? 'max-h-60' : 'max-h-0'}`}>
                    <div className="pl-4 bg-white">
                      {["Bread Items", "Ice Cream", "Butter Items", "Cookies Items", "Cheese Items"].map((item, i) => (
                        <a key={i} href="#" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">{item}</a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Home */}
            <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium">Home</a>

            {/* Our Store */}
            <div>
              <button
                className="flex justify-between items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium"
                onClick={() => toggleDropdown('ourStore')}
              >
                Our Store
                <ChevronDown className={`h-4 w-4 transition-transform ${openDropdowns.ourStore ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openDropdowns.ourStore ? 'max-h-96' : 'max-h-0'}`}>
                <div className="pl-4 bg-gray-50">
                  <div className="py-2">
                    <p className="px-4 py-1 text-sm font-semibold text-gray-800">Beverages</p>
                    <a href="#" className="block px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100">Juices Items</a>
                  </div>
                  <div className="py-2">
                    <p className="px-4 py-1 text-sm font-semibold text-gray-800">Dairy Items</p>
                    <a href="#" className="block px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100">Bread Items</a>
                    <a href="#" className="block px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100">Ice Cream</a>
                    <a href="#" className="block px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100">Butter Items</a>
                    <a href="#" className="block px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100">Cookies Items</a>
                    <a href="#" className="block px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100">Cheese Items</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Special */}
            <div>
              <button
                className="flex justify-between items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium"
                onClick={() => toggleDropdown('special')}
              >
                <span className="flex items-center">
                  Special
                  <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full ml-2 font-medium">SALE</span>
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${openDropdowns.special ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openDropdowns.special ? 'max-h-40' : 'max-h-0'}`}>
                <div className="pl-4 bg-gray-50">
                  <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Category 1</a>
                  <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Category 2</a>
                  <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Category 3</a>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <button
                className="flex justify-between items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium"
                onClick={() => toggleDropdown('categories')}
              >
                <span className="flex items-center">
                  Categories
                  <span className="bg-violet-500 text-white text-xs px-2 py-0.5 rounded-full ml-2 font-medium">HOT</span>
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${openDropdowns.categories ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Top Deals */}
            <div>
              <button
                className="flex justify-between items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium"
                onClick={() => toggleDropdown('topDeals')}
              >
                Top Deals
                <ChevronDown className={`h-4 w-4 transition-transform ${openDropdowns.topDeals ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Elements */}
            <div>
              <button
                className="flex justify-between items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium"
                onClick={() => toggleDropdown('elements')}
              >
                Elements
                <ChevronDown className={`h-4 w-4 transition-transform ${openDropdowns.elements ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openDropdowns.elements ? 'max-h-80' : 'max-h-0'}`}>
                <div className="pl-4 bg-gray-50">
                  <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">About Us</a>
                  <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Blogs</a>
                  <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Contact</a>
                  <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">FAQs</a>
                  <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Compare</a>
                  <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Wishlist</a>
                </div>
              </div>
            </div>

            {/* Contact Info - Mobile only */}
            <div className="mt-6 px-4 py-3 bg-blue-50 border-t border-gray-200">
              <div className="flex items-center text-gray-700 mb-2">
                <PhoneCall className="h-5 w-5 mr-2 text-blue-600" />
                <div className="text-sm">
                  <div className="font-medium">Need Help?</div>
                  <div className="text-blue-600">+01 123 456 789</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar