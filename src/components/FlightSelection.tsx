import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const FlightSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [flights, setFlights] = useState([]);
  const [passengerCount, setPassengerCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const searchParams = new URLSearchParams(location.search);
  const origen = searchParams.get('origen') || '';
  const destino = searchParams.get('destino') || '';
  const ida = searchParams.get('ida') || '';
  const vuelta = searchParams.get('vuelta') || '';
  const passengers = searchParams.get('passengers') || 1;

  useEffect(() => {
    setPassengerCount(parseInt(passengers));

    
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://tu api .example.com/flights?origen=${origen}&destino=${destino}&ida=${ida}&vuelta=${vuelta}&passengers=${passengers}`);
        const data = await response.json();
        setFlights(data); 
      } catch (error) {
        setError('Hubo un problema al obtener los vuelos');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [origen, destino, ida, vuelta, passengers]);

  const handleSelectTariff = (tariff) => {
    if (vuelta) {
      
      navigate(
        `/return-selection?origen=${destino}&destino=${origen}&idaTarifa=${tariff.name}&idaPrecio=${tariff.price.toFixed(2)}&passengers=${passengerCount}`
      );
    } else {
     
      navigate(
        `/seat-selection?idaTarifa=${tariff.name}&idaPrecio=${tariff.price.toFixed(2)}&passengers=${passengerCount}`
      );
    }
  };

  if (loading) {
    return <div className="text-center text-blue-600">Cargando vuelos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8 md:p-12">
      <h2 className="text-4xl font-bold mb-9 text-center text-blueblack">
        Resultados de vuelos de {origen} a {destino}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {flights.map((flight, index) => (
          <div key={index} className="w-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-blueblack mb-2">{flight.airline}</h3>
              <p className="text-blueblack mb-4">{flight.time} | {flight.duration}</p>
              {flight.tariffs.map((tariff, idx) => (
                <div key={idx} className="mt-4 border-t pt-4">
                  <h4 className="font-semibold text-lg text-gold">{tariff.name}</h4>
                  <p className="text-blueblack mb-2">{tariff.description}</p>
                  <p className="text-blueblack font-bold text-xl mb-4">${tariff.price.toFixed(2)}</p>
                  <button
                    onClick={() => handleSelectTariff(tariff)}
                    className="mt-2 w-full bg-blue-600 text-blueblack py-2 px-4 rounded hover:bg-lightblue hover:text-bluemint transition-colors duration-200"
                  >
                    Elegir
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightSelection;
