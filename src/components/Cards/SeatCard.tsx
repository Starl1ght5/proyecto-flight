import { useState } from "react";
import { SeatInfo } from "../../Types";
import { motion } from 'framer-motion';

export const SeatCard: React.FC<SeatInfo> = ({ seat, returnInfo }) => {

    const [ hovered, setHovered ] = useState<boolean>(false);

    const formattedPrice = (seat.seatPrice.amount).toLocaleString();

    const sendInfo = () => {
        returnInfo(seat);
    }

    return (
        <motion.div className="relative flex flex-col items-center hover:cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }} >
            
            {/* Hover div */}
            {hovered && (
                seat.reserved ? (

                    /// Appears when the seat is reserved
                    /// Aparece cuando el asient esta reservado
                    <motion.div className="z-9 flex flex-col absolute bg-white rounded-lg shadow-lg -translate-y-23 px-5 py-3.5 text-center w-40 border border-black"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }} >
                        <div className="bg-white shadow-lg rotate-45 size-4 translate-y-13.5 place-self-center z-8 absolute border-b border-r border-black" >
                        </div>
                        <p className="italic font-extralight" >Este asiento no esta disponible</p>
                    
                    </motion.div>
                ) : (

                    /// Appears when the seat is avaliable
                    /// Aparece cuando el asiento esta disponible
                    <motion.div className="z-9 flex flex-col absolute bg-white rounded-lg shadow-lg -translate-y-24 px-5 py-3.5 text-center w-38 border border-black"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }} >
                        <div className="bg-white shadow-lg rotate-45 size-4 translate-y-14 place-self-center z-8 absolute border-b border-r border-black" >
                        </div>
                        <div>
                            <p>{seat.seatNumber}</p>
                        </div>
                        <div className="text-[1.065rem] flex flex-row gap-1.5 ml-2">
                            <p className="font-semibold" >COP</p> 
                            <p className="font-extralight">{formattedPrice}</p>
                        </div>
                    </motion.div>
                )
                
            )}

            {seat.reserved ? (

                /// Reserved seat - Asiento reservado
                <div className="bg-white p-3 rounded-lg shadow-lg group border scale-90 border-gray-500"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}>
                    <span className="icon-[ic--baseline-chair] size-6 duration-300 bg-gray-600 group-hover:bg-red" />  
                </div>
            ) : (

                /// Available seat - Asiento dispobible
                <div className="bg-white p-3 rounded-lg shadow-lg group border scale-90 border-gray-500"
                    onClick={sendInfo}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}>
                    <span className="icon-[ic--baseline-chair] size-6 duration-300 group-hover:bg-lilac" />  
                </div>
            )}
            
        </motion.div>
    )
}