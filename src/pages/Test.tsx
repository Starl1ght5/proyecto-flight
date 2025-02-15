import Navbar from "../Components/Navbar";
import SearchComponent from "../Components/SearchComponent";

export default function Test () {

    return (
        <div>
            <Navbar />

            <div className="p-4 gap-3 flex flex-col justify-center items-center">
                <SearchComponent />

            </div>
        </div>
    )
}