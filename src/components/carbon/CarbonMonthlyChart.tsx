import { motion } from "framer-motion";

const monthlyData = [
  { month: 'Ene', co2: 45 },
  { month: 'Feb', co2: 75 },
  { month: 'Mar', co2: 310 },
  { month: 'Abr', co2: 20 },
  { month: 'May', co2: 0 },
  { month: 'Jun', co2: 0 },
  { month: 'Jul', co2: 0 },
  { month: 'Ago', co2: 0 },
  { month: 'Sep', co2: 0 },
  { month: 'Oct', co2: 0 },
  { month: 'Nov', co2: 0 },
  { month: 'Dic', co2: 0 },
];

export default function CarbonMonthlyChart() {
  const maxCO2 = Math.max(...monthlyData.map(d => d.co2));

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Tendencia Mensual</h2>
          <p className="text-gray-600">Emisiones de CO₂ por mes</p>
        </div>
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>

      {/* Chart */}
      <div className="relative h-64 flex items-end justify-between gap-2 mb-4">
        {monthlyData.map((data, index) => {
          const height = maxCO2 > 0 ? (data.co2 / maxCO2) * 100 : 0;
          
          return (
            <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
              {/* Bar */}
              <div className="w-full flex flex-col justify-end h-56">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg relative group hover:from-green-600 hover:to-green-500 transition-all cursor-pointer"
                >
                  {/* Tooltip */}
                  {data.co2 > 0 && (
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap">
                      {data.co2} kg CO₂
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  )}
                </motion.div>
              </div>
              
              {/* Month Label */}
              <span className="text-xs font-medium text-gray-600">{data.month}</span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Emisiones CO₂</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-sm text-gray-600">Promedio: {Math.round(monthlyData.reduce((sum, d) => sum + d.co2, 0) / 12)} kg/mes</span>
          </div>
        </div>

        {/* Total */}
        <div className="text-right">
          <p className="text-sm text-gray-600">Total 2024</p>
          <p className="text-2xl font-bold text-gray-900">
            {monthlyData.reduce((sum, d) => sum + d.co2, 0)} kg
          </p>
        </div>
      </div>
    </div>
  );
}