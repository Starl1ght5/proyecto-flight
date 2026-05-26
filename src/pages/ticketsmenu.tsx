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

    // 🎨 Estados visuales
    const [selected1, setSelected1] = useState<boolean>(true);
    const [selected2, setSelected2] = useState<boolean>(false);
    const [selected3, setSelected3] = useState<boolean>(false);

    // 📦 Estado de pases
    const [passes] = useState<BoardingPass[]>(MOCK_BOARDING_PASSES);
    const [filteredPasses, setFilteredPasses] = useState<BoardingPass[]>(MOCK_BOARDING_PASSES);
    const [loading] = useState<boolean>(false);

    // 📅 Convertir fecha
    const parseBackendDate = (date: string | number[] | Date): Date => {
        if (Array.isArray(date)) {
            return new Date(
                date[0],
                date[1] - 1,
                date[2],
                date[3] ?? 0,
                date[4] ?? 0,
                date[5] ?? 0
            );
        }

        return new Date(date);
    };

    const filterAll = () => {
        setSelected1(true);
        setSelected2(false);
        setSelected3(false);
        setFilteredPasses(passes);
    };

    const filterActive = () => {
        setSelected1(false);
        setSelected2(true);
        setSelected3(false);

        const today = new Date();

        const active = passes.filter(pass => {
            const passDate = parseBackendDate(pass.departureDate);
            return passDate >= today;
        });

        setFilteredPasses(active);
    };


    const filterOld = () => {
        setSelected1(false);
        setSelected2(false);
        setSelected3(true);

        const today = new Date();

        const old = passes.filter(pass => {
            const passDate = parseBackendDate(pass.departureDate);
            return passDate < today;
        });

        setFilteredPasses(old);
    };

    return (
        <div className="bg-[#070B14] min-h-screen">
            <Helmet>
                <title>Mis Tiquetes - Royal Airlines</title>
            </Helmet>

            <Navbar />

            <div className="bg-gradient-to-b from-[#070B14] via-[#0B1120] to-[#111827]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">

                    {/* Header */}
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-500/10 border border-cyan-400/20 rounded-3xl mb-6 shadow-2xl">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            Mis Tiquetes
                        </h1>

                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Administra todos tus vuelos en una experiencia premium y moderna
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-4 gap-8">

                        {/* Sidebar */}
                        <motion.div
                            className="lg:col-span-1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sticky top-6 shadow-2xl">

                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                    Filtros
                                </h3>

                                <div className="space-y-3">

                                    {/* Todos */}
                                    <button
                                        onClick={filterAll}
                                        className={`w-full px-4 py-3 rounded-2xl font-semibold transition-all flex items-center justify-between ${
                                            selected1
                                                ? "bg-[#2563eb] text-white shadow-lg shadow-cyan-500/30"
                                                : "bg-[#2563eb] text-gray-300 hover:bg-white/10 border border-white/10"
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Todos
                                        </span>
                                    </button>

                                    {/* Activos */}
                                    <button
                                        onClick={filterActive}
                                        className={`w-full px-4 py-3 rounded-2xl font-semibold transition-all flex items-center justify-between ${
                                            selected2
                                                ? "bg-[#2563eb] text-white shadow-lg shadow-emerald-500/30"
                                                : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                                            </svg>
                                            Activos
                                        </span>
                                    </button>

                                    {/* Antiguos */}
                                    <button
                                        onClick={filterOld}
                                        className={`w-full px-4 py-3 rounded-2xl font-semibold transition-all flex items-center justify-between ${
                                            selected3
                                                ? "bg-[#2563eb] text-white shadow-lg shadow-purple-500/30"
                                                : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Antiguos
                                        </span>
                                    </button>
                                </div>

                                {/* Stats */}
                                <div className="mt-8 pt-6 border-t border-white/10 space-y-4">

                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                        <p className="text-gray-400 text-sm mb-1">
                                            Total vuelos
                                        </p>
                                        <h2 className="text-4xl font-bold text-white">
                                            {passes.length}
                                        </h2>
                                    </div>

                                    <div className="bg-white/5 rounded-2xl p-4 border border-cyan-400/10">
                                        <p className="text-white text-sm mb-1">
                                            Mostrando
                                        </p>
                                        <h2 className="text-3xl font-bold text-white">
                                            {filteredPasses.length}
                                        </h2>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-8 pt-6 border-t border-white/10 space-y-3">

                                    <button className="w-full px-4 py-3 bg-[#2563eb] hover:bg-[#2525eb] text-white rounded-2xl font-semibold transition-all shadow-lg shadow-cyan-500/20">
                                        Buscar vuelos
                                    </button>

                                    <button className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-semibold transition-all border border-white/10">
                                        Descargar todo
                                    </button>

                                </div>

                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            className="lg:col-span-3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >

                            {loading ? (

                                <div className="space-y-6">
                                    {[1, 2].map((i) => (
                                        <div
                                            key={i}
                                            className="bg-white/5 border border-white/10 rounded-3xl p-6 animate-pulse"
                                        >
                                            <div className="h-40 bg-white/10 rounded-2xl"></div>
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

                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">

                                    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>

                                    <h3 className="text-3xl font-bold text-white mb-3">
                                        No hay resultados
                                    </h3>

                                    <p className="text-gray-400 mb-8">
                                        Tus vuelos aparecerán aquí automáticamente
                                    </p>

                                    <button
                                        onClick={() => window.location.href = "/"}
                                        className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-white rounded-2xl font-bold transition-all shadow-lg shadow-cyan-500/20"
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