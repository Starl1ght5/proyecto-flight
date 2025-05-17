import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home.tsx";
import LoginPage from "./pages/login.tsx";
import SearchResutls from "./pages/flightselection.tsx";
import ConfirmarPago from "./components/confirmpayment.tsx";
import SeatSelection from "./pages/seatselection.tsx";
import UserProfile from "./pages/userprofile.tsx";
import Wallet from "./pages/wallet.tsx";

import CentroAyuda from "./pages/helpcenter.tsx";
import CambiosYDevoluciones from "./pages/help/cambiosydevolu.tsx";
import Devoluciones from "./pages/help/devoluciones.tsx";
import CambioHelp from "./pages/help/cambioshelp.tsx";
import RoyalFlex from "./pages/help/royalflex.tsx";
import Covid19 from "./pages/help/covid19.tsx";
import TravelFlexi from "./pages/help/travelfenix.tsx";
import NeedTravel from "./pages/help/needtravel.tsx";
import Documentravel from "./pages/help/documentravel.tsx";
import InformacionTravel from "./pages/help/informaciontravel.tsx";
import Vacunas from "./pages/help/vacunas.tsx";
import Comprobantes from "./pages/help/comprobantestravel.tsx";
import Problemas from "./pages/help/problemasviajes.tsx";
import CambiosItinerario from "./pages/help/cambiositinerarios.tsx";
import CancelacionesTravel from "./pages/help/cancelacionestravel.tsx";
import Equipaje from "./pages/help/equipaje.tsx";
import ProblemaEquipaje from "./pages/help/problemaequipaje.tsx";
import CuentayContraseña from "./pages/help/cuentaycontraseña.tsx";
import Contraseña from "./pages/help/contraseña.tsx";
import CuentaRoyalPass from "./pages/help/cuentaroyalpass.tsx";
import RoyalWallet from "./pages/help/royalwallet.tsx";
import WalletRoyalHelp from "./pages/help/walletroyalhelp.tsx";
import OauthRedirect from "./pages/oauthredirect.tsx";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search-results" element={<SearchResutls />} />
        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/payment-confirm" element={<ConfirmarPago />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/oauth-success" element={<OauthRedirect />} />

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