import { useForm, type FieldValues } from "react-hook-form";
import { motion } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import Logo from "../assets/logoroyal.png";
import { useNavigate } from "react-router-dom";

type FormFields = {
    email: string;
    password: string;
    confirmPassword: string;
}

interface ChildProps {
    changeState: (value: boolean) => void;
}

const RegisterComponent: React.FC<ChildProps> = ({ changeState }) => {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>();
    
    const onSubmit = handleSubmit( async (data: FieldValues) => {
        try {

            if (data.password === data.confirmPassword ) {

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}users/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
    
                const res = await response;
    
                if (res.status === 201) {
                    toast.success("Cuenta creada exitosamente!, en unos momentos sera redirigido al inicio de sesion");
                    await delay(3000);
                    changeParentState()
                    
                } else if (res.status === 400) {
                    toast.error("Este correo ya esta en uso", {
                        className: "bg-red-500 text-white rounded-lg shadow-lg"
                    });
                }

            } else {
                toast.error("Las contraseñas no coinciden", {
                    className: "bg-red-500 text-white rounded-lg shadow-lg"
                });
            }
    
        } catch (error) {
            console.log(error)
            toast.error("Error del servidor" , {
                className: "bg-red-500 text-white rounded-lg shadow-lg"
            });
        }
    })

    const changeParentState = () => {
        changeState(true);
    }

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const origin = () => {
        navigate("/");
    }

    return (
        <div className="min-h-screen w-full flex items-start justify-center md:items-center md:justify-center px-2">
            <Toaster richColors position="top-right" duration={4000} className="bg-white text-black" />

            <motion.div
                className="w-full h-full max-w-md text-center bg-white md:rounded-3xl md:shadow-xl md:border md:border-purple-600 px-4 py-6 md:px-10 md:pb-10 relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >

            <div className="z-11 flex flex-row gap-2 items-center absolute lg:translate-y-8 lg:translate-x-0 translate-y-5 -translate-x-5 hover:cursor-pointer hover:text-lilac duration-150 hover:scale-110" onClick={origin}>
                <span className="icon-[weui--back-filled]" />
                <p>Volver</p>
            </div>

            {/* Logo */}
            <div className="flex flex-row justify-center w-full pt-5 relative">
                <motion.img
                src={Logo}
                alt="logo"
                className="size-30 z-1 mx-auto"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
                />
            </div>
            <div className="bg-lilac z-0 absolute w-35 h-14 -top-2 left-1/2 -translate-x-1/2 translate-y-30 lg:translate-y-29 lg:w-40 lg:h-16 rounded-lg shadow-lg"></div>
            
            <h2 className="text-2xl font-bold text-black mt-4" >Tu proximo viaje te espera!</h2>
            <p className="font-extralight  mt-1">Crea tu cuenta ahora</p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">

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

                <div className="text-left">
                    <label className="block text-black-300 font-medium">Contraseña</label>
                    <input
                        type="password"
                        placeholder="Contraseña..."
                        className="w-full px-4 py-3  border border-purple-600 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                        {...register("password", { 
                            required: "Este campo es obligatorio",
                            minLength: { value: 6, message: "La contraseña debe contener al menos 6 caracteres"},
                            maxLength: { value: 14, message: "La contraseña no debe sobrepasar los 14 caracteres"}
                             })} /> 
                    {errors.email && (
                        <motion.p
                            className="text-red-400 text-sm mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {errors.password?.message}
                        </motion.p>
                    )}
                </div>

                <div className="text-left">
                    <label className="block text-black-300 font-medium">Confirmar Contraseña</label>
                    <input
                        type="password"
                        placeholder="Contraseña..."
                        className="w-full px-4 py-3  border border-purple-600 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                        {...register("confirmPassword", { 
                            required: "Este campo es obligatorio",
                            minLength: { value: 6, message: "La contraseña debe contener al menos 6 caracteres"},
                            maxLength: { value: 14, message: "La contraseña no debe sobrepasar los 14 caracteres"}
                             })} /> 
                    {errors.email && (
                        <motion.p
                            className="text-red-400 text-sm mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                           {errors?.confirmPassword && (
                                <motion.p className="text-red text-center text-sm font-[350] mt-1"
                                    initial={{ opacity: 0}}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }} >{errors.confirmPassword.message}</motion.p>
                            )}
                        </motion.p>
                    )}
                </div>

                    <div className="flex justify-center py-2">
                        <motion.button type="submit" disabled={isSubmitting} className="hover:cursor-pointer duration-200 hover:bg-gold bg-lilac text-bluemint py-3 w-5/6 rounded-lg text-lg font-semibold" >Continuar</motion.button>
                    </div>
            </form>

            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-7 bg-gray-400 border-0" />
                <span className="absolute px-3 font-medium text-gray-400 italic -translate-x-1/2 bg-white left-1/2">O</span>
            </div>

            <div className="flex flex-row text-sm justify-center mt-5 gap-2" >
                <p className="italic text-gray-600">Ya tienes una cuenta?</p>
                <p className="text-lilac underline hover:cursor-pointer" onClick={changeParentState} >Inicia Sesion</p>
            </div>
            

        </motion.div>
    </div>
    )
}

export default RegisterComponent;