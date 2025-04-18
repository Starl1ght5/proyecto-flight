import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.tsx";
import LoginPage from "./Pages/Login.tsx";
import SearchResutls from "./Pages/FlightSelection.tsx";
import ConfirmarPago from "./Components/ConfirmarPago.tsx";
import SeatSelection from "./Pages/SeatSelection.tsx";
import UserProfile from "./Pages/PerfilUser.tsx";
import Wallet from "./Pages/Wallet.tsx";

import CentroAyuda from "./Pages/CentroAyuda.tsx";
import CambiosYDevoluciones from "./Pages/Help/CambiosyDevolu.tsx";
import Devoluciones from "./Pages/Help/Devoluciones.tsx";
import CambioHelp from "./Pages/Help/CambiosHelp.tsx";
import RoyalFlex from "./Pages/Help/RoyalFlex.tsx";
import Covid19 from "./Pages/Help/Covid19.tsx";
import TravelFlexi from "./Pages/Help/TravelFelix.tsx";
import NeedTravel from "./Pages/Help/NeedTravel.tsx";
import Documentravel from "./Pages/Help/Documentravel.tsx";
import InformacionTravel from "./Pages/Help/InformacionTravel.tsx";
import Vacunas from "./Pages/Help/Vacunas.tsx";
import Comprobantes from "./Pages/Help/ComprobantesTravel.tsx";
import Problemas from "./Pages/Help/ProblemasViajes.tsx";
import CambiosItinerario from "./Pages/Help/CambiosItinerario.tsx";
import CancelacionesTravel from "./Pages/Help/CancelacionesTravel.tsx";
import Equipaje from "./Pages/Help/Equipaje.tsx";
import ProblemaEquipaje from "./Pages/Help/ProblemaEquipaje.tsx";
import CuentayContraseña from "./Pages/Help/CuentayContraseña.tsx";
import Contraseña from "./Pages/Help/Contraseña.tsx";
import CuentaRoyalPass from "./Pages/Help/CuentaRoyalPass.tsx";
import RoyalWallet from "./Pages/Help/RoyalWallet.tsx";
import WalletRoyalHelp from "./Pages/Help/WalletRoyalHelp.tsx";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search-results" element={<SearchResutls />} />
        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/confirmar-pago" element={<ConfirmarPago />} />
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
      </Routes>
    </Router>
  );
}