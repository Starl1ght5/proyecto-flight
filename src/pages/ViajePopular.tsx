import { FaMapMarkerAlt } from "react-icons/fa";
import bangkok from '../../src/assets/bangkok.jpg';
import borabora from '../../src/assets/borabora.jpeg';
import ottawa from '../../src/assets/ottawa.jpg';
import roma from '../../src/assets/roma.jpeg';
import edimburgo from '../../src/assets/edimburgo.jpeg';
import tokyo from '../../src/assets/tokyo.webp';

export default function ViajePopular() {
  const destinos = [
    { nombre: "Bangkok", precio: "USD 568,54", imagen: bangkok, enlace: "/bangkok" },
    { nombre: "Bora Bora", precio: "USD 1.234,71", imagen: borabora, enlace: "/borabora" },
    { nombre: "Ottawa", precio: "USD 622,91", imagen: ottawa, enlace: "/ottawa" },
    { nombre: "Roma", precio: "USD 1.175,01", imagen: roma, enlace: "/roma" },
    { nombre: "Edimburgo", precio: "USD 1.317,24", imagen: edimburgo, enlace: "/edimburgo" },
    { nombre: "Tokyo", precio: "USD 3.844,66", imagen: tokyo, enlace: "/tokyo" },
  ];

  return (
    <div className="bg-bluemint-100 py-12">
      <div className="text-blueblack pl-8 m-16">
        <h2 className="text-5xl font-bold text-blueblack">Viajes Populares</h2>
        <p className="text-lg text-blueblack mt-2">Disfruta de los destinos más asombrosos del mundo.</p>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-24 lg:px-24">
        {destinos.map((destino, index) => (
          <a
            href={destino.enlace}
            key={index}
            className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
          >
           
            <div className="relative">
              <img
                src={destino.imagen}
                alt={destino.nombre}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            
            <div className="p-8">
              <div className="flex justify-between items-center">
              
                <div className="flex items-center text-blueblack-800 text-lg font-semibold">
                  <FaMapMarkerAlt className="text-blueblack-500 mr-2" />
                  {destino.nombre}
                </div>

                
                <p className="text-blueblack-800 font-semibold text-lg">
                  {destino.precio}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
