import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Necesario para redirigir a la página de editar

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // Intentamos obtener los datos del usuario desde localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    } catch (error) {
      console.error('Error al cargar el usuario:', error);
    }
  }, []);

  const handleEditClick = () => {
    // Redirigir a la página de edición (puedes modificar esto según tu ruta)
    navigate('/edit-profile');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Perfil del Usuario</h1>
      {user ? (
        <div className="flex items-center space-x-4">
          {/* Imagen de perfil */}
          <img
            src={user.profilePicture || '/default-profile.png'} // Imagen por defecto si no tiene
            alt="Perfil"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button
              className="mt-4 bg-blue-500 text-white p-2 rounded"
              onClick={handleEditClick} // Llamamos a la función de redirección
            >
              Editar perfil
            </button>
          </div>
        </div>
      ) : (
        <p>No se encontró información del usuario.</p>
      )}
    </div>
  );
};

export default Profile;
