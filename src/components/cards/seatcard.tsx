import { useState } from "react";
import { Seat } from "../../types.tsx";
import { motion } from 'framer-motion';

interface SeatCardProps {
    seat: Seat;
    isSelected?: boolean;
    onSelect?: (seat: Seat) => void;
}

export const SeatCard: React.FC<SeatCardProps> = ({ 
    seat, 
    isSelected = false, 
    onSelect 
}) => {
    const [hovered, setHovered] = useState<boolean>(false);

    const formattedPrice = (seat.seatPrice.amount).toLocaleString();

    const handleClick = () => {
        if (!seat.reserved) {
          onSelect?.(seat);
        }
      };

    // Colores suaves y minimalistas
    const getSeatStyle = () => {
        if (isSelected) {
            return 'bg-blue-50 border-blue-300 hover:bg-blue-100';
        }
        
        if (seat.reserved) {
            return 'bg-gray-200 border-gray-300 cursor-not-allowed opacity-60';
        }
        
        return 'bg-slate-100 border-slate-300 hover:bg-slate-200 hover:border-slate-400';
    };

    const getIconColor = () => {
        if (isSelected) return 'text-blue-600';
        if (seat.reserved) return 'text-gray-400';
        return 'text-slate-600';
    };

    return (
        <motion.div 
          className="relative flex flex-col items-center hover:cursor-pointer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Tooltip Simple */}
          {hovered && !seat.reserved && (
            <motion.div
              className="absolute z-10 w-full flex justify-center pointer-events-none"
              style={{ bottom: '100%' }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="bg-gray-800 rounded-md shadow-lg px-3 py-2 text-center min-w-[120px] mb-1.5">
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                
                <div className="space-y-0.5 relative z-10">
                  <p className="text-xs font-medium text-white">{seat.seatNumber}</p>
                  <p className="text-xs text-green-400 font-semibold">COP {formattedPrice}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Seat Icon - Minimalista */}
          <div
            className={`w-8 h-8 rounded-md border ${getSeatStyle()} flex items-center justify-center transition-all duration-150 ${
              !seat.reserved && 'hover:shadow-sm'
            }`}
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <svg 
              className={`w-4 h-4 ${getIconColor()} transition-colors duration-150`}
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              {seat.reserved ? (
                // X para ocupado
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
              ) : isSelected ? (
                // Check para seleccionado
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              ) : (
                // Icono de asiento
                <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-6.18C12.4 5.84 11.3 5 10 5H7c-1.66 0-3 1.34-3 3v7c0 1.66 1.34 3 3 3h3c1.3 0 2.4-.84 2.82-2H19c1.66 0 3-1.34 3-3V10c0-1.66-1.34-3-3-3z"/>
              )}
            </svg>
          </div>
        </motion.div>
      );
}