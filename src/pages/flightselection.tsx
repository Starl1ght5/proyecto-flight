import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { FlightCard } from '../components/cards/flightcard.tsx';
import Navbar from '../components/navbarcomponent.tsx';
import Footer from '../components/footercomponent.tsx';
import { ReservedFlight, FlightInfo } from '../types.tsx';
import { ReservedCard } from '../components/cards/reservedcard.tsx';
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet";

export default function SearchResults() {
  const [flights, setFlights] = useState<FlightInfo[]>([]);
  const [reservedFlight, setReservedFlight] = useState<ReservedFlight[]>([]);
  const [formattedDate, setFormattedDate] = useState('');
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get('origen') || '';
  const destination = searchParams.get('destino') || '';
  const departure = searchParams.get('ida') || '';

  useEffect(() => {
    const fetchRequestedFlights = async () => {
      setLoading(true);
      try {
        if (!origin || !destination) return;

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}flights/search?origin=${origin}&destination=${destination}&departure=${departure}`
        );

        if (!response.ok) throw new Error();

        const res = await response.json();
        setFlights(Array.isArray(res) ? res : []);
      } catch {
        toast.error("No se pudieron cargar los vuelos", {
          className: "bg-red-500 text-white rounded-lg shadow-lg"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRequestedFlights();
  }, [origin, destination, departure]);

  const receiveFlight = (info: ReservedFlight) => {
    setReservedFlight([info]);
    setSelected(true);
    formatDate(info.flight.departureDate);
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    setFormattedDate(
      new Intl.DateTimeFormat('es-CO', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      }).format(d)
    );
  };

  const reset = () => {
    setReservedFlight([]);
    setSelected(false);
  };

  const next = () => {
    navigate(
      `/seat-selection?flight=${reservedFlight[0].flight.flightID}&fee=${reservedFlight[0].fee.feeID}`
    );
  };

  const calcAndFormat = (value: string | number, percentage: number) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return Math.round(num * (percentage / 100)).toLocaleString('es-CO');
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Toaster richColors position="top-right" />
      <Helmet>
        <title>Selección de vuelo - Royal Airlines</title>
      </Helmet>

      <Navbar />

      {!selected ? (
        <div className=" bg-[#0f1117] px-4 lg:px-10 pt-10 flex-1">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white">
            Elige tu vuelo de ida
          </h1>
          <p className="text-gray-500 mt-1">
            Selecciona la mejor opción para continuar tu viaje
          </p>

          {loading ? (
            <div className="flex flex-col items-center mt-24 gap-4 pb-10">
              <div className="h-12 w-12 rounded-full border-4 border-lilac border-t-transparent animate-spin" />
              <p className="text-gray-500 animate-pulse">
                Buscando las mejores opciones…
              </p>
            </div>
          ) : (
            <div className="mt-10 flex flex-col gap-6 max-w-5xl mx-auto pb-10">
              {flights.length > 0 ? (
                flights.map((f, i) => (
                  <FlightCard key={i} flight={f} returnInfo={receiveFlight} />
                ))
              ) : (
                <p className="text-center text-gray-500 text-lg">
                  No encontramos vuelos para esta fecha.
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-[#0f1117] px-4 lg:px-10 pt-10 flex-1">
          <h1 className="text-3xl font-extrabold text-white mb-6">
            Detalles de tu viaje
          </h1>

          <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm flex flex-wrap items-center gap-4">
            <span className="bg-lilac text-white px-3 py-1 rounded text-xs font-bold uppercase">
              Ida
            </span>
            <p className="font-semibold">
              {reservedFlight[0].flight.departureLocation.cityName} →{" "}
              {reservedFlight[0].flight.arrivalLocation.cityName}
            </p>
            <span className="text-sm text-gray-500 capitalize">
              {formattedDate}
            </span>
            <span className="text-sm font-semibold text-lilac">
              {reservedFlight[0].fee.feeName}
            </span>
          </div>

          <div className="mt-8">
            {reservedFlight.map((r, i) => (
              <ReservedCard
                key={i}
                flight={r.flight}
                fee={r.fee}
                reset={reset}
              />
            ))}
          </div>

          <div className="flex justify-end mt-12 mb-24">
            <div className="w-full md:w-96">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-lg px-6 py-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tarifa base</span>
                  <span className="font-medium">
                    COP {calcAndFormat(reservedFlight[0].fee.price.amount, 95)}
                  </span>
                </div>

                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Tasas e impuestos</span>
                  <span className="font-medium">
                    COP {calcAndFormat(reservedFlight[0].fee.price.amount, 5)}
                  </span>
                </div>

                <hr className="border-dashed my-4" />

                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-gray-700">
                    Total
                  </span>
                  <span className="text-3xl font-extrabold text-lilac">
                    COP{" "}
                    {parseFloat(
                      reservedFlight[0].fee.price.amount
                    ).toLocaleString('es-CO')}
                  </span>
                </div>
              </div>

              <button
                onClick={next}
                className="
                  mt-8 w-full py-4
                  bg-[#1d4ed8] text-white
                  text-lg font-bold
                  rounded-xl
                  shadow-lg
                  hover:bg-gold hover:shadow-xl
                  active:scale-95
                  transition-all duration-200
                "
              >
                Continuar al mapa de asientos
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </motion.div>
  );
}
