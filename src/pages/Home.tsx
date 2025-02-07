import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../src/assets/Alerofondo.jpeg';


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

  const toggleDropdown = (menu: boolean) => {
    setDropdownOpen((prev) => (prev === menu ? null : menu));
  };

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
    <div
      className="relative h-[80vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-blueblack bg-opacity-10"></div>
      <div className="relative text-center text-blueblack pt-20">
        <h1 className="text-6xl font-extrabold tracking-wide drop-shadow-lg">
          Viaja a cualquier lugar sin preocupaciones
        </h1>
        <p className="mt-6 text-blueblack text-2xl drop-shadow-lg">
          Encuentra hotel y vuelos con la mejor experiencia.
        </p>

        <div className="mt-40 bg-bluemint bg-opacity-20 p-8 rounded-xl shadow-2xl max-w-5xl mx-auto text-black">
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
  );
};

export default HeroSection;
