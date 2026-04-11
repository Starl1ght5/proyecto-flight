import { motion } from "framer-motion";

type FlightOption = {
  id: number;
  route: string;
  price: number;
  duration: number; // horas
  co2: number; // kg
};

interface OptimalResultProps {
  bestFlight: FlightOption | null;
}

export default function OptimalResult({ bestFlight }: OptimalResultProps) {
  if (!bestFlight) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center text-gray-500">
        Ajusta los criterios para obtener una recomendación óptima.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8 shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-4">
        Recomendación Óptima
      </h2>

      <p className="text-gray-300 mb-6">
        Según tus preferencias actuales, esta es la mejor alternativa disponible.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div>
          <p className="text-sm text-gray-400">Ruta</p>
          <p className="font-semibold text-lg">{bestFlight.route}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Precio</p>
          <p className="font-semibold text-lg">${bestFlight.price}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Duración</p>
          <p className="font-semibold text-lg">{bestFlight.duration} h</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">CO₂ estimado</p>
          <p className="font-semibold text-lg">{bestFlight.co2} kg</p>
        </div>
      </div>

      <div className="pt-4 border-t border-white/20 flex items-center justify-between">
        <span className="text-sm text-gray-300">
          Opción óptima según modelo multicriterio
        </span>
        <span className="text-xs font-semibold bg-green-500/20 text-green-300 px-3 py-1 rounded-full">
          Óptimo
        </span>
      </div>
    </motion.div>
  );
}
