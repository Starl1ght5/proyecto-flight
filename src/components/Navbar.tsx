import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar () {

  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const toggleDropdown = (menu) => {
    setDropdownOpen((prev) => (prev === menu ? null : menu));
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const goToInicio = () => {
    navigate('/');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const goToMiViaje = () => {
    navigate('/viaje');
  };

  const goToMiCartera = () => {
    navigate('/micartera');
  };

  const goToOfertasDestinos = () => {
    navigate('/ofertas-destinos'); // Cambia esta ruta según tu configuración
  };

  const goToCentroAyuda = () => {
    navigate('/centro-ayuda'); // Cambia esta ruta según tu configuración
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="bg-lilac text-white px-6 py-4.5 flex justify-between items-center relative z-10 shadow-xl text-sm">
      <div className="text-bluemint font-bold text-2xl tracking-wider hover:cursor-pointer" onClick={goToInicio} >ROYAL Airlines</div>
      <ul className="flex gap-5 items-center">
        <li>
          <button
            className="text-bluemint hover:text-yellow-500 transition duration-300 ease-in-out"
            onClick={goToInicio}
          >
            Reservar
          </button>
        </li>

        <li className="relative">
          <button
            aria-expanded={dropdownOpen === 'destinos'}
            onClick={() => toggleDropdown('destinos')}
            className="text-bluemint hover:text-yellow-500 flex items-center gap-2 transition duration-300 ease-in-out hover:cursor-pointer"
          >
            Ofertas y Destinos
            <span className={`transform transition-transform ${dropdownOpen === 'destinos' ? 'rotate-180' : 'rotate-0'} flex items-center mt-1`}>
              <span className="icon-[memory--chevron-down] size-4" />
            </span>
          </button>
          {dropdownOpen === 'destinos' && (
            <ul className="absolute left-0 mt-2 bg-white text-black p-3 shadow-lg rounded-lg w-48">
              <li
                className="text-bluemint hover:bg-gray-200 p-2 cursor-pointer"
                onClick={goToOfertasDestinos}
              >
                Ofertas y Destinos
              </li>
              <li className="text-bluemint hover:bg-gray-200 p-2">Promociones</li>
            </ul>
          )}
        </li>

        <li className="relative">
          <button
            aria-expanded={dropdownOpen === 'viajes'}
            onClick={() => toggleDropdown('viajes')}
            className="text-bluemint hover:text-yellow-500 flex items-center gap-2 transition duration-300 ease-in-out hover:cursor-pointer"
          >
            Mis Viajes
            <span className={`transform transition-transform ${dropdownOpen === 'viajes' ? 'rotate-180' : 'rotate-0'} flex items-center mt-1`}>
              <span className="icon-[memory--chevron-down] size-4" />
            </span>
          </button>
          {dropdownOpen === 'viajes' && (
            <ul className="absolute left-0 mt-2 bg-white text-black p-3 shadow-lg rounded-lg w-48">
              <li
                className="text-bluemint hover:bg-gray-200 p-2 cursor-pointer"
                onClick={goToMiViaje}
              >
                Itinerarios
              </li>
              <li className="text-bluemint hover:bg-gray-200 p-2 cursor-pointer">Historial</li>
            </ul>
          )}
        </li>

        <li>
          <button
            className="text-bluemint hover:text-yellow-500 hover:cursor-pointer transition duration-300 ease-in-out"
            onClick={goToCentroAyuda}
          >
            Centro de Ayuda
          </button>
        </li>

        <li className="relative">
          {isAuthenticated ? (
            <div>
              <button
                aria-expanded={dropdownOpen === 'perfil'}
                onClick={() => toggleDropdown('perfil')}
                className="text-bluemint hover:text-yellow-500 flex items-center gap-2 transition duration-300 ease-in-out"
              >
                Perfil
                <span className={`transform transition-transform ${dropdownOpen === 'perfil' ? 'rotate-180' : 'rotate-0'}`}>
                  <span className="icon-[memory--chevron-down]" />
                </span>
              </button>
              {dropdownOpen === 'perfil' && (
                <ul className="absolute right-0 mt-2 bg-white text-black p-3 shadow-lg rounded-lg w-48">
                  <li
                    className="text-bluemint hover:bg-gray-200 p-2 cursor-pointer"
                    onClick={goToProfile}
                  >
                    Mi Cuenta
                  </li>
                  <li
                    className="text-bluemint hover:bg-gray-200 p-2 cursor-pointer"
                    onClick={goToMiViaje}
                  >
                    Mis Viajes
                  </li>
                  <li
                    className="text-bluemint hover:bg-gray-200 p-2 cursor-pointer"
                    onClick={goToMiCartera}
                  >
                    Mi Cartera
                  </li>
                  <li
                    className="text-bluemint hover:bg-gray-200 p-2 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <button
              className="bg-gold border-2 transition box-border border-hidden hover:border-white hover:border-solid duration-300 ease-in-out text-white px-8 py-2 ml-3 rounded-lg shadow-md text-sm hover:cursor-pointer"
              onClick={goToLogin}
            >
              Iniciar Sesion
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};
