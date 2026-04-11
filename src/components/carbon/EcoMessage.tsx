// EcoAchievements.tsx
import { motion } from "framer-motion";

const achievements = [
  {
    id: 1,
    name: 'Eco Warrior',
    description: 'Compensa tu primer vuelo',
    icon: '🌱',
    unlocked: true,
    reward: '+100 millas'
  },
  {
    id: 2,
    name: 'Tree Hugger',
    description: 'Compensa 10 vuelos',
    icon: '🌳',
    unlocked: true,
    reward: '+500 millas'
  },
  {
    id: 3,
    name: 'Green Champion',
    description: 'Mantén nivel Gold 3 meses',
    icon: '🏆',
    unlocked: false,
    reward: '+1000 millas'
  },
  {
    id: 4,
    name: 'Planet Protector',
    description: 'Alcanza nivel Platinum',
    icon: '🌍',
    unlocked: false,
    reward: 'Upgrade gratis'
  },
  {
    id: 5,
    name: 'Carbon Neutral',
    description: 'Compensa 100% tu huella anual',
    icon: '⭐',
    unlocked: false,
    reward: '5000 millas'
  },
  {
    id: 6,
    name: 'Eco Influencer',
    description: 'Refiere 5 amigos al programa',
    icon: '💚',
    unlocked: false,
    reward: 'Lounge access'
  }
];

export default function EcoAchievements() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Logros Ecológicos</h2>
        <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`p-6 rounded-xl text-center transition-all duration-200 ${
              achievement.unlocked
                ? 'bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-500 shadow-md'
                : 'bg-gray-50 border-2 border-gray-200 opacity-60'
            }`}
          >
            {/* Icon */}
            <div className="text-5xl mb-3">
              {achievement.icon}
            </div>

            {/* Name */}
            <h3 className={`font-bold mb-2 ${
              achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
            }`}>
              {achievement.name}
            </h3>

            {/* Description */}
            <p className={`text-xs mb-3 ${
              achievement.unlocked ? 'text-gray-700' : 'text-gray-400'
            }`}>
              {achievement.description}
            </p>

            {/* Reward */}
            {achievement.unlocked && (
              <div className="inline-block px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                {achievement.reward}
              </div>
            )}

            {/* Locked */}
            {!achievement.unlocked && (
              <div className="inline-flex items-center gap-1 text-gray-400 text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Bloqueado
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Progress */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progreso de logros
          </span>
          <span className="text-sm font-bold text-gray-900">
            2/6 desbloqueados
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
            style={{ width: '33%' }}
          />
        </div>
      </div>
    </div>
  );
}