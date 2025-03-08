import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import SearchComponent from "../Components/SearchComponent";
import { LocationInfo } from "../Types";
import { LocationCard } from "../Components/Cards/LocationCard";
import { SeatCard } from "../Components/Cards/SeatCard";

export default function Test () {

    const [ locations, setLocations ] = useState<LocationInfo[]>([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/locations/search?number=6");
                const res = await response.json();
                setLocations(res);

            } catch (e) {
                console.log(e);
            }
        }

        fetchLocations();
    }, [])

    return (
        <div>
            <Navbar />

            <div className="p-4 gap-3 flex flex-col justify-center items-center">
                <SearchComponent />

                <div className="grid grid-cols-3 gap-3">
                    {locations?.map((element) => {
                        
                        return (
                            <LocationCard location={element} />
                        )
                    })}
                </div>

                <SeatCard />
                <SeatCard />
                <SeatCard />

            </div>
        </div>
    )
}