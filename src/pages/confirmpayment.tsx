import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbarcomponent";
import Footer from "../components/footercomponent";

const ConfirmarPago = () => {
  const navigate = useNavigate();

  const goToBoarding = () => {
    navigate("/my-tickets");
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
      <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
              ¡Pago exitoso!
            </h1>
            <p className="text-lg text-gray-600">
              Tu reserva ha sido confirmada
            </p>
          </motion.div>

          {/* Invoice Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">Resumen de compra</h2>
              <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold text-sm">
                PAGADO
              </div>
            </div>

            {/* Invoice Items */}
            <div className="space-y-4 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex justify-between items-center"
              >
                <span className="text-gray-600">Vuelos</span>
                <span className="font-semibold text-gray-900">COP 490.770</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-between items-center"
              >
                <span className="text-gray-600">Asientos</span>
                <span className="font-semibold text-gray-900">COP 63.050</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex justify-between items-center"
              >
                <span className="text-gray-600">Servicios adicionales</span>
                <span className="font-semibold text-gray-900">COP 32.140</span>
              </motion.div>
            </div>

            {/* Total */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-6 border-t-2 border-gray-900"
            >
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-900">Total</span>
                <span className="text-3xl font-bold text-gray-900">COP 585.960</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Confirmación enviada</h3>
                <p className="text-gray-600 text-sm">
                  Hemos enviado un correo electrónico con los detalles de tu reserva y tu pase de abordar. Revisa tu bandeja de entrada.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={goToBoarding}
              className="flex-1 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              Ver mis tiquetes
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex-1 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg border-2 border-gray-900 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Volver al inicio
            </button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-500 text-sm mb-2">¿Necesitas ayuda?</p>
            <a href="tel:+1234567890" className="text-gray-900 font-semibold hover:underline">
              +1 234 567 890
            </a>
          </motion.div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConfirmarPago;