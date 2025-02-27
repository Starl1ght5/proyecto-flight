import { motion } from 'framer-motion';
import { useState } from "react";
import { Flight, Fee, ReservedFlight } from '../../Types';

export const FlightCard: React.FC<Flight> = ({ flight, returnInfo }) => {

    const [ open, setOpen ] = useState(false);

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

    return (
        <motion.div className="w-7xl rounded-lg shadow-xl bg-white flex flex-col hover:shadow-2xl duration-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} >

            <div className="px-8 pt-6 pb-4 hover:cursor-pointer" onClick={changeState}>

                <div className="flex flex-row justify-between" >
                    <div className="flex flex-row gap-4.5 ">
                        <div className="flex flex-col items-center" >
                            <h2 className="text-2-5xl">{formattedDepDate}</h2>
                            <div className="flex flex-row gap-2 font-extralight">
                                <p>{flight.departureLocation.cityName}</p>
                            </div>
                        </div>

                        <div className="flex flex-row items-center">
                            <hr className="w-45" />
                            <div className="text-center px-4 text-sm font-extralight">
                                <p>Duracion</p>
                                <p>{flight.duration}</p>
                            </div>
                            <hr className="w-45" />
                        </div>

                    <div className="flex flex-col items-center" >
                        <h2 className="text-2-5xl">{formattedArrDate}</h2>
                        <div className="flex flex-row gap-2 font-extralight">
                            <p>{flight.arrivalLocation.cityName}</p>
                            </div>
                        </div>
                    </div>
            
                    <div className="flex flex-col">
                        <p className="text-sm">Por persona desde</p>
                        <h1 className="text-2xl" >COP {formattedBase}</h1>
                    </div>
                </div>

                <div className="flex flex-row justify-center gap-1.5 text-sm font-extralight mt-3">
                    <p>Operado por</p>
                    <h3 className="font-semibold" >{flight.airline}</h3>
                </div>
            </div>

            {open && 
                <div className="bg-gray-200 px-8 pb-10 rounded-b-lg">
                    <h3 className="text-center my-3">Tarifas disponibles</h3>

                    <div className="flex flex-row justify-center gap-3">

                        {/*Tarifa 1*/}
                        <motion.div className="bg-white px-8 py-6 w-86 rounded-lg shadow-lg hover:scale-105 duration-150"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}>
                            <h2 className="text-2xl mb-4.5">Basic</h2>

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
                                <p className="italic" >Incluye tarifas e impuestos*</p>
                            </div>

                            <button className="w-full justify-end hover:cursor-pointer mt-4 font-extralight border-2 border-black rounded-xl px-5 py-3" onClick={() => sendInfo(flight.availableFees[0])} >Seleccionar</button>
                        </motion.div>


                        {/*Tarifa 2*/}
                        <motion.div className="bg-white px-8 py-6 w-86 rounded-lg shadow-lg hover:scale-105 duration-150" 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}>
                            <h2 className="text-2xl mb-4.5">Complete</h2>

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
                                <p className="italic" >Incluye tarifas e impuestos*</p>
                            </div>

                            <button className="w-full justify-end hover:cursor-pointer mt-4 font-extralight border-2 border-black rounded-xl px-5 py-3" onClick={() => sendInfo(flight.availableFees[1])}>Seleccionar</button>
                        </motion.div>


                        {/*Tarifa 3*/}
                        <motion.div className="bg-white px-8 py-6 w-86 rounded-lg shadow-lg hover:scale-105 duration-150"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}>
                            <h2 className="text-2xl mb-4.5 text-gold">Royal</h2>

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
                                <p className="italic" >Incluye tarifas e impuestos*</p>
                            </div>

                            <button className="w-full justify-end hover:cursor-pointer mt-4 font-extralight border-2 border-black rounded-xl px-5 py-3" onClick={() => sendInfo(flight.availableFees[2])}>Seleccionar</button>
                        </motion.div>

                    </div>
                </div>
            }
            
        </motion.div>
    )
}