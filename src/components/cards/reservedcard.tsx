import { ReservedFlight } from '../../types.tsx';

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
        <div className="bg-white rounded-lg shadow-lg md:px-10 px-3 py-4 md:py-6">
            <div className="flex flex-col md:flex-row justify-between">
                <div className="flex flex-row md:gap-10 justify-between md:justify-normal items-center w-full md:w-auto">
                    <div className="flex flex-col text-center">
                        <h3 className="text-sm md:text-xl">{formattedDepDate}</h3>
                        <p className="text-sm md:text-base">{flight.departureLocation.cityName}</p>
                    </div>

                    <div className="flex flex-col text-center text-sm">
                        <p>Directo</p>
                        <p className="font-light">{flight.duration}</p>
                    </div>

                    <div className="flex flex-col text-center">
                        <h3 className="text-sm md:text-xl">{formattedArrDate}</h3>
                        <p className="text-sm md:text-base">{flight.arrivalLocation.cityName}</p>
                    </div>
                </div>
    
                <div className="flex flex-col text-center mt-4 md:mt-0">
                    <p className="text-sm md:text-base">Precio por pasajero</p>
                    <p className="text-sm md:text-base">COP {formattedFee}</p>
                </div>

                <div className="flex justify-center md:justify-end mt-4 md:mt-0">
                    <button 
                        className="hover:cursor-pointer hover:underline text-sm md:text-base" 
                        onClick={resetSelection}
                    >
                        Editar selección
                    </button>
                </div>
            </div>
        </div>
    )
}