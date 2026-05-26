import { useForm, type FieldValues } from "react-hook-form";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import Logo from "../assets/logoroyal.png";
import GoogleButtonComponent from "./googlebuttoncomponent.tsx";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

type FormFields = {
  email: string;
  password: string;
};

interface ChildProps {
  changeState: (value: boolean) => void;
}

const LoginComponent: React.FC<ChildProps> = ({ changeState }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const [, setCookie] = useCookies(["RoyalUserToken"]);
  const navigate = useNavigate();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = handleSubmit(async (data: FieldValues) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // ✅ ARREGLADO
        const token = await response.text();

        setCookie("RoyalUserToken", token, {
          path: "/",
          secure: window.location.protocol === "https:",
          sameSite: "lax",
          maxAge: 3600,
        });

        toast.success("¡Sesión iniciada correctamente!", {
          description:
            "En unos momentos serás redirigido a la página principal",
        });

        await delay(2000);
        navigate("/");
      } else {
        const errorMsg =
          response.status === 401
            ? "Correo y/o contraseña incorrectos"
            : "Error en la autenticación";

        toast.error(errorMsg, {
          className:
            "bg-red-500 text-white rounded-xl shadow-xl border border-red-400",
        });
      }
    } catch (error) {
      toast.error("Error de conexión con el servidor", {
        className:
          "bg-red-500 text-white rounded-xl shadow-xl border border-red-400",
      });

      console.error("Login Error:", error);
    }
  });

  const origin = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex bg-[#0b1120]">
      <Toaster position="top-right" duration={4000} />

      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#1e3a8a] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Tu próxima aventura comienza aquí
            </h1>

            <p className="text-xl text-blue-100">
              Vuela a más de 100 destinos en todo el mundo
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-70"></div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-[#0f172a]">
        <motion.div
          className="w-full max-w-md bg-[#111827] border border-white/10 rounded-3xl shadow-2xl p-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* BACK BUTTON */}
          <button
            onClick={origin}
            className="mb-8 text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
          >
            <span className="icon-[weui--back-filled] text-xl" />
            <span className="text-sm font-medium">Volver</span>
          </button>

          {/* LOGO */}
          <div className="flex justify-center mb-8">
            <img src={Logo} alt="logo" className="h-16 w-auto" />
          </div>

          {/* TITLE */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              ¡Bienvenido de vuelta!
            </h2>

            <p className="text-gray-400">
              Ingresa a tu cuenta de Royal Airlines
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={onSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="block text-gray-300 font-medium mb-2 text-sm">
                Correo Electrónico
              </label>

              <input
                type="email"
                placeholder="correo@ejemplo.com"
                className="w-full px-4 py-3 bg-[#0b1120] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                {...register("email", {
                  required: "Este campo es obligatorio",
                })}
              />

              {errors.email && (
                <motion.p
                  className="text-red-400 text-xs mt-1.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-gray-300 font-medium mb-2 text-sm">
                Contraseña
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#0b1120] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                {...register("password", {
                  required: "Este campo es obligatorio",
                })}
              />

              {errors.password && (
                <motion.p
                  className="text-red-400 text-xs mt-1.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errors.password.message}
                </motion.p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-3.5 rounded-xl font-semibold transition-all duration-200 mt-6 shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Iniciando sesión..."
                : "Iniciar Sesión"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="relative flex items-center my-7">
            <div className="flex-grow border-t border-white/10"></div>

            <span className="px-4 text-gray-500 text-sm">O</span>

            <div className="flex-grow border-t border-white/10"></div>
          </div>

          {/* GOOGLE */}
          <div className="flex justify-center">
            <GoogleButtonComponent />
          </div>

          {/* REGISTER */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              ¿No tienes una cuenta?{" "}
              <button
                className="text-blue-400 font-semibold hover:text-blue-300 hover:underline transition-all"
                onClick={() => changeState(false)}
              >
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