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
      pregunta: "¿Qué hago si recibí el email para recuperar mi contraseña pero no lo solicité?",
      respuesta:
        "Si no solicitaste un cambio de contraseña y te llegó el email con un enlace para un cambio, te dejamos las siguientes recomendaciones: 1.Verifica los dispositivos donde iniciaste sesión con tu cuenta.  2.Cambia la contraseña en tu cuenta y asegúrate de no compartirla. 3.Evalúa la opción de cambiar de email en tu cuenta ROYAL.",
    },
    {
        pregunta: "Me aparece un mensaje de que no reconoce mi usuario",
        respuesta:
          "Si es la primera vez que accedes a tu cuenta, debes intentarlo con tu Número ROYAL Pass. Si probaste lo anterior y aún no lo logras, intenta recuperar tus datos.Si aún no puedes ingresar, deberás crear un caso y te ayudaremos con la solicitud para revisar tu cuenta.",
    },
    {
        pregunta: "¿Cómo puedo recuperar mi contraseña?",
        respuesta:
          "Si olvidaste tu contraseña, puedes recuperarla ingresando a recupera el acceso a tu cuenta y sigue estos sencillos pasos:  1.Selecciona qué dato de identificación quieres usar para comenzar. Puedes hacerlo con tu email de registro, Número ROYAL Pass, documento de identidad, CPF o Pasaporte. 2.Luego, podrás restablecer tu contraseña a través de tu email, SMS o WhatsApp. 3.Sigue los pasos que te indicaremos.",
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
            Contraseña
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