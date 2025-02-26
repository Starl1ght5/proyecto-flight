import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { FlightCard } from '../Components/Cards/FlightCard';
import Navbar from '../Components/Navbar';
import { ReservedFlight } from '../Types';
import { ReservedCard } from '../Components/Cards/ReservedCard';

export default function SearchResults() {

    const [ Flights, setFlights ] = useState([]);

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



    return (
        <div>
            <Toaster richColors position="top-right" duration={4000} className="bg-white text-black" />

            <Navbar />

            {!selected ? (
                <div className="px-10 pt-8">
                    <h1 className="text-2-5xl">Elige un vuelo de ida</h1>
                    
                    <div className="flex flex-col gap-4 py-6 px-4 items-center">
                        {Flights?.map((element) => {

                        return (
                            <FlightCard flight={element} returnInfo={reciveFlight} />
                        )
                    })}
                    </div>
                </div>
            ) : (
                <div className="px-10 pt-8">
                    <h1 className="text-2-5xl">Detalles de tu viaje</h1>

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

                    <div>
                        {reservedFlight?.map((element) => {

                            const { flight, fee } = element;

                            return (
                                <ReservedCard flight={flight} fee={fee} />
                            )
                        })}
                    </div>

                </div>
            )}

           
        </div>
    )
}