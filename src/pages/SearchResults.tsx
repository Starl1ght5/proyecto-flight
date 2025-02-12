import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { FlightCard } from '../Components/FlightCard';

export default function SearchResults() {

    const [ Flights, setFlights ] = useEffect([]);

    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const origin = searchParams.get('origen') || '';
    const destination = searchParams.get('destino') || '';
    const departure = searchParams.get('ida') || '';
    const arrival = searchParams.get('vuelta') || '';
    const passengers = searchParams.get('passengers') || 1;

    useEffect(() => {

        const fetchRequestedFlights = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/flights/search?origin=${origin}&destination=${destination}&departure=${departure}&arrival=${arrival}`, {
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
        
    }, [])

    return (
        <div>
            <Toaster richColors position="top-right" duration={4000} className="bg-white text-black" />

            <div className="flex flex-col gap-4 py-6 px-4">
                {Flights?.map(element => {

                    return (
                        <FlightCard flight={element} />
                    )
                })}
            </div>
        </div>
    )
}