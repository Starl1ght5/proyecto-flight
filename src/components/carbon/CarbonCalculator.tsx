import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mock distances (km)
const distances: Record<string, number> = {
  'BOG-CTG': 657,
  'BOG-MDE': 240,
  'BOG-CLO': 388,
  'BOG-BAQ': 950,
  'BOG-MIA': 2700,
  'BOG-JFK': 4020,
  'BOG-MAD': 8065,
  'BOG-MEX': 2600,
  'CTG-MDE': 460,
  'CTG-MIA': 1900,
};

const locations = [
  { code: 'BOG', name: 'Bogotá' },
  { code: 'CTG', name: 'Cartagena' },
  { code: 'MDE', name: 'Medellín' },
  { code: 'CLO', name: 'Cali' },
  { code: 'BAQ', name: 'Barranquilla' },
  { code: 'MIA', name: 'Miami' },
  { code: 'JFK', name: 'New York' },
  { code: 'MAD', name: 'Madrid' },
  { code: 'MEX', name: 'Ciudad de México' },
];

export default function CarbonCalculator() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [result, setResult] = useState<{
    co2: number;
    trees: number;
    offset: number;
    distance: number;
  } | null>(null);

  const calculateCO2 = () => {
    if (!origin || !destination) return;

    const key1 = `${origin}-${destination}`;
    const key2 = `${destination}-${origin}`;
    
    const distance = distances[key1] || distances[key2] || 1000;
    const co2 = Math.round(distance * 0.115); // 0.115 kg CO2 per km
    const trees = (co2 / 21).toFixed(1); // 1 tree absorbs ~21kg/year
    const offset = (co2 * 0.02).toFixed(2); // $0.02 USD per kg

    setResult({
      co2,
      trees: parseFloat(trees),
      offset: parseFloat(offset),
      distance
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl p-8 shadow-lg border-2 border-blue-200">
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Calculadora de CO₂</h2>
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>

      <p className="text-gray-600 mb-6">
        Calcula el CO₂ que emitirá tu próximo vuelo
      </p>

      {/* Form */}
      <div className="space-y-4 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Origin */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Origen
            </label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
            >
              <option value="">Selecciona origen</option>
              {locations.map((loc) => (
                <option key={loc.code} value={loc.code}>
                  {loc.name} ({loc.code})
                </option>
              ))}
            </select>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Destino
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
            >
              <option value="">Selecciona destino</option>
              {locations.map((loc) => (
                <option key={loc.code} value={loc.code}>
                  {loc.name} ({loc.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={calculateCO2}
          disabled={!origin || !destination}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Calcular CO₂
        </button>
      </div>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-xl border-2 border-blue-600 p-6 shadow-lg">
              
              {/* Main Result */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <p className="text-6xl font-bold text-blue-600 mb-2">
                  {result.co2} kg
                </p>
                <p className="text-lg text-gray-600">CO₂ emitido</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <svg className="w-8 h-8 text-gray-700 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <p className="text-2xl font-bold text-gray-900">{result.distance}</p>
                  <p className="text-xs text-gray-600 mt-1">kilómetros</p>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <svg className="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <p className="text-2xl font-bold text-green-600">{result.trees}</p>
                  <p className="text-xs text-gray-600 mt-1">árboles/año</p>
                </div>

                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <svg className="w-8 h-8 text-amber-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-2xl font-bold text-amber-600">${result.offset}</p>
                  <p className="text-xs text-gray-600 mt-1">compensación</p>
                </div>
              </div>

              {/* Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900 text-center">
                  <strong>Dato:</strong> Este vuelo emite CO₂ equivalente a lo que {result.trees} árboles 
                  absorben en un año. Puedes compensarlo por solo ${result.offset} USD.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}