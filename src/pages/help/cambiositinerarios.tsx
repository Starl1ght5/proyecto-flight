import { useState } from "react";
import Navbar from "../../components/navbarcomponent";
import Footer from "../../components/footercomponent";

const ChevronDown = () => (
  <svg className="w-5 h-5 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function Equipaje() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const preguntas = [
    {
      pregunta: "¿Qué pasa si mi vuelo se retrasó?",
      respuesta:
        "Si tuvimos que retrasar tu vuelo 31 minutos o más y no estás conforme con el nuevo horario, queremos darte una solución.",
    },
    {
      pregunta: "¿Qué pasa si mi vuelo se adelantó?",
      respuesta:
        "Si tuvimos que adelantar tu vuelo 16 minutos o más y no estás conforme con el nuevo horario, queremos darte una solución.",
    },
    {
      pregunta: "Problema con vuelos en Bogotá",
      respuesta:
        "Actualmente, El Dorado de Bogotá cuenta con sobredemanda de vuelos en ciertas horas que superan la capacidad operacional del aeropuerto. Ante este escenario, la Aerocivil ha implementado de forma frecuente el Programa de Demoras en Tierra que busca regular la operación, pero suele generar retrasos o reprogramaciones de itinerarios en vuelos domésticos e internacionales.",
    }
  ];

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      <Navbar />
      
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          
          {/* Encabezado */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
              Equipaje Incluido
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Todo lo que necesitas saber sobre tu equipaje y políticas de vuelo
            </p>
          </div>

          {/* Acordeón de Preguntas */}
          <div className="space-y-4 mb-16">
            {preguntas.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
              >
                <button
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors duration-200 group"
                  onClick={() => toggleDropdown(index)}
                >
                  <span className="text-base md:text-lg font-semibold text-gray-900 pr-4 group-hover:text-gray-900">
                    {item.pregunta}
                  </span>
                  <div className={`flex-shrink-0 text-gray-400 group-hover:text-gray-900 transition-all duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                    <ChevronDown />
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6 pt-2">
                    <div className="border-l-4 border-gray-900 pl-4 py-2">
                      <p className="text-gray-600 leading-relaxed">
                        {item.respuesta}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Card de información adicional */}
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  ¿Necesitas más información?
                </h3>
                <p className="text-gray-600 mb-4">
                  Nuestro equipo de soporte está disponible 24/7 para resolver tus dudas sobre equipaje y políticas de vuelo
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="tel:+1234567890"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Llamar ahora
                  </a>
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg border-2 border-gray-900 transition-all duration-200">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Chat en vivo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Información de contacto */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 mb-2">Línea de atención al cliente</p>
            <a 
              href="tel:+1234567890" 
              className="text-2xl font-semibold text-gray-900 hover:text-gray-700 transition-colors"
            >
              +1 234 567 890
            </a>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}