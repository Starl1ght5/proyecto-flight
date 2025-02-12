

interface Flight {
    flight: FlightInfo;
}

interface FlightInfo {
    flightID: string;
    airline: string;

}

export const FlightCard: React.FC<Flight> = ({  }) => {

    return (
        <div className="w-7xl px-8 py-6 rounded-lg shadow-xl bg-white flex flex-row justify-between" >

            <div className="flex flex-col items-center" >
                <h2 className="text-2-5xl">02:18 p.m.</h2>
                <div className="flex flex-row gap-2 font-extralight">
                    <p>Cartagena</p>
                    <p>CTG</p>
                </div>
            </div>

            <div>

            </div>

            <div className="flex flex-col items-center" >
                <h2 className="text-2-5xl">02:18 p.m.</h2>
                <div className="flex flex-row gap-2 font-extralight">
                    <p>Cartagena</p>
                    <p>CTG</p>
                </div>
            </div>

            <div className="flex flex-col">
                <p className="text-sm">Por persona desde</p>
                <h1 className="text-2xl" >COP 1.000.000</h1>
            </div>
        </div>
    )
}