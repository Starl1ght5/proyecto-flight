import { Link } from "react-router-dom";

export default function CambiosYDevoluciones() {
  const services = [
    {
      title: "Devoluciones",
      description: "¿Necesitas anular tu compra? Conoce los plazos y condiciones para solicitar tu reembolso.",
      link: "/help-center/devoluciones",
      icon: "🔄"
    },
    {
      title: "Cambios",
      description: "Modifica tu vuelo: cambia fecha, destino o itinerario según nuestras políticas.",
      link: "/help-center/cambios",
      icon: "✈️",
    },
    {
      title: "ROYAL Flex",
      description: "Máxima flexibilidad para tus viajes con nuestras opciones premium.",
      link: "/help-center/royalflex",
      icon: "🌟",
    }
  ];

  return (
    <div className="min-h-screen bg-[#EAF1F8] py-16 px-4 sm:px-6 lg:px-8 font-noto-sans">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h1 className="text-2xl md:text-6xl font-bold mb-6">
          <span className="text-purple2">
            Cambios y Devoluciones
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
          Gestiona tus reservas con nuestra política flexible diseñada para tu comodidad
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div 
            key={index}
            className={`relative overflow-hidden rounded-2xl shadow-2xl border-2 border-purple-900 group transition-all duration-500 hover:scale-[1.02]`}
          >
            {/* Card Background */}
            <div className={`absolute inset-0 opacity-15 group-hover:opacity-20 transition-opacity duration-500`}></div>
            
            {/* Card Content */}
            <div className="relative z-10 p-8 h-full flex flex-col bg-white bg-opacity-70 backdrop-blur-sm">
              <div className="mb-6 text-5xl">{service.icon}</div>
              <h2 className="text-3xl font-bold text-purple mb-4">{service.title}</h2>
              <p className="text-gray-600 mb-8 text-lg flex-grow opacity-90">{service.description}</p>
              <Link 
                to={service.link}
                className={`mt-auto inline-flex items-center justify-center px-6 py-3 border bg-purple hover:bg-purple-dark text-lg font-medium rounded-full shadow-sm text-white ${service} hover:brightness-110 transition-all duration-300 transform group-hover:scale-105`}
              >
                Ver detalles
                <svg className="ml-3 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Decorative Elements */}
      <div className="max-w-7xl mx-auto mt-20 text-center">
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-white shadow-lg border border-purple">
          <span className="mr-3 text-gray-600">📞</span>
          <span className="text-lg font-medium text-[#002147]">
            ¿Necesitas ayuda? Llama al <span className="text-purple-dark">+1 234 567 890</span>
          </span>
        </div>
      </div>

      {/* Watermark */}
      <div className="mt-16 text-center">
        <p className="text-[#002147] opacity-50 text-sm">
          © {new Date().getFullYear()} LATAM Airlines. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}