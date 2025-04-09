import { useState } from "react";

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
  const [openIndex, setOpenIndex] = useState(null);

  const preguntas = [
    {
        pregunta: "¿Cómo cambiar el nombre de un pasajero en mi pasaje?",
        respuesta:
          "Podrás cambiar o corregir el nombre en una reserva una sola vez y deberás hacerlo llamando a nuestro Contact Center. Antes de llamar, ten presente: Podrás hacerlo solo si compraste tu pasaje a través de ROYAL AIRLINES y no has iniciado tu viaje. Para cambios de nombre legales y omisión de apellido o nombre, deberás presentar documentación de respaldo que acredite tu nombre.",
      },
      {
        pregunta: "¿Hasta cuándo tengo plazo para devolver mi pasaje?",
        respuesta:
          "Puedes solicitar la devolución de tu pasaje siempre que esté vigente. Si no puedes viajar, podrás solicitar la devolución antes de la fecha de vuelo, iniciando sesión en nuestro sitio y entrando a Mis viajes. Si lo haces después de la fecha de vuelo, podrás hacerlo llamando a nuestro Contact Center.",
      },
      {
        pregunta: "¿Puedo cambiar mi pasaje en el sitio web?",
        respuesta:
          "Puedes cambiar tu pasaje siempre que las condiciones de la tarifa que compraste lo permitan. Ingresa a Mis viajes para confirmar si tu pasaje permite cambios.",
      },
      {
          pregunta: "¿Puedo cambiar mi pasaje si ya inicié mi viaje?",
          respuesta:
            "Para revisar las condiciones de tu pasaje, entra a Mis viajes, ahí podrás ver si tu pasaje permite cambios, los vuelos disponibles y hacer el cambio si lo necesitas.",
      },
      {
          pregunta: "¿Puedo cambiar el número de pasaporte o ID de mi pasaje?",
          respuesta:
            "Para cambiar o corregir el número de identificación en un pasaje por errores de emisión, debes llamar a nuestro Contact Center.",
      },
  ];

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-purple2">
              Cambios
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
  );
}