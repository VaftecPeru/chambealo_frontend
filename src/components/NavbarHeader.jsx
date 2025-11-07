import { useEffect, useState, useRef } from "react";
import { User, Globe, DollarSign } from "lucide-react"
import { Link } from "react-router-dom"

function NavbarHeader() {
  const [currentUser, setCurrentUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user && user.email) {
      setCurrentUser(user);
    }
  }, []);

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedInside = false;
      
      Object.values(dropdownRefs.current).forEach(ref => {
        if (ref && ref.contains(event.target)) {
          clickedInside = true;
        }
      });

      if (!clickedInside) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    window.location.href = "/";
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleOptionClick = () => {
    setOpenDropdown(null);
  };

  const setDropdownRef = (name, ref) => {
    dropdownRefs.current[name] = ref;
  };

  return (
    <div className="bg-[#670cb7] text-white text-sm py-2">
      {/* Contenedor principal con flex-col en móvil y flex-row en PC */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 gap-2 sm:gap-0">
        
        {/* Texto promocional - En móvil va arriba, en PC a la izquierda */}
        <span className="font-medium tracking-wide text-center sm:text-left order-1 sm:order-none w-full sm:w-auto">
          Ahorra hasta un 20% en todos los juguetes y accesorios con el código "FLAT26OFF"
        </span>
        
        {/* Dropdowns - En móvil van abajo, en PC a la derecha */}
        <div className="flex gap-2 order-2 sm:order-none justify-center sm:justify-start w-full sm:w-auto">
          
          {/* Dropdown Moneda */}
          <div 
            className="relative"
            ref={ref => setDropdownRef('currency', ref)}
          >
            <button 
              onClick={() => toggleDropdown('currency')}
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20"
            >
              <DollarSign size={16} />
              United States
              <span className="hidden xs:inline">United States (USD $)</span>
              <svg viewBox="0 0 20 20" fill="currentColor" className="-mr-1 size-5 text-white">
                <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
              </svg>
            </button>
            
            {openDropdown === 'currency' && (
              <div className="absolute left-0 mt-2 w-48 sm:w-54 rounded-md bg-white shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <a href="#" onClick={handleOptionClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">France (EUR €)</a>
                  <a href="#" onClick={handleOptionClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Romania (RON Lei)</a>
                  <a href="#" onClick={handleOptionClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Russia (RUB ₹)</a>
                  <a href="#" onClick={handleOptionClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Saudi Arabia (SAR ر.س)</a>
                  <a href="#" onClick={handleOptionClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Spain (EUR €)</a>
                  <a href="#" onClick={handleOptionClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">United States (USD $)</a>
                </div>
              </div>
            )}
          </div>

          {/* Dropdown Idioma */}
          <div 
            className="relative"
            ref={ref => setDropdownRef('language', ref)}
          >
            <button 
              onClick={() => toggleDropdown('language')}
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20"
            >
              <Globe size={16} />
              Idioma :
              <span className="hidden xs:inline">Idioma</span>
              <svg viewBox="0 0 20 20" fill="currentColor" className="-mr-1 size-5 text-white">
                <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
              </svg>
            </button>
            
            {openDropdown === 'language' && (
              <div className="absolute left-0 mt-2 w-40 sm:w-35 rounded-md bg-white shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <a href="#" onClick={handleOptionClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">English</a>
                  <a href="#" onClick={handleOptionClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">اَلْعَرَبِيَّة</a>
                  <a href="#" onClick={handleOptionClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Français</a>
                  <a href="#" onClick={handleOptionClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">ру́сский</a>
                  <a href="#" onClick={handleOptionClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Español</a>
                  <a href="#" onClick={handleOptionClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">româna</a>
                </div>
              </div>
            )}
          </div>

          {/* Dropdown Cuenta */}
          <div 
            className="relative"
            ref={ref => setDropdownRef('account', ref)}
          >
            <button
              onClick={() => toggleDropdown('account')}
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20"
            >
              <User size={16} />
              Mi Cuenta
              <span className="hidden xs:inline">{currentUser ? currentUser.email : "Mi cuenta"}</span>
              <svg viewBox="0 0 20 20" fill="currentColor" className="-mr-1 size-5 text-white">
                <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
              </svg>
            </button>
            
            {openDropdown === 'account' && (
              <div className="absolute left-0 mt-2 w-48 sm:w-38 rounded-md bg-white shadow-lg border border-gray-200 z-50 min-w-[140px]">
                <div className="py-1">
                  {!currentUser ? (
                    <>
                      <Link to="/Login" onClick={handleOptionClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Inicio de Sesión</Link>
                      <Link to="/Register" onClick={handleOptionClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Registrarse</Link>
                    </>
                  ) : (
                    <>
                      <a href="#" onClick={handleOptionClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Compare (0)</a>
                      <a href="#" onClick={handleOptionClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Lista de Compras (0)</a>
                      <span className="block px-4 py-2 text-sm text-gray-700 border-t border-gray-200 mt-1 pt-1">
                        {currentUser.email}
                      </span>
                      <button 
                        onClick={() => {
                          handleOptionClick();
                          handleLogout();
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-200"
                      >
                        Desconectarse
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarHeader