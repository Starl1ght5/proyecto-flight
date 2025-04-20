import { useState } from "react";
import Navbar from "../../components/navbarcomponent";
import Footer from "../../components/footercomponent";

const ChevronDown = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronUp = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

export default function Devoluciones() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const preguntas = [
    {
      pregunta: "Me registré para una devolución, tengo cuenta ROYAL, pero no soy parte de ROYAL Pass, ¿cómo puedo serlo?",
      respuesta:
        "Para ser parte del programa ROYAL Pass, si ya te registraste, debes ingresar a Tu cuenta y buscar la sección ROYAL Pass, donde deberás aceptar los Términos y Condiciones del programa. ¡Así de fácil!",
    },
    {
        pregunta: "¿Qué hago si no tengo acceso al email y teléfono registrados en mi cuenta?",
        respuesta:
          "[Chile] Si no tienes acceso al email y teléfono registrados en tu cuenta, por lo que no puedes recuperar tu contraseña, deberás realizar la verificación de tu identidad para registrar un nuevo email y contraseña para iniciar sesión.",
    },
    {
        pregunta: "¿Por qué tengo la cuenta bloqueada?",
        respuesta:
          "Te bloqueamos tu cuenta para proteger tus datos. Esto se puede deber a intento de fraude, una actividad inusual o sospechosa.",
    },
    {
        pregunta: "¿Cómo y dónde puedo cambiar mi email?",
        respuesta:
          "Si quieres cambiar tu email en ROYAL, debes hacerlo desde tu cuenta. Prefiere siempre tu email personal. Importante: debe ser un nuevo email. No puedes cambiarlo por uno que estés utilizando en otra cuenta ROYAL.",
    },
  ];

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <Navbar />
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-purple2">
            Cuenta Royal Pass
            </span>
          </h1>
        </div>

        {/* Acordeón de Preguntas */}
        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-purple">
          {preguntas.map((item, index) => (
            <div 
              key={index} 
              className={`border-b border-purple-400 last:border-b-0 transition-all duration-300 ${openIndex === index ? 'bg-white bg-opacity-50' : ''}`}
            >
              <button
                className={`w-full flex justify-between items-center p-6 text-left ${openIndex === index ? 'text-purple-400' : 'text-[#002147] hover:text-[#4B0082]'}`}
                onClick={() => toggleDropdown(index)}
              >
                <span className="text-lg md:text-xl font-semibold pr-4">{item.pregunta}</span>
                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 pt-2 text-gray-600">
                  <div className="border-l-4 border-purple-dark pl-4">
                    <p className="text-base md:text-lg">{item.respuesta}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contacto */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white shadow-md border border-purple">
            <span className="mr-3 text-[#4B0082]">📞</span>
            <span className="text-lg font-medium text-[#002147]">
              Asistencia inmediata: <span className="text-purple-dark font-extrabold">+1 234 567 890</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <Footer />
    </div>
  );
}