import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbarcomponent.tsx";
import { Helmet } from "react-helmet";
import Footer from "../components/footercomponent.tsx";

// Data unificada para el filtro
const HELP_CATEGORIES = [
  { 
    title: "Cambios y devoluciones", 
    desc: "Información para modificar tu itinerario de manera voluntaria", 
    link: "/help-center/cambiosydevoluciones",
    popular: true,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    )
  },
  { 
    title: "Equipaje", 
    desc: "Revisa límites, medidas e información sobre equipaje", 
    link: "/help-center/equipaje",
    popular: true,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  { 
    title: "COVID-19", 
    desc: "Medidas de seguridad e higiene durante tu viaje", 
    link: "/help-center/covid19",
    popular: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  { 
    title: "Documentación", 
    desc: "Documentación requerida para tu viaje", 
    link: "/help-center/documentosparaviajar",
    popular: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  { 
    title: "Problemas con vuelos", 
    desc: "Atrasos, adelantos o cancelaciones", 
    link: "/help-center/problemasviajes",
    popular: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  },
  { 
    title: "Cuenta y contraseña", 
    desc: "Acceso a tu cuenta de ROYAL Airlines", 
    link: "/help-center/recuperacioncuenta",
    popular: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    )
  },
  { 
    title: "Royal Wallet", 
    desc: "Todo sobre tu billetera virtual", 
    link: "/help-center/RoyalWallet",
    popular: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");

  // Lógica técnica corregida: Filtra estrictamente por título
  const filteredResults = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return HELP_CATEGORIES;
    return HELP_CATEGORIES.filter(item => 
      item.title.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Clasificación para el diseño original
  const popularItems = filteredResults.filter(item => item.popular);
  const allOtherItems = filteredResults.filter(item => !item.popular);

  return (
    <div className="bg-white">
      <Helmet>
        <title>Centro de Ayuda - Royal Airlines</title>
      </Helmet>

      <Navbar/>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 py-16 lg:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
              ¿En qué podemos ayudarte?
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Encuentra respuestas rápidas o contacta con nuestro equipo de soporte
            </p>
          </div>

          {/* Buscador Mejorado con Filtro Técnico */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar en el centro de ayuda..."
                className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal (DISEÑO ORIGINAL) */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        
        {filteredResults.length > 0 ? (
          <>
            {/* 1. Temas populares (Solo si hay coincidencias populares) */}
            {popularItems.length > 0 && (
              <div className="mb-20 animate-in fade-in duration-500">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
                  Temas populares
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {popularItems.map((category, index) => (
                    <Link 
                      to={category.link} 
                      key={index}
                      className="group bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-gray-900 transition-all duration-200 hover:shadow-lg"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 group-hover:bg-gray-900 group-hover:text-white transition-all duration-200">
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                          <p className="text-gray-600 mb-4">{category.desc}</p>
                          <span className="inline-flex items-center text-sm font-medium text-gray-900 group-hover:gap-2 transition-all">
                            Más información
                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Todas las categorías (Lo que queda del filtro) */}
            {allOtherItems.length > 0 && (
              <div className="mb-20 animate-in fade-in duration-700">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
                  {searchQuery ? "Otros resultados" : "Todas las categorías"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {allOtherItems.map((category, index) => (
                    <Link 
                      to={category.link} 
                      key={index}
                      className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 group-hover:bg-gray-200 transition-colors">
                          {category.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-gray-900 mb-1">{category.title}</h3>
                          <p className="text-sm text-gray-600">{category.desc}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Estado cuando no hay resultados */
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-900">No hay resultados para "{searchQuery}"</h3>
            <p className="text-gray-500 mt-2">Prueba buscando palabras como "Equipaje", "Documentación" o "COVID".</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-lg font-semibold"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}

        {/* Sección de contacto original */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 border border-gray-200">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              ¿Necesitas más ayuda?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Nuestro equipo de soporte está disponible 24/7 para asistirte con cualquier consulta
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg">
                Contactar soporte
              </button>
              <button className="px-8 py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg border-2 border-gray-900 transition-all duration-200">
                Chat en vivo
              </button>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}