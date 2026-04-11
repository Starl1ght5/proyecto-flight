import React from "react";
import { BoardingPassWrapper } from "../../types";
import { motion } from "framer-motion";

export const BoardingPassCard: React.FC<BoardingPassWrapper> = ({ boardingPass }) => {

    // Convertir number[] a Date correctamente
    const departureDate = Array.isArray(boardingPass.departureDate)
        ? new Date(
            boardingPass.departureDate[0],          
            boardingPass.departureDate[1] - 1,      
            boardingPass.departureDate[2],          
            boardingPass.departureDate[3] || 0,     
            boardingPass.departureDate[4] || 0      
        )
        : new Date(boardingPass.departureDate);

    return (
        <motion.div
            className="bg-white flex flex-row rounded-2xl shadow-md border border-gray-200 w-full min-h-[190px] overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Sidebar Izquierdo */}
            <div className="bg-gray-900 text-white flex w-12 items-center justify-center border-r border-gray-800 shrink-0">
                <p className="font-bold tracking-[0.2em] text-[10px] rotate-180 [writing-mode:vertical-lr] uppercase opacity-50">
                    Royal Airlines
                </p>
            </div>

            {/* Contenido Principal */}
            <div className="flex flex-col p-5 flex-1 bg-white">

                {/* Trayecto */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">Salida</span>
                        <h2 className="text-2xl font-black text-gray-900">
                            {boardingPass.departureIataCode}
                        </h2>
                    </div>

                    <div className="flex-1 px-4 flex items-center justify-center">
                        <div className="h-[1px] w-full bg-gray-200 relative">
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-1">
                                ✈
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col text-right">
                        <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">Destino</span>
                        <h2 className="text-2xl font-black text-gray-900">
                            {boardingPass.arrivalIataCode}
                        </h2>
                    </div>
                </div>

                {/* Detalles */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-auto">

                    <div>
                        <p className="text-[9px] uppercase font-bold text-gray-400">Pasajero</p>
                        <p className="text-sm font-bold text-gray-800 truncate">
                            Fulanito de Tal
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-[9px] uppercase font-bold text-gray-400">Vuelo</p>
                        <p className="text-sm font-bold text-gray-800 truncate">
                            {boardingPass.flightNumber}
                        </p>
                    </div>

                    <div>
                        <p className="text-[9px] uppercase font-bold text-gray-400">Fecha</p>
                        <p className="text-xs font-semibold text-gray-600">
                            {departureDate.toLocaleDateString("es-CO")}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-[9px] uppercase font-bold text-gray-400">Hora Salida</p>
                        <p className="text-xs font-semibold text-gray-600">
                            {departureDate.toLocaleTimeString("es-CO", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true
                            })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Sidebar Derecho */}
            <div className="w-36 sm:w-40 bg-gray-900 p-5 flex flex-col justify-between shrink-0 relative border-l border-dashed border-gray-700">

                <div>
                    <p className="text-[9px] uppercase font-bold text-gray-400">Abordaje</p>
                    <p className="text-lg font-black text-white">
                        {departureDate.toLocaleTimeString("es-CO", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                        })}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-2">

                    <div>
                        <p className="text-[8px] uppercase font-bold text-gray-500">Gate</p>
                        <p className="text-xs font-bold text-white uppercase">
                            {boardingPass.gate}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-[8px] uppercase font-bold text-gray-500">Clase</p>
                        <p className="text-xs font-bold text-white truncate">
                            {boardingPass.seatClass?.split(" ")[0]}
                        </p>
                    </div>

                    <div className="pt-2">
                        <p className="text-[8px] uppercase font-bold text-gray-500">Grupo</p>
                        <p className="text-xs font-bold text-white">
                            {boardingPass.group}
                        </p>
                    </div>

                    <div className="text-right pt-2">
                        <p className="text-[8px] uppercase font-bold text-gray-500">Asiento</p>
                        <p className="text-sm font-black text-amber-400">
                            {boardingPass.seats?.[0]}
                        </p>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};
