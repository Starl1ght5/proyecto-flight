import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { FaCouch } from "react-icons/fa";

const SelectSeatsVuelta = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        
        const response = await fetch("https://tu api.example.com/seats/vuelta");
        const data = await response.json();
        setSeats(data); 
      } catch (error) {
        console.error("Error al obtener los asientos:", error);
      }
    };

    fetchSeats();
  }, []);


  const handleSeatSelection = (seatId) => {
    setSelectedSeat(seatId);
  };

  
  const handleConfirmation = () => {
    if (selectedSeat) {
      navigate("/pasajeros", { state: { selectedSeat } });
    }
  };

  
  const renderSeat = (seat) => {
    const isAvailable = seat.available;
    const isSelected = selectedSeat === seat.id;

    const seatClass = isAvailable
      ? isSelected
        ? "bg-bluemint text-black border-blueblack"
        : "bg-bluemint hover:bg-bluemint border-blueblack"
      : "bg-bluemint text-white cursor-not-allowed border-blueblack";

    return (
      <div key={seat.id} className="relative group">
        <button
          className={`w-12 h-12 flex items-center justify-center rounded border shadow-md ${seatClass}`}
          disabled={!isAvailable}
          onClick={() => handleSeatSelection(seat.id)}
        >
          <FaCouch className="text-2xl text-blueblack" />
        </button>
        {isAvailable && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-lightblue text-bluemint text-sm font-semibold px-4 py-1 rounded-md shadow-2xl opacity-0 group-hover:opacity-100 transition">
            Asiento {seat.row}{seat.column} - COP {seat.price.toLocaleString("es-CO")}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-10 rounded-lg shadow-2xl flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-9 text-center text-blueblack">
        Selecciona tu asiento - Vuelo de vuelta
      </h2>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 32 }, (_, rowIndex) => {
          const row = rowIndex + 1;
          return (
            <div key={row} className="flex justify-center items-center gap-4">
              {/* Asientos del lado izquierdo */}
              {["A", "B", "C"].map((col) =>
                renderSeat(seats.find((seat) => seat.row === row && seat.column === col))
              )}
              {/* Pasillo */}
              <div className="w-12"></div>
              {/* Asientos del lado derecho */}
              {["D", "E", "F"].map((col) =>
                renderSeat(seats.find((seat) => seat.row === row && seat.column === col))
              )}
            </div>
          );
        })}
      </div>
      <button
        onClick={handleConfirmation}
        className="mt-8 w-full bg-lightblue text-bluemint py-3 px-6 rounded-lg font-medium transition"
        disabled={!selectedSeat}
      >
        Confirmar asiento de vuelta
      </button>
    </div>
  );
};

export default SelectSeatsVuelta;
