import { useState } from "react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timeZone: string;
  profilePicture: string;
  memberSince: string;
  tier: string;
  miles: number;
}

const Profile = () => {

  const [user, setUser] = useState<User>({
      firstName: "Carolina",
      lastName: "Devoz",
      email: "caro@gmail.com",
      phone: "+57 1234567890",
      timeZone: "GMT-5",
      profilePicture: "https://www.puneladders.co.in/assets/img/Default_User.png",
      memberSince: "2025",
      tier: "Platino",
      miles: 48250,
    });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setFormData({ ...user });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    setUser({ ...formData });
    setIsEditing(false);
    alert("Perfil actualizado correctamente.");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl max-w-3xl w-full">
        {/* Header */}
        <div className="p-8 border-b border-gray-200 text-center">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-200"
          />
          <h1 className="text-2xl font-bold text-gray-800">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-gray-500">Miembro desde {user.memberSince}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-600">Nombre</label>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-800">{user.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Apellido</label>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-800">{user.lastName}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-800">{user.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Teléfono</label>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-800">{user.phone}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Zona Horaria</label>
            {isEditing ? (
              <input
                type="text"
                name="timeZone"
                value={formData.timeZone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            ) : (
              <p className="text-lg font-semibold text-gray-800">{user.timeZone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Millas Acumuladas</label>
            <p className="text-2xl font-bold text-indigo-600">{user.miles.toLocaleString()} Millas</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 flex justify-end space-x-4 border-t border-gray-200">
          {isEditing ? (
            <>
              <button
                onClick={handleEditToggle}
                className="bg-red-50 hover:bg-red-100 text-red-600 py-2 px-4 rounded-lg focus:outline-none font-medium text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg focus:outline-none font-medium text-sm"
              >
                Guardar Cambios
              </button>
            </>
          ) : (
            <button
              onClick={handleEditToggle}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg focus:outline-none font-medium text-sm"
            >
              Editar Perfil
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
