import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Search, PhoneCall, ShoppingCart, Menu, ChevronDown, X } from 'lucide-react';

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
      <nav className="bg-white shadow-sm border-b border-gray-200">
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
                  placeholder="Search for items..."
                />
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-2 md:space-x-6">
              {/* Phone - Hidden on mobile */}
              <div className="hidden md:flex items-center text-gray-700">
                <PhoneCall className="h-8 w-6 ml-5" />
                <div className="text-sm">
                  <div className="font-medium">Need Help?</div>
                  <div className="text-blue-600">+01 123 456 789</div>
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
                  <div className="font-medium text-gray-700">Cart</div>
                  <div className="text-gray-600">0,00 lei</div>
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
        <div className="hidden md:block bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
            <div className="flex items-center h-12">
              {/* Shop by Departments - Hover Dropdown */}
              <div className="flex items-center mr-8 relative group">
                <button className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                  <Menu className="h-4 w-4 mr-2 text-gray-600" />
                  Shop by Departments
                  <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
                </button>

                <div className="absolute left-0 top-full mt-3 -ml-12 w-64 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden max-h-0 opacity-0 group-hover:max-h-[2000px] group-hover:opacity-100 transition-all duration-300 ease-in-out z-50">
                  <ul className="py-2">
                    <li>
                      <Link to="/OurStore" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600">
                        Our Store
                      </Link>
                    </li>
                    <li>
                      <button className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600" onClick={() => toggleDropdown('bakery')}>
                        Bakery
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
                        Chips / Snacks Item
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
                        Beverages
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
                        Milk Items
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
                        Sea food
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
                    <li><a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600">Toast</a></li>
                    <li>
                      <button className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600" onClick={() => toggleDropdown('dairy')}>
                        Dairy Items
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
              <div className="flex space-x-8">
                <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600">Home</a>
                
                <div className='relative group'>
                  <div className="flex items-center">
                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 mr-1">Our Store</a>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="absolute -ml-150 mt-3 w-screen max-w-7xl bg-white border-t border-gray-200 shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                    <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-4 gap-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3"><a href="#" className="hover:text-blue-600">Beverages</a></h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li><a href="#" className="hover:text-blue-600">Cold Drinks</a></li>
                          <li><a href="#" className="hover:text-blue-600">Beer Items</a></li>
                          <li><a href="#" className="hover:text-blue-600">Carbonated</a></li>
                          <li><a href="#" className="hover:text-blue-600">Plant Drinks</a></li>
                          <li><a href="#" className="hover:text-blue-600">Juices Items</a></li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3"><a href="#" className="hover:text-blue-600">Dairy Items</a></h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li><a href="#" className="hover:text-blue-600">Bread Items</a></li>
                          <li><a href="#" className="hover:text-blue-600">Ice Cream</a></li>
                          <li><a href="#" className="hover:text-blue-600">Butter Items</a></li>
                          <li><a href="#" className="hover:text-blue-600">Cookies Items</a></li>
                          <li><a href="#" className="hover:text-blue-600">Cheese Items</a></li>
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
                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 mr-1">Special</a>
                    <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full ml-1 font-medium">SALE</span>
                    <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
                  </div>
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-violet-100">Category 1</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-violet-100">Category 2</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-violet-100">Category 3</a>
                  </div>
                </div>

                <div className="flex items-center">
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 mr-1">Categories</a>
                  <span className="bg-violet-500 text-white text-xs px-2 py-0.5 rounded-full ml-1 font-medium">HOT</span>
                  <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
                </div>

                <div className="flex items-center">
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 mr-1">Top Deals</a>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>

                <div className='relative group'>
                  <div className="flex items-center">
                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 mr-1">Elements</a>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="absolute -ml-5 mt-3 w-30 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50 font-medium text-sm">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-violet-100">About Us</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-violet-100">Blogs</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-violet-100">Contact</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-violet-100">FAQs</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-violet-100">Compare</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-violet-100">Wishlist</a>
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