export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto px-6">
    
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold">Royal Airlines</h2>
                        <p className="text-gray-400 mt-2">
                            Tu mejor opción para reservar vuelos o alojamientos y explorar nuevos destinos con comodidad y estilo.
                        </p>
                    </div>

                    
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Enlaces Rápidos</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-blue-400 transition duration-300">
                                    Reservar
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-400 transition duration-300">
                                    Ofertas y Destinos
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-400 transition duration-300">
                                    Mis Viajes
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-400 transition duration-300">
                                    Centro de Ayuda
                                </a>
                            </li>
                        </ul>
                    </div>

                  
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Síguenos</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-400 transition duration-300"
                            >
                                <i className="fab fa-facebook fa-2x"></i>
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition duration-300"
                            >
                                <i className="fab fa-twitter fa-2x"></i>
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pink-500 hover:text-pink-400 transition duration-300"
                            >
                                <i className="fab fa-instagram fa-2x"></i>
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:text-blue-600 transition duration-300"
                            >
                                <i className="fab fa-linkedin fa-2x"></i>
                            </a>
                        </div>
                    </div>
                </div>

                
                <div className="mt-10 border-t border-gray-700 pt-4 text-center">
                    <p className="text-gray-500">
                        &copy; 2025 Royal Airlines. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
