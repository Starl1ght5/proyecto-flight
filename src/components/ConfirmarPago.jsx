import React, { useState } from "react";
import { FaCcVisa, FaPaypal, FaApple, FaGooglePay, FaBuilding } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ConfirmarPago = () => {
  const [bank, setBank] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [applePayId, setApplePayId] = useState("");
  const [googlePayId, setGooglePayId] = useState("");

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const navigate = useNavigate(); 
  
  const handlePayment = () => {
    
    setPaymentSuccess(true);
  };
  const goToBoardingPass = () => {
    navigate("/boarding-pass");
  };

  return (
    <div className="min-h-screen bg-bluemint flex flex-col items-center justify-center p-6">
      <h2 className="text-blueblack text-4xl font-semibold mb-4">Confirmar y Pagar</h2>
      <p className="text-center mb-8 text-lg text-gray-700">Selecciona tu método de pago para completar la compra.</p>

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-3xl">
        {/* Métodos de Pago */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Tarjeta de Crédito/Débito */}
          <div
            onClick={() => setPaymentMethod("creditCard")}
            className={`p-6 rounded-xl cursor-pointer flex items-center justify-between bg-gray-100 hover:bg-lightblue transition-all duration-300 ${paymentMethod === "creditCard" ? "border-4 border-bluemint" : ""}`}
          >
            <div className="flex items-center">
              <FaCcVisa className="w-10 h-10 text-blueblack" />
              <span className="ml-4 text-lg font-semibold text-blueblack">Tarjeta de Crédito/Débito</span>
            </div>
            {paymentMethod === "creditCard" && <span className="text-bluemint text-2xl">✔</span>}
          </div>

          {/* PSE */}
          <div
            onClick={() => setPaymentMethod("pse")}
            className={`p-6 rounded-xl cursor-pointer flex items-center justify-between bg-gray-100 hover:bg-lightblue transition-all duration-300 ${paymentMethod === "pse" ? "border-4 border-bluemint" : ""}`}
          >
            <div className="flex items-center">
              <FaBuilding className="w-10 h-10 text-blueblack" />
              <span className="ml-4 text-lg font-semibold text-blueblack">PSE</span>
            </div>
            {paymentMethod === "pse" && <span className="text-bluemint text-2xl">✔</span>}
          </div>

          {/* PayPal */}
          <div
            onClick={() => setPaymentMethod("paypal")}
            className={`p-6 rounded-xl cursor-pointer flex items-center justify-between bg-gray-100 hover:bg-lightblue transition-all duration-300 ${paymentMethod === "paypal" ? "border-4 border-bluemint" : ""}`}
          >
            <div className="flex items-center">
              <FaPaypal className="w-10 h-10 text-blueblack" />
              <span className="ml-4 text-lg font-semibold text-blueblack">PayPal</span>
            </div>
            {paymentMethod === "paypal" && <span className="text-bluemint text-2xl">✔</span>}
          </div>

          {/* Apple Pay */}
          <div
            onClick={() => setPaymentMethod("applePay")}
            className={`p-6 rounded-xl cursor-pointer flex items-center justify-between bg-gray-100 hover:bg-lightblue transition-all duration-300 ${paymentMethod === "applePay" ? "border-4 border-bluemint" : ""}`}
          >
            <div className="flex items-center">
              <FaApple className="w- 10 h-10 text-blueblack" />
              <span className="ml-4 text-lg font-semibold text-blueblack">Apple Pay</span>
            </div>
            {paymentMethod === "applePay" && <span className="text-bluemint text-2xl">✔</span>}
          </div>

          {/* Google Pay */}
          <div
            onClick={() => setPaymentMethod("googlePay")}
            className={`p-6 rounded-xl cursor-pointer flex items-center justify-between bg-gray-100 hover:bg-lightblue transition-all duration-300 ${paymentMethod === "googlePay" ? "border-4 border-bluemint" : ""}`}
          >
            <div className="flex items-center">
              <FaGooglePay className="w-10 h-10 text-blueblack" />
              <span className="ml-4 text-lg font-semibold text-blueblack">Google Pay</span>
            </div>
            {paymentMethod === "googlePay" && <span className="text-bluemint text-2xl">✔</span>}
          </div>
        </div>

        {/* Mostrar formulario de tarjeta de crédito/débito si se selecciona este método */}
        {paymentMethod === "creditCard" && (
          <div className="mt-6">
            <div className="mb-4">
              <label className="block text-blueblack font-semibold mb-2">Número de tarjeta:</label>
              <input
                type="text"
                className="w-full p-4 border-2 border-lightblue rounded-lg"
                placeholder="1234 5678 9876 5432"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-blueblack font-semibold mb-2">Fecha de vencimiento:</label>
                <input
                  type="text"
                  className="w-full p-4 border-2 border-lightblue rounded-lg"
                  placeholder="MM/AA"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-blueblack font-semibold mb-2">CVV:</label>
                <input
                  type="text"
                  className="w-full p-4 border-2 border-lightblue rounded-lg"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Formulario para PayPal */}
        {paymentMethod === "paypal" && (
          <div className="mt-6">
            <div className="mb-4">
              <label className="block text-blueblack font-semibold mb-2">Correo de PayPal:</label>
              <input
                type="email"
                className="w-full p-4 border-2 border-lightblue rounded-lg"
                placeholder="tuemail@paypal.com"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Formulario para Apple Pay */}
        {paymentMethod === "applePay" && (
          <div className="mt-6">
            <div className="mb-4">
              <label className="block text-blueblack font-semibold mb-2">ID de Apple Pay:</label>
              <input
                type="text"
                className="w-full p-4 border-2 border-lightblue rounded-lg"
                placeholder="tuappleid@icloud.com"
                value={applePayId}
                onChange={(e) => setApplePayId(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Formulario para Google Pay */}
        {paymentMethod === "googlePay" && (
          <div className="mt-6">
            <div className="mb-4">
              <label className="block text-blueblack font-semibold mb-2">ID de Google Pay:</label>
              <input
                type="text"
                className="w-full p-4 border-2 border-lightblue rounded-lg"
                placeholder="tuemail@google.com"
                value={googlePayId}
                onChange={(e) => setGooglePayId(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Mostrar opciones de banco y formulario de tarjeta si el usuario selecciona PSE */}
        {paymentMethod === "pse" && (
          <div className="mt- 6">
            <label className="block text-blueblack font-semibold mb-2">Selecciona tu banco:</label>
            <select
              className="w-full p-4 border-2 border-lightblue rounded-lg"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            >
              <option value="">Seleccionar Banco</option>
              <option value="banco1">Bancolombia</option>
              <option value="banco2">DaviPlata</option>
              <option value="banco3">Visa</option>
            </select>
            {/* Formulario de tarjeta de crédito/débito se muestra después de seleccionar un banco en PSE */}
            {(bank === "banco1" || bank === "banco2" || bank === "banco3") && (
              <div className="mt-6">
                <div className="mb-4">
                  <label className="block text-blueblack font-semibold mb-2">Número de tarjeta:</label>
                  <input
                    type="text"
                    className="w-full p-4 border-2 border-lightblue rounded-lg"
                    placeholder="1234 5678 9876 5432"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-blueblack font-semibold mb-2">Fecha de vencimiento:</label>
                    <input
                      type="text"
                      className="w-full p-4 border-2 border-lightblue rounded-lg"
                      placeholder="MM/AA"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-blueblack font-semibold mb-2">CVV:</label>
                    <input
                      type="text"
                      className="w-full p-4 border-2 border-lightblue rounded-lg"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Resumen de la compra */}
        <div className="mt-6 border-t pt-6">
          <h3 className="font-semibold text-lg text-blueblack mb-4">Resumen de la compra</h3>
          <div className="flex justify-between mb-4">
            <span>Vuelos</span>
            <span>COP 490.770</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Asientos</span>
            <span>COP 63.050</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Servicios adicionales</span>
            <span>COP 32.140</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gold">
            <span>Total</span>
            <span>COP 585.960</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-red text-bluemint py-3 mt-6 rounded-lg font-semibold hover:bg-bluedark transition"
        >
          Confirmar Pago
        </button>

        {paymentSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 text-gold text-lg font-bold"
          >
            Pago realizado exitosamente
          </motion.div>
        )}

  {paymentSuccess && (
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
  )}

      {/* Botón para redirigir al Boarding Pass */}
      {paymentSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 text-center"
                >
                  <button
                    onClick={goToBoardingPass} // Redirige al Boarding Pass
                    className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                  >
                    Ver Boarding Pass
                  </button>
                </motion.div>
              )}
      </div>
    </div>
  );
};

export default ConfirmarPago;