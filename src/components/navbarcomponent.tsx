import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logoroyalimagotipo.png";

export default function Navbar() {
  const [cookies, , removeCookie] = useCookies(["RoyalUserToken"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(Boolean(cookies.RoyalUserToken));
  }, [cookies]);

  // Efecto de scroll para cambiar el navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    removeCookie("RoyalUserToken", { path: "/" });
    setIsAuthenticated(false);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b-2 border-gray-100"
          : "bg-white border-b border-gray-200"
      } px-6 lg:px-12 py-4`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        
        {/* LOGO con animación */}
        <motion.div
          onClick={() => navigateTo("/")}
          className="flex items-center gap-3 cursor-pointer group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.img
            src={logo}
            alt="Royal Airlines Logo"
            className="w-10 lg:w-12"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          />
          <span className="hidden sm:block font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
            Royal Airlines
          </span>
        </motion.div>

        {/* NAV DESKTOP - Mejorado */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink onClick={() => navigateTo("/#recommendation")}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ¿No sabes a dónde ir?
          </NavLink>

          <NavLink onClick={() => navigateTo("/explore")}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            Explorar
          </NavLink>
          
          <NavLink onClick={() => navigateTo("/help-center")}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Centro de Ayuda
          </NavLink>

        </div>

        {/* PERFIL / LOGIN */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            {isAuthenticated ? (
              <div className="relative">
                {/* Botón de usuario mejorado */}
                <motion.button  
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="group flex items-center gap-3 px-4 py-2 rounded-full border-2 border-gray-200 hover:border-blue-500 bg-white hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="bg-gradient-to-br from-gray-900 to-gray-700 w-9 h-9 rounded-full text-white flex items-center justify-center group-hover:from-blue-600 group-hover:to-blue-800 transition-all duration-200 shadow-md">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 hidden lg:block">
                    Mi Cuenta
                  </span>
                  <motion.svg
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.button>

                {/* Dropdown Menu con animación */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setDropdownOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden z-20"
                      >
                        {/* Header del dropdown */}
                        <div className="px-5 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-gray-100">
                          <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">Mi Gestión</p>
                          <p className="text-sm text-gray-500 mt-0.5">Royal Airlines</p>
                        </div>

                        {/* Menu items */}
                        <div className="py-2">
                          <DropdownItem
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                            onClick={() => navigateTo("/user-profile")}
                            color="gray"
                          >
                            Mi Perfil
                          </DropdownItem>

                          <DropdownItem
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>}
                            onClick={() => navigateTo("/my-tickets")}
                            color="gray"
                          >
                            Mis Tiquetes
                          </DropdownItem>

                          <DropdownItem
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3a6.75 6.75 0 100 13.5A6.75 6.75 0 009.75 3zM21 21l-6-6" /></svg>}
                            onClick={() => navigateTo("/travel-optimizer")}
                            color="indigo"
                          >
                            Optimizar Viaje
                          </DropdownItem>

                          <DropdownItem
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
                            onClick={() => navigateTo("/carbon-tracker")}
                            color="emerald"
                          >
                            Sostenibilidad
                          </DropdownItem>
                        </div>

                        {/* Logout section */}
                        <div className="border-t-2 border-gray-100 bg-gradient-to-r from-red-50/50 to-pink-50/50">
                          <motion.button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-5 py-4 text-sm font-bold text-red-600 hover:bg-red-100 transition-all group"
                            whileHover={{ x: 5 }}
                          >
                            <div className="w-9 h-9 rounded-xl bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                            </div>
                            <span>Cerrar Sesión</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                onClick={() => navigateTo("/login")}
                className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-2.5 rounded-xl font-bold hover:from-blue-600 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Iniciar Sesión
              </motion.button>
            )}
          </div>

          {/* HAMBURGER mejorado */}
          <motion.button
            className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* MOBILE MENU con animación */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b-2 border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
                  <span className="font-bold text-xl text-gray-900">Menú</span>
                  <motion.button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Menu items */}
                <nav className="flex flex-col gap-2 p-6 flex-1 overflow-y-auto">
                  <MobileMenuItem
                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    onClick={() => navigateTo("/#recommendation")}
                  >
                    ¿No sabes a dónde ir?
                  </MobileMenuItem>

                  <MobileMenuItem
                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>}
                    onClick={() => navigateTo("/explore")}
                  >
                    Explorar
                  </MobileMenuItem>

                  <MobileMenuItem
                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    onClick={() => navigateTo("/help-center")}
                  >
                    Centro de Ayuda
                  </MobileMenuItem>

                  <div className="border-t-2 border-gray-200 my-4" />

                  {isAuthenticated ? (
                    <>
                      <MobileMenuItem
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                        onClick={() => navigateTo("/user-profile")}
                      >
                        Mi Perfil
                      </MobileMenuItem>

                      <MobileMenuItem
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>}
                        onClick={() => navigateTo("/my-tickets")}
                      >
                        Mis Tiquetes
                      </MobileMenuItem>

                      <MobileMenuItem
                        icon={<svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
                        onClick={() => navigateTo("/carbon-tracker")}
                        highlighted
                      >
                        Sostenibilidad
                      </MobileMenuItem>

                      <motion.button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-4"
                        whileHover={{ x: 5 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Cerrar Sesión
                      </motion.button>
                    </>
                  ) : (
                    <motion.button
                      onClick={() => navigateTo("/login")}
                      className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-4 rounded-xl font-bold mt-4 shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Iniciar Sesión
                    </motion.button>
                  )}
                </nav>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// Componentes auxiliares
const NavLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <motion.button
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.button>
);

const DropdownItem: React.FC<{
  icon: React.ReactNode;
  onClick: () => void;
  children: React.ReactNode;
  color?: "gray" | "indigo" | "emerald";
}> = ({ icon, onClick, children, color = "gray" }) => {
  const colorClasses = {
    gray: "text-gray-700 hover:bg-blue-50 hover:text-blue-600 bg-gray-100 group-hover:bg-blue-100",
    indigo: "text-indigo-700 hover:bg-indigo-50 bg-indigo-100 group-hover:bg-indigo-200",
    emerald: "text-emerald-700 hover:bg-emerald-50 bg-emerald-100 group-hover:bg-emerald-200",
  };

  return (
    <motion.button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold ${colorClasses[color]} transition-all group rounded-lg`}
      whileHover={{ x: 5 }}
    >
      <div className={`w-9 h-9 rounded-xl ${colorClasses[color]} flex items-center justify-center transition-colors`}>
        {icon}
      </div>
      <span>{children}</span>
    </motion.button>
  );
};

const MobileMenuItem: React.FC<{
  icon: React.ReactNode;
  onClick: () => void;
  children: React.ReactNode;
  highlighted?: boolean;
}> = ({ icon, onClick, children, highlighted = false }) => (
  <motion.button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
      highlighted
        ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
        : "text-gray-700 hover:bg-gray-50"
    }`}
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.98 }}
  >
    {icon}
    {children}
  </motion.button>
);