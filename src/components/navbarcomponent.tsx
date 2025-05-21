import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logoroyalimagotipo.png';

export default function Navbar() {

  const [ cookie, removeCookie ] = useCookies(['RoyalUserToken']);
  const [ dropdownOpen, setDropdownOpen ] = useState<boolean>(false);
  const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>();
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

  const goToLogin = () => navigate('/login');
  const goToInicio = () => navigate('/');
  const goToProfile = () => navigate('/user-profile');
  const goToCentroAyuda = () => navigate('/help-center');
  const goToRecommendation = () => navigate('/#recommendation');
  const goToMisTiquetes = () => navigate('/my-tickets');

  const handleLogout = () => {
    setIsAuthenticated(false);
    removeCookie('RoyalUserToken', "");
  };


  return (
    <nav className="bg-gradient-to-r sticky from-indigo-900 to-purple-800 text-white py-3 px-4 lg:px-8 lg:py-4 flex justify-between items-center top-0 z-50 shadow-lg">
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
          <div className='hidden md:flex gap-5'>
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

        {/* Perfil o Inicio de Sesión */}
        <li className="relative ml-1">
          {isAuthenticated ? (
  <div className="group flex flex-row gap-0 md:gap-2 justify-center">
    <p className="mt-2 text-center hidden md:block">Hola, Viajer@!</p>

    <button
      onClick={toggleDropdown}
      className="flex items-center justify-center bg-purple-300 w-10 h-10 rounded-full text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <span className="icon-[hugeicons--user-circle-02] size-8" />
    </button>

    {/* Desktop dropdown */}
    <div className="hidden md:block">
      {dropdownOpen && (
        <div className="absolute right-0 mt-11 w-56 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-100">
          <div className="py-1">
            <button onClick={goToProfile} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 text-sm hover:cursor-pointer">Mi Perfil</button>
            <button onClick={goToMisTiquetes} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 text-sm hover:cursor-pointer">Mis Tiquetes</button>
            <div className="border-t border-gray-100"></div>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 text-sm hover:cursor-pointer">Cerrar Sesión</button>
          </div>
        </div>
      )}
    </div>

    {/* Mobile Sidebar */}
    {dropdownOpen && (
      <div className="fixed inset-0 z-50 flex md:hidden">
        <div
          className={`
            fixed right-0 top-0 h-full w-58 bg-lilac shadow-xl p-4 flex flex-col gap-4
            transform transition-transform duration-300 ease-in-out
            ${dropdownOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold text-white">Hola, Viajer@</p>
            <button
              onClick={toggleDropdown}
              className="text-white hover:text-gold text-2xl hover:cursor-pointer "
            >
              <span className="icon-[material-symbols--close]" />
            </button>
          </div>

          <button
            onClick={goToProfile}
            className="text-left px-4 py-2 text-white hover:bg-gold hover:text-lilac hover:cursor-pointer transition duration-200 text-sm"
          >
            Mi Perfil
          </button>
          <button
            onClick={goToMisTiquetes}
            className="text-left px-4 py-2 text-white hover:bg-gold hover:text-lilac hover:cursor-pointer  transition duration-200 text-sm"
          >
            Mis Tiquetes
          </button>
          <div className="border-t border-white my-2"></div>
            <button
              onClick={handleLogout}
              className="text-left px-4 py-2 text-white hover:bg-gold hover:cursor-pointer  transition duration-200 text-sm"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}

      </div>
    ) : (
      <button
        className="bg-gold w-34 lg:w-auto hover:cursor-pointer text-white font-semibold px-3 lg:px-8 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
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