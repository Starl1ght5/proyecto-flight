import { BoardingPassWrapper } from "../../types";
import { motion } from 'framer-motion';


export const BoardingPassCard: React.FC<BoardingPassWrapper> = ({ boardingPass }) => {

    return (
       <motion.div
  className="bg-white flex flex-col sm:flex-row rounded-lg shadow-lg w-full max-w-4xl mx-auto"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>

  <div className="bg-lilac sm:rounded-l-lg sm:rounded-tr-none rounded-t-lg text-white h-auto flex justify-center items-center sm:block py-4 sm:py-0">
    <div className="-rotate-0 sm:-rotate-90 sm:translate-y-18 text-center">
      <p className="text-lg sm:text-base">ROYAL AIRLINES</p>
      <p className="text-sm md:text-base">Boarding Pass</p>
    </div>
  </div>

  <div className="flex flex-col px-4 sm:px-6 py-4 flex-1">

    <div className="flex flex-col sm:flex-row sm:justify-between gap-4">

      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-sm font-light">Salida de</p>
            <h2 className="text-base sm:text-lg text-center">{boardingPass.departureIataCode}</h2>
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-light">Viajando a</p>
            <h2 className="text-base sm:text-lg text-center">{boardingPass.arrivalIataCode}</h2>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-light">Pasajero</p>
          <h2 className="text-base sm:text-lg">Fulanito de tal</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col">
            <p className="text-xs font-light">Fecha de vuelo</p>
            <h2 className="text-base text-center">2025/04/08</h2>
          </div>

          <div className="flex flex-col">
            <p className="text-xs font-light">Hora de vuelo</p>
            <h2 className="text-base text-center">11:45 PM</h2>
          </div>
        </div>
      </div>

    </div>

  </div>

  <div className="flex flex-col px-4 py-4 sm:pr-3 justify-center">
    <div className="bg-bluemint rounded-lg px-4 py-3">
      <div className="flex flex-col">
        <p className="text-sm font-light">Hora de abordaje</p>
        <h2 className="text-base text-center">10:45 PM</h2>
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <div className="flex flex-row gap-2 items-center">
          <p className="text-sm font-light">Terminal:</p>
          <h2 className="text-base">{boardingPass.group}</h2>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <p className="text-sm font-light">Gate:</p>
          <h2 className="text-base">{boardingPass.gate}</h2>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <p className="text-sm font-light">Clase:</p>
          <h2 className="text-base">{boardingPass.seatClass}</h2>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <p className="text-sm font-light">Asiento:</p>
          <h2 className="text-base">{boardingPass.seats[0]}</h2>
        </div>
      </div>
    </div>
  </div>

</motion.div>

    )
}