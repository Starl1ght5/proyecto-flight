import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { Flight, Fee, ReservedFlight } from '../../types.tsx';

export const FlightCard: React.FC<Flight> = ({ flight, returnInfo }) => {

    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkViewport = () => setIsMobile(window.innerWidth < 768);
        checkViewport();
        window.addEventListener("resize", checkViewport);
        return () => window.removeEventListener("resize", checkViewport);
    }, []);

    const [direction, setDirection] = useState<"left" | "right">("right");


    const depDate = new Date(flight.departureDate);
    const formattedDepDate = depDate.toLocaleTimeString("es-CO", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true 
    });

    const arrDate = new Date(flight.arrivalDate);
    const formattedArrDate = arrDate.toLocaleTimeString("es-CO", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    const formattedBase = (flight.availableFees[0].price.amount).toLocaleString();
    const formattedComplete = (flight.availableFees[1].price.amount).toLocaleString();
    const formattedRoyal = (flight.availableFees[2].price.amount).toLocaleString();

    const changeState = () => {
        setOpen(prevState => !prevState);
    };

    const sendInfo = (selectedFee: Fee) => {
        const object: ReservedFlight = {
            flight: flight,
            fee: selectedFee,
            reset: () => {},
        };
        returnInfo(object);
    };

    const tarjetas = [
        // BASIC CARD
        (
            <motion.div
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{
                    background: '#181c27',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(29,78,216,0.35)' }}
            >
                {/* Header */}
                <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Tarifa</p>
                    <h2 className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.85)' }}>Basic</h2>
                    <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Viaja ligero y ahorra</p>
                </div>

                {/* Features */}
                <div className="px-6 py-6 space-y-3 flex-1">
                    <FeatureItem included icon="check">Bolso o mochila pequeña</FeatureItem>
                    <FeatureItem icon="close">Equipaje de mano 10kg</FeatureItem>
                    <FeatureItem icon="close">Equipaje de bodega 20kg</FeatureItem>
                    <FeatureItem icon="close">Embarque prioritario</FeatureItem>
                    <FeatureItem icon="close">Reembolso antes del vuelo</FeatureItem>
                    <FeatureItem icon="close">Selección de asientos estándar</FeatureItem>
                    <FeatureItem warning>Cambio de asiento con cargo + diferencia de precio</FeatureItem>
                    <FeatureItem included special icon="miles">Acumula 3 Royal Miles por dólar</FeatureItem>
                </div>

                {/* Price */}
                <div className="px-6 py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.04)' }}>
                    <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Desde</p>
                    <h3 className="text-3xl font-bold mb-0.5" style={{ color: '#fff' }}>COP {formattedBase}</h3>
                    <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>Por pasajero · Tarifas incluidas*</p>
                    <motion.button
                        className="w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all"
                        style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.12)' }}
                        onClick={() => sendInfo(flight.availableFees[0])}
                        whileHover={{ scale: 1.02, background: 'rgba(255,255,255,0.1)' }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Seleccionar Basic
                    </motion.button>
                </div>
            </motion.div>
        ),

        // COMPLETE CARD
        (
            <motion.div
                className="rounded-2xl overflow-hidden flex flex-col relative"
                style={{
                    background: 'linear-gradient(145deg, #0f1117, #0d1018)',
                    border: '1.5px solid #2563eb',
                    boxShadow: '0 8px 40px rgba(29,78,216,0.4)',
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(29,78,216,0.5)' }}
            >
                {/* Popular Badge */}
                <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold tracking-wider"
                    style={{ background: '#1d4ed8', color: '#fff', boxShadow: '0 2px 12px rgba(29,78,216,0.5)' }}
                >
                    MÁS POPULAR
                </div>

                {/* Header */}
                <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(37,99,235,0.3)', background: 'rgba(29,78,216,0.12)' }}>
                    <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: '#60a5fa' }}>Tarifa</p>
                    <h2 className="text-2xl font-bold" style={{ color: '#3b82f6' }}>Complete</h2>
                    <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>La opción más completa</p>
                </div>

                {/* Features */}
                <div className="px-6 py-6 space-y-3 flex-1">
                    <FeatureItem included icon="check">Bolso o mochila pequeña</FeatureItem>
                    <FeatureItem included icon="check">Equipaje de mano 10kg</FeatureItem>
                    <FeatureItem included icon="check">Equipaje de bodega 20kg</FeatureItem>
                    <FeatureItem included icon="check">Embarque prioritario</FeatureItem>
                    <FeatureItem icon="close">Reembolso antes del vuelo</FeatureItem>
                    <FeatureItem icon="close">Selección de asientos estándar</FeatureItem>
                    <FeatureItem warning>Cambio de asiento con cargo + diferencia de precio</FeatureItem>
                    <FeatureItem included special icon="miles">Acumula 5 Royal Miles por dólar</FeatureItem>
                </div>

                {/* Price */}
                <div className="px-6 py-5" style={{ borderTop: '1px solid rgba(37,99,235,0.3)', background: 'rgba(29,78,216,0.1)' }}>
                    <p className="text-xs mb-1" style={{ color: '#60a5fa' }}>Desde</p>
                    <h3 className="text-3xl font-bold mb-0.5" style={{ color: '#3b82f6' }}>COP {formattedComplete}</h3>
                    <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>Por pasajero · Tarifas incluidas*</p>
                    <motion.button
                        className="w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all"
                        style={{ background: '#1d4ed8', color: '#fff', boxShadow: '0 4px 20px rgba(29,78,216,0.5)' }}
                        onClick={() => sendInfo(flight.availableFees[1])}
                        whileHover={{ scale: 1.02, background: '#2563eb' }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Seleccionar Complete
                    </motion.button>
                </div>
            </motion.div>
        ),

        // ROYAL CARD
        (
            <motion.div
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{
                    background: 'linear-gradient(145deg, #0a0c12, #0f1117)',
                    border: '1.5px solid rgba(251,191,36,0.6)',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(251,191,36,0.2)' }}
            >
                {/* Header */}
                <div
                    className="px-6 py-5"
                    style={{
                        borderBottom: '1px solid rgba(251,191,36,0.25)',
                        background: 'linear-gradient(135deg, rgba(251,191,36,0.12), rgba(245,158,11,0.06))',
                    }}
                >
                    <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'rgba(251,191,36,0.7)' }}>Tarifa</p>
                    <h2 className="text-2xl font-bold flex items-center gap-2" style={{ color: '#fbbf24' }}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Royal
                    </h2>
                    <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Experiencia premium</p>
                </div>

                {/* Features */}
                <div className="px-6 py-6 space-y-3 flex-1">
                    <FeatureItem included icon="check" dark>Bolso o mochila pequeña</FeatureItem>
                    <FeatureItem included icon="check" dark>Equipaje de mano 13kg</FeatureItem>
                    <FeatureItem included icon="check" dark>Equipaje de bodega 25kg</FeatureItem>
                    <FeatureItem included icon="check" dark>Embarque prioritario</FeatureItem>
                    <FeatureItem included icon="check" dark>Reembolso antes del vuelo</FeatureItem>
                    <FeatureItem included icon="check" dark>
                        Asientos en primera fila <span style={{ color: 'rgba(255,255,255,0.35)' }}>o donde quieras</span>
                    </FeatureItem>
                    <FeatureItem included icon="check" dark>Cambio de asiento sin cargo + diferencia de precio</FeatureItem>
                    <FeatureItem included special icon="miles" dark>Acumula 8 Royal Miles por dólar</FeatureItem>
                </div>

                {/* Price */}
                <div
                    className="px-6 py-5"
                    style={{
                        borderTop: '1px solid rgba(251,191,36,0.25)',
                        background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(245,158,11,0.05))',
                    }}
                >
                    <p className="text-xs mb-1" style={{ color: 'rgba(251,191,36,0.7)' }}>Desde</p>
                    <h3 className="text-3xl font-bold mb-0.5" style={{ color: '#fbbf24' }}>COP {formattedRoyal}</h3>
                    <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>Por pasajero · Tarifas incluidas*</p>
                    <motion.button
                        className="w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all"
                        style={{
                            background: 'linear-gradient(135deg, #d97706, #b45309)',
                            color: '#0a0c12',
                            boxShadow: '0 4px 20px rgba(251,191,36,0.25)',
                        }}
                        onClick={() => sendInfo(flight.availableFees[2])}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Seleccionar Royal
                    </motion.button>
                </div>
            </motion.div>
        )
    ];

    return (
        <motion.div
            className="w-full max-w-7xl rounded-2xl overflow-hidden transition-all duration-300"
            style={{
                background: '#0f1117',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 4px 32px rgba(0,0,0,0.6)',
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ boxShadow: '0 8px 48px rgba(29,78,216,0.25)' }}
        >
            {/* Flight Info Header */}
            <div
                className="px-5 sm:px-6 lg:px-8 py-5 sm:py-6 cursor-pointer transition-all duration-200"
                style={{ background: 'transparent' }}
                onClick={changeState}
            >
                <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-8">
                    {/* Flight Route Info */}
                    <div className="flex-1 flex flex-row items-center gap-3 sm:gap-6 lg:gap-10">
                        {/* Departure */}
                        <div className="flex flex-col items-center lg:items-start min-w-[80px]">
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{ color: '#fff' }}>{formattedDepDate}</h2>
                            <p className="text-sm font-semibold mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{flight.departureLocation.cityName}</p>
                            <p className="text-xs mt-0.5 font-mono" style={{ color: '#3b82f6' }}>{flight.departureLocation.iataCode}</p>
                        </div>

                        {/* Flight Duration */}
                        <div className="flex flex-col items-center flex-1 min-w-0">
                            <div className="flex items-center gap-2 w-full">
                                <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.12)' }}></div>
                                <div
                                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'rgba(29,78,216,0.25)', border: '1px solid rgba(37,99,235,0.4)' }}
                                >
                                    <svg className="w-3.5 h-3.5" style={{ color: '#3b82f6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                                <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.12)' }}></div>
                            </div>
                            <div className="text-center mt-2">
                                <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>Duración</p>
                                <p className="text-sm font-bold mt-0.5" style={{ color: 'rgba(255,255,255,0.75)' }}>{flight.duration}</p>
                            </div>
                        </div>

                        {/* Arrival */}
                        <div className="flex flex-col items-center lg:items-end min-w-[80px]">
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{ color: '#fff' }}>{formattedArrDate}</h2>
                            <p className="text-sm font-semibold mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{flight.arrivalLocation.cityName}</p>
                            <p className="text-xs mt-0.5 font-mono" style={{ color: '#3b82f6' }}>{flight.arrivalLocation.iataCode}</p>
                        </div>
                    </div>

                    {/* Price Section */}
                    <div
                        className="flex flex-col justify-center items-center lg:items-end px-4 sm:px-5 py-3 lg:py-0 rounded-xl lg:rounded-none min-w-[160px] lg:min-w-[190px]"
                        style={{ background: 'rgba(29,78,216,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}
                    >
                        <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Desde</p>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-0.5" style={{ color: '#3b82f6' }}>COP {formattedBase}</h1>
                        <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Por persona · Tarifas incluidas*</p>
                    </div>
                </div>

                {/* Airline Info */}
                <div
                    className="flex items-center justify-center gap-2 mt-5 pt-4"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                >
                    <svg className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Operado por</p>
                    <h3 className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.75)' }}>{flight.airline}</h3>
                </div>

                {/* Expand Indicator */}
                <motion.div
                    className="flex justify-center mt-4"
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                        <svg className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.5)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </motion.div>
            </div>

            {/* Tariffs Section */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="px-4 sm:px-6 lg:px-8 py-8"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: '#0a0c12' }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3
                            className="text-center text-xl sm:text-2xl font-bold mb-2"
                            style={{ color: 'rgba(255,255,255,0.85)' }}
                        >
                            Elige tu tarifa
                        </h3>
                        <p className="text-center text-sm mb-8" style={{ color: 'rgba(255,255,255,0.35)' }}>
                            Selecciona el plan que mejor se adapte a tu viaje
                        </p>

                        {isMobile ? (
                            <div className="relative w-full flex flex-col items-center">
                                <div className="relative w-full min-h-[600px] overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeIndex}
                                            initial={{ opacity: 0, x: direction === "right" ? 100 : -100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: direction === "right" ? -100 : 100 }}
                                            transition={{ duration: 0.4 }}
                                            className="absolute w-full"
                                        >
                                            {tarjetas[activeIndex]}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div className="flex justify-between w-full mt-6 px-4">
                                    <motion.button
                                        onClick={() => {
                                            setDirection("left");
                                            setActiveIndex((prev) => (prev - 1 + tarjetas.length) % tarjetas.length);
                                        }}
                                        className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
                                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)' }}
                                        whileHover={{ scale: 1.1, background: '#1d4ed8' }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </motion.button>

                                    <div className="flex gap-2 items-center">
                                        {tarjetas.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className="h-2 rounded-full transition-all duration-300"
                                                style={{
                                                    width: idx === activeIndex ? '2rem' : '0.5rem',
                                                    background: idx === activeIndex ? '#2563eb' : 'rgba(255,255,255,0.2)',
                                                }}
                                            />
                                        ))}
                                    </div>

                                    <motion.button
                                        onClick={() => {
                                            setDirection("right");
                                            setActiveIndex((prev) => (prev + 1) % tarjetas.length);
                                        }}
                                        className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
                                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)' }}
                                        whileHover={{ scale: 1.1, background: '#1d4ed8' }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </motion.button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
                                {tarjetas}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// Componente auxiliar para los feature items
const FeatureItem: React.FC<{
    children: React.ReactNode;
    included?: boolean;
    warning?: boolean;
    special?: boolean;
    icon?: "check" | "close" | "warning" | "miles";
    dark?: boolean;
}> = ({
    children,
    included = false,
    warning = false,
    special = false,
    icon = "check",
    dark = false
}) => {

    const getIcon = () => {
        if (warning) {
            return (
                <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#f87171' }} fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            );
        }

        if (icon === "miles") {
            return (
                <svg
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: dark ? '#fbbf24' : '#60a5fa' }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                        clipRule="evenodd"
                    />
                </svg>
            );
        }

        if (included) {
            return (
                <svg
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: dark ? '#fbbf24' : '#3b82f6' }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                    />
                </svg>
            );
        }

        return (
            <svg
                className="w-4 h-4 flex-shrink-0"
                style={{ color: 'rgba(255,255,255,0.2)' }}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                />
            </svg>
        );
    };

    const getTextStyle = (): React.CSSProperties => {
        if (warning) return { color: '#fca5a5', fontWeight: 600 };

        if (special) {
            return dark
                ? { color: '#fbbf24', fontWeight: 700 }
                : { color: '#60a5fa', fontWeight: 700 };
        }

        if (dark) return { color: 'rgba(255,255,255,0.75)' };
        if (included) return { color: 'rgba(255,255,255,0.85)' };

        return { color: 'rgba(255,255,255,0.35)' };
    };

    return (
        <div className="flex items-start gap-2.5">
            {getIcon()}
            <p className="text-sm leading-snug" style={getTextStyle()}>
                {children}
            </p>
        </div>
    );
};