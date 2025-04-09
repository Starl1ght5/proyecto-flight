import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocationInfo } from "../Types";
import { LocationCard } from "../Components/Cards/LocationCard";
import { Helmet } from "react-helmet";
import Navbar from '../Components/NavbarComponent';
import Footer from '../Components/FooterComponent';

const Dropdown = ({ label, options, selected, isOpen, onToggle, onSelect }) => (
  <div className="relative">
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-haspopup="true"
      className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white hover:text-purple2 rounded-lg transition-all duration-300 border border-purple-light"
    >
      {label}
      <svg 
        className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    {isOpen && (
      <ul className="absolute mt-1 w-full bg-white text-blueblack p-2 shadow-xl rounded-lg z-10 border border-purple-light">
        {options.map((option) => (
          <li
            key={option}
            onClick={() => {
              onSelect(option);
              onToggle();
            }}
            className={`p-2 cursor-pointer rounded-md transition-colors ${
              selected === option ? 'bg-purple-light text-white' : 'hover:bg-gold hover:text-white'
            }`}
          >
            {option}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const HeroSection = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [selectedTripType, setSelectedTripType] = useState('Ida y Vuelta');
  const [selectedClass, setSelectedClass] = useState('Basic');
  const [selectedPassenger, setSelectedPassenger] = useState('1 Adulto');
  const navigate = useNavigate();
  const [locations, setLocations] = useState<LocationInfo[]>([]);

  const toggleDropdown = (menu: boolean) => {
    setDropdownOpen((prev) => (prev === menu ? null : menu));
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/locations/search?number=6`);
        const res = await response.json();
        setLocations(res);

      } catch (e) {
        console.log(e);
      }
    }
    fetchLocations();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const origen = event.target.origen.value.trim();
    const destino = event.target.destino.value.trim();
    const ida = event.target.ida.value;
    const vuelta = selectedTripType === 'Ida y Vuelta' ? event.target.vuelta.value : '';

    if (!origen || !destino || !ida || (selectedTripType === 'Ida y Vuelta' && !vuelta)) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const passengers = getPassengerCount(selectedPassenger);
    navigate(
      `/search-results?origen=${origen}&destino=${destino}&ida=${ida}&vuelta=${vuelta}&passengers=${passengers}`
    );
  };

  const getPassengerCount = (passengerType: number) => {
    const passengerMap = {
      '1 Adulto': 1,
      '2 Adultos': 2,
      'Niño': 1,
      'Bebé': 1,
    };
    return passengerMap[passengerType] || 0;
  };

  return (
    <div>
      <Helmet>
        <title>Royal Airlines</title>
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <div className="relative h-screen bg-cover bg-center bg-[url(src/assets/Alerofondo.jpeg)]">
        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-blueblack/70 to-purple-dark/80"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-4">
          {/* Títulos */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-xl">
              ROYAL Airlines
            </h1>
            <h2 className="text-2xl md:text-3xl text-purple-light mb-4 drop-shadow-lg">
              Descubre el mundo con nosotros <br /> Reserva tu vuelo al mejor precio y empieza tu próxima aventura 
            </h2>
          </div>

          {/* Formulario de búsqueda */}
          <div className="w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-md border-2 border-purple-light/30 rounded-xl p-8 shadow-2xl">
            {/* Dropdowns superiores */}
            <div className="flex flex-wrap justify-between gap-4 mb-6">
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
            </div>

            {/* Campos del formulario */}
            <form className="grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={handleSearch}>
              <input
                id="origen"
                name="origen"
                type="text"
                placeholder="Origen (Ej: Bogotá)"
                className="w-full p-3 bg-white/90 border-2 border-purple-light/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-blueblack"
              />
              <input
                id="destino"
                name="destino"
                type="text"
                placeholder="Destino (Ej: Pereira)"
                className="w-full p-3 bg-white/90 border-2 border-purple-light/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-blueblack"
              />
              <input
                id="ida"
                name="ida"
                type="date"
                className="w-full p-3 bg-white/90 border-2 border-purple-light/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-blueblack"
              />
              <input
                id="vuelta"
                name="vuelta"
                type="date"
                className={`w-full p-3 bg-white/90 border-2 border-purple-light/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-blueblack ${
                  selectedTripType === 'Solo Ida' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={selectedTripType === 'Solo Ida'}
              />
              <button 
                type="submit"
                className="md:col-span-4 mt-4 bg-purple2 text-white hover:bg-purple-dark py-4 px-8 rounded-full font-bold text-lg transition-all duration-500 shadow-lg hover:shadow-xl"
              >
                Buscar
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Sección de destinos */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Descubre tu próximo viaje
          </h2>
          <div className="w-50 h-1 bg-purple2 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
          {locations?.map((element) => (
            <LocationCard key={element.id} location={element} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HeroSection;