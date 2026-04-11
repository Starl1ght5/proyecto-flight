import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
    const [] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const [seatRowA, setSeatRowA] = useState([])
    const [seatRowB, setSeatRowB] = useState([])
    const [seatRowC, setSeatRowC] = useState([])
    const [seatRowD, setSeatRowD] = useState([])
    const [seatRowE, setSeatRowE] = useState([])
    const [seatRowF, setSeatRowF] = useState([])
    const [ disabled, setDisabled ] = useState<boolean>(false);

    const searchParams = new URLSearchParams(location.search);
    const flight = searchParams.get('flight') || '';
    const fee = searchParams.get('fee') || '';
    const cookie = cookies.RoyalUserToken;
    var passangers = searchParams.get('passangers') || 1;
    var pNumber: number = Number(passangers);

    const { handleSubmit, formState: { }} = useForm();

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
                        setDisabled(true);
        
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
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/flights/seats/search?flightID=${flight}`, {
                    method: 'GET'
                });
                const res = await response.json();
                setSeats(res);

            } catch (error) {
                console.error("Error al obtener los asientos:", error);
                toast.error("Error del servidor" , {
                    className: "bg-red-500 text-white rounded-lg shadow-lg"
                });
            } finally {
              setLoading(false);
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
        <div className="flex flex-col justify-center gap-0.5">
            <p className="text-center font-medium text-xs text-gray-500 mb-0.5">{rowLetter}</p>
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
        <div className="bg-gray-50 min-h-screen">
            <Toaster richColors position="top-right" duration={4000} />
            <Helmet>
                <title>Selección de asiento - Royal Airlines</title>
            </Helmet>
            <Navbar />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                    
                    {/* Header Simple */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-1">Elige tus asientos</h1>
                        <p className="text-sm text-gray-500">Selecciona los mejores asientos para tu viaje</p>
                    </div>

                    {/* Legend Minimalista */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-6 text-xs">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-slate-100 border border-slate-300 rounded"></div>
                                <span className="text-gray-600">Disponible</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-blue-50 border border-blue-300 rounded"></div>
                                <span className="text-gray-600">Seleccionado</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-gray-200 border border-gray-300 rounded"></div>
                                <span className="text-gray-600">Ocupado</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
                        
                        {/* Seat Map Container - Minimalista */}
                        <motion.div 
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-3">
                                    <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-200 border-t-gray-400"></div>
                                    <p className="text-sm text-gray-500">Cargando asientos...</p>
                                </div>
                            ) : (
                                <div className="flex flex-row items-start justify-center">
                                    {/* Left side */}
                                    <div className="flex flex-row gap-1">
                                        {renderSeatRow(seatRowA, 'A')}
                                        {renderSeatRow(seatRowB, 'B')}
                                        {renderSeatRow(seatRowC, 'C')}
                                    </div>
                                    
                                    {/* Aisle */}
                                    <div className="mx-4 flex flex-col text-center gap-[21px] mt-6 font-normal text-gray-400 text-xs">
                                        {Array.from({length: 30}).map((_, i) => (
                                            <p key={i}>{i + 1}</p>
                                        ))}
                                    </div>

                                    {/* Right side */}
                                    <div className="flex flex-row gap-1">
                                        {renderSeatRow(seatRowD, 'D')}
                                        {renderSeatRow(seatRowE, 'E')}
                                        {renderSeatRow(seatRowF, 'F')}
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* Selection Panel - Minimalista */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="lg:w-80 w-full"
                        >
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 lg:sticky lg:top-24">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
                                    <h2 className="text-lg font-semibold text-gray-800">Tu selección</h2>
                                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-medium">
                                        {selectedSeats.length}/{pNumber}
                                    </span>
                                </div>

                                {/* Selected Seats */}
                                <div className="space-y-2.5 mb-5 max-h-64 overflow-y-auto">
                                    {selectedSeats.length > 0 ? (
                                        selectedSeats.map((element, index) => (
                                            <div key={element.seatNumber} className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="bg-blue-500 text-white px-2.5 py-1 rounded-md font-semibold text-sm">
                                                            {element.seatNumber}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-sm text-gray-800">Pasajero {index + 1}</p>
                                                        </div>
                                                    </div>
                                                    <p className="font-semibold text-sm text-gray-800">
                                                        ${element.seatPrice.amount.toLocaleString()}
                                                    </p>
                                                </div>
                                                <button
                                                    className="text-xs text-gray-500 hover:text-red-500 transition-colors"
                                                    onClick={() => removeSeat(element.seatNumber)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        Array.from({ length: pNumber }).map((_, index) => (
                                            <div key={`placeholder-${index}`} className="bg-slate-50 border border-dashed border-slate-200 rounded-lg p-3">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="bg-slate-200 text-slate-500 px-2.5 py-1 rounded-md font-semibold text-sm">?</div>
                                                    <div>
                                                        <p className="font-medium text-sm text-gray-600">Pasajero {index + 1}</p>
                                                        <p className="text-xs text-gray-400">Sin asiento</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Total */}
                                {selectedSeats.length > 0 && (
                                    <div className="bg-slate-50 rounded-lg p-3 mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Total</span>
                                            <span className="text-xl font-semibold text-gray-800">
                                                ${selectedSeats.reduce((acc, seat) => acc + seat.seatPrice.amount, "")
}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-row justify-center -translate-y-7 md:translate-y-0">
                                        <form onSubmit={onSubmit}>
                                          <button
                                            className="px-20 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-lg shadow-lg hover:cursor-pointer hover:bg-gold duration-200"
                                            disabled={disabled}
                                            type="submit"
                                          >
                                            Continuar
                                          </button>
                                        </form>
                                </div>
                              </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}