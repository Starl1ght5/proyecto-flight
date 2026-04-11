import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Navbar from "../components/navbarcomponent";
import Footer from "../components/footercomponent";

// Importación de componentes de la carpeta carbon
import CarbonComparison from "../components/carbon/CarbonComparison";
import RecentFlights from "../components/carbon/RecentFlights";
import EcoMessage from "../components/carbon/EcoMessage";
import CarbonCalculator from "../components/carbon/CarbonCalculator";
import CarbonMonthlyChart from "../components/carbon/CarbonMonthlyChart";
import EcoAchievements from "../components/carbon/EcoAchievements";

// Importación del modelo de utilidad
import { calcularHuellaCarbono } from "../utils/operationsModels";

// ==================
// DATOS DEL MODELO
// ==================

const flightsData = [
  { route: "BOG → MDE", date: "12 Ene 2025", distance: 240, flights: 1 },
  { route: "BOG → CTG", date: "28 Feb 2025", distance: 657, flights: 1 },
  { route: "BOG → MIA", date: "15 Mar 2025", distance: 2700, flights: 1 }
];

// Aplicación del modelo y redondeo de números
const recentFlights = flightsData.map(flight => ({
  ...flight,
  co2: calcularHuellaCarbono(flight.distance, flight.flights),
  offset: Number((calcularHuellaCarbono(flight.distance) * 0.02).toFixed(2))
}));

// Redondeo del total CO2 para evitar decimales infinitos
const totalCO2 = parseFloat(recentFlights.reduce((sum, f) => sum + f.co2, 0).toFixed(1));

const userStats = {
  totalCO2,
  worldAverage: 585,
  percentBetter: Math.max(0, Math.round(((585 - totalCO2) / 585) * 100)),
  level: totalCO2 < 500 ? "Gold" : "Silver",
  progress: Math.min(100, Math.round((totalCO2 / 600) * 100)),
  nextLevel: "Platinum",
  currentMiles: Math.round(totalCO2),
  nextLevelMiles: 600
};

export default function CarbonTracker() {
  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Huella de Carbono - Royal Airlines</title>
      </Helmet>

      <Navbar />

      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">

          {/* HEADER */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-6">
              🌱
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-4">
              Tu Huella de Carbono
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Este módulo aplica un modelo de optimización para estimar y reducir
              el impacto ambiental generado por los vuelos del usuario.
            </p>
          </motion.div>

          {/* TOP CARDS */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* TOTAL CO2 */}
            <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Huella total anual</h3>
              <p className="text-5xl font-bold">{userStats.totalCO2.toLocaleString()} kg</p>
              <p className="mt-4 text-sm opacity-90">
                {userStats.percentBetter}% menor al promedio mundial
              </p>
            </div>

            <CarbonComparison
              userCO2={userStats.totalCO2}
              worldAverage={userStats.worldAverage}
              percentBetter={userStats.percentBetter}
            />

            {/* ECO LEVEL */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Nivel Eco</h3>
              <p className="text-4xl font-bold">{userStats.level}</p>
              <div className="mt-4">
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${userStats.progress}%` }}
                  />
                </div>
                <p className="text-xs mt-2 opacity-90">
                  Progreso hacia {userStats.nextLevel}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Estos componentes ahora sí se reconocerán gracias a los imports de arriba */}
          <CarbonMonthlyChart />
          <RecentFlights flights={recentFlights} />
          <EcoAchievements />
          <CarbonCalculator />
          <EcoMessage />

        </div>
      </div>

      <Footer />
    </div>
  );
}