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

      return (
        <motion.div 
          className="relative flex flex-col items-center hover:cursor-pointer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Tooltip para asientos */}
          {hovered && (
        <motion.div
          className="absolute z-10 w-full flex justify-center"
          style={{ bottom: '100%' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-lg px-4 py-2 text-center border border-black min-w-[150px] mb-2">
            <div className="absolute -bottom-1.5 left-1/2 transform -translate-y-2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-b border-r border-black" />
            
            {seat.reserved ? (
              <p className="italic text-base text-gray-600">Asiento reservado</p>
            ) : isSelected ? (
              <div className="space-y-0.5">
                <p className="font-medium text-purple-600">Seleccionado</p>
                <p className="text-base">Asiento {seat.seatNumber}</p>
                <p className="text-base font-light">COP {formattedPrice}</p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-base">Asiento {seat.seatNumber}</p>
                <p className="text-base font-light">COP {formattedPrice}</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    
          {/* Asiento visual */}
          <div
            className={`bg-white p-3 rounded-lg shadow-lg group border scale-90 ${
              isSelected
                ? 'border-gold' // Seleccionado
                : seat.reserved
                  ? 'border-blackcursor-not-allowed' // Reservado
                  : 'border-gray-500' // Disponible
            }`}
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <span
              className={`icon-[streamline--shopping-catergories-chair-design-lounge-furniture-chair-interior-decorate-armchair-decoration] size-7 duration-300 ${
                isSelected
                  ? 'bg-gold' // Seleccionado
                  : seat.reserved
                    ? 'bg-black' // Reservado
                    : 'bg-indigo-500 group-hover:bg-purple-400' // Disponible
              }`}
            />
          </div>
        </motion.div>
      );
}