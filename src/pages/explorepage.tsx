import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { Helmet } from 'react-helmet';
import Navbar from '../components/navbarcomponent';
import Footer from '../components/footercomponent';
import { ImagePaths, Location } from '../types';



// FIX TIMEZONE: usa hora LOCAL, no UTC
// toISOString() convierte a UTC — en Colombia (UTC-5) puede devolver el día anterior
const getTodayLocal = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function ExplorePage() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'beach' | 'culture' | 'adventure' | 'food'>('all');
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'rating'>('rating');
  const [ locations, setLocations ] = useState<Location[]>([]);
  const [ filteredDestinations, setFilteredDestinations ] = useState<Location[]>([]);
  const [ selectedDestination, setSelectedDestination ] = useState<Location | null>(null);

  // Estado del formulario dentro del modal
  const [origenInput, setOrigenInput] = useState('');
  const [fechaInput, setFechaInput] = useState('');
  const [formError, setFormError] = useState('');

  const getImage = (name: string) => {
    if (name === "Nariño") {
      name = "narino";
      return ImagePaths.get(name);
            
    } else {
      let standarizedName: string = name.toLocaleLowerCase();
      standarizedName = standarizedName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      standarizedName = standarizedName.replace(/['’]/g, "");
      return ImagePaths.get(standarizedName);
    }
  
  }

  // Resetear formulario cada vez que se abre un destino diferente
  useEffect(() => {
    setOrigenInput('');
    setFechaInput('');
    setFormError('');
  }, [selectedDestination]);

  useEffect(() => {
        const fetchRequestedFlights = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}locations/?size=9&featured=false`, {
                    method: 'GET'
                });

                const res = await response.json();
                setLocations(res.content);
                setFilteredDestinations(res.content);

            } catch (error) {
                console.log(error);
                toast.error("Error del servidor" , {
                    className: "bg-red-500 text-white rounded-lg shadow-lg"
                });
            }
            
        }

        fetchRequestedFlights();

    }, [])
  

  useEffect(() => {
    let filtered = [...locations];

    if (selectedFilter !== 'all') {
      const filterMap: Record<string, string[]> = {
        beach: ['Playa', 'Buceo', 'Snorkel', 'Deportes Acuáticos'],
        culture: ['Cultura', 'Historia', 'Museos', 'Arqueología'],
        adventure: ['Naturaleza', 'Senderismo', 'Deportes'],
        food: ['Gastronomía']
      };
      filtered = filtered.filter(dest =>
        dest.activities.some(activity => filterMap[selectedFilter]?.includes(activity))
      );
    }

    if (sortBy === 'price-low') filtered.sort((a, b) => parseInt(a.cheapestPrice.amount) - parseInt(b.cheapestPrice.amount));
    else if (sortBy === 'price-high') filtered.sort((a, b) => parseInt(b.cheapestPrice.amount)- parseInt(a.cheapestPrice.amount));
    else filtered.sort((a, b) => b.rating - a.rating);

    setFilteredDestinations(filtered);
  }, [selectedFilter, sortBy]);

  // NAVIGATE REAL: valida campos, usa cityName para el backend (no iataCode)
  const handleSearchFlights = () => {
    if (!origenInput.trim()) {
      setFormError('Por favor ingresa tu ciudad de origen.');
      return;
    }
    if (!fechaInput) {
      setFormError('Por favor selecciona la fecha de ida.');
      return;
    }
    setFormError('');
    navigate(
      `/search-results?origen=${encodeURIComponent(origenInput.trim())}&destino=${encodeURIComponent(selectedDestination!.cityName)}&ida=${fechaInput}`
    );
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Helmet>
        <title>Explorar Destinos - Royal Airlines</title>
      </Helmet>

      <Navbar />

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-20 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Explora el Mundo
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
          >
            Descubre destinos increíbles y encuentra tu próxima aventura
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Filters & Sort */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Filtrar por:</h3>
              <div className="flex flex-wrap gap-3">
                <FilterButton active={selectedFilter === 'all'} onClick={() => setSelectedFilter('all')}
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}>
                  Todos
                </FilterButton>
                <FilterButton active={selectedFilter === 'beach'} onClick={() => setSelectedFilter('beach')}
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>}>
                  Playa
                </FilterButton>
                <FilterButton active={selectedFilter === 'culture'} onClick={() => setSelectedFilter('culture')}
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}>
                  Cultura
                </FilterButton>
                <FilterButton active={selectedFilter === 'adventure'} onClick={() => setSelectedFilter('adventure')}
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>}>
                  Aventura
                </FilterButton>
                <FilterButton active={selectedFilter === 'food'} onClick={() => setSelectedFilter('food')}
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}>
                  Gastronomía
                </FilterButton>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t-2 border-gray-100">
              <label className="text-sm font-bold text-gray-700">Ordenar por:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl font-semibold focus:border-blue-500 focus:outline-none transition-all"
              >
                <option value="rating">Mejor valorados</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Counter */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mb-6 text-gray-600 font-semibold">
          Mostrando <span className="text-blue-600">{filteredDestinations.length}</span> destinos
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.locationID}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 hover:shadow-2xl hover:border-blue-400 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedDestination(destination)}
                >
                  <div className="relative h-56 overflow-hidden">
                    <motion.img
                      src={getImage(destination.cityName)}
                      alt={destination.cityName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-bold text-gray-900">{destination.rating}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{destination.cityName}</h3>
                    <p className="text-gray-600 mb-4">{destination.countryName}</p>
                    {/*<p className="text-gray-700 text-sm mb-4 line-clamp-2">{destination.description}</p>*/}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {destination.activities.slice(0, 3).map((activity, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                          {activity}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500">Desde</p>
                        <p className="text-2xl font-bold text-gray-900">COP {(destination.cheapestPrice.amount).toLocaleString()}$</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => { e.stopPropagation(); setSelectedDestination(destination); }}
                        className="px-6 py-2 bg-gray-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-md"
                      >
                        Ver más
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredDestinations.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No encontramos destinos</h3>
            <p className="text-gray-600 mb-6">Prueba con otros filtros</p>
            <motion.button
              onClick={() => setSelectedFilter('all')}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver todos los destinos
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* ========== MODAL DE DETALLE ========== */}
      <AnimatePresence>
        {selectedDestination && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedDestination(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Imagen */}
              <div className="relative h-80">
                <img
                  src={getImage(selectedDestination.cityName)}
                  alt={selectedDestination.cityName}
                  className="w-full h-full object-cover rounded-t-3xl"
                />
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">{selectedDestination.cityName}</h2>
                <p className="text-xl text-gray-600 mb-6">{selectedDestination.countryName}</p>
                {/*<p className="text-gray-700 text-lg mb-6">{selectedDestination.description}</p>*/}

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Mejor época
                    </h4>
                    <p className="text-gray-700">{selectedDestination.bestDate}</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                      Clima
                    </h4>
                    <p className="text-gray-700">{selectedDestination.climate}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-bold text-gray-900 mb-3">Actividades</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDestination.activities.map((activity, i) => (
                      <span key={i} className="px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-xl">{activity}</span>
                    ))}
                  </div>
                </div>

                {/*FORMULARIO DE BÚSQUEDA — igual flujo que home.tsx */}
                <div className="border-t-2 border-gray-200 pt-6">
                  <div className="flex items-center gap-2 mb-5">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <h4 className="font-bold text-gray-900 text-lg">
                      Buscar vuelos a {selectedDestination.cityName}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    {/* Ciudad de origen */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-600 ml-1">Ciudad de origen</label>
                      <input
                        type="text"
                        placeholder="Ej: Bogota, Medellin, Cali..."
                        value={origenInput}
                        onChange={(e) => { setOrigenInput(e.target.value); setFormError(''); }}
                        className="p-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-semibold text-sm hover:border-gray-300"
                      />
                    </div>

                    {/* Fecha de ida */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-600 ml-1">Fecha de ida</label>
                      <input
                        type="date"
                        value={fechaInput}
                        min={getTodayLocal()}
                        onChange={(e) => { setFechaInput(e.target.value); setFormError(''); }}
                        className="p-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-semibold text-sm"
                      />
                    </div>
                  </div>

                  {/* Precio referencia */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">Vuelos desde</p>
                    <p className="text-3xl font-bold text-gray-900">
                      ${selectedDestination.cheapestPrice.amount}
                      <span className="text-base font-normal text-gray-500">COP</span>
                    </p>
                  </div>

                  {/* Mensaje de error */}
                  {formError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm font-semibold mb-3"
                    >
                      ⚠ {formError}
                    </motion.p>
                  )}

                  {/* Botón buscar */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSearchFlights}
                    className="w-full py-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-xl font-bold hover:from-blue-600 hover:to-blue-800 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Buscar vuelos disponibles
                  </motion.button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

const FilterButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ active, onClick, icon, children }) => (
  <motion.button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all shadow-sm ${
      active ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
    {children}
  </motion.button>
);