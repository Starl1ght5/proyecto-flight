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
      className="flex items-center justify-between gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200"
      style={{
        background: isOpen ? 'rgba(29,78,216,0.2)' : 'rgba(255,255,255,0.05)',
        border: isOpen ? '1px solid rgba(37,99,235,0.5)' : '1px solid rgba(255,255,255,0.1)',
        color: isOpen ? '#93c5fd' : 'rgba(255,255,255,0.6)',
        minWidth: '130px',
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{label}</span>
      <motion.svg
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </motion.svg>
    </motion.button>

    {isOpen && (
      <motion.ul
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="absolute mt-2 w-full z-20 overflow-hidden"
        style={{
          background: '#0f1117',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
        }}
      >
        {options.map((option, index) => (
          <motion.li
            key={option}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.04 }}
            onClick={() => { onSelect(option); onToggle(); }}
            className="px-4 py-2.5 cursor-pointer text-sm font-semibold transition-all"
            style={{
              color: selected === option ? '#3b82f6' : 'rgba(255,255,255,0.6)',
              background: selected === option ? 'rgba(29,78,216,0.15)' : 'transparent',
            }}
            onMouseEnter={e => { if (selected !== option) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={e => { if (selected !== option) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
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
    <div style={{ background: '#0a0c12' }} className="overflow-x-hidden">
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

        {/* Overlay oscuro premium */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(10,12,18,0.82) 0%, rgba(13,16,24,0.65) 50%, rgba(10,12,18,0.92) 100%)',
          }}
        />

        <motion.div
          style={{ opacity }}
          className="relative z-10 h-full flex flex-col justify-center items-center px-4 lg:px-8"
        >
          {/* Título */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: '#3b82f6' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Tu próximo destino te espera
            </motion.p>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
              style={{ color: '#fff', lineHeight: 1.1 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Descubre el mundo con{" "}
              <motion.span
                style={{ color: '#3b82f6' }}
                className="inline-block"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Royal Airlines
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Tu viaje comienza aquí. Vuela con estilo, confort y seguridad.
            </motion.p>
          </motion.div>

          {/* Formulario de búsqueda */}
          <motion.div
            className="w-full max-w-5xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div
              className="backdrop-blur-xl rounded-3xl p-6 lg:p-8"
              style={{
                background: 'rgba(15,17,23,0.95)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
              }}
            >
              {/* Pills de opciones */}
              <motion.div
                className="flex flex-wrap gap-2.5 mb-6"
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

              {/* Inputs */}
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
                    className="w-full p-4 rounded-xl font-semibold outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.75)',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = 'rgba(37,99,235,0.5)';
                      e.currentTarget.style.background = 'rgba(29,78,216,0.06)';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    }}
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
                    className="w-full p-4 rounded-xl font-semibold outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.75)',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = 'rgba(37,99,235,0.5)';
                      e.currentTarget.style.background = 'rgba(29,78,216,0.06)';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    }}
                    required
                  />
                </motion.div>

                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                >
                  <label className="text-xs font-bold mb-2 ml-1" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}>
                    Fecha de Ida
                  </label>
                  <input
                    name="ida"
                    type="date"
                    className="w-full p-4 rounded-xl font-semibold outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.75)',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = 'rgba(37,99,235,0.5)';
                      e.currentTarget.style.background = 'rgba(29,78,216,0.06)';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    }}
                    required
                  />
                </motion.div>

                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                >
                  <label className="text-xs font-bold mb-2 ml-1" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}>
                    Fecha de Vuelta
                  </label>
                  <input
                    name="vuelta"
                    type="date"
                    disabled={selectedTripType === 'Solo Ida'}
                    className="p-4 rounded-xl font-semibold outline-none transition-all"
                    style={{
                      background: selectedTripType === 'Solo Ida' ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: selectedTripType === 'Solo Ida' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.75)',
                      cursor: selectedTripType === 'Solo Ida' ? 'not-allowed' : 'auto',
                    }}
                    onFocus={e => {
                      if (selectedTripType !== 'Solo Ida') {
                        e.currentTarget.style.borderColor = 'rgba(37,99,235,0.5)';
                        e.currentTarget.style.background = 'rgba(29,78,216,0.06)';
                      }
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.background = selectedTripType === 'Solo Ida' ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)';
                    }}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="md:col-span-2 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: '#1d4ed8',
                    color: '#fff',
                    boxShadow: '0 4px 24px rgba(29,78,216,0.4)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  whileHover={{ scale: 1.02, background: '#2563eb' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Buscar vuelos disponibles
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
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <svg className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.5)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Band */}
      <div style={{ background: '#0f1117', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4"
          >
            {[
              { number: "50+", label: "Destinos" },
              { number: "1M+", label: "Pasajeros" },
              { number: "99%", label: "Satisfacción" },
              { number: "24/7", label: "Soporte" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center py-8 px-4"
                style={{ borderRight: index < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
              >
                <motion.h3
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{ color: '#3b82f6' }}
                  whileHover={{ scale: 1.08 }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Destinos Populares */}
      <div style={{ background: '#0a0c12' }} className="py-20 px-4" id="destinos">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#3b82f6' }}>
              Explora el mundo
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Destinos Populares
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Explora los destinos más increíbles con las mejores tarifas
            </p>
          </motion.div>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center py-10"
            >
              <div
                className="animate-spin rounded-full h-12 w-12"
                style={{ borderTop: '2px solid #3b82f6', borderBottom: '2px solid rgba(59,130,246,0.2)', borderLeft: '2px solid rgba(59,130,246,0.2)', borderRight: '2px solid rgba(59,130,246,0.2)' }}
              />
            </motion.div>
          )}

          {apiError && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center font-semibold p-6 rounded-2xl"
              style={{ color: '#f87171', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}
            >
              {apiError}
            </motion.p>
          )}

          {!isLoading && !apiError && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="col-span-full text-center py-10 text-lg"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  No encontramos destinos disponibles en este momento.
                </motion.p>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HeroSection;