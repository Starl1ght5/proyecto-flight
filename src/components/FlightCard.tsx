import { motion } from 'framer-motion';
import { useState } from "react";

interface Flight {
    flight: FlightInfo;
}

interface Money {
    currency: Currency;
    amount: string;
}

interface Currency {
    code: string;
    numericCode: number;
    decimalPlaces: number;
}

interface Seat {
    seatID: string;
    seatNumber: string;
    seatPrice: Money;
    reserved: boolean;
}

interface FlightInfo {
    flightID: string;
    airline: string;
    ticketPrice: Money;
    duration: string;
    arrivalLocation: Location;
    departureLocation: Location;
    arrivalDate: Array<number>;
    departureDate: Array<number>;
    seatList: Array<Seat>;
}

interface Location {
    locationID: string;
    cityName: string;
    countryName: string;
    iataCode: string;
    airportName: string;
}


export const FlightCard: React.FC<Flight> = ({ flight }) => {

    const depDate = new Date(flight.departureDate[0], flight.departureDate[1], flight.departureDate[2], flight.departureDate[3], flight.departureDate[4], flight.departureDate[5], flight.departureDate[6]);
    const formattedDepDate = depDate.toLocaleTimeString("es-CO", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })

    const arrDate = new Date(flight.arrivalDate[0], flight.arrivalDate[1], flight.arrivalDate[2], flight.arrivalDate[3], flight.arrivalDate[4], flight.arrivalDate[5], flight.arrivalDate[6]);
    const formattedArrDate = arrDate.toLocaleTimeString("es-CO", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })

    return (
        <motion.div className="w-7xl px-8 pt-6 pb-4 rounded-lg shadow-xl bg-white flex flex-col hover:cursor-pointer hover:shadow-2xl duration-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} >

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
                    <h1 className="text-2xl" >COP {flight.ticketPrice.amount}</h1>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-1.5 text-sm font-extralight mt-3">
                <p>Operado por</p>
                <h3 className="font-semibold" >{flight.airline}</h3>
            </div>
            
        </motion.div>
    )
}