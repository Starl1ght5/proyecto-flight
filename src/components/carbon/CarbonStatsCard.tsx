import { motion } from "framer-motion";

interface Props {
  title?: string;
  value?: string;
  subtitle?: string;
}

export default function CarbonStatsCard({
  title = "CO₂ Emitido",
  value = "245 kg",
  subtitle = "Últimos 6 meses",
}: Props) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
    >
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
      <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
    </motion.div>
  );
}
