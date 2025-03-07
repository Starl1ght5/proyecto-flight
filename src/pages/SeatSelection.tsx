import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Seat, SeatInfo } from "../Types";
import { Toaster, toast } from 'sonner';
import { SeatCard } from '../Components/Cards/SeatCard';


export default function SeatSelection () {

    const [seats, setSeats] = useState<SeatInfo[]>([]);
    const [selectedSeat, setSelectedSeat] = useState<Seat>();
    const navigate = useNavigate();
    
    const [seatRowA, setSeatRowA] = useState<Seat[]>([])
    const [seatRowB, setSeatRowB] = useState<Seat[]>([])
    const [seatRowC, setSeatRowC] = useState<Seat[]>([])
    const [seatRowD, setSeatRowD] = useState<Seat[]>([])
    const [seatRowE, setSeatRowE] = useState<Seat[]>([])
    const [seatRowF, setSeatRowF] = useState<Seat[]>([])

    const fetchSeats = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/seats/search?flightID=67c28af75e30eb4a91782a77", {
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

    useEffect(() => {
        fetchSeats();
        
    }, []);
    
    useEffect(() => {
        divideArray(seats, 25)
    }, [seats])
    
    const handleSeatSelection = (seatId) => {
        setSelectedSeat(seatId);
    };
    
    const divideArray = (array: Array<SeatInfo>, itemsPerColumn: number) => {
        const columns: Seat[] = [];
        for (let i = 0; i < array.length; i += itemsPerColumn) {
          columns.push(array.slice(i, i + itemsPerColumn));
        };
        setSeatRowA([...seatRowA, columns[0]]);
        setSeatRowB([...seatRowB, columns[0]]);
        setSeatRowC([...seatRowC, columns[0]]);
        setSeatRowD([...seatRowD, columns[0]]);
        setSeatRowE([...seatRowE, columns[0]]);
        setSeatRowF([...seatRowF, columns[0]]);
      };

    return (
        <div>
            <Toaster richColors position="top-right" duration={4000} className="bg-white text-black" />

            <Navbar />

            <div className="px-10 pt-8 max-w-4xl mx-auto p-10 rounded-lg shadow-2xl flex flex-col items-center">
                <div className="flex flex-row" >

                    <div className="flex flex-row justify-center gap-4">
                        <div className="flex flex-col justify-center gap-2" >
                            {seatRowA?.map(element => {
                                return (
                                    <SeatCard seat={element} />
                                )})}
                        </div>

                        <div className="flex flex-col justify-center gap-2">
                            {seatRowB?.map(element => {
                                return (
                                    <SeatCard seat={element} />
                                )})}
                        </div>

                        <div className="flex flex-col justify-center gap-2">
                            {seatRowC?.map(element => {
                                return (
                                    <SeatCard seat={element} />
                                )})}
                        </div>
                    </div>

                    <div className="w-12"></div>

                    <div className="flex flex-row justify-center gap-4">
                        <div className="flex flex-col justify-center gap-2" >
                            {seatRowD?.map(element => {
                                return (
                                    <SeatCard seat={element} />
                                )})}
                        </div>

                        <div className="flex flex-col justify-center gap-2">
                            {seatRowE?.map(element => {
                                return (
                                    <SeatCard seat={element} />
                                )})}
                        </div>

                        <div className="flex flex-col justify-center gap-2">
                            {seatRowF?.map(element => {
                                return (
                                    <SeatCard seat={element} />
                                )})}
                        </div>
                    </div>

                </div>
            </div>
            

            <Footer />
        </div>
    )
}