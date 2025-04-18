import { useNavigate } from "react-router-dom";
import { LocationInfo, ImagePaths } from "../../types.tsx";

export const RecommendationCard: React.FC<LocationInfo> = ({ location }) => {

    const formattedPrice = (location.cheapestPrice.amount).toLocaleString();

    const navigate = useNavigate()

    const redirectToFlightSelection = () => {
        navigate(`/search-results?origen=CTG&destino=${location.iataCode}&ida=2025-04-08`);
    }
    
    const getImage = (name: string) => {
        let standarizedName: string = name.toLocaleLowerCase();
        standarizedName = standarizedName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        standarizedName = standarizedName.replace(/['’]/g, "");

        return ImagePaths.get(standarizedName);
    }

    return (
        <div className="bg-white rounded-lg shadow-lg hover:cursor-pointer hover:scale-105 hover:shadow-xl duration-200 w-base h-xs" onClick={redirectToFlightSelection}>
            
            {/*Image div*/}
            <div className="rounded-t-lg" >
                <img src={getImage(location.cityName)} alt={location.cityName} className="w-full h-50 object-cover rounded-t-lg" />
            </div>

            {/*Text div*/}
            <div className="flex flex-col px-3 py-3 mb-2 gap-1 border-b-1 border-x-1 rounded-b-lg border-lilac">
                <div className="flex flex-row" >
                    <h1 className="text-2xl font-semibold">{location.cityName}</h1>
                </div>
                
                <div className="flex flex-col" >
                    <p className="text-sm font-light" >Puedes encontrar viajes desde</p>
                    <h2 className="text-xl" >COP {formattedPrice}</h2>
                    <p className="text-xs italic" >Con tasas e impuestos incluidos*</p>
                </div>
            </div>
        </div>
    )
}