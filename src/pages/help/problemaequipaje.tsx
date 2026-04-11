import { useState } from "react";
import Navbar from "../../components/navbarcomponent";
import Footer from "../../components/footercomponent";

const ChevronDown = () => (
  <svg className="w-5 h-5 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function ProblemaEquipaje() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const preguntas = [
    {
      pregunta: "¿Qué hago si mi equipaje se perdió?",
      respuesta:
        "Si tu equipaje no llegó a tu destino, dirígete inmediatamente al mostrador de equipaje perdido en el aeropuerto. Nuestro personal te ayudará a presentar un reporte y rastrear tu maleta.",
    },
    {
      pregunta: "¿Qué hago si mi equipaje llegó dañado?",
      respuesta:
        "Repórtalo inmediatamente en el mostrador de equipajes antes de salir del aeropuerto. Tomaremos fotos del daño y procesaremos tu reclamación.",
    },
  ];

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      <Navbar />
      
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
              Problemas con Equipaje
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Soluciones para equipaje perdido o dañado
            </p>
          </div>

          <div className="space-y-4 mb-16">
            {preguntas.map((item, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
                <button className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors duration-200 group" onClick={() => toggleDropdown(index)}>
                  <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">{item.pregunta}</span>
                  <div className={`flex-shrink-0 text-gray-400 group-hover:text-gray-900 transition-all duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                    <ChevronDown />
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 pt-2">
                    <div className="border-l-4 border-gray-900 pl-4 py-2">
                      <p className="text-gray-600 leading-relaxed">{item.respuesta}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mb-16">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Importante</h3>
                <p className="text-gray-600">Todos los problemas con equipaje deben reportarse antes de salir del aeropuerto. Después de salir, será más difícil procesar tu reclamación.</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Asistencia con equipaje</h3>
                <p className="text-gray-600 mb-4">Contacta inmediatamente para reportar problemas</p>
                <a href="tel:+1234567890" className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-200">Llamar ahora</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}