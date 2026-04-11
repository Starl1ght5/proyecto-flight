import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Core Pages
import Home from "./pages/home";
import LoginPage from "./pages/login";
import SearchResults from "./pages/flightselection";
import SeatSelection from "./pages/seatselection";
import ConfirmarPago from "./pages/confirmpayment";
import UserProfile from "./pages/userprofile";
import BoardingPass from "./pages/ticketsmenu";
import OauthRedirect from "./pages/oauthredirect";

// Feature Pages
import CarbonTracker from "./pages/carbontracker";
import TravelOptimizer from "./pages/TravelOptimizer";
import ExplorePage from "./pages/explorepage"; 

// Help Center Pages
import CentroAyuda from "./pages/helpcenter";
import CambiosYDevoluciones from "./pages/help/cambiosydevolu";
import Devoluciones from "./pages/help/devoluciones";
import CambioHelp from "./pages/help/cambioshelp";
import RoyalFlex from "./pages/help/royalflex";
import Equipaje from "./pages/help/equipaje";
import ProblemaEquipaje from "./pages/help/problemaequipaje";
import Covid19 from "./pages/help/covid19";
import NeedTravel from "./pages/help/needtravel";
import TravelFlexi from "./pages/help/travelfenix";
import Documentravel from "./pages/help/documentravel";
import InformacionTravel from "./pages/help/informaciontravel";
import Vacunas from "./pages/help/vacunas";
import Comprobantes from "./pages/help/comprobantestravel";
import Problemas from "./pages/help/problemasviajes";
import CambiosItinerario from "./pages/help/cambiositinerarios";
import CancelacionesTravel from "./pages/help/cancelacionestravel";
import CuentayContraseña from "./pages/help/cuentaycontraseña";
import Contraseña from "./pages/help/contraseña";
import CuentaRoyalPass from "./pages/help/cuentaroyalpass";
import RoyalWallet from "./pages/help/royalwallet";
import WalletRoyalHelp from "./pages/help/walletroyalhelp";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ============================================
            CORE ROUTES - Flujo principal de la app
        ============================================ */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/payment-confirm" element={<ConfirmarPago />} />
        <Route path="/oauth-success" element={<OauthRedirect />} />

        {/* ============================================
            USER PAGES - Perfil y gestión personal
        ============================================ */}
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/my-tickets" element={<BoardingPass />} />

        {/* ============================================
            FEATURE PAGES - Funcionalidades especiales
        ============================================ */}
        <Route path="/explore" element={<ExplorePage />} /> {/* 🆕 NUEVA */}
        <Route path="/carbon-tracker" element={<CarbonTracker />} />
        <Route path="/travel-optimizer" element={<TravelOptimizer />} />

        {/* ============================================
            HELP CENTER - Centro de ayuda
        ============================================ */}
        <Route path="/help-center" element={<CentroAyuda />} />
        
        {/* Cambios y Devoluciones */}
        <Route path="/help-center/cambiosydevoluciones" element={<CambiosYDevoluciones />} />
        <Route path="/help-center/devoluciones" element={<Devoluciones />} />
        <Route path="/help-center/cambios" element={<CambioHelp />} />
        <Route path="/help-center/royalflex" element={<RoyalFlex />} />
        
        {/* Equipaje */}
        <Route path="/help-center/equipaje" element={<Equipaje />} />
        <Route path="/help-center/problemaequipaje" element={<ProblemaEquipaje />} />
        
        {/* Información de Viaje */}
        <Route path="/help-center/covid19" element={<Covid19 />} />
        <Route path="/help-center/needtravel" element={<NeedTravel />} />
        <Route path="/help-center/flexibilidad" element={<TravelFlexi />} />
        <Route path="/help-center/documentosparaviajar" element={<Documentravel />} />
        <Route path="/help-center/documenttravel" element={<InformacionTravel />} />
        <Route path="/help-center/vacunas" element={<Vacunas />} />
        <Route path="/help-center/comprobantes" element={<Comprobantes />} />
        
        {/* Problemas y Cambios */}
        <Route path="/help-center/problemasviajes" element={<Problemas />} />
        <Route path="/help-center/cambiositinerario" element={<CambiosItinerario />} />
        <Route path="/help-center/cancelacionestravel" element={<CancelacionesTravel />} />
        
        {/* Cuenta y Servicios */}
        <Route path="/help-center/recuperacioncuenta" element={<CuentayContraseña />} />
        <Route path="/help-center/contraseña" element={<Contraseña />} />
        <Route path="/help-center/cuentaroyalpass" element={<CuentaRoyalPass />} />
        <Route path="/help-center/royalwallet" element={<RoyalWallet />} />
        <Route path="/help-center/wallethelp" element={<WalletRoyalHelp />} />
      </Routes>
    </Router>
  );
}