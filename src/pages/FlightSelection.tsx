import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { FlightCard } from '../Components/Cards/FlightCard';
import Navbar from '../Components/Navbar';
import { ReservedFlight, FlightInfo } from '../Types';
import { ReservedCard } from '../Components/Cards/ReservedCard';
import { motion } from 'framer-motion';
import Footer from '../Components/FooterComponent';
import { Helmet } from "react-helmet";

export default function SearchResults() {

    const [ Flights, setFlights ] = useState<FlightInfo[]>([]);

    const [ reservedFlight, setReservedFlight ] = useState<ReservedFlight[]>([]);
    const [ formattedDate, setFormattedDate ] = useState<string>();
    const [ selected, setSelected ] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const origin = searchParams.get('origen') || '';
    const destination = searchParams.get('destino') || '';
    const departure = searchParams.get('ida') || '';
    const arrival = searchParams.get('vuelta') || '';
    const passengers = searchParams.get('passengers') || 1;

    useEffect(() => {

        {/*&arrival=${arrival} queda fuera por ahora*/}

        const fetchRequestedFlights = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/flights/search?origin=${origin}&destination=${destination}&departure=${departure}`, {
                    method: 'GET'
                });

                const res = await response.json();
                setFlights(res);

            } catch (error) {
                console.log(error);
                toast.error("Error del servidor" , {
                    className: "bg-red-500 text-white rounded-lg shadow-lg"
                });
            }
            
        }

        fetchRequestedFlights();

    }, [Flights, departure, destination, origin, setFlights])

    useEffect(() => {
        const sortByCheapest = () => {
            const sortedArr = [...Flights].sort((a, b) => parseInt(a.ticketPrice.amount) - parseInt(b.ticketPrice.amount));
            setFlights(sortedArr);
        }

        const sortByEarliest = () => {
            const sortedArr = [...Flights].sort(compareDates);
            setFlights(sortedArr);
        }

        const compareDates = (arr1: FlightInfo, arr2: FlightInfo) => {
            const date1 = new Date(arr1.departureDate[0], arr1.departureDate[1], arr1.departureDate[2], arr1.departureDate[3], arr1.departureDate[4], arr1.departureDate[5], arr1.departureDate[6]);
            const date2 = new Date(arr2.departureDate[0], arr2.departureDate[1], arr2.departureDate[2], arr2.departureDate[3], arr2.departureDate[4], arr2.departureDate[5], arr2.departureDate[6]);
            return date1.getTime() - date2.getTime();
        }

        sortByCheapest();
    }, [Flights])

    const reciveFlight = (info: ReservedFlight) => {
        setReservedFlight([...reservedFlight, info]);
        setSelected(true);
        formatDate(info.flight.departureDate);
    }

    const formatDate = (date: Array<number>) => {
        const depDate = new Date(date[0], date[1], date[2], date[3], date[4], date[5], date[6]);
        const formattedDepDate = new Intl.DateTimeFormat('es-CO', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        }).format(depDate);
        setFormattedDate(formattedDepDate);
    }

    const reset = () => {
        setReservedFlight([]);
        setSelected(false);
    }

    const next = () => {
        navigate(`/seat-selection?id=${reservedFlight[0].flight.flightID}`)
    }


    return (
        <motion.div className='flex flex-col'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>

            <Toaster richColors position="top-right" duration={4000} className="bg-white text-black" />

            <Helmet>
                <title>Seleccion de vuelo - Royal Airlines</title>
            </Helmet>

            <Navbar />

            {!selected ? (
                <motion.div className="px-10 pt-8 min-h-screen"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }} >
                    <div className="flex flex-row justify-between items-center" >
                        <h1 className="text-2-5xl">Elige un vuelo de ida</h1>

                        <div className="flex flex-row gap-2" >
                            <p>Ordenar por:</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-4 py-6 px-4 items-center">
                        {Flights?.map((element) => {

                        return (
                            <FlightCard flight={element} returnInfo={reciveFlight} />
                        )
                    })}
                    </div>
                </motion.div>
            ) : (
                <motion.div className="px-10 pt-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }} >
                    <h1 className="text-2-5xl">Detalles de tu viaje</h1>

                    <div className="mx-4" >
                        <div className="flex flex-row gap-2 mt-4 items-center" >
                            <h2>Vuelo de ida:</h2>

                            <div className="flex flex-row gap-2" >
                                <p className="font-semibold" >{reservedFlight[0].flight.departureLocation.cityName}</p>
                                <p>a</p>
                                <p className="font-semibold" >{reservedFlight[0].flight.arrivalLocation.cityName}</p>
                            </div>

                            <span className="icon-[icon-park-outline--dot]" />

                            <p>{reservedFlight[0].fee.feeName}</p>

                            <span className="icon-[icon-park-outline--dot]" />

                            <p>{formattedDate}</p>
                        
                        </div>

                        <div className="mt-5" >
                            {reservedFlight?.map((element) => {

                                const { flight, fee } = element;

                                return (
                                    <ReservedCard flight={flight} fee={fee} reset={reset} />
                                )})}
                        </div>
                    </div>

                    <div className="flex flex-row justify-end mx-4 mt-7" >
                        <div className="flex flex-col w-96" >
                            <div className="flex flex-col bg-white shadow-lg rounded-lg px-7 py-5" >

                                <div className="flex flex-row font-light justify-between">
                                    <h3>Total reserva</h3>
                                    <p>COP 100.000</p>
                                </div>

                                <div className="flex flex-row font-light justify-between">
                                    <h3>Impuestos, tasas y tarifas</h3>
                                    <p>COP 100.000</p>
                                </div>

                                <hr className="my-3" />

                                <div className="flex flex-row justify-between">
                                    <h3 className="text-xl font-extralight" >Total</h3>
                                    <p>COP 100.000</p>
                                </div>
                            </div>

                            <button className="mt-5 mx-6 bg-lilac px-6 py-3 text-white text-xl rounded-lg hover:cursor-pointer hover:bg-gold hover:scale-105 duration-200 text-center" 
                                onClick={next}
                            >Continuar</button>
                        </div>
                    </div>
                    

                </motion.div>
            )}

            <Footer />
        </motion.div>
    )
}