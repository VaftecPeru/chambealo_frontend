import '../styles/Navbar.css'
import { useState } from 'react';
import { Search, PhoneCall, ShoppingCart, Menu, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';



const Navbar = () => {
  const [openDropdowns, setOpenDropdowns] = useState({
    bakery: false,
    chips: false,
    beverages: false,
    milk: false,
    seafood: false,
    dairy: false,
  });

  const toggleDropdown = (name) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-25">
          {/* Logo */}
          <Link to={'/'}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <img
                    src="/img/logo_chambealo1.png"
                    alt="Logo Chambealo"
                    className="max-h-30 w-auto object-contain mr-5"
                  />
                </div>
              </div>
            </div>
          </Link>
          {/* Search bar */}
          <div className="input flex-1">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-blue-500 group-focus-within:text-blue-500" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 bg-white-500 text-gray-800 placeholder-gray-400 rounded-xl border border-gray-200
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          transition-all duration-300 transform
                          hover:bg-white-50 hover:shadow-md hover:border-blue-300 hover:placeholder-blue-500"
                placeholder="Search for items..."
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-gray-700">
              <PhoneCall className="h-8 w-6 ml-5" />
              <div className="text-sm">
                <div className="font-medium">Need Help?</div>
                <div className="text-blue-600">+01 123 456 789</div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="relative">
                <ShoppingCart className="h-8 w-8 text-gray-700" />
                <span className="absolute -top-2 -right-15 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </div>
              <div className="ml-2 text-sm">
                <div className="font-medium text-gray-700">Cart</div>
                <div className="text-gray-600">0,00 lei</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex items-center h-12">

            {/* Shop by Departments - Hover Dropdown */}
            <div className="flex items-center mr-8 mr-auto relative group">
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                <Menu className="h-4 w-4 mr-2 text-gray-600" />
                Shop by Departments
                <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
              </button>

              <div
                className="absolute left-0 top-full mt-3 -ml-12 w-64 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden 
                           max-h-0 opacity-0 group-hover:max-h-[2000px] group-hover:opacity-100 
                           transition-all duration-300 ease-in-out z-50"
              >
                <ul className="py-2">

                  {/* Our Store */}
                  <li>
                    <Link to='/OurStore'
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    >
                      Our Store
                    </Link>
                  </li>

                  {/* Bakery */}
                  <li>
                    <button
                      className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      onClick={() => toggleDropdown('bakery')}
                    >
                      Bakery
                      <span>{openDropdowns.bakery ? '-' : '+'}</span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdowns.bakery ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <ul className="pl-4">
                        {["Biscuits", "Cookies", "Wafers", "Cake"].map((item, i) => (
                          <li key={i}>
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600">{item}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>

                  {/* Vegetables */}
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    >
                      Vegetables
                    </a>
                  </li>

                  {/* Chips / Snacks */}
                  <li>
                    <button
                      className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      onClick={() => toggleDropdown('chips')}
                    >
                      Chips / Snacks Item
                      <span>{openDropdowns.chips ? '-' : '+'}</span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdowns.chips ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <ul className="pl-4">
                        {["Crackers", "Bars", "Chips", "Toast"].map((item, i) => (
                          <li key={i}>
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600">{item}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>

                  {/* Beverages */}
                  <li>
                    <button
                      className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      onClick={() => toggleDropdown('beverages')}
                    >
                      Beverages
                      <span>{openDropdowns.beverages ? '-' : '+'}</span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdowns.beverages ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <ul className="pl-4">
                        {["Cold Drinks", "Beer Items", "Carbonated", "Plant Drinks", "Juices Items"].map((item, i) => (
                          <li key={i}>
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600">{item}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>

                  {/* Milk Items */}
                  <li>
                    <button
                      className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      onClick={() => toggleDropdown('milk')}
                    >
                      Milk Items
                      <span>{openDropdowns.milk ? '-' : '+'}</span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdowns.milk ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <ul className="pl-4">
                        {["Coffe", "Cream", "Chocolate", "Milk"].map((item, i) => (
                          <li key={i}>
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600">{item}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>

                  {/* Sea food */}
                  <li>
                    <button
                      className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      onClick={() => toggleDropdown('seafood')}
                    >
                      Sea food
                      <span>{openDropdowns.seafood ? '-' : '+'}</span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdowns.seafood ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <ul className="pl-4">
                        {["Meats", "Chiken", "Eggs", "Poultry"].map((item, i) => (
                          <li key={i}>
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600">{item}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>

                  {/* Toast */}
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    >
                      Toast
                    </a>
                  </li>

                  {/* Dairy Items */}
                  <li>
                    <button
                      className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      onClick={() => toggleDropdown('dairy')}
                    >
                      Dairy Items
                      <span>{openDropdowns.dairy ? '-' : '+'}</span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdowns.dairy ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <ul className="pl-4">
                        {["Bread Items", "Ice Cream", "Butter Items", "Cookies Items", "Cheese Items"].map((item, i) => (
                          <li key={i}>
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600">{item}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>

                </ul>
              </div>
            </div>

            {/* Navigation items */}
            <div className="flex space-x-8">
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                Home
              </a>

              <div className='relative group'>
                <div className="flex items-center">
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 mr-1">
                    Our Store
                  </a>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
                {/* Menu de OurStore Navbar */}
                <div className="absolute -ml-150 mt-3 w-screen max-w-7xl bg-white border-t border-gray-200 shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                  <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-4 gap-6">
                    {/* Columna 1 */}
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

                    {/* Columna 2 */}
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

                    {/* Columna 3: la primera imagen */}
                    <div className="flex justify-center">
                      <img src="/img/mainCard1.png" alt="Oferta 1" className="rounded-lg w-auto h-auto object-cover"/>
                    </div>

                    {/* Columna 4: la segunda imagen */}
                    <div className="flex justify-center">
                      <img src="/img/mainCard2.png" alt="Oferta 2" className="rounded-lg w-auto h-auto object-cover"/>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resto de items del Navbar */}
              <div className='relative group'>
                <div className="flex items-center">
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 mr-1">
                    Special
                  </a>
                  <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full ml-1 font-medium">
                    SALE
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
                </div>
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-violet-100">Category 1</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-violet-100">Category 2</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-violet-100">Category 3</a>
                </div>
              </div>

              <div className="flex items-center">
                <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 mr-1">
                  Categories
                </a>
                <span className="bg-violet-500 text-white text-xs px-2 py-0.5 rounded-full ml-1 font-medium">
                  HOT
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
              </div>

              <div className="flex items-center">
                <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 mr-1">
                  Top Deals
                </a>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>

              <div className='relative group'>
                <div className="flex items-center">
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 mr-1">
                    Elements
                  </a>
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
    </nav>
  );
};



export default Navbar;
