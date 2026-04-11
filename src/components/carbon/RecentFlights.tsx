import { motion } from "framer-motion";
import { useState } from "react";
import { toast, Toaster } from "sonner";

interface Flight {
  route: string;
  date: string;
  co2: number;
  offset: number;
  distance: number;
}

interface RecentFlightsProps {
  flights: Flight[];
}

export default function RecentFlights({ flights }: RecentFlightsProps) {
  const [compensated, setCompensated] = useState<Set<string>>(new Set());

  const handleCompensate = (route: string, offset: number) => {
    setCompensated(prev => new Set([...prev, route]));
    toast.success(`¡Gracias por compensar! Has contribuido con $${offset} USD`, {
      className: "bg-green-500 text-white rounded-lg shadow-lg"
    });
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
      <Toaster position="top-right" richColors />
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Vuelos Recientes</h2>
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </div>

      <div className="space-y-4">
        {flights.map((flight, index) => (
          <motion.div
            key={flight.route}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all"
          >
            {/* Flight Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">{flight.route}</h3>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {flight.date}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {flight.distance} km
                </span>
              </div>
            </div>

            {/* CO2 Stats */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-3xl font-bold text-green-600">{flight.co2} kg</p>
                <p className="text-sm text-gray-500">CO₂ emitido</p>
              </div>

              {/* Compensate Button */}
              {compensated.has(flight.route) ? (
                <div className="px-6 py-3 bg-green-100 text-green-700 rounded-lg font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Compensado
                </div>
              ) : (
                <button
                  onClick={() => handleCompensate(flight.route, flight.offset)}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ${flight.offset} USD
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Total Summary */}
      <div className="mt-6 pt-6 border-t-2 border-gray-900">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">Total CO₂ de vuelos</span>
          <span className="text-3xl font-bold text-gray-900">
            {flights.reduce((sum, f) => sum + f.co2, 0)} kg
          </span>
        </div>
      </div>
    </div>
  );
}