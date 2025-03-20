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
        navigate("/confirmar-pago");
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

                <div className="px-7 py-9 w-lg rounded-lg mt-16 shadow-2xl flex flex-col items-center">
                    <div className="flex flex-row" >

                        <div className="flex flex-row justify-center gap-2">

                            {/* Row A - Fila A */}
                            <div className="flex flex-col justify-center gap-1" >
                                <p className="text-center font-light text-lg">A</p>
                                {seatRowA?.map(element => {
                                    return (
                                        <SeatCard seat={element} returnInfo={reciveInfo} />
                                    )})}
                            </div>

                            {/* Row B - Fila B */} 
                            <div className="flex flex-col justify-center gap-1">
                                <p className="text-center font-light text-lg">B</p>
                                {seatRowB?.map(element => {
                                    return (
                                        <SeatCard seat={element} returnInfo={reciveInfo} />
                                    )})}
                            </div>
                            
                            {/* Row C - Fila C */}
                            <div className="flex flex-col justify-center gap-1">
                                <p className="text-center font-light text-lg">C</p>
                                {seatRowC?.map(element => {
                                    return (
                                        <SeatCard seat={element} returnInfo={reciveInfo} />
                                    )})}
                            </div>
                        </div>
                        
                        {/* Pasillo */}
                        <div className="mx-7 flex flex-col text-center gap-9 mt-12 font-light">
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
                        </div>

                        <div className="flex flex-row justify-center gap-2">

                            {/* Row D - Fila D */}
                            <div className="flex flex-col justify-center gap-1" >
                                <p className="text-center font-light text-lg">D</p>
                                {seatRowD?.map(element => {
                                    return (
                                        <SeatCard seat={element} returnInfo={reciveInfo} />
                                    )})}
                            </div>
                            
                            {/* Row E - Fila E */}
                            <div className="flex flex-col justify-center gap-1">
                                <p className="text-center font-light text-lg">E</p>
                                {seatRowE?.map(element => {
                                    return (
                                        <SeatCard seat={element} returnInfo={reciveInfo} />
                                    )})}
                            </div>

                            {/* Row F - Fila F */}
                            <div className="flex flex-col justify-center gap-1">
                                <p className="text-center font-light text-lg">F</p>
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