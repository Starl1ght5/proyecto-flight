import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Location, ImagePaths } from "../../types.tsx";

export const LocationCard: React.FC<Location> = ({ 
  cityName, 
  iataCode, 
  cheapestPrice, 
  countryName,
  activities
}) => {
    const formattedPrice = (cheapestPrice.amount).toLocaleString();
    const navigate = useNavigate();

    const redirectToFlightSelection = () => {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        const ida = date.toISOString().split('T')[0];
        navigate(`/search-results?origen=CTG&destino=${iataCode}&ida=${ida}`);
    };
    
    // Search a image in the ImagePaths list (defined in Types.tsx)
    const getImage = (name: string) => {
        if (name === "Nariño") {
            name = "narino";
            return ImagePaths.get(name);
        } else {
            let standarizedName: string = name.toLocaleLowerCase();
            standarizedName = standarizedName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            standarizedName = standarizedName.replace(/['']/g, "");
            return ImagePaths.get(standarizedName);
        }
    };

    // Generar rating aleatorio para demo (puedes reemplazar con data real del API)
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1);

    return (
        <motion.div
            className="group bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 hover:shadow-2xl hover:border-blue-400 transition-all duration-300 cursor-pointer h-full flex flex-col"
            onClick={redirectToFlightSelection}
            whileHover={{ y: -8 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
                <motion.img
                    src={getImage(cityName)}
                    alt={cityName}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                />
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-bold text-gray-900">{rating}</span>
                </div>

                {/* Gradient Overlay en hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col">
                {/* City & Country */}
                <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {cityName}
                </h3>
                <p className="text-gray-600 mb-4 font-semibold">{countryName || "Colombia"}</p>
                
                {/* Description */}
                {/*{description && (
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2 flex-1">
                        {description}
                    </p>
                )}*/}

                {/* Activities Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                      {activities.slice(0, 3).map((activity, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                          {activity}
                        </span>
                      ))}
                    </div>

                {/* Price Section */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100 mt-auto">
                    <div>
                        <p className="text-xs text-gray-500 font-semibold">Viajes desde</p>
                        <p className="text-2xl font-bold text-gray-900">
                            COP {formattedPrice}$
                        </p>
                        <p className="text-xs text-gray-500 italic">Tasas incluidas*</p>
                    </div>
                    
                    <motion.button
                        className="px-6 py-2 bg-gray-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-md flex items-center gap-2 group-hover:shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            redirectToFlightSelection();
                        }}
                    >
                        Ver más
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};