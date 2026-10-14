import { useEffect, useState, useRef } from "react";
import { User, ChevronDown, Truck } from "lucide-react";
import { Link } from "react-router-dom";

function NavbarHeader() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user && user.email) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    window.location.href = "/";
  };

  return (
    <div className="bg-[#670cb7] text-white text-xs sm:text-sm py-2 border-b border-purple-900/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6">
        
        {/* Banner Promocional */}
        <div className="flex items-center gap-2">
          <Truck size={16} className="text-white" />
          <span className="font-medium">
            Envíos gratis por compras mayores a <strong>S/ 99</strong>
          </span>
        </div>
        
        {/* Desplegable de Usuario (Hover / Click) */}
        <div 
          className="relative" 
          ref={dropdownRef}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-white/10 transition-colors"
          >
            <User size={15} />
            <span className="font-medium">
              {currentUser ? currentUser.email : "Mi cuenta / Iniciar sesión"}
            </span>
            <ChevronDown size={14} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 top-full pt-1 w-48 z-50">
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 text-gray-800 text-sm">
                {!currentUser ? (
                  <>
                    <Link 
                      to="/Login" 
                      onClick={() => setIsDropdownOpen(false)} 
                      className="block px-4 py-2 hover:bg-purple-50 font-medium text-gray-700"
                    >
                      Iniciar Sesión
                    </Link>
                    <Link 
                      to="/Register" 
                      onClick={() => setIsDropdownOpen(false)} 
                      className="block px-4 py-2 hover:bg-purple-50 font-medium text-gray-700"
                    >
                      Registrarse
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/mis-pedidos" 
                      onClick={() => setIsDropdownOpen(false)} 
                      className="block px-4 py-2 hover:bg-purple-50 font-medium text-gray-700"
                    >
                      Mis Pedidos
                    </Link>
                    <button 
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 font-medium border-t border-gray-100"
                    >
                      Cerrar Sesión
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default NavbarHeader;