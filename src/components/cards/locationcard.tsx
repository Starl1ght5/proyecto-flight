import { useNavigate } from "react-router-dom";
import { Location, ImagePaths } from "../../types.tsx";

export const LocationCard: React.FC<Location> = ({ cityName, iataCode, cheapestPrice }) => {

    const formattedPrice = (cheapestPrice.amount).toLocaleString();

    const navigate = useNavigate()

    const redirectToFlightSelection = () => {
        navigate(`/search-results?origen=CTG&destino=${iataCode}&ida=2025-04-09`);
    }
    
    /// Search a image in the ImagePaths list (defined in Types.tsx)
    /// Busca una imagen en la lista de ImagePaths (definida en Types.tsx) 
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

    return (
        <div className="bg-white rounded-lg shadow-lg hover:cursor-pointer hover:scale-105 hover:shadow-xl duration-200 lg:w-96 h-80" onClick={redirectToFlightSelection} >
            
            {/*Image div*/}
            <div className="rounded-t-lg" >
                <img src={getImage(cityName)} alt={cityName} className="w-full h-48 object-cover rounded-t-lg" />
            </div>

            {/*Text div*/}
            <div className="flex flex-col px-3 py-3 gap-2">
                <div className="flex flex-row" >
                    <h1 className="text-2xl font-semibold">{cityName}</h1>
                </div>
                
                <div className="flex flex-col" >
                    <p className="text-sm font-light" >Viajes desde</p>
                    <h2 className="text-xl" >COP {formattedPrice}</h2>
                    <p className="text-xs italic" >Tasas e impuestos incluidos*</p>
                </div>
            </div>
        </div>
    )
}