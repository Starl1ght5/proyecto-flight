import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import miami from '../../src/assets/miami.jpeg';
import berna from '../../src/assets/berna.jpg';
import amsterdam from '../../src/assets/amsterdam.jpg';

export default function OfertasDestacadas() {
  const ofertas = [
      { nombre: "Miami", precio: "Desde USD 250", imagen: miami, enlace: "/miami", descuento: "20% OFF" },
      { nombre: "Berna", precio: "Desde USD 700", imagen: berna, enlace: "/berna", descuento: "20% OFF" },
      { nombre: "Amsterdam", precio: "Desde USD 850", imagen: amsterdam, enlace: "/amsterdam", descuento: "20% OFF" }
  ];

  return (
      <div>
          <div className="text-blueblack pl-8 m-16">
              <h1 className="text-5xl font-bold text-blueblack">Ofertas Destacadas</h1>
              <p className="text-lg text-blueblack mt-2">Compra la mejor oferta para el próximo destino.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-24 lg:px-24">
              {ofertas.map((oferta, index) => (
                  <a
                      href={oferta.enlace}
                      key={index}
                      className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
                  >
                      <div className="relative">
                          <img
                              src={oferta.imagen}
                              alt={oferta.nombre}
                              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                         
                          <span className="absolute top-2 right-2 bg-red-600 text-white text-sm font-bold py-1 px-3 rounded-lg shadow-md">
                              {oferta.descuento}
                          </span>
                      </div>

                      <div className="p-8">
                          <div className="flex justify-between items-center">
                              <div className="flex items-center text-blueblack-800 text-lg font-semibold">
                                  <FaMapMarkerAlt className="text-blueblack-500 mr-2" />
                                  {oferta.nombre}
                              </div>
                              <p className="text-blueblack-800 font-semibold text-lg">
                                  {oferta.precio}
                              </p>
                          </div>
                      </div>
                  </a>
              ))}
          </div>
      </div>
  );
}
