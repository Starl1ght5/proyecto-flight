import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { LocationInfo } from "../Types";
import { LocationCard } from "../Components/Cards/LocationCard";
import Footer from '../Components/FooterComponent';
import { Helmet } from "react-helmet";


const Dropdown = ({ label, options, selected, isOpen, onToggle, onSelect }) => (
  <div className="relative">
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-haspopup="true"
      className="text-bluemint hover:text-yellow-500 flex items-center gap-2 transition duration-300 ease-in-out"
    >
      {label}
    </button>
    {isOpen && (
      <ul className="absolute bg-white text-black p-3 shadow-lg rounded-lg">
        {options.map((option) => (
          <li
            key={option}
            onClick={() => {
              onSelect(option);
              onToggle();
            }}
            className={`p-2 cursor-pointer ${
              selected === option ? 'bg-gray-200' : 'hover:bg-gray-200'
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
  const [selectedClass, setSelectedClass] = useState('Economy');
  const [selectedPassenger, setSelectedPassenger] = useState('1 Adulto');
  const navigate = useNavigate();
  const [ locations, setLocations ] = useState<LocationInfo[]>([]);

  const toggleDropdown = (menu: boolean) => {
    setDropdownOpen((prev) => (prev === menu ? null : menu));
  };

      useEffect(() => {
          const fetchLocations = async () => {
              try {
                  const response = await fetch("http://localhost:8080/api/locations/search?number=6");
                  const res = await response.json();
                  setLocations(res);
  
              } catch (e) {
                  console.log(e);
              }
          }
  
          fetchLocations();
      }, [])

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

  const getPassengerCount = (passengerType: Integer) => {
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

        <div className="relative h-[80vh] bg-cover bg-center bg-[url(src/assets/Alerofondo.webp)]">
          <div className="absolute inset-0 bg-opacity-10"></div>
          <div className="relative text-center text-blueblack pt-20">
            <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg">Descubre el mundo con nosotros</h1>
            <p className="text-lg text-white mb-8 drop-shadow-md">Reserva tu vuelo al mejor precio y empieza tu próxima aventura</p>

          <div className="mt-40 bg-bluemint bg-opacity-20 p-8 rounded-xl -translate-y-25 shadow-2xl max-w-5xl mx-auto text-black">
          <div className="flex justify-between gap-6 mb-6">
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
              options={['Economy', 'Business', 'First Class']}
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

          <form className="grid grid-cols-4 gap-4 items-center" onSubmit={handleSearch}>
            <input
              id="origen"
              name="origen"
              type="text"
              placeholder="Origen (Ej: Bogotá)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              id="destino"
              name="destino"
              type="text"
              placeholder="Destino (Ej: Pereira)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                id="ida"
                name="ida"
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                id="vuelta"
                name="vuelta"
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={selectedTripType === 'Solo Ida'}
              />
              <div className="col-span-4 flex justify-center mt-6">
                <button className="bg-gold hover:bg-yellow-600 text-bluemint py-3 px-6 rounded-full transition duration-300">
                  Buscar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="p-4 gap-3 flex flex-col justify-center items-center mt-20">

        <div className="py-4 flex flex-col items-center" >
          <h2 className="text-2-5xl font-semibold text-center" >Descubre tu proximo viaje</h2>
          <hr className="h-px my-2 bg-lilac border-0 w-[200%] "/>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
        {locations?.map((element) => {
                              
          return (
            <LocationCard location={element} />
          )})}
        </div>
      </div>

      <Footer />
      
    </div>
    
  );
};

export default HeroSection;
