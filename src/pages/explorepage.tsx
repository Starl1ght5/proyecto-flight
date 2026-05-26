import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { Helmet } from 'react-helmet';
import Navbar from '../components/navbarcomponent';
import Footer from '../components/footercomponent';
import { ImagePaths, Location } from '../types';
import { LocationCard } from '../components/cards/locationcard';


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

  const redirectToFlightSelection = (iataCode) => {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        const ida = date.toISOString().split('T')[0];
        navigate(`/search-results?origen=CTG&destino=${iataCode}&ida=${ida}`);
    };

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
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">
      <Helmet>
        <title>Explorar Destinos - Royal Airlines</title>
      </Helmet>
  
      <Navbar />
  
      {/* HERO PREMIUM */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden border-b border-white/10"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.35),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.25),transparent_30%)]" />
  
        <div className="absolute inset-0 bg-gradient-to-br from-[#050816] via-[#0B1220] to-[#050816]" />
  
        {/* Blur circles */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
  
        <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-sm text-blue-200 font-medium mb-8">
              ✈️ Royal Airlines Experience
            </span>
  
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8 tracking-tight">
              Explora el
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                {" "}Mundo
              </span>
            </h1>
  
            <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Descubre destinos extraordinarios, experiencias inolvidables y vuelos diseñados para viajeros modernos.
            </p>
          </motion.div>
        </div>
      </motion.div>
  
      <div className="max-w-7xl mx-auto px-4 py-14">
  
        {/* FILTERS */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-7 shadow-2xl shadow-black/30">
  
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
  
              {/* Filters */}
              <div>
                <h3 className="text-lg font-bold text-white mb-5">
                  Filtrar destinos
                </h3>
  
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
  
              {/* Sort */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-semibold text-gray-300">
                  Ordenar:
                </label>
  
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="bg-white/5 border border-white/10 text-white px-5 py-3 rounded-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-xl"
                >
                  <option className="text-black" value="rating">Mejor valorados</option>
                  <option className="text-black" value="price-low">Precio: Menor a Mayor</option>
                  <option className="text-black" value="price-high">Precio: Mayor a Menor</option>
                </select>
              </div>
  
            </div>
          </div>
        </motion.div>
  
        {/* COUNTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-10 flex items-center justify-between"
        >
          <div>
            <h2 className="text-3xl font-black text-white">
              Destinos disponibles
            </h2>
  
            <p className="text-gray-400 mt-2">
              Mostrando{" "}
              <span className="text-cyan-400 font-bold">
                {filteredDestinations.length}
              </span>{" "}
              destinos premium
            </p>
          </div>
        </motion.div>
  
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDestinations.map((destination) => (
              <LocationCard
                {...destination}
                locationID={destination.locationID.toString()}
                countryName={destination.countryName || ""}
                airportName={destination.airportName || ""}
                activities={destination.activities}
                featured={destination.featured}
              />
            ))}
          </AnimatePresence>
        </div>
  
      </div>
  
      <Footer />
    </div>
  )
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