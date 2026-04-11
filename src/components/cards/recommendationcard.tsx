import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { Location, ImagePaths } from "../../types.tsx";

export const RecommendationCard: React.FC<Location> = ({ cityName, iataCode, cheapestPrice }) => {
    const navigate = useNavigate();

    // Memorizamos el precio para evitar recalcular innecesariamente
    const formattedPrice = useMemo(() => 
        cheapestPrice.amount.toLocaleString(), 
        [cheapestPrice.amount]
    );

    // Función para estandarizar el nombre y obtener la imagen
    const cityImage = useMemo(() => {
        if (!cityName) return "/path/to/default-image.jpg";

        // Caso especial para Nariño o nombres con eñes/acentos
        const standarizedName = cityName
            .toLocaleLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Quita acentos y diéresis
            .replace(/['’]/g, "")            // Quita comillas
            .replace(/ñ/g, "n");             // Asegura manejo de la ñ

        return ImagePaths.get(standarizedName) || "/path/to/default-image.jpg";
    }, [cityName]);

    const redirectToFlightSelection = () => {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        const ida = date.toISOString().split('T')[0];
        navigate(`/search-results?origen=CTG&destino=${iataCode}&ida=${ida}`);
    };

    return (
        <div 
            role="button"
            tabIndex={0}
            className="bg-white rounded-lg shadow-lg hover:cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-200 w-full max-w-sm h-auto overflow-hidden border border-lilac/20" 
            onClick={redirectToFlightSelection}
            onKeyDown={(e) => e.key === 'Enter' && redirectToFlightSelection()}
        >
            {/* Contenedor de Imagen */}
            <div className="h-40 overflow-hidden">
                <img 
                    src={cityImage} 
                    alt={`Vuelos a ${cityName}`} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
            </div>

            {/* Contenedor de Texto */}
            <div className="flex flex-col px-4 py-3 gap-1">
                <h1 className="text-2xl font-bold text-gray-800">{cityName}</h1>
                
                <div className="flex flex-col mt-2">
                    <p className="text-sm text-gray-500">Puedes encontrar viajes desde</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-lilac">COP</span>
                        <h2 className="text-2xl font-black text-gray-900">{formattedPrice}</h2>
                    </div>
                    <p className="text-[10px] text-gray-400 italic uppercase mt-1">
                        *Tasas e impuestos incluidos
                    </p>
                </div>
            </div>
        </div>
    );
};