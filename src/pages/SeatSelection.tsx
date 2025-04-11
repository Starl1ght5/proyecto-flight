import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/FooterComponent";
import Navbar from "../Components/NavbarComponent";
import { Seat, CheckoutAttemptInfo, CheckoutInfo } from "../Types";
import { Toaster, toast } from 'sonner';
import { SeatCard } from '../Components/Cards/SeatCard';
import { Helmet } from "react-helmet";
import { loadStripe } from "@stripe/stripe-js";
import { useCookies } from 'react-cookie';


export default function SeatSelection () {

    const [ seats, setSeats ] = useState([]);
    const [ selectedSeat, setSelectedSeat ] = useState<Seat[]>([]);
    const [ selected, setSelected ] = useState<boolean>(false);
    const [ cookie ] = useCookies(['RoyalUserToken']);

    const navigate = useNavigate();
    
    const [seatRowA, setSeatRowA] = useState([])
    const [seatRowB, setSeatRowB] = useState([])
    const [seatRowC, setSeatRowC] = useState([])
    const [seatRowD, setSeatRowD] = useState([])
    const [seatRowE, setSeatRowE] = useState([])
    const [seatRowF, setSeatRowF] = useState([])

    const searchParams = new URLSearchParams(location.search);
    const flight = searchParams.get('flight') || '';
    const fee = searchParams.get('fee') || '';
    

    const generateBooking = async () => {
        try {
            const ids: Array<string> = [];
            
            selectedSeat?.map(seat => {
                ids.push(seat.seatID)
            })

            const info: CheckoutAttemptInfo = {
                flightID : flight,
                seatIDs : ids,
                userID : "67f875e370e88e11c76691ce",
                feeID : fee
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

        } catch (e) {
            console.error(e)
        }
    }


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

            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

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

            const result = stripe.redirectToCheckout({
                sessionId: test.id
            });

        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        
        const fetchSeats = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}seats/search?flightID=${flight}`, {
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
        
    }, [seats]);

    useEffect(() => {
        
        const divideArray = (array, itemsPerColumn: number) => {
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

    const reciveInfo = (info: Seat) => {
        setSelectedSeat([...selectedSeat, info]);
        setSelected(true);
    }

    const next = () => {
        navigate("/pasajeros");
    }

    const reset = () => {
        setSelectedSeat([]);
        setSelected(false);
    }

    return (
        <div>
            <Toaster richColors position="top-right" duration={4000} className="bg-white text-black" />

            <Helmet>
                <title>Seleccion de asiento - Royal Airlines</title>
            </Helmet>
            <div className="flex flex-row justify-center" >

                <div className="px-7 py-9 w-lg rounded-lg mt-16 bg-white/50 backdrop-blur-md  shadow-2xl flex flex-col items-center">
                    <div className="flex flex-row" >

                        <div className="flex flex-row justify-center gap-2">

                            {/* Row A - Fila A */}
                            <div className="flex flex-col justify-center gap-1" >
                                <p className="text-center font-light text-lg -translate-x-0.5">A</p>
                                {seatRowA?.map(element => {
                                    return (
                                        <SeatCard  seat={element} returnInfo={reciveInfo} />
                                    )})}
                            </div>

                            {/* Row B - Fila B */} 
                            <div className="flex flex-col justify-center gap-1">
                                <p className="text-center font-light text-lg -translate-x-0.5">B</p>
                                {seatRowB?.map(element => {
                                    return (
                                        <SeatCard seat={element} returnInfo={reciveInfo} />
                                    )})}
                            </div>
                            
                            {/* Row C - Fila C */}
                            <div className="flex flex-col justify-center gap-1">
                                <p className="text-center font-light text-lg -translate-x-0.5">C</p>
                                {seatRowC?.map(element => {
                                    return (
                                        <SeatCard seat={element} returnInfo={reciveInfo} />
                                    )})}
                            </div>
                        </div>
                        
                        {/* Pasillo */}
                        <div className="mx-7 flex flex-col text-center gap-10 mt-12 font-light">
                            {/* Temporal, mientras se me ocurre algo mejor para eso */}
                            <p>1</p>
                            <p>2</p>
                            <p>3</p>
                            <p>4</p>
                            <p>5</p>
                            <p>6</p>
                            <p>7</p>
                            <p>8</p>
                            <p>9</p>
                            <p>10</p>
                            <p>11</p>
                            <p>12</p>
                            <p>13</p>
                            <p>14</p>
                            <p>15</p>
                            <p>16</p>
                            <p>17</p>
                            <p>18</p>
                            <p>19</p>
                            <p>20</p>
                            <p>21</p>
                            <p>22</p>
                            <p>23</p>
                            <p>24</p>
                            <p>25</p>
                            <p>26</p>
                            <p>27</p>
                            <p>28</p>
                            <p>29</p>
                            <p>30</p>
                            <p>31</p>
                            <p>32</p>
                        </div>

                        <div className="flex flex-row justify-center gap-2">

                            {/* Row D - Fila D */}
                            <div className="flex flex-col justify-center gap-1" >
                                <p className="text-center font-light text-lg -translate-x-0.5">D</p>
                                {seatRowD?.map(element => {
                                    return (
                                        <SeatCard seat={element} returnInfo={reciveInfo} />
                                    )})}
                            </div>
                            
                            {/* Row E - Fila E */}
                            <div className="flex flex-col justify-center gap-1">
                                <p className="text-center font-light text-lg -translate-x-0.5">E</p>
                                {seatRowE?.map(element => {
                                    return (
                                        <SeatCard seat={element} returnInfo={reciveInfo} />
                                    )})}
                            </div>

                            {/* Row F - Fila F */}
                            <div className="flex flex-col justify-center gap-1">
                                <p className="text-center font-light text-lg -translate-x-0.5">F</p>
                                {seatRowF?.map(element => {
                                    return (
                                        <SeatCard seat={element} returnInfo={reciveInfo} />
                                    )})}
                            </div>
                        </div>

                    </div>
                </div>
                
                {/* Selection div */}
                <div className="bg-white rounded-lg shadow-lg flex flex-col absolute right-0 mt-16 px-3 py-5 gap-2 min-h-96 justify-between" >
                    
                    <div className="flex flex-col gap-2" >
                        <h2 className="text-2xl text-extralight" >Seleccion</h2>

                        <div className="bg-white min-h-20 w-sm shadow-lg flex flex-col rounded-lg px-5 py-4 items-center">

                            <div className="flex flex-row items-center justify-between w-full" >

                                {/* Passenger List div - Div Lista de pasajeros */}
                                <div className="flex flex-row gap-2 items-center" >

                                    <div className="bg-lilac px-4.5 py-3 text-white rounded-lg shadow-lg" >

                                        {selected ? (
                                            <p>{selectedSeat[0].seatNumber}</p>
                                        ) : (
                                            <p>?</p>
                                        )}
                                    </div>
                                    
                                    <div className="flex flex-col" >
                                        <h3>Pasajero 1</h3>
                                        {selected ? (
                                            <p className="font-extralight text-sm" ></p>
                                        ) : (
                                            <p className="font-extralight text-sm" >Sin seleccion</p> 
                                        )}
                                    </div>
                                </div>

                                {selected && 
                                    <div>
                                        <p>COP {selectedSeat[0].seatPrice.amount}</p>
                                    </div>
                                }
                            </div>
                            
                            {selected && 
                                <div>
                                    <p className="hover:cursor-pointer hover:underline hover:text-lilac text-sm font-light" onClick={reset} >Eliminar seleccion</p>
                                </div>}
                        
                        </div>

                        
                    </div>
                    <button className="px-4 py-3 bg-lilac text-white rounded-lg shadow-lg hover:cursor-pointer hover:bg-gold duration-200 mx-4 mt-4"
                        onClick={generateBooking} >Continuar</button>
                </div>
            </div>

        </div>
    )
}