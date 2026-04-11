import { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Navbar from "../components/navbarcomponent";
import Footer from "../components/footercomponent";

import PreferenceSliders from "../components/optimizer/PreferenceSlider";
import FlightRanking from "../components/optimizer/FlightRanking";
import OptimalResult from "../components/optimizer/OptimalResult";

interface FlightOption {
  id: number;
  route: string;
  price: number;
  duration: number; // en horas
  co2: number; // kg CO2
}

const flightOptions: FlightOption[] = [
  { id: 1, route: "BOG → MDE", price: 220, duration: 1, co2: 28 },
  { id: 2, route: "BOG → CTG", price: 340, duration: 1.5, co2: 75 },
  { id: 3, route: "BOG → MIA", price: 900, duration: 4, co2: 310 },
];

export default function TravelOptimizer() {
  const [weights, setWeights] = useState({
    price: 40,
    duration: 30,
    co2: 30,
  });

  // Normalización + función objetivo (Investigación de Operaciones)
  const rankedFlights = flightOptions
    .map((flight) => {
      const score =
        (weights.price * flight.price) +
        (weights.duration * flight.duration) +
        (weights.co2 * flight.co2);

      return {
        ...flight,
        score,
      };
    })
    .sort((a, b) => a.score - b.score);

  const optimalFlight = rankedFlights[0];

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Optimizador de Viajes - Royal Airlines</title>
      </Helmet>

      <Navbar />

      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-6xl mx-auto px-4">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-semibold text-gray-900 mb-4">
              Optimizador Inteligente de Viajes
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Selección óptima de vuelos basada en criterios de costo, tiempo y sostenibilidad.
            </p>
          </motion.div>

          {/* Preferencias */}
          <div className="mb-10">
            <PreferenceSliders
              weights={weights}
              onChange={setWeights}
            />
          </div>

          {/* Ranking */}
          <div className="mb-10">
          <FlightRanking
              flights={rankedFlights}
              weightPrice={weights.price}
              weightTime={weights.duration}
              weightCarbon={weights.co2}
/>

          </div>

          {/* Resultado Óptimo */}
          <OptimalResult bestFlight={optimalFlight} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
