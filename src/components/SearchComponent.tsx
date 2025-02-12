import { useForm, type FieldValues } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

type SearchFields = {
    origin: string;
    destination: string;
    departure: Date;
    arrival: Date;
    passengers: number;
}

export default function SearchComopnent () {

    const [ roundTrip, setRoundTrip ] = useState<boolean>(true);

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SearchFields>();

    const onSubmit = handleSubmit( async (data: FieldValues) => {

        navigate(
            `/search-results?origen=${data.origin}&destino=${data.destination}&ida=${data.departure}&vuelta=${data?.arrival}&passengers=${data.passengers}`
          );
    })


    return (
        <div className="bg-white rounded-lg shadow-lg w-5xl">

            <div className="flex flex-row justify-center gap-8 px-10 pt-4" >
                <p>Dropdown 1</p>
                <p>Dropdown 2</p>
                <p>Dropdown 3</p>
            </div>

            <form className="grid grid-cols-5 items-center gap-4 px-8 py-6" onSubmit={onSubmit}>
                <input type="text" placeholder="Origen" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                {...register("origin", { required: true })}/>

                <input type="text" placeholder="Destino" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                {...register("destination", { required: true })}/>

                <input type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                {...register("departure", { required: true })} />

                {roundTrip && <input type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                {...register("arrival", { required: true })} />}

                <div className="flex flex-row justify-center">
                   <button type="submit" disabled={isSubmitting} className="w-38 px-4 py-3 bg-lilac rounded-xl text-white hover:cursor-pointer hover:bg-gold duration-150" >Buscar</button> 
                </div>
                
            </form>
        </div>
    )
}