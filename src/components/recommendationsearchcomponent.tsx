import { useState } from 'react';
import { Location } from '../types.tsx';
import { useForm, type FieldValues } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import { RecommendationCard } from './cards/recommendationcard.tsx';
import { motion } from 'framer-motion';

type FormFields = {
	price: number;
	temperature: number;
	popularity: number;
	beach: boolean;
	mountain: boolean;
	jungle: boolean;
	desert: boolean;
	historic: boolean;
	cultural: boolean;
	gastronomic: boolean;
	night_life: boolean;
	eco_tourism: boolean;
	adventure: boolean;
	selected: number;
};

export default function RecomenationSearchComponent() {

	const [ recommendedLocation, setRecommendedLocation ] = useState<Location[]>([]);
	const [ searched, setSearched ] = useState<boolean>(false);
	const [ name, setName ] = useState<string>('');

	const [ buttonA, setButtonA ] = useState<boolean>(false);
	const [ buttonB, setButtonB ] = useState<boolean>(false);
	const [ buttonC, setButtonC ] = useState<boolean>(false);
	const [ buttonD, setButtonD ] = useState<boolean>(false);
	const [ buttonE, setButtonE ] = useState<boolean>(false);
	const [ buttonF, setButtonF ] = useState<boolean>(false);
	const [ buttonG, setButtonG ] = useState<boolean>(false);
	const [ buttonI, setButtonI ] = useState<boolean>(false);

	const { register, handleSubmit, formState: {isSubmitting}} = useForm<FormFields>();

	const onSubmit = handleSubmit(async (data: FieldValues) => {
		data.jungle = false;
		data.desert = false;

		if (data.selected === 1) {
			data.popularity = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
		} else if (data.selected === 2) {
			data.popularity = Math.floor(Math.random() * (7 - 4 + 1)) + 4;
		} else {
			data.popularity = Math.floor(Math.random() * (10 - 7 + 1)) + 7;
		}

		if (buttonA) {
			data.beach = true;
		}

		if (buttonB) {
			data.mountain = true;
		}

		if (buttonC) {
			data.historic = true;
		}

		if (buttonD) {
			data.cultural = true;
		}

		if (buttonE) {
			data.gastronomic = true;
		}

		if (buttonF) {
			data.night_life = true;
		}

		if (buttonG) {
			data.eco_tourism = true;
		}

		if (buttonI) {
			data.adventure = true;
		}

		try {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}recommendation/recommend`,
				{
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(data),${import.meta.env.VITE_BACKEND_URL}
				}
			);

			const res = await response;

			if (res.status === 200) {
				const content = await res.json();
				setRecommendedLocation(content);
				setSearched(true);
				setName(content[0].cityName);
			} else {
				toast.error(
					'Ha ocurrido un error en la busqueda, vuelva a intentarlo',
					{
						className: 'bg-red-500 text-white rounded-lg shadow-lg',
					}
				);
			}
		} catch (error) {
			console.error(error);
			toast.error('Ha ocurrido un error en el servidor', {
				className: 'bg-red-500 text-white rounded-lg shadow-lg',
			});
		}
	});

	const reset = () => {
		setSearched(false);
		setRecommendedLocation([]);
		setName('');
	};

	const alterButtonAState = () => {
		setButtonA(prevState => !prevState);
	}

	const alterButtonBState = () => {
		setButtonB(prevState => !prevState);
	}

	const alterButtonCState = () => {
		setButtonC(prevState => !prevState);
	}

	const alterButtonDState = () => {
		setButtonD(prevState => !prevState);
	}

	const alterButtonEState = () => {
		setButtonE(prevState => !prevState);
	}

	const alterButtonFState = () => {
		setButtonF(prevState => !prevState);
	}

	const alterButtonGState = () => {
		setButtonG(prevState => !prevState);
	}

	const alterButtonIState = () => {
		setButtonI(prevState => !prevState);
	}

	return (
		<div className="px-5 lg:px-20">
			<Toaster
				richColors
				position="top-right"
				duration={4000}
				className="bg-white text-black"
			/>

			<div className="text-center mb-6">
				<h2 className="text-3xl md:text-4xl font-bold text-black">
					No sabes a donde ir?
				</h2>
				<p className="text-center mb-2.5 italic font-light">
					Podemos ayudarte a encontrar tu nuevo destino favorito!
				</p>
				<div className="lg:w-lg h-1 bg-purple2 mx-auto rounded-full"></div>
			</div>

			{!searched ? (
				<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}	
				layout >
					<div className="flex flex-row justify-center">
						<form onSubmit={onSubmit}>
							<div className="flex flex-col boder-1 px-8 lg:px-10 py-5 lg:py-7 border-black bg-white rounded-lg shadow-2xl font-light lg:gap-3 lg:w-5xl mb-4">
								<h2 className="font-[500] text-2xl mb-3 text-center lg:text-left">
									¿Que buscas en tu viaje?
								</h2>

								<div className="flex flex-col lg:flex-row lg:space-x-8 justify-between">
									<div className="flex flex-col gap-1">
										<label className="text-sm font-extralight">
											Presupuesto
										</label>
										<input
											type="number"
											className="bg-white text-black rounded-lg shadow-lg px-4.5 py-2.5 focus:outline-lilac focus:outline-2 lg:w-80 border-1 duration-150 ease-in-out border-black focus:border-transparent"
											placeholder="300000 COP"
											{...register('price', {
												required: 'Este campo es obligatorio',
											})}
										/>
									</div>

									<div className="flex flex-col gap-1">
										<label className="text-sm font-extralight">
											Temperatura
										</label>
										<input
											type="number"
											className="bg-white text-black rounded-lg shadow-lg px-4.5 py-2.5 border-1 border-black focus:outline-lilac duration-150 ease-in-out focus:outline-2 lg:w-50 focus:border-transparent"
											placeholder="22 C"
											{...register('temperature', {
												required: 'Este campo es obligatorio',
											})}
										/>
									</div>

									<div className="flex flex-col gap-1">
										<label className="text-sm font-extralight">
											Popularidad
										</label>
										<select
											className="bg-white text-black px-4.5 py-2.5 lg:w-50 border-1 border-black rounded-lg shadow-lg focus:outline-lilac duration-150 ease-in-out focus:outline-2 hover:cursor-pointer focus:border-transparent"
											{...register('popularity', {
												required: 'Este campo es obligatorio',
											})}>
											<option value="1">Baja</option>
											<option value="2">Normal</option>
											<option value="3">Alta</option>
										</select>
									</div>
								</div>

								<h2 className="text-base lg:text-lg font-extralight mt-3 mb-2">
									¿Que buscas en tu destino?
								</h2>

								<div className="grid lg:grid-cols-4 grid-cols-2 justify-center mb-2">
									{!buttonA ? (
										<button onClick={alterButtonAState} className="text-center bg-white rounded-tl-lg px-4.5 py-2.5 border-t-1 border-l-1 border-black hover:scale-110 duration-300 easing-in-out content-box hover:bg-lilac hover:text-white hover:border-none hover:font-semibold hover:cursor-pointer">Playas</button>
									): (
										<button onClick={alterButtonAState} className="text-center bg-gold rounded-tl-lg text-white font-semibold px-4.5 py-2.5 border-t-1 border-l-1 border-lilac hover:scale-110 duration-300 easing-in-out content-box hover:bg-lilac hover:text-white hover:border-none hover:font-semibold hover:cursor-pointer">Playas</button>
									)}
									
									{!buttonB ? (
										<button onClick={alterButtonBState} className="text-center bg-white px-4.5 py-2.5 border-t-1 border-x-1 lg:border-x-none border-black hover:scale-110 duration-300 easing-in-out content-box hover:bg-lilac hover:text-white hover:border-none hover:font-semibold hover:cursor-pointer rounded-tr-lg lg:rounded-tr-none">Montañas</button>
									): (
										<button onClick={alterButtonBState} className="text-center bg-gold text-white font-semibold px-4.5 py-2.5 border-t-1 border-x-1 lg:border-x-none border-lilac hover:scale-110 duration-300 easing-in-out content-box hover:bg-lilac hover:text-white hover:border-none hover:font-semibold hover:cursor-pointer rounded-tr-lg lg:rounded-tr-none">Montañas</button>
									)}

									{!buttonC ? (
										<button onClick={alterButtonCState} className="text-center bg-white px-4.5 py-2.5 border-t-1 lg:border-r-1 border-black hover:scale-110 duration-300 easing-in-out content-box hover:bg-lilac hover:text-white hover:border-none hover:font-semibold hover:cursor-pointer border-l-1 lg:border-l-none">Historico</button>
									): (
										<button onClick={alterButtonCState} className="text-center bg-gold text-white font-semibold px-4.5 py-2.5 border-t-1 lg:border-r-1 border-lilac hover:scale-110 duration-300 easing-in-out content-box hover:bg-lilac hover:text-white hover:border-none hover:font-semibold hover:cursor-pointer border-l-1 lg:border-l-none">Historico</button>
									)}

									{!buttonD ? (
										<button onClick={alterButtonDState} className="text-center bg-white lg:rounded-tr-lg px-4.5 py-2.5 border-t-1 lg:border-l-none lg:border-x-none border-x-1 lg:border-r-1 border-black hover:scale-110 duration-300 easing-in-out content-box hover:bg-lilac hover:text-white hover:border-none hover:font-semibold hover:cursor-pointer">Cultural</button>
									): (
										<button onClick={alterButtonDState} className="text-center bg-gold lg:rounded-tr-lg text-white font-semibold px-4.5 py-2.5 border-x-1 border-t-1 lg:border-x-none lg:border-r-1 border-lilac hover:scale-110 duration-300 easing-in-out content-box hover:bg-lilac hover:text-white hover:border-none hover:font-semibold hover:cursor-pointer">Cultural</button>
									)}

									{!buttonE ? (
										<button onClick={alterButtonEState} className="text-center bg-white px-4.5 py-2.5 border-l-1 border-t-1 lg:border-b-1 lg:rounded-bl-lg border-black hover:scale-110 duration-300 easing-in-out content-box hover:bg-lilac hover:text-white hover:border-none hover:font-semibold hover:cursor-pointer">Gastronimico</button>
									): (
										<button onClick={alterButtonEState} className="text-center bg-gold text-white font-semibold px-4.5 py-2.5 border-l-1 border-t-1 lg:border-b-1 lg:rounded-bl-lg border-lilac hover:scale-110 duration-300 easing-in-out content-box hover:bg-lilac hover:text-white hover:border-none hover:font-semibold hover:cursor-pointer">Gastronimico</button>
									)}

									{!buttonF ? (
										<button onClick={alterButtonFState} className="text-center bg-white px-4.5 py-2.5 lg:border-b-1 border-x-1 border-t-1 border-black hover:scale-110 duration-300 easing-in-out content-box hover:bg-lilac hover:text-white hover:border-none hover:font-semibold hover:cursor-pointer">Nocturno</button>
									): (
										<button onClick={alterButtonFState} className="text-center bg-gold text-white font-semibold px-4.5 py-2.5 lg:border-b-1 border-x-1 border-t-1 border-lilac hover:scale-110 duration-300 easing-in-out content-box hover:bg-lilac hover:text-white hover:border-none hover:font-semibold hover:cursor-pointer">Nocturno</button>
									)}

									{!buttonG ? (
										<button onClick={alterButtonGState} className="text-center bg-white px-4.5 py-2.5 border-b-1 border-black lg:border-r-1 border-l-1 lg:border-l-none rounded-bl-lg lg:rounded-bl-none lg:border-l-none border-t-1 hover:scale-110 duration-300 easing-in-out content-box hover:bg-lilac hover:text-white hover:border-none hover:font-semibold hover:cursor-pointer">Turismo Ecologico</button>
									): (
										<button onClick={alterButtonGState} className="bg-gold text-white font-semibold px-4.5 py-2.5 lg:border-r-1 border-l-1 border-b-1 rounded-bl-lg text-center lg:rounded-bl-none lg:border-l-none border-t-1 border-lilac hover:scale-110 duration-300 easing-in-out content-box hover:bg-lilac hover:text-white hover:border-none hover:font-semibold hover:cursor-pointer">Turismo Ecologico</button>
									)}

									{!buttonI ? (
										<button onClick={alterButtonIState} className="bg-white px-4.5 py-2.5 border-b-1 border-r-1 border-t-1 rounded-br-lg border-l-1 lg:border-l-none border-black hover:scale-110 duration-300 easing-in-out content-box text-center hover:bg-lilac hover:text-white hover:border-none hover:font-semibold hover:cursor-pointer">Aventura</button>
									): (
										<button onClick={alterButtonIState} className="bg-gold text-white font-semibold px-4.5 py-2.5 border-b-1 border-r-1 border-t-1 border-l-1 lg:border-l-none rounded-br-lg border-lilac hover:scale-110 duration-300 easing-in-out text-center content-box hover:bg-lilac hover:text-white hover:border-none hover:font-semibold hover:cursor-pointer">Aventura</button>
									)}
								</div>

								<div className="flex flex-row justify-center mt-2">
									<button
										type="submit"
										disabled={isSubmitting}
										className="px-16 py-3 bg-lilac text-white font-lg hover:cursor-pointer rounded-lg shadow-lg hover:scale-105 duration-300">
										Buscar
									</button>
								</div>
							</div>
						</form>
					</div>
				</motion.div>
			) : (
				<motion.div
					className="flex flex-row justify-center"
					initial={{ opacity: 0, y: 20 }}
        			animate={{ opacity: 1, y: 0 }}
        			transition={{ duration: 0.6 }}
					exit={{ opacity: 0}}
					layout >
					<div className="w-5/6">
						<div className="rounded-lg shadow-2xl grid grid-cols-2 bg-white">
							<div className="rounded-l-lg px-6 py-4">
								{recommendedLocation?.map(element => {
									const { locationID, cityName, cheapestPrice, iataCode } = element;

									return (
										<RecommendationCard key={locationID} locationID={''} cityName={cityName} countryName={''} iataCode={iataCode} airportName={''} featured={false} cheapestPrice={cheapestPrice} />
									)})}
							</div>

							<div className="flex flex-col px-4 py-4 rounded-r-lg place-self-center space-y-8">
								<div>
									<p className="font-light">Basadonos en tus preferencias</p>
									<h2 className="text-xl font-extralight">Te recomendamos</h2>
									<h1 className="text-2xl mb-2 font-[500]">{name}!</h1>
									<p className="font-light">
										Porque es el destino que mas se asemeja a lo que estas
										buscando!
									</p>
								</div>

								<div className="justify-end">
									<div className="flex flex-row gap-5 justify-center">
										<div className="flex flex-col text-sm font-light text-gray-600 italic">
											<p className="place-self-center">
												No es lo que
											</p>
											<p className="place-self-center">
												estas buscando?
											</p>
										</div>
										
										<button
											onClick={reset}
											className="bg-lilac rounded-lg hover:scale-105 duration-300 ease-in-out px-6 py-2 text-white hover:cursor-pointer">
											Busca otro destino!
										</button>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</div>
	);
}
