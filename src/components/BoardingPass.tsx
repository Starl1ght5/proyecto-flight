import React, { useState, useEffect } from "react";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { motion } from "framer-motion";

const BoardingPass = () => {
  const [flightDetails, setFlightDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para consumir la API
  const fetchFlightDetails = async () => {
    try {
      const response = await fetch("https://api.tusitio.com/vuelo-detalles");
      if (!response.ok) {
        throw new Error("Error al obtener los detalles del vuelo.");
      }
      const data = await response.json();
      setFlightDetails(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Cargar los detalles del vuelo cuando el componente se monta
  useEffect(() => {
    fetchFlightDetails();
  }, []);

  // Si aún estamos cargando o hay un error, mostramos un mensaje
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-bluemint to-lightblue flex flex-col items-center justify-center p-6">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-white text-5xl font-bold mb-4"
      >
        Boarding Pass
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center mb-8 text-lg text-white"
      >
        Detalles de tu vuelo.
      </motion.p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-3xl"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative bg-gradient-to-r from-bluedark to-bluemint p-8 rounded-2xl shadow-lg"
        >
          <div className="absolute inset-0 bg-opacity-10 bg-pattern-dots"></div>
          <div className="relative z-10">
            <div className="text-5xl font-bold text-white mb-4 text-center">
              {flightDetails.flightNumber}
            </div>
            <div className="text-2xl font-medium text-center text-white mb-8">
              Confirmado
            </div>
            <div className="flex items-center justify-between text-white">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center"
              >
                <FaPlaneDeparture className="text-6xl mb-2" />
                <span className="text-lg">Salida</span>
                <span className="text-xl font-bold">{flightDetails.departureCity}</span>
                <span className="text-lg">{flightDetails.departureTime}</span>
              </motion.div>
              <div className="h-24 w-px bg-white mx-4"></div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center"
              >
                <FaPlaneArrival className="text-6xl mb-2" />
                <span className="text-lg">Llegada</span>
                <span className="text-xl font-bold">{flightDetails.arrivalCity}</span>
                <span className="text-lg">{flightDetails.arrivalTime}</span>
              </motion.div>
            </div>
            <div className="mt-8 text-center text-white">
              <p className="text-lg font-semibold">Asiento: {flightDetails.seat}</p>
              <p className="text-lg font-semibold">Puerta: {flightDetails.gate}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={() => alert("Redirigiendo a la página de embarque...")}
            className="w-64 bg-gradient-to-r from-bluemint to-bluedark text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-md"
          >
            Ver Detalles del Vuelo
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BoardingPass;
