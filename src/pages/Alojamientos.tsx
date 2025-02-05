import React from "react";
import Hilton from '../../src/assets/HotelHilton.jpg';
import Sanman from '../../src/assets/HotelSanman.jpg';

export default function Alojamientos() {
    const alojamientos = [
        {
            ubicacion: "Bogotá, Colombia",
            nombre: "Hotel Hilton",
            imagen: Hilton,
            estrellas: 4,
            puntuacion: 8.5,
            precio: "$120 por noche",
            link: "https://www.booking.com/Share-T9hmxk"
        },
        {
            ubicacion: "Ottawa, Canadá",
            nombre: "Sandman Signature Ottawa Airport Hotel",
            imagen: Sanman,
            estrellas: 5,
            puntuacion: 9.2,
            precio: "$150 por noche",
            link: "https://www.booking.com/Share-qydiUJ"
        }
    ];

    return (
        <div className="text-blueblack pl-10 m-16">
            <div className="container">
                <h1 className="text-5xl font-bold text-blueblack">Reserva Alojamiento</h1>
                <div className="m-10 px-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {alojamientos.map((hotel, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                        >
                            <img
                                src={hotel.imagen}
                                alt={hotel.nombre}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {hotel.nombre}
                                </h2>
                                <p className="text-gray-600 text-sm">{hotel.ubicacion}</p>
                                <div className="flex items-center mt-4">
                                    <div className="flex text-yellow-500">
                                        {Array.from({ length: hotel.estrellas }, (_, i) => (
                                            <span key={i}>&#9733;</span>
                                        ))}
                                    </div>
                                    <p className="ml-3 text-sm text-gray-600">{hotel.puntuacion} / 10</p>
                                </div>
                                <p className="text-lg font-semibold text-gray-700 mt-4">{hotel.precio}</p>
                                <a
                                    href={hotel.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block mt-6 text-center bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                                >
                                    Reservar en Booking.com
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
