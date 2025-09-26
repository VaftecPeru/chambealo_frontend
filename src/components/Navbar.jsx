import '../styles/Navbar.css'
import { Search, PhoneCall, ShoppingCart, Menu, ChevronDown, } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
            <div className="flex items-center">
            <div className="flex-shrink-0">
                <div className="flex items-center">
                <img
                    src="/public/img/logo.png"  
                    alt="Logo Grocy"
                    className="w-40 h-40 object-contain mr-2"
                />
                </div>
            </div>
            </div>

          {/* Search bar */}
            <div className="input flex-1">
                <div className="relative group">
                    {/* Icono de búsqueda */}
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-blue-500 group-focus-within:text-blue-500" />
                    </div>
                    {/* Input */}
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
            {/* Help */}
            <div className="flex items-center text-gray-700">
              <PhoneCall className="h-8 w-6 mr-2" />
              <div className="text-sm">
                <div className="font-medium">Need Help?</div>
                <div className="text-blue-600">+01 123 456 789</div>
              </div>
            </div>

            {/* Cart */}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 ">
          <div className="flex items-center h-12">
            {/* Shop by Departments */}
            <div className="flex items-center mr-8 mr-auto">
              <Menu className="h-4 w-4 mr-2 text-gray-600" />
              <span className="text-sm font-medium text-gray-700 mr-1">Shop by Departments</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>

            {/* Navigation items */}
            <div className="flex space-x-8">
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                Home
              </a>
              
              <div className="flex items-center">
                <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 mr-1">
                  Our Store
                </a>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>

              <div className="flex items-center">
                <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 mr-1">
                  Special
                </a>
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full ml-1 font-medium">
                  SALE
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
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

              <div className="flex items-center">
                <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 mr-1">
                  Elements
                </a>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;