import { useState } from "react";
import { Seat } from "../../types.tsx";
import { motion } from 'framer-motion';

interface SeatCardProps {
    seat: Seat;
    isSelected?: boolean;
    onSelect?: (seat: Seat) => void;
}

const SeatCard: React.FC<SeatCardProps> = ({ 
    seat, 
    isSelected = false, 
    onSelect 
}) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const formattedPrice = parseFloat(String(seat.seatPrice.amount)).toLocaleString();

    const handleClick = () => {
        if (!seat.reserved) onSelect?.(seat);
    };

    const getSeatStyle = () => {
        if (isSelected)
            return 'bg-blue-600/40 border-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]';
        if (seat.reserved)
            return 'bg-white/5 border-white/10 cursor-not-allowed opacity-40';
        return 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40';
    };

    const getIconColor = () => {
        if (isSelected) return 'text-blue-300';
        if (seat.reserved) return 'text-white/20';
        return 'text-white/50';
    };

    return (
        <motion.div
            className="relative flex flex-col items-center hover:cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
        >
            {/* Tooltip */}
            {hovered && !seat.reserved && (
                <motion.div
                    className="absolute z-10 w-full flex justify-center pointer-events-none"
                    style={{ bottom: '100%' }}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <div className="bg-gray-900 border border-white/10 rounded-md shadow-lg px-3 py-2 text-center min-w-[110px] mb-1.5">
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-r border-b border-white/10 rotate-45" />
                        <p className="text-xs font-semibold text-white relative z-10">{seat.seatNumber}</p>
                        <p className="text-xs text-green-400 font-semibold relative z-10">COP {formattedPrice}</p>
                    </div>
                </motion.div>
            )}

            {/* Asiento */}
            <div
                className={`w-7 h-7 rounded border ${getSeatStyle()} flex items-center justify-center transition-all duration-150`}
                onClick={handleClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <svg
                    className={`w-4 h-4 ${getIconColor()} transition-colors duration-150`}
                    viewBox="0 0 24 24"
                >
                    {seat.reserved ? (
                        // X — ocupado
                        <path
                            d="M6 18L18 6M6 6l12 12"
                            stroke="currentColor" strokeWidth="2.5"
                            fill="none" strokeLinecap="round"
                        />
                    ) : isSelected ? (
                        // Check — seleccionado
                        <path
                            d="M5 12l4 4L19 7"
                            stroke="currentColor" strokeWidth="2.5"
                            fill="none" strokeLinecap="round" strokeLinejoin="round"
                        />
                    ) : (
                        // Asiento disponible — silla vista desde arriba
                        <>
                            <rect x="4" y="3" width="16" height="11" rx="3" fill="currentColor"/>
                            <rect x="4" y="17" width="16" height="4" rx="2" fill="currentColor"/>
                        </>
                    )}
                </svg>
            </div>
        </motion.div>
    );
};

export default SeatCard;