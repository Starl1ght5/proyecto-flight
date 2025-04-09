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
      pregunta: "¿Cómo agrego equipaje adicional?",
      respuesta:
        "Puedes agregar equipaje de mano, de bodega y especial durante la compra de tus pasajes o después. El equipaje de mano solo puede ser agregado por un costo adicional cuando no esté incluido en la tarifa de tu vuelo.",
    },
    {
      pregunta: "¿Cuánto tengo que pagar si llevo equipaje extra?",
      respuesta:
        "El costo del equipaje extra puede variar según fecha del vuelo (temporada alta o baja) y anticipación de la compra. Los precios van subiendo a medida que se acerca la fecha del vuelo. Por eso, te recomendamos comprar el equipaje por adelantado ya que puedes ahorrar hasta el 40% del valor que pagarás en el aeropuerto. ",
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
            Comprar Equipajes
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
  );
}