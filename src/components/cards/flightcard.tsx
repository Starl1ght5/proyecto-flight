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
        // BASIC CARD - REDISEÑADA
        (
            <motion.div 
                className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8 }}
            >
                {/* Header */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 px-6 py-4 border-b-2 border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900">Basic</h2>
                    <p className="text-sm text-gray-600 mt-1">Viaja ligero y ahorra</p>
                </div>

                {/* Features */}
                <div className="px-6 py-6 space-y-3">
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
                <div className="px-6 py-4 bg-gray-50 border-t-2 border-gray-100">
                    <div className="mb-4">
                        <p className="text-sm text-gray-600">Desde</p>
                        <h3 className="text-3xl font-bold text-gray-900">COP {formattedBase}</h3>
                        <p className="text-xs text-gray-500 italic mt-1">Por pasajero • Tarifas incluidas*</p>
                    </div>
                    <motion.button 
                        className="w-full bg-gray-900 hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
                        onClick={() => sendInfo(flight.availableFees[0])}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Seleccionar Basic
                    </motion.button>
                </div>
            </motion.div>
        ),

        // COMPLETE CARD - REDISEÑADA
        (
            <motion.div 
                className="bg-white rounded-2xl shadow-xl border-2 border-blue-300 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 overflow-hidden relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8 }}
            >
                {/* Popular Badge */}
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    MÁS POPULAR
                </div>

                {/* Header */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-4 border-b-2 border-blue-200">
                    <h2 className="text-2xl font-bold text-blue-600">Complete</h2>
                    <p className="text-sm text-gray-700 mt-1">La opción más completa</p>
                </div>

                {/* Features */}
                <div className="px-6 py-6 space-y-3">
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
                <div className="px-6 py-4 bg-blue-50 border-t-2 border-blue-200">
                    <div className="mb-4">
                        <p className="text-sm text-blue-700">Desde</p>
                        <h3 className="text-3xl font-bold text-blue-600">COP {formattedComplete}</h3>
                        <p className="text-xs text-gray-600 italic mt-1">Por pasajero • Tarifas incluidas*</p>
                    </div>
                    <motion.button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
                        onClick={() => sendInfo(flight.availableFees[1])}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Seleccionar Complete
                    </motion.button>
                </div>
            </motion.div>
        ),

        // ROYAL CARD - REDISEÑADA
        (
            <motion.div 
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border-2 border-yellow-500 hover:border-yellow-400 hover:shadow-3xl transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8 }}
            >
                {/* Header */}
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 px-6 py-4 border-b-2 border-yellow-400">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Royal
                    </h2>
                    <p className="text-sm text-gray-800 mt-1">Experiencia premium</p>
                </div>

                {/* Features */}
                <div className="px-6 py-6 space-y-3">
                    <FeatureItem included icon="check" dark>Bolso o mochila pequeña</FeatureItem>
                    <FeatureItem included icon="check" dark>Equipaje de mano 13kg</FeatureItem>
                    <FeatureItem included icon="check" dark>Equipaje de bodega 25kg</FeatureItem>
                    <FeatureItem included icon="check" dark>Embarque prioritario</FeatureItem>
                    <FeatureItem included icon="check" dark>Reembolso antes del vuelo</FeatureItem>
                    <FeatureItem included icon="check" dark>
                        Asientos en primera fila <span className="text-gray-400">o donde quieras</span>
                    </FeatureItem>
                    <FeatureItem included icon="check" dark>Cambio de asiento sin cargo + diferencia de precio</FeatureItem>
                    <FeatureItem included special icon="miles" dark>Acumula 8 Royal Miles por dólar</FeatureItem>
                </div>

                {/* Price */}
                <div className="px-6 py-4 bg-gradient-to-br from-yellow-500 to-yellow-600 border-t-2 border-yellow-400">
                    <div className="mb-4">
                        <p className="text-sm text-gray-900">Desde</p>
                        <h3 className="text-3xl font-bold text-gray-900">COP {formattedRoyal}</h3>
                        <p className="text-xs text-gray-800 italic mt-1">Por pasajero • Tarifas incluidas*</p>
                    </div>
                    <motion.button 
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
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
            className="max-w-7xl rounded-2xl shadow-2xl bg-white border-2 border-gray-200 hover:border-blue-300 overflow-hidden transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        >
            {/* Flight Info Header */}
            <div 
                className="px-6 lg:px-8 py-6 cursor-pointer bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-blue-50 transition-all duration-200" 
                onClick={changeState}
            >
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                    {/* Flight Route Info */}
                    <div className="flex-1 flex flex-row items-center gap-4 lg:gap-8">
                        {/* Departure */}
                        <div className="flex flex-col items-center lg:items-start">
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{formattedDepDate}</h2>
                            <p className="text-sm lg:text-base text-gray-600 font-semibold">{flight.departureLocation.cityName}</p>
                            <p className="text-xs text-gray-500">{flight.departureLocation.iataCode}</p>
                        </div>

                        {/* Flight Duration */}
                        <div className="flex flex-col items-center flex-1">
                            <div className="flex items-center gap-2 w-full max-w-xs">
                                <div className="h-0.5 bg-gray-300 flex-1"></div>
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                                <div className="h-0.5 bg-gray-300 flex-1"></div>
                            </div>
                            <div className="text-center mt-2">
                                <p className="text-xs text-gray-500 font-semibold">Duración</p>
                                <p className="text-sm font-bold text-gray-700">{flight.duration}</p>
                            </div>
                        </div>

                        {/* Arrival */}
                        <div className="flex flex-col items-center lg:items-end">
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{formattedArrDate}</h2>
                            <p className="text-sm lg:text-base text-gray-600 font-semibold">{flight.arrivalLocation.cityName}</p>
                            <p className="text-xs text-gray-500">{flight.arrivalLocation.iataCode}</p>
                        </div>
                    </div>

                    {/* Price Section */}
                    <div className="flex flex-col justify-center items-center lg:items-end bg-blue-50 lg:bg-transparent px-4 lg:px-0 py-3 lg:py-0 rounded-xl lg:rounded-none min-w-[180px]">
                        <p className="text-xs text-gray-600 font-semibold">Desde</p>
                        <h1 className="text-2xl lg:text-3xl font-bold text-blue-600">COP {formattedBase}</h1>
                        <p className="text-xs text-gray-500 italic">Por persona • Tarifas incluidas*</p>
                    </div>
                </div>

                {/* Airline Info */}
                <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-gray-200">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <p className="text-sm text-gray-600">Operado por</p>
                    <h3 className="text-sm font-bold text-gray-900">{flight.airline}</h3>
                </div>

                {/* Expand Indicator */}
                <motion.div 
                    className="flex justify-center mt-4"
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </motion.div>
            </div>

            {/* Tariffs Section */}
            <AnimatePresence>
                {open && (
                    <motion.div 
                        className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 md:px-8 py-8 border-t-2 border-gray-200"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="text-center text-2xl font-bold text-gray-900 mb-6">Elige tu tarifa</h3>

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
                                        className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </motion.button>

                                    <div className="flex gap-2 items-center">
                                        {tarjetas.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`w-2 h-2 rounded-full transition-all ${
                                                    idx === activeIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>

                                    <motion.button
                                        onClick={() => {
                                            setDirection("right");
                                            setActiveIndex((prev) => (prev + 1) % tarjetas.length);
                                        }}
                                        className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </motion.button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-3 gap-6">
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
                <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
                    className={`w-5 h-5 flex-shrink-0 ${dark ? "text-yellow-400" : "text-blue-600"}`}
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
                    className={`w-5 h-5 flex-shrink-0 ${dark ? "text-yellow-400" : "text-blue-600"}`}
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
                className="w-5 h-5 text-gray-400 flex-shrink-0"
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

    const getTextStyle = () => {
        if (warning) return "text-red-600 font-semibold";

        if (special) {
            return dark
                ? "text-yellow-300 font-bold"
                : "text-blue-700 font-bold";
        }

        if (dark) return "text-gray-100";
        if (included) return "text-gray-900";

        return "text-gray-500";
    };

    return (
        <div className="flex items-start gap-2">
            {getIcon()}
            <p className={`text-sm ${getTextStyle()}`}>
                {children}
            </p>
        </div>
    );
};
