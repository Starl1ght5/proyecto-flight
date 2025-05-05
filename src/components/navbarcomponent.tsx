import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logoroyalimagotipo.png';

function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}

export default function Navbar() {
  const [cookie, removeCookie] = useCookies(['RoyalUserToken']);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const navigate = useNavigate();

  useEffect(() => {
    const checkCookie = () => {
      const doesCookieExist = !cookie.RoyalUserToken || cookie.RoyalUserToken === "";
      setIsAuthenticated(!doesCookieExist);
    }
    checkCookie();
  }, [cookie])

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  // Funciones de navegación
  const goToLogin = () => navigate('/login');
  const goToInicio = () => navigate('/');
  const goToProfile = () => navigate('/user-profile');
  const goToMiCartera = () => navigate('/wallet');
  const goToCentroAyuda = () => navigate('/help-center');
  const goToRecommendation = () => navigate('/#recommendation');

  const handleLogout = () => {
    setIsAuthenticated(false);
    removeCookie('RoyalUserToken', "");
  };

  const [width] = useWindowSize();
  const isMobile = width < 768;

  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white py-3 px-4 lg:px-8 lg:py-4 flex justify-between items-center top-0 z-50 shadow-lg">
      {/* Logo */}
      <div 
        className="items-center lg:text-2xl text-xl flex flex-row lg:gap-2 gap-1.5 font-extrabold text-white transition-all duration-300 cursor-pointer"
        onClick={goToInicio}
      >
        <img src={logo} alt='logo' className='lg:w-15 w-14' />
        ROYAL Airlines
      </div>

      <div className="w-10" ></div>

      {/* Menú principal */}
      <ul className="flex items-center gap-1 lg:gap-0 lg:space-x-5">

        {/* Centro de Ayuda */}
        {!isMobile && ( 
          <div className='flex flex-row gap-5'>
            <li>
              <button
                className="text-white hover:cursor-pointer hover:text-amber-300 font-medium transition-all duration-300 hover:scale-105 text-sm"
                onClick={goToRecommendation}
              >
                ¿No sabes a donde ir?
              </button>
            </li>
            <li>
              <button
                className="text-white hover:cursor-pointer hover:text-amber-300 font-medium transition-all duration-300 hover:scale-105 text-sm"
                onClick={goToCentroAyuda}
              >
                Centro de Ayuda
              </button>
            </li>
          </div>
          )}

        {/* Perfil o Inicio de Sesión */}
        <li className="relative ml-1">
          {isAuthenticated ? (
            <div className="group flex flex-row gap-2">
              <p className="mt-2">Hola, Viajer@!</p>
              <button
                onClick={() => toggleDropdown}
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

              {dropdownOpen && (
                <div className="absolute right-0 mt-11 w-56 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-100">
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
              className="bg-gold w-34 lg:w-auto text-white font-semibold px-3 lg:px-8 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
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