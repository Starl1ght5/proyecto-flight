import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Location, ImagePaths } from "../../types.tsx";

export const LocationCard: React.FC<Location> = ({
    locationID,
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

    const rating = (Math.random() * 1.5 + 3.5).toFixed(1);

    return (
        <motion.div
                key={locationID}
                layout
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="group"
              >
                <div
                  onClick={() => redirectToFlightSelection(iataCode)}
                  className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/30 cursor-pointer hover:-translate-y-2 transition-all duration-500"
                >
                  {/* IMAGE */}
                  <div className="relative h-72 overflow-hidden">
                    <motion.img
                      src={getImage(cityName)}
                      alt={cityName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
  
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-black/20 to-transparent" />
  
                    {/* Rating */}
                    <div className="absolute top-5 right-5 bg-black/40 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
  
                      <span className="font-bold text-white text-sm">
                        {rating}
                      </span>
                    </div>
  
                    {/* City */}
                    <div className="absolute bottom-5 left-5">
                      <h3 className="text-3xl font-black text-white">
                        {cityName}
                      </h3>
  
                      <p className="text-gray-300 font-medium">
                        {countryName}
                      </p>
                    </div>
                  </div>
  
                  {/* CONTENT */}
                  <div className="p-6">
  
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {activities.slice(0, 3).map((activity, i) => (
                        <span
                          key={i}
                          className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
  
                    {/* Bottom */}
                    <div className="flex items-center justify-between border-t border-white/10 pt-5">
  
                      <div>
                        <p className="text-gray-400 text-sm">
                          Desde
                        </p>
  
                        <h4 className="text-3xl font-black text-white">
                          ${formattedPrice}
                        </h4>
  
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                          COP
                        </span>
                      </div>
  
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          redirectToFlightSelection(iataCode);
                        }}
                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/30 transition-all"
                      >
                        Explorar
                      </motion.button>
  
                    </div>
                  </div>
                </div>
              </motion.div>
    );
};