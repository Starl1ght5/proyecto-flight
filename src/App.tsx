import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import SearchResutls from "./Pages/FlightSelection";
import Pasajeros from "./Components/Pasajeros";
import ConfirmarPago from "./Components/ConfirmarPago";
import Test from "./Pages/Test";
import SeatSelection from "./Pages/SeatSelection";
import CheckoutResumePage from "./Pages/CheckoutResume";
import UserProfile from "./Pages/PerfilUser";
import Wallet from "./Pages/Wallet";

import CentroAyuda from "./Pages/CentroAyuda";
import CambiosYDevoluciones from "./Pages/Help/CambiosyDevolu";
import Devoluciones from "./Pages/Help/Devoluciones";
import CambioHelp from "./Pages/Help/CambiosHelp";
import RoyalFlex from "./Pages/Help/RoyalFlex";
import Covid19 from "./Pages/Help/Covid19";
import TravelFlexi from "./Pages/Help/TravelFelix";
import NeedTravel from "./Pages/Help/NeedTravel";
import Documentravel from "./Pages/Help/Documentravel";
import InformacionTravel from "./Pages/Help/InformacionTravel";
import Vacunas from "./Pages/Help/Vacunas";
import Comprobantes from "./Pages/Help/ComprobantesTravel";
import Problemas from "./Pages/Help/ProblemasViajes";
import CambiosItinerario from "./Pages/Help/CambiosItinerario";
import CancelacionesTravel from "./Pages/Help/CancelacionesTravel";
import Equipaje from "./Pages/Help/Equipaje";
import ProblemaEquipaje from "./Pages/Help/ProblemaEquipaje";
///import ComprarEquipaje from "./Pages/Help/ComprarEquipaje";
import CuentayContraseña from "./Pages/Help/CuentayContraseña";
import Contraseña from "./Pages/Help/Contraseña";
import CuentaRoyalPass from "./Pages/Help/CuentaRoyalPass";
///import CompraDePasajes from "./pages/Help/CompraDePasajes";
import RoyalWallet from "./Pages/Help/RoyalWallet";
import WalletRoyalHelp from "./Pages/Help/WalletRoyalHelp";


export default function App() {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search-results" element={<SearchResutls />} />
        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/confirmar-pago" element={<ConfirmarPago />} />
        <Route path="/checkout-resume" element={<CheckoutResumePage />} />
        <Route path="/pasajeros" element={<Pasajeros />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/wallet" element={<Wallet />} />

        <Route path="/help-center" element={<CentroAyuda/>}/>
        <Route path="/help-center/cambiosydevoluciones"element={<CambiosYDevoluciones/>}/>
        <Route path="/help-center/devoluciones" element={<Devoluciones/>}/>
        <Route path="/help-center/cambios" element={<CambioHelp/>}/>
        <Route path="/help-center/royalflex" element={<RoyalFlex/>}/>
        <Route path="/help-center/equipaje" element={<Equipaje/>} />
        <Route path="/help-center/problemaequipaje" element={<ProblemaEquipaje/>} />
        <Route path="/help-center/covid19" element = {<Covid19 />}/>
        <Route path="/help-center/needtravel" element = {<NeedTravel/>}/>
        <Route path="/help-center/flexibilidad" element = {<TravelFlexi/>} />
        <Route path="/help-center/documentosparaviajar" element={<Documentravel/>} />
        <Route path="/help-center/documenttravel" element= {<InformacionTravel/>}/>
        <Route path="/help-center/vacunas" element = {<Vacunas/>} />
        <Route path="/help-center/comprobantes" element = {<Comprobantes/>}/>
        <Route path="/help-center/problemasviajes" element = {<Problemas/>}/>
        <Route path="/help-center/cambiositinerario" element = {<CambiosItinerario/>}/>
        <Route path="/help-center/cancelacionestravel" element = {<CancelacionesTravel/>}/>
        <Route path="/help-center/recuperacioncuenta" element={<CuentayContraseña/>}/>
        <Route path="/help-center/contraseña" element = {<Contraseña/>}/>
        <Route path="/help-center/cuentaroyalpass" element = {<CuentaRoyalPass/>}/>
        <Route path="/help-center/RoyalWallet" element = {<RoyalWallet/>} />
        <Route path="/help-center/wallethelp" element = {<WalletRoyalHelp/>} />

        <Route path="/test" element={<Test />} />
      </Routes>
      <Footer/>
    </Router>
  );
}