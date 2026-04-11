import { motion } from "framer-motion";

type FlightOption = {
  id: number;
  route: string;
  price: number;
  duration: number; // horas
  co2: number; // kg
};

interface FlightRankingProps {
  flights: FlightOption[];
  weightPrice: number;
  weightTime: number;
  weightCarbon: number;
}

export default function FlightRanking({
  flights,
  weightPrice,
  weightTime,
  weightCarbon,
}: FlightRankingProps) {
  const calculateScore = (flight: FlightOption) => {
    return (
      flight.price * (weightPrice / 100) +
      flight.duration * 100 * (weightTime / 100) +
      flight.co2 * (weightCarbon / 100)
    );
  };

  const rankedFlights = [...flights].sort(
    (a, b) => calculateScore(a) - calculateScore(b)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-6">
        Ranking de vuelos optimizado
      </h2>

      <div className="grid gap-6">
        {rankedFlights.map((flight, index) => (
          <motion.div
            key={flight.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-2xl border p-6 flex justify-between items-center ${
              index === 0
                ? "bg-green-50 border-green-300"
                : "bg-white"
            }`}
          >
            <div>
              <p className="font-semibold text-lg">{flight.route}</p>
              <p className="text-sm text-gray-600">
                Precio: ${flight.price} · Tiempo: {flight.duration}h · CO₂:{" "}
                {flight.co2}kg
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Puntaje</p>
              <p className="font-bold text-gray-900">
                {calculateScore(flight).toFixed(1)}
              </p>

              {index === 0 && (
                <span className="inline-block mt-1 text-xs font-semibold text-green-700">
                  Mejor opción
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
