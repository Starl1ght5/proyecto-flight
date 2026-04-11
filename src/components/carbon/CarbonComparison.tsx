import { motion } from "framer-motion";

interface CarbonComparisonProps {
  userCO2: number;
  worldAverage: number;
  percentBetter: number;
}

export default function CarbonComparison({ userCO2, worldAverage, percentBetter }: CarbonComparisonProps) {
  const userPercentage = (userCO2 / worldAverage) * 100;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Comparación Global</h3>
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>

      <div className="space-y-6">
        {/* Tu Huella */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Tu huella</span>
            <span className="text-sm font-bold text-green-600">{userCO2} kg</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${userPercentage}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>

        {/* Promedio Mundial */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Promedio mundial</span>
            <span className="text-sm font-bold text-gray-600">{worldAverage} kg</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gray-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </div>
        </div>
      </div>

      {/* Badge */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-green-900">
              ¡Excelente!
            </p>
            <p className="text-xs text-green-700">
              Estás {percentBetter}% por debajo del promedio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}