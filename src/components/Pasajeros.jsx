import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const Pasajeros = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    genero: "",
    nacionalidad: "Colombia",
    tipoDocumento: "Cédula de Identidad",
    numeroDocumento: "",
    pasajeroFrecuente: "",
    aerolinea: "",
    email: "",
    telefono: "",
  });

  const navigate = useNavigate();

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
      const response = await fetch("https://tu api.example.com/pasajeros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar los datos");
      }

      const data = await response.json();
      console.log("Formulario enviado:", data);

      
      navigate("/confirmar-pago");
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al enviar los datos.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-bluemint">
      {/* Sección izquierda: Formulario */}
      <div className="w-full lg:w-2/3 bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-blueblack text-3xl font-semibold mb-6">Pasajeros</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Campos del formulario */}
            <div className="flex flex-col">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                className="p-4 border-2 border-lightblue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue w-full"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                placeholder="Apellido"
                className="p-4 border-2 border-lightblue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue w-full"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className="p-4 border-2 border-lightblue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue w-full"
              />
            </div>
            <div className="flex flex-col">
              <select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                className="p-4 border-2 border-lightblue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue w-full"
              >
                <option value="">Género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="flex flex-col">
              <select
                name="nacionalidad"
                value={formData.nacionalidad}
                onChange={handleChange}
                className="p-4 border-2 border-lightblue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue w-full"
              >
                <option value="Colombia">Colombia</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Perú">Perú</option>
              </select>
            </div>
            <div className="flex flex-col">
              <select
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleChange}
                className="p-4 border-2 border-lightblue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue w-full"
              >
                <option value="Cédula de Identidad">Cédula de Identidad</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                name="numeroDocumento"
                value={formData.numeroDocumento}
                onChange={handleChange}
                placeholder="Número de documento"
                className="p-4 border-2 border-lightblue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue w-full"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                name="pasajeroFrecuente"
                value={formData.pasajeroFrecuente}
                onChange={handleChange}
                placeholder="N° de pasajero frecuente (opcional)"
                className="p-4 border-2 border-lightblue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue w-full"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                name="aerolinea"
                value={formData.aerolinea}
                onChange={handleChange}
                placeholder="Aerolinea"
                className="p-4 border-2 border-lightblue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue w-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-blueblack font-semibold">Información de contacto</h3>
            <div className="flex flex-col">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-4 border-2 border-lightblue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue w-full"
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex flex-col w-1/4">
                <select
                  className="p-4 border-2 border-lightblue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue w-full"
                >
                  <option value="+57">+57</option>
                  <option value="+56">+56</option>
                  <option value="+34">+34</option>
                  <option value="+49">+49</option>
                  <option value="+1">+1</option>
                </select>
              </div>
              <div className="flex flex-col w-3/4">
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Número"
                  className="p-4 border-2 border-lightblue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue w-full"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-lightblue text-bluemint py-3 rounded-lg font-semibold hover:bg-bluedark transition"
          >
            Confirmar datos
          </button>
        </form>
      </div>

      {/* Sección derecha: Detalle de viaje */}
      <div className="w-full lg:w-1/3 bg-bluemint p-6 lg:p-12 shadow-lg rounded-xl">
        <h3 className="text-blueblack text-xl font-bold mb-4">Detalle de viaje</h3>
        <div className="space-y-4 text-blueblack">
          <div className="flex justify-between">
            <span>Vuelos</span>
            <span>COP 490.770</span>
          </div>
          <div className="flex justify-between">
            <span>Asientos</span>
            <span>COP 63.050</span>
          </div>
          <div className="flex justify-between">
            <span>Servicios adicionales</span>
            <span>COP 32.140</span>
          </div>
          <div className="flex justify-between text-gold font-bold text-lg">
            <span>Precio final</span>
            <span>COP 585.960</span>
          </div>
        </div>
        <button
          onClick={() => navigate("/confirmar-pago")}
          className="w-full bg-red text-bluemint py-3 mt-6 rounded-lg font-semibold  transition"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Pasajeros;
