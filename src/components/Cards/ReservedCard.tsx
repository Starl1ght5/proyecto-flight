import { ReservedFlight } from '../../Types.tsx';

export const ReservedCard: React.FC<ReservedFlight> = ({ flight, fee, reset }) => {

    const depDate = new Date(flight.departureDate[0], flight.departureDate[1], flight.departureDate[2], flight.departureDate[3], flight.departureDate[4], flight.departureDate[5], flight.departureDate[6]);
    const formattedDepDate = depDate.toLocaleTimeString("es-CO", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    const arrDate = new Date(flight.arrivalDate[0], flight.arrivalDate[1], flight.arrivalDate[2], flight.arrivalDate[3], flight.arrivalDate[4], flight.arrivalDate[5], flight.arrivalDate[6]);
    const formattedArrDate = arrDate.toLocaleTimeString("es-CO", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    const formattedFee = (fee.price.amount).toLocaleString();

    const resetSelection = () => {
        reset();
    }

    return (
        <div className="bg-white rounded-lg shadow-lg px-10 py-6" >

            <div className="flex flex-row justify-between" >

                <div className="flex flex-row gap-10 items-center">
                    <div className="flex flex-col text-center" >
                        <h3 className="text-xl" >{formattedDepDate}</h3>
                        <p>{flight.departureLocation.cityName}</p>
                    </div>

                    <div className="flex flex-col text-center text-sm" >
                        <p>Directo</p>
                        <p className="font-light" >{flight.duration}</p>
                    </div>

                    <div className="flex flex-col text-center" >
                        <h3 className="text-xl" >{formattedArrDate}</h3>
                        <p>{flight.arrivalLocation.cityName}</p>
                    </div>
                </div>
                
                <div className="flex flex-col text-center" >
                    <p>Precio por pasajero</p>
                    <p>COP {formattedFee}</p>
                </div>

                <button className="hover:cursor-pointer hover:underline" onClick={resetSelection}>
                    Editar seleccion
                </button>

            </div>
            
        </div>
    )
}