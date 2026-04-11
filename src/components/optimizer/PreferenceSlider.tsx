import { motion } from "framer-motion";

interface PreferenceSlidersProps {
  weights: {
    price: number;
    duration: number;
    co2: number;
  };
  onChange: (weights: {
    price: number;
    duration: number;
    co2: number;
  }) => void;
}

export default function PreferenceSliders({
  weights,
  onChange,
}: PreferenceSlidersProps) {
  const handleChange = (key: "price" | "duration" | "co2", value: number) => {
    onChange({
      ...weights,
      [key]: value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Preferencias del Usuario
      </h2>
      <p className="text-gray-600 mb-6">
        Ajusta la importancia de cada criterio para el modelo de optimización.
      </p>

      {/* Precio */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="font-medium text-gray-700">Costo</span>
          <span className="text-sm text-gray-500">{weights.price}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={weights.price}
          onChange={(e) => handleChange("price", Number(e.target.value))}
          className="w-full accent-gray-900"
        />
      </div>

      {/* Duración */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="font-medium text-gray-700">Tiempo de viaje</span>
          <span className="text-sm text-gray-500">{weights.duration}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={weights.duration}
          onChange={(e) => handleChange("duration", Number(e.target.value))}
          className="w-full accent-gray-900"
        />
      </div>

      {/* CO2 */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="font-medium text-gray-700">Impacto ambiental</span>
          <span className="text-sm text-gray-500">{weights.co2}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={weights.co2}
          onChange={(e) => handleChange("co2", Number(e.target.value))}
          className="w-full accent-gray-900"
        />
      </div>

      <div className="mt-6 text-xs text-gray-500">
        * Los valores representan pesos relativos usados en la función objetivo.
      </div>
    </motion.div>
  );
}
