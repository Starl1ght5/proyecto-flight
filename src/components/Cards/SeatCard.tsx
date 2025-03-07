import { useState } from "react";
import { SeatInfo } from "../../Types";
import { motion } from 'framer-motion';

export const SeatCard: React.FC<SeatInfo> = ({ seat }) => {

    const [ hovered, isHovered ] = useState<boolean>(false);

    const formattedPrice = (seat.seatPrice.amount).toLocaleString();

    return (
        <div className="relative flex flex-col items-center" >
            {hovered && (
                <motion.div className="z-9 flex flex-col absolute bg-white rounded-lg shadow-lg -translate-y-24 px-5 py-4 text-center w-38 border border-black"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }} >
                    <div className="bg-white shadow-lg rotate-45 size-4 translate-y-14.5 place-self-center z-8 absolute border-b border-r border-black" >
                    </div>
                    <div>
                        <p>{seat.seatNumber}</p>
                    </div>
                    <div className="text-[1.065rem] flex flex-row gap-1.5 items-center">
                       <p className="font-semibold" >COP</p> 
                       <p className="font-extralight">{formattedPrice}</p>
                    </div>
                    
                </motion.div>
            )}

            <div className="bg-blue p-3"
                onMouseEnter={() => isHovered(true)}
                onMouseLeave={() => isHovered(false)}>
                <span className="icon-[ic--baseline-chair] size-8" />  
            </div>
            
        </div>
    )
}