import { BoardingPassWrapper } from "../../types"


export const BoardingPassCard: React.FC<BoardingPassWrapper> = ({ boardingPass }) => {

    return (
        <div className="bg-white flex flex-row rounded-lg shadow-lg w-auto">

            <div className="bg-lilac rounded-l-lg text-white h-auto">
                <div className="-rotate-90 translate-y-18">
                    <p>ROYAL AIRLINES</p>
                    <p className="text-center">Boarding Pass</p>
                </div>
            </div>

            <div className="flex flex-col px-6">

                <div className="flex flex-row">

                    <div className="flex flex-col py-5 gap-3">
                        
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col">
                                <p className="text-sm font-light">Salida de</p>
                                <h2 className="text-center">{boardingPass.departureIataCode}</h2>
                            </div>

                            <div className="flex flex-col">
                                <p className="text-sm font-light">Viajando a</p>
                                <h2 className="text-center">{boardingPass.arrivalIataCode}</h2>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-sm font-light">Pasajero</p>
                            <h2>Fulanito de tal</h2>
                        </div>

                        <div className="flex flex-row gap-4">
                            <div className="flex flex-col">
                                <p className="text-sm font-light">Fecha de vuelo</p>
                                <h2 className="text-center">2025/04/08</h2>
                            </div>

                            <div className="flex flex-col">
                                <p className="text-sm font-light">Hora de vuelo</p>
                                <h2 className="text-center">11:45 PM</h2>
                            </div>
                        </div>
 
                    </div>

                </div>

            </div>

            <div className="flex flex-col px-1 pr-3 justify-center">
                <div className="bg-bluemint rounded-lg px-3 py-2">
                    <div className="flex flex-col">
                        <p className="text-sm font-light">Hora de abordaje</p>
                        <h2 className="text-center">10:45 PM</h2>
                    </div>

                    <div className="flex flex-col gap-1 mt-1">
                        <div className="flex flex-row gap-2 items-center">
                            <p className="text-sm font-light">Terminal:</p>
                            <h2>{boardingPass.group}</h2>
                        </div>

                        <div className="flex flex-row gap-2 items-center">
                            <p className="text-sm font-light">Gate:</p>
                            <h2>{boardingPass.gate}</h2>
                        </div>

                        <div className="flex flex-row gap-2 items-center">
                            <p className="text-sm font-light">Clase:</p>
                            <h2>{boardingPass.seatClass}</h2>
                        </div>

                        <div className="flex flex-row gap-2 items-center">
                            <p className="text-sm font-light">Asiento:</p>
                            <h2>{boardingPass.seats[0]}</h2>
                        </div>
                                
                    </div>
                </div>

            </div>
        </div>
    )
}