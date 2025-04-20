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
      pregunta: "¿Dónde puedo revisar mis notificaciones?",
      respuesta:
        "Toda la información que necesitas saber sobre tu viaje te llegará a tu email y/o WhatsApp.",
    },
    {
      pregunta: "Si soy nacional de Estados Unidos, Canadá o Australia, ¿necesito visa para ingresar a Brasil?",
      respuesta:
        "A partir del 10 de Abril de 2025, si eres nacional de Estados Unidos, Canadá o Australia, deberás contar con una visa para ingresar a Brasil, según lo dispuesto por el gobierno del país. Tienes que llevar una copia impresa para presentarla a las autoridades. Es responsabilidad de cada pasajero contar con la documentación necesaria para el embarque.",
    },
    {
      pregunta: "Perdí mi cédula de identidad o pasaporte, ¿qué puedo hacer para continuar mi viaje?",
      respuesta:
        "Si estás en el extranjero, te recomendamos consultar con la embajada o consulado de tu país para que te den una solución."
    }
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
            Información Travel
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gestiona tus reembolsos con nuestra política flexible
          </p>
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