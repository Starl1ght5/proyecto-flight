import { useForm, type FieldValues } from "react-hook-form";
import { motion } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import Logo from "../assets/LogoRoyal.png";
import GoogleButtonComponent from "./GoogleButtonComponent";

type FormFields = {
    email: string;
    password: string;
}

export default function LoginComponent () {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>();

    const onSubmit = handleSubmit( async (data: FieldValues) => {
        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const res = await response;

            if (res.status === 202) {
                toast.success("Seccion iniciada correctamente!");
            } else if (res.status === 404) {
                toast.error("Correo y/o contraseña incorrectos", {
                    className: "bg-red-500 text-white rounded-lg shadow-lg"
                })
            }

        } catch (error) {
            console.log(error)
            toast.error("Error del servidor" , {
                className: "bg-red-500 text-white rounded-lg shadow-lg"
            });
        }
    })

    return (
        <motion.div className="py-6 px-8 rounded-2xl shadow-lg bg-white w-lg">
            <Toaster richColors position="top-right" duration={4000} className="bg-white text-black" />

            <div className="flex justify-center -translate-y-4 -mb-1">
                <img alt="logo" src={Logo} className="size-26" />
            </div>
            
            <h2 className="text-2-5xl font-semibold text-blueblack -translate-y-8 -mb-2" >Bienvenid@ de vuelta!</h2>
            <p className="-translate-y-6 font-extralight">Ingrese los datos de su cuenta</p>

            <form onSubmit={onSubmit} className="px-2">

                <div className="felx flex-col gap-3">
                    
                    <div className="px-2 text-sm mb-2">

                        <label className="block text font-extralight mb-1" >Correo Electronico</label>
                        <input type="email" placeholder="Email..."
                            className="w-full px-3 py-3 border border-lightblue rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-base transition duration-150 ease-in-out font-extralight"
                            {...register("email", { required: "Este campo es obligatorio" })} />

                        {errors?.email && (
                                <motion.p className="text-red text-center text-sm font-[350] mt-1"
                                    initial={{ opacity: 0}}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }} >{errors.email.message}</motion.p>
                            )}
                    </div>

                    <div className="px-2 pb-4 text-sm" >
                        <label className="block text font-extralight mb-1" >Contraseña</label>
                        <input type="password" placeholder="Contraseña..."
                            className="w-full px-3 py-3 border border-lightblue rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-base transition duration-150 ease-in-out font-extralight"
                            {...register("password", { required: "Este campo es obligatorio" })} /> 
                        
                        {errors?.password && (
                                <motion.p className="text-red text-center text-sm font-[350] mt-1"
                                    initial={{ opacity: 0}}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }} >{errors.password.message}</motion.p>
                            )}
                    </div>

                    <div className="flex justify-center py-2">
                        <motion.button type="submit" className="hover:cursor-pointer duration-200 hover:bg-gold bg-lilac text-bluemint py-3 w-5/6 rounded-lg text-lg font-semibold" >Continuar</motion.button>
                    </div>
                </div>
            </form>

            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-7 bg-gray-400 border-0" />
                <span className="absolute px-3 font-medium text-gray-400 italic -translate-x-1/2 bg-white left-1/2">O</span>
            </div>
        
            <div className="flex flex-row justify-center mx-4">
                <GoogleButtonComponent/>
            </div>

            <div className="flex flex-row text-sm justify-center mt-5 gap-2" >
                <p className="italic text-gray-600">No tienes una cuenta?</p>
                <p className="text-lilac underline hover:cursor-pointer" >Registrate</p>
            </div>
            

        </motion.div>
    )
}