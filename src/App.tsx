import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
//import LoginPage from "./pages/Login";
//import Profile from "./components/PerfilUser";
//import ViajePopular from "./pages/ViajePopular";
//import OfertasDestacadas from "./pages/OfertasDestacadas";
//import Alojamientos from "./pages/Alojamientos";
//import FlightSelection from "./components/FlightSelection";
//import ReturnFlightSelection from "./components/ReturnFlightSelection";
//import SeatSelectionIda from "./components/SeatSelectionIda";
//import SelectSeatsVuelta from "./components/SeatSelectionVuelta";
//import Pasajeros from "./components/Pasajeros";
//import ConfirmarPago from "./components/ConfirmarPago";
//import BoardingPass from "./components/BoardingPass";
import Test from "./pages/Test";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/*<Route path="/login" element={<LoginPage />} />
        <Route path="/search-results" element={<FlightSelection />} />
        <Route path="/return-selection" element={<ReturnFlightSelection />} />
        <Route path="/seat-selection" element={<SeatSelectionIda />} />
        <Route path="/vuelta" element={<SelectSeatsVuelta />} />
        <Route path="/pasajeros" element={<Pasajeros />} />
        <Route path="/confirmar-pago" element={<ConfirmarPago />} />
        <Route path="/boarding-pass" element={<BoardingPass />} />


          
        <Route path="/profile" element={<Profile />} />
        <Route path="/viaje-popular" element={<ViajePopular />} />
        <Route path="/ofertas-destacadas" element={<OfertasDestacadas />} />
        <Route path="/alojamientos" element={<Alojamientos />} />*/}

        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}
