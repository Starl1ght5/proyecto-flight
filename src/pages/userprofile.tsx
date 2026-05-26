import { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Navbar from "../components/navbarcomponent";
import Footer from "../components/footercomponent";

export default function UserProfile() {
    const [activeTab, setActiveTab] = useState<"personal" | "security" | "preferences">("personal");
    const [isEditing, setIsEditing] = useState(false);

    const [userData, setUserData] = useState({
        firstName: "User",
        lastName: "Apodo",
        email: "userapodo@gmail.com",
        phone: "+57 300 123 4567",
        document: "1234567890",
        birthDate: "1990-01-15",
        address: "Calle 123 #45-67",
        city: "Bogotá",
        country: "Colombia"
    });

    const handleSave = () => {
        // Lógica para guardar cambios
        setIsEditing(false);
        // Aquí iría la llamada a tu API
    };

    return (
        <div className="bg-[#0a0c12] min-h-screen">
    <Helmet>
        <title>Mi Perfil - Royal Airlines</title>
    </Helmet>

    <Navbar />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* Header con avatar */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl p-8 mb-8 border"
            style={{
                background: 'rgba(15,17,23,0.95)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
            }}
        >
            <div className="flex flex-col md:flex-row items-center gap-8">
                
                {/* Avatar */}
                <div className="relative group">
                    <div
                        className="w-32 h-32 rounded-full flex items-center justify-center text-white shadow-2xl"
                        style={{
                            background: 'linear-gradient(135deg,#1d4ed8,#2563eb)',
                        }}
                    >
                        <span className="text-5xl font-bold">
                            {userData.firstName[0]}{userData.lastName[0]}
                        </span>
                    </div>

                    <button
                        className="absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all group-hover:scale-110"
                        style={{
                            background: '#0f1117',
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl font-bold mb-2 text-white">
                        {userData.firstName} {userData.lastName}
                    </h1>

                    <p className="text-lg mb-4 text-white/50">
                        {userData.email}
                    </p>

                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        
                        <span
                            className="px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
                            style={{
                                background: 'rgba(29,78,216,0.15)',
                                border: '1px solid rgba(37,99,235,0.35)',
                                color: '#93c5fd',
                            }}
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Verificado
                        </span>

                        <span
                            className="px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                color: 'rgba(255,255,255,0.7)',
                            }}
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Miembro Frecuente
                        </span>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex gap-4">
                    
                    <div
                        className="rounded-2xl p-4 text-center min-w-[100px]"
                        style={{
                            background: 'rgba(29,78,216,0.12)',
                            border: '1px solid rgba(37,99,235,0.3)',
                        }}
                    >
                        <p className="text-3xl font-bold text-blue-400">12</p>
                        <p className="text-sm font-semibold text-white/50">Vuelos</p>
                    </div>

                    <div
                        className="rounded-2xl p-4 text-center min-w-[100px]"
                        style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}
                    >
                        <p className="text-3xl font-bold text-white">3</p>
                        <p className="text-sm font-semibold text-white/50">Países</p>
                    </div>
                </div>
            </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">

            {/* Sidebar */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-1"
            >
                <div
                    className="rounded-2xl p-6 sticky top-6"
                    style={{
                        background: 'rgba(15,17,23,0.95)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
                    }}
                >
                    <h3 className="text-lg font-bold text-white mb-4">
                        Configuración
                    </h3>

                    <div className="space-y-2">
                        
                        <button
                            onClick={() => setActiveTab("personal")}
                            className={`w-full px-4 py-3 rounded-xl font-semibold transition-all flex items-center gap-3 ${
                                activeTab === "personal"
                                    ? 'text-white'
                                    : 'text-white/60 hover:text-white'
                            }`}
                            style={{
                                background:
                                    activeTab === "personal"
                                        ? '#1d4ed8'
                                        : 'rgba(255,255,255,0.04)',
                                border:
                                    activeTab === "personal"
                                        ? '1px solid rgba(37,99,235,0.5)'
                                        : '1px solid rgba(255,255,255,0.05)',
                            }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Datos Personales
                        </button>

                    </div>
                </div>
            </motion.div>

            {/* Main */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-3"
            >
                <div
                    className="rounded-2xl p-8"
                    style={{
                        background: 'rgba(15,17,23,0.95)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
                    }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">
                            Datos Personales
                        </h2>

                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
                                isEditing
                                    ? 'text-red-300'
                                    : 'text-white'
                            }`}
                            style={{
                                background: isEditing
                                    ? 'rgba(239,68,68,0.12)'
                                    : '#1d4ed8',
                                border: isEditing
                                    ? '1px solid rgba(239,68,68,0.3)'
                                    : '1px solid rgba(37,99,235,0.4)',
                            }}
                        >
                            {isEditing ? 'Cancelar' : 'Editar'}
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        
                        <div>
                            <label className="block text-sm font-bold text-white/50 mb-2">
                                Nombre
                            </label>

                            <input
                                type="text"
                                value={userData.firstName}
                                disabled={!isEditing}
                                onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl font-semibold focus:outline-none transition-all"
                                style={{
                                    background: isEditing
                                        ? 'rgba(255,255,255,0.05)'
                                        : 'rgba(255,255,255,0.03)',
                                    border: isEditing
                                        ? '1px solid rgba(37,99,235,0.4)'
                                        : '1px solid rgba(255,255,255,0.08)',
                                    color: isEditing
                                        ? 'rgba(255,255,255,0.8)'
                                        : 'rgba(255,255,255,0.45)',
                                }}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-white/50 mb-2">
                                Apellido
                            </label>

                            <input
                                type="text"
                                value={userData.lastName}
                                disabled={!isEditing}
                                onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl font-semibold focus:outline-none transition-all"
                                style={{
                                    background: isEditing
                                        ? 'rgba(255,255,255,0.05)'
                                        : 'rgba(255,255,255,0.03)',
                                    border: isEditing
                                        ? '1px solid rgba(37,99,235,0.4)'
                                        : '1px solid rgba(255,255,255,0.08)',
                                    color: isEditing
                                        ? 'rgba(255,255,255,0.8)'
                                        : 'rgba(255,255,255,0.45)',
                                }}
                            />
                        </div>

                    </div>

                    {isEditing && (
                        <div className="mt-8 flex justify-end gap-4">
                            
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-3 rounded-xl font-bold transition-all"
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    color: 'rgba(255,255,255,0.7)',
                                }}
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={handleSave}
                                className="px-6 py-3 rounded-xl font-bold transition-all text-white"
                                style={{
                                    background: '#1d4ed8',
                                    boxShadow: '0 4px 24px rgba(29,78,216,0.35)',
                                }}
                            >
                                Guardar Cambios
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    </div>

    <Footer />
</div>
    );
}