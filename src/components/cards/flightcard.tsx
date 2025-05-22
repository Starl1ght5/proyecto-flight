import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { Flight, Fee, ReservedFlight } from '../../types.tsx';

export const FlightCard: React.FC<Flight> = ({ flight, returnInfo }) => {

    const [ open, setOpen ] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkViewport = () => setIsMobile(window.innerWidth < 768);
        checkViewport();
        window.addEventListener("resize", checkViewport);
        return () => window.removeEventListener("resize", checkViewport);
    }, []);

    const [direction, setDirection] = useState<"left" | "right">("right");

    const depDate = new Date(flight.departureDate[0], flight.departureDate[1], flight.departureDate[2], flight.departureDate[3], flight.departureDate[4], flight.departureDate[5], flight.departureDate[6]);
    const formattedDepDate = depDate.toLocaleTimeString("es-CO", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true 
    });

    const arrDate = new Date(flight.arrivalDate[0], flight.arrivalDate[1], flight.arrivalDate[2], flight.arrivalDate[3], flight.arrivalDate[4], flight.arrivalDate[5], flight.arrivalDate[6]);
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
    (
      <motion.div className="bg-white px-8 py-6 w-86 rounded-lg shadow-lg hover:scale-105 duration-150"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}>
            <h2 className="text-2xl md:mb-4.5 mb-2.5">Basic</h2>

            <div className="flex flex-col gap-2 text-sm font-light">

                <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[fluent--checkmark-circle-12-filled] size-4 bg-lilac" />
                    <p>Bolso o mochila pequeña</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[fluent--checkmark-circle-12-filled] size-4 bg-gray-400" />
                    <p className="text-gray-600">Equipaje de mano 10kg</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[fluent--checkmark-circle-12-filled] size-4 bg-gray-400" />
                    <p className="text-gray-600">Equipaje de bodeja 20kg</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[fluent--checkmark-circle-12-filled] size-4 bg-gray-400" />
                    <p className="text-gray-600">Embarque prioritario</p>
                </div>
                    <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[fluent--checkmark-circle-12-filled] size-4 bg-gray-400" />
                    <p className="text-gray-600">Reembolso antes del vuelo</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[fluent--checkmark-circle-12-filled] size-4 bg-gray-400" />
                    <p className="text-gray-600" >Seleccion de asientos estandar</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[mingcute--warning-fill] size-5 bg-red-900" />
                    <div>
                        <p className="text-red-900">Cambio de asiento con cargo + diferencia de precio</p>  
                    </div>           
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[mdi--cards] size-4 bg-lilac" />
                    <p>Acumula 3 Royal Miles por dolar</p>
                </div>
            </div>
            <div className="flex flex-col mt-6 text-sm font-light" >
                <h2 className="text-xl font-normal" >COP {formattedBase}</h2>
                <p>Por pasajero</p>
                <p className="italic text-xs md:text-sm" >Incluye tarifas e impuestos*</p>
            </div>

            <button className="w-full justify-end hover:cursor-pointer mt-4 font-extralight border-2 border-black rounded-xl px-3 py-2 md:px-5 md:py-3" onClick={() => sendInfo(flight.availableFees[0])} >Seleccionar</button>
        </motion.div>
    ),
    (
      <motion.div className="bg-white px-8 py-6 w-full md:w-86 rounded-lg shadow-lg hover:scale-105 duration-150" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}>
            <h2 className="text-2xl md:mb-4.5 mb-2.5">Complete</h2>

            <div className="flex flex-col gap-2 text-sm font-light">

                <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[fluent--checkmark-circle-12-filled] size-4 bg-lilac" />
                    <p>Bolso o mochila pequeña</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[fluent--checkmark-circle-12-filled] size-4 bg-lilac" />
                    <p>Equipaje de mano 10kg</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[fluent--checkmark-circle-12-filled] size-4 bg-lilac" />
                    <p>Equipaje de bodeja 20kg</p>
                </div>
                 <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[fluent--checkmark-circle-12-filled] size-4 bg-lilac" />
                    <p>Embarque prioritario</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[fluent--checkmark-circle-12-filled] size-4 bg-gray-400" />
                    <p className="text-gray-600">Reembolso antes del vuelo</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[fluent--checkmark-circle-12-filled] size-4 bg-gray-400" />
                    <p className="text-gray-600" >Seleccion de asientos estandar</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                <span className="icon-[mingcute--warning-fill] size-5 bg-red-900" />
                    <div>
                        <p className="text-red-900">Cambio de asiento con cargo + diferencia de precio</p>  
                    </div>
                                    
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[mdi--cards] size-4 bg-lilac" />
                    <p>Acumula 5 Royal Miles por dolar</p>
                </div>

            </div>

            <div className="flex flex-col mt-6 text-sm font-light" >
                <h2 className="text-xl font-normal" >COP {formattedComplete}</h2>
                <p>Por pasajero</p>
                <p className="italic text-xs md:text-sm" >Incluye tarifas e impuestos*</p>
            </div>

            <button className="w-full justify-end hover:cursor-pointer mt-4 font-extralight border-2 border-black rounded-xl px-3 py-2 md:px-5 md:py-3" onClick={() => sendInfo(flight.availableFees[1])}>Seleccionar</button>
        </motion.div>
    ),
    (
      <motion.div className="bg-white px-8 py-6 w-86 rounded-lg shadow-lg hover:scale-105 duration-150"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}>
            <h2 className="text-2xl md:mb-4.5 mb-2.5 text-gold">Royal</h2>

            <div className="flex flex-col gap-2 text-sm font-light">

                <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[fluent--checkmark-circle-12-filled] size-4 bg-lilac" />
                    <p>Bolso o mochila pequeña</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[fluent--checkmark-circle-12-filled] size-4 bg-lilac" />
                    <p>Equipaje de mano 13kg</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[fluent--checkmark-circle-12-filled] size-4 bg-lilac" />
                    <p>Equipaje de bodeja 25kg</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[fluent--checkmark-circle-12-filled] size-4 bg-lilac" />
                    <p>Embarque prioritario</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[fluent--checkmark-circle-12-filled] size-4 bg-lilac" />
                    <p>Reembolso antes del vuelo</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[fluent--checkmark-circle-12-filled] size-4 bg-lilac" />
                    <p>Asientos en primera fila <span className="text-gray-600" >o donde quieras</span></p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                <span className="icon-[fluent--checkmark-circle-12-filled] size-5 bg-lilac" />
                    <div>
                        <p>Cambio de asiento sin cargo + diferencia de precio</p>  
                    </div>
                                    
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <span className="icon-[mdi--cards] size-4 bg-lilac" />
                    <p>Acumula 8 Royal Miles por dolar</p>
                </div>

            </div>

            <div className="flex flex-col mt-6 text-sm font-light" >
                <h2 className="text-xl font-normal text-gold" >COP {formattedRoyal}</h2>
                <p>Por pasajero</p>
                <p className="italic text-xs md:text-sm" >Incluye tarifas e impuestos*</p>
            </div>

            <button className="w-full justify-end hover:cursor-pointer mt-4 font-extralight border-2 border-black rounded-xl px-3 py-2 md:px-5 md:py-3" onClick={() => sendInfo(flight.availableFees[2])}>Seleccionar</button>
        </motion.div>
    )
  ];

    return (
        <motion.div className="lg:w-7xl rounded-lg shadow-xl bg-white flex flex-col hover:shadow-2xl duration-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} >

            <div className="lg:px-8 px-3 lg:pt-6 pt-5 pb-5 hover:cursor-pointer" onClick={changeState}>

                <div className="flex flex-row justify-between">

                    <div className="flex flex-row lg:gap-4.5 gap-2.5">

                        <div className="flex flex-col items-center justify-center md:justify-baseline" >
                            <h2 className="md:text-2-5xl text-sm">{formattedDepDate}</h2>
                            <div className="flex flex-row md:gap-1 font-extralight">
                                <p className="text-sm md:text-base">{flight.departureLocation.cityName}</p>
                            </div>
                        </div>

                        <div className="flex flex-row items-center">
                            <hr className="lg:w-45 hidden lg:visible" />
                            <div className="text-center lg:px-4 text-sm font-extralight">
                                <p className="md:text-base text-xs">Duracion</p>
                                <p>{flight.duration}</p>
                            </div>
                            <hr className="lg:w-45 hidden lg:visible" />
                        </div>

                        <div className="flex flex-col items-center justify-center md:justify-baseline" >
                            <h2 className="lg:text-2-5xl text-sm">{formattedArrDate}</h2>
                            <div className="flex flex-row gap-2 font-extralight">
                                <p className="text-sm md:text-base">{flight.arrivalLocation.cityName}</p>
                            </div>
                        </div>

                    </div>
            
                    <div className="flex flex-col md:w-auto w-1/3">
                        <p className="text-xs">Por persona desde</p>
                        <h1 className="lg:text-2xl" >COP {formattedBase}</h1>
                        <p className="italic text-xs font-light" >Incluye tarifas e impuestos*</p>
                    </div>
                </div>

                <div className="flex flex-row justify-center gap-1.5 text-xs md:text-sm font-extralight mt-3">
                    <p>Operado por</p>
                    <h3 className="font-semibold" >{flight.airline}</h3>
                </div>
            </div>

            {open && 
                <div className="bg-gray-200 px-4 md:px-8 pb-10 rounded-b-lg">
                    <h3 className="text-center my-3">Tarifas disponibles</h3>

                    {isMobile ? (
                        <div className="relative w-full flex flex-col h-auto items-center min-h-[300px]">
                            <div className="relative w-full h-130 overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, x: direction === "right" ? 100 : -100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: direction === "right" ? -100 : 100 }}
                                        transition={{ duration: 0.4 }}
                                        className="absolute w-full h-full flex justify-center items-center"
                                    >
                                        {tarjetas[activeIndex]}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <div className="flex justify-between w-full mt-4 px-8 z-10">
                                <button
                                    onClick={() => {
                                        setDirection("left");
                                        setActiveIndex((prev) => (prev - 1 + tarjetas.length) % tarjetas.length);
                                    }}
                                 className="text-blue-600 font-semibold hover:cursor-pointer"
                                >
                                    <span className="icon-[si--chevron-left-circle-line] size-10 bg-lilac" />
                                </button>
                                <button
                                    onClick={() => {
                                        setDirection("right");
                                        setActiveIndex((prev) => (prev + 1) % tarjetas.length);
                                    }}
                                    className="text-blue-600 font-semibold hover:cursor-pointer"
                                >
                                    <span className="icon-[si--arrow-right-circle-line] size-10 bg-lilac" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row justify-center gap-3">
                            {tarjetas}
                        </div>
                    )}

                </div>
            }
            
        </motion.div>
    )
}