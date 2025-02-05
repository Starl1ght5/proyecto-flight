import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { motion } from 'framer-motion';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {

      if (!isLogin && data.password === data.confirmPassword) {
        const response = await fetch("http://localhost:8080/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.status === 201) {
          navigate("/profile");
        } else if (response.status === 502) {
          setError("email", { message: "Este correo ya está en uso" });
          toast.error("Este correo ya está en uso", {
            duration: 4000,
            position: "top-right",
            className: "bg-red-500 text-white rounded-lg shadow-lg",
          });

        } else {
          toast.error("Error en el servidor, prueba más tarde.", {
            duration: 4000,
            position: "top-right",
            className: "bg-red-500 text-white rounded-lg shadow-lg",
          });
        }

      } else if (!isLogin && data.password != data.confirmPassword) {
        toast.error("Las contraseñas no coinciden.", {
          duration: 4000,
          position: "top-right",
          className: "bg-red-500 text-white rounded-lg shadow-lg"
        });

      } else if (isLogin) {
        const response = await fetch("http://localhost:8080/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.status === 202) {
          const result = await response.json();
          localStorage.setItem("authToken", result.token);
          navigate("/profile");

        } else {
          toast.error("Credenciales incorrectas", {
            duration: 4000,
            position: "top-right",
            className: "bg-red-500 text-white rounded-lg shadow-lg",
          });
        }
      }
      
    } catch (error) {
      toast.error("Error del servidor", {
        duration: 4000,
        position: "top-right",
        className: "bg-red-500 text-white rounded-lg shadow-lg",
      });
      console.log(error);
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Toaster
        richColors
        position="top-right"
        duration={4000}
        className="bg-white text-black"
      />
      <motion.div
        className="p-8 rounded-2xl shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-blueblack mb-6">
          {isLogin ? "Iniciar sesión" : "Registrarse"}
        </h2>

        {errors.root && <p className="text-blueblack text-center mb-4">{errors.root.message}</p>}

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold">
              Correo electrónico:
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-lightblue rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
              {...register("email", { required: "Este campo es obligatorio" })}
            />
            {errors.email && (
              <motion.p
                className="text-red text-center mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-blueblack text-sm font-semibold">
              Contraseña:
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-lightblue rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in -out"
              {...register("password", { required: "Este campo es obligatorio" })}
            />
            {errors.password && (
              <motion.p
                className="text-red text-center mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.password.message}
              </motion.p>
            )}
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-blueblack text-sm font-semibold">
                Confirmar contraseña:
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-lightblue rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                {...register("confirmPassword", { required: "Este campo es obligatorio" })}
              />
              {errors.confirmPassword && (
                <motion.p
                  className="text-red text-center mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.confirmPassword.message}
                </motion.p>
              )}
            </div>
          )}

          <motion.button
            type="submit"
            className="w-full bg-gold text-bluemint py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            disabled={isSubmitting}
            whileTap={{ scale: 0.95 }}
          >
            {isLogin ? "Iniciar sesión" : "Registrarse"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          {isLogin ? (
            <>
              ¿No tienes una cuenta?{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="text-indigo-600 cursor-pointer hover:underline transition duration-300 ease-in-out"
              >
                Regístrate
              </span>
            </>
          ) : (
            <>
              ¿Ya tienes una cuenta?{" "}
              <span
                onClick={() => setIsLogin(true)}
                className="text-indigo-600 cursor-pointer hover:underline transition duration-300 ease-in-out"
              >
                Inicia sesión
              </span>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
};

export default Login;