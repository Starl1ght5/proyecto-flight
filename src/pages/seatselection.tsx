import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/footercomponent.tsx";
import Navbar from "../components/navbarcomponent.tsx";
import { Seat, CheckoutAttemptInfo, CheckoutInfo } from "../types.tsx";
import { Toaster, toast } from 'sonner';
import SeatCard from '../components/cards/seatcard.tsx';
import { Helmet } from "react-helmet";
import { loadStripe } from "@stripe/stripe-js";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface TokenPayload extends JwtPayload {
  id: string;
  sub: string;
  name: string;
  exp: number;
  iat: number;
}

export default function SeatSelection() {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [cookies] = useCookies(['RoyalUserToken']);
  const [jwt, setJwt] = useState<TokenPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState<boolean>(false); // ✅ spinner del botón

  const [seatRowA, setSeatRowA] = useState<Seat[]>([]);
  const [seatRowB, setSeatRowB] = useState<Seat[]>([]);
  const [seatRowC, setSeatRowC] = useState<Seat[]>([]);
  const [seatRowD, setSeatRowD] = useState<Seat[]>([]);
  const [seatRowE, setSeatRowE] = useState<Seat[]>([]);
  const [seatRowF, setSeatRowF] = useState<Seat[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  const searchParams = new URLSearchParams(location.search);
  const flight = searchParams.get('flight') || '';
  const fee = searchParams.get('fee') || '';
  const cookie = cookies.RoyalUserToken;
  const passangers = searchParams.get('passangers') || 1;
  const pNumber: number = Number(passangers);

  const { handleSubmit } = useForm();

  const onSubmit = handleSubmit(async () => {
    try {
      if (selectedSeats.length === 0) {
        toast.error("No has seleccionado ningún asiento");
      } else if (selectedSeats.length !== pNumber) {
        toast.error("No has seleccionado todos los asientos");
      } else {
        setPaying(true); // ✅ activar spinner
        const ids: string[] = selectedSeats.map(seat => seat.seatID);
        toast.success("Reserva creada. En unos momentos serás redirigido a la pasarela de pago");

        const info: CheckoutAttemptInfo = {
          flightID: flight,
          seatIDs: ids,
          userID: "Guest",
          feeID: fee,
        };

        if (checkForCookie() && jwt) info.userID = jwt.id;

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}booking/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(info),
        });

        if (response.status === 201) {
          const res = await response.text();
          initCheckout(res);
          setDisabled(true);
        } else {
          toast.error("Error del servidor");
          setPaying(false); // ✅ apagar spinner si hay error
        }
      }
    } catch (e) {
      console.error(e);
      setPaying(false); // ✅ apagar spinner si hay excepción
    }
  });

  const initCheckout = async (checkoutID: string) => {
    try {
      const initialResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}booking/${checkoutID}`);
      const res = await initialResponse.json();

      const details: CheckoutInfo = {
        bookingID: res.bookingID,
        userID: res.userID,
        flightInfo: res.bookedFlight,
        fee: res.selectedFee,
        totalPrice: res.totalPrice,
        status: res.status,
        ticketCount: res.ticketCount,
        bookedSeats: res.bookedSeats,
      };

      const stripe = await loadStripe("pk_test_51OEkaAAZPRRqn7nghZ3JdSkVsMS64xrdnTxyqlnPoJjjDZEiuUbJ7cEGgWgbU8MzE6RMtK8sTtLHdKl4c3Myf8LE007tm0JPdo");
      const added_value = parseInt(details.totalPrice.amount + ".00");

      const payload = {
        client: details.userID,
        amount_paid: added_value,
        currency: "COP",
        items_brought: [details],
      };

      const response = await fetch(`${import.meta.env.VITE_PAYMENT_SERVER_URL}start-checkout-session`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });

      const test = await response.json();
      stripe?.redirectToCheckout({ sessionId: test.id });
    } catch (e) {
      console.error(e);
      setPaying(false); // ✅ apagar spinner si falla Stripe
    }
  };

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}flights/seats/search?flightID=${flight}`,
          { method: 'GET' }
        );
        const res = await response.json();
        setSeats(Array.isArray(res) ? res : []);
      } catch (error) {
        console.error("Error al obtener los asientos:", error);
        toast.error("Error del servidor");
      } finally {
        setLoading(false);
      }
    };
    fetchSeats();
  }, []);

  useEffect(() => {
    const divideArray = (array: Seat[], itemsPerColumn: number) => {
      if (!array || array.length === 0) return;
      const columns: Seat[][] = [];
      for (let i = 0; i < array.length; i += itemsPerColumn) {
        columns.push(array.slice(i, i + itemsPerColumn));
      }
      if (columns[0]) setSeatRowA(columns[0]);
      if (columns[1]) setSeatRowB(columns[1]);
      if (columns[2]) setSeatRowC(columns[2]);
      if (columns[3]) setSeatRowD(columns[3]);
      if (columns[4]) setSeatRowE(columns[4]);
      if (columns[5]) setSeatRowF(columns[5]);
    };
    divideArray(seats, 30);
  }, [seats]);

  useEffect(() => {
    if (cookie) {
      try {
        const decodedToken = jwtDecode<TokenPayload>(cookie);
        setJwt(decodedToken);
      } catch {
        setJwt(null);
      }
    } else {
      setJwt(null);
    }
  }, [cookie]);

  const checkForCookie = () => !!cookie;

  const handleSeatSelection = (seat: Seat) => {
    if (selectedSeats.some(s => s.seatNumber === seat.seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s.seatNumber !== seat.seatNumber));
      toast.info("Asiento deseleccionado");
      return;
    }
    if (selectedSeats.length < pNumber) {
      setSelectedSeats([...selectedSeats, seat]);
      toast.success("Asiento seleccionado correctamente");
    } else {
      toast.error("No puedes seleccionar más asientos");
    }
  };

  const removeSeat = (seatNumber: string) => {
    setSelectedSeats(prev => prev.filter(s => s.seatNumber !== seatNumber));
    toast.info("Asiento deseleccionado");
  };

  const renderSeatRow = (row: Seat[], rowLetter: string) => (
    <div className="flex flex-col items-center gap-0.5">
      <p className="text-center text-xs font-medium mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
        {rowLetter}
      </p>
      {row?.map(element => (
        <SeatCard
          key={element.seatNumber}
          seat={element}
          isSelected={selectedSeats.some(s => s.seatNumber === element.seatNumber)}
          onSelect={handleSeatSelection}
        />
      ))}
    </div>
  );

  const total = selectedSeats.reduce((acc, seat) => acc + parseFloat(String(seat.seatPrice.amount)), 0);

  return (
    <div style={{ background: '#0f1117', minHeight: '100vh' }}>
      <Toaster position="top-right" duration={4000} />
      <Helmet>
        <title>Selección de asiento - Royal Airlines</title>
      </Helmet>
      <Navbar />

      <style>{`
        .ss-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 16px 48px;
        }

        .ss-header { margin-bottom: 20px; }
        .ss-header h1 { font-size: 22px; font-weight: 500; color: rgba(255,255,255,0.85); margin-bottom: 4px; }
        .ss-header p { font-size: 13px; color: rgba(255,255,255,0.4); }

        .ss-legend {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          background: rgba(255,255,255,0.04);
          border: 0.5px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 10px 16px;
          margin-bottom: 20px;
          width: fit-content;
        }
        .ss-leg { display: flex; align-items: center; gap: 7px; font-size: 12px; color: rgba(255,255,255,0.4); }
        .ss-leg-box { width: 16px; height: 15px; border-radius: 4px; flex-shrink: 0; }
        .ss-leg-avail { background: rgba(255,255,255,0.10); border: 0.5px solid rgba(255,255,255,0.20); }
        .ss-leg-sel {
          background: rgba(29,78,216,0.4);
          border: 1.5px solid #3b82f6;
          box-shadow: 0 0 8px rgba(29,78,216,0.5);
        }
        .ss-leg-occ { background: rgba(255,255,255,0.03); border: 0.5px solid rgba(255,255,255,0.07); opacity: 0.4; }

        .ss-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 14px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .ss-layout { grid-template-columns: 1fr; }
        }

        .ss-map {
          background: rgba(255,255,255,0.03);
          border: 0.5px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 24px 20px;
        }

        .ss-nose {
          width: 56px;
          height: 20px;
          background: linear-gradient(180deg, #1e40af 0%, #1d4ed8 100%);
          border-radius: 28px 28px 0 0;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.05em;
        }

        .ss-cabin { display: flex; gap: 8px; justify-content: center; align-items: flex-start; }
        .ss-col-group { display: flex; gap: 4px; }

        .ss-aisle {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding-top: 22px;
        }
        .ss-aisle-num {
          font-size: 9px;
          color: rgba(255,255,255,0.2);
          text-align: center;
          height: 22px;
          width: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ss-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 64px 0;
        }
        .ss-spinner {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.07);
          border-top-color: #3b82f6;
          animation: spin 0.8s linear infinite;
        }

        /* ✅ spinner pequeño para el botón */
        .ss-btn-spinner {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
        .ss-loading p { font-size: 13px; color: rgba(255,255,255,0.4); }

        .ss-panel {
          background: rgba(255,255,255,0.03);
          border: 0.5px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 18px;
          position: sticky;
          top: 88px;
        }
        .ss-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          padding-bottom: 12px;
          border-bottom: 0.5px solid rgba(255,255,255,0.06);
        }
        .ss-panel-title { font-size: 15px; font-weight: 500; color: rgba(255,255,255,0.85); }
        .ss-panel-badge {
          font-size: 11px;
          background: rgba(29,78,216,0.25);
          border: 0.5px solid rgba(29,78,216,0.4);
          color: #60a5fa;
          padding: 2px 9px;
          border-radius: 99px;
        }

        .ss-seat-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; max-height: 280px; overflow-y: auto; scrollbar-width: none; }
        .ss-seat-list::-webkit-scrollbar { display: none; }

        .ss-seat-item {
          background: rgba(29,78,216,0.12);
          border: 0.5px solid rgba(29,78,216,0.25);
          border-radius: 9px;
          padding: 10px 12px;
        }
        .ss-seat-item-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        .ss-seat-badge {
          background: #1d4ed8;
          color: #fff;
          font-size: 12px;
          font-weight: 500;
          padding: 3px 9px;
          border-radius: 5px;
          box-shadow: 0 2px 10px rgba(29,78,216,0.4);
        }
        .ss-seat-pax { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 3px; }
        .ss-seat-price { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.85); }
        .ss-seat-remove {
          background: none;
          border: none;
          font-size: 11px;
          color: rgba(255,255,255,0.25);
          cursor: pointer;
          padding: 0;
          font-family: inherit;
          transition: color 0.15s;
        }
        .ss-seat-remove:hover { color: #f87171; }

        .ss-placeholder {
          background: rgba(255,255,255,0.03);
          border: 0.5px dashed rgba(255,255,255,0.1);
          border-radius: 9px;
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ss-ph-badge {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.25);
          font-size: 12px;
          font-weight: 500;
          padding: 3px 9px;
          border-radius: 5px;
        }
        .ss-ph-name { font-size: 12px; color: rgba(255,255,255,0.4); }
        .ss-ph-sub { font-size: 10.5px; color: rgba(255,255,255,0.2); margin-top: 2px; }

        .ss-total {
          background: rgba(255,255,255,0.04);
          border: 0.5px solid rgba(255,255,255,0.07);
          border-radius: 9px;
          padding: 11px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .ss-total-label { font-size: 12px; color: rgba(255,255,255,0.4); }
        .ss-total-value { font-size: 17px; font-weight: 500; color: rgba(255,255,255,0.85); }

        .ss-btn {
          width: 100%;
          background: #1d4ed8;
          color: #fff;
          border: none;
          border-radius: 9px;
          padding: 11px;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(29,78,216,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-family: inherit;
          transition: background 0.15s, box-shadow 0.15s;
        }
        .ss-btn:hover:not(:disabled) { background: #2563eb; box-shadow: 0 6px 24px rgba(29,78,216,0.6); }
        .ss-btn:disabled { opacity: 0.45; cursor: not-allowed; }
      `}</style>

      <div className="ss-page">
        <motion.div
          className="ss-header"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1>Elige tus asientos</h1>
          <p>Selecciona los mejores asientos para tu viaje</p>
        </motion.div>

        <motion.div
          className="ss-legend"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="ss-leg"><div className="ss-leg-box ss-leg-avail" />Disponible</div>
          <div className="ss-leg"><div className="ss-leg-box ss-leg-sel" />Seleccionado</div>
          <div className="ss-leg"><div className="ss-leg-box ss-leg-occ" />Ocupado</div>
        </motion.div>

        <div className="ss-layout">
          <motion.div
            className="ss-map"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {loading ? (
              <div className="ss-loading">
                <div className="ss-spinner" />
                <p>Cargando asientos...</p>
              </div>
            ) : (
              <>
                <div className="ss-nose">✈ ROYAL</div>

                <div className="ss-cabin">
                  <div className="ss-col-group">
                    {renderSeatRow(seatRowA, 'A')}
                    {renderSeatRow(seatRowB, 'B')}
                    {renderSeatRow(seatRowC, 'C')}
                  </div>

                  <div className="ss-aisle">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div key={i} className="ss-aisle-num">{i + 1}</div>
                    ))}
                  </div>

                  <div className="ss-col-group">
                    {renderSeatRow(seatRowD, 'D')}
                    {renderSeatRow(seatRowE, 'E')}
                    {renderSeatRow(seatRowF, 'F')}
                  </div>
                </div>
              </>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="ss-panel">
              <div className="ss-panel-header">
                <span className="ss-panel-title">Tu selección</span>
                <span className="ss-panel-badge">{selectedSeats.length} / {pNumber}</span>
              </div>

              <div className="ss-seat-list">
                <AnimatePresence mode="popLayout">
                  {selectedSeats.length > 0 ? (
                    selectedSeats.map((seat, index) => (
                      <motion.div
                        key={seat.seatNumber}
                        className="ss-seat-item"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.18 }}
                      >
                        <div className="ss-seat-item-top">
                          <div>
                            <span className="ss-seat-badge">{seat.seatNumber}</span>
                            <p className="ss-seat-pax">Pasajero {index + 1}</p>
                          </div>
                          <span className="ss-seat-price">
                            COP {parseFloat(String(seat.seatPrice.amount)).toLocaleString()}
                          </span>
                        </div>
                        <button
                          className="ss-seat-remove"
                          onClick={() => removeSeat(seat.seatNumber)}
                        >
                          Eliminar
                        </button>
                      </motion.div>
                    ))
                  ) : (
                    Array.from({ length: pNumber }).map((_, index) => (
                      <div key={`ph-${index}`} className="ss-placeholder">
                        <span className="ss-ph-badge">?</span>
                        <div>
                          <p className="ss-ph-name">Pasajero {index + 1}</p>
                          <p className="ss-ph-sub">Sin asiento</p>
                        </div>
                      </div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {selectedSeats.length > 0 && (
                <motion.div
                  className="ss-total"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span className="ss-total-label">Total asientos</span>
                  <span className="ss-total-value">COP {total.toLocaleString()}</span>
                </motion.div>
              )}

              {/* ✅ Botón con spinner mientras procesa */}
              <form onSubmit={onSubmit}>
                <button
                  type="submit"
                  className="ss-btn"
                  disabled={disabled || paying}
                >
                  {paying ? (
                    <>
                      <div className="ss-btn-spinner" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      Continuar al pago
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}