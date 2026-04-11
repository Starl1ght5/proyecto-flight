import { useForm, type FieldValues } from "react-hook-form";
import { motion } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import Logo from "../assets/logoroyal.png";
import GoogleButtonComponent from "./googlebuttoncomponent.tsx";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

type FormFields = {
  email: string;
  password: string;
};

interface ChildProps {
  changeState: (value: boolean) => void;
}

const LoginComponent: React.FC<ChildProps> = ({ changeState }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<FormFields>();
  const [ , setCookie ] = useCookies(['RoyalUserToken']);

  const navigate = useNavigate();
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


  const onSubmit = handleSubmit(async (data: FieldValues) => {
    try {
      console.log(data)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}users/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data),
      });

      console.log(response)

      if (response.ok) {
        const resData = await response;
        const token = typeof resData === 'string' ? resData : resData.body;

        setCookie('RoyalUserToken', token, {
          path: '/',
          secure: window.location.protocol === 'https:',
          sameSite: 'lax',
          maxAge: 3600,
        });

        toast.success("¡Sesión iniciada correctamente!", {
          description: "En unos momentos serás redirigido a la página principal"
        });

        await delay(2000);
        navigate("/");
      
      } else {
        const errorMsg = response.status === 401 
          ? "Correo y/o contraseña incorrectos" 
          : "Error en la autenticación";

        toast.error(errorMsg, {
          className: "bg-red-500 text-white rounded-lg shadow-lg",
          });
      }

    } catch (error) {
      toast.error("Error de conexión con el servidor", {
        className: "bg-red-500 text-white rounded-lg shadow-lg",
      });
      console.error("Login Error:", error);
    }
  });

  const origin = () => {
    navigate("/");
  }

  return (
    <div className="min-h-screen w-full flex bg-white">
      <Toaster position="top-right" duration={4000} />

      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex flex-col justify-center items-center text-white px-12 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} >
              <h1 className="text-5xl font-bold mb-6">Tu próxima aventura comienza aquí</h1>
              <p className="text-xl text-blue-100">Vuela a más de 100 destinos en todo el mundo</p>
            </motion.div>
          </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        
        <motion.div className="w-full max-w-md" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          
          <button onClick={origin} className="mb-8 text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-2">
            <span className="icon-[weui--back-filled] text-xl" />
            <span className="text-sm font-medium">Volver</span>
          </button>
          
          <div className="flex justify-center mb-8">
            <img src={Logo} alt="logo" className="h-16 w-auto" />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Bienvenido de vuelta!</h2>
            <p className="text-gray-500">Ingresa a tu cuenta</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all"
                {...register("email", { required: "Este campo es obligatorio" })}
              />
              {errors.email && (
                <motion.p className="text-red-500 text-xs mt-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all"
                {...register("password", { required: "Este campo es obligatorio" })}
              />
              {errors.password && (
                <motion.p className="text-red-500 text-xs mt-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.password.message}
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3.5 rounded-lg font-semibold transition-all duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>

          <div className="relative flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-400 text-sm">O</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex justify-center">
            <GoogleButtonComponent />
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              ¿No tienes una cuenta?{" "}
              <button className="text-gray-900 font-semibold hover:underline transition-all"onClick={() => changeState(false)}>
                Regístrate
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginComponent;