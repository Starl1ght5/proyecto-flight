import { useState } from "react";
import Navbar from "../../components/navbarcomponent";
import Footer from "../../components/footercomponent";

const ChevronDown = () => (
  <svg className="w-5 h-5 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function DevolucionesHelp() {
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
    <div className="bg-white">
      <Navbar />
      
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
              Devoluciones
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Gestiona tus reembolsos con nuestra política flexible
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">¿Necesitas ayuda con tu devolución?</h3>
                <p className="text-gray-600 mb-4">Nuestro equipo está disponible 24/7 para asistirte</p>
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