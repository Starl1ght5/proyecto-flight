import { useState, useEffect } from "react";
import Footer from "../components/footercomponent.tsx";
import Navbar from "../components/navbarcomponent.tsx";
import { Seat, CheckoutAttemptInfo, CheckoutInfo } from "../types.tsx";
import { Toaster, toast } from 'sonner';
import { SeatCard } from '../components/cards/seatcard.tsx';
import { Helmet } from "react-helmet";
import { loadStripe } from "@stripe/stripe-js";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface TokenPayload extends JwtPayload {
    id: string;
    sub: string;
    name: string;
    exp: number;
    iat: number;
}


export default function SeatSelection () {

    const [ seats, setSeats ] = useState<Seat[]>([]);
    const [ selectedSeats, setSelectedSeats ] = useState<Seat[]>([]);
    const [ cookies ] = useCookies(['RoyalUserToken']);
    const [ jwt, setJwt ] = useState<TokenPayload | null>(null);
    
    const [seatRowA, setSeatRowA] = useState([])
    const [seatRowB, setSeatRowB] = useState([])
    const [seatRowC, setSeatRowC] = useState([])
    const [seatRowD, setSeatRowD] = useState([])
    const [seatRowE, setSeatRowE] = useState([])
    const [seatRowF, setSeatRowF] = useState([])

    const searchParams = new URLSearchParams(location.search);
    const flight = searchParams.get('flight') || '';
    const fee = searchParams.get('fee') || '';
    const cookie = cookies.RoyalUserToken;
    var passangers = searchParams.get('passangers') || 1;
    var pNumber: number = Number(passangers);

    const { handleSubmit, formState: { isSubmitting }} = useForm();

    const onSubmit = handleSubmit( async () => {
        try {
            if (selectedSeats.length === 0) {
                toast.error("No has seleccionado ningun asiento", {
                    className: "bg-red-500 text-white rounded-lg shadow-lg",
                });

            } else {
                if (selectedSeats.length !== pNumber) {
                    toast.error("No has seleccionado todos los asientos", {
                        className: "bg-red-500 text-white rounded-lg shadow-lg",
                    });
                } else {
                    const ids: Array<string> = [];
            
                    selectedSeats?.map(seat => {
                        ids.push(seat.seatID)
                    })
        
                    toast.success("Reserva creada! en unos momentos seras redirigid@ a la pasarela de pago");

                    var info: CheckoutAttemptInfo = {
                        flightID : flight,
                        seatIDs : ids,
                        userID : "Guest",
                        feeID : fee
                    }

                    if (checkForCookie() && jwt) {
                        info.userID = jwt.id;
                    }
        
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}booking/create`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(info)
                    });
        
        
                    if (response.status === 201) {
                        const res = await response.text();
                        initCheckout(res);
        
                    } else {
                        toast.error("Error del servidor" , {
                            className: "bg-red-500 text-white rounded-lg shadow-lg"
                        });
                    }
                } 
            }

        } catch (e) {
            console.error(e)
        }
    });

    const initCheckout = async (checkoutID: string) => {
        try {

            const initialResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}booking/${checkoutID}`);

            const res = await initialResponse.json();

            const details: CheckoutInfo = {
                bookingID: res.bookingID,
                userID: res.userID,
                flightInfo: res.bookedFlight,
                fee: res.selectedFee,
                totalPrice: res.totalPrice,
                status: res.status,
                ticketCount: res.ticketCount,
                bookedSeats: res.bookedSeats
            }

            const stripe = await loadStripe("pk_test_51OEkaAAZPRRqn7nghZ3JdSkVsMS64xrdnTxyqlnPoJjjDZEiuUbJ7cEGgWgbU8MzE6RMtK8sTtLHdKl4c3Myf8LE007tm0JPdo");

            const added_value = parseInt(details.totalPrice.amount + ".00");

            const payload = {
                client: details.userID,
                amount_paid: added_value,
                currency: "COP",
                items_brought: [details]
            }

            const response = await fetch(`${import.meta.env.VITE_PAYMENT_SERVER_URL}start-checkout-session`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' }
            });

            const test = await response.json()

            const result = stripe?.redirectToCheckout({
                sessionId: test.id
            });

            console.log(result);

        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        
        const fetchSeats = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}flights/seats/search?flightID=${flight}`, {
                    method: 'GET'
                });
                const res = await response.json();
                setSeats(res);

            } catch (error) {
                console.error("Error al obtener los asientos:", error);
                toast.error("Error del servidor" , {
                    className: "bg-red-500 text-white rounded-lg shadow-lg"
                });
            }
        };

        fetchSeats();
        
    }, []);

    useEffect(() => {
        
        const divideArray = (array: any, itemsPerColumn: number) => {
            const columns = [];

            for (let i = 0; i < array.length; i += itemsPerColumn) {
                columns.push(array.slice(i, i + itemsPerColumn));
            };
            setSeatRowA(columns[0]);
            setSeatRowB(columns[1]);
            setSeatRowC(columns[2]);
            setSeatRowD(columns[3]);
            setSeatRowE(columns[4]);
            setSeatRowF(columns[5]);
        };

        divideArray(seats, 30);

    }, [seats])

    useEffect(() => {
        if (cookie) {
            try {
                const decodedToken = jwtDecode<TokenPayload>(cookie);
                setJwt(decodedToken);
            } catch (err) {
                console.log('Token inválido o no presente');
                setJwt(null);
            }
        } else {
            setJwt(null);
        }
    }, [cookie]);

    const checkForCookie = () => {
        return !!cookie;
    }

    const handleSeatSelection = (seat: Seat) => {
        if (selectedSeats.some((s) => s.seatNumber === seat.seatNumber)) {
          setSelectedSeats(selectedSeats.filter((s) => s.seatNumber !== seat.seatNumber));
          toast.info("Asiento deseleccionado");
          return;
        }
      
        if (selectedSeats.length < pNumber) {
          setSelectedSeats([...selectedSeats, seat]);
          toast.success("Asiento seleccionado correctamente!");
        } else {
          toast.error("No puedes seleccionar más asientos");
        }
    };

    const removeSeat = (seatNumber: string) => {
        setSelectedSeats(prevSeats => prevSeats.filter(seat => seat.seatNumber !== seatNumber));
        toast.info("Asiento deseleccionado");
    };

    const renderSeatRow = (row: Seat[], rowLetter: string) => (
        <div className="flex flex-col justify-center gap-1">
            <p className="text-center font-light text-lg -translate-x-0.5">{rowLetter}</p>
            {row?.map(element => (
                <SeatCard 
                    key={element.seatNumber}
                    seat={element}
                    isSelected={selectedSeats.some(s => s.seatNumber === element.seatNumber)}
                    onSelect={handleSeatSelection}
                />
            ))}
        </div>
    );

    return (
        <div>
            <Toaster richColors position="top-right" duration={4000} className="bg-white text-black" />
            <Helmet>
                <title>Seleccion de asiento - Royal Airlines</title>
            </Helmet>
            <Navbar />

            <div className="flex flex-row justify-center">
                <div className="px-7 py-9 w-lg rounded-lg mt-16 bg-white/50 backdrop-blur-md shadow-2xl flex flex-col items-center">
                    <div className="flex flex-row">
                        <div className="flex flex-row justify-center gap-2">
                            {renderSeatRow(seatRowA, 'A')}
                            {renderSeatRow(seatRowB, 'B')}
                            {renderSeatRow(seatRowC, 'C')}
                        </div>
                        
                        {/* Pasillo */}
                        <div className="mx-7 flex flex-col text-center gap-10 mt-12 font-light">
                            {Array.from({length: 30}).map((_, i) => (
                                <p key={i}>{i + 1}</p>
                            ))}
                        </div>

                        <div className="flex flex-row justify-center gap-2">
                            {renderSeatRow(seatRowD, 'D')}
                            {renderSeatRow(seatRowE, 'E')}
                            {renderSeatRow(seatRowF, 'F')}
                        </div>
                    </div>
                </div>
                
                {/* Selection div */}
                <div className="bg-white rounded-lg shadow-lg flex flex-col absolute right-0 mt-16 px-3 py-5 gap-2 min-h-96 min-w-20 justify-between">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl text-extralight">Selección</h2>
                        {selectedSeats.length > 0 ? (
                            selectedSeats.map((element, index) => (
                                <div key={element.seatNumber} className="bg-white min-h-20 w-sm shadow-lg flex flex-col rounded-lg px-5 py-4 items-center">
                                    <div className="flex flex-row items-center justify-between w-full">
                                        <div className="flex flex-row gap-2 items-center">
                                            <div className="bg-lilac px-4.5 py-3 text-white rounded-lg shadow-lg">
                                                <p>{element.seatNumber}</p>
                                            </div>
                                            <div className="flex flex-col">
                                                <h3>Pasajero {index + 1}</h3>
                                            </div>
                                        </div>
                                        <div>
                                            <p>COP {element.seatPrice.amount}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p 
                                            className="hover:cursor-pointer hover:underline hover:text-lilac text-sm font-light" 
                                            onClick={() => removeSeat(element.seatNumber)}
                                        >
                                            Eliminar selección
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            Array.from({ length: pNumber }).map((_, index) => (
                                <div key={`placeholder-${index}`} className="bg-white min-h-20 w-sm shadow-lg flex flex-col rounded-lg px-5 py-4 items-center">
                                    <div className="flex flex-row items-center justify-between w-full">
                                        <div className="flex flex-row gap-2 items-center">
                                            <div className="bg-lilac px-4.5 py-3 text-white rounded-lg shadow-lg">
                                                <p>?</p>
                                            </div>
                                            <div className="flex flex-col">
                                                <h3>Pasajero {index + 1}</h3>
                                                <p className="font-extralight text-sm">Sin selección</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    
                    <form onSubmit={onSubmit}>
                        <button 
                            className="px-4 py-3 bg-lilac text-white rounded-lg shadow-lg hover:cursor-pointer hover:bg-gold duration-200 mx-4 mt-4"
                            disabled={isSubmitting} 
                            type="submit"
                        >
                            Continuar
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}