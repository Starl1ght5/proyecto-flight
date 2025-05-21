import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ConfirmarPago = () => {

  const navigate = useNavigate();

  const goToBoarding = () => {
    navigate("/my-tickets");
  }

  return (
    <div className="min-h-screen bg-bluemint flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-4 text-gold text-lg font-bold text-center"
        >
          Pago realizado exitosamente
        </motion.div>

  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0 }}
    className="mt-4 text-lightblue text-lg font-semibold"
  >
    <motion.div
      className="w-full h-24 bg-white border-2 border-lightblue rounded-lg relative overflow-hidden shadow-lg"
      initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      animate={{
        clipPath: [
          "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          "polygon(50% 0, 100% 25%, 50% 50%, 0 25%)",
          "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ],
      }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
        loop: Infinity,
      }}
    >
      <div className="absolute inset-0 flex justify-center items-center text-black text-xl font-bold">
        ¡Factura!
      </div>
    </motion.div>

    {/* Animación de lista de detalles de la factura */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mt-6 text-black font-semibold text-lg"
    >
      <h4 className="mb-4 text-xl font-semibold">Detalles de la Factura:</h4>
      <motion.ul
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
      >
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="flex justify-between mb-2"
        >
          <span>Vuelos</span>
          <span>COP 490.770</span>
        </motion.li>
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="flex justify-between mb-2"
        >
          <span>Asientos</span>
          <span>COP 63.050</span>
        </motion.li>
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
          className="flex justify-between mb-2"
        >
          <span>Servicios adicionales</span>
          <span>COP 32.140</span>
        </motion.li>
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
          className="flex justify-between text-xl font-bold text-gold"
        >
          <span>Total</span>
          <span>COP 585.960</span>
        </motion.li>
      </motion.ul>
    </motion.div>
  </motion.div>

    {/* Botón para redirigir al Boarding Pass */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 text-center"
              >
                <button
                onClick={goToBoarding}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Ver Boarding Pass
              </button>
            </motion.div>
      </div>
    </div>
  );
};

export default ConfirmarPago;