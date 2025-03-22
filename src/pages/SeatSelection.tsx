import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Seat } from "../Types";
import { Toaster, toast } from 'sonner';
import { SeatCard } from '../Components/Cards/SeatCard';
import { Helmet } from "react-helmet";


export default function SeatSelection () {

    const [ seats, setSeats ] = useState([]);
    const [ selectedSeat, setSelectedSeat ] = useState<Seat[]>([]);
    const [ selected, setSelected ] = useState<boolean>(false);
    const navigate = useNavigate();
    
    const [seatRowA, setSeatRowA] = useState([])
    const [seatRowB, setSeatRowB] = useState([])
    const [seatRowC, setSeatRowC] = useState([])
    const [seatRowD, setSeatRowD] = useState([])
    const [seatRowE, setSeatRowE] = useState([])
    const [seatRowF, setSeatRowF] = useState([])

    const searchParams = new URLSearchParams(location.search);
    const flight = searchParams.get('id') || '';
    

    useEffect(() => {
        
        const fetchSeats = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/seats/search?flightID=${flight}`, {
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

            <Navbar />

            <div className="flex flex-row justify-center" >

                <div className="px-7 py-9 w-lg rounded-lg mt-16 bg-white/50 backdrop-blur-md  shadow-2xl flex flex-col items-center">
                    <div className="flex flex-row" >

                        <div className="flex flex-row justify-center gap-2">
                            <div className="flex flex-col justify-center gap-1" >
                                <p className="text-center  font-extralight text-lg">A</p>
                                {seatRowA?.map(element => {
                                    return (
                                        <SeatCard  seat={element} returnInfo={reciveInfo} />
                                    )})}
                            </div>

                            <div className="flex flex-col justify-center gap-1">
                                <p className="text-center font-extralight text-lg">B</p>
                                {seatRowB?.map(element => {
                                    return (
                                        <SeatCard seat={element} returnInfo={reciveInfo} />
                                    )})}
                            </div>

                            <div className="flex flex-col justify-center gap-1">
                                <p className="text-center font-extralight text-lg">C</p>
                                {seatRowC?.map(element => {
                                    return (
                                        <SeatCard seat={element} returnInfo={reciveInfo} />
                                    )})}
                            </div>
                        </div>

                        <div className="w-18"></div>

                        <div className="flex flex-row justify-center gap-2">
                            <div className="flex flex-col justify-center gap-1" >
                                <p className="text-center font-extralight text-lg">D</p>
                                {seatRowD?.map(element => {
                                    return (
                                        <SeatCard seat={element} returnInfo={reciveInfo} />
                                    )})}
                            </div>

                            <div className="flex flex-col justify-center gap-1">
                                <p className="text-center font-extralight text-lg">E</p>
                                {seatRowE?.map(element => {
                                    return (
                                        <SeatCard seat={element} returnInfo={reciveInfo} />
                                    )})}
                            </div>

                            <div className="flex flex-col justify-center gap-1  ">
                                <p className="text-center font-extralight text-lg">F</p>
                                {seatRowF?.map(element => {
                                    return (
                                        <SeatCard seat={element} returnInfo={reciveInfo} />
                                    )})}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg flex flex-col absolute right-0 mt-16 px-3 py-5 gap-2 min-h-96 justify-between" >
                    
                    <div className="flex flex-col gap-2" >
                        <h2 className="text-2xl text-extralight" >Seleccion</h2>

                        <div className="bg-white min-h-20 w-sm shadow-lg flex flex-col rounded-lg px-5 py-4 items-center">

                            <div className="flex flex-row items-center justify-between w-full" >
                                <div className="flex flex-row gap-2 items-center" >
                                    <div className="bg-lilac px-3 py-2 text-white rounded-lg shadow-lg" >
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
                        onClick={next} >Continuar</button>
                </div>
            </div>

            <Footer />
        </div>
    )
}