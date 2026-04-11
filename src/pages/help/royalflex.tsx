import { useState } from "react";
import Navbar from "../../components/navbarcomponent";
import Footer from "../../components/footercomponent";

const ChevronDown = () => (
  <svg className="w-5 h-5 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function RoyalFlex() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const preguntas = [
    {
      pregunta: "¿Qué es ROYAL Flex?",
      respuesta:
        "Es un producto que puedes agregar a tu pasaje para tener la opción de cancelarlo antes del vuelo y recibir un reembolso para que no pierdas tu dinero.",
    },
    {
      pregunta: "¿Cómo utilizar ROYAL Flex?",
      respuesta:
        "Para utilizar el producto deberás ingresar a la sección 'Mis Viajes', sub-sección 'Devolución de pasajes' y cancelar tu pasaje. La cancelación afectará a todos los vuelos y pasajeros de la reserva. Dentro de las siguientes 72 horas, se reembolsarán créditos a tu ROYAL Wallet.",
    },
    {
      pregunta: "¿Qué son los créditos?",
      respuesta:
        "Es saldo no retirable que se guarda en la ROYAL Wallet para uso exclusivo en compras en ROYAL.com. Puedes utilizar estos créditos en un nuevo vuelo o en adicionales de viaje como asientos o maletas.",
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
              ROYAL Flex
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Máxima flexibilidad para tus viajes
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

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-16">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Beneficio de ROYAL Flex</h3>
                <p className="text-gray-600">Con ROYAL Flex tienes la tranquilidad de poder cancelar tu vuelo y recuperar tu inversión en créditos para futuras compras. Ideal para viajes con fechas flexibles.</p>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">¿Dudas sobre ROYAL Flex?</h3>
                <p className="text-gray-600 mb-4">Contacta con nuestro equipo para más información</p>
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