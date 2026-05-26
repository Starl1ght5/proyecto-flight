import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbarcomponent";
import Footer from "../components/footercomponent";

const ConfirmarPago = () => {
  const navigate = useNavigate();

  const goToBoarding = () => {
    navigate("/my-tickets");
  }

  return (
    <div style={{ background: '#0f1117', minHeight: '100vh' }}>
      <Navbar />

      <style>{`
        .cp-page {
          max-width: 720px;
          margin: 0 auto;
          padding: 48px 16px 64px;
        }

        /* icono check */
        .cp-icon-wrap {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(34,197,94,0.12);
          border: 1.5px solid rgba(34,197,94,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }

        /* header */
        .cp-title {
          text-align: center;
          margin-bottom: 40px;
        }
        .cp-title h1 {
          font-size: 28px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          margin-bottom: 6px;
        }
        .cp-title p {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
        }

        /* card */
        .cp-card {
          background: rgba(255,255,255,0.03);
          border: 0.5px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 16px;
        }

        /* card header */
        .cp-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 0.5px solid rgba(255,255,255,0.06);
        }
        .cp-card-header h2 {
          font-size: 15px;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
        }
        .cp-paid-badge {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          background: rgba(34,197,94,0.15);
          border: 0.5px solid rgba(34,197,94,0.3);
          color: #4ade80;
          padding: 3px 10px;
          border-radius: 99px;
        }

        /* líneas del resumen */
        .cp-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 0.5px solid rgba(255,255,255,0.04);
        }
        .cp-row:last-child { border-bottom: none; }
        .cp-row-label { font-size: 13px; color: rgba(255,255,255,0.45); }
        .cp-row-value { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.75); }

        /* total */
        .cp-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 0.5px solid rgba(255,255,255,0.08);
        }
        .cp-total-label { font-size: 13px; color: rgba(255,255,255,0.45); }
        .cp-total-value { font-size: 22px; font-weight: 600; color: rgba(255,255,255,0.9); }

        /* info banner */
        .cp-info {
          background: rgba(29,78,216,0.08);
          border: 0.5px solid rgba(29,78,216,0.25);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
          margin-bottom: 16px;
        }
        .cp-info-text h3 { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.8); margin-bottom: 4px; }
        .cp-info-text p { font-size: 12px; color: rgba(255,255,255,0.4); line-height: 1.5; }

        /* botones */
        .cp-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .cp-btn-primary {
          flex: 1;
          min-width: 160px;
          background: #1d4ed8;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 12px 20px;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-family: inherit;
          box-shadow: 0 4px 20px rgba(29,78,216,0.4);
          transition: background 0.15s, box-shadow 0.15s;
        }
        .cp-btn-primary:hover { background: #2563eb; box-shadow: 0 6px 24px rgba(29,78,216,0.55); }

        .cp-btn-secondary {
          flex: 1;
          min-width: 160px;
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.7);
          border: 0.5px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          padding: 12px 20px;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-family: inherit;
          transition: background 0.15s, border-color 0.15s;
        }
        .cp-btn-secondary:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.2); }

        /* footer link */
        .cp-help {
          text-align: center;
          margin-top: 32px;
        }
        .cp-help p { font-size: 12px; color: rgba(255,255,255,0.25); margin-bottom: 4px; }
        .cp-help a { font-size: 13px; color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.15s; }
        .cp-help a:hover { color: rgba(255,255,255,0.8); }
      `}</style>

      <div className="cp-page">

        {/* Icono */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="cp-icon-wrap"
        >
          <svg width="32" height="32" fill="none" stroke="#4ade80" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        {/* Título */}
        <motion.div
          className="cp-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h1>¡Pago exitoso!</h1>
          <p>Tu reserva ha sido confirmada</p>
        </motion.div>

        {/* Resumen */}
        <motion.div
          className="cp-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="cp-card-header">
            <h2>Resumen de compra</h2>
            <span className="cp-paid-badge">PAGADO</span>
          </div>

          <div className="cp-row">
            <span className="cp-row-label">Vuelos</span>
            <span className="cp-row-value">COP 490.770</span>
          </div>
          <div className="cp-row">
            <span className="cp-row-label">Asientos</span>
            <span className="cp-row-value">COP 63.050</span>
          </div>
          <div className="cp-row">
            <span className="cp-row-label">Servicios adicionales</span>
            <span className="cp-row-value">COP 32.140</span>
          </div>

          <div className="cp-total">
            <span className="cp-total-label">Total</span>
            <span className="cp-total-value">COP 585.960</span>
          </div>
        </motion.div>

        {/* Banner info */}
        <motion.div
          className="cp-info"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <svg width="18" height="18" fill="none" stroke="#60a5fa" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 1 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="cp-info-text">
            <h3>Confirmación enviada</h3>
            <p>Hemos enviado un correo electrónico con los detalles de tu reserva y tu pase de abordar. Revisa tu bandeja de entrada.</p>
          </div>
        </motion.div>

        {/* Botones */}
        <motion.div
          className="cp-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <button className="cp-btn-primary" onClick={goToBoarding}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            Ver mis tiquetes
          </button>
          <button className="cp-btn-secondary" onClick={() => navigate("/")}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Volver al inicio
          </button>
        </motion.div>

        {/* Ayuda */}
        <motion.div
          className="cp-help"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          <p>¿Necesitas ayuda?</p>
          <a href="tel:+1234567890">+1 234 567 890</a>
        </motion.div>

      </div>

      <Footer />
    </div>
  );
};

export default ConfirmarPago;