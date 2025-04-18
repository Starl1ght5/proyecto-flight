import { Link } from "react-router-dom";
import Navbar from "../Components/NavbarComponent.tsx";
import { Helmet } from "react-helmet";
import Footer from "../Components/FooterComponent.tsx";
export default function HelpCenter() {
  return (
    <div>
      <Helmet>
        <title>Centro Ayuda</title>
      </Helmet>

      <Navbar/>

      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 py-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-purple2 ">
              Centro de Ayuda
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encuentra respuestas rápidas a tus preguntas o contacta con nuestro equipo de soporte.
          </p>
        </div>

        {/* Buscador */}
        <div className="mb-16">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="¿Cómo podemos ayudarte? Busca por palabra clave..."
              className="block w-full pl-10 pr-12 py-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2text-lg"
            />
            <button className="absolute right-1.5 top-1.5 bg-purple text-white px-6 py-2.5 rounded-lg hover:bg-purple-dark transition-all duration-200 shadow-md">
              Buscar
            </button>
          </div>
        </div>

        {/* Categorías destacadas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <span className="bg-purple text-white p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </span>
            Categorías destacadas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                title: "Cambios y devoluciones", 
                desc: "Información para modificar tu itinerario de manera voluntaria.", 
                link: "/help-center/cambiosydevoluciones",
                icon: "🔄"
              },
              { 
                title: "Equipaje", 
                desc: "Revisa límites, medidas e información sobre equipaje.", 
                link: "/help-center/equipaje",
                icon: "🧳"
              }
            ].map((category, index) => (
              <Link 
                to={category.link} 
                key={index}
                className="group bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:border-purple hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-4">{category.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-purple-dark mb-3">{category.title}</h3>
                    <p className="text-gray-600 mb-4">{category.desc}</p>
                    <span className="inline-flex items-center text-purple2 font-medium group-hover:underline">
                      Ver detalles
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Todas las categorías */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <span className="bg-purple text-white p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </span>
            Explora todas las categorías
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "COVID-19", desc: "Medidas de seguridad e higiene durante tu viaje.", link: "/help-center/covid19", icon: "😷" },
              { title: "Documentación", desc: "Revisa la documentación requerida para tu viaje.", link: "/help-center/documentosparaviajar", icon: "📄" },
              { title: "Problemas con vuelos", desc: "Atrasos, adelantos o cancelaciones de vuelos.", link: "/help-center/problemasviajes", icon: "⚠️" },
              { title: "Cuenta y contraseña", desc: "Acceso a tu cuenta de ROYAL Airlines.", link: "/help-center/recuperacioncuenta", icon: "🔑" },
              { title: "Compra de pasajes", desc: "Información sobre compra de pasajes y adicionales.", link: "/help-center/comprapasajes", icon: "💳" },
              { title: "ROYAL Wallet", desc: "Todo lo que puedes hacer con tu ROYAL Wallet.", link: "/help-center/RoyalWallet", icon: "💰" },
            ].map((category, index) => (
              <Link 
                to={category.link} 
                key={index}
                className="group bg-white p-5 rounded-lg border border-purple2 hover:border-purple-dark hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start">
                  <span className="text-2xl mr-3">{category.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-purple-dark mb-2">{category.title}</h3>
                    <p className="text-gray-600 text-sm">{category.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Contacto adicional */}
        <div className="mt-16 mb-10 border border-purple rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl text-purple2 font-bold mb-4">¿No encontraste lo que buscabas?</h2>
            <p className="text-lg text-gray-500 mb-6 opacity-90">Nuestro equipo de soporte está disponible 24/7 para ayudarte con cualquier consulta.</p>
            <button className="border border-purple-light text-purple-dark font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-200 shadow-lg">
              Contactar a soporte
            </button>
          </div>
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
}