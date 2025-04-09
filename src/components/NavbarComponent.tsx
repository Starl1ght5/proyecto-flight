import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [cookie, removeCookie] = useCookies(['RoyalUserToken']);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const navigate = useNavigate();

  useEffect(() => {
    const checkCookie = () => {
      const doesCookieExist = !cookie.RoyalUserToken || cookie.RoyalUserToken === "";
      setIsAuthenticated(!doesCookieExist);
    }
    checkCookie();
  }, [cookie])

  const toggleDropdown = (menu) => {
    setDropdownOpen((prev) => (prev === menu ? null : menu));
  };

  // Funciones de navegación
  const goToLogin = () => navigate('/login');
  const goToInicio = () => navigate('/');
  const goToProfile = () => navigate('/profile');
  const goToMiCartera = () => navigate('/micartera');
  const goToCentroAyuda = () => navigate('/centro-ayuda');
  const handleLogout = () => {
    setIsAuthenticated(false);
    removeCookie('RoyalUserToken', "");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white px-8 py-4 flex justify-between items-center top-0 z-50 shadow-lg">
      {/* Logo */}
      <div 
        className="text-3xl font-extrabold text-white transition-all duration-300 cursor-pointer"
        onClick={goToInicio}
      >
        ROYAL Airlines
      </div>

      {/* Menú principal */}
      <ul className="flex items-center space-x-5">
        <li>
          <button
            className="text-white hover:text-amber-300 font-medium transition-all duration-300 hover:scale-105 text-sm"
            onClick={goToInicio}
          >
            Reservar
          </button>
        </li>

        {/* Centro de Ayuda */}
        <li>
          <button
            className="text-white hover:text-amber-300 font-medium transition-all duration-300 hover:scale-105 text-sm"
            onClick={goToCentroAyuda}
          >
            Centro de Ayuda
          </button>
        </li>

        {/* Perfil o Inicio de Sesión */}
        <li className="relative ml-1">
          {isAuthenticated ? (
            <div className="group">
              <button
                onClick={() => toggleDropdown('perfil')}
                className="flex items-center justify-center bg-purple-300 w-10 h-10 rounded-full text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  fill="currentColor" 
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
              </button>

              {dropdownOpen === 'perfil' && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-100">
                  <div className="py-1">
                    <button
                      onClick={goToProfile}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 text-sm"
                    >
                      Editar Perfil
                    </button>
                    <button
                      onClick={goToMiCartera}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 text-sm"
                    >
                      Mi Wallet
                    </button>
                    <button
                      onClick={goToCentroAyuda}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 text-sm"
                    >
                      Centro de Ayuda
                    </button>
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 text-sm"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              className="bg-gold text-white font-semibold px-8 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
              onClick={goToLogin}
            >
              Iniciar Sesión
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};