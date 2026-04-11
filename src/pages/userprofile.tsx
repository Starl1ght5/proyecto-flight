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
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
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
                    className="bg-white rounded-3xl shadow-xl border-2 border-gray-200 p-8 mb-8"
                >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Avatar */}
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white shadow-2xl">
                                <span className="text-5xl font-bold">
                                    {userData.firstName[0]}{userData.lastName[0]}
                                </span>
                            </div>
                            <button className="absolute bottom-0 right-0 w-10 h-10 bg-gray-900 hover:bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all group-hover:scale-110">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>

                        {/* Info principal */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                {userData.firstName} {userData.lastName}
                            </h1>
                            <p className="text-lg text-gray-600 mb-4">{userData.email}</p>
                            
                            {/* Badges */}
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Verificado
                                </span>
                                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    Miembro Frecuente
                                </span>
                            </div>
                        </div>

                        {/* Stats cards */}
                        <div className="flex gap-4">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 text-center min-w-[100px] border-2 border-blue-200">
                                <p className="text-3xl font-bold text-blue-600">12</p>
                                <p className="text-sm text-gray-600 font-semibold">Vuelos</p>
                            </div>
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 text-center min-w-[100px] border-2 border-gray-200">
                                <p className="text-3xl font-bold text-gray-900">3</p>
                                <p className="text-sm text-gray-600 font-semibold">Países</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-4 gap-8">
                    
                    {/* Sidebar - Tabs */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 sticky top-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Configuración</h3>
                            
                            <div className="space-y-2">
                                <button
                                    onClick={() => setActiveTab("personal")}
                                    className={`w-full px-4 py-3 rounded-xl font-semibold transition-all flex items-center gap-3 ${
                                        activeTab === "personal"
                                            ? 'bg-gray-900 text-white shadow-md'
                                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>Datos Personales</span>
                                </button>

                                <button
                                    onClick={() => setActiveTab("security")}
                                    className={`w-full px-4 py-3 rounded-xl font-semibold transition-all flex items-center gap-3 ${
                                        activeTab === "security"
                                            ? 'bg-gray-900 text-white shadow-md'
                                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span>Seguridad</span>
                                </button>

                                <button
                                    onClick={() => setActiveTab("preferences")}
                                    className={`w-full px-4 py-3 rounded-xl font-semibold transition-all flex items-center gap-3 ${
                                        activeTab === "preferences"
                                            ? 'bg-gray-900 text-white shadow-md'
                                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Preferencias</span>
                                </button>
                            </div>

                            {/* Quick Actions */}
                            <div className="mt-6 pt-6 border-t-2 border-gray-200 space-y-2">
                                <button className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-md">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                    Mis Tiquetes
                                </button>
                                <button className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Historial
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-3"
                    >
                        {/* Datos Personales */}
                        {activeTab === "personal" && (
                            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Datos Personales</h2>
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className={`px-5 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                                            isEditing
                                                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                                        }`}
                                    >
                                        {isEditing ? (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                Cancelar
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Editar
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Nombre */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.firstName}
                                            disabled={!isEditing}
                                            onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                                                isEditing
                                                    ? 'border-blue-300 focus:border-blue-500 bg-white'
                                                    : 'border-gray-200 bg-gray-50 text-gray-600'
                                            } font-semibold focus:outline-none`}
                                        />
                                    </div>

                                    {/* Apellido */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Apellido
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.lastName}
                                            disabled={!isEditing}
                                            onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                                                isEditing
                                                    ? 'border-blue-300 focus:border-blue-500 bg-white'
                                                    : 'border-gray-200 bg-gray-50 text-gray-600'
                                            } font-semibold focus:outline-none`}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Correo Electrónico
                                        </label>
                                        <input
                                            type="email"
                                            value={userData.email}
                                            disabled={!isEditing}
                                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                                                isEditing
                                                    ? 'border-blue-300 focus:border-blue-500 bg-white'
                                                    : 'border-gray-200 bg-gray-50 text-gray-600'
                                            } font-semibold focus:outline-none`}
                                        />
                                    </div>

                                    {/* Teléfono */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Teléfono
                                        </label>
                                        <input
                                            type="tel"
                                            value={userData.phone}
                                            disabled={!isEditing}
                                            onChange={(e) => setUserData({...userData, phone: e.target.value})}
                                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                                                isEditing
                                                    ? 'border-blue-300 focus:border-blue-500 bg-white'
                                                    : 'border-gray-200 bg-gray-50 text-gray-600'
                                            } font-semibold focus:outline-none`}
                                        />
                                    </div>

                                    {/* Documento */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Documento de Identidad
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.document}
                                            disabled={!isEditing}
                                            onChange={(e) => setUserData({...userData, document: e.target.value})}
                                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                                                isEditing
                                                    ? 'border-blue-300 focus:border-blue-500 bg-white'
                                                    : 'border-gray-200 bg-gray-50 text-gray-600'
                                            } font-semibold focus:outline-none`}
                                        />
                                    </div>

                                    {/* Fecha de Nacimiento */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Fecha de Nacimiento
                                        </label>
                                        <input
                                            type="date"
                                            value={userData.birthDate}
                                            disabled={!isEditing}
                                            onChange={(e) => setUserData({...userData, birthDate: e.target.value})}
                                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                                                isEditing
                                                    ? 'border-blue-300 focus:border-blue-500 bg-white'
                                                    : 'border-gray-200 bg-gray-50 text-gray-600'
                                            } font-semibold focus:outline-none`}
                                        />
                                    </div>

                                    {/* Dirección */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Dirección
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.address}
                                            disabled={!isEditing}
                                            onChange={(e) => setUserData({...userData, address: e.target.value})}
                                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                                                isEditing
                                                    ? 'border-blue-300 focus:border-blue-500 bg-white'
                                                    : 'border-gray-200 bg-gray-50 text-gray-600'
                                            } font-semibold focus:outline-none`}
                                        />
                                    </div>

                                    {/* Ciudad */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Ciudad
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.city}
                                            disabled={!isEditing}
                                            onChange={(e) => setUserData({...userData, city: e.target.value})}
                                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                                                isEditing
                                                    ? 'border-blue-300 focus:border-blue-500 bg-white'
                                                    : 'border-gray-200 bg-gray-50 text-gray-600'
                                            } font-semibold focus:outline-none`}
                                        />
                                    </div>

                                    {/* País */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            País
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.country}
                                            disabled={!isEditing}
                                            onChange={(e) => setUserData({...userData, country: e.target.value})}
                                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                                                isEditing
                                                    ? 'border-blue-300 focus:border-blue-500 bg-white'
                                                    : 'border-gray-200 bg-gray-50 text-gray-600'
                                            } font-semibold focus:outline-none`}
                                        />
                                    </div>
                                </div>

                                {/* Botón Guardar */}
                                {isEditing && (
                                    <div className="mt-8 flex justify-end gap-4">
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold transition-all"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Guardar Cambios
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Seguridad */}
                        {activeTab === "security" && (
                            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Seguridad</h2>
                                
                                <div className="space-y-6">
                                    {/* Cambiar Contraseña */}
                                    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border-2 border-gray-200">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">Cambiar Contraseña</h3>
                                                <p className="text-gray-600 mb-4">Actualiza tu contraseña regularmente para mantener tu cuenta segura.</p>
                                                <button className="px-5 py-2.5 bg-gray-900 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all shadow-md">
                                                    Cambiar Contraseña
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Autenticación de dos factores */}
                                    <div className="p-6 bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl border-2 border-gray-200">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="text-lg font-bold text-gray-900">Autenticación de Dos Factores</h3>
                                                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold">Desactivada</span>
                                                </div>
                                                <p className="text-gray-600 mb-4">Añade una capa extra de seguridad a tu cuenta.</p>
                                                <button className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all shadow-md">
                                                    Activar 2FA
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sesiones Activas */}
                                    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">Sesiones Activas</h3>
                                                <p className="text-gray-600 mb-4">Gestiona los dispositivos donde has iniciado sesión.</p>
                                                <button className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-semibold transition-all">
                                                    Ver Dispositivos
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Preferencias */}
                        {activeTab === "preferences" && (
                            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Preferencias</h2>
                                
                                <div className="space-y-6">
                                    {/* Notificaciones */}
                                    <div className="p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Notificaciones</h3>
                                        
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold text-gray-900">Notificaciones por Email</p>
                                                    <p className="text-sm text-gray-600">Recibe actualizaciones sobre tus vuelos</p>
                                                </div>
                                                <button className="w-14 h-8 bg-blue-600 rounded-full relative transition-all">
                                                    <span className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-md"></span>
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold text-gray-900">Ofertas y Promociones</p>
                                                    <p className="text-sm text-gray-600">Recibe ofertas exclusivas</p>
                                                </div>
                                                <button className="w-14 h-8 bg-gray-300 rounded-full relative transition-all">
                                                    <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Idioma */}
                                    <div className="p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Idioma y Región</h3>
                                        
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Idioma</label>
                                                <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 font-semibold focus:outline-none">
                                                    <option>Español</option>
                                                    <option>English</option>
                                                    <option>Português</option>
                                                </select>
                                            </div>
                                            
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Moneda</label>
                                                <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 font-semibold focus:outline-none">
                                                    <option>COP - Peso Colombiano</option>
                                                    <option>USD - Dólar</option>
                                                    <option>EUR - Euro</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}