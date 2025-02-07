import Navbar from "../Components/Navbar";
import SearchComponent from "../Components/SearchComponent";

export default function Test () {

    return (
        <div>
            <Navbar />

            <div className="p-4 flex flex-row justify-center">
                <SearchComponent />
            </div>
        </div>
    )
}