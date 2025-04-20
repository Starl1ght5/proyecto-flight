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
      pregunta: "¿Puedo pedir la devolución de asientos y/o equipaje comprados?",
      respuesta: "Sí, podrás hacerlo siempre que la solicites junto a la devolución de tus pasajes. El reembolso se realizará según las condiciones de tu tarifa.",
    },
    {
      pregunta: "¿Hasta cuándo tengo plazo para devolver mi pasaje?",
      respuesta: "Puedes solicitar la devolución de tu pasaje siempre que esté vigente. Si no puedes viajar, podrás solicitar la devolución antes de la fecha de vuelo iniciando sesión en nuestro sitio. Para solicitudes posteriores a la fecha de vuelo, contacta a nuestro Centro de Atención.",
    },
    {
      pregunta: "¿Cómo recibiré la devolución de mi pasaje?",
      respuesta: "El reembolso se realizará al mismo método de pago utilizado en la compra dentro de 7 días hábiles (Brasil: 7 días naturales / Perú: 5 días hábiles). El tiempo de acreditación depende de tu entidad bancaria.",
    },
    {
      pregunta: "Si solicito la devolución de mi pasaje ¿Cuánto dinero me devolverán?",
      respuesta: "El monto depende del tipo de tarifa adquirida. Consulta el detalle exacto iniciando sesión en 'Mis viajes' > 'Devolución de pasajes' o busca tu reserva con número de orden y apellido.",
    },
    {
      pregunta: "¿Dónde pido la devolución de mi pasaje?",
      respuesta: "Inicia sesión en nuestro sitio y accede a 'Mis viajes' > 'Administrar viaje' > 'Devolución de pasajes'. Para reservas sin sesión iniciada, utiliza tu número de orden o código de reserva con tu apellido.",
    },
    {
      pregunta: "¿Dónde puedo conocer el estado de mi devolución?",
      respuesta: "Consulta el estado iniciando sesión en 'Mis viajes'. Para reservas sin sesión, utiliza tu número de orden o código de reserva con tu apellido para realizar el seguimiento.",
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
              Devoluciones
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