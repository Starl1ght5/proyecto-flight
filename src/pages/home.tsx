import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Location } from "../types.tsx";
import { LocationCard } from "../components/cards/locationcard.tsx";
import { Helmet } from "react-helmet";
import Navbar from '../components/navbarcomponent.tsx';
import Footer from '../components/footercomponent.tsx';
import fondo from '../assets/alerofondo.webp';

interface DropdownProps {
  label: string;
  options: string[];
  selected: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, selected, isOpen, onToggle, onSelect }) => (
  <div className="relative">
    <motion.button
      onClick={onToggle}
      type="button"
      className="flex items-center justify-between gap-3 px-4 py-2.5 bg-white text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 border-2 border-gray-200 hover:border-blue-400 min-w-[140px] text-sm font-semibold shadow-sm hover:shadow-md"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{label}</span>
      <motion.svg
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </motion.svg>
    </motion.button>
    {isOpen && (
      <motion.ul
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute mt-2 w-full bg-white text-gray-900 shadow-2xl rounded-xl z-20 border-2 border-gray-200 overflow-hidden"
      >
        {options.map((option, index) => (
          <motion.li
            key={option}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => { onSelect(option); onToggle(); }}
            className={`px-4 py-3 cursor-pointer text-sm font-semibold transition-all ${
              selected === option
                ? 'bg-gray-900 text-white'
                : 'hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            {option}
          </motion.li>
        ))}
      </motion.ul>
    )}
  </div>
);

const HeroSection = () => {
  const [dropdownOpen, setDropdownOpen] = useState<'tripType' | 'classType' | 'passengerType' | null>(null);
  const [selectedTripType, setSelectedTripType] = useState<string>('Ida y Vuelta');
  const [selectedClass, setSelectedClass] = useState<string>('Basic');
  const [selectedPassenger, setSelectedPassenger] = useState<string>('1 Adulto');
  
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Parallax effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const toggleDropdown = (type: 'tripType' | 'classType' | 'passengerType') => {
    setDropdownOpen(prev => prev === type ? null : type);
  };

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchLocations = async () => {
      try {
        setIsLoading(true);
        setApiError(null);

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}locations/?size=6&featured=true`,
          { signal: controller.signal }
        );
        
        if (!response.ok) {
          throw new Error(`Error de servidor: ${response.status}`);
        }

        const res = await response.json();
        const data = Array.isArray(res) ? res : (res.content || []);
        setLocations(data);

      } catch (e: any) {
        if (e.name !== 'AbortError') {
          console.error("Fallo al conectar con el API:", e.message);
          setApiError("No pudimos cargar los destinos en este momento.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const origen = (form.elements.namedItem('origen') as HTMLInputElement).value.trim();
    const destino = (form.elements.namedItem('destino') as HTMLInputElement).value.trim();
    const ida = (form.elements.namedItem('ida') as HTMLInputElement).value;
    const vuelta = selectedTripType === 'Ida y Vuelta' ? (form.elements.namedItem('vuelta') as HTMLInputElement).value : '';

    if (!origen || !destino || !ida || (selectedTripType === 'Ida y Vuelta' && !vuelta)) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const passengerMap: Record<string, number> = { '1 Adulto': 1, '2 Adultos': 2, 'Niño': 1, 'Bebé': 1 };
    const pCount = passengerMap[selectedPassenger] || 1;

    navigate(`/search-results?origen=${origen}&destino=${destino}&ida=${ida}&vuelta=${vuelta}&passengers=${pCount}`);
  };

  return (
    <div className="bg-white overflow-x-hidden">
      <Helmet><title>Royal Airlines - Reserva tu vuelo</title></Helmet>
      <Navbar />

      {/* Hero Section con Parallax */}
      <div className="relative h-[90vh] lg:h-[95vh] overflow-hidden">
        {/* Background con parallax */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-cover bg-center scale-110"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${fondo})` }}
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        
        <motion.div
          style={{ opacity }}
          className="relative z-10 h-full flex flex-col justify-center items-center px-4 lg:px-8"
        >
          {/* Título animado */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Descubre el mundo con{" "}
              <motion.span
                className="text-blue-400 inline-block"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Royal Airlines
              </motion.span>
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Tu viaje comienza aquí. Vuela con estilo, confort y seguridad.
            </motion.p>
          </motion.div>

          {/* Formulario de búsqueda animado */}
          <motion.div
            className="w-full max-w-5xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 lg:p-8 border-2 border-white/20">
              {/* Dropdowns */}
              <motion.div
                className="flex flex-wrap gap-3 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Dropdown
                  label={selectedTripType}
                  options={['Ida y Vuelta', 'Solo Ida']}
                  selected={selectedTripType}
                  isOpen={dropdownOpen === 'tripType'}
                  onToggle={() => toggleDropdown('tripType')}
                  onSelect={setSelectedTripType}
                />
                <Dropdown
                  label={selectedClass}
                  options={['Basic', 'Complete', 'Royal']}
                  selected={selectedClass}
                  isOpen={dropdownOpen === 'classType'}
                  onToggle={() => toggleDropdown('classType')}
                  onSelect={setSelectedClass}
                />
                <Dropdown
                  label={selectedPassenger}
                  options={['1 Adulto', '2 Adultos', 'Niño', 'Bebé']}
                  selected={selectedPassenger}
                  isOpen={dropdownOpen === 'passengerType'}
                  onToggle={() => toggleDropdown('passengerType')}
                  onSelect={setSelectedPassenger}
                />
              </motion.div>

              {/* Form inputs */}
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <input
                    name="origen"
                    type="text"
                    placeholder="Origen (Ciudad)"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-semibold hover:border-gray-300"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <input
                    name="destino"
                    type="text"
                    placeholder="Destino (Ciudad)"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-semibold hover:border-gray-300"
                    required
                  />
                </motion.div>

                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                >
                  <label className="text-xs font-bold text-gray-600 mb-2 ml-1">Fecha de Ida</label>
                  <input
                    name="ida"
                    type="date"
                    className="p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-semibold"
                    required
                  />
                </motion.div>

                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                >
                  <label className="text-xs font-bold text-gray-600 mb-2 ml-1">Fecha de Vuelta</label>
                  <input
                    name="vuelta"
                    type="date"
                    disabled={selectedTripType === 'Solo Ida'}
                    className="p-4 border-2 border-gray-200 rounded-xl disabled:bg-gray-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-semibold"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="md:col-span-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white py-4 rounded-xl font-bold hover:from-blue-600 hover:to-blue-800 transform active:scale-[0.98] transition-all shadow-lg hover:shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Buscar vuelos disponibles
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Sección de Destinos con animaciones */}
      <div className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white" id="destinos">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Destinos Populares
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explora los destinos más increíbles con las mejores tarifas
            </p>
          </motion.div>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center py-10"
            >
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </motion.div>
          )}
          
          {apiError && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center text-red-600 font-semibold bg-red-50 p-6 rounded-2xl border-2 border-red-200"
            >
              {apiError}
            </motion.p>
          )}
          
          {!isLoading && !apiError && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locations.length > 0 ? (
                locations.map((loc, index) => (
                  <motion.div
                    key={loc.locationID}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <LocationCard
                      {...loc}
                      locationID={loc.locationID.toString()}
                      countryName={loc.countryName || ""}
                      airportName={loc.airportName || ""}
                      activities={loc.activities}
                      featured={false}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center text-gray-400 py-10 text-lg"
                >
                  No encontramos destinos disponibles en este momento.
                </motion.p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stats Section - Nueva sección animada */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Destinos" },
              { number: "1M+", label: "Pasajeros" },
              { number: "99%", label: "Satisfacción" },
              { number: "24/7", label: "Soporte" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.h3
                  className="text-4xl md:text-5xl font-bold text-blue-400 mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-gray-300 font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default HeroSection;