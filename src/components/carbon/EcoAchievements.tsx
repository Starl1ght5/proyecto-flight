export default function EcoMessage() {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 md:p-12 shadow-lg text-white">
      
      <div className="flex flex-col md:flex-row items-center gap-6">
        
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-3xl font-bold mb-3">
            Juntos por un planeta mejor
          </h3>
          <p className="text-lg text-green-50 mb-6 max-w-2xl">
            En ROYAL Airlines estamos comprometidos con el medio ambiente. 
            El 100% de las compensaciones se destinan a proyectos certificados 
            de reforestación en Colombia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="px-8 py-4 bg-white text-green-700 font-bold rounded-lg hover:bg-green-50 transition-all shadow-lg flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ver proyectos
            </button>
            
            <button className="px-8 py-4 bg-green-800 hover:bg-green-900 text-white font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Compensar ahora
            </button>
          </div>
        </div>

        {/* Stats Badge */}
        <div className="flex-shrink-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
            <p className="text-sm text-green-100 mb-2">Árboles plantados</p>
            <p className="text-5xl font-bold mb-1">12,450</p>
            <p className="text-xs text-green-200">por ROYAL Airlines en 2024</p>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="mt-8 pt-6 border-t border-white/20 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-3xl font-bold mb-1">2,890</p>
          <p className="text-sm text-green-100">Toneladas CO₂ compensadas</p>
        </div>
        <div>
          <p className="text-3xl font-bold mb-1">15</p>
          <p className="text-sm text-green-100">Proyectos activos</p>
        </div>
        <div>
          <p className="text-3xl font-bold mb-1">78%</p>
          <p className="text-sm text-green-100">Pasajeros participan</p>
        </div>
      </div>
    </div>
  );
}