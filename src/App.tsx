import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import Profile from "./components/PerfilUser";
//import ViajePopular from "./pages/ViajePopular";
//import OfertasDestacadas from "./pages/OfertasDestacadas";
import SearchResutls from "./Pages/FlightSelection";
//import ReturnFlightSelection from "./components/ReturnFlightSelection";
//import SeatSelectionIda from "./components/SeatSelectionIda";
//import SelectSeatsVuelta from "./components/SeatSelectionVuelta";
import Pasajeros from "./components/Pasajeros";
import ConfirmarPago from "./Components/ConfirmarPago";
import BoardingPass from "./components/BoardingPass";
import Test from "./Pages/Test";
import SeatSelection from "./Pages/SeatSelection";
import Footer from "./Components/FooterComponent";
import Wallet from "./components/Wallet";

// CENTRO AYUDA
import CentroAyuda from "./pages/Centroayuda";
import CambiosYDevoluciones from "./pages/CambiosyDevolu";
import Devoluciones from "./pages/Devoluciones";
import CambioHelp from "./pages/CambiosHelp";
import RoyalFlex from "./pages/RoyalFlex";
import Covid19 from "./pages/Covid19";
import TravelFlexi from "./pages/TravelFelix";
import NeedTravel from "./pages/NeedTravel";
import Documentravel from "./pages/Documentravel";
import InformacionTravel from "./pages/InformacionTravel";
import Vacunas from "./pages/Vacunas";
import Comprobantes from "./pages/ComprobantesTravel";
import Problemas from "./pages/ProblemasViajes";
import CambiosItinerario from "./pages/CambiosItinerario";
import CancelacionesTravel from "./pages/CancelacionesTravel";
import Equipaje from "./pages/Equipaje";
import ProblemaEquipaje from "./pages/ProblemaEquipaje";
import ComprarEquipaje from "./pages/ComprarEquipaje";

import CuentayContraseña from "./pages/CuentayContraseña";
import Contraseña from "./pages/Contraseña";
import CuentaRoyalPass from "./pages/CuentaRoyalPass";

import CompraDePasajes from "./pages/CompraDePasajes";
import ComprasPasajes2 from "./pages/ComprasPasajes";

import RoyalWallet from "./pages/RoyalWallet";
import WalletRoyalHelp from "./pages/WalletRoyalHelp";


export default function App() {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search-results" element={<SearchResutls />} />
        <Route path="/seat-selection" element={<SeatSelection />} />
        
        {/* <Route path="/vuelta" element={<SelectSeatsVuelta />} /> */}
        {/* <Route path="/pasajeros" element={<Pasajeros />} /> */}
        <Route path="/confirmar-pago" element={<ConfirmarPago />} />
        <Route path="/boarding-pass" element={<BoardingPass />} />
        
        <Route path="/profile" element={<Profile />} />
        <Route path="/micartera" element={<Wallet/>}/>
      


        {/* CENTRO DE AYUDA */}
        <Route path="/centro-ayuda" element={<CentroAyuda/>}/>
        <Route path="/cambiosydevoluciones"element={<CambiosYDevoluciones/>}/>
        <Route path="/devoluciones" element={<Devoluciones/>}/>
        <Route path="/cambios" element={<CambioHelp/>}/>
        <Route path="/royalflex" element={<RoyalFlex/>}/>

        <Route path="/equipaje" element={<Equipaje/>} />
        <Route path="/problemaequipaje" element={<ProblemaEquipaje/>} />
        <Route path="/compraequipaje" element={<ComprarEquipaje/>} />

        <Route path="/covid19" element = {<Covid19 />}/>
        <Route path="/needtravel" element = {<NeedTravel/>}/>
        <Route path="/flexibilidad" element = {<TravelFlexi/>} />


        <Route path="/documentosparaviajar" element={<Documentravel/>} />
        <Route path="/documenttravel" element= {<InformacionTravel/>}/>
        <Route path="/vacunas" element = {<Vacunas/>} />
        <Route path="/comprobantes" element = {<Comprobantes/>}/>


        <Route path="/problemasviajes" element = {<Problemas/>}/>
          <Route path="/cambiositinerario" element = {<CambiosItinerario/>}/>
          <Route path="/cancelacionestravel" element = {<CancelacionesTravel/>}/>

          <Route path="/recuperacioncuenta" element={<CuentayContraseña/>}/>
          <Route path="/contraseña" element = {<Contraseña/>}/>
          <Route path="/cuentaroyalpass" element = {<CuentaRoyalPass/>}/>



        <Route path="/comprapasajes" element = {<CompraDePasajes/>}/>
        <Route path="/compraspasajes" element = {<ComprasPasajes2/>}/>

        <Route path="/RoyalWallet" element = {<RoyalWallet/>} />
        <Route path="/wallethelp" element = {<WalletRoyalHelp/>} />




        <Route path="/pasajeros" element={<Pasajeros/>} />
        <Route path="/test" element={<Test />} />
      </Routes>
      <Footer/>
    </Router>
  );
}