import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Footer from "../components/footercomponent";
import Navbar from "../components/navbarcomponent";
import { BoardingPassCard } from "../components/cards/boardingpasscard";
import { useState } from "react";
import { BoardingPass } from "../types";

// 🎭 MOCK DATA - Boarding passes de ejemplo
const MOCK_BOARDING_PASSES: BoardingPass[] = [
    {
        boardingPassID: "BP001",
        departureIataCode: "BOG",
        arrivalIataCode: "CTG",
        gate: "A12",
        group: "1",
        seatClass: "Economy",
        seats: ["12A"],
        flightNumber: "RA 1234",
        departureDate: "2024-12-15",
        departureTime: "14:30",
        bookingID: "BOOK001",
        passengerID: "PASS001"
    } as any,
    {
        boardingPassID: "BP002",
        departureIataCode: "CTG",
        arrivalIataCode: "BOG",
        gate: "B5",
        group: "2",
        seatClass: "Complete",
        seats: ["8C"],
        flightNumber: "RA 5678",
        departureDate: "2024-12-20",
        departureTime: "16:45",
        bookingID: "BOOK002",
        passengerID: "PASS001"
    } as any,
    {
        boardingPassID: "BP003",
        departureIataCode: "BOG",
        arrivalIataCode: "MDE",
        gate: "C3",
        group: "1",
        seatClass: "ROYAL Class",
        seats: ["3A"],
        flightNumber: "RA 9012",
        departureDate: "2024-11-25",
        departureTime: "10:15",
        bookingID: "BOOK003",
        passengerID: "PASS001"
    } as any
];

export default function TicketsMenu() {
    // Estados para los filtros visuales
    const [selected1, setSelected1] = useState<boolean>(true);
    const [selected2, setSelected2] = useState<boolean>(false);
    const [selected3, setSelected3] = useState<boolean>(false);

    // Estado para los pases de abordar
    const [passes] = useState<BoardingPass[]>(MOCK_BOARDING_PASSES);
    const [filteredPasses, setFilteredPasses] = useState<BoardingPass[]>(MOCK_BOARDING_PASSES);
    const [loading] = useState<boolean>(false);

    // Filtrar todos los tiquetes
    const filterAll = () => {
        setSelected1(true);
        setSelected2(false);
        setSelected3(false);
        setFilteredPasses(passes);
    };

    // Filtrar tiquetes activos (fechas futuras)
    const parseBackendDate = (date: string | number[] | Date): Date => {
        if (Array.isArray(date)) {
            return new Date(
                date[0],          // año
                date[1] - 1,      // mes (JS empieza en 0)
                date[2],          // día
                date[3] ?? 0,     // hora
                date[4] ?? 0,
                date[5] ?? 0
            );
        }
    
        return new Date(date);
    };
    

    // Filtrar tiquetes antiguos (fechas pasadas)
const filterActive = () => {
    setSelected1(false);
    setSelected2(false);
    setSelected3(true);

    const today = new Date();

    const active = passes.filter(pass => {
        const passDate = parseBackendDate(pass.departureDate);
        return passDate < today;
    });

    setFilteredPasses(active);
};

    

    return (
        <div className="bg-white min-h-screen">
            <Helmet>
                <title>Mis Tiquetes - Royal Airlines</title>
            </Helmet>

            <Navbar />

            <div className="bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                    
                    {/* Header */}
                    <motion.div 
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-4">
                            Mis Tiquetes
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                            Administra todos tus vuelos en un solo lugar
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-4 gap-8">
                        
                        {/* Sidebar - Filtros */}
                        <motion.div 
                            className="lg:col-span-1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 sticky top-6 shadow-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                    Filtros
                                </h3>
                                
                                <div className="space-y-3">
                                    {/* Filtro: Todos */}
                                    <button
                                        onClick={filterAll}
                                        className={`w-full px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-between ${
                                            selected1 
                                                ? 'bg-gray-900 text-white shadow-md' 
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Todos los tiquetes
                                        </span>
                                        {selected1 && (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>

                                    {/* Filtro: Activos */}
                                    <button
                                        onClick={filterActive}
                                        className={`w-full px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-between ${
                                            selected2 
                                                ? 'bg-gray-900 text-white shadow-md' 
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                            </svg>
                                            Tiquetes activos
                                        </span>
                                        {selected2 && (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>

                                    {/* Filtro: Antiguos */}
                                    <button
                                        onClick={filterActive}
                                        className={`w-full px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-between ${
                                            selected3 
                                                ? 'bg-gray-900 text-white shadow-md' 
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Tiquetes antiguos
                                        </span>
                                        {selected3 && (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                {/* Stats - MEJORADO */}
                                <div className="mt-6 pt-6 border-t-2 border-gray-200">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-sm font-semibold text-gray-700">Total de vuelos</p>
                                        <p className="text-3xl font-bold text-gray-900">{passes.length}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-semibold text-gray-700">Mostrando</p>
                                        <p className="text-xl font-bold text-blue-600">{filteredPasses.length}</p>
                                    </div>
                                </div>

                                {/* Quick Actions - MEJORADO */}
                                <div className="mt-6 pt-6 border-t-2 border-gray-200 space-y-2">
                                    <button className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Buscar vuelos
                                    </button>
                                    <button className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Descargar todo
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content Area */}
                        <motion.div 
                            className="lg:col-span-3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {loading ? (
                                // Skeleton Loader
                                <div className="space-y-6">
                                    {[1, 2].map((i) => (
                                        <div key={i} className="bg-white rounded-2xl border-2 border-gray-200 p-6 animate-pulse">
                                            <div className="flex gap-4">
                                                <div className="w-20 h-full bg-gray-200 rounded-lg"></div>
                                                <div className="flex-1 space-y-3">
                                                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : filteredPasses.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {filteredPasses.map((pass, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                        >
                                            <BoardingPassCard boardingPass={pass} />
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                // Empty State - MEJORADO
                                <div className="bg-white rounded-2xl border-2 border-gray-200 p-12 text-center shadow-sm">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                        {selected2 ? 'No tienes vuelos activos' : 'No hay tiquetes antiguos'}
                                    </h3>
                                    <p className="text-gray-600 mb-6 text-lg">
                                        {selected2 ? '¡Es hora de planear tu próxima aventura!' : 'Tus vuelos pasados aparecerán aquí'}
                                    </p>
                                    <button 
                                        onClick={() => window.location.href = '/'}
                                        className="px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-bold shadow-lg hover:shadow-xl"
                                    >
                                        Buscar vuelos
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}