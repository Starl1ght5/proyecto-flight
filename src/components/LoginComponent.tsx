import { useForm, type FieldValues } from "react-hook-form";
import { motion } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import Logo from "../assets/LogoRoyal.webp";
import GoogleButtonComponent from "./GoogleButtonComponent.tsx";
import { useNavigate } from "react-router-dom";

type FormFields = {
  email: string;
  password: string;
};

interface ChildProps {
  changeState: (value: boolean) => void;
}

const LoginComponent: React.FC<ChildProps> = ({ changeState }) => {
  
  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<FormFields>();
  const navigate = useNavigate();
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const onSubmit = handleSubmit(async (data: FieldValues) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (response.status === 202) {
        toast.success("Sesión iniciada correctamente!, en unos momentos seras redirigido a la pagina principal");
        await delay (3000);
        navigate("/");

      } else {
        toast.error("Correo y/o contraseña incorrectos", {
          className: "bg-red-500 text-white rounded-lg shadow-lg",
        });
      }

    } catch (error) {
      toast.error("Error del servidor", {
        className: "bg-red-500 text-white rounded-lg shadow-lg",
      });
      console.error(error);
    }
  });

  return (
    
    <div className="h-screen w-full flex items-center justify-center">
      <Toaster position="top-right" duration={4000} />


      <motion.div
        className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md text-center border border-purple-600"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <motion.img
          src={Logo}
          alt="logo"
          className="w-16 h-16 mx-auto"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Título */}
        <h2 className="text-2xl font-bold text-black mt-4">¡Bienvenid@ de vuelta!</h2>
        <p className="text-gray-600 mt-1">Ingresa tus datos para continuar</p>

        {/* Formulario */}
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {/* Email */}
          <div className="text-left">
            <label className="block text-black-300 font-medium">Correo Electrónico</label>
            <input
              type="email"
              placeholder="Email..."
              className="w-full px-4 py-3  border border-purple-600 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
              {...register("email", { required: "Este campo es obligatorio" })}
            />
            {errors.email && (
              <motion.p
                className="text-red-400 text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>

          {/* Contraseña */}
          <div className="text-left">
            <label className="block text-black font-medium">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña..."
              className="w-full px-4 py-3 border border-purple-600 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
              {...register("password", { required: "Este campo es obligatorio" })}
            />
            {errors.password && (
              <motion.p
                className=" text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {errors.password.message}
              </motion.p>
            )}
          </div>

          {/* Botón de enviar */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-purple-dark text-white py-3 rounded-lg text-lg font-semibold shadow-md transition-all duration-300 hover:cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Iniciar Sesión
          </motion.button>
        </form>

        {/* Línea divisoria */}
        <div className="relative flex items-center mt-6">
          <hr className="w-full border-purple-600" />
          <span className="absolute left-1/2 transform -translate-x-1/2 bg-purple-800 px-2 text-white text-sm">
            O
          </span>
        </div>

        {/* Botón de Google - AHORA PERFECTAMENTE CENTRADO */}
        <div className="mt-4 flex justify-center">
          <GoogleButtonComponent />
        </div>

        {/* Registro */}
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">¿No tienes una cuenta?</p>
          <button
            className="text-indigo-600 hover:text-indigo-300 hover:cursor-pointer font-medium transition-all"
            onClick={() => changeState(false)}
          >
            Regístrate
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginComponent;