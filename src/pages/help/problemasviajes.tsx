import { Link } from "react-router-dom";
import Navbar from "../../components/navbarcomponent";
import Footer from "../../components/footercomponent";

export default function ProblemasConElVuelo() {
  const services = [
    {
      title: "Cambio de Itinerario",
      description: "Los planes no siempre salen como esperamos. Por esto, conoce cuáles son tus opciones en caso de cambios de itinerario",
      link: "/help-center/cambiositinerario",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Cancelaciones",
      description: "Si el vuelo es cancelado debido a razones de fuerza mayor, podrás reprogramar tu viaje, solicitar el reembolso del valor del pasaje o contratar otros servicios",
      link: "/help-center/cancelacionestravel",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          
          {/* Encabezado */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
              Problemas con el vuelo
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Encuentra soluciones rápidas para cambios de itinerario, cancelaciones y otros inconvenientes
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid gap-6 md:grid-cols-2 mb-16">
            {services.map((service, index) => (
              <Link 
                key={index}
                to={service.link}
                className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-gray-900 p-8 transition-all duration-200 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="mb-6 w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 group-hover:bg-gray-900 group-hover:text-white transition-all duration-200">
                  {service.icon}
                </div>
                
                {/* Content */}
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Link */}
                <div className="flex items-center text-gray-900 font-medium group-hover:gap-2 transition-all">
                  Ver más información
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Banner de información importante */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mb-16">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿Tu vuelo tuvo problemas?
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Si tu vuelo se retrasó, adelantó o fue cancelado, tenemos soluciones para ti. Contáctanos lo antes posible para encontrar la mejor alternativa para tu viaje.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center px-3 py-1 bg-white rounded-lg text-sm font-medium text-gray-700 border border-red-200">
                    <svg className="w-4 h-4 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Retrasos
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-white rounded-lg text-sm font-medium text-gray-700 border border-red-200">
                    <svg className="w-4 h-4 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancelaciones
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-white rounded-lg text-sm font-medium text-gray-700 border border-red-200">
                    <svg className="w-4 h-4 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    Cambios de itinerario
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-10 border border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    Asistencia inmediata
                  </h3>
                  <p className="text-gray-600">
                    Nuestro equipo está disponible 24/7 para resolver problemas con tu vuelo
                  </p>
                </div>
              </div>
              <a 
                href="tel:+1234567890"
                className="flex-shrink-0 px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg whitespace-nowrap"
              >
                Llamar ahora
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 mb-2">Línea de emergencias</p>
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