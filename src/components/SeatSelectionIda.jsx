import React, { useState, useEffect } from "react";
import { FaCouch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const SelectSeatsIda = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const [A, setA] = useState([])
  const [B, setB] = useState([])
  const [C, setC] = useState([])
  const [D, setD] = useState([])
  const [E, setE] = useState([])
  const [F, setF] = useState([])

  const fetchSeats = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/test/seat/1");
      setSeats(response.data); 
      setLoading(false); 
    } catch (error) {
      console.error("Error al obtener los asientos:", error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchSeats();
    
  }, []);

  useEffect(() => {
    divideArray(seats, 25)
  }, [seats])

  const handleSeatSelection = (seatId) => {
    setSelectedSeat(seatId);
  };

  const divideArray = (array, itemsPerColumn) => {
    const columns = [];
    for (let i = 0; i < array.length; i += itemsPerColumn) {
      columns.push(array.slice(i, i + itemsPerColumn));
    }
    setA(columns[0])
    setB(columns[1])
    setC(columns[2])
    setD(columns[3])
    setE(columns[4])
    setF(columns[5])
  };

  const renderSeat = (seat) => {
    const isAvailable = seat.available;
    const isSelected = selectedSeat === seat.seatID;

    const seatClass = isAvailable
      ? isSelected
        ? "bg-bluemint text-black border-blueblack"
        : "bg-bluemint hover:bg-bluemint border-blueblack"
      : "bg-bluemint text-white cursor-not-allowed border-blueblack";

    return (
      <div key={seat.seatID} className="relative group">
        <button
          className={`w-12 h-12 flex items-center justify-center rounded border shadow-md ${seatClass}`}
          disabled={!isAvailable}
          onClick={() => handleSeatSelection(seat.seatID)}
        >
          <FaCouch className="text-2xl text-blueblack" />
        </button>
        {isAvailable && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-lightblue text-bluemint text-sm font-semibold px-4 py-1 rounded-md shadow-2xl opacity-0 group-hover:opacity-100 transition">
            Asiento {seat.seatNumber} - COP {seat.price.toLocaleString("es-CO")}
          </div>
        )}
      </div>
    );
  };

  const handleConfirmAndRedirect = () => {
    if (selectedSeat) {
      alert(`Asiento confirmado: ${selectedSeat}`);
      navigate("/vuelta");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 rounded-lg shadow-2xl flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-9 text-center text-blueblack">
        Selecciona tu asiento - Vuelo de ida
      </h2>
      {loading ? (
        <div className="spinner"></div> // Spinner mientras carga
      ) : (
        <div className="flex flex-row gap-4">

          <div className="flex flex-row justify-center gap-4">
            <div className="flex flex-col justify-center gap-2" >
              {A?.map(element => {
              return (
                renderSeat(element)
              )})}
            </div>

            <div className="flex flex-col justify-center gap-2">
              {B?.map(element => {
                return (
                  renderSeat(element)
              )})}
            </div>
            <div className="flex flex-col justify-center gap-2">
              {C?.map(element => {
                return (
                  renderSeat(element)
              )})}
            </div>
          </div>

          <div className="w-12"></div>

          <div className="flex flex-row justify-center gap-4">
            <div className="flex flex-col justify-center gap-2" >
              {D?.map(element => {
              return (
                renderSeat(element)
              )})}
            </div>

            <div className="flex flex-col justify-center gap-2">
              {E?.map(element => {
                return (
                  renderSeat(element)
              )})}
            </div>
            <div className="flex flex-col justify-center gap-2">
              {F?.map(element => {
                return (
                  renderSeat(element)
              )})}
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleConfirmAndRedirect}
        className="mt-8 w-full bg-lightblue text-bluemint py-3 px-6 rounded-lg font-medium transition"
        disabled={!selectedSeat}
      >
        Confirmar asiento de ida
      </button>
    </div>
  );
};

export default SelectSeatsIda;