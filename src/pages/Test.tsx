import LoginComponent from "../Components/LoginComponent";
import Navbar from "../Components/Navbar";

export default function Test () {

    return (
        <div>
            <Navbar />
            
            <div className="flex flex-row justify-center p-10">
                <LoginComponent />
            </div>
            
        </div>
    )
}