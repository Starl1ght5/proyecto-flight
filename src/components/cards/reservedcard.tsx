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
        <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm md:px-8 px-4 py-5 md:py-6 hover:border-gray-900 transition-all duration-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                
                {/* Flight Info */}
                <div className="flex flex-row md:gap-8 gap-4 justify-between md:justify-normal items-center w-full md:w-auto">
                    <div className="flex flex-col">
                        <h3 className="text-lg md:text-2xl font-bold text-gray-900">{formattedDepDate}</h3>
                        <p className="text-sm md:text-base text-gray-600">{flight.departureLocation.cityName}</p>
                    </div>

                    <div className="flex flex-col items-center px-3">
                        <svg className="w-5 h-5 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <p className="text-xs text-gray-500">Directo</p>
                        <p className="text-xs text-gray-500">{flight.duration}</p>
                    </div>

                    <div className="flex flex-col">
                        <h3 className="text-lg md:text-2xl font-bold text-gray-900">{formattedArrDate}</h3>
                        <p className="text-sm md:text-base text-gray-600">{flight.arrivalLocation.cityName}</p>
                    </div>
                </div>
    
                {/* Price */}
                <div className="flex flex-col text-left md:text-right w-full md:w-auto">
                    <p className="text-xs text-gray-500 mb-1">Precio por pasajero</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900">COP {formattedFee}</p>
                </div>

                {/* Edit Button */}
                <div className="flex justify-start md:justify-end w-full md:w-auto">
                    <button 
                        className="px-5 py-2 text-gray-900 font-semibold hover:bg-gray-100 rounded-lg border-2 border-gray-900 transition-all duration-200" 
                        onClick={resetSelection}
                    >
                        Editar selección
                    </button>
                </div>
            </div>
        </div>
    )
}