import { useForm } from "react-hook-form";
import { motion } from 'framer-motion';
import Logo from "../assets/LogoRoyal.png";


export default function LoginComponent () {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = handleSubmit((data) => {

    })

    return (
        <motion.div className="py-6 px-8 rounded-2xl shadow-lg bg-white w-lg">

            <div className="flex justify-center -translate-y-4 -mb-1">
                <img alt="logo" src={Logo} className="size-26" />
            </div>
            
            <h2 className="text-2xl font-semibold text-blueblack -translate-y-8 -mb-2" >Bienvenid@ de vuelta!</h2>
            <p className="-translate-y-6 font-extralight">Ingrese los datos de su cuenta</p>

            <form onSubmit={onSubmit} className="px-2">

                <div className="felx flex-col gap-2">
                    
                    <div className="px-2 text-sm mb-2">

                        <label className="block text font-extralight mb-1" >Correo Electronico</label>
                        <input type="email" placeholder="Email..."
                            className="w-full px-2 py-3 border border-lightblue rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-base transition duration-150 ease-in-out font-extralight"
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
                        <input type="email" placeholder="Contraseña..."
                            className="w-full px-2 py-3 border border-lightblue rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-base transition duration-150 ease-in-out font-extralight"
                            {...register("password", { required: "Este campo es obligatorio" })} /> 
                        
                        {errors?.password && (
                                <motion.p className="text-red text-center text-sm font-[350] mt-1"
                                    initial={{ opacity: 0}}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }} >{errors.password.message}</motion.p>
                            )}
                    </div>

                    <div className="flex justify-center py-2">
                        <motion.button type="submit" className="text-white hover:cursor-pointer duration-200 hover:bg-lilac bg-gold text-bluemint py-3 w-5/6 rounded-lg text-lg font-semibold" >Continuar</motion.button>
                    </div>
                </div>
            </form>
        </motion.div>
    )
}